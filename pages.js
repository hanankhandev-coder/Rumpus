/* Rumpus — the inside pages: work, archive, case study, studio and news. Every page reads data.js; chrome is site.js. */
(function () {
  const { $, $$, lerp, page } = RUMPUS;
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const inkDots = inks => inks.map(([n, c]) => `<i style="--ink:${c}" title="${n}"></i>`).join('');
  // a sentence that is also the filter: the chosen words in ink, the rest in grey (the studio's own Circular-style sentence)
  const sentence = (el, onPick) => {
    el.addEventListener('click', e => { const a = e.target.closest('[data-f]'); if (!a) return; e.preventDefault(); onPick(a.dataset.f); });
    return f => $$('[data-f]', el).forEach(a => a.classList.toggle('is-on', a.dataset.f === f));
  };

  /* ---------- work: "Projects (08) within Campaign, Identity, Print and Film" — pick a word to filter.
     The grid is an editorial sheet: client and line above each picture, some pictures twice the size (after an agency index). ---------- */
  if (page === 'work') {
    const SIZE = ['s', 's', 'b', 's e', 's', 'b', 's e', 's'];   // s = one cell, b = two by two, e = sits on the bottom of its cell
    $('#wgrid').innerHTML = PROJECTS.map((p, i) => `
      <a class="wg ${SIZE[i % SIZE.length]} reveal" href="project.html?p=${p.slug}" data-curtain="${p.client}" data-tags="${p.tags.join(' ')}">
        <span class="wg__cap"><b>${p.client}</b>${p.tagline}</span>
        <span class="wg__img"><img src="${p.cover}" alt="${p.title}" loading="lazy"></span>
        <span class="wg__meta"><span>${pad(i + 1)}</span><span class="inks">${inkDots(p.inks)}</span><span>${p.year}</span></span>
      </a>`).join('');
    $('#wlist').innerHTML = PROJECTS.map((p, i) => `
      <li data-tags="${p.tags.join(' ')}"><a href="project.html?p=${p.slug}" data-curtain="${p.client}" data-cover="${p.cover}">
        <span class="wl__no">../${pad(i + 1)}</span><span class="wl__client">${p.client}</span><span class="wl__line">${p.tagline}</span>
        <span class="wl__tags">${p.tags.join(', ')}</span><span class="inks">${inkDots(p.inks)}</span><span class="wl__year">../${p.year}</span></a></li>`).join('');
    const mark = sentence($('#wsay'), pick);
    function pick(f) {
      if (f !== 'All' && $(`#wsay [data-f="${f}"].is-on`)) f = 'All';   // picking the lit word again shows everything
      let n = 0;
      $$('.wg, #wlist li').forEach(el => { const on = f === 'All' || el.dataset.tags.split(' ').includes(f); el.classList.toggle('is-off', !on); if (on && el.classList.contains('wg')) n++; });
      $('#wcount').textContent = `(${pad(n)})`;
      mark(f); RUMPUS.reveal();
      history.replaceState(null, '', f === 'All' ? 'work.html' : 'work.html?tag=' + f);
    }
    $$('#views button').forEach(b => b.addEventListener('click', () => {
      $$('#views button').forEach(x => x.classList.toggle('is-on', x === b));
      const idx = b.dataset.view === 'index';
      $('#wgrid').hidden = idx; $('#wlist').hidden = !idx; RUMPUS.reveal();
    }));
    pick(new URLSearchParams(location.search).get('tag') || 'All');
    // the index: the cover floats by the cursor
    const peek = $('#peek'), pim = $('img', peek);
    let mx = 0, my = 0, px = 0, py = 0;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
    $$('#wlist a').forEach(a => {
      a.addEventListener('pointerenter', () => { pim.src = a.dataset.cover; peek.classList.add('on'); });
      a.addEventListener('pointerleave', () => peek.classList.remove('on'));
    });
    RUMPUS.frame(() => {
      const vx = mx - px; px = lerp(px, mx, .16); py = lerp(py, my, .16);
      peek.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) translate(-50%,-50%) rotate(${Math.max(-8, Math.min(8, vx * .08)).toFixed(2)}deg)`;
    });
  }

  /* ---------- archive: every picture the studio has made, small, numbered, on one sheet (after a few studio archives).
     The sentence filters by kind, "Show me" filters by any word, and a picture opens full size on a white sheet. ---------- */
  if (page === 'archive') {
    const A = ARCHIVE;
    const grid = $('#agrid'), list = $('#alist'), q = $('#aq');
    grid.innerHTML = A.map((a, i) => `<button class="ag" data-i="${i}"><span class="ag__img"><img src="${a.src}" alt="${a.title}, ${a.note}" loading="lazy"></span><span class="ag__no">${pad(i + 1, 3)}<em>${a.title}</em></span></button>`).join('');
    list.innerHTML = A.map((a, i) => `<li><button data-i="${i}"><span class="wl__no">${pad(i + 1, 3)}</span><span class="al__t">${a.title}</span><span class="al__n">${a.note}</span><span class="al__k">${a.tag}</span><span class="wl__year">${a.year}</span></button></li>`).join('');
    let kind = 'All';
    const mark = sentence($('#asay'), f => { kind = f !== 'All' && kind === f ? 'All' : f; apply(); });
    function apply() {
      const words = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let n = 0;
      A.forEach((a, i) => {
        const hay = `${a.title} ${a.note} ${a.tag} ${a.year}`.toLowerCase();
        const on = (kind === 'All' || a.tag === kind) && words.every(w => hay.includes(w));
        grid.children[i].classList.toggle('is-off', !on); list.children[i].classList.toggle('is-off', !on); if (on) n++;
      });
      $('#acount').textContent = `(${pad(n, 3)})`; mark(kind);
      $('#aempty').hidden = n > 0;
    }
    q.addEventListener('input', apply);
    $('#aform').addEventListener('submit', e => { e.preventDefault(); q.blur(); });
    $$('#aviews button').forEach(b => b.addEventListener('click', () => {
      $$('#aviews button').forEach(x => x.classList.toggle('is-on', x === b));
      const l = b.dataset.view === 'list'; grid.hidden = l; list.hidden = !l;
    }));
    apply();

    // the viewer: a white sheet, the picture as large as it fits, its number and caption; arrows, keys and Esc
    const lb = $('#lb'), lbm = $('#lbMedia');
    let cur = -1;
    const shown = () => A.map((a, i) => i).filter(i => !grid.children[i].classList.contains('is-off'));
    function open(i) {
      cur = i; const a = A[i];
      lbm.innerHTML = a.video ? `<video src="${a.video}" poster="${a.src}" muted loop playsinline autoplay></video>` : `<img src="${a.src}" alt="${a.title}, ${a.note}">`;
      $('#lbNo').textContent = pad(i + 1, 3) + ' / ' + pad(A.length, 3);
      $('#lbT').innerHTML = `<b>${a.title}</b>${a.note}`;
      $('#lbK').textContent = `${a.tag}, ${a.year}`;
      const go = $('#lbGo'); go.hidden = !a.link; if (a.link) { go.href = a.link; go.dataset.curtain = a.title; }
      lb.classList.add('on'); document.documentElement.classList.add('lb-open'); if (RUMPUS.lenis) RUMPUS.lenis.stop();
    }
    function close() { lb.classList.remove('on'); document.documentElement.classList.remove('lb-open'); lbm.innerHTML = ''; cur = -1; if (RUMPUS.lenis) RUMPUS.lenis.start(); }
    function step(d) { const s = shown(), k = s.indexOf(cur); open(s[(k + d + s.length) % s.length]); }
    [grid, list].forEach(el => el.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) open(+b.dataset.i); }));
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', () => step(-1));
    $('#lbNext').addEventListener('click', () => step(1));
    lbm.addEventListener('click', () => step(1));
    addEventListener('keydown', e => { if (cur < 0) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  }

  /* ---------- case study (after OMSE + Locomotive): title, the job in numbers and inks, the story in four parts, pictures, credits, next ---------- */
  if (page === 'project') {
    const slug = new URLSearchParams(location.search).get('p');
    const i = Math.max(0, PROJECTS.findIndex(p => p.slug === slug)), p = PROJECTS[i], next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.client} — Rumpus`;
    const media = src => /\.mp4$/.test(src) ? `<video src="${src}" muted loop playsinline autoplay preload="auto"></video>` : `<img src="${src}" alt="" loading="lazy">`;
    const [first, ...rest] = p.images;
    $('#case').innerHTML = `
      <header class="case__head">
        <p class="case__crumb"><a href="work.html">Work</a><span>Case ${pad(i + 1)} of ${pad(PROJECTS.length)}</span></p>
        <h1 class="case__title">${p.client}</h1>
        <p class="case__line">${p.tagline}</p>
      </header>
      <dl class="case__meta">
        <div><dt>Client</dt><dd>${p.client}</dd></div>
        <div><dt>Year</dt><dd>${p.year}</dd></div>
        <div><dt>Location</dt><dd>${p.place}</dd></div>
        <div><dt>Services</dt><dd>${p.services.join('<br>')}</dd></div>
        <div><dt>Off the press</dt><dd><b class="case__run">${p.run}</b> sheets</dd></div>
        <div><dt>Inks</dt><dd class="case__inks">${p.inks.map(([n, c]) => `<span><i style="--ink:${c}"></i>${n}</span>`).join('')}</dd></div>
      </dl>
      <figure class="case__hero crop">${media(p.film || p.cover)}</figure>
      <section class="case__text">
        ${[['Background', p.background], ['The brief', p.challenge], ['What we made', p.solution], ['What happened', p.outcome]].map(([h, t], k) => `
          <div class="row reveal"><h2><span>(${pad(k + 1)})</span>${h}</h2><p>${t}</p></div>`).join('')}
      </section>
      <div class="case__pics">
        <figure class="crop wide reveal">${media(p.film ? p.cover : first)}</figure>
        ${(p.film ? p.images : rest).map(src => `<figure class="crop reveal">${media(src)}</figure>`).join('')}
      </div>
      <section class="case__credits row reveal"><h2><span>(05)</span>Credits</h2><dl>${p.credits.map(([r, n]) => `<div><dt>${r}</dt><dd>${n}</dd></div>`).join('')}</dl></section>
      <a class="case__next" href="project.html?p=${next.slug}" data-curtain="${next.client}">
        <span class="case__nextlabel">Next case — ${pad((i + 1) % PROJECTS.length + 1)}</span>
        <span class="case__nexttitle">${next.client}</span>
        <span class="case__nextline">${next.tagline}</span>
        <span class="case__nextimg"><img src="${next.cover}" alt="" loading="lazy"></span>
      </a>`;
    $$('#case video').forEach(v => { v.muted = true; v.play().catch(() => {}); });
    RUMPUS.reveal();
  }

  /* ---------- studio: people, and the presses as members of staff (Big Pink is lit while the studio is open) ---------- */
  if (page === 'studio') {
    $('#people').innerHTML = TEAM.map(([n, r, y]) => `<li class="reveal"><span class="t__name">${n}</span><span class="t__role">${r}</span><span class="t__since">Since ${y}</span></li>`).join('');
    const open = () => { const t = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Lisbon' })), h = t.getHours(), d = t.getDay(); return d > 1 && h >= 10 && h < 19; };
    $('#presses').innerHTML = PRESSES.map(([n, r, y, s], k) => `<li class="reveal"><span class="t__name">${n}${k === 0 ? `<i class="live${open() ? ' on' : ''}" title="${open() ? 'Running now' : 'Resting'}"></i>` : ''}</span><span class="t__role">${r}</span><span class="t__since">Since ${y}</span><span class="t__stat">${s}</span></li>`).join('');
    $('#peopleCount').textContent = `(${pad(TEAM.length)})`; $('#pressCount').textContent = `(${pad(PRESSES.length)})`;
    RUMPUS.reveal();
  }

  /* ---------- news: a dated feed (after OMSE), filterable ---------- */
  if (page === 'news') {
    $('#feed').innerHTML = NEWS.map(n => `
      <li class="reveal" data-tag="${n.tag}">
        <p class="feed__when">${n.date}<span>${n.tag}</span></p>
        <div class="feed__body"><h2>${n.title}</h2><p>${n.body}</p>${n.link ? `<a href="${n.link}">Read the case →</a>` : ''}</div>
        ${n.src ? `<div class="feed__img"><img src="${n.src}" alt="" loading="lazy"></div>` : '<div></div>'}
      </li>`).join('');
    const chips = $$('#chips button');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.classList.toggle('is-on', x === c));
      $$('#feed li').forEach(li => li.classList.toggle('is-off', c.dataset.tag !== 'All' && li.dataset.tag !== c.dataset.tag));
    }));
    RUMPUS.reveal();
  }
})();
