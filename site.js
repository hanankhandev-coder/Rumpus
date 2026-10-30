/* Rumpus — what every page shares: top bar with the Runner in his orange tile, pill nav (its line turns into the running logo on scroll),
   page curtain, loader (home, once a visit), footer, smooth scroll, reveals and one rAF loop. Page scripts add work with RUMPUS.frame(fn). */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const PAGE = document.body.dataset.page;
  const store = { get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- chrome ---------- */
  const NAV = [['work.html', 'Work', 'work'], ['archive.html', 'Archive', 'archive'], ['studio.html', 'Studio', 'studio'], ['news.html', 'News', 'news'], ['#contact', 'Contact', '']];
  document.body.insertAdjacentHTML('afterbegin', `
    <a href="index.html" class="mark" aria-label="Rumpus, home"><canvas id="tileRunner"></canvas></a>
    <header class="top" id="topbar">
      <a href="index.html" class="top__logo">Rumpus</a>
      <p class="top__mid"><span>Inquiries</span><a href="mailto:ola@rumpus.pt">ola@rumpus.pt</a></p>
      <p class="top__mid top__sheets"><span>Sheets pulled today</span><b id="sheets">0</b></p>
      <p class="top__end">Creative studio, Porto<span>41.15° N, 8.61° W</span></p>
    </header>
    <nav class="pill" id="pill" aria-label="Main">
      <div class="pill__links">${NAV.map(([h, t, k]) => `<a href="${h}"${k === PAGE ? ' class="is-on" aria-current="page"' : ''}>${t}</a>`).join('')}</div>
      <a class="pill__line" href="index.html" aria-label="Rumpus"><span class="pl__text">Loud images for festivals, labels and small brands</span><span class="pl__logo"><canvas id="pillRunner"></canvas>Rumpus</span></a>
    </nav>
    <div class="curtain" id="curtain" aria-hidden="true"><p class="curtain__name" id="curtainName"></p><canvas id="curtainRunner"></canvas></div>
    <canvas class="sprint" id="sprint" aria-hidden="true"></canvas>`);

  /* ---------- footer: the contact sheet and the word ---------- */
  const foot = $('#contact');
  if (foot) foot.innerHTML = `
    <p class="label">Contact</p>
    <h2 class="say">Got a festival, a record or a shop that needs to be heard? <span class="say__grey">Tell us what it is, how many and by when.</span></h2>
    <a class="mail" href="mailto:ola@rumpus.pt">ola@rumpus.pt</a>
    <div class="contact__cols">
      <p><span>Studio</span>Rua do Almada 412<br>4050-034 Porto, PT</p>
      <p><span>Open</span>Tue — Sat, 10:00 — 19:00<br>Porto time <b id="clock">--:--</b></p>
      <p><span>New work</span>Rita Sá<br><a href="mailto:rita@rumpus.pt">rita@rumpus.pt</a></p>
      <p><span>Elsewhere</span><a href="#">Instagram</a><br><a href="#">Are.na</a></p>
    </div>
    <div class="contact__word" aria-hidden="true"><div class="cw__cards">${(window.PROJECTS || []).map(p => `<span class="cw__c"><img src="${p.cover}" alt="" loading="lazy"></span>`).join('')}</div><p class="cw__t">Rumpus</p></div>
    <div class="contact__bot"><span>© 2019 — 2026 Rumpus Studio</span><span>Press <kbd>R</kbd> to let him out · Printed by hand in Porto</span></div>`;

  /* ---------- smooth scroll; in-page anchors scroll, other pages go through the curtain ---------- */
  const lenis = window.Lenis ? new Lenis({ lerp: .085, smoothWheel: true }) : null;
  const curtain = $('#curtain'), curtainName = $('#curtainName');
  let curtainDir = 0, curtainAt = 0;   // 0 = idle, 1 = closing over this page, -1 = opening onto it
  const CLOSE = .5, HOLD = .18, OPEN = .65;
  const NAMES = { 'index.html': 'Rumpus', 'work.html': 'Work', 'studio.html': 'Studio', 'news.html': 'News', 'archive.html': 'Archive', 'project.html': 'Case study' };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.button) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#')) {
      const t = href === '#top' ? 0 : $(href); if (t === null) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(t, { duration: 1.6 }) : (t === 0 ? scrollTo(0, 0) : t.scrollIntoView({ behavior: 'smooth' }));
      return;
    }
    if (a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || /^(mailto|tel|https?):/.test(href)) return;
    e.preventDefault();
    if (curtainDir === 1) return;   // already on its way
    const file = href.split(/[?#]/)[0] || 'index.html';
    const name = a.dataset.curtain || NAMES[file] || a.textContent.trim();
    store.set('rumpus-curtain', name);
    if (still) { location.href = href; return; }
    curtainName.textContent = name; curtain.classList.add('on'); curtain.style.setProperty('--c', 0);
    curtainDir = 1; curtainAt = performance.now();
    if (lenis) lenis.stop();
    setTimeout(() => { location.href = href; }, CLOSE * 1000 + 40);
  });
  // arriving through the curtain: the head script already painted the page ink (html.arriving), so there is no flash; take over from it
  const arrived = store.get('rumpus-curtain');
  if (arrived) {
    store.set('rumpus-curtain', '');
    if (!still) { curtainName.textContent = arrived; curtain.classList.add('on'); curtain.style.setProperty('--c', 1); curtainDir = -1; curtainAt = performance.now(); }
  }
  document.documentElement.classList.remove('arriving');
  // coming back with the browser's back button restores this page as it was left: lift the curtain
  addEventListener('pageshow', e => { if (e.persisted && curtainDir === 1) { curtainDir = -1; curtainAt = performance.now() - HOLD * 1000; if (lenis) lenis.start(); } });
  function updateCurtain() {
    if (!curtainDir) return;
    const t = (performance.now() - curtainAt) / 1000;   // wall clock, so a slow tab never holds the curtain
    const ease = k => 1 - Math.pow(1 - k, 3);
    if (curtainDir === 1) curtain.style.setProperty('--c', ease(clamp(t / CLOSE)).toFixed(4));
    else {
      const k = ease(clamp((t - HOLD) / OPEN));
      curtain.style.setProperty('--c', (1 - k).toFixed(4));
      if (k >= 1) { curtainDir = 0; curtain.classList.remove('on'); }
    }
    // the Runner crosses once over the whole trip: the first half on the old page, the second on the new one
    drawStrip($('#curtainRunner'), curtainDir === 1 ? t : CLOSE + t, { light: true, dur: CLOSE + HOLD + OPEN * .8 });
  }

  /* ---------- the Runner: in the tile (runs harder the faster you scroll), in the pill, across the curtain, loose on R ---------- */
  const dpr = () => Math.min(devicePixelRatio || 1, 2);
  function fit(cv) {
    const r = cv.getBoundingClientRect(), d = dpr(), w = Math.round(r.width * d), h = Math.round(r.height * d);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    return cv.getContext('2d');
  }
  const tile = $('#tileRunner'), pillCv = $('#pillRunner'), pill = $('#pill');
  // the line's two widths, measured once the face has loaded, so the pill can ease between them
  const sizePill = () => { const l = $('.pill__line', pill); l.style.setProperty('--plw-t', $('.pl__text', l).scrollWidth + 28 + 'px'); l.style.setProperty('--plw-l', $('.pl__logo', l).scrollWidth + 28 + 'px'); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(sizePill);
  let runPhase = 0, lastY = scrollY, speed = 0;
  function drawRunners(dt) {
    const v = Math.abs(scrollY - lastY) / Math.max(dt, .001); lastY = scrollY;
    speed = lerp(speed, Math.min(v / 260, 3), .08);
    runPhase += dt * (5 + speed * 7);
    let c = fit(tile);
    c.clearRect(0, 0, tile.width, tile.height);
    Runner.draw(c, { x: tile.width * .5, y: tile.height * .86, size: tile.height * .66, phase: runPhase, fill: '#111' });
    // the pill's line becomes the running logo once you are past the top of the page
    const logo = scrollY > (PAGE === 'home' ? innerHeight * .35 : 120);
    if (logo !== pill.classList.contains('logo')) pill.classList.toggle('logo', logo);
    if (logo) { c = fit(pillCv); c.clearRect(0, 0, pillCv.width, pillCv.height); Runner.draw(c, { x: pillCv.width * .5, y: pillCv.height * .9, size: pillCv.height * .78, phase: runPhase, fill: '#111' }); }
  }
  // a runner crossing a strip: used by the curtain and R
  function drawStrip(cv, t, o = {}) {
    if (!cv) return;
    const c = fit(cv), W = cv.width, H = cv.height, size = H * .8;
    c.clearRect(0, 0, W, H);
    const x = lerp(-size * .6, W + size * .6, clamp(t / (o.dur || .95)));
    Runner.draw(c, { x, y: H * .94, size, phase: t * 16, fill: o.light ? '#fff' : '#111', ink: o.light ? '#fff' : '#111', extras: true });
  }
  const sprint = $('#sprint');
  let sprintT = -1;
  addEventListener('keydown', e => {
    if (e.key.toLowerCase() !== 'r' || e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName) || sprintT >= 0) return;
    sprintT = 0; sprint.classList.add('on');
  });
  function drawSprint(dt) {
    if (sprintT < 0) return;
    sprintT += dt;
    drawStrip(sprint, sprintT, { dur: 1.5 });
    if (sprintT > 1.6) { sprintT = -1; sprint.classList.remove('on'); }
  }

  /* ---------- sheets pulled today: the presses run 10:00–19:00 Porto time, about one sheet every 2.6 s ---------- */
  const sheetsEl = $('#sheets');
  function pulled() {
    const t = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Lisbon' })), open = new Date(t); open.setHours(10, 0, 0, 0);
    const day = t.getDay(); if (day === 0 || day === 1) return 0;   // closed Sunday and Monday
    return Math.max(0, Math.floor(Math.min(t - open, 9 * 3600e3) / 2600));
  }
  let sheetsShown = -1;
  function tickSheets() {
    const n = pulled(); if (n === sheetsShown) return;
    sheetsShown = n; sheetsEl.textContent = n.toLocaleString('en-GB');
    sheetsEl.classList.remove('bump'); void sheetsEl.offsetWidth; sheetsEl.classList.add('bump');
  }
  tickSheets(); setInterval(tickSheets, 1300);

  /* ---------- clock + reveals ---------- */
  const clock = $('#clock');
  const tick = () => { if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit' }); };
  tick(); setInterval(tick, 15000);
  const pending = new Set();
  const reveal = (root = document) => $$('.reveal:not(.in)', root).forEach(el => pending.add(el));
  function checkReveal() {
    if (!pending.size) return;
    const line = innerHeight * .92;
    pending.forEach(el => { if (el.getBoundingClientRect().top < line) { el.classList.add('in'); pending.delete(el); } });
  }

  /* ---------- the footer word: the hero's line runs sideways behind it, the covers drifting left to right on a zigzag;
     the word sits on top in ink, so the pictures show through its gaps and counters ---------- */
  const cwBox = $('.contact__word'), cwCards = cwBox ? $$('.cw__c', cwBox) : [];
  let cwT = 0;
  function updateFootWord(dt) {
    if (!cwCards.length) return;
    const b = cwBox.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) return;
    cwT += dt * (still ? 0 : 1);
    const W = b.width, H = b.height, n = cwCards.length, cw = cwCards[0].offsetWidth, ch = cwCards[0].offsetHeight;
    cwCards.forEach((c, i) => {
      const u = ((i / n + cwT * .022) % 1 + 1) % 1;
      c.style.transform = `translate3d(${lerp(-cw, W, u).toFixed(1)}px,${(H / 2 - ch / 2 + Math.sin(u * Math.PI * 5 + .6) * H * .3).toFixed(1)}px,0)`;
    });
  }

  /* ---------- one loop ---------- */
  const jobs = [];
  let last = 0;
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000 || 0); last = now;
    if (lenis) lenis.raf(now);
    drawRunners(dt); updateCurtain(); drawSprint(dt); updateLoader(); checkReveal(); updateFootWord(dt);
    jobs.forEach(f => f(now, dt));
    requestAnimationFrame(frame);
  }

  /* ---------- loader (home, first visit of a session): the hero's own sheet. The cards are dealt onto the line one by one,
     from the floor up, as the page loads (home.js reads RUMPUS.loadP). Scrolling is held until the line is dealt, so a pill sits
     where the nav will be, fills as it loads and gives a little shake if you try to scroll early; then the nav takes its place. ---------- */
  let updateLoader = () => {}, loadP = 1;
  const waits = [];
  if (PAGE === 'home' && !store.get('rumpus-seen') && !arrived) {
    store.set('rumpus-seen', '1');
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="loader" id="loader" aria-hidden="true">
        <div class="loader__foot"><span>Dealing this year's work<br>onto the line</span><span>The page scrolls<br>once it's all in</span></div>
        <p class="loader__pill" id="loadPill" role="status"><i class="loader__bar"></i><span>Loading, one moment</span><b><span id="loadNum">0</span>%</b></p>
      </div>`);
    document.documentElement.classList.add('loading');
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; scrollTo(0, 0);
    const loader = $('#loader'), num = $('#loadNum'), lpill = $('#loadPill');
    const nudge = () => { lpill.classList.remove('nudge'); void lpill.offsetWidth; lpill.classList.add('nudge'); };
    const keys = e => { if ([' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'End', 'Home'].includes(e.key)) { e.preventDefault(); nudge(); } };
    addEventListener('wheel', nudge, { passive: true }); addEventListener('touchmove', nudge, { passive: true }); addEventListener('keydown', keys);
    let shown = 0, target = 12, done = -1, lastL = performance.now();
    loadP = 0;
    if (lenis) lenis.stop();
    updateLoader = () => {
      const now = performance.now(), dt = Math.min(.25, (now - lastL) / 1000); lastL = now;
      if (done < 0) {
        shown = Math.min(target, shown + dt * 40 * (1 - shown / 135));
        if (target >= 100 && shown > 99.4) { shown = 100; done = 0; }
      } else done += dt;
      num.textContent = Math.round(shown); loadP = shown / 100;
      lpill.style.setProperty('--p', loadP.toFixed(3));
      if (done > .45) {
        updateLoader = () => {};
        removeEventListener('wheel', nudge); removeEventListener('touchmove', nudge); removeEventListener('keydown', keys);
        loader.classList.add('out'); document.documentElement.classList.remove('loading'); if (lenis) lenis.start();
        setTimeout(() => loader.remove(), 900);
      }
    };
    setTimeout(() => {
      const list = waits.concat($$('#ribbon img').map(im => im.decode ? im.decode().catch(() => {}) : 0), document.fonts ? document.fonts.ready : 0);
      let n = 0; list.forEach(pr => Promise.resolve(pr).then(() => { n++; target = Math.max(target, 12 + 78 * n / list.length); }));
      Promise.all(list.concat(new Promise(r => setTimeout(r, 2400)))).then(() => { target = 100; });
      setTimeout(() => { target = 100; }, 7000);   // never hold anyone longer than this
    }, 0);
  }

  window.RUMPUS = {
    lenis, reveal, clamp, lerp, $, $$, fit, page: PAGE,
    get loadP() { return loadP; },
    frame: f => jobs.push(f),
    wait: pr => waits.push(pr)
  };
  requestAnimationFrame(() => { reveal(); requestAnimationFrame(frame); });
})();