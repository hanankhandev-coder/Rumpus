/* Rumpus — home: the ribbon hero (cards + films drifting up a zigzag line; scrolling grows the lead film to the whole sheet),
   the studio sentence and facts, the work line, the process board and the news board.
   Shared chrome, scroll and loader live in site.js. */
(function () {
  const { $, $$, clamp, lerp, fit } = RUMPUS;
  const smooth = t => t * t * (3 - 2 * t);
  let vw = innerWidth, vh = innerHeight;
  addEventListener('resize', () => { vw = innerWidth; vh = innerHeight; });

  /* ---------- the ribbon: small screens of the studio's work drifting up one zigzag line (after a portfolio stream) ----------
     The graphic cards are the studio's own posters and pages, set in Instrument Sans after a wall of references
     (a festival poster, a chess-club poster, a type specimen, a flip board, a monogram of tiles, a grid of labels). */
  const img = src => `<img src="${src}" alt="" decoding="async">`;
  const grid = Array.from({ length: 60 }, (_, i) => `<i>${i % 2 ? '14' : 'RR'}</i>`).join('');
  const CARDS = [
    `<div class="rc rc--knight"><canvas></canvas><p class="k__t">Run like<br>you mean it</p><p class="k__d">23.10.2026<span>Open studio, Rua do Almada 412, 4050-034 Porto</span></p><p class="k__q">“Loud is not<br>the same as big.”</p><p class="k__f"><span>Rumpus open studio, from six</span><b class="k__pill"><i></i></b><span>Prints, wine, the presses running</span></p></div>`,
    `<div class="rc">${img('img/photo/blue-studio.webp')}</div>`,
    'film',
    `<div class="rc rc--bones"><div class="b__top"><p class="b__t">Salto<br>Livre<sup>Porto</sup></p><p class="b__r">Free<br>concerts</p></div><p class="b__m">Twelve bands /<br>seven squares</p><div class="b__im">${img('img/poster-shoot.webp')}</div><div class="b__low"><p class="b__d">12.04.2026</p><p class="b__r">Entrada<br>livre</p></div></div>`,
    `<div class="rc">${img('img/photo/gallery-look.webp')}</div>`,
    `<div class="rc rc--tiles"><div class="t__grid"><b>R</b><b>U</b><b class="tri"></b><b>M</b></div><p class="t__f"><span>Rumpus, identity system</span><span>Tiles 01 — 04</span></p></div>`,
    `<div class="rc">${img('img/photo/orange-hat.webp')}</div>`,
    'film',
    `<div class="rc rc--burst"><p class="u__p">Olá! We're Rumpus, a creative studio in Porto. We make loud images for festivals, labels and small brands.</p><i class="u__star"></i><p class="u__f"><span>ola@rumpus.pt</span><span>instagram</span><span>are.na</span></p></div>`,
    `<div class="rc">${img('img/photo/mural.webp')}</div>`,
    `<div class="rc rc--flip"><p class="f__h"><span>Riverbend — Small Room Sessions</span><span>On tour</span></p><div class="f__row"><b class="f__c">O</b><b class="f__c">P</b><b class="f__c">O</b><b class="f__info"><span>Destino <i></i></span><em>PT</em></b></div></div>`,
    `<div class="rc">${img('img/photo/blue-man.webp')}</div>`,
    'film',
    `<div class="rc rc--grid"><div class="g__labels">${grid}</div><span class="g__im" style="--x:2;--y:1;--w:2;--h:2">${img('img/photo/purple.webp')}</span><span class="g__im" style="--x:6;--y:0;--w:3;--h:3">${img('img/photo/blue-man.webp')}</span><span class="g__im" style="--x:1;--y:4;--w:1;--h:1">${img('img/photo/yellow-head.webp')}</span><span class="g__im" style="--x:7;--y:4;--w:2;--h:2">${img('img/photo/gallery-art.webp')}</span></div>`,
    `<div class="rc">${img('img/photo/gallery-art.webp')}</div>`,
    `<div class="rc rc--spec"><p class="s__g">R</p><div class="s__side"><p class="s__n">Instrument Sans<span>House face</span></p><p class="s__a">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz0123456789</p><div class="s__l"><p><b>Português</b>Olá, somos a Rumpus. Imprimimos à mão.</p><p><b>English</b>Hello, we're Rumpus. We print by hand.</p></div></div></div>`,
    `<div class="rc">${img('img/photo/purple.webp')}</div>`,
    'film',
    `<div class="rc rc--days"><p class="d__t">One colour<br>a year</p><p class="d__c">Ochre Editions</p><div class="d__im">${img('img/photo/red-backdrop.webp')}</div><p class="d__n">365</p></div>`,
    `<div class="rc">${img('img/photo/yellow-head.webp')}</div>`
  ];
  const ribbon = $('#ribbon'), filmsEl = $('#films');
  ribbon.innerHTML = CARDS.map(c => c === 'film' ? '<div class="rc rc--film"></div>' : c).join('');
  const rcs = $$('.rc', ribbon), N = rcs.length;
  const slots = CARDS.map((c, i) => c === 'film' ? i : -1).filter(i => i >= 0);

  /* ---------- what moves on the cards: the tiles spell RUMPUS, the flip board tours, the grid deals photos, the specimen changes glyph ---------- */
  const flipTo = (el, ch) => { if (el.textContent === ch) return; el.classList.add('flip'); setTimeout(() => { el.textContent = ch; el.classList.remove('flip'); }, 180); };
  const WORD = 'RUMPUS';
  let beat = 0;
  setInterval(() => {
    if (document.hidden) return;
    beat++;
    $$('.rc--tiles .t__grid b:not(.tri)', ribbon).forEach((b, i) => setTimeout(() => flipTo(b, WORD[(beat + [0, 1, 3][i]) % 6]), i * 90));
    $$('.rc--tiles .tri', ribbon).forEach(t => t.style.setProperty('--r', beat * 120 + 'deg'));
    const STOPS = [['OPO', 'PT'], ['LIS', 'PT'], ['MAD', 'ES'], ['LDN', 'UK'], ['BCN', 'ES']], s = STOPS[beat % STOPS.length];
    $$('.rc--flip', ribbon).forEach(f => { $$('.f__c', f).forEach((c, i) => setTimeout(() => flipTo(c, s[0][i]), i * 110)); setTimeout(() => { $('em', f).textContent = s[1]; }, 330); });
    $$('.rc--grid .g__im', ribbon).forEach((g, i) => g.classList.toggle('on', (beat + i) % 3 !== 0));
    $$('.rc--spec .s__g', ribbon).forEach(g => flipTo(g, 'RuMpuS4'[beat % 7]));
  }, 1800);
  // the chess-club poster's piece is the Runner, big, in ink, running behind the type
  const knights = $$('.rc--knight canvas', ribbon);
  function drawKnights(t) {
    knights.forEach(cv => {
      const r = cv.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh || !r.width) return;
      const c = fit(cv); c.clearRect(0, 0, cv.width, cv.height);
      Runner.draw(c, { x: cv.width * .5, y: cv.height * 1.02, size: cv.height * .92, phase: t * 7, fill: '#111' });
    });
  }

  // one <video> per film, each riding its own slot; only the ones on screen play
  filmsEl.innerHTML = FILMS.map(f => `<video src="${f.src}" poster="${f.poster}" muted loop playsinline preload="metadata" disablepictureinpicture></video>`).join('');
  const vids = $$('video', filmsEl).map((el, k) => ({ el, slot: slots[k % slots.length], film: FILMS[k], on: false }));
  // the line rises from the floor and zigzags across the sheet on its way off the top (u = 0 at the floor, 1 off the top)
  const cardW = w => w < 760 ? w * .38 : Math.max(130, Math.min(w * .12, 220));
  // the line is about twice the sheet's height, so roughly half the cards are on screen, spaced like the stream, swinging right, left, right as it climbs (about one and a half waves on screen)
  const path = (u, w, h, cw) => ({ x: w * .5 + w * (w < 760 ? .2 : .24) * Math.sin(u * Math.PI * 6 + .6), y: lerp(h * 1.5, -h * .5, u) });   // card centre
  const FILM_K = 1.3;   // a film's card is a little bigger than the rest

  // put a video into a window (X, Y, W, H) on the sheet: it keeps its own shape, covers the window and is trimmed to it
  function place(v, X, Y, W, H, w, h, round) {
    const el = v.el, va = el.videoWidth / el.videoHeight || 16 / 9, Ew = Math.max(w, h * va), Eh = Ew / va;
    if (el.style.width !== Ew.toFixed(0) + 'px') { el.style.width = Ew.toFixed(0) + 'px'; el.style.height = Eh.toFixed(0) + 'px'; }
    const sc = Math.max(W / Ew, H / Eh), ix = (Ew * sc - W) / 2 / sc, iy = (Eh * sc - H) / 2 / sc;
    el.style.transform = `translate3d(${(X + W / 2 - Ew * sc / 2).toFixed(1)}px,${(Y + H / 2 - Eh * sc / 2).toFixed(1)}px,0) scale(${sc.toFixed(4)})`;
    el.style.clipPath = `inset(${iy.toFixed(1)}px ${ix.toFixed(1)}px round ${(round / sc).toFixed(1)}px)`;
  }
  function play(v, on) {
    if (on === v.on) return; v.on = on;
    if (on) { if (v.el.preload !== 'auto') v.el.preload = 'auto'; const pl = v.el.play(); if (pl) pl.catch(() => {}); } else v.el.pause();
  }

  /* ---------- hero: the ribbon drifts with its films on it. Scrolling takes the film nearest the middle,
     slides it along the line to the centre and grows it to the whole sheet; the rest spread apart and fade ---------- */
  const heroPin = $('#heroPin'), heroEl = $('#hero');
  let lastT = 0, drift = 0, lead = null;
  function updateHero(now) {
    const dt = Math.min(.05, (now - lastT) / 1000 || 0); lastT = now;
    const pr = heroPin.getBoundingClientRect();
    const raw = clamp(-pr.top / Math.max(1, pr.height - vh));
    const p = clamp(raw / .57), e = smooth(p);   // 0 = resting, 1 = the film fills the sheet (first 1.3 screens); the rest of the pin holds it
    if (pr.bottom <= 0) { vids.forEach(v => play(v, false)); updateFilm(raw, pr); return; }
    const fade = 1 - clamp(p * 2.2);
    heroEl.style.setProperty('--fade', fade.toFixed(3));
    drift += dt * .02 * (1 - e);
    const w = heroEl.clientWidth, h = heroEl.clientHeight, cw = cardW(w), ch = cw * .625, fw = cw * FILM_K, fh = fw * .625;
    const uOf = i => ((i / N + drift) % 1 + 1) % 1;
    // the loader deals the cards onto the line one by one, from the floor up (1 once dealt, and always 1 without a loader)
    const dealt = i => smooth(clamp(RUMPUS.loadP * (N + 1) - i));
    rcs.forEach((el, i) => {
      if (slots.includes(i)) return;
      const u = uOf(i), q = path(u, w, h, cw), spread = 1 + e * .6, d = dealt(i);
      const x = w / 2 + (q.x - w / 2) * spread, y = h / 2 + (q.y - h / 2) * spread;
      el.style.setProperty('--cw', cw + 'px');
      el.style.zIndex = Math.round(u * 100);
      el.style.opacity = d < 1 ? d.toFixed(3) : '';
      el.style.transform = `translate3d(${(x - cw / 2).toFixed(1)}px,${(y - ch / 2 + (1 - d) * 40).toFixed(1)}px,0)${d < 1 ? ` scale(${(.8 + .2 * d).toFixed(3)})` : ''}`;
    });
    // which film leads: chosen the moment scrolling starts (the one nearest the middle of the line), held until you are back at the top
    if (e <= 0) lead = null;
    else if (!lead) { lead = vids.reduce((a, b) => Math.abs(uOf(b.slot) - .5) < Math.abs(uOf(a.slot) - .5) ? b : a); setFilm(lead.film); }
    vids.forEach(v => {
      let u = uOf(v.slot);
      const isLead = v === lead;
      if (isLead) u = lerp(u, .5, smooth(clamp(e * 2.2)));
      const q = path(u, w, h, cw), k = isLead ? e : 0, spread = isLead ? 1 : 1 + e * .6;
      const cx = w / 2 + (q.x - w / 2) * spread, cy = h / 2 + (q.y - h / 2) * spread;
      const W = lerp(fw, w, k), H = lerp(fh, h, k), X = lerp(cx - fw / 2, 0, k), Y = lerp(cy - fh / 2, 0, k);
      place(v, X, Y, W, H, w, h, 3 * (1 - k));
      v.el.style.opacity = isLead ? 1 : (fade * dealt(v.slot)).toFixed(3);
      v.el.style.zIndex = isLead ? 200 : Math.round(u * 100);
      play(v, isLead || (fade > 0 && cy > -fh && cy < h + fh));
    });
    updateFilm(raw, pr);
  }

  /* ---------- film captions: once the lead film fills the sheet, its credits come up and leave with the hero ---------- */
  const film = $('#film'), filmLines = $$('.film__title > span');
  function setFilm(f) {
    $('#filmBrand').textContent = f.client; $('#filmL1').textContent = f.lines[0]; $('#filmL2').textContent = f.lines[1];
    $('#filmNo').textContent = f.no; $('#filmNote').textContent = f.note;
  }
  setFilm(FILMS[0]);
  function updateFilm(raw, pr) {
    const f = pr.bottom > 0 ? smooth(clamp((raw - .6) / .22)) : 0;
    film.style.opacity = f.toFixed(3);
    film.style.transform = `translate3d(0,${Math.min(0, pr.bottom - vh).toFixed(1)}px,0)`;
    filmLines.forEach((l, i) => l.style.setProperty('--rise', ((1 - clamp(f * 1.6 - i * .2)) * 34).toFixed(1) + 'px'));
  }
  // films must keep running when asked to: browsers sometimes pause muted video on their own
  vids.forEach(v => { v.el.muted = true; v.el.addEventListener('pause', () => { if (v.on) setTimeout(() => { if (v.on) v.el.play().catch(() => {}); }, 60); }); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) vids.forEach(v => v.on && v.el.play().catch(() => {})); });

  RUMPUS.wait(new Promise(r => { const f = vids[0].el; f.preload = 'auto'; if (f.readyState >= 2) r(); else { f.addEventListener('loadeddata', r, { once: true }); setTimeout(r, 5000); } }));

  /* ---------- facts: each number counts up to itself the first time it comes into view ---------- */
  const counted = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; counted.unobserve(en.target);
    const b = en.target, to = +b.dataset.count, from = to > 1000 ? Math.round(to * .6) : 0, t0 = performance.now();
    (function step(now) { const k = Math.min(1, (now - t0) / 1400), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); b.textContent = to === 2019 ? v : v.toLocaleString('en-GB'); if (k < 1) requestAnimationFrame(step); })(t0);
  }), { threshold: .6 });
  $$('.facts b[data-count]').forEach(b => counted.observe(b));

  /* ---------- work: the hero's line laid on its side. Every job is a card on a slow zigzag; scrolling carries the line along,
     the job in the middle grows to a big card (its film plays if it has one) and its credits rise bottom left, like the hero's films ---------- */
  const pad2 = n => String(n).padStart(2, '0');
  $('#wlineN').textContent = `(${pad2(PROJECTS.length)})`;
  $('#wlineCards').innerHTML = PROJECTS.map((p, i) => `
    <a class="wl" href="project.html?p=${p.slug}" data-curtain="${p.client}">
      <span class="wl__img"><img src="${p.cover}" alt="${p.title}" loading="lazy">${p.film ? `<video src="${p.film}" muted loop playsinline preload="none" disablepictureinpicture></video>` : ''}</span>
      <span class="wl__tag"><b>${pad2(i + 1)}</b>${p.client}</span>
    </a>`).join('');
  const wSec = $('#work'), wls = $$('.wl', wSec).map(el => ({ el, v: $('video', el), on: false })), wCap = $('#wlineCap');
  let wLead = -1;
  function setLead(i) {
    wLead = i; const p = PROJECTS[i];
    wCap.href = `project.html?p=${p.slug}`; wCap.dataset.curtain = p.client;
    $('#wlineClient').textContent = p.client; $('#wlineLine').textContent = p.tagline;
    $('#wlineMeta').textContent = `${pad2(i + 1)} / ${pad2(PROJECTS.length)}  ·  ${p.tags.join(', ')}  ·  ${p.year}`;
    wCap.classList.remove('in'); void wCap.offsetWidth; wCap.classList.add('in');
  }
  function updateWork() {
    const b = wSec.getBoundingClientRect();
    if (b.bottom < 0 || b.top > vh) { wls.forEach(c => { if (c.on) { c.on = false; c.v.pause(); } }); return; }
    const n = wls.length, f = clamp(-b.top / Math.max(1, b.height - vh)) * (n - 1);   // which job sits in the middle (fractional)
    const small = vw < 760 ? vw * .3 : Math.max(130, Math.min(vw * .12, 220)), big = vw < 760 ? vw * .78 : Math.min(vw * .38, vh * .85);
    const gap = vw < 760 ? vw * .32 : vw * .17;
    wls.forEach((c, i) => {
      const d = i - f, k = smooth(clamp(1 - Math.abs(d)));   // 1 = in the middle
      const W = lerp(small, big, k), H = W * .625;
      const x = vw / 2 + d * gap + Math.sign(d) * (big - small) * .5 * (1 - k);   // the big card pushes its neighbours aside
      const y = vh * .5 + Math.sin(d * 1.3) * vh * .2 * (1 - k * .9);              // the same zigzag as the hero, flattening at the middle
      c.el.style.width = W.toFixed(1) + 'px';
      c.el.style.transform = `translate3d(${(x - W / 2).toFixed(1)}px,${(y - H / 2).toFixed(1)}px,0)`;
      c.el.style.zIndex = Math.round(k * 10);
      c.el.classList.toggle('is-lead', k > .6);
      if (c.v) { const on = k > .35; if (on !== c.on) { c.on = on; if (on) { c.v.preload = 'auto'; c.v.play().catch(() => {}); } else c.v.pause(); } }
    });
    const lead = Math.round(f); if (lead !== wLead) setLead(lead);
  }

  /* ---------- process: five pills; the lit one fills like a story bar and hands on to the next. Click to jump ---------- */
  const tabs = $('#procTabs'), say = $('#procSay'), pimg = $('#procImg'), DUR = 5200;
  tabs.innerHTML = PROCESS.map(([n], i) => `<button role="tab" data-i="${i}"><i></i><span>${String(i + 1).padStart(2, '0')}</span>${n}</button>`).join('');
  pimg.innerHTML = PROCESS.map(([, , src]) => `<img src="${src}" alt="" decoding="async">`).join('');
  const tbtn = $$('button', tabs), pims = $$('img', pimg);
  let step = -1, stepT = 0, procOn = false;
  function setStep(i) {
    step = i; stepT = 0;
    tbtn.forEach((b, k) => { b.classList.toggle('is-on', k === i); b.classList.toggle('done', k < i); b.setAttribute('aria-selected', k === i); });
    pims.forEach((im, k) => im.classList.toggle('on', k === i));
    say.classList.remove('in'); void say.offsetWidth; say.textContent = PROCESS[i][1]; say.classList.add('in');
  }
  tbtn.forEach(b => b.addEventListener('click', () => setStep(+b.dataset.i)));
  setStep(0);
  function updateProc(dt) {
    const b = $('#process').getBoundingClientRect(); procOn = b.top < vh * .7 && b.bottom > vh * .3;
    if (!procOn || document.hidden) return;
    stepT += dt * 1000;
    tbtn[step].style.setProperty('--p', Math.min(1, stepT / DUR).toFixed(3));
    if (stepT >= DUR) setStep((step + 1) % PROCESS.length);
  }

  /* ---------- news board: the latest four with pictures ---------- */
  $('#newsGrid').innerHTML = NEWS.filter(n => n.src).slice(0, 4).map(n => `
    <a class="card post reveal" href="${n.link || 'news.html'}">
      <div class="post__head"><h3 class="post__title">${n.title}</h3><p class="post__meta">${n.date}<span>${n.tag}</span></p></div>
      <div class="card__img" style="--ar:${n.ar}"><img src="${n.src}" alt=""></div>
    </a>`).join('');
  RUMPUS.reveal();

  RUMPUS.frame((now, dt) => { updateHero(now); drawKnights(now / 1000); updateWork(); updateProc(dt); });
})();
