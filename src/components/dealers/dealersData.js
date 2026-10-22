// Coordinates approximated from street addresses (no geocoding key) — verify before launch.
export const DEALERS = [
  { id: 'mw-msk', city: 'Москва', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: '141033, Московская область, г/о Мытищи, пос. Кардо-Лента, ул. Южная, стр. 1, а/я 609', email: 'pochta@masterwatt.ru', phones: [['+74957302299', '+7 (495) 730-22-99']], coords: [55.9293, 37.728] },
  { id: 'versus', city: 'Москва', name: 'Версус Групп', addr: 'г. Москва, Логистический центр Славянский Мир, вл. 1"А"', email: 'info@versusgroup.ru', phones: [['+84957963444', '8 (495) 796-3-444'], ['+89099099192', '8 (909) 909-91-92']], coords: [55.586, 37.877] },
  { id: 'mw-istra', city: 'Московская область', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: 'г. Истра, ул. Московская, д. 47А, ТЦ «Жемчужина», второй этаж', email: 'istra@masterwatt.ru', phones: [['+79030133813', '+7 (903) 013-38-13']], coords: [55.915, 36.87] },
  { id: 'mw-spb', city: 'Санкт-Петербург', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: '196128, г. Санкт-Петербург, ул. Варшавская, д. 5, корп. 2, лит. А, офис 313', email: 'spb@masterwatt.ru', phones: [['+78126776436', '+7 (812) 677-64-36']], coords: [59.8858, 30.3135] },
  { id: 'mw-samara', city: 'Самара', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: 'ул. Партизанская, д. 33', email: 'samara@masterwatt.ru', phones: [['+78469736060', '+7 (846) 973-60-60']], coords: [53.2005, 50.158] },
  { id: 'mw-ekb', city: 'Екатеринбург', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: 'ул. Майкопская, 10, офис 203А', email: 'ekaterinburg@masterwatt.ru', phones: [['+73432878791', '+7 (343) 287-87-91']], coords: [56.774, 60.615] },
  { id: 'mw-krd', city: 'Краснодар', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: 'Новороссийская, 250А', email: 'krasnodar@masterwatt.ru', phones: [['+78612125959', '+7 (861) 212-59-59']], coords: [45.035, 39.06] },
  { id: 'mw-nsk', city: 'Новосибирск', name: 'Мастер Ватт', site: 'https://masterwatt.ru', addr: 'ул. Ватутина, д. 38/3', email: 'novosibirsk@masterwatt.ru', phones: [['+73833991122', '+7 (383) 399-11-22']], coords: [54.97, 82.895] },
  { id: 'eurotherm', city: 'Махачкала', name: 'Евротерм', addr: 'проспект Амет-Хана Султана, 222', email: 'eurotherm05@mail.ru', phones: [['+79882929294', '+7 988 292 92 94']], coords: [42.99, 47.505] },
];

export const CITIES = [...new Set(DEALERS.map((d) => d.city))];