import { useEffect } from 'react';

const LANDING_HTML = `
<style>
  /* ========== RESET & BASE ========== */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow-x: hidden; max-width: 100%; }
  body { padding-top: 64px; }
  :root {
    --lime:    #BFDE00;
    --lime-d:  #A0BB00;
    --dark:    #1A1A1A;
    --grey:    #555;
    --lgrey:   #f4f4f4;
    --mgrey:   #e0e0e0;
    --white:   #ffffff;
    --red:     #c0392b;
    --green:   #2e7d32;
    --font: 'Segoe UI', 'Arial', sans-serif;
  }
  html { scroll-behavior: smooth; }
  section[id], div[id="footer"], div[id="hero"] { scroll-margin-top: 80px; }
  body { font-family: var(--font); color: var(--dark); background: var(--white); line-height: 1.6; }
  img { max-width: 100%; display: block; }
  a { text-decoration: none; color: inherit; }

  /* ========== NAVBAR ========== */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: var(--dark); height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    box-shadow: 0 2px 12px rgba(0,0,0,.4);
    overflow: visible;
  }
  .nav-logo { display: flex; align-items: center; gap: 12px; }
  .nav-logo-img { height: 48px; width: auto; filter: brightness(0) invert(1); }
  .nav-logo-text {
    font-size: 22px; font-weight: 900; letter-spacing: 2px;
    color: var(--white);
  }
  .nav-logo-sub { font-size: 11px; color: #aaa; letter-spacing: 1px; margin-top: 1px; }
  .nav-links { display: flex; gap: 4px; flex-wrap: nowrap; max-width: calc(100vw - 260px); overflow: hidden; align-items: center; }
  .nav-links a {
    color: #ccc; font-size: 12px; padding: 6px 10px; border-radius: 6px; white-space: nowrap; flex-shrink: 0;
    transition: color .2s, background .2s; line-height: 1.2;
  }
  .nav-links a:hover { color: var(--white); background: rgba(255,255,255,.08); }
  .nav-cta {
    background: var(--lime); color: var(--dark) !important;
    font-weight: 700; padding: 10px 20px !important; border-radius: 6px;
    line-height: 1.2; display: inline-flex; align-items: center;
  }
  .nav-cta:hover { background: var(--lime-d) !important; }
  .nav-phone-header-mobile {
    display: none;
    align-items: center;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.3px;
    white-space: nowrap;
    flex: 1;
    justify-content: center;
  }

  /* ========== HERO ========== */
  .hero {
    position: relative; overflow: hidden;
    min-height: 560px;
    background: linear-gradient(135deg, #111111 0%, #161616 25%, #1a1a1a 55%, #182008 80%, #0f1a02 100%);
    display: flex; align-items: center; padding: 80px 48px;
  }
  .hero::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent 0%, #1a1a1a 100%);
    pointer-events: none;
    z-index: 1;
  }
  .hero-bg-accent {
    position: absolute; right: 0; top: 0; bottom: 0; width: 45%;
    background: linear-gradient(135deg, transparent 40%, rgba(191,222,0,.05) 70%, rgba(191,222,0,.13) 100%);
    pointer-events: none;
  }
  .hero-content { max-width: 600px; position: relative; z-index: 2; }
  .hero-tag {
    display: inline-block; background: var(--lime); color: var(--dark);
    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 12px; margin-bottom: 24px; border-radius: 4px;
  }
  .hero h1 {
    font-size: clamp(32px, 4vw, 54px); font-weight: 900;
    color: var(--white); line-height: 1.1; margin-bottom: 20px;
  }
  .hero h1 span { color: var(--lime); }
  .hero-sub { font-size: 17px; color: #bbb; margin-bottom: 36px; line-height: 1.7; }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--lime); color: var(--dark); font-size: 14px; font-weight: 700;
    padding: 14px 32px; border: none; cursor: pointer; transition: background .2s;
    letter-spacing: .5px; border-radius: 6px;
  }
  .btn-primary:hover { background: var(--lime-d); }
  .btn-outline {
    background: transparent; color: var(--white); font-size: 14px; font-weight: 600;
    padding: 13px 32px; border: 1.5px solid rgba(255,255,255,.35); cursor: pointer;
    transition: border-color .2s, color .2s; border-radius: 6px;
  }
  .btn-outline:hover { border-color: var(--lime); color: var(--lime); }

  .stat { text-align: center; }

  .hero-inner {
    max-width: 1200px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px; align-items: center; position: relative; z-index: 2;
  }
  .hero-right {
    display: flex; flex-direction: column; align-items: center; gap: 0;
  }
  .hero-right img {
    width: 100%; max-width: 520px;
    filter: drop-shadow(0 20px 60px rgba(0,0,0,.55));
    display: block;
  }
  .hero-stats-row {
    display: flex; gap: 0; width: 100%; max-width: 520px;
    background: rgba(0,0,0,.35); border-radius: 8px;
  }
  .hero-stats-row .stat {
    flex: 1; padding: 14px 8px; text-align: center;
    border-right: 1px solid rgba(255,255,255,.08);
  }
  .hero-stats-row .stat:last-child { border-right: none; }
  .hero-stats-row .stat-val { font-size: 28px; font-weight: 900; color: var(--lime); line-height: 1; }
  .hero-stats-row .stat-lbl { font-size: 10px; color: #999; margin-top: 3px; letter-spacing: .5px; text-transform: uppercase; }
  @media (max-width: 860px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-right { display: none; }
  }

  /* ========== SECTION COMMONS ========== */
  section { padding: 80px 48px; }
  .section-tag {
    display: inline-block; background: var(--lime); color: var(--dark);
    font-size: 10px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase;
    padding: 3px 10px; margin-bottom: 12px; border-radius: 4px;
  }
  h2 { font-size: clamp(24px, 3vw, 38px); font-weight: 900; line-height: 1.15; margin-bottom: 16px; }
  .lead { font-size: 16px; color: var(--grey); max-width: 680px; line-height: 1.8; }
  .container { max-width: 1200px; margin: 0 auto; }
  .divider { width: 48px; height: 3px; background: var(--lime); margin: 20px 0; }

  /* ========== ПРОИЗВОДСТВО ========== */
  .production { background: var(--dark); color: var(--white); }
  .production h2 { color: var(--white); }
  .production .lead { color: #ccc; }
  .production .divider { background: var(--lime); }
  .prod-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 48px; }
  .prod-items { display: flex; flex-direction: column; gap: 20px; }
  .prod-item { display: flex; gap: 16px; align-items: flex-start; }
  .prod-icon {
    width: 15px; height: 15px; min-width: 15px;
    background: var(--lime); flex-shrink: 0; margin-top: 4px;
  }
  .prod-item-text h4 { font-size: 15px; font-weight: 700; color: var(--white); margin-bottom: 3px; }
  .prod-item-text p { font-size: 13px; color: #aaa; }
  .prod-photo-placeholder {
    background: #2a2a2a; border: 1px solid #333;
    min-height: 360px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 12px; border-radius: 2px;
  }
  .prod-photo-placeholder span { color: #555; font-size: 13px; }

  /* ========== СРАВНЕНИЕ ========== */
  .compare { background: var(--white); }
  .compare-table { margin-top: 48px; overflow-x: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,.07); }
  table { width: 100%; border-collapse: collapse; font-size: 14.5px; }
  thead tr { background: var(--dark); }
  thead th { color: var(--white); padding: 16px 24px; text-align: left; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; }
  thead th:nth-child(2) { background: var(--dark); color: var(--lime); border-left: 3px solid var(--lime); }
  tbody tr { transition: background .15s; }
  tbody tr:nth-child(even) { background: #f8f9fa; }
  tbody tr:hover { background: #f0f4e8; }
  tbody td { padding: 15px 24px; border-bottom: 1px solid #e8e8e8; vertical-align: middle; color: #1a1a1a; }
  tbody td:first-child { font-weight: 600; color: #333; width: 40%; }
  tbody td:nth-child(2) { border-left: 3px solid var(--lime); }
  .td-bad { color: #1a1a1a; }
  .td-good { color: #1a1a1a; font-weight: 500; }
  .td-neutral { color: #555; }

  /* ========== МОДЕЛИ ========== */
  .models { background: var(--lgrey); }
  .models-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 48px; }
  .model-card {
    background: var(--white); border-top: none;
    padding: 0 0 20px 0; transition: box-shadow .25s, transform .25s;
    display: flex; flex-direction: column; overflow: hidden; border-radius: 10px;
  }
  .model-card-img {
    width: 100%; background: #f8f8f8;
    display: flex; align-items: center; justify-content: center;
    padding: 12px 8px 8px; border-bottom: 1px solid var(--mgrey);
    min-height: 90px;
  }
  .model-card-img img {
    max-height: 80px; width: 100%; object-fit: contain;
    filter: contrast(1.1);
  }
  .model-card-img-caption {
    font-size: 9px; color: #aaa; text-align: center;
    padding: 4px 8px 0; background: #f8f8f8;
    border-bottom: 1px solid var(--mgrey);
    letter-spacing: .3px;
  }
  .model-card-body { padding: 16px 20px 0; display: flex; flex-direction: column; flex: 1; }
  .model-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,.1); transform: translateY(-4px); }
  .model-series { font-size: 26px; font-weight: 900; color: var(--dark); margin-bottom: 2px; line-height: 1; }
  .model-name { font-size: 11px; color: var(--grey); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
  .model-badge {
    display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: .5px;
    padding: 3px 7px; margin-bottom: 14px; text-transform: uppercase; width: fit-content; border-radius: 4px;
  }
  .badge-green { background: #e8f5e9; color: var(--green); }
  .badge-yellow { background: #fff8e1; color: #b07000; }
  .badge-blue { background: #e3f2fd; color: #0d47a1; }
  .model-specs { display: flex; flex-direction: column; gap: 0; }
  .model-spec {
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 12px; padding: 5px 0;
    border-bottom: 1px solid var(--mgrey);
  }
  .model-spec:last-child { border-bottom: none; }
  .model-spec-key { color: var(--grey); white-space: nowrap; flex-shrink: 0; margin-right: 8px; }
  .model-spec-val { font-weight: 600; text-align: right; white-space: nowrap; }
  .model-note { font-size: 11px; color: var(--red); margin-top: 12px; line-height: 1.4; }
  .model-note-green { font-size: 11px; color: var(--green); margin-top: 12px; line-height: 1.4; }
  .model-note-info {
    font-size: 11px; color: #aaa; font-style: italic;
    line-height: 1.4; display: block;
    margin: 10px 0 0 0; width: 100%;
  }

  .model-card-v2 {
    cursor: pointer; border-top: none;
    transition: box-shadow .25s, transform .2s; border-radius: 10px; overflow: hidden;
  }
  .model-card-v2.active { box-shadow: 0 8px 32px rgba(191,222,0,.2); }
  .model-card-v2:hover { transform: translateY(-3px); }
  .model-card-v2 { display: flex; flex-direction: column; }
  .model-card-v2 .model-card-body { padding: 20px 20px 0; display: flex; flex-direction: column; flex: 1; }

  .type-selector-wrap { margin-top: 40px; }
  .type-selector { background: var(--white); border: none; border-radius: 10px; overflow: hidden; }
  .type-selector-header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
    padding: 16px 24px; background: var(--dark); border-bottom: 1px solid #333;
  }
  .type-selector-title { font-size: 14px; color: #ccc; white-space: nowrap; }
  .type-selector-title strong { color: var(--lime); }
  .type-btns-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .type-btn {
    background: rgba(255,255,255,.08); border: 1.5px solid transparent;
    color: #aaa; font-size: 13px; font-weight: 700; padding: 5px 14px;
    cursor: pointer; transition: all .18s; letter-spacing: .5px; border-radius: 6px;
  }
  .type-btn:hover { background: rgba(191,222,0,.15); color: var(--lime); border-color: rgba(191,222,0,.4); }
  .type-btn.active { background: var(--lime); color: var(--dark); border-color: var(--lime); }
  .type-info-row {
    display: grid; grid-template-columns: 180px 1fr;
    gap: 0; align-items: center;
    border-top: 1px solid var(--mgrey);
  }
  .type-depth-badge {
    padding: 24px 28px; background: transparent;
    border-right: none;
    display: flex; flex-direction: column; gap: 0; align-items: flex-start;
  }
  .type-depth-badge .type-lbl { margin-bottom: 0; }
  .type-depth-badge .type-num { margin-bottom: 14px; line-height: 1; }
  .type-depth-badge .type-depth { margin-bottom: 6px; line-height: 1; }
  .type-depth-badge .type-desc-small { margin-top: 2px; }
  .type-num { font-size: 32px; font-weight: 900; color: var(--dark); line-height: 1; }
  .type-depth { font-size: 22px; font-weight: 700; color: var(--lime); }
  .type-desc-small { font-size: 11px; color: var(--grey); margin-top: 2px; }
  .type-lbl { font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: .5px; font-weight: 600; }
  .type-drawing {
    padding: 24px 32px; display: flex; align-items: center; justify-content: center;
    background: var(--white);
  }
  .type-drawing img {
    max-height: 160px; max-width: 100%; object-fit: contain;
    filter: contrast(1.05);
  }
  @media (max-width: 600px) {
    .type-info-row { grid-template-columns: 1fr; }
    .type-depth-badge { border-right: none; border-bottom: 1px solid var(--mgrey); }
    .type-selector-header { flex-direction: column; align-items: flex-start; }
  }

  /* ========== АРТИКУЛ ========== */
  .article-section { background: var(--white); }
  .article-visual {
    display: flex; gap: 4px; flex-wrap: wrap;
    margin: 40px 0 16px;
  }
  .art-block {
    display: flex; flex-direction: column; align-items: center;
    min-width: 80px; flex: 1;
  }
  .art-box {
    width: 100%; padding: 14px 8px; text-align: center;
    font-size: 20px; font-weight: 900; letter-spacing: 1px;
    color: var(--dark); border-radius: 8px;
  }
  .art-arrow { font-size: 16px; color: var(--grey); margin: 6px 0 4px; }
  .art-desc { font-size: 10px; color: var(--grey); text-align: center; line-height: 1.4; }
  .art-examples { display: flex; flex-direction: column; gap: 12px; margin-top: 36px; }
  .art-example {
    display: flex; align-items: center; gap: 20px; padding: 16px 20px;
    border-left: none; background: var(--lgrey); border-radius: 8px;
  }
  .art-code { font-family: 'Courier New', monospace; font-size: 15px; font-weight: 700; min-width: 280px; }
  .art-desc-ex { font-size: 13px; color: var(--grey); }
  .ral-note {
    margin-top: 24px; padding: 16px 20px; border-radius: 8px;
    background: #fffbe6; border-left: none;
    font-size: 13px; color: var(--dark);
  }
  .ral-note strong { display: block; font-size: 15px; margin-bottom: 8px; }
  .ral-note-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px;
  }
  .ral-note-grid > div { line-height: 1.5; }
  @media (max-width: 600px) { .ral-note-grid { grid-template-columns: 1fr; } }

  /* ========== КОНСТРУКТИВ ========== */
  .construction { background: var(--lgrey); }
  .constr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-top: 48px; }
  .feature-list { display: flex; flex-direction: column; gap: 0; }
  .feature-item {
    display: grid; grid-template-columns: 52px 1fr;
    gap: 0; padding: 20px 0; border-bottom: 1px solid var(--mgrey);
    align-items: start;
  }
  .feature-item:first-child { border-top: 1px solid var(--mgrey); }
  .feature-num {
    font-size: 30px; font-weight: 900; color: var(--lime);
    padding-right: 16px; line-height: 1;
  }
  .feature-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .feature-text { font-size: 13px; color: var(--grey); line-height: 1.6; }
  .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .kpi-box {
    padding: 24px; background: var(--white); text-align: center;
    border: none; border-radius: 10px;
  }
  .kpi-val { font-size: 36px; font-weight: 900; color: var(--dark); line-height: 1; }
  .kpi-lbl { font-size: 12px; color: var(--grey); margin-top: 6px; text-transform: uppercase; letter-spacing: .5px; }

  /* ========== ТЕРМОВЕНТИЛЬ ========== */
  .valve { background: var(--dark); color: var(--white); }
  .valve h2 { color: var(--white); }
  .valve .lead { color: #ccc; }
  .valve .divider { background: var(--lime); }
  .valve-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; margin-top: 48px; }
  .valve-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }
  .v-spec {
    padding: 20px; background: rgba(255,255,255,.05);
    border-left: 3px solid var(--lime); border-radius: 8px;
  }
  .v-spec-val { font-size: 24px; font-weight: 900; color: var(--lime); margin-bottom: 4px; }
  .v-spec-lbl { font-size: 12px; color: #aaa; }
  .valve-notice {
    margin-top: 32px; padding: 16px 20px;
    background: rgba(191,222,0,.1); border-left: 3px solid var(--lime);
    font-size: 13px; color: #ccc; border-radius: 8px;
  }

  /* ========== КРЕПЛЕНИЯ ========== */
  .mounting { background: var(--white); }
  .mount-tabs { display: flex; gap: 0; margin: 32px 0 0; }
  .mount-tab {
    padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer;
    border-bottom: 3px solid transparent; margin-bottom: -2px;
    transition: color .2s, border-color .2s; color: var(--grey);
  }
  .mount-tab.active { color: var(--dark); border-color: var(--lime); }
  .mount-content { display: none; padding: 32px 0; }
  .mount-content.active { display: block; }
  .mount-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .mount-table { width: 100%; border-collapse: collapse; font-size: 13px; border-radius: 10px; overflow: hidden; }
  .mount-table th {
    background: var(--dark); color: var(--white); padding: 10px 16px;
    text-align: left; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
  }
  .mount-table td { padding: 10px 16px; border-bottom: 1px solid var(--mgrey); }
  .mount-table tr:nth-child(even) td { background: var(--lgrey); }
  .mount-list { display: flex; flex-direction: column; gap: 12px; }
  .mount-li {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 14px 16px; background: var(--lgrey); border-radius: 8px;
  }
  .mount-li-icon { font-size: 20px; }
  .mount-li-text h4 { font-size: 14px; font-weight: 700; margin-bottom: 3px; }
  .mount-li-text p { font-size: 12px; color: var(--grey); }
  .alert-box { border-radius: 8px;
    padding: 14px 20px; margin-bottom: 20px;
    border: none;
    font-size: 13px;
  }
  .alert-warn { background: #fff8e1; color: #5a3a00; }
  .alert-err  { background: #ffebee; color: #7a1010; }
  .alert-info { background: #e8f5e9; color: #1b4a1e; }

  /* ========== ПОДБОР ========== */
  .selection { background: var(--lgrey); }
  .sel-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 40px; }
  .sel-card { background: var(--white); padding: 28px 24px; border-top: 4px solid var(--dark); }
  .sel-card.lime-top { border-color: var(--lime); }
  .sel-card h3 { font-size: 16px; font-weight: 800; margin-bottom: 16px; }
  .sel-card ul { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .sel-card ul li { font-size: 13px; color: var(--grey); padding-left: 20px; position: relative; }
  .sel-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--lime); font-weight: 700; }
  .formula-box {
    background: var(--dark); color: var(--white); padding: 28px 32px;
    margin-top: 32px; display: flex; gap: 40px; align-items: center; flex-wrap: wrap;
  }
  .formula { font-family: 'Courier New', monospace; font-size: 18px; color: var(--lime); }
  .formula-desc { font-size: 13px; color: #aaa; max-width: 500px; }
  .config-cta {
    margin-top: 32px; padding: 24px 32px;
    background: var(--lime); display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }
  .config-cta-text h3 { font-size: 18px; font-weight: 900; }
  .config-cta-text p { font-size: 13px; color: #555; margin-top: 4px; }
  .config-cta-btn {
    background: var(--dark); color: var(--white); padding: 12px 28px;
    font-size: 14px; font-weight: 700; border: none; cursor: pointer; white-space: nowrap;
    transition: background .2s;
  }
  .config-cta-btn:hover { background: #333; }

  /* Вкладки подбора */
  .sel-tab {
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 700;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    color: #888;
    cursor: pointer;
    transition: all .2s;
    white-space: nowrap;
  }
  .sel-tab-active {
    border-bottom-color: var(--lime);
    color: var(--dark);
  }
  @media (max-width: 768px) {
    .sel-tab {
      padding: 10px 16px;
      font-size: 13px;
    }
  }
  @media (max-width: 420px) {
    .sel-tab {
      padding: 8px 10px;
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    #sel-tabs-wrapper { display: block; }
  }

  /* ========== RAL / ЦВЕТА ========== */
  .colors { background: var(--white); }
  .ral-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; margin-top: 48px; }
  .ral-grid > div:first-child { order: 2; }
  .ral-grid > div:last-child { order: 1; }
  .ral-swatches { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 24px; }
  .swatch { position: relative; }
  .swatch-color { height: 52px; border: none; border-radius: 6px; }
  .swatch-label { font-size: 9px; color: var(--grey); text-align: center; margin-top: 4px; }
  .ral-conditions { display: flex; flex-direction: column; gap: 16px; }
  .ral-cond-item {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 16px; background: var(--lgrey); border-radius: 8px;
  }
  .ral-cond-val { font-size: 26px; font-weight: 900; color: var(--lime); min-width: 56px; line-height: 1; }
  .ral-cond-text h4 { font-size: 14px; font-weight: 700; margin-bottom: 3px; }
  .ral-cond-text p { font-size: 13px; color: var(--grey); }

  /* ========== ГАРАНТИЯ ========== */
  .warranty { background: var(--dark); color: var(--white); }
  .warranty h2 { color: var(--white); }
  .warranty .lead { color: #ccc; }
  .warranty .divider { background: var(--lime); }
  .warranty-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 48px; align-items: start; }
  .warranty-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .wkpi {
    padding: 24px 20px; background: rgba(255,255,255,.05); text-align: center; border-radius: 10px;
  }
  .wkpi-val { font-size: 44px; font-weight: 900; color: var(--lime); line-height: 1; }
  .wkpi-lbl { font-size: 12px; color: #aaa; margin-top: 6px; text-transform: uppercase; }
  .warranty-list { display: flex; flex-direction: column; gap: 12px; }
  .warranty-li {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 16px; background: rgba(255,255,255,.04);
    border-left: 3px solid var(--lime); border-radius: 8px;
  }
  .warranty-li-icon { font-size: 18px; }
  .warranty-li-text { font-size: 13px; color: #ccc; }
  .warranty-li-text strong { color: var(--white); display: block; margin-bottom: 3px; font-size: 14px; }
  .water-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
  .water-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 16px; background: rgba(255,255,255,.04); border-radius: 8px;
  }
  .water-param { font-size: 13px; color: #aaa; }
  .water-val { font-size: 14px; font-weight: 700; color: var(--lime); }

  /* ===== DEALERS ===== */
  .dealer-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
  .dealer-icon { font-size: 14px; line-height: 1.5; flex-shrink: 0; }
  .dealers { background: var(--white); padding: 80px 0; }
  .dealers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 40px;
  }
  .dealer-city-block {}
  .dealer-city-name {
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--dark);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--lime);
    display: inline-block;
  }
  .dealer-card {
    background: var(--lgrey);
    border-radius: 10px;
    padding: 20px 20px;
  }
  .dealer-name {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .dealer-name a {
    color: var(--dark);
    text-decoration: none;
    border-bottom: 1px solid var(--lime);
    transition: color .2s;
  }
  .dealer-name a:hover { color: var(--lime); }
  .dealer-addr {
    font-size: 13px;
    color: var(--grey);
    line-height: 1.5;
    margin-bottom: 6px;
  }
  .dealer-phone a {
    font-size: 14px;
    font-weight: 600;
    color: var(--dark);
    text-decoration: none;
    transition: color .2s;
  }
  .dealer-phone a:hover { color: var(--lime); }
  @media (max-width: 900px) {
    .dealers-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 580px) {
    .dealers-grid { grid-template-columns: 1fr; }
    .dealers { padding: 48px 0; }
    .dealers .container { padding: 0 20px; }
    .dealers-grid { margin-left: 0; margin-right: 0; }
    .dealer-card { margin: 0; }
  }

  /* ========== FOOTER ========== */
  footer {
    background: #111; padding: 48px;
    display: flex; justify-content: space-between; align-items: flex-start;
    flex-wrap: wrap; gap: 32px;
  }
  .footer-brand .logo-text { font-size: 24px; font-weight: 900; color: var(--white); letter-spacing: 2px; }
  .footer-brand .logo-sub { font-size: 11px; color: #666; margin-top: 4px; }
  .footer-brand p { font-size: 12px; color: #555; margin-top: 16px; max-width: 280px; }
  .footer-links h4 { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
  .footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links ul li a { font-size: 13px; color: #999; transition: color .2s; }
  .footer-links ul li a:hover { color: var(--lime); }
  .footer-bottom {
    background: #0a0a0a; padding: 16px 48px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: #555; flex-wrap: wrap; gap: 8px;
  }

  /* ========== UTILS ========== */
  .text-lime { color: var(--lime); }
  .text-red { color: var(--red); }
  .text-green { color: var(--green); }
  .mt-8 { margin-top: 8px; }
  .mt-16 { margin-top: 16px; }
  .mb-0 { margin-bottom: 0; }

  /* ========== MOBILE BURGER MENU ========== */
  .nav-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px; height: 40px;
    background: none; border: none; cursor: pointer;
    padding: 8px;
  }
  .nav-burger span {
    display: block; width: 24px; height: 3px;
    background: #fff; border-radius: 2px;
    transition: all .3s ease;
  }
  .nav-burger.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .nav-burger.active span:nth-child(2) { opacity: 0; }
  .nav-burger.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: fixed; top: 64px; left: 0;
    width: 100vw;
    max-width: 100%;
    overflow-x: hidden;
    background: var(--dark);
    padding: 12px 16px 24px;
    gap: 4px;
    box-shadow: 0 8px 24px rgba(0,0,0,.5);
    z-index: 998;
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    transform: translateY(-110%);
    opacity: 0;
    pointer-events: none;
    transition: transform .25s ease, opacity .2s ease;
    box-sizing: border-box;
  }
  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .mobile-menu a {
    color: #ccc; font-size: 15px; padding: 14px 16px; border-radius: 8px;
    text-decoration: none; transition: all .2s;
    border-bottom: 1px solid rgba(255,255,255,.06);
    display: block;
    width: 100%;
    box-sizing: border-box;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mobile-menu a:hover, .mobile-menu a:active {
    color: var(--white); background: rgba(255,255,255,.08);
  }
  .mobile-menu a.nav-cta-mobile {
    background: var(--lime); color: var(--dark) !important;
    font-weight: 700; text-align: center;
    border-radius: 8px; margin-top: 8px;
    border-bottom: none;
    padding: 16px;
  }
  .mobile-menu .nav-phone-mobile {
    color: #fff; font-weight: 600; font-size: 16px;
    text-align: left; padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,.06);
    letter-spacing: .3px;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  /* ========== NAV RESPONSIVE (burger at 1000px) ========== */
  @media (max-width: 1000px) {
    .nav-links { display: none; }
    .nav-burger { display: flex; }
    .nav-phone { display: none; }
    .nav-phone-header-mobile { display: flex; }
  }

  /* Bracket photos */
  .bracket-card { background: var(--white); border: 1px solid var(--mgrey); border-radius: 8px; overflow: hidden; }
  .bracket-img { width: 100%; height: 160px; object-fit: contain; background: #f8f8f8; padding: 12px; }
  .bracket-info { padding: 12px 16px; }
  .bracket-art { font-size: 11px; font-weight: 800; color: var(--dark); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .bracket-name { font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 2px; }
  .bracket-sub { font-size: 11px; color: var(--grey); }
  .bracket-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
  .bracket-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 20px; }
  .bracket-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 20px; }
  .bracket-dims-img { width: 100%; border-radius: 8px; margin: 20px 0 8px; border: 1px solid var(--mgrey); }
  @media(max-width:640px){ .bracket-grid-3,.bracket-grid-4 { grid-template-columns: 1fr 1fr; } .bracket-grid-2 { grid-template-columns: 1fr; } }

  /* ========== RESPONSIVE ========== */
  @media (max-width: 768px) {
    nav { padding: 0 20px; }
    section { padding: 56px 20px; }
    .container { padding-left: 20px; padding-right: 20px; }
    .hero { padding: 64px 20px 120px; }

    .prod-grid, .constr-grid, .valve-grid, .compare-grid,
    .mount-grid, .ral-grid, .warranty-grid { grid-template-columns: 1fr; }
    .article-visual { gap: 2px; }
    .art-box { font-size: 15px; padding: 10px 4px; }
    footer { padding: 32px 20px; }
    .footer-bottom { padding: 12px 20px; }

    .hero-bg-accent { display: none; }
    .hero-btns { flex-direction: column; align-items: center; gap: 12px; }
    .btn-primary, .btn-outline {
      width: 100%;
      max-width: 280px;
      text-align: center;
    }

    /* === Преимущества: таблица === */
    .compare-table table { font-size: 13px; width: 100%; }
    .compare-table thead th { padding: 12px 10px; font-size: 10px; }
    .compare-table tbody td { padding: 10px 8px; word-break: break-word; }
    .compare-table tbody td:first-child { width: 38%; }

    /* === Артикул: карточки примеров === */
    .art-example { flex-direction: column; align-items: flex-start; padding: 12px; gap: 8px; }
    .art-code { min-width: 0; width: 100%; word-break: break-all; font-size: 14px; }
    .art-desc-ex { font-size: 12px; }

    /* === Конструктив: текст + KPI === */
    .feature-item { grid-template-columns: 40px 1fr; gap: 8px; padding: 16px 0; }
    .feature-num { font-size: 24px; padding-right: 8px; }
    .feature-title { font-size: 14px; }
    .feature-text { font-size: 12px; }
    .kpi-grid { grid-template-columns: 1fr; gap: 10px; justify-items: center; }
    .kpi-box { width: 100%; max-width: 300px; padding: 18px; }
    .kpi-val { font-size: 30px; }
    .kpi-lbl { font-size: 11px; }

    /* === Монтаж: сетки кронштейнов === */
    .mount-grid { gap: 24px; }
    .bracket-grid-3, .bracket-grid-4 { grid-template-columns: 1fr; }
    .bracket-grid-2 { grid-template-columns: 1fr; }
    /* инлайн-сетки внутри блоков кронштейнов -> одна колонка */
    .mount-content div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
    /* таблицы комплектации: горизонтальная прокрутка вместо обрезки */
    .mount-content table { display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .mount-table th, .mount-table td { padding: 8px 10px; font-size: 12px; }
    .mount-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .mount-tab { padding: 10px 14px; font-size: 13px; white-space: nowrap; }
    .bracket-card { flex-direction: column !important; align-items: flex-start !important; }
    /* Монтажные кронштейны: оставляем только «Высота радиатора» и «Артикул» */
    #tab-fk0 .mount-table[style] th:nth-child(n+3),
    #tab-fk0 .mount-table[style] td:nth-child(n+3),
    #tab-ftu .mount-table[style] th:nth-child(n+3),
    #tab-ftu .mount-table[style] td:nth-child(n+3) { display: none; }

    /* === Термовентиль === */
    .valve-specs { grid-template-columns: 1fr; gap: 12px; }

    /* === Гарантия === */
    .warranty-kpis { grid-template-columns: 1fr 1fr; gap: 12px; }
    .wkpi { padding: 18px 12px; }
    .wkpi-val { font-size: 32px; }
    .water-grid { grid-template-columns: 1fr; }

    /* === Цвета RAL === */
    .ral-swatches { grid-template-columns: repeat(3, 1fr); }
    .ral-cond-val { font-size: 22px; min-width: 48px; }

    /* === Модели / сечения === */
    .type-selector-title { white-space: normal; }
    .model-spec { flex-wrap: wrap; }
    .model-spec-val { white-space: normal; text-align: left; }
  }
</style>

<!-- ========== NAV ========== -->
<nav>
  <a class="nav-logo" href="#hero" style="text-decoration:none;cursor:pointer">
    <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/26e20f0a6_Kermi-Logo_t.png" alt="KERMI" class="nav-logo-img">
  </a>
  <div class="nav-links">
    <a href="#models">Модели</a>
    <a href="#article">Артикул</a>
    <a href="#mounting">Крепления</a>
    <a href="#selection">Конфигуратор подбора</a>
    <a href="#dealers">Где купить</a>
    <a href="tel:88002345698" class="nav-phone" style="color:#fff;font-weight:600;font-size:15px;text-decoration:none;letter-spacing:0.3px;margin-right:4px;opacity:0.92;">8-800-234-56-98</a>
    <a href="#footer" class="nav-cta">Связаться</a>
  </div>
  <a href="tel:88002345698" class="nav-phone-header-mobile">8-800-234-56-98</a>
  <button class="nav-burger" id="burgerBtn" aria-label="Меню" onclick="var m=document.getElementById('mobileMenu');this.classList.toggle('active');m.classList.toggle('open');">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="#models" class="mm-link" onclick="var m=document.getElementById('mobileMenu');var b=document.getElementById('burgerBtn');if(m)m.classList.remove('open');if(b)b.classList.remove('active');">Модели</a>
  <a href="#article" class="mm-link" onclick="var m=document.getElementById('mobileMenu');var b=document.getElementById('burgerBtn');if(m)m.classList.remove('open');if(b)b.classList.remove('active');">Артикул</a>
  <a href="#mounting" class="mm-link" onclick="var m=document.getElementById('mobileMenu');var b=document.getElementById('burgerBtn');if(m)m.classList.remove('open');if(b)b.classList.remove('active');">Крепления</a>
  <a href="#selection" class="mm-link" onclick="var m=document.getElementById('mobileMenu');var b=document.getElementById('burgerBtn');if(m)m.classList.remove('open');if(b)b.classList.remove('active');">Конфигуратор подбора</a>
  <a href="#dealers" class="mm-link" onclick="var m=document.getElementById('mobileMenu');var b=document.getElementById('burgerBtn');if(m)m.classList.remove('open');if(b)b.classList.remove('active');">Где купить</a>
  <a href="tel:88002345698" class="nav-phone-mobile">📞 8-800-234-56-98</a>
  <a href="#footer" class="nav-cta-mobile mm-link">Связаться</a>
</div>

<!-- ========== HERO ========== -->
<div id="hero" class="hero" style="padding: 64px 48px; min-height: 520px; align-items: center;">
  <div class="hero-bg-accent"></div>
  <div class="hero-inner">
    <div class="hero-content" style="max-width:100%;">
      <div class="hero-tag">Новинка 2026</div>
      <h1>Стальные панельные<br>радиаторы<br><span>KERMI Комфорт</span></h1>
      <p class="hero-sub">
        Производство в России по лицензии KERMI GmbH на новейшей автоматизированной линии.
        Новое поколение — сталь CORREX, 100 мкм покрытие, 150+ цветов RAL, гарантия 15 лет.
      </p>
      <div class="hero-btns">
        <a href="#models" class="btn-primary">Смотреть модели</a>
        <a href="#selection" class="btn-outline">Подобрать радиатор</a>
      </div>
    </div>
    <div class="hero-right">
      <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/0051696a0_.png" alt="Радиатор Kermi Комфорт">
      <div class="hero-stats-row">
        <div class="stat">
          <div class="stat-val">15</div>
          <div class="stat-lbl">лет гарантии</div>
        </div>
        <div class="stat">
          <div class="stat-val">150+</div>
          <div class="stat-lbl">цветов RAL</div>
        </div>
        <div class="stat">
          <div class="stat-val">25</div>
          <div class="stat-lbl">лет службы</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ========== ПРОИЗВОДСТВО ========== -->
<section class="production" id="production">
  <div class="container">
    <div class="section-tag">Производство</div>
    <h2>Российское производство.<br>Немецкое качество.</h2>
    <div class="divider"></div>
    <p class="lead">Радиаторы Kermi Комфорт производятся в России по лицензии KERMI GmbH под постоянным контролем немецких специалистов. Каждый этап производства фиксируется системой видеонаблюдения с искусственным интеллектом — отклонения от технологии выявляются мгновенно.</p>
    <div class="prod-grid">
      <div class="prod-items">
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Производство в России</h4>
            <p>Радиаторы производятся в России по лицензии KERMI GmbH и под постоянным контролем немецких специалистов на новых автоматизированных линиях LEAS S.p.A.</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Сталь марки Correx</h4>
            <p>Панели радиатора производятся из стали повышенной коррозионной стойкости CORREX (Северсталь), увеличился срок коррозионной стойкости металла на 50%.</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Гарантия 15 лет</h4>
            <p>Гарантия распространяется на все приборы с даты производства.</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Оригинальные комплектующие</h4>
            <p>Тройники, гарнитуры, вентильные клапаны (Германия).</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Полное соответствие ГОСТ 31311-2022</h4>
            <p>Испытательное давление 15 бар. Рабочее давление 10 бар.</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Широкая палитра цветов</h4>
            <p>Доступны: Стандартный белый, а также более 150 цветов RAL, глянцевые и матовые.</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Технологичная упаковка</h4>
            <p>Двойная плёнка каждого радиатора, плюс дополнительная защита на палетах для снижения риска повреждений при транспортировке.</p>
          </div>
        </div>
        <div class="prod-item">
          <div class="prod-icon"></div>
          <div class="prod-item-text">
            <h4>Срок поставки</h4>
            <p>Стандартные размеры в белом цвете — всегда в наличии. Любое исполнение, включая RAL: до 45 дней.</p>
          </div>
        </div>
      </div>
      <div>
        <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/936b11819_Lemaxleas.jpg" alt="Новейшая автоматизированная производственная линия"
             style="width:100%;border-radius:12px;display:block;box-shadow:0 8px 32px rgba(0,0,0,.4);">
        <p style="font-size:12px;color:#666;margin-top:10px;text-align:center;">
          Новейшая автоматизированная производственная линия LEAS S.p.A. (Италия)
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ========== СРАВНЕНИЕ ========== -->
<section class="compare" id="compare" style="position:relative;z-index:1">
  <div class="container">
    <div class="section-tag">Преимущества</div>
    <h2>Преимущества<br>Керми Комфорт</h2>
    <div class="divider"></div>
    <p class="lead">Серия «Комфорт» — новая линейка стальных панельных радиаторов, компании Керми, которая разработана на основе обратной связи от российских клиентов. Учтены пожелания как по типоразмерам, продленной гарантии, удобству монтажа и срокам поставки.</p>
    <div class="compare-table">
      <table>
        <thead>
          <tr>
            <th style="width:40%">Параметр</th>
            <th>Преимущества и особенности</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Марка стали</td>
            <td class="td-good">CORREX (Северсталь) — коррозионная стойкость ×1,5</td>
          </tr>
          <tr>
            <td>Предобработка перед покраской</td>
            <td class="td-good">Титаноцирконевая пассивация — защита ×2</td>
          </tr>
          <tr>
            <td>Метод покраски</td>
            <td class="td-good">Порошковая эпокси-полиэфирная, электростатика + печь (100 мкм)</td>
          </tr>
          <tr>
            <td>Толщина лакокрасочного слоя</td>
            <td class="td-good">100 мкм</td>
          </tr>
          <tr>
            <td>Цвет / палитра</td>
            <td class="td-good">150+ цветов RAL, глянец и матт (+50% к цене)</td>
          </tr>
          <tr>
            <td>Гарантия</td>
            <td class="td-good">15 лет</td>
          </tr>
          <tr>
            <td>Производственная линия</td>
            <td class="td-good">Новая LEAS (Италия) — менее 1 года в эксплуатации</td>
          </tr>
          <tr>
            <td>Расположение патрубков (тип 30/33)</td>
            <td class="td-good">Ближе к стене (51 мм) — эстетика и комфорт подключения</td>
          </tr>
          <tr>
            <td>Переходники G½"→G¾"</td>
            <td class="td-good">В комплекте</td>
          </tr>
          <tr>
            <td>Шаг длины</td>
            <td class="td-good">100 мм от 400 до 3000 мм — точный подбор под любой проём</td>
          </tr>
          <tr>
            <td>Гигиена с вентилем (PTV/PK0)</td>
            <td class="td-good">H = 300 и 500 мм</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ========== МОДЕЛИ ========== -->
<section class="models" id="models">
  <div class="container">
    <div class="section-tag">Модельный ряд</div>
    <h2>Пять серий —<br>любое применение</h2>
    <div class="divider"></div>
    <p class="lead">От классических радиаторов с боковым подключением до гигиенических исполнений для медицинских учреждений. Типы 10–33, высоты 200–600 мм, длины 400–3000 мм с шагом 100 мм.</p>

    <div class="models-grid" style="margin-top:40px;">
      <div class="model-card model-card-v2" data-series="FK0" onclick="activateSeries('FK0')">
        <div class="model-card-body">
          <div class="model-series">FK0</div>
          <div class="model-name">Профиль-К</div>
          <span class="model-badge badge-green">Боковое подключение</span>
          <div class="model-specs">
          <div class="model-spec"><span class="model-spec-key">Типы</span><span class="model-spec-val">10, 11, 12, 20, 22, 30, 33</span></div>
          <div class="model-spec"><span class="model-spec-key">Высоты</span><span class="model-spec-val">200–600 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Длины</span><span class="model-spec-val">400–3000 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Кронштейны</span><span class="model-spec-val">В комплекте</span></div>
          <div class="model-spec"><span class="model-spec-key">Присоединение</span><span class="model-spec-val">4 × G½" бок.</span></div>
          <p class="model-note-info">Высота 200 мм поставляется без кронштейнов</p>
          </div>
        </div>
      </div>
      <div class="model-card model-card-v2" data-series="FTV" onclick="activateSeries('FTV')">
        <div class="model-card-body">
          <div class="model-series">FTV</div>
          <div class="model-name">Профиль-В</div>
          <span class="model-badge badge-blue">Нижнее подключение</span>
          <div class="model-specs">
          <div class="model-spec"><span class="model-spec-key">Типы</span><span class="model-spec-val">10, 11, 12, 20, 22, 30, 33</span></div>
          <div class="model-spec"><span class="model-spec-key">Высоты</span><span class="model-spec-val">300–600 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Длины</span><span class="model-spec-val">400–3000 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Кронштейны</span><span class="model-spec-val">В комплекте</span></div>
          <div class="model-spec"><span class="model-spec-key">Присоединение</span><span class="model-spec-val">2 × G¾" (Н-блок)</span></div>
          <div class="model-spec"><span class="model-spec-key">Вентиль</span><span class="model-spec-val">V3-Ks встроен</span></div>
          </div>
        </div>
      </div>
      <div class="model-card model-card-v2" data-series="FTU" onclick="activateSeries('FTU')">
        <div class="model-card-body">
          <div class="model-series">FTU</div>
          <div class="model-name">Профиль-В JC</div>
          <span class="model-badge badge-yellow">Универсальное подкл.</span>
          <div class="model-specs">
          <div class="model-spec"><span class="model-spec-key">Типы</span><span class="model-spec-val">12, 22, 33</span></div>
          <div class="model-spec"><span class="model-spec-key">Высоты</span><span class="model-spec-val">200–600 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Длины</span><span class="model-spec-val">400–3000 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Присоединение</span><span class="model-spec-val">2 × G¾" (Н-блок)</span></div>
          <div class="model-spec"><span class="model-spec-key">Вентиль</span><span class="model-spec-val">V3-Ks встроен</span></div>
          <p class="model-note-info">Кронштейны заказываются отдельно, по артикулу в зависимости от высоты</p>
          </div>
        </div>
      </div>
      <div class="model-card model-card-v2" data-series="PK0" onclick="activateSeries('PK0')">
        <div class="model-card-body">
          <div class="model-series">PK0</div>
          <div class="model-name">План-К · Гигиена</div>
          <span class="model-badge badge-green">Боковое · Гигиена</span>
          <div class="model-specs">
          <div class="model-spec"><span class="model-spec-key">Типы</span><span class="model-spec-val">10, 20, 30</span></div>
          <div class="model-spec"><span class="model-spec-key">Высоты</span><span class="model-spec-val">300, 500 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Длины</span><span class="model-spec-val">400–2000 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Кронштейны</span><span class="model-spec-val">В комплекте</span></div>
          <div class="model-spec"><span class="model-spec-key">Присоединение</span><span class="model-spec-val">4 × G½" бок.</span></div>
          <p class="model-note-info">Без оребрения — для больниц и детских учреждений. С гладкой лицевой поверхностью.</p>
          </div>
        </div>
      </div>
      <div class="model-card model-card-v2" data-series="PTV" onclick="activateSeries('PTV')">
        <div class="model-card-body">
          <div class="model-series">PTV</div>
          <div class="model-name">План-В · Гигиена</div>
          <span class="model-badge badge-blue">Нижнее · Гигиена</span>
          <div class="model-specs">
          <div class="model-spec"><span class="model-spec-key">Типы</span><span class="model-spec-val">10, 20, 30</span></div>
          <div class="model-spec"><span class="model-spec-key">Высоты</span><span class="model-spec-val">300, 500 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Длины</span><span class="model-spec-val">400–2000 мм</span></div>
          <div class="model-spec"><span class="model-spec-key">Кронштейны</span><span class="model-spec-val">В комплекте</span></div>
          <div class="model-spec"><span class="model-spec-key">Присоединение</span><span class="model-spec-val">2 × G¾" (Н-блок)</span></div>
          <div class="model-spec"><span class="model-spec-key">Вентиль</span><span class="model-spec-val">V3-Ks встроен</span></div>
          <p class="model-note-info">Без оребрения — для больниц и детских учреждений. С гладкой лицевой поверхностью.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="type-selector-wrap">
      <div class="type-selector" id="tsec_FK0" style="display:block;">
        <div class="type-selector-header">
          <span class="type-selector-title">Сечения по типам — <strong>FK0</strong> Профиль-К</span>
          <div class="type-btns-row">
            <button class="type-btn active" onclick="selectType(this,'FK0')" data-type="10">10</button>
            <button class="type-btn" onclick="selectType(this,'FK0')" data-type="11">11</button>
            <button class="type-btn" onclick="selectType(this,'FK0')" data-type="12">12</button>
            <button class="type-btn" onclick="selectType(this,'FK0')" data-type="20">20</button>
            <button class="type-btn" onclick="selectType(this,'FK0')" data-type="22">22</button>
            <button class="type-btn" onclick="selectType(this,'FK0')" data-type="30">30</button>
            <button class="type-btn" onclick="selectType(this,'FK0')" data-type="33">33</button>
          </div>
        </div>
        <div class="type-panels">
          <div class="type-info-row" id="row_FK0_10" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">10</div><span class="type-lbl">глубина</span><div class="type-depth">48,5 мм</div><div class="type-desc-small">1 панель</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/6d6676741_KermiCRU-T10FK010.png" alt="Сечение тип 10 FK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FK0_11" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">11</div><span class="type-lbl">глубина</span><div class="type-depth">65 мм</div><div class="type-desc-small">1 пан. + 1 ребро</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/7d0536a71_KermiCRU-T11FK011.png" alt="Сечение тип 11 FK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FK0_12" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">12</div><span class="type-lbl">глубина</span><div class="type-depth">68 мм</div><div class="type-desc-small">2 панели + 1 ребро</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/13aef724e_KermiCRU-T12FK012.png" alt="Сечение тип 12 FK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FK0_20" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">20</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/9d110117b_KermiCRU-T20FK020.png" alt="Сечение тип 20 FK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FK0_22" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">22</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 пан. + 2 ребра</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/4e7ed2cd2_KermiCRU-T22FK022.png" alt="Сечение тип 22 FK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FK0_30" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">30</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/f40db4b3c_KermiCRU-T30FK030.png" alt="Сечение тип 30 FK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FK0_33" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">33</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 пан. + 3 ребра</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/ee2434a5d_KermiCRU-T33FK033.png" alt="Сечение тип 33 FK0" loading="lazy"></div>
          </div>
        </div>
      </div>
      <div class="type-selector" id="tsec_FTV" style="display:none;">
        <div class="type-selector-header">
          <span class="type-selector-title">Сечения по типам — <strong>FTV</strong> Профиль-В</span>
          <div class="type-btns-row">
            <button class="type-btn active" onclick="selectType(this,'FTV')" data-type="10">10</button>
            <button class="type-btn" onclick="selectType(this,'FTV')" data-type="11">11</button>
            <button class="type-btn" onclick="selectType(this,'FTV')" data-type="12">12</button>
            <button class="type-btn" onclick="selectType(this,'FTV')" data-type="20">20</button>
            <button class="type-btn" onclick="selectType(this,'FTV')" data-type="22">22</button>
            <button class="type-btn" onclick="selectType(this,'FTV')" data-type="30">30</button>
            <button class="type-btn" onclick="selectType(this,'FTV')" data-type="33">33</button>
          </div>
        </div>
        <div class="type-panels">
          <div class="type-info-row" id="row_FTV_10" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">10</div><span class="type-lbl">глубина</span><div class="type-depth">48,5 мм</div><div class="type-desc-small">1 панель</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/af830d5ea_KermiCRU-T10FTV10.png" alt="Сечение тип 10 FTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTV_11" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">11</div><span class="type-lbl">глубина</span><div class="type-depth">65 мм</div><div class="type-desc-small">1 пан. + 1 ребро</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/9e3f65074_KermiCRU-T11FTV11.png" alt="Сечение тип 11 FTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTV_12" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">12</div><span class="type-lbl">глубина</span><div class="type-depth">68 мм</div><div class="type-desc-small">2 панели + 1 ребро</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/74f86d512_KermiCRU-T12FTV12.png" alt="Сечение тип 12 FTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTV_20" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">20</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/3493a5e3b_KermiCRU-T20FTV20.png" alt="Сечение тип 20 FTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTV_22" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">22</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 пан. + 2 ребра</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/efc5547ce_KermiCRU-T22FTV22.png" alt="Сечение тип 22 FTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTV_30" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">30</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/8c20709c9_KermiCRU-T30FTV30.png" alt="Сечение тип 30 FTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTV_33" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">33</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 пан. + 3 ребра</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/9d267db7d_KermiCRU-T33FTV33.png" alt="Сечение тип 33 FTV" loading="lazy"></div>
          </div>
        </div>
      </div>
      <div class="type-selector" id="tsec_FTU" style="display:none;">
        <div class="type-selector-header">
          <span class="type-selector-title">Сечения по типам — <strong>FTU</strong> Профиль-В JC</span>
          <div class="type-btns-row">
            <button class="type-btn active" onclick="selectType(this,'FTU')" data-type="12">12</button>
            <button class="type-btn" onclick="selectType(this,'FTU')" data-type="22">22</button>
            <button class="type-btn" onclick="selectType(this,'FTU')" data-type="33">33</button>
          </div>
        </div>
        <div class="type-panels">
          <div class="type-info-row" id="row_FTU_12" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">12</div><span class="type-lbl">глубина</span><div class="type-depth">68 мм</div><div class="type-desc-small">2 панели + 1 ребро</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/bdb3f6c1f_KermiCRU-JCT12FTU12.png" alt="Сечение тип 12 FTU" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTU_22" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">22</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 пан. + 2 ребра</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/f82388a44_KermiCRU-JCT22FTU22.png" alt="Сечение тип 22 FTU" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_FTU_33" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">33</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 пан. + 3 ребра</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/4161f5ddf_KermiCRU-JCT33FTU33.png" alt="Сечение тип 33 FTU" loading="lazy"></div>
          </div>
        </div>
      </div>
      <div class="type-selector" id="tsec_PK0" style="display:none;">
        <div class="type-selector-header">
          <span class="type-selector-title">Сечения по типам — <strong>PK0</strong> План-К · Гигиена</span>
          <div class="type-btns-row">
            <button class="type-btn active" onclick="selectType(this,'PK0')" data-type="10">10</button>
            <button class="type-btn" onclick="selectType(this,'PK0')" data-type="20">20</button>
            <button class="type-btn" onclick="selectType(this,'PK0')" data-type="30">30</button>
          </div>
        </div>
        <div class="type-panels">
          <div class="type-info-row" id="row_PK0_10" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">10</div><span class="type-lbl">глубина</span><div class="type-depth">48,5 мм</div><div class="type-desc-small">1 панель</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/e65d9f597_KermiCRU-T10PK010.png" alt="Сечение тип 10 PK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_PK0_20" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">20</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/23b3162d6_KermiCRU-T20PK020.png" alt="Сечение тип 20 PK0" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_PK0_30" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">30</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/103d7699b_KermiCRU-T30PK030.png" alt="Сечение тип 30 PK0" loading="lazy"></div>
          </div>
        </div>
      </div>
      <div class="type-selector" id="tsec_PTV" style="display:none;">
        <div class="type-selector-header">
          <span class="type-selector-title">Сечения по типам — <strong>PTV</strong> План-В · Гигиена</span>
          <div class="type-btns-row">
            <button class="type-btn active" onclick="selectType(this,'PTV')" data-type="10">10</button>
            <button class="type-btn" onclick="selectType(this,'PTV')" data-type="20">20</button>
            <button class="type-btn" onclick="selectType(this,'PTV')" data-type="30">30</button>
          </div>
        </div>
        <div class="type-panels">
          <div class="type-info-row" id="row_PTV_10" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">10</div><span class="type-lbl">глубина</span><div class="type-depth">48,5 мм</div><div class="type-desc-small">1 панель</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/c6714ba27_KermiCRU-T10PTV10.png" alt="Сечение тип 10 PTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_PTV_20" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">20</div><span class="type-lbl">глубина</span><div class="type-depth">102 мм</div><div class="type-desc-small">2 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/bdc808d20_KermiCRU-T20PTV20.png" alt="Сечение тип 20 PTV" loading="lazy"></div>
          </div>
          <div class="type-info-row" id="row_PTV_30" style="display:none;">
            <div class="type-depth-badge"><span class="type-lbl">тип</span><div class="type-num">30</div><span class="type-lbl">глубина</span><div class="type-depth">157 мм</div><div class="type-desc-small">3 панели</div></div>
            <div class="type-drawing"><img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/4277bbf4e_KermiCRU-T30PTV30.png" alt="Сечение тип 30 PTV" loading="lazy"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== АРТИКУЛ ========== -->
<section class="article-section" id="article">
  <div class="container">
    <div class="section-tag">Заказ</div>
    <h2>Расшифровка артикула</h2>
    <div class="divider"></div>
    <p class="lead">Артикул содержит все необходимые параметры радиатора. Пример: <strong>FTV220500401R2C</strong></p>

    <div class="article-visual">
      <div class="art-block">
        <div class="art-box" style="background:#BFDE00">FTV</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Серия<br>(FK0/FTV/FTU/PK0/PTV)</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#4DC0FF">22</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Тип<br>(10,11,12,20,22,30,33)</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#FFA050">050</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Высота<br>радиатора (см)</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#A0D050">100</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Длина<br>радиатора (см)</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#e0e0e0">1</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Цвет<br>1=белый</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#FFCC80">R</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Подключение<br>R=справа, L=слева<br>N=боковое</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#D0A0FF">2</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Кронштейны<br>2=в комплекте<br>J=без</div>
      </div>
      <div class="art-block">
        <div class="art-box" style="background:#FF8080">C</div>
        <div class="art-arrow">↓</div>
        <div class="art-desc">Произведено<br>в России</div>
      </div>
    </div>

    <div class="art-examples">
      <div class="art-example" style="background:#f9f9f9">
        <div class="art-code">FTV22050040<span style="color:#d00;font-weight:700">1</span>R2C</div>
        <div class="art-desc-ex">FTV тип 22 | высота 500 мм | длина 400 мм | <strong>белый глянец</strong> | подключение справа | кронштейны в комплекте | Россия</div>
      </div>
      <div class="art-example" style="background:#f5ffe0">
        <div class="art-code">FTV22050040<span style="color:#d00;font-weight:700">1</span>R2C<span style="color:#d00;font-weight:700">RAL7022</span></div>
        <div class="art-desc-ex">То же, но в цвете <strong>RAL 7022 «Серый», глянцевое исполнение</strong> (код «1» в артикуле + суффикс RAL)</div>
      </div>
      <div class="art-example" style="background:#f0fff0">
        <div class="art-code">FTV22050040<span style="color:#d00;font-weight:700">2</span>R2C<span style="color:#d00;font-weight:700">RAL7022</span></div>
        <div class="art-desc-ex">То же в цвете <strong>RAL 7022, матовое исполнение</strong> (код «2» вместо «1» в позиции цвета)</div>
      </div>
    </div>

    <div class="ral-note">
      <strong>⚠ Важно для заказа цветных радиаторов</strong>
      <div style="display:flex;flex-wrap:wrap;gap:4px 28px;line-height:1.5;">
        <span>Наценка за цветные исполнения — <strong>50%</strong></span>
        <span>Доступны две текстуры: <strong>глянцевая (код 1)</strong> и <strong>матовая (код 2)</strong></span>
        <span>Срок изготовления любого цветного исполнения до <strong>45 дней</strong></span>
        <span>Стандартный белый всегда <strong>на складе</strong></span>
      </div>
    </div>
  </div>
</section>

<!-- ========== КОНСТРУКТИВ ========== -->
<section class="construction" id="construction">
  <div class="container">
    <div class="section-tag">Конструктив</div>
    <h2>Что внутри и снаружи</h2>
    <div class="divider"></div>
    <div class="constr-grid">
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-num">01</div>
          <div>
            <div class="feature-title">Сталь CORREX</div>
            <div class="feature-text">Холоднокатаная сталь с повышенной коррозионной стойкостью производства «Северсталь». Ресурс в 1,5 раза выше, чем у обычной стали.</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-num">02</div>
          <div>
            <div class="feature-title">Титаноцирконевая пассивация</div>
            <div class="feature-text">Специальная предобработка поверхности перед покраской. Увеличивает адгезию покрытия и антикоррозионную защиту в 2 раза.</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-num">03</div>
          <div>
            <div class="feature-title">Толщина ЛКП — 100 мкм</div>
            <div class="feature-text">Порошковая эпокси-полиэфирная краска, нанесённая в электростатическом поле. Полимеризация в печи. Толщина покрытия 100 мкм.</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-num">04</div>
          <div>
            <div class="feature-title">Верхняя решётка и боковые стенки</div>
            <div class="feature-text">Закруглённые травмобезопасные края верхней решётки. Брендированные боковые стенки с логотипом KERMI в комплекте у FK0/FTV.</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-num">05</div>
          <div>
            <div class="feature-title">Межосевые расстояния подключения</div>
            <div class="feature-text">Боковое для FK0/PK0: Межосевое = Высота − 51 мм. Нижнее для FTV/PTV/FTU: 50 мм (через H-блок).</div>
          </div>
        </div>
      </div>
      <div class="kpi-grid">
        <div class="kpi-box"><div class="kpi-val">10 бар</div><div class="kpi-lbl">рабочее давление</div></div>
        <div class="kpi-box"><div class="kpi-val">15 бар</div><div class="kpi-lbl">испытательное давление</div></div>
        <div class="kpi-box"><div class="kpi-val">120°C</div><div class="kpi-lbl">макс. температура</div></div>
        <div class="kpi-box"><div class="kpi-val">100 мкм</div><div class="kpi-lbl">толщина покрытия</div></div>
        <div class="kpi-box"><div class="kpi-val">×1.5</div><div class="kpi-lbl">стойкость CORREX</div></div>
        <div class="kpi-box"><div class="kpi-val">×2</div><div class="kpi-lbl">защита пассивации</div></div>
        <div class="kpi-box"><div class="kpi-val">n=1.28</div><div class="kpi-lbl">экспонента для всех типов</div></div>
        <div class="kpi-box"><div class="kpi-val">ГОСТ<br style="line-height:1">31311</div><div class="kpi-lbl">соответствие 2022</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ========== ТЕРМОВЕНТИЛЬ ========== -->
<section class="valve" id="valve">
  <div class="container">
    <div class="section-tag">Регулировка</div>
    <h2>Встроенный термовентиль V3-Ks</h2>
    <div class="divider"></div>
    <p class="lead">Радиаторы с нижним подключением Профиль-В (FTV), План-В (PTV) и Профиль-В-JC (FTU) оснащены оригинальной вентильной гарнитурой KERMI V3-Ks, предустановленной на заводе в соответствии с мощностью прибора.</p>
    <div class="valve-grid">
      <div>
        <div class="valve-specs">
          <div class="v-spec"><div class="v-spec-val">М30×1,5</div><div class="v-spec-lbl">резьба термоголовки</div></div>
          <div class="v-spec"><div class="v-spec-val">8 + 7</div><div class="v-spec-lbl">основных + промежуточных положений</div></div>
          <div class="v-spec"><div class="v-spec-val">kV</div><div class="v-spec-lbl">предустановлен на заводе</div></div>
          <div class="v-spec"><div class="v-spec-val">V3-Ks</div><div class="v-spec-lbl">оригинал KERMI GmbH</div></div>
        </div>
        <div class="valve-notice" style="margin-top:28px">
          <strong style="color:var(--lime);display:block;margin-bottom:6px">Совместимость с термоголовками</strong>
          Подходит любая термоголовка с присоединительным размером М30×1,5. Термоголовка приобретается отдельно. Рекомендуются оригинальные термоголовки KERMI.
        </div>
        <div class="valve-notice">
          <strong style="color:#aaa;display:block;margin-bottom:6px">FK0 и PK0 — без встроенного вентиля</strong>
          Радиаторы с боковым подключением оснащаются внешней регулирующей арматурой. Четыре присоединения G½" обеспечивают любые схемы подключения.
        </div>
      </div>
      <div>
        <div style="background:rgba(255,255,255,.04);border:1px solid #2a2a2a;padding:32px;display:flex;align-items:center;justify-content:center;border-radius:10px;">
          <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/77b017c04_KERMIV3-Ks.png" alt="Вентильная вставка KERMI V3-Ks"
               style="max-width:100%;max-height:320px;object-fit:contain;filter:drop-shadow(0 4px 20px rgba(0,0,0,.5));">
        </div>
        <p style="text-align:center;color:#666;font-size:12px;margin-top:10px;">Вентильная вставка KERMI V3-Ks</p>
        <div style="margin-top:16px;padding:16px;background:rgba(191,222,0,.08);border-left:3px solid var(--lime);border-radius:8px">
          <p style="font-size:13px;color:#ccc">Для подключения узла нижнего подключения к радиаторам FTV/FTU/PTV используются переходники G½"→G¾", которые идут в комплекте.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== КРЕПЛЕНИЯ ========== -->
<section class="mounting" id="mounting">
  <div class="container">
    <div class="section-tag">Монтаж</div>
    <h2>Крепления и комплектность</h2>
    <div class="divider"></div>
    <p class="lead" style="font-size:16px">Тип кронштейна зависит от серии радиатора. FK0/FTV/PK0/PTV поставляются с кронштейнами в комплекте, кроме FK0 H=200 мм; FTU — без кронштейнов, заказываются отдельно.</p>

    <div class="mount-tabs">
      <div class="mount-tab active" onclick="showTab('fk0', this)">FK0 / FTV</div>
      <div class="mount-tab" onclick="showTab('ftu', this)">FTU</div>
      <div class="mount-tab" onclick="showTab('hyg', this)">PK0 / PTV / FK0(гигиена)</div>
    </div>

    <div class="mount-content active" id="tab-fk0">
      <div style="margin-bottom:40px">
        <h3 style="font-size:18px;font-weight:900;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid var(--lime)">Комплектация</h3>
        <div class="alert-box alert-info">Кронштейны входят в комплект поставки. При длине ≤ 1600 мм — 2 кронштейна и 4 дюбеля; ≥ 1700 мм — 3 кронштейна и 6 дюбелей.</div>
        <div class="mount-grid" style="margin-top:20px">
          <div>
            <table class="mount-table">
              <thead><tr><th>Наименование</th><th>FK0</th><th>FTV</th></tr></thead>
              <tbody>
                <tr><td>Радиатор в сборе</td><td>1 шт.</td><td>1 шт.</td></tr>
                <tr><td>Воздухоотводчик (кран Маевского)</td><td>1 шт.</td><td>1 шт.</td></tr>
                <tr><td>Пробка глухая</td><td>1 шт.</td><td>2 шт.</td></tr>
                <tr><td>Настенный кронштейн (L ≤ 1600)</td><td>2 шт.</td><td>2 шт.</td></tr>
                <tr><td>Настенный кронштейн (L ≥ 1700)</td><td>3 шт.</td><td>3 шт.</td></tr>
                <tr><td>Дюбель с саморезом (L ≤ 1600)</td><td>4 шт.</td><td>4 шт.</td></tr>
                <tr><td>Дюбель с саморезом (L ≥ 1700)</td><td>6 шт.</td><td>6 шт.</td></tr>
                <tr><td>Термостатический клапан V3-Ks</td><td>—</td><td>1 шт.</td></tr>
                <tr><td>Переходник G½"→G¾"</td><td>—</td><td>2 шт.</td></tr>
              </tbody>
            </table>
          </div>
          <div style="padding:20px;background:var(--lgrey);border-radius:8px;font-size:13px;color:var(--grey)">
            <strong style="color:var(--dark);display:block;margin-bottom:10px">Расстояния при монтаже</strong>
            От пола до низа: ≥ 75% глубины прибора<br>
            От подоконника (H 500–600 мм): ≥ 90% глубины<br>
            От подоконника (H 200–400 мм): ≥ 75% глубины<br>
            От стены до задней стенки: ≥ 20 мм
          </div>
        </div>
      </div>
      <div>
        <h3 style="font-size:18px;font-weight:900;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid var(--lime)">Монтажные кронштейны</h3>
        <h4 style="font-size:14px;font-weight:800;margin:0 0 6px">Настенные L-образные кронштейны</h4>
        <p style="font-size:13px;color:var(--grey);margin:0 0 16px">Стандартный настенный кронштейн L-образного вида для радиаторов 11, 12, 22, 33 типа. Крепление к радиатору за монтажные скобы. Отступ от стены 30 или 45 мм. Изготовлен из высокопрочной стали, оцинкован.</p>
        <div style="display:grid;grid-template-columns:160px 1fr 280px;gap:20px;align-items:start;background:var(--lgrey);border-radius:8px;padding:20px">
          <div style="background:#fff;border-radius:6px;padding:12px;text-align:center">
            <img style="width:100%;max-height:120px;object-fit:contain" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/1858a74d3_ZB00119538-L--500.png" alt="L-образный кронштейн Kermi">
            <p style="font-size:11px;color:var(--grey);margin:8px 0 0">Настенный L-образный кронштейн</p>
          </div>
          <div>
            <table class="mount-table" style="background:#fff">
              <thead><tr><th>Высота радиатора</th><th>Артикул</th><th>H (мм)</th><th>B (мм)</th><th>C (мм)</th></tr></thead>
              <tbody>
                <tr><td>300 мм</td><td><strong>ZB00122626</strong></td><td>114</td><td>89</td><td>50</td></tr>
                <tr><td>400 мм</td><td><strong>ZB00147749</strong></td><td>214</td><td>189</td><td>150</td></tr>
                <tr><td>500 мм</td><td><strong>ZB00119538</strong></td><td>314</td><td>289</td><td>250</td></tr>
                <tr><td>600 мм</td><td><strong>ZB00154388</strong></td><td>414</td><td>389</td><td>350</td></tr>
              </tbody>
            </table>
          </div>
          <div style="background:#fff;border-radius:6px;padding:10px;text-align:center">
            <p style="font-size:10px;font-weight:700;color:#555;margin:0 0 6px;text-transform:uppercase;letter-spacing:.5px">Чертёж кронштейна</p>
            <img style="width:100%;max-height:200px;object-fit:contain" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/3b031fa8d_FK0FTV.png" alt="Чертёж L-образного кронштейна FK0/FTV">
          </div>
        </div>
        <h4 style="font-size:14px;font-weight:800;margin:24px 0 6px">Напольные кронштейны</h4>
        <p style="font-size:13px;color:var(--grey);margin:0 0 16px">Применяются при невозможности крепления к стене</p>
        <div class="bracket-grid-2">
          <div class="bracket-card" style="display:flex;gap:16px;align-items:center;padding:16px">
            <img style="width:110px;height:110px;object-fit:contain;flex-shrink:0;background:#f8f8f8;border-radius:6px;padding:8px" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/d5d29ecc1_ZB00186323-3135111222331.png" alt="ZB00186323">
            <div>
              <div class="bracket-art">ZB00186323</div>
              <div class="bracket-name">Напольный кронштейн</div>
              <div class="bracket-sub" style="margin-top:6px;line-height:1.6">Напольный кронштейн предназначен для крепления радиаторов с боковым и нижним подключением высотой 200–600 мм типов: <strong>12, 22, 33</strong>.<br>Рекомендуем: 2 кронштейна при длине 400–1600 мм, 3 кронштейна при длине 1700–3000 мм.<br>Продаётся поштучно. Упаковка — 10 шт.</div>
            </div>
          </div>
          <div class="bracket-card" style="display:flex;gap:16px;align-items:center;padding:16px">
            <img style="width:110px;height:110px;object-fit:contain;flex-shrink:0;background:#f8f8f8;border-radius:6px;padding:8px" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/0227cb3de_ZB001493104701020301.png" alt="ZB00149310">
            <div>
              <div class="bracket-art">ZB00149310</div>
              <div class="bracket-name">Напольный кронштейн</div>
              <div class="bracket-sub" style="margin-top:6px;line-height:1.6">Монтируются радиаторы с боковым подключением с монтажными скобами, высотой 300, 400, 500 и 600 мм типов <strong>10, 11, 20, 12, 22, 30, 33</strong>.<br>При необходимости верхнюю часть стойки можно обрезать, место реза закрыть пластмассовой заглушкой.<br>Рекомендуем: 2 кронштейна при длине 400–1600 мм, 3 кронштейна при длине 1700–3000 мм.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mount-content" id="tab-ftu">
      <div style="margin-bottom:40px">
        <h3 style="font-size:18px;font-weight:900;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid var(--lime)">Комплектация</h3>
        <div class="alert-box alert-warn">⚠ Для универсальных радиаторов FTU кронштейны заказываются отдельно, по артикулу в зависимости от высоты.</div>
        <div class="mount-grid" style="margin-top:20px">
          <div>
            <table class="mount-table">
              <thead><tr><th>Наименование</th><th>FTU</th></tr></thead>
              <tbody>
                <tr><td>Радиатор в сборе</td><td>1 шт.</td></tr>
                <tr><td>Воздухоотводчик (кран Маевского)</td><td>1 шт.</td></tr>
                <tr><td>Пробка глухая</td><td>2 шт.</td></tr>
                <tr><td>Термостатический клапан V3-Ks</td><td>1 шт.</td></tr>
                <tr><td>Переходник G½"→G¾"</td><td>2 шт.</td></tr>
                <tr><td>Настенный кронштейн</td><td>— (доп. заказ)</td></tr>
              </tbody>
            </table>
          </div>
          <div style="padding:20px;background:var(--lgrey);border-radius:8px;font-size:13px;color:var(--grey)">
            <strong style="color:var(--dark);display:block;margin-bottom:10px">Расстояния при монтаже</strong>
            От пола до низа: ≥ 75% глубины прибора<br>
            От подоконника (H 500–600 мм): ≥ 90% глубины<br>
            От подоконника (H 200–400 мм): ≥ 75% глубины<br>
            От стены до задней стенки: ≥ 20 мм
          </div>
        </div>
      </div>
      <div>
        <h3 style="font-size:18px;font-weight:900;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid var(--lime)">Монтажные кронштейны</h3>
        <h4 style="font-size:14px;font-weight:800;margin:0 0 6px">Настенные кронштейны для FTU (тип 12/22/33)</h4>
        <p style="font-size:13px;color:var(--grey);margin:0 0 16px">Настенный кронштейн с помощью подвижного крючка фиксирует радиатор за его заднюю полупанель. Отступ от стены 30 мм.</p>
        <div style="display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:start;background:var(--lgrey);border-radius:8px;padding:20px">
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="background:#fff;border-radius:6px;padding:10px;text-align:center">
              <img style="width:100%;max-height:110px;object-fit:contain" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/68d92fe55_ZB00200FTUFKO122233H-200-1.png" alt="ZB00 FTU H=200">
              <p style="font-size:10px;color:var(--grey);margin:4px 0 0">H = 200 мм</p>
            </div>
            <div style="background:#fff;border-radius:6px;padding:10px;text-align:center">
              <img style="width:100%;max-height:110px;object-fit:contain" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/c64fb1065_ZB00300FTU122233H-300-1.png" alt="ZB00 FTU H=300">
              <p style="font-size:10px;color:var(--grey);margin:4px 0 0">H = 300 мм и выше</p>
            </div>
          </div>
          <div>
            <table class="mount-table" style="background:#fff">
              <thead><tr><th>Высота радиатора</th><th>Артикул</th><th>Применимость</th></tr></thead>
              <tbody>
                <tr><td>H = 200 мм</td><td class="bracket-art" style="font-size:13px">ZB02970200</td><td>FTU + FK0, тип 12/22/33</td></tr>
                <tr><td>H = 300 мм</td><td class="bracket-art" style="font-size:13px">ZB02970300</td><td>FTU, тип 12/22/33</td></tr>
                <tr><td>H = 400 мм</td><td class="bracket-art" style="font-size:13px">ZB02970400</td><td>FTU, тип 12/22/33</td></tr>
                <tr><td>H = 500 мм</td><td class="bracket-art" style="font-size:13px">ZB02970500</td><td>FTU, тип 12/22/33</td></tr>
                <tr><td>H = 600 мм</td><td class="bracket-art" style="font-size:13px">ZB02970600</td><td>FTU, тип 12/22/33</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <h4 style="font-size:14px;font-weight:800;margin:24px 0 6px">Напольные кронштейны</h4>
        <p style="font-size:13px;color:var(--grey);margin:0 0 16px">Применяются при невозможности крепления к стене</p>
        <div class="bracket-grid-2">
          <div class="bracket-card" style="display:flex;gap:16px;align-items:center;padding:16px">
            <img style="width:110px;height:110px;object-fit:contain;flex-shrink:0;background:#f8f8f8;border-radius:6px;padding:8px" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/d5d29ecc1_ZB00186323-3135111222331.png" alt="ZB00186323">
            <div>
              <div class="bracket-art">ZB00186323</div>
              <div class="bracket-name">Напольный кронштейн</div>
              <div class="bracket-sub" style="margin-top:6px;line-height:1.6">Предназначен для крепления радиаторов FTU типов <strong>12, 22, 33</strong> высотой 200–600 мм.<br>Рекомендуем: 2 кронштейна при длине 400–1600 мм, 3 кронштейна при длине 1700–3000 мм.<br>Продаётся поштучно. Упаковка — 10 шт.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mount-content" id="tab-hyg">
      <div style="margin-bottom:40px">
        <h3 style="font-size:18px;font-weight:900;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid var(--lime)">Комплектация</h3>
        <div class="alert-box alert-info">Гигиенические радиаторы PK0/PTV и FK0/FTV типов 10/20/30 поставляются со специальными кронштейнами, обеспечивающими расстояние 100 мм от стены (требование СНиП).</div>
        <div class="mount-grid" style="margin-top:20px">
          <div>
            <table class="mount-table">
              <thead><tr><th>Наименование</th><th>PK0</th><th>PTV</th></tr></thead>
              <tbody>
                <tr><td>Радиатор в сборе</td><td>1 шт.</td><td>1 шт.</td></tr>
                <tr><td>Воздухоотводчик (кран Маевского)</td><td>1 шт.</td><td>1 шт.</td></tr>
                <tr><td>Пробка глухая</td><td>1 шт.</td><td>2 шт.</td></tr>
                <tr><td>Настенный кронштейн (L ≤ 1600)</td><td>2 шт.</td><td>2 шт.</td></tr>
                <tr><td>Настенный кронштейн (L ≥ 1700)</td><td>3 шт.</td><td>3 шт.</td></tr>
                <tr><td>Дюбель с саморезом (L ≤ 1600)</td><td>4 шт.</td><td>4 шт.</td></tr>
                <tr><td>Дюбель с саморезом (L ≥ 1700)</td><td>6 шт.</td><td>6 шт.</td></tr>
                <tr><td>Термостатический клапан V3-Ks</td><td>—</td><td>1 шт.</td></tr>
                <tr><td>Переходник G½"→G¾"</td><td>—</td><td>2 шт.</td></tr>
              </tbody>
            </table>
          </div>
          <div style="padding:20px;background:var(--lgrey);border-radius:8px;font-size:13px;color:var(--grey)">
            <strong style="color:var(--dark);display:block;margin-bottom:10px">Расстояния при монтаже</strong>
            От пола до низа: ≥ 75% глубины прибора<br>
            От подоконника (H 500–600 мм): ≥ 90% глубины<br>
            От подоконника (H 200–400 мм): ≥ 75% глубины<br>
            От стены до задней стенки: ≥ 20 мм
          </div>
        </div>
      </div>
      <div>
        <h3 style="font-size:18px;font-weight:900;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid var(--lime)">Монтажные кронштейны</h3>
        <h4 style="font-size:14px;font-weight:800;margin:0 0 6px">Настенные L-образные кронштейны</h4>
        <p style="font-size:13px;color:var(--grey);margin:0 0 16px">Для гигиенических радиаторов с боковым и нижним подключением, 10, 20, 30 типов. Отступ от стены 30 или 100 мм.</p>
        <div style="display:grid;grid-template-columns:160px 1fr 280px;gap:20px;align-items:start;background:var(--lgrey);border-radius:8px;padding:20px;margin-bottom:24px">
          <div style="background:#fff;border-radius:6px;padding:12px;text-align:center">
            <img style="width:100%;max-height:120px;object-fit:contain" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/1858a74d3_ZB00119538-L--500.png" alt="L-образный кронштейн гигиена">
            <p style="font-size:11px;color:var(--grey);margin:8px 0 0">Настенный L-образный кронштейн</p>
          </div>
          <div>
            <table class="mount-table" style="background:#fff">
              <thead><tr><th>Высота радиатора</th><th>Артикул</th></tr></thead>
              <tbody>
                <tr><td>300 мм</td><td><strong>ZB00205949</strong></td></tr>
                <tr><td>400 мм</td><td><strong>ZB00206553</strong></td></tr>
                <tr><td>500 мм</td><td><strong>ZB00206555</strong></td></tr>
                <tr><td>600 мм</td><td><strong>ZB00206557</strong></td></tr>
              </tbody>
            </table>
            <p style="font-size:12px;color:var(--grey);margin-top:10px">Кронштейн изготовлен из высокопрочной стали, оцинкован. Крепление за скобы на задней панели.</p>
          </div>
          <div style="background:#fff;border-radius:6px;padding:10px;text-align:center">
            <p style="font-size:10px;font-weight:700;color:#555;margin:0 0 6px;text-transform:uppercase;letter-spacing:.5px">Чертёж кронштейна</p>
            <img style="width:100%;max-height:200px;object-fit:contain" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/9defe3a25_PK0PTVFK0.png" alt="Чертёж L-образного кронштейна PK0/PTV">
          </div>
        </div>
        <h4 style="font-size:14px;font-weight:800;margin:24px 0 6px">Напольные кронштейны</h4>
        <p style="font-size:13px;color:var(--grey);margin:0 0 16px">Предназначены для радиаторов в гигиеническом исполнении (типы 10/20/30)</p>
        <div class="bracket-grid-2">
          <div class="bracket-card" style="display:flex;gap:16px;align-items:center;padding:16px">
            <img style="width:120px;height:120px;object-fit:contain;flex-shrink:0;background:#f8f8f8;border-radius:6px;padding:8px" src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/0227cb3de_ZB001493104701020301.png" alt="ZB00149310">
            <div>
              <div class="bracket-art">ZB00149310</div>
              <div class="bracket-name">Напольный кронштейн</div>
              <div class="bracket-sub" style="margin-top:6px;line-height:1.6">Монтируются радиаторы с боковым подключением с монтажными скобами, высотой 300, 400, 500 и 600 мм типов <strong>10, 11, 20, 12, 22, 30, 33</strong>.<br>При необходимости верхнюю часть стойки можно обрезать, место реза закрыть пластмассовой заглушкой.<br>Рекомендуем: 2 кронштейна при длине 400–1600 мм, 3 кронштейна при длине 1700–3000 мм.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== ПОДБОР ========== -->
<section class="selection" id="selection" style="position:relative;z-index:2">
  <div class="container">
    <div class="section-tag">Конфигуратор подбора</div>
    <h2>Конфигуратор подбора Керми Комфорт</h2>
    <div class="divider"></div>
  </div>
  <div id="kermi-widget-cafdc5eb" style="max-width:1100px;margin:0 auto;">
    <iframe src="https://comfort.kermi-configurator.com/embed?uid=cafdc5eb-2a56-4b25-b884-d5b640c92363" style="width:100%;height:600px;border:0;display:block;border-radius:12px;overflow:hidden;" title="Kermi Comfort — подбор радиаторов"></iframe>
  </div>
</section>

<!-- ========== ЦВЕТА RAL ========== -->
<section class="colors" id="colors">
  <div class="container">
    <div class="section-tag">Цвета</div>
    <h2>Окраска в цвета RAL</h2>
    <div class="divider"></div>
    <div class="ral-grid">
      <div>
        <div class="ral-conditions">
          <div class="ral-cond-item">
            <div class="ral-cond-val">150+</div>
            <div class="ral-cond-text"><h4>цветов из палитры RAL</h4><p>Глянцевое и матовое исполнение по заказу</p></div>
          </div>
        </div>
        <div style="margin-top:24px;font-size:13px;">
          <strong style="display:block;margin-bottom:8px">Как заказать цветной радиатор:</strong>
          <code style="display:block;padding:8px 12px;margin:6px 0;font-size:13px;">FTV220500401R2C<strong>RAL7022</strong></code>
          <span style="color:var(--grey)">Глянец (код «1») + суффикс RAL</span>
          <code style="display:block;padding:8px 12px;margin:6px 0;font-size:13px;">FTV2205004<strong>0</strong>2R2C<strong>RAL7022</strong></code>
          <span style="color:var(--grey)">Матт (код «2» на позиции цвета) + суффикс RAL</span>
        </div>
      </div>
      <div>
        <div style="margin-bottom:28px;text-align:center;">
          <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/9e4c1a87c_colored_kermi_comfort.png"
               alt="Радиаторы Kermi Комфорт в цветах RAL: чёрный, слоновая кость, оливковый, бордо"
               style="width:102%;max-width:100%;display:inline-block;background:transparent;">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== ГАРАНТИЯ ========== -->
<section class="warranty" id="warranty">
  <div class="container">
    <div class="section-tag">Надёжность</div>
    <h2>Гарантия и требования<br>к эксплуатации</h2>
    <div class="divider"></div>
    <div class="warranty-grid">
      <div>
        <div class="warranty-kpis">
          <div class="wkpi"><div class="wkpi-val">15</div><div class="wkpi-lbl">лет гарантия</div></div>
          <div class="wkpi"><div class="wkpi-val">25</div><div class="wkpi-lbl">лет срок службы</div></div>
          <div class="wkpi"><div class="wkpi-val">15 бар</div><div class="wkpi-lbl">испытательное давление</div></div>
          <div class="wkpi"><div class="wkpi-val">120°C</div><div class="wkpi-lbl">макс. температура</div></div>
        </div>
        <div class="warranty-list">
          <div class="warranty-li">
            <div class="warranty-li-text"><strong>Гарантийный срок — 15 лет с даты изготовления</strong>Дата нанесена на обратной стороне нижнего сварочного шва каждого радиатора.</div>
          </div>
          <div class="warranty-li">
            <div class="warranty-li-text"><strong>Производство в России</strong>Изготовлено по заказу и лицензии KERMI GmbH на новейшей автоматизированной линии. ГОСТ 31311-2022.</div>
          </div>
          <div class="warranty-li">
            <div class="warranty-li-text"><strong>Для гарантийного случая необходимо:</strong>Паспорт радиатора, акт ввода в эксплуатацию, правильно заполненный сопроводительный талон.</div>
          </div>
          <div class="warranty-li">
            <div class="warranty-li-text"><strong>Система отопления — только закрытая независимая</strong>Радиаторы должны быть постоянно заполнены водой. Опорожнение — не более 15 суток в год.</div>
          </div>
        </div>
      </div>
      <div>
        <h3 style="color:var(--white);font-size:18px;font-weight:800;margin-bottom:16px">Требования к теплоносителю</h3>
        <div class="water-grid">
          <div class="water-item"><span class="water-param">pH</span><span class="water-val">8,3 – 9,5</span></div>
          <div class="water-item"><span class="water-param">Fe³⁺, мг/дм³</span><span class="water-val">≤ 0,5</span></div>
          <div class="water-item"><span class="water-param">O₂, мкг/дм³</span><span class="water-val">≤ 20</span></div>
          <div class="water-item"><span class="water-param">Cl⁻, мг/дм³</span><span class="water-val">< 50</span></div>
          <div class="water-item"><span class="water-param">Взвеш. вещества</span><span class="water-val">≤ 5 мг/дм³</span></div>
          <div class="water-item"><span class="water-param">Нефтепродукты</span><span class="water-val">≤ 1 мг/дм³</span></div>
        </div>
        <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,.05);border-left:3px solid var(--lime);border-radius:8px">
          <strong style="color:var(--lime);font-size:14px;display:block;margin-bottom:8px">На что гарантия не распространяется:</strong>
          <ul style="padding-left:16px;color:#aaa;font-size:13px;line-height:1.9">
            <li>Нарушение требований монтажа или эксплуатации</li>
            <li>Механические повреждения</li>
            <li>Коррозия из-за несоответствия теплоносителя</li>
            <li>Превышение давления или гидроудар</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== ГДЕ КУПИТЬ ========== -->
<section class="dealers" id="dealers">
  <div class="container">
    <div class="section-tag">Где купить</div>
    <h2>Официальные дилеры</h2>
    <div class="divider"></div>
    <div class="dealers-grid">
      <div class="dealer-city-block">
        <div class="dealer-city-name">Москва</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">141033, Московская область, г/о Мытищи, пос. Кардо-Лента, ул. Южная, стр. 1, а/я 609</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:pochta@masterwatt.ru" style="color:var(--grey);text-decoration:none">pochta@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+74957302299">+7 (495) 730-22-99</a></div></div>
        </div>
      </div>
      <div class="dealer-city-block">
        <div class="dealer-city-name">Московская область</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">г. Истра, ул. Московская, д. 47А, ТЦ «Жемчужина», второй этаж</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:istra@masterwatt.ru" style="color:var(--grey);text-decoration:none">istra@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+79030133813">+7 (903) 013-38-13</a></div></div>
        </div>
      </div>
      <div class="dealer-city-block">
        <div class="dealer-city-name">Санкт-Петербург</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">196128, г. Санкт-Петербург, ул. Варшавская, д. 5, корп. 2, лит. А, офис 313</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:spb@masterwatt.ru" style="color:var(--grey);text-decoration:none">spb@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+78126776436">+7 (812) 677-64-36</a></div></div>
        </div>
      </div>
      <div class="dealer-city-block">
        <div class="dealer-city-name">Самара</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">ул. Партизанская, д. 33</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:samara@masterwatt.ru" style="color:var(--grey);text-decoration:none">samara@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+78469736060">+7 (846) 973-60-60</a></div></div>
        </div>
      </div>
      <div class="dealer-city-block">
        <div class="dealer-city-name">Екатеринбург</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">ул. Майкопская, 10, офис 203А</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:ekaterinburg@masterwatt.ru" style="color:var(--grey);text-decoration:none">ekaterinburg@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+73432878791">+7 (343) 287-87-91</a></div></div>
        </div>
      </div>
      <div class="dealer-city-block">
        <div class="dealer-city-name">Краснодар</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">Новороссийская, 250А</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:krasnodar@masterwatt.ru" style="color:var(--grey);text-decoration:none">krasnodar@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+78612125959">+7 (861) 212-59-59</a></div></div>
        </div>
      </div>
      <div class="dealer-city-block">
        <div class="dealer-city-name">Новосибирск</div>
        <div class="dealer-card">
          <div class="dealer-name"><a href="https://masterwatt.ru" target="_blank" rel="noopener">Мастер Ватт</a></div>
          <div class="dealer-row"><span class="dealer-icon">📍</span><span class="dealer-addr">ул. Ватутина, д. 38/3</span></div>
          <div class="dealer-row"><span class="dealer-icon">✉️</span><span class="dealer-addr"><a href="mailto:novosibirsk@masterwatt.ru" style="color:var(--grey);text-decoration:none">novosibirsk@masterwatt.ru</a></span></div>
          <div class="dealer-row"><span class="dealer-icon">📞</span><div class="dealer-phone"><a href="tel:+73833991122">+7 (383) 399-11-22</a></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== FOOTER ========== -->
<footer id="footer">
  <div class="footer-brand">
    <img src="https://media.base44.com/images/public/69f20cdd1ade181e43a31fad/26e20f0a6_Kermi-Logo_t.png" alt="KERMI" style="height:36px;filter:brightness(0) invert(1);margin-bottom:8px">
    <div class="logo-sub">серия «Комфорт» · 2026</div>
    <p>Производство по лицензии KERMI GmbH. Официальный представитель в России — ООО «КЛИВЕТ».</p>
  </div>
  <div class="footer-links">
    <h4>Разделы</h4>
    <ul>
      <li><a href="#production">Производство</a></li>
      <li><a href="#compare">Преимущества</a></li>
      <li><a href="#models">Модельный ряд</a></li>
      <li><a href="#article">Артикул</a></li>
      <li><a href="#mounting">Крепления</a></li>
    </ul>
  </div>
  <div class="footer-links">
    <h4>Инструменты</h4>
    <ul>
      <li><span style="font-size:13px;color:#999;cursor:default;">Онлайн-конфигуратор</span></li>
      <li><a href="https://www.kermi.com/ru/ru/" target="_blank" rel="noopener">BIM-модели и 3D-данные</a></li>
      <li><a href="https://www.kermi.com/ru/ru/" target="_blank" rel="noopener">Портал для партнёров</a></li>
      <li><a href="https://www.kermi.com/ru/ru/" target="_blank" rel="noopener">Скачать документы</a></li>
    </ul>
  </div>
  <div class="footer-links">
    <h4>Контакты</h4>
    <ul>
      <li><a href="tel:88002345698">8-800-234-56-98</a></li>
      <li><a href="mailto:info_ru@kermi.com">info_ru@kermi.com</a></li>
      <li><a href="https://www.kermi.com/ru/ru/" target="_blank" rel="noopener">kermi.com/ru</a></li>
    </ul>
  </div>
</footer>
`;

