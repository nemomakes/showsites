/* Very subtle shoreline for the intro strip: swash runs up, backwash slides back.
   Pure CSS (transform/opacity) on static SVG paths; static under reduced motion. Decorative only. */
const edge = (y: number, a: number, seed: number) => {
  let d = `M0 ${y}`;
  for (let i = 0; i < 8; i++) {
    const x = (i + 1) * 360, w = a * (0.6 + ((i * 7 + seed) % 5) / 6);
    d += ` C${x - 270} ${y - w} ${x - 90} ${y + w} ${x} ${y}`;
  }
  return d;
};
// y of the foam edge at x (segments are cubic with evenly spaced control x, so x is linear in t)
const edgeY = (x: number, y: number, a: number, seed: number) => {
  const i = Math.min(7, Math.floor(x / 360)), t = (x - i * 360) / 360, w = a * (0.6 + ((i * 7 + seed) % 5) / 6), u = 1 - t;
  return y * u * u * u + 3 * u * u * t * (y - w) + 3 * u * t * t * (y + w) + t * t * t * y;
};
// visible slice of each 224%-wide layer (left offsets -12% / -40% / -70%)
const WAVES = [
  { y: 46, a: 14, seed: 1, from: 0.05, to: 0.5, n: 11 },
  { y: 58, a: 10, seed: 3, from: 0.18, to: 0.63, n: 9 },
  { y: 70, a: 12, seed: 4, from: 0.31, to: 0.76, n: 10 },
];
function rnd(seed: number) { let v = seed * 9973; return () => { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
// sparse, irregular bubbles riding just behind each foam edge
const BUBBLES = WAVES.map((w, li) => {
  const r = rnd(li * 31 + 7), out: { l: number; t: number; s: number; o: number; d: number; m: boolean }[] = [];
  for (let k = 0; k < w.n; k++) {
    const f = w.from + (w.to - w.from) * ((k + 0.15 + r() * 0.7) / w.n), x = f * 2880;
    out.push({ l: f * 100, t: ((edgeY(x, w.y, w.a, w.seed) + 2 + r() * 9) / 160) * 100, s: 2 + Math.round(r() * 4), o: 0.45 + r() * 0.45, d: r() * 0.18, m: k % 2 === 0 });
  }
  return out;
});

export default function ShoreWaves() {
  return (
    <div className="shore" aria-hidden="true">
      {WAVES.map((w, i) => (
        <div className={`swash swash-${i}`} key={i}>
          <svg viewBox="0 0 2880 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`sw${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0.25" stopColor="#F5D1C4" stopOpacity={i === 2 ? 0.35 : 0.5} />
                <stop offset="1" stopColor="#C28C7E" stopOpacity={i === 2 ? 0.22 : 0.16} />
              </linearGradient>
            </defs>
            <path className="water" fill={`url(#sw${i})`} d={`${edge(w.y, w.a, w.seed)} L2880 160 L0 160Z`} />
            <path className="foam" d={edge(w.y, w.a, w.seed)} />
          </svg>
          {BUBBLES[i].map((b, k) => (
            <span key={k} className={b.m ? "bub" : "bub bub-d"} style={{ left: `${b.l.toFixed(2)}%`, top: `${b.t.toFixed(2)}%`, width: b.s, height: b.s, ["--o" as string]: b.o.toFixed(2), ["--bd" as string]: b.d.toFixed(2) }} />
          ))}
        </div>
      ))}
    </div>
  );
}
