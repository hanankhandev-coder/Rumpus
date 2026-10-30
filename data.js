// All editable content lives here. Photographs are Pexels (img/work, img/news, img/photo), films in video/.

// Films: each rides the hero ribbon as a card. Whichever is nearest the middle when you scroll grows to the whole sheet and shows its captions.
window.FILMS = [
  { src: 'video/shoot.mp4', poster: 'img/poster-shoot.webp', slug: 'salto-livre', no: '01.001', client: 'Salto Livre', lines: ['Two days on a mint backdrop,', 'one week of free concerts.'],
    note: 'We shot the 2026 campaign in our own studio, eleven musicians, one colour of paper, then printed every portrait as a two-ink riso poster for the streets of Porto.' },
  { src: 'video/gallery.mp4', poster: 'img/poster-gallery.webp', slug: 'piscina-press', no: '01.002', client: 'Piscina Press', lines: ['Half Shadow,', 'a book you stand in front of.'],
    note: 'The launch of a photobook hung as an exhibition first: every spread printed large, framed and walked past before it was bound.' },
  { src: 'video/moodboard.mp4', poster: 'img/poster-moodboard.webp', slug: 'casa-oito', no: '01.003', client: 'Casa Oito', lines: ['Lookbook 07,', 'pinned up before it was shot.'],
    note: 'Forty contact prints, three coats and a wall. The lookbook for the atelier\'s seventh collection, built on the board and printed in black and red.' },
  { src: 'video/orange.mp4', poster: 'img/poster-orange.webp', slug: 'ochre-editions', no: '01.004', client: 'Ochre Editions', lines: ['Ochre,', 'a colour you can hold.'],
    note: 'A print series and campaign film for an editions house that only prints in one colour a year. This year: ochre, pulled 3,200 times.' }
];

