async function fetchWithRetry(url, retries = 1) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return res;
      if (res.status >= 500 && attempt < retries) {
        await new Promise(r => setTimeout(r, 400));
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 400));
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const publicKey = body.public_key;
    if (!publicKey || typeof publicKey !== 'string') {
      return Response.json({ error: 'public_key is required' }, { status: 400 });
    }

    const path = typeof body.path === 'string' && body.path.length > 0 ? body.path : null;
    let apiUrl = 'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=' +
      encodeURIComponent(publicKey);
    if (path) apiUrl += '&path=' + encodeURIComponent(path);
    const apiRes = await fetchWithRetry(apiUrl);
    if (!apiRes.ok) {
      const txt = await apiRes.text().catch(() => '');
      return Response.json({ error: 'Yandex API error', status: apiRes.status, details: txt }, { status: 502 });
    }
    const data = await apiRes.json();
    if (!data || !data.href) {
      return Response.json({ error: 'No download href returned' }, { status: 502 });
    }
    return Response.json({ href: data.href });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}