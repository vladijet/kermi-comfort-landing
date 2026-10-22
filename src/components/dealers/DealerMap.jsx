import { useEffect, useRef } from 'react';

const PIN_ICON = 'https://media.base44.com/images/public/6a590b715e6fa7f1a2f64056/0fb480821_Icon_Kermi_dealers_points.svg';

let loader;
function loadYmaps() {
  if (!loader) {
    loader = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      s.onload = () => window.ymaps.ready(() => resolve(window.ymaps));
      document.head.appendChild(s);
    });
  }
  return loader;
}

export default function DealerMap({ dealers, selectedId, onSelect }) {
  const el = useRef(null);
  const map = useRef(null);
  const ym = useRef(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;

  useEffect(() => {
    loadYmaps().then((ymaps) => {
      if (!el.current || map.current) return;
      ym.current = ymaps;
      map.current = new ymaps.Map(el.current, { center: [55.75, 37.62], zoom: 4, controls: ['zoomControl'] });
      map.current.behaviors.disable('scrollZoom');
      el.current.dispatchEvent(new Event('ymready'));
    });
  }, []);

  useEffect(() => {
    const draw = () => {
      const ymaps = ym.current, m = map.current;
      if (!m) return;
      m.geoObjects.removeAll();
      dealers.forEach((d) => {
        const active = d.id === selectedId;
        const size = active ? 52 : 40;
        const pm = new ymaps.Placemark(d.coords, { hintContent: `${d.name} — ${d.city}` }, {
          iconLayout: 'default#image',
          iconImageHref: PIN_ICON,
          iconImageSize: [size, size],
          iconImageOffset: [-size / 2, -size],
          zIndex: active ? 1000 : 1,
        });
        pm.events.add('click', () => selectRef.current(d.id));
        m.geoObjects.add(pm);
      });
      const sel = dealers.find((d) => d.id === selectedId);
      if (sel) m.setCenter(sel.coords, 13, { duration: 300 });
      else if (dealers.length > 1) m.setBounds(m.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 40 });
      else if (dealers.length === 1) m.setCenter(dealers[0].coords, 12);
    };
    if (map.current) draw();
    const node = el.current;
    node?.addEventListener('ymready', draw);
    return () => node?.removeEventListener('ymready', draw);
  }, [dealers, selectedId]);

  return <div ref={el} className="dl-map" />;
}