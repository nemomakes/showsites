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
const WAVES = [
  { y: 46, a: 14, seed: 1 },
  { y: 58, a: 10, seed: 3 },
  { y: 70, a: 12, seed: 4 },
];

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
        </div>
      ))}
    </div>
  );
}
