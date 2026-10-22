export default function DealerCard({ dealer, active, onClick }) {
  return (
    <div className={`dl-card${active ? ' dl-card-active' : ''}`} onClick={onClick}>
      <div className="dl-city">{dealer.city}</div>
      <div className="dl-name">{dealer.name}</div>
      {active && (
        <div className="dl-details" onClick={(e) => e.stopPropagation()}>
          <div className="dl-addr">📍 {dealer.addr}</div>
          {dealer.phones.map(([tel, label]) => (
            <a key={tel} href={`tel:${tel}`} className="dl-link">📞 {label}</a>
          ))}
          <a href={`mailto:${dealer.email}`} className="dl-link">✉️ {dealer.email}</a>
          {dealer.site && <a href={dealer.site} target="_blank" rel="noopener noreferrer" className="dl-link">🌐 {dealer.site.replace('https://', '')}</a>}
        </div>
      )}
    </div>
  );
}