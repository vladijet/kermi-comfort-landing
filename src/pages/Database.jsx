import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const LIME = '#BFDE00';
const DARK = '#1A1A1A';
const SECTIONS = [
  { key: 'Фотобанк', label: 'Фотобанк Kermi' },
  { key: 'Полиграфия', label: 'Полиграфия Kermi' },
  { key: 'BIM', label: 'BIM модели Kermi' },
];

const SECTION_STYLE = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${DARK}; }
  .db-page { background: ${DARK}; color: #fff; font-family: 'Segoe UI', 'Arial', sans-serif; min-height: 100vh; }
  .db-header {
    position: sticky; top: 0; z-index: 50;
    background: #111; border-bottom: 1px solid #2a2a2a;
    padding: 18px 48px; display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 2px 16px rgba(0,0,0,.5);
  }
  .db-logo { display: flex; align-items: center; gap: 12px; }
  .db-logo-img { height: 40px; width: auto; filter: brightness(0) invert(1); }
  .db-logo-text { font-size: 18px; font-weight: 900; letter-spacing: 2px; color: #fff; }
  .db-logo-sub { font-size: 11px; color: #888; letter-spacing: 1px; margin-top: 1px; }
  .db-back {
    color: #ccc; font-size: 13px; font-weight: 600; text-decoration: none;
    padding: 8px 18px; border: 1px solid #333; border-radius: 6px; transition: all .2s;
  }
  .db-back:hover { color: ${LIME}; border-color: ${LIME}; }

  .db-hero {
    padding: 64px 48px 40px; text-align: center;
    background: linear-gradient(135deg, #111 0%, #161616 60%, #182008 100%);
  }
  .db-hero-tag {
    display: inline-block; background: ${LIME}; color: ${DARK};
    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 12px; margin-bottom: 18px; border-radius: 4px;
  }
  .db-hero h1 { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #fff; margin-bottom: 12px; }
  .db-hero h1 span { color: ${LIME}; }
  .db-hero p { font-size: 15px; color: #aaa; max-width: 620px; margin: 0 auto; line-height: 1.7; }

  .db-tabs {
    display: flex; gap: 0; justify-content: center; flex-wrap: wrap;
    padding: 0 48px; border-bottom: 1px solid #2a2a2a; background: #141414;
  }
  .db-tab {
    padding: 16px 28px; font-size: 15px; font-weight: 700; cursor: pointer;
    border: none; background: none; color: #888;
    border-bottom: 3px solid transparent; margin-bottom: -1px;
    transition: color .2s, border-color .2s; white-space: nowrap;
  }
  .db-tab:hover { color: #ccc; }
  .db-tab.active { color: ${LIME}; border-bottom-color: ${LIME}; }

  .db-subtabs {
    display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
    padding: 28px 48px 8px;
  }
  .db-subtab {
    padding: 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer;
    background: rgba(255,255,255,.05); color: #bbb; border: 1px solid #2a2a2a;
    border-radius: 20px; transition: all .2s; white-space: nowrap;
  }
  .db-subtab:hover { color: ${LIME}; border-color: ${LIME}; }
  .db-subtab.active { background: ${LIME}; color: ${DARK}; border-color: ${LIME}; font-weight: 700; }

  .db-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; padding: 32px 48px 64px;
  }
  .db-card {
    background: #141414; border: 1px solid #2a2a2a; border-radius: 12px;
    overflow: hidden; display: flex; flex-direction: column;
    transition: box-shadow .25s, transform .25s, border-color .25s;
  }
  .db-card:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,.4); transform: translateY(-4px);
    border-color: rgba(191,222,0,.3);
  }
  .db-card-preview {
    width: 100%; height: 180px; background: #1f1f1f;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .db-card-preview img { width: 100%; height: 100%; object-fit: contain; }
  .db-card-preview .placeholder {
    color: #444; font-size: 13px; text-align: center; padding: 16px;
  }
  .db-card-body { padding: 18px 20px; display: flex; flex-direction: column; flex: 1; gap: 8px; }
  .db-card-title { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.3; }
  .db-card-desc { font-size: 13px; color: #aaa; line-height: 1.5; flex: 1; }
  .db-card-btn {
    margin-top: 10px; padding: 10px 18px; background: ${LIME}; color: ${DARK};
    font-size: 13px; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;
    text-decoration: none; text-align: center; transition: opacity .2s;
    display: inline-block;
  }
  .db-card-btn:hover { opacity: .85; }

  .db-empty {
    text-align: center; padding: 64px 20px; color: #555; font-size: 15px;
  }
  .db-loading {
    text-align: center; padding: 64px 20px; color: #888; font-size: 15px;
  }
  .db-spinner {
    width: 32px; height: 32px; border: 3px solid #2a2a2a; border-top-color: ${LIME};
    border-radius: 50%; margin: 0 auto 16px; animation: db-spin .8s linear infinite;
  }
  @keyframes db-spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .db-header { padding: 14px 20px; }
    .db-hero { padding: 48px 20px 32px; }
    .db-tabs { padding: 0 20px; }
    .db-tab { padding: 14px 18px; font-size: 13px; }
    .db-subtabs { padding: 24px 16px 8px; }
    .db-grid { padding: 24px 20px 48px; grid-template-columns: 1fr; }
  }
`;

export default function Database() {
  const [activeSection, setActiveSection] = useState('Фотобанк');
  const [activeSub, setActiveSub] = useState('all');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    base44.entities.DatabaseAsset.filter({ section: activeSection }, 'order', 500)
      .then(list => {
        if (mounted) {
          setAssets(list || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setAssets([]);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [activeSection]);

  const subsections = ['all', ...Array.from(new Set(assets.map(a => a.subsection).filter(Boolean)))];

  const visibleAssets = activeSub === 'all'
    ? assets
    : assets.filter(a => a.subsection === activeSub);

  return (
    <div className="db-page">
      <style>{SECTION_STYLE}</style>

      <header className="db-header">
        <a className="db-logo" href="/">
          <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/26e20f0a6_Kermi-Logo_t.png" alt="KERMI" className="db-logo-img" />
          <div>
            <div className="db-logo-text">KERMI</div>
            <div className="db-logo-sub">база данных · Комфорт</div>
          </div>
        </a>
        <a className="db-back" href="/">← На главную</a>
      </header>

      <div className="db-hero">
        <div className="db-hero-tag">База данных Kermi</div>
        <h1>Материалы и ресурсы<br /><span>KERMI Комфорт</span></h1>
        <p>Фотобанк, полиграфия и BIM-модели для проектировщиков, дилеров и партнёров.</p>
      </div>

      <div className="db-tabs">
        {SECTIONS.map(s => (
          <button
            key={s.key}
            className={`db-tab${activeSection === s.key ? ' active' : ''}`}
            onClick={() => { setActiveSection(s.key); setActiveSub('all'); }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {subsections.length > 1 && (
        <div className="db-subtabs">
          {subsections.map(sub => (
            <button
              key={sub}
              className={`db-subtab${activeSub === sub ? ' active' : ''}`}
              onClick={() => setActiveSub(sub)}
            >
              {sub === 'all' ? 'Все' : sub}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="db-loading">
          <div className="db-spinner" />
          Загрузка материалов…
        </div>
      ) : visibleAssets.length === 0 ? (
        <div className="db-empty">В этом разделе пока нет материалов.</div>
      ) : (
        <div className="db-grid">
          {visibleAssets.map(asset => (
            <div className="db-card" key={asset.id}>
              <div className="db-card-preview">
                {asset.preview_image_url ? (
                  <img src={asset.preview_image_url} alt={asset.title} loading="lazy" />
                ) : (
                  <div className="placeholder">Нет превью</div>
                )}
              </div>
              <div className="db-card-body">
                <div className="db-card-title">{asset.title}</div>
                {asset.description && <div className="db-card-desc">{asset.description}</div>}
                {asset.file_url && (
                  <a className="db-card-btn" href={asset.file_url} target="_blank" rel="noopener noreferrer">
                    Скачать / Открыть
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}