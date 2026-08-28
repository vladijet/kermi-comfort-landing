import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const publicKey = body.public_key;
    if (!publicKey || typeof publicKey !== 'string') {
      return Response.json({ error: 'public_key is required' }, { status: 400 });
    }

    const apiUrl = 'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=' +
      encodeURIComponent(publicKey);
    const apiRes = await fetch(apiUrl, { method: 'GET' });
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