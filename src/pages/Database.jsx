import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const LIME = '#BFDE00';
const DARK = '#1A1A1A';
const SECTIONS = [
  { key: 'Фотобанк', label: 'Фотобанк' },
  { key: 'Полиграфия', label: 'Буклеты и прайсы' },
  { key: 'BIM', label: 'BIM модели' },
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
    padding: 14px 18px; background: transparent;
    border: 1px solid transparent; border-radius: 8px;
    transition: background .2s, border-color .2s, transform .15s;
  }
  .db-item.is-link { cursor: pointer; }
  .db-item.is-link:hover {
    background: rgba(191,222,0,.08); border-color: rgba(191,222,0,.3);
    transform: translateX(4px);
  }
  .db-item-text { font-size: 15px; font-weight: 600; color: #fff; line-height: 1.4; }
  .db-item.is-dim .db-item-text { color: #666; font-weight: 500; }

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
  }
`;

export default function Database() {
  const [assetsBySection, setAssetsBySection] = useState({});
  const [loading, setLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState(null);

  const handleYandexDownload = async (asset) => {
    if (resolvingId) return;
    setResolvingId(asset.id);
    try {
      const res = await base44.functions.invoke('ResolveYandexDownload', {
        public_key: asset.file_url.slice('yandex:'.length)
      });
      const href = res?.data?.href;
      if (!href) throw new Error('Не удалось получить ссылку для скачивания');
      window.location.href = href;
    } catch (e) {
      alert('Ошибка при подготовке скачивания: ' + (e?.message || e));
    } finally {
      setResolvingId(null);
    }
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
            if (items.length === 0) return null;
            return (
              <div className="db-section" key={sec.key}>
                <div className="db-section-head">
                  <div className="db-section-title">{sec.label}</div>
                </div>
                <div className="db-list">
                  {items.map(asset => {
                    const hasFile = Boolean(asset.file_url);
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
                        >
                          <span className="db-item-text">{isResolving ? asset.title + ' (подготовка…)' : asset.title}</span>
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
                      >
                        <span className="db-item-text">{asset.title}</span>
                      </a>
                    ) : (
                      <div className="db-item is-dim" key={asset.id}>
                        <span className="db-item-text">{asset.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}