// Projects: the work board, the work index and each case study (project.html?p=slug) all read from here.
// `inks` are the riso drums used on the job; `run` is how many sheets came off the press.
window.PROJECTS = [
  { slug: 'salto-livre', client: 'Salto Livre', title: 'Salto Livre: festival campaign', tagline: 'A week of free concerts, printed loud.', year: '2026', place: 'Porto, PT',
    tags: ['Campaign', 'Print', 'Film'], services: ['Campaign', 'Art direction', 'Photography', 'Riso posters', 'Film'], run: '12,400', ar: 1.25,
    inks: [['Fluorescent Pink', '#ff48b0'], ['Yellow', '#ffe800'], ['Black', '#111111']],
    cover: 'img/work/salto-1.webp', images: ['img/work/salto-2.webp', 'img/work/salto-3.webp', 'img/work/salto-4.webp'], film: 'video/shoot.mp4',
    background: 'Salto Livre is a week of free concerts in the squares of Porto, run by volunteers and paid for by the city. Seven editions in, it had a crowd but no face: every year a new poster, every year a new look.',
    challenge: 'Make a festival that costs nothing feel like the most wanted ticket in town, on a budget that covers paper, ink and two days in a studio.',
    solution: 'We brought all eleven headliners to our studio, shot them on one mint backdrop and printed each portrait as a two-ink riso poster. Pasted in runs of forty, the posters made whole streets into a line-up. The same shoot became the campaign film.',
    outcome: 'The posters were taken off the walls faster than we could paste them; we printed a second run of 4,000 to sell at the festival, and the city has asked us back for 2027.',
    credits: [['Creative direction', 'Rita Sá'], ['Print', 'Bruno Vaz'], ['Design', 'Inês Moura'], ['Film', 'Tomás Reis'], ['Photography', 'Rumpus with Studio Ponte']] },
  { slug: 'riverbend-records', client: 'Riverbend Records', title: 'Riverbend: Small Room Sessions', tagline: 'A live record you can see.', year: '2026', place: 'Lisbon, PT',
    tags: ['Identity', 'Print'], services: ['Identity', 'Sleeve design', 'Photography', 'Print'], run: '3,000', ar: 1.5,
    inks: [['Blue', '#2340d8'], ['Orange', '#ff6c2f']],
    cover: 'img/work/riverbend-1.webp', images: ['img/work/riverbend-2.webp', 'img/work/riverbend-3.webp', 'img/work/riverbend-4.webp'],
    background: 'Riverbend records bands live in rooms smaller than our studio: kitchens, shops, a barber\'s after hours. The label needed an identity as loose and close as the recordings.',
    challenge: 'Twelve sessions a year, each in a new room, each with a new band, and one look that still says Riverbend from across a record shop.',
    solution: 'Every band comes to our black room for one portrait session, lit by a single lamp. The best frame becomes the sleeve, printed in blue with the band\'s name circled in orange by hand, so no two covers are the same.',
    outcome: 'Twelve sleeves, 3,000 copies, one rule. The label now sells the outtakes as prints alongside every record.',
    credits: [['Creative direction', 'Rita Sá'], ['Design', 'Inês Moura'], ['Print', 'Bruno Vaz']] },
  { slug: 'ochre-editions', client: 'Ochre Editions', title: 'Ochre Editions: one colour a year', tagline: 'A colour you can hold.', year: '2025', place: 'Porto, PT',
    tags: ['Print', 'Identity', 'Film'], services: ['Identity', 'Screen print', 'Riso', 'Campaign film'], run: '3,200', ar: .9,
    inks: [['Ochre', '#c98a1b'], ['Black', '#111111']],
    cover: 'img/work/ochre-1.webp', images: ['img/work/ochre-2.webp', 'img/work/ochre-3.webp', 'img/work/ochre-4.webp'], film: 'video/orange.mp4',
    background: 'Ochre Editions publishes artists\' prints, but only ever in one colour a year. Their first year needed a name, a shop and something to make people wait for the next colour.',
    challenge: 'An identity with almost nothing in it: one ink, one paper, one typeface, and a year to make it feel like a collection.',
    solution: 'We built the whole identity on the press: wordmark, labels and shop bags are all screen printed in the year\'s ink, so the brand literally changes colour every January. The campaign film is one portrait, one colour, slowed right down.',
    outcome: '3,200 sheets pulled in ochre, the first edition sold out in nine days, and next year\'s colour is already a guessing game on the shop\'s mailing list.',
    credits: [['Creative direction', 'Rita Sá'], ['Screen print', 'Bruno Vaz'], ['Film', 'Tomás Reis']] },
  { slug: 'piscina-press', client: 'Piscina Press', title: 'Piscina Press: Half Shadow', tagline: 'A photobook hung as a show first.', year: '2025', place: 'Porto, PT',
    tags: ['Print', 'Campaign'], services: ['Book design', 'Exhibition', 'Print production', 'Launch'], run: '800', ar: 1.6,
    inks: [['Black', '#111111'], ['Warm Grey', '#9b9286']],
    cover: 'img/work/piscina-1.webp', images: ['img/work/piscina-2.webp', 'img/work/piscina-3.webp', 'img/work/piscina-4.webp'], film: 'video/gallery.mp4',
    background: 'Half Shadow is a book of photographs of borders, walls and edges. Piscina Press wanted people to meet the pictures before they met the book.',
    challenge: 'Launch an 800-copy photobook with no ad budget in a city full of photobooks.',
    solution: 'We printed every spread at wall size and hung the book in order in a borrowed gallery, page numbers on the wall labels. You walked the book before you could buy it, and the exit was the shop.',
    outcome: 'Six weeks on the walls, 4,100 visitors and the first run of 800 gone before the show came down.',
    credits: [['Book design', 'Inês Moura'], ['Exhibition', 'Rita Sá'], ['Print production', 'Bruno Vaz']] },
  { slug: 'casa-oito', client: 'Casa Oito', title: 'Casa Oito: Lookbook 07', tagline: 'Pinned up before it was shot.', year: '2025', place: 'Braga, PT',
    tags: ['Campaign', 'Print', 'Film'], services: ['Art direction', 'Lookbook', 'Photography', 'Film'], run: '1,500', ar: 1.3,
    inks: [['Red', '#ff3a1f'], ['Black', '#111111']],
    cover: 'img/work/casa-1.webp', images: ['img/work/casa-2.webp', 'img/work/casa-3.webp', 'img/work/casa-4.webp'], film: 'video/moodboard.mp4',
    background: 'Casa Oito is a small atelier in Braga making coats in runs of twenty. Their seventh collection was their first with a shop, and their first with a lookbook.',
    challenge: 'Show a collection of nine pieces so it feels like a world, not a catalogue.',
    solution: 'We built the lookbook on a wall: sketches, swatches and forty contact prints, moved around for a week until the story held. The book is that wall, photographed and printed in red and black.',
    outcome: 'The lookbook sold as an object of its own, and the wall now hangs in the shop.',
    credits: [['Art direction', 'Rita Sá'], ['Design', 'Inês Moura'], ['Film', 'Tomás Reis']] },
  { slug: 'teatro-rivoli', client: 'Teatro Rivoli', title: 'Rivoli: season 26 identity', tagline: 'A season pasted up, not printed out.', year: '2024', place: 'Porto, PT',
    tags: ['Identity', 'Print'], services: ['Identity', 'Poster system', 'Signage'], run: '6,000', ar: 1.5,
    inks: [['Fluorescent Orange', '#ff7a1a'], ['Blue', '#2340d8'], ['Black', '#111111']],
    cover: 'img/work/rivoli-1.webp', images: ['img/work/rivoli-2.webp', 'img/work/rivoli-3.webp'],
    background: 'Porto\'s municipal theatre programmes forty shows a season, from opera to stand-up. Its posters all looked like the same poster.',
    challenge: 'A system that forty different shows can share and still look nothing alike.',
    solution: 'One grid, three inks and a rule: every show sends its cast to our white room for one afternoon. One photograph per show, one poster per photograph.',
    outcome: '6,000 posters across the city, and a season that sold 18% more tickets than the last.',
    credits: [['Creative direction', 'Rita Sá'], ['Design', 'Inês Moura'], ['Print', 'Bruno Vaz']] },
  { slug: 'rua-nova', client: 'Rua Nova', title: 'Rua Nova: season 26 lookbook', tagline: 'Five colours, five rooms, one label.', year: '2026', place: 'Porto, PT',
    tags: ['Campaign', 'Print'], services: ['Art direction', 'Photography', 'Lookbook', 'Posters'], run: '2,000', ar: .8,
    inks: [['Orange', '#ff6c2f'], ['Yellow', '#ffe800'], ['Purple', '#765ba7']],
    cover: 'img/photo/orange-hat.webp', images: ['img/photo/yellow-head.webp', 'img/photo/purple.webp', 'img/photo/red-backdrop.webp'],
    background: 'Rua Nova is a young label from Porto making clothes in strong, flat colours. Their second season needed a lookbook and a set of posters for the shop windows.',
    challenge: 'Make a small collection look as loud as the colours it is cut from.',
    solution: 'We painted one backdrop per colour of the collection and shot every look against its own colour, then printed the posters in the same inks so the walls of the shop matched the pictures.',
    outcome: 'A lookbook of 2,000 copies and five window posters that sold out before the clothes did.',
    credits: [['Art direction', 'Rita Sá'], ['Photography', 'Rumpus'], ['Print', 'Bruno Vaz']] },
  { slug: 'galeria-fio', client: 'Galeria Fio', title: 'Galeria Fio: a gallery that talks back', tagline: 'Wall labels people actually read.', year: '2024', place: 'Porto, PT',
    tags: ['Identity', 'Print'], services: ['Identity', 'Wayfinding', 'Wall labels', 'Catalogues'], run: '1,200', ar: 1.5,
    inks: [['Black', '#111111'], ['Blue', '#2340d8']],
    cover: 'img/photo/gallery-look.webp', images: ['img/photo/gallery-art.webp', 'img/photo/mural.webp', 'img/photo/blue-man.webp'],
    background: 'Galeria Fio shows young painters in a converted textile shop. Visitors loved the rooms and ignored every word on the walls.',
    challenge: 'Give the gallery a voice without putting anything between people and the paintings.',
    solution: 'One typeface, set large and printed on the wall itself: every label is a single line written like a person talking, and every catalogue is a riso booklet you can fold into a pocket.',
    outcome: 'Visitors stay longer, the booklets are collected like tickets, and three other galleries have asked for the same system.',
    credits: [['Creative direction', 'Rita Sá'], ['Design', 'Inês Moura'], ['Print', 'Bruno Vaz']] }
];

