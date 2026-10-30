/* The Runner — the studio mascot as a bold cut-paper pictogram, drawn live on a 2D canvas.
   Tapered limbs, mitten hands, big feet, a dot head with two trailing dots (the mascot's three dots).
   Units: figure ≈ 1 tall, origin at the ground under the hips, +x = running direction. */
(function () {
  const TAU = Math.PI * 2;
  const rot = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

  // one tapered limb segment: two circles joined by a quad (cheap, reads as cut paper)
  function seg(ctx, ax, ay, ar, bx, by, br) {
    ctx.beginPath();
    const dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
    ctx.moveTo(ax + nx * ar, ay + ny * ar);
    ctx.lineTo(bx + nx * br, by + ny * br);
    ctx.lineTo(bx - nx * br, by - ny * br);
    ctx.lineTo(ax - nx * ar, ay - ny * ar);
    ctx.closePath();
    ctx.fill();
    dot(ctx, ax, ay, ar); dot(ctx, bx, by, br);
  }
  function dot(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }

  // pose at phase p (radians); returns joints in figure units
  function pose(p) {
    const bob = -Math.abs(Math.cos(p)) * .035;
    const lean = .34 + Math.sin(p * 2) * .025;
    const hip = [0, -.47 + bob];
    const [nx, ny] = rot(0, -.3, lean); const neck = [hip[0] + nx, hip[1] + ny];
    const [hx, hy] = rot(.04, -.18, lean); const head = [neck[0] + hx, neck[1] + hy];
    const leg = q => {
      const a = .85 * Math.sin(q), k = .2 + 1.35 * Math.pow(Math.max(0, Math.cos(q)), 1.5);
      const knee = [hip[0] + Math.sin(a) * .24, hip[1] + Math.cos(a) * .24];
      const ankle = [knee[0] + Math.sin(a - k) * .24, knee[1] + Math.cos(a - k) * .24];
      const toe = [ankle[0] + Math.cos(a - k) * .12, ankle[1] - Math.sin(a - k) * .12 + .01];
      return { knee, ankle, toe };
    };
    const arm = q => {
      // big pumping swing: forward arm punches up, back arm flings out behind
      const b = -1.25 * Math.sin(q) - .15, sh = [neck[0] + .01, neck[1] + .05];
      const elbow = [sh[0] + Math.sin(b) * .23, sh[1] + Math.cos(b) * .23];
      const f = b + (Math.sin(q) < 0 ? 1.5 : .7);
      const hand = [elbow[0] + Math.sin(f) * .2, elbow[1] + Math.cos(f) * .2];
      return { sh, elbow, hand };
    };
    return { hip, neck, head, legs: [leg(p), leg(p + Math.PI)], arms: [arm(p), arm(p + Math.PI)], bob };
  }

  function bodyPath(ctx, P, trail) {
    const { hip, neck, head } = P;
    // torso: pear-shaped, chest wider than hips
    const mid = [(hip[0] + neck[0]) / 2, (hip[1] + neck[1]) / 2];
    seg(ctx, hip[0], hip[1], .11, mid[0], mid[1], .14);
    seg(ctx, mid[0], mid[1], .14, neck[0], neck[1], .12);
    for (const L of P.legs) {
      seg(ctx, hip[0], hip[1], .1, L.knee[0], L.knee[1], .07);
      seg(ctx, L.knee[0], L.knee[1], .07, L.ankle[0], L.ankle[1], .05);
      seg(ctx, L.ankle[0], L.ankle[1], .055, L.toe[0], L.toe[1], .065);         // big feet
    }
    for (const A of P.arms) {
      seg(ctx, A.sh[0], A.sh[1], .075, A.elbow[0], A.elbow[1], .055);
      seg(ctx, A.elbow[0], A.elbow[1], .055, A.hand[0], A.hand[1], .055);
      dot(ctx, A.hand[0], A.hand[1], .085);                                       // mitten hands
    }
    dot(ctx, head[0], head[1], .09);
    if (trail) for (const [dx, dy, r] of trail) dot(ctx, head[0] + dx, head[1] + dy, r);
  }

  /* draw(ctx, { x, y (ground point, px), size (px), phase, fill, extras, ink })
     the figure reaches ~1.1 × size above the ground point (head + bob), so keep size ≤ 0.85 × canvas height */
  function draw(ctx, o) {
    const P = pose(o.phase);
    const trail = [[-.27, .06 + Math.sin(o.phase - .7) * .015, .052], [-.45, .1 + Math.sin(o.phase - 1.4) * .015, .036]];
    ctx.save();
    ctx.translate(o.x, o.y); ctx.scale(o.size, o.size);
    ctx.fillStyle = o.fill || '#17130f';
    bodyPath(ctx, P, trail);
    ctx.restore();
    if (o.extras) {
      // shadow + speed lines sit behind the figure, in ink
      ctx.save(); ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = o.ink || '#17130f';
      const sw = o.size * (.26 - P.bob * 2.2);
      ctx.globalAlpha = .22; ctx.beginPath(); ctx.ellipse(o.x + o.size * .03, o.y + o.size * .055, sw, o.size * .022, 0, 0, TAU); ctx.fill();
      ctx.globalAlpha = 1; ctx.lineCap = 'round'; ctx.strokeStyle = o.ink || '#17130f';
      [[-.42, .5, .2], [-.6, .3, .14], [-.5, .14, .24]].forEach(([lx, ly, len], i) => {
        const t = (o.phase / TAU * .9 + i * .37) % 1, x0 = o.x + o.size * (lx - t * .35), y0 = o.y - o.size * ly;
        ctx.globalAlpha = Math.sin(t * Math.PI) * .9; ctx.lineWidth = o.size * .018;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 - o.size * len * (1 - t * .4), y0); ctx.stroke();
      });
      ctx.restore();
    }
  }

  window.Runner = { draw };
})();
