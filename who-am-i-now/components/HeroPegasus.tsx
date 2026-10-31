"use client";
/* Decorative: a pegasus with a child rider flies across the hero, behind the content.
   Stepped wing-flap frames drive a small lift (bob); travel is a slow linear path with a gentle arc.
   Transform/opacity only, rAF-driven, paused off-screen, static under reduced motion. */
import { useEffect, useRef } from "react";

type P = [number, number];
const f = (n: number) => Math.round(n * 10) / 10;
const pt = ([x, y]: P) => `${f(x)} ${f(y)}`;

// Canonical raised wing (root at the shoulder); other poses are rotations of it about the root,
// foreshortened on the downstroke. Leading edge: shoulder -> wrist -> tip; trailing edge: scalloped feathers.
const ROOT: P = [160, 93];
const LEAD: P[] = [[160, 93], [158, 70], [152, 48], [146, 34], [132, 10], [112, -10]]; // root, c1, c2, wrist, c3, tip
const TRAIL: P[] = [[112, -10], [98, 4], [90, 22], [90, 42], [96, 60], [106, 75], [120, 87], [138, 95]];
const COVERT: P[] = [[146, 40], [126, 44], [114, 58], [118, 74], [132, 86]];
function wing(rot: number, squash = 1, dx = 0, dy = 0) {
  const a = (rot * Math.PI) / 180, c = Math.cos(a), sn = Math.sin(a);
  const T = ([x, y]: P): P => {
    const ux = x - ROOT[0], uy = (y - ROOT[1]) * squash;
    return [ROOT[0] + ux * c - uy * sn + dx, ROOT[1] + ux * sn + uy * c + dy];
  };
  const L = LEAD.map(T), R = TRAIL.map(T), K = COVERT.map(T), o = T(ROOT);
  let d = `M${pt(L[0])}C${pt(L[1])} ${pt(L[2])} ${pt(L[3])}Q${pt(L[4])} ${pt(L[5])}`;
  for (let i = 1; i < R.length; i++) {
    const p0 = R[i - 1], p1 = R[i], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
    let nx = -(p1[1] - p0[1]), ny = p1[0] - p0[0]; const n = Math.hypot(nx, ny) || 1; nx /= n; ny /= n;
    if ((mx + nx - o[0]) ** 2 + (my + ny - o[1]) ** 2 < (mx - o[0]) ** 2 + (my - o[1]) ** 2) { nx = -nx; ny = -ny; }
    const out = i < 4 ? 6 : 4;
    d += `Q${f(mx + nx * out)} ${f(my + ny * out)} ${pt(p1)}`;
  }
  d += `L${pt(o)}z`;
  const inner = `M${pt(K[0])}C${pt(K[1])} ${pt(K[2])} ${pt(K[3])}M${pt(K[1])}L${pt(R[2])}M${pt(K[2])}L${pt(R[3])}`; // covert row + two quills
  return { outline: d, inner };
}

const HORSE = [
  // back, croup and a round rump
  "M196 90c-12 4-26 6-40 5-12-1-22-5-34-5-16 0-28 8-30 20-1 8 2 14 8 18",
  // belly with a lifted waist
  "M108 128c10 3 20 3 30 0 14-3 28-3 40 0 10 1 18-1 24-5",
  // deep chest into the underside of the neck
  "M202 123c10-3 16-12 18-22 2-9 7-18 14-26",
  // crest of the neck up to the poll
  "M196 90c6-14 16-30 30-40 6-4 10-6 14-6",
  // head: forehead, muzzle, jaw
  "M240 44c8 2 16 10 22 18 4 5 8 9 8 13 0 4-4 6-8 5-6-1-12-4-18-4-4 0-8-1-10-4",
  // ear, nostril, eye
  "M238 46c-2-6-1-11 2-14 3 4 4 8 4 12", "M263 73q2 1 3 3", "M246 56q2-1 4 0",
  // muscle hints: shoulder, hindquarter
  "M204 100c-3 7-3 14 0 20", "M112 104c7 4 11 11 10 19",
  // mane, flowing back
  "M238 44c-8 4-14 12-20 22M232 50c-10 4-16 14-20 24M226 58c-8 6-12 14-14 22",
  // tail, long and soft
  "M94 102c-14-4-28-2-38 6-6 5-12 8-20 8M94 108c-12 2-22 8-28 16-4 5-10 8-16 8",
  // front legs folded under (flying)
  "M204 124c6 6 10 12 12 20-1 6-6 10-12 12l2 3",
  "M190 128c4 6 6 12 6 18-2 5-7 8-12 9l1 3",
  // hind legs stretched back
  "M108 126c-6 6-12 12-20 16-8 2-16 3-22 6l-3-2",
  "M120 130c-8 6-14 12-22 15-6 2-12 4-16 7l-3-1",
].join("");