// News: journal entries and studio updates. The home page shows the first four.
window.NEWS = [
  { src: 'img/news/studio.webp', ar: .8, title: 'On set: two days shooting the Salto Livre campaign', date: '14.02.26', tag: 'News', link: 'project.html?p=salto-livre',
    body: 'Eleven musicians, one mint backdrop and a lot of coffee. The full case study is up now, posters still on the walls.' },
  { src: 'img/news/event.webp', ar: 1.78, title: 'Partition: an evening of riso portraits at the studio', date: '22.01.26', tag: 'Events',
    body: 'Thank you to everyone who squeezed into Rua do Almada for Partition. Prints from the night are in the shop until they run out.' },
  { src: 'img/news/proofs.webp', ar: .8, title: 'No such thing as too many proofs', date: '05.12.25', tag: 'Journal',
    body: 'Why every job here starts on the wall and the press, not the screen. A short note on proofing, by Bruno.' },
  { src: 'img/news/binding.webp', ar: .8, title: 'Why we keep painting the backdrop blue', date: '18.11.25', tag: 'Journal',
    body: 'Cobalt, again. Rita on the one colour we never get tired of and what it does to a face.' },
  { title: 'Half Shadow shortlisted for a photobook award in Paris', date: '02.10.25', tag: 'Awards', link: 'project.html?p=piscina-press',
    body: 'Our book for Piscina Press is on the shortlist with nineteen others. We\'ll be in Paris in November with a suitcase of copies.' },
  { title: 'We\'re hiring a print technician (part time)', date: '11.09.25', tag: 'News',
    body: 'Three days a week on two risographs and a screen bed. You\'ll need patience, clean hands and a love of misregistration.' },
  { title: 'Ochre Editions: first edition sold out in nine days', date: '28.06.25', tag: 'News', link: 'project.html?p=ochre-editions',
    body: '3,200 sheets of ochre, gone. Next year\'s colour is a secret, even from us.' },
  { title: 'Talk: Loud on a small budget, at the Porto design biennale', date: '03.05.25', tag: 'Events',
    body: 'Rita and Bruno on making campaigns with paper, ink and two days in a studio. Slides on request.' }
];

