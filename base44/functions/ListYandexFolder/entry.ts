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
    const path = typeof body.path === 'string' && body.path.length > 0 ? body.path : null;

    let url = 'https://cloud-api.yandex.net/v1/disk/public/resources?public_key=' +
      encodeURIComponent(publicKey) +
      '&limit=200&preview_size=XXXL';
    if (path) url += '&path=' + encodeURIComponent(path);

    const apiRes = await fetch(url, { method: 'GET' });
    if (!apiRes.ok) {
      const txt = await apiRes.text().catch(() => '');
      return Response.json({ error: 'Yandex API error', status: apiRes.status, details: txt }, { status: 502 });
    }
    const data = await apiRes.json();
    const items = (data && data._embedded && data._embedded.items) || (Array.isArray(data) ? data : []);
    const files = items
      .filter(i => i.type === 'file')
      .map(i => ({
        name: i.name,
        path: i.path,
        media_type: i.media_type,
        size: i.size,
        preview: i.preview,
      }));
    return Response.json({ files });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}