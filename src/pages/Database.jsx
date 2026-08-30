import { useEffect, useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PanelRadiatorFolder from '@/components/database/PanelRadiatorFolder';
import { triggerDownload } from '@/lib/yandexDownload';

const LIME = '#BFDE00';
const DARK = '#1A1A1A';
const SECTIONS = [
  { key: 'Фотобанк', label: 'Фотобанк' },
  { key: 'Полиграфия', label: 'Буклеты и прайсы' },
  { key: 'BIM', label: 'BIM модели (Revit, формат *.rfa)' },
];
const PHOTOBANK_SUBSECTIONS = [
  'Логотип',
  'Панельные радиаторы',
  'Трубчатые радиаторы',
  'Внутрипольные конвекторы',
  'Напольные конвекторы',
];

const SECTION_STYLE = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${DARK}; }
  .db-page { background: ${DARK}; color: #fff; font-family: 'Segoe UI', 'Arial', sans-serif; min-height: 100vh; }

  .db-hero {
    padding: 64px 48px 40px; text-align: center;
    background: transparent;
  }
  .db-hero h1 { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #fff; margin-bottom: 12px; }
  .db-hero p { font-size: 15px; color: #aaa; max-width: 620px; margin: 0 auto; line-height: 1.7; }

  .db-body { max-width: 820px; margin: 0 auto; padding: 24px 48px 64px; }

  .db-section { margin-bottom: 48px; }
  .db-section-head {
    margin-bottom: 16px; padding-bottom: 12px;
    border-bottom: 2px solid ${LIME};
  }
  .db-section-title { font-size: 22px; font-weight: 900; color: #fff; letter-spacing: .5px; }

  .db-list { display: flex; flex-direction: column; gap: 2px; }
  .db-item {
    display: block;
    padding: 14px 0; background: transparent;
    border: 1px solid transparent; border-radius: 8px;
    transition: background .2s, border-color .2s, transform .15s;
  }
  .db-item.is-link { cursor: pointer; }
  .db-item.is-link:hover {
    background: rgba(191,222,0,.08); border-color: rgba(191,222,0,.3);
    transform: translateX(4px);
  }
  .db-item-row { display: flex; align-items: center; gap: 10px; }
  .db-item-icon { flex-shrink: 0; color: ${LIME}; }
  .db-item-text { font-size: 15px; font-weight: 400; color: #fff; line-height: 1.4; }
  .db-item.is-dim .db-item-text { color: #666; }
  .db-item.is-dim .db-item-icon { color: #444; }

  /* ===== Accordion (Фотобанк subsections) ===== */
  .db-accordion { display: flex; flex-direction: column; }
  .db-sub { border-bottom: 1px solid #2a2a2a; }
  .db-sub:last-child { border-bottom: none; }
  .db-sub-head {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 16px 4px; background: transparent; border: none;
    cursor: pointer; color: #fff; font-family: inherit;
    transition: color .2s, background .2s;
  }
  .db-sub-head:hover { color: ${LIME}; }
  .db-sub-title { font-size: 16px; font-weight: 700; letter-spacing: .3px; text-align: left; }
  .db-sub-chev { color: #888; transition: transform .25s ease, color .2s; flex-shrink: 0; }
  .db-sub-chev.is-open { transform: rotate(180deg); color: ${LIME}; }
  .db-sub .db-list { padding: 4px 0 12px; }
  .db-sub-empty { padding: 10px 4px 14px; font-size: 13px; color: #555; font-style: italic; }

  /* ===== Nested folder accordion (Панельные радиаторы) ===== */
  .db-sub-nested { padding-left: 14px; border-bottom: 1px solid #222; }
  .db-sub-nested:last-child { border-bottom: none; }
  .db-sub-head-nested { padding: 12px 4px; }
  .db-sub-head-nested .db-sub-title { font-size: 14px; font-weight: 600; }
  .db-item-nested { padding: 10px 0; }
  .db-item-nested .db-item-text { font-size: 13px; }

  /* ===== Hover preview tooltip ===== */
  .db-preview {
    position: fixed; z-index: 9999; pointer-events: none;
    background: #111; border: 1px solid #333; border-radius: 10px;
    padding: 8px; box-shadow: 0 8px 32px rgba(0,0,0,.7);
  }
  .db-preview img { width: 240px; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; }

  .db-loading { text-align: center; padding: 64px 20px; color: #888; font-size: 15px; }
  .db-spinner {
    width: 32px; height: 32px; border: 3px solid #2a2a2a; border-top-color: ${LIME};
    border-radius: 50%; margin: 0 auto 16px; animation: db-spin .8s linear infinite;
  }
  @keyframes db-spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .db-hero { padding: 48px 20px 32px; }
    .db-body { padding: 20px 20px 48px; }
    .db-section-title { font-size: 19px; }
    .db-item-text { font-size: 14px; }
    .db-sub-title { font-size: 15px; }
    .db-preview img { width: 180px; max-height: 180px; }
  }
`;

export default function Database() {
  const [assetsBySection, setAssetsBySection] = useState({});
  const [loading, setLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleYandexDownload = async (asset) => {
    if (resolvingId) return;
    setResolvingId(asset.id);
    try {
      const raw = asset.file_url.slice('yandex:'.length);
      const [pk, pth] = raw.includes('::') ? raw.split('::') : [raw, undefined];
      const payload = { public_key: pk };
      if (pth) payload.path = pth;
      const res = await base44.functions.invoke('ResolveYandexDownload', payload);
      const href = res?.data?.href;
      if (!href) throw new Error('Не удалось получить ссылку для скачивания');
      triggerDownload(href);
    } catch (e) {
      alert('Ошибка при подготовке скачивания: ' + (e?.message || e));
    } finally {
      setResolvingId(null);
    }
  };

  const hoverProps = (asset) => {
    if (!asset.preview_image_url) return {};
    return {
      onMouseEnter: (e) => setPreview({ url: asset.preview_image_url, x: e.clientX, y: e.clientY }),
      onMouseMove: (e) => setPreview({ url: asset.preview_image_url, x: e.clientX, y: e.clientY }),
      onMouseLeave: () => setPreview(null),
    };
  };

  const renderAssetItem = (asset) => {
    const hasFile = Boolean(asset.file_url);
    const hp = hoverProps(asset);
    if (hasFile && asset.file_url.startsWith('yandex:')) {
      const isResolving = resolvingId === asset.id;
      return (
        <div
          className="db-item is-link"
          key={asset.id}
          onClick={() => handleYandexDownload(asset)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleYandexDownload(asset); } }}
          {...hp}
        >
          <span className="db-item-row">
            <Download className="db-item-icon" size={16} strokeWidth={2} />
            <span className="db-item-text">{isResolving ? asset.title + ' (подготовка…)' : asset.title}</span>
          </span>
        </div>
      );
    }
    return hasFile ? (
      <a
        className="db-item is-link"
        key={asset.id}
        href={asset.file_url}
        target="_blank"
        rel="noopener noreferrer"
        download
        {...hp}
      >
        <span className="db-item-row">
          <Download className="db-item-icon" size={16} strokeWidth={2} />
          <span className="db-item-text">{asset.title}</span>
        </span>
      </a>
    ) : (
      <div className="db-item is-dim" key={asset.id} {...hp}>
        <span className="db-item-row">
          <Download className="db-item-icon" size={16} strokeWidth={2} />
          <span className="db-item-text">{asset.title}</span>
        </span>
      </div>
    );
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    base44.entities.DatabaseAsset.list('order', 500)
      .then(list => {
        if (!mounted) return;
        const grouped = {};
        (list || []).forEach(a => {
          if (!grouped[a.section]) grouped[a.section] = [];
          grouped[a.section].push(a);
        });
        setAssetsBySection(grouped);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) {
          setAssetsBySection({});
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  const photoBySub = {};
  (assetsBySection['Фотобанк'] || []).forEach(a => {
    const sub = a.subsection || 'Без подраздела';
    if (!photoBySub[sub]) photoBySub[sub] = [];
    photoBySub[sub].push(a);
  });

  return (
    <div className="db-page">
      <style>{SECTION_STYLE}</style>

      <div className="db-hero">
        <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/26e20f0a6_Kermi-Logo_t.png" alt="KERMI" style={{ height: '56px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '20px', display: 'block', margin: '0 auto 20px' }} />
        <h1>Материалы и ресурсы KERMI</h1>
        <p>Для проектировщиков, дилеров и партнёров.</p>
      </div>

      {loading ? (
        <div className="db-loading">
          <div className="db-spinner" />
          Загрузка материалов…
        </div>
      ) : (
        <div className="db-body">
          {SECTIONS.map(sec => {
            const items = assetsBySection[sec.key] || [];

            if (sec.key === 'Фотобанк') {
              return (
                <div className="db-section" key={sec.key}>
                  <div className="db-section-head">
                    <div className="db-section-title">{sec.label}</div>
                  </div>
                  <div className="db-accordion">
                    {PHOTOBANK_SUBSECTIONS.map(sub => {
                      const subItems = photoBySub[sub] || [];
                      const isOpen = openSub === sub;
                      return (
                        <div className="db-sub" key={sub}>
                          <button
                            className="db-sub-head"
                            type="button"
                            onClick={() => setOpenSub(isOpen ? null : sub)}
                            aria-expanded={isOpen}
                          >
                            <span className="db-sub-title">{sub}</span>
                            <ChevronDown className={`db-sub-chev${isOpen ? ' is-open' : ''}`} size={20} strokeWidth={2} />
                          </button>
                          {isOpen && (
                            <div className="db-list">
                              {subItems.length === 0 ? (
                                <div className="db-sub-empty">Файлов пока нет</div>
                              ) : sub === 'Панельные радиаторы' ? (
                                subItems.map(asset => <PanelRadiatorFolder key={asset.id} asset={asset} />)
                              ) : sub === 'Трубчатые радиаторы' ? (
                                subItems.map(asset => <PanelRadiatorFolder key={asset.id} asset={asset} />)
                              ) : sub === 'Внутрипольные конвекторы' ? (
                                subItems.map(asset => <PanelRadiatorFolder key={asset.id} asset={asset} />)
                              ) : (
                                subItems.map(asset => renderAssetItem(asset))
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (items.length === 0) return null;
            return (
              <div className="db-section" key={sec.key}>
                <div className="db-section-head">
                  <div className="db-section-title">{sec.label}</div>
                </div>
                <div className="db-list">
                  {items.map(asset => renderAssetItem(asset))}
                </div>
              </div>
            );
          })}
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