// Child rider: sits at the withers, leaning forward, hands in the mane, scarf trailing.
function rider(scarf: number) {
  return [
    "M175 89c2-10 6-19 12-26M183 90c2-8 6-16 11-23", // jacket: back + front
    "M187 63c3-1 6-1 8 2", // shoulders
    "M179 90c7 1 13 4 16 8 0 6-2 11-5 15l6 2", // leg along the horse's side
    "M193 67c5 3 11 5 17 5", // arm to the mane
    "M190 52c0-6 5-10 11-10s10 4 10 10-5 10-11 10-10-4-10-10z", // head
    "M193 45c-4-2-9-1-12 2M194 49c-4 0-8 2-10 5", // hair blown back
    "M210 54q2 1 2 3", // nose tick
    `M188 64c-8 ${f(-1 + scarf)}-14 ${f(2 - scarf)}-22 ${f(scarf)}`, // scarf tail
  ].join("");
}

// 4 wing poses: up, mid-up, level, down (stepped ping-pong); far wing peeks behind on upstrokes.
const POSES: { rot: number; sq: number; far?: number; scarf: number }[] = [
  { rot: 6, sq: 1, far: 16, scarf: 2 },
  { rot: -20, sq: 0.9, far: -8, scarf: 1 },
  { rot: -44, sq: 0.7, scarf: -1 },
  { rot: -64, sq: 0.45, scarf: -2 },
];
const ORDER = [0, 1, 2, 3, 2, 1]; // flap cycle
const LIFT = [2, 1, -1, -3, -1, 1]; // px offset per frame: rises on the downstroke, settles on the upstroke

function Pegasus() {
  return (
    <svg className="peg-svg" viewBox="0 -30 300 214" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      {POSES.map((p, i) => (
        <g key={i} className={`wing wing-${i}`}>
          {p.far !== undefined && <path className="far" d={wing(p.far, 0.92, 12, -3).outline} />}
        </g>
      ))}
      <path d={HORSE} />
      {POSES.map((p, i) => (
        <g key={i} className={`wing wing-${i}`}>
          <path d={rider(p.scarf)} />
          <path className="wing-fill" d={wing(p.rot, p.sq).outline} /><path d={wing(p.rot, p.sq).inner} />
        </g>
      ))}
    </svg>
  );
}

const STEP = 140, REST = 3000, CROSS = 11000;
export default function HeroPegasus() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current, el = host?.querySelector<HTMLElement>(".peg");
    if (!host || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, visible = true, last = performance.now(), t = 0, frame = 0, nextFrame = 0, y = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100); last = now;
      if (visible) {
        t += dt;
        const W = host.clientWidth, w = el.offsetWidth, cross = CROSS * Math.max(0.55, Math.min(1, (W + w) / (1440 + 300)));
        if (t > cross + REST) { t = 0; nextFrame = 0; }
        if (t >= nextFrame) { frame = (frame + 1) % ORDER.length; nextFrame = t + STEP; el.dataset.pose = String(ORDER[frame]); }
        const p = Math.min(t / cross, 1);
        const x = -w - 10 + p * (W + w + 20);
        const arc = -Math.sin(p * Math.PI) * el.offsetHeight * 0.12; // gentle rise through the middle
        y += (LIFT[frame] - y) * Math.min(1, dt / 90); // flap-driven lift, eased so it never snaps
        el.style.transform = `translate3d(${f(x)}px,${f(arc + y)}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return (
    <div className="hero-walk hero-peg" aria-hidden="true" ref={ref}>
      <div className="peg" data-pose="0"><Pegasus /></div>
    </div>
  );
}
