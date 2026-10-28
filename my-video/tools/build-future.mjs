// Generates future.html (the "future-natural cow" film) from assets/transcript-future.json
import fs from "node:fs";

const proj = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const tr = JSON.parse(fs.readFileSync(`${proj}/assets/transcript-future.json`, "utf8"));
const words = tr.map((w) => ({ text: w.text.trim(), start: w.start, end: w.end }));
const ACC = "#5ff5ff";
const DUR = 12.4;

const groups = [];
let cur = [];
for (const w of words) {
  cur.push(w);
  if (/[.,]$/.test(w.text) || cur.length >= 4) {
    groups.push(cur);
    cur = [];
  }
}
if (cur.length) groups.push(cur);

const r = (n) => Math.round(n * 1000) / 1000;
let capHtml = "";
let capJs = "";
groups.forEach((g, gi) => {
  const start = Math.max(0.1, g[0].start);
  const next = groups[gi + 1] ? groups[gi + 1][0].start : null;
  let end = g[g.length - 1].end + 0.12;
  if (next !== null) end = Math.min(end, next);
  const spans = g.map((w, wi) => `<span class="w" id="c${gi}w${wi}">${w.text.replace(/[.,]$/, "")}</span>`).join(" ");
  capHtml += `      <div id="cap${gi}" class="clip cap" data-start="${r(start)}" data-duration="${r(end - start)}" data-track-index="5">${spans}</div>\n`;
  capJs += `      tl.fromTo("#cap${gi}", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, ${r(start)});\n`;
  g.forEach((w, wi) => {
    capJs += `      tl.fromTo("#c${gi}w${wi}", { color: "#ffffff" }, { color: "${ACC}", duration: 0.05 }, ${r(w.start)});\n`;
  });
  capJs += `      tl.to("#cap${gi}", { opacity: 0, duration: 0.1, ease: "power2.in" }, ${r(end - 0.1)});\n`;
});

const chips = [
  ["chip1", 3.2, 1.2, "COAT · bioluminescent"],
  ["chip2", 4.45, 1.0, "FUEL · solar grass"],
  ["chip3", 5.55, 1.3, "CH₄ · 0.00 ppm"],
  ["chip4", 6.95, 1.6, "evolution + code"],
];
const chipHtml = chips
  .map(([id, st, du, tx]) => `      <div id="${id}" class="clip chip" data-start="${st}" data-duration="${du}" data-track-index="3"><span>${tx}</span></div>`)
  .join("\n");
const chipJs = chips
  .map(([id, st, du]) => `      tl.fromTo("#${id}", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }, ${st});\n      tl.to("#${id}", { opacity: 0, duration: 0.12, ease: "power2.in" }, ${r(st + du - 0.14)});`)
  .join("\n");