export default function Home() {
  useEffect(() => {
    // ===== Model Type Selector =====
    function showTypeRow(series, type) {
      const sec = document.getElementById('tsec_' + series);
      if (!sec) return;
      sec.querySelectorAll('.type-info-row').forEach(r => r.style.display = 'none');
      const row = document.getElementById('row_' + series + '_' + type);
      if (row) row.style.display = 'grid';
    }
    window.showTypeRow = showTypeRow;

    window.activateSeries = function(series) {
      document.querySelectorAll('.model-card-v2').forEach(c => c.classList.remove('active'));
      const card = document.querySelector('[data-series="' + series + '"]');
      if (card) card.classList.add('active');
      ['FK0','FTV','FTU','PK0','PTV'].forEach(s => {
        const el = document.getElementById('tsec_' + s);
        if (el) el.style.display = 'none';
      });
      const target = document.getElementById('tsec_' + series);
      if (target) {
        target.style.display = 'block';
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    window.selectType = function(btn, series) {
      btn.closest('.type-btns-row').querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showTypeRow(series, btn.dataset.type);
    };

    // Init first type for each series
    ['FK0','FTV','FTU','PK0','PTV'].forEach(series => {
      const sec = document.getElementById('tsec_' + series);
      if (!sec) return;
      const firstBtn = sec.querySelector('.type-btn');
      if (firstBtn) showTypeRow(series, firstBtn.dataset.type);
    });
    const fk0card = document.querySelector('[data-series="FK0"]');
    if (fk0card) fk0card.classList.add('active');

    // ===== Mounting Tabs =====
    window.showTab = function(id, el) {
      document.querySelectorAll('.mount-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.mount-content').forEach(c => c.classList.remove('active'));
      const tab = document.getElementById('tab-' + id);
      if (tab) tab.classList.add('active');
      if (el) el.classList.add('active');
    };

    // ===== Iframe Auto Height =====
    const handleIframeMessage = (event) => {
      if (event.data && event.data.type === 'setIframeHeight') {
        const iframe = document.querySelector('#kermi-widget-cafdc5eb iframe');
        if (iframe && event.data.height > 0) {
          iframe.style.height = event.data.height + 'px';
        }
      }
    };
    window.addEventListener('message', handleIframeMessage);

    // ===== Scroll Spy =====
    const sections = document.querySelectorAll('section[id], div[id="hero"]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const handleScroll = () => {
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 90) cur = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + cur ? '#BFDE00' : '';
      });
    };
    window.addEventListener('scroll', handleScroll);

    // ===== Entrance Animations =====
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.model-card, .feature-item, .prod-item, .sel-card, .wkpi, .kpi-box').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      animObserver.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('message', handleIframeMessage);
      animObserver.disconnect();
      delete window.showTab;
      delete window.activateSeries;
      delete window.selectType;
      delete window.showTypeRow;
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />;
}