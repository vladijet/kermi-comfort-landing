import { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function PanelRadiatorFolder({ asset }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resolvingName, setResolvingName] = useState(null);
  const [preview, setPreview] = useState(null);

  const raw = (asset.file_url || '').startsWith('yandex:')
    ? asset.file_url.slice('yandex:'.length)
    : (asset.file_url || '');
  const [publicKey, path] = raw.includes('::') ? raw.split('::') : [raw, ''];

  const loadFiles = async () => {
    if (files || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('ListYandexFolder', {
        public_key: publicKey,
        path,
      });
      setFiles(res?.data?.files || []);
    } catch (e) {
      setError(e?.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    setFiles(null);
    setError(null);
    loadFiles();
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) loadFiles();
  };

  const handleFileClick = async (file) => {
    if (resolvingName) return;
    setResolvingName(file.name);
    try {
      const res = await base44.functions.invoke('ResolveYandexDownload', {
        public_key: publicKey,
        path: file.path,
      });
      const href = res?.data?.href;
      if (!href) throw new Error('Не удалось получить ссылку для скачивания');
      window.location.href = href;
    } catch (e) {
      alert('Ошибка при подготовке скачивания: ' + (e?.message || e));
    } finally {
      setResolvingName(null);
    }
  };

  const fileHover = (file) => {
    if (!file.preview) return {};
    return {
      onMouseEnter: (e) => setPreview({ url: file.preview, x: e.clientX, y: e.clientY }),
      onMouseMove: (e) => setPreview({ url: file.preview, x: e.clientX, y: e.clientY }),
      onMouseLeave: () => setPreview(null),
    };
  };

  return (
    <div className="db-sub-nested">
      <button
        className="db-sub-head db-sub-head-nested"
        type="button"
        onClick={toggle}
        aria-expanded={open}
      >
        <span className="db-sub-title">{asset.title}</span>
        <ChevronDown className={`db-sub-chev${open ? ' is-open' : ''}`} size={18} strokeWidth={2} />
      </button>
      {open && (
        <div className="db-list">
          {loading && <div className="db-sub-empty">Загрузка файлов…</div>}
          {!loading && error && (
            <div className="db-sub-empty" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span>Ошибка загрузки: {error}</span>
              <button
                type="button"
                onClick={retry}
                style={{
                  background: '#BFDE00', color: '#1A1A1A', border: 'none', borderRadius: '6px',
                  padding: '4px 12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Повторить
              </button>
            </div>
          )}
          {!loading && !error && files && files.length === 0 && (
            <div className="db-sub-empty">Файлов не найдено</div>
          )}
          {!loading && files && files.length > 0 && files.map((f) => (
            <div
              key={f.path}
              className="db-item is-link db-item-nested"
              onClick={() => handleFileClick(f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFileClick(f);
                }
              }}
              {...fileHover(f)}
            >
              <span className="db-item-row">
                <Download className="db-item-icon" size={16} strokeWidth={2} />
                <span className="db-item-text">
                  {resolvingName === f.name ? `${f.name} (подготовка…)` : f.name}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
      {preview && (
        <div className="db-preview" style={{ left: preview.x + 18, top: preview.y + 18 }}>
          <img src={preview.url} alt="" />
        </div>
      )}
    </div>
  );
}