const SCAN_ON = 2.6, SCAN_OFF = 8.6;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      :root { --ground: #050b18; --ink: #ffffff; --acc: ${ACC}; --font-display: "Outfit", sans-serif; --font-mono: "Space Mono", monospace; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: var(--ground); }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: var(--ground); }
      #stage { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      .title {
        position: absolute; left: 0; width: 1080px; top: 190px; text-align: center; color: var(--ink);
        font-family: var(--font-display); font-weight: 800; font-size: 108px; line-height: 1.0;
        letter-spacing: 0.02em; text-transform: uppercase; text-shadow: 0 0 40px rgba(95,245,255,0.35);
      }
      .title em { font-style: normal; color: var(--acc); }
      #hud { position: absolute; left: 0; width: 1080px; top: 1050px; text-align: center; font-family: var(--font-mono); font-size: 30px; color: var(--acc); opacity: 0.85; }
      .chip { position: absolute; left: 0; width: 1080px; top: 1112px; text-align: center; font-family: var(--font-mono); font-weight: 700; font-size: 42px; color: #03121a; }
      .chip span { display: inline-block; padding: 8px 26px; background: var(--acc); border-radius: 14px; box-shadow: 0 0 30px rgba(95,245,255,0.6); }
      .cap {
        position: absolute; left: 90px; width: 900px; top: 1200px; height: 130px; display: flex; align-items: center; justify-content: center; text-align: center;
        font-family: var(--font-display); font-weight: 800; font-size: 54px; line-height: 1.05; text-transform: uppercase; color: #fff;
        text-shadow: 0 4px 0 rgba(0,0,0,0.5), 0 0 18px rgba(0,0,0,0.5);
      }
      .w { display: inline-block; margin: 0 0.14em; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="future" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <svg id="stage" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050b18" /><stop offset="0.55" stop-color="#0d2a3a" /><stop offset="1" stop-color="#2f8a86" /></linearGradient>
          <linearGradient id="groundG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a2a2c" /><stop offset="0.25" stop-color="#05161b" /><stop offset="1" stop-color="#02080b" /></linearGradient>
          <radialGradient id="planetG" cx="0.35" cy="0.35" r="0.8"><stop offset="0" stop-color="#e8fffb" /><stop offset="1" stop-color="#3a9aa6" /></radialGradient>
          <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9703f" /><stop offset="0.55" stop-color="#8a4a28" /><stop offset="1" stop-color="#5a2f1b" /></linearGradient>
          <linearGradient id="beamG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ACC}" stop-opacity="0" /><stop offset="0.9" stop-color="${ACC}" stop-opacity="0.35" /><stop offset="1" stop-color="${ACC}" stop-opacity="0.9" /></linearGradient>
          <clipPath id="bodyclip"><ellipse cx="520" cy="750" rx="240" ry="118" /></clipPath>
        </defs>
        <rect x="0" y="0" width="1080" height="1000" fill="url(#skyG)" />
        <g id="stars"></g>
        <circle cx="860" cy="470" r="64" fill="url(#planetG)" opacity="0.9" />
        <ellipse cx="860" cy="470" rx="112" ry="20" fill="none" stroke="${ACC}" stroke-width="3" opacity="0.45" transform="rotate(-18 860 470)" />
        <g id="skyFar" opacity="0.85"></g>
        <g id="skyNear"></g>
        <rect x="0" y="1000" width="1080" height="920" fill="url(#groundG)" />
        <rect x="0" y="996" width="1080" height="8" fill="${ACC}" opacity="0.7" />
        <rect x="0" y="980" width="1080" height="40" fill="${ACC}" opacity="0.10" />
        <g id="grassBack"></g>
        <g id="rig" transform="translate(540 1000) scale(1.3) translate(-607 -1000)">
          <ellipse cx="560" cy="1006" rx="330" ry="16" fill="#000" opacity="0.4" />
          <ellipse cx="560" cy="1004" rx="300" ry="8" fill="${ACC}" opacity="0.12" />
          <g id="cow">
            <g id="legs-far"></g>
            <g id="legs-near"></g>
            <path id="tail-o" fill="none" stroke="#2a140a" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />
            <path id="tail" fill="none" stroke="#7a4326" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
            <ellipse id="tuft" rx="15" ry="24" fill="#2a140a" />
            <circle id="tuftglow" r="7" fill="${ACC}" opacity="0.9" />
            <g id="headg">
              <line x1="0" y1="0" x2="120" y2="50" stroke="#2a140a" stroke-width="106" stroke-linecap="round" />
              <line x1="0" y1="0" x2="120" y2="50" stroke="#8f4f2c" stroke-width="94" stroke-linecap="round" />
              <ellipse cx="148" cy="64" rx="64" ry="50" transform="rotate(18 148 64)" fill="#f1e4cf" stroke="#2a140a" stroke-width="5" />
              <ellipse cx="200" cy="86" rx="40" ry="33" transform="rotate(18 200 86)" fill="#d9a79b" stroke="#2a140a" stroke-width="5" />
              <circle cx="206" cy="80" r="5" fill="#2a140a" /><circle cx="214" cy="96" r="5" fill="#2a140a" />
              <circle cx="140" cy="48" r="8" fill="#1a0f08" /><circle cx="142" cy="45" r="3" fill="${ACC}" />
              <g id="ear">
                <ellipse cx="96" cy="46" rx="38" ry="15" fill="#6a3820" stroke="#2a140a" stroke-width="5" /><ellipse cx="96" cy="46" rx="26" ry="8" fill="#c58a7a" />
                <rect x="76" y="62" width="18" height="24" rx="3" fill="rgba(95,245,255,0.28)" stroke="${ACC}" stroke-width="3" />
              </g>
            </g>
            <g id="bodyg">
              <ellipse cx="400" cy="873" rx="34" ry="22" fill="#d9a79b" stroke="#2a140a" stroke-width="5" />
              <ellipse cx="520" cy="750" rx="240" ry="118" fill="url(#bodyG)" />
              <g clip-path="url(#bodyclip)">
                <ellipse cx="520" cy="870" rx="250" ry="62" fill="#efe1cb" />
                <ellipse cx="420" cy="700" rx="64" ry="40" transform="rotate(-18 420 700)" fill="#4a2616" opacity="0.85" />
                <ellipse cx="620" cy="775" rx="66" ry="42" transform="rotate(12 620 775)" fill="#4a2616" opacity="0.8" />
                <ellipse cx="330" cy="790" rx="34" ry="46" fill="#4a2616" opacity="0.8" />
                <ellipse cx="470" cy="680" rx="170" ry="34" transform="rotate(-6 470 680)" fill="#fff" opacity="0.13" />
                <g id="veins" fill="none" stroke-linecap="round">
                  <path d="M300 790 C380 740 430 760 500 720 S620 690 700 700" stroke="${ACC}" stroke-width="10" opacity="0.14" />
                  <path d="M330 820 C400 800 450 830 520 800 S640 790 710 770" stroke="${ACC}" stroke-width="10" opacity="0.14" />
                  <path d="M420 720 C440 680 480 660 540 650 S640 640 690 660" stroke="${ACC}" stroke-width="10" opacity="0.14" />
                  <path d="M500 720 C510 770 520 800 540 840" stroke="${ACC}" stroke-width="10" opacity="0.14" />
                  <path class="vein" d="M300 790 C380 740 430 760 500 720 S620 690 700 700" stroke="${ACC}" stroke-width="3.5" stroke-dasharray="46 84" />
                  <path class="vein" d="M330 820 C400 800 450 830 520 800 S640 790 710 770" stroke="${ACC}" stroke-width="3.5" stroke-dasharray="46 84" />
                  <path class="vein" d="M420 720 C440 680 480 660 540 650 S640 640 690 660" stroke="${ACC}" stroke-width="3.5" stroke-dasharray="46 84" />
                  <path class="vein" d="M500 720 C510 770 520 800 540 840" stroke="${ACC}" stroke-width="3.5" stroke-dasharray="46 84" />
                </g>
              </g>
              <ellipse cx="520" cy="749" rx="240" ry="118" fill="none" stroke="${ACC}" stroke-width="3" opacity="0.4" />
              <ellipse cx="520" cy="750" rx="240" ry="118" fill="none" stroke="#2a140a" stroke-width="5" />
            </g>
          </g>
          <g id="skel" opacity="0"></g>
        </g>
        <g id="grassFront"></g>
        <g id="pollen"></g>
        <rect id="beam" x="0" y="470" width="150" height="560" fill="url(#beamG)" opacity="0" />
      </svg>

      <div id="title1" class="clip title" data-start="0" data-duration="8.6" data-track-index="1">FUTURE-GRADE<br /><em>NATURAL COW</em></div>
      <div id="title2" class="clip title" data-start="8.6" data-duration="3.8" data-track-index="1">NATURE.<br /><em>UPGRADED.</em></div>
      <div id="hud" class="clip" data-start="0" data-duration="${DUR}" data-track-index="2">t = 0.00 s · emissions: 0</div>
${chipHtml}
${capHtml}
      <audio id="voice" src="assets/future-voice.wav" data-start="0" data-duration="10.11" data-track-index="8" data-volume="1"></audio>
      <audio id="pad" src="assets/future-pad.wav" data-start="0" data-duration="${DUR}" data-track-index="9" data-volume="0.45"></audio>
      <audio id="moo" src="assets/moo.wav" data-start="10.35" data-duration="1.5" data-track-index="10" data-volume="0.7"></audio>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const NS = "http://www.w3.org/2000/svg";
      const DUR = ${DUR};
      const SCAN_ON = ${SCAN_ON}, SCAN_OFF = ${SCAN_OFF};
      function rng(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
      const mk = (parent, tag, attrs) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); parent.appendChild(el); return el; };
      const $ = (id) => document.getElementById(id);

      // ---- gait + rig ----
      const STRIDE = 1.1, W = (2 * Math.PI) / STRIDE, S = 70, LIFT = 40, GY = 1000, HIPY = 832, L1 = 95, L2 = 100, K = 1.3;
      const LEGS = [
        { x: 335, ph: 0.0, bend: 1, far: true },
        { x: 685, ph: 0.25, bend: -1, far: true },
        { x: 365, ph: 0.5, bend: 1, far: false },
        { x: 715, ph: 0.75, bend: -1, far: false },
      ];
      const bob = (t) => -7 * Math.cos(2 * W * t);
      const bobAcc = (t) => 7 * 4 * W * W * Math.cos(2 * W * t);

      // ---- deterministic physics at 240 Hz ----
      const DT = 1 / 240, STEPS = Math.ceil(DUR / DT) + 2, NT = 6, SEG = 30;
      const headA = new Float32Array(STEPS), earA = new Float32Array(STEPS), tail = new Float32Array(STEPS * NT * 2);
      (function simulate() {
        let ha = 0, hv = 0, ea = 0, ev = 0;
        const px = [], py = [], qx = [], qy = [];
        for (let i = 0; i < NT; i++) { px.push(285 - i * 4); py.push(730 + i * SEG); qx.push(px[i]); qy.push(py[i]); }
        const kicks = [1.5, 4.6, 7.4, 9.9];
        let ki = 0;
        for (let s = 0; s < STEPS; s++) {
          const t = s * DT, ay = bobAcc(t);
          const acc = -180 * (ha - 3 * Math.sin(W * t)) - 9 * hv - 0.5 * ay;
          hv += acc * DT; ha += hv * DT;
          while (ki < kicks.length && t >= kicks[ki]) { ev += 900; ki++; }
          ev += (-300 * ea - 8 * ev - 1.5 * ay) * DT; ea += ev * DT;
          headA[s] = ha; earA[s] = ea;
          const flick = t > 6.9 && t < 7.05 ? 9000 : 0;
          for (let i = 1; i < NT; i++) {
            const vx = (px[i] - qx[i]) * 0.992, vy = (py[i] - qy[i]) * 0.992;
            qx[i] = px[i]; qy[i] = py[i];
            px[i] += vx + (260 * Math.sin(2 * Math.PI * 0.7 * t + i) + (i > 2 ? flick : 0) - 90 * (px[i] - (285 - i * 4))) * DT * DT;
            py[i] += vy + 1400 * DT * DT;
          }
          px[0] = 285; py[0] = 730 + bob(t); qx[0] = px[0]; qy[0] = py[0];
          for (let it = 0; it < 6; it++) {
            for (let i = 0; i < NT - 1; i++) {
              const dx = px[i + 1] - px[i], dy = py[i + 1] - py[i], d = Math.hypot(dx, dy) || 1e-6, diff = (d - SEG) / d;
              if (i === 0) { px[1] -= dx * diff; py[1] -= dy * diff; }
              else { px[i] += dx * diff * 0.5; py[i] += dy * diff * 0.5; px[i + 1] -= dx * diff * 0.5; py[i + 1] -= dy * diff * 0.5; }
            }
            px[0] = 285; py[0] = 730 + bob(t);
          }
          for (let i = 0; i < NT; i++) { tail[(s * NT + i) * 2] = px[i]; tail[(s * NT + i) * 2 + 1] = py[i]; }
        }
      })();
      function samp(arr, stride, t, k) {
        const f = Math.min(Math.max(t / DT, 0), STEPS - 2), i = Math.floor(f), a = f - i;
        return arr[i * stride + k] * (1 - a) + arr[(i + 1) * stride + k] * a;
      }
      function foot(theta) {
        const th = ((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        if (th < Math.PI) return { x: S - (2 * S * th) / Math.PI, y: 0 };
        const s = (th - Math.PI) / Math.PI;
        return { x: -S + 2 * S * (0.5 - 0.5 * Math.cos(Math.PI * s)), y: -LIFT * Math.sin(Math.PI * s) };
      }
      function ik(hx, hy, fx, fy, bend) {
        const dx = fx - hx, dy = fy - hy, len = Math.hypot(dx, dy);
        const d = Math.min(Math.max(len, 20), L1 + L2 - 0.5), ux = dx / len, uy = dy / len;
        const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), h = Math.sqrt(Math.max(L1 * L1 - a * a, 0));
        return { kx: hx + ux * a - uy * h * bend, ky: hy + uy * a + ux * h * bend, fx: hx + ux * d, fy: hy + uy * d };
      }

      // ---- build rig DOM ----
      const legEls = LEGS.map((lg) => {
        const g = $(lg.far ? "legs-far" : "legs-near");
        const up = lg.far ? "#5a321e" : "#7a4326", lo = lg.far ? "#bfb19b" : "#efe1cb";
        return {
          o: mk(g, "path", { fill: "none", stroke: "#2a140a", "stroke-width": 50, "stroke-linecap": "round", "stroke-linejoin": "round" }),
          u: mk(g, "path", { fill: "none", stroke: up, "stroke-width": 38, "stroke-linecap": "round" }),
          l: mk(g, "path", { fill: "none", stroke: lo, "stroke-width": 36, "stroke-linecap": "round" }),
          glow: mk(g, "ellipse", { rx: 26, ry: 8, fill: "none", stroke: "${ACC}", "stroke-width": 3, opacity: 0.7 }),
          h: mk(g, "ellipse", { rx: 22, ry: 15, fill: "#1a0f08" }),
        };
      });
      const skel = $("skel"), skelLines = [], skelDots = [];
      for (let i = 0; i < 9; i++) skelLines.push(mk(skel, "polyline", { fill: "none", stroke: "${ACC}", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }));
      for (let i = 0; i < 22; i++) skelDots.push(mk(skel, "circle", { r: 10, fill: "#03121a", stroke: "${ACC}", "stroke-width": 4 }));
      const veins = Array.from(document.querySelectorAll(".vein"));

      // ---- world: stars, skyline, grass, pollen (seeded) ----
      const R = rng(7);
      const stars = [];
      for (let i = 0; i < 46; i++) stars.push(mk($("stars"), "circle", { cx: R() * 1080, cy: R() * 620, r: 1.2 + R() * 1.8, fill: "#dffcff", opacity: 0.6, "data-p": R() * 6.28 }));
      function skyline(id, seed, hMin, hMax, color, winCol) {
        const g = $(id), rr = rng(seed), parts = [];
        for (let k = 0; k < 2; k++) {
          const tile = mk(g, "g", {});
          let x = 0; const rr2 = rng(seed);
          while (x < 1080) {
            const w = 50 + rr2() * 60, h = hMin + rr2() * (hMax - hMin), top = 1000 - h;
            mk(tile, "path", { d: "M" + x + " 1000 V" + (top + 40) + " Q" + x + " " + top + " " + (x + w / 2) + " " + (top - 26) + " Q" + (x + w) + " " + top + " " + (x + w) + " " + (top + 40) + " V1000 Z", fill: color });
            for (let j = 0; j < 3; j++) if (rr2() > 0.45) mk(tile, "rect", { x: x + 10 + rr2() * (w - 24), y: top + 50 + rr2() * (h - 90), width: 4, height: 7, fill: winCol, opacity: 0.8 });
            x += w + 6 + rr2() * 20;
          }
          parts.push(tile);
        }
        return parts;
      }
      const farTiles = skyline("skyFar", 11, 90, 230, "#0f3a4a", "#9ffcff");
      const nearTiles = skyline("skyNear", 23, 50, 150, "#0a2634", "#5ff5ff");
      const GB = [], GF = [];
      for (let i = 0; i < 56; i++) GB.push({ el: mk($("grassBack"), "path", { fill: "none", stroke: i % 3 ? "#1fb8a2" : "#7fffe6", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.75 }), h: 22 + R() * 26, ph: R() * 6.28 });
      for (let i = 0; i < 30; i++) GF.push({ el: mk($("grassFront"), "path", { fill: "none", stroke: i % 3 ? "#26d9bd" : "#b9fff0", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.95 }), h: 30 + R() * 40, ph: R() * 6.28 });
      const pol = [];
      for (let i = 0; i < 36; i++) pol.push({ el: mk($("pollen"), "circle", { r: 2 + R() * 3, fill: "${ACC}" }), x: R() * 1080, y: 300 + R() * 900, vx: 12 + R() * 22, ph: R() * 6.28, amp: 12 + R() * 22 });
      function wrap(v, m) { return ((v % m) + m) % m; }
      function blade(o, x, yb, h, sway) {
        o.el.setAttribute("d", "M" + x + " " + yb + " Q" + (x + sway * 0.4) + " " + (yb - h * 0.6) + " " + (x + sway) + " " + (yb - h));
      }

      const hud = $("hud"), beam = $("beam");
      function renderAt(t) {
        const b = bob(t);
        const dots = [];
        LEGS.forEach((lg, i) => {
          const f = foot(W * t + lg.ph * 2 * Math.PI);
          const rr = ik(lg.x, HIPY + b, lg.x + f.x, GY + f.y, lg.bend);
          legEls[i].o.setAttribute("d", "M" + lg.x + " " + (HIPY + b) + " L" + rr.kx + " " + rr.ky + " L" + rr.fx + " " + rr.fy);
          legEls[i].u.setAttribute("d", "M" + lg.x + " " + (HIPY + b) + " L" + rr.kx + " " + rr.ky);
          legEls[i].l.setAttribute("d", "M" + rr.kx + " " + rr.ky + " L" + rr.fx + " " + rr.fy);
          legEls[i].h.setAttribute("cx", rr.fx + 4); legEls[i].h.setAttribute("cy", rr.fy + 8);
          legEls[i].glow.setAttribute("cx", rr.fx + 4); legEls[i].glow.setAttribute("cy", rr.fy + 20);
          skelLines[i].setAttribute("points", lg.x + "," + (HIPY + b) + " " + rr.kx + "," + rr.ky + " " + rr.fx + "," + rr.fy);
          dots.push([lg.x, HIPY + b], [rr.kx, rr.ky], [rr.fx, rr.fy]);
        });
        $("bodyg").setAttribute("transform", "translate(0 " + b + ")");
        const ha = samp(headA, 1, t, 0), ea = samp(earA, 1, t, 0);
        $("headg").setAttribute("transform", "translate(690 " + (712 + b) + ") rotate(" + ha + ")");
        $("ear").setAttribute("transform", "rotate(" + ea + " 112 46)");
        let tp = "", tpts = [];
        for (let i = 0; i < NT; i++) {
          const x = samp(tail, NT * 2, t, i * 2), y = samp(tail, NT * 2, t, i * 2 + 1);
          tp += (i ? " L" : "M") + x + " " + y; tpts.push(x + "," + y);
          if (i > 0) dots.push([x, y]);
        }
        $("tail").setAttribute("d", tp); $("tail-o").setAttribute("d", tp);
        const last = tpts[NT - 1].split(",");
        $("tuft").setAttribute("cx", last[0]); $("tuft").setAttribute("cy", +last[1] + 14);
        $("tuftglow").setAttribute("cx", last[0]); $("tuftglow").setAttribute("cy", +last[1] + 30);
        const hr = (ha * Math.PI) / 180, c = Math.cos(hr), s2 = Math.sin(hr), nx = 690, ny = 712 + b;
        const head = [nx + c * 148 - s2 * 64, ny + s2 * 148 + c * 64];
        skelLines[4].setAttribute("points", "285," + (730 + b) + " 520," + (750 + b) + " " + nx + "," + ny + " " + head[0] + "," + head[1]);
        skelLines[5].setAttribute("points", tpts.join(" "));
        dots.push([285, 730 + b], [520, 750 + b], [nx, ny], head);
        skelDots.forEach((el, i) => { const p = dots[i]; if (p) { el.setAttribute("cx", p[0]); el.setAttribute("cy", p[1]); el.setAttribute("opacity", 1); } else el.setAttribute("opacity", 0); });
        for (let i = 6; i < 9; i++) skelLines[i].setAttribute("points", "");

        // living veins: pulses travel along the coat
        veins.forEach((v, i) => { v.setAttribute("stroke-dashoffset", -(t * 150 + i * 31)); v.setAttribute("opacity", 0.65 + 0.35 * Math.sin(t * 3 + i)); });

        // world motion (ground speed = planted-foot speed)
        const v = (4 * S * K) / STRIDE;
        farTiles.forEach((g, k) => g.setAttribute("transform", "translate(" + (k * 1080 - wrap(v * 0.06 * t, 1080)) + " 0)"));
        nearTiles.forEach((g, k) => g.setAttribute("transform", "translate(" + (k * 1080 - wrap(v * 0.16 * t, 1080)) + " 0)"));
        GB.forEach((o, i) => blade(o, wrap(i * 20 - v * 0.55 * t, 1120) - 20, 1000, o.h, 7 * Math.sin(t * 1.7 + o.ph)));
        GF.forEach((o, i) => blade(o, wrap(i * 38 - v * 1.25 * t, 1140) - 30, 1052, o.h, 10 * Math.sin(t * 1.5 + o.ph)));
        pol.forEach((o) => { o.el.setAttribute("cx", wrap(o.x + o.vx * t, 1120) - 20); o.el.setAttribute("cy", o.y + o.amp * Math.sin(t * 0.9 + o.ph)); o.el.setAttribute("opacity", 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.3 + o.ph))); });
        stars.forEach((el) => el.setAttribute("opacity", 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(t * 1.4 + +el.getAttribute("data-p")))));

        // scanning beam sweeps the cow during the scan phase
        const u = (t - SCAN_ON) / (SCAN_OFF - SCAN_ON);
        if (u > 0 && u < 1) {
          const bx = 540 + 400 * Math.sin(u * 2 * Math.PI * 1.5 + 0.2);
          const dir = Math.cos(u * 2 * Math.PI * 1.5 + 0.2) >= 0 ? 1 : -1;
          beam.setAttribute("x", dir > 0 ? bx - 150 : bx);
          beam.setAttribute("transform", dir > 0 ? "" : "translate(" + (2 * bx + 150) + " 0) scale(-1 1)");
          beam.setAttribute("opacity", Math.min(1, Math.min(u, 1 - u) * 10));
        } else beam.setAttribute("opacity", 0);

        hud.textContent = "t = " + t.toFixed(2).padStart(5, "0") + " s · emissions: 0";
      }
      window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
      renderAt(0);

      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#cow", { opacity: 1 }, { opacity: 0.55, duration: 0.4, ease: "power2.inOut" }, ${SCAN_ON});
      tl.fromTo("#cow", { opacity: 0.55 }, { opacity: 1, duration: 0.4, ease: "power2.inOut", immediateRender: false }, ${SCAN_OFF});
      tl.fromTo("#skel", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.inOut" }, ${SCAN_ON});
      tl.fromTo("#skel", { opacity: 1 }, { opacity: 0, duration: 0.4, ease: "power2.inOut", immediateRender: false }, ${SCAN_OFF});
      tl.fromTo("#title1", { scale: 1 }, { scale: 1.03, duration: 8.5, ease: "none" }, 0);
      tl.fromTo("#title2", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 8.6);
${chipJs}
${capJs}
      window.__timelines["future"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;
fs.writeFileSync(`${proj}/future.html`, html);
console.log("groups:", groups.map((g) => g.map((w) => w.text).join(" ")).join(" | "));