// Studio page: people, and the machines that do the heavy lifting.
window.TEAM = [
  ['Rita Sá', 'Co-founder, creative direction', '2019'],
  ['Bruno Vaz', 'Co-founder, print', '2019'],
  ['Inês Moura', 'Designer', '2021'],
  ['Tomás Reis', 'Film and motion', '2023']
];
window.PRESSES = [
  ['Big Pink', 'Riso MZ970, two drums', '2019', '1.2M sheets'],
  ['Pequena', 'Riso SF5130, one drum', '2021', '410k sheets'],
  ['O Banco', 'Screen bed, pulled by hand', '2020', '38k pulls']
];

// Home: how a job goes through the studio, one pill per step.
window.PROCESS = [
  ['Wall', 'Every job starts pinned to the wall: prints, swatches, contact sheets, moved around until the idea holds.', 'img/work/casa-3.webp'],
  ['Shoot', 'We shoot in our own white room, one backdrop and two lights, so the pictures belong to the print from day one.', 'img/work/salto-2.webp'],
  ['Proof', 'Then proofs, and more proofs. Nothing goes to the press until it looks right from across the street.', 'img/news/proofs.webp'],
  ['Press', 'Big Pink, Pequena and the screen bed do the rest. The people who had the idea pull the sheets.', 'img/news/press.webp'],
  ['Show', 'Pasted up, hung, bound or worn. We go and watch people stop in front of it.', 'img/work/piscina-1.webp']
];

// Home: the studio's rules, run along the page as you scroll.

// Archive: every picture from every job, plus the studio's own portraits and days. Built once from the data above.
window.ARCHIVE = (() => {
  const out = [], PLATE = ['Cover', 'Plate 02', 'Plate 03', 'Plate 04'];
  PROJECTS.forEach(p => [p.cover, ...p.images].forEach((src, k) => out.push({ src, title: p.client, note: PLATE[k], tag: p.tags[0], year: p.year, link: 'project.html?p=' + p.slug })));
  FILMS.forEach(f => out.push({ src: f.poster, video: f.src, title: f.client, note: 'Campaign film', tag: 'Film', year: '2026', link: 'project.html?p=' + f.slug }));
  [['blue-studio', 'Cobalt portrait', '2025']].forEach(([f, n, y]) => out.push({ src: 'img/photo/' + f + '.webp', title: 'Rumpus', note: n, tag: 'Photography', year: y }));
  [['event', 'Partition, open studio', '2026'], ['press', 'O Banco, the screen bed', '2025'], ['press-2', 'Big Pink at work', '2025'], ['proofs', 'The proof wall', '2025'], ['binding', 'The blue backdrop', '2025']].forEach(([f, n, y]) => out.push({ src: 'img/news/' + f + '.webp', title: 'Studio', note: n, tag: 'Studio', year: y }));
  // shuffle with a fixed seed so the archive reads like a table of loose prints, the same every visit
  let r = 7; const rnd = () => (r = r * 16807 % 2147483647) / 2147483647;
  return out.map(a => [rnd(), a]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
})();
