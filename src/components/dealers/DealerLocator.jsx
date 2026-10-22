import { useMemo, useState } from 'react';
import { DEALERS, CITIES } from './dealersData';
import DealerMap from './DealerMap';
import DealerCard from './DealerCard';
import './dealers.css';

export default function DealerLocator() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEALERS.filter((d) => (!city || d.city === city) &&
      (!q || d.city.toLowerCase().includes(q) || d.name.toLowerCase().includes(q) || d.addr.toLowerCase().includes(q)));
  }, [query, city]);

  const activeId = filtered.some((d) => d.id === selectedId) ? selectedId : null;
  const select = (id) => {
    setSelectedId(id === activeId ? null : id);
    document.getElementById('dl-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const reset = () => { setQuery(''); setCity(''); setSelectedId(null); };

  return (
    <div className="dl-wrap">
      <div className="dl-controls">
        <input className="dl-input" placeholder="Поиск города или дилера" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="dl-select" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Все города</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(query || city) && <button className="dl-reset" onClick={reset}>Сбросить</button>}
      </div>
      <div className="dl-grid">
        <div className="dl-list">
          {filtered.length === 0 && <div className="dl-empty">Дилеры не найдены. Попробуйте другой запрос.</div>}
          {filtered.map((d) => (
            <div id={'dl-' + d.id} key={d.id}>
              <DealerCard dealer={d} active={d.id === activeId} onClick={() => select(d.id)} />
            </div>
          ))}
        </div>
        <DealerMap dealers={filtered} selectedId={activeId} onSelect={select} />
      </div>
    </div>
  );
}