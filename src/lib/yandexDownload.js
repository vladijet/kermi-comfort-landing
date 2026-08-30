// Yandex Disk's downloader.disk.yandex.ru host rejects requests that
// carry a Referer header (returns 403 "Invalid Referer"). A plain
// `window.location.href = href` makes the browser send our domain as
// Referer, which Chrome surfaces as ERR_INVALID_RESPONSE. Triggering the
// download through a temporary <a rel="noreferrer"> avoids the Referer.
export function triggerDownload(href) {
  const a = document.createElement('a');
  a.href = href;
  a.rel = 'noreferrer noopener';
  a.referrerPolicy = 'no-referrer';
  a.download = '';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}