"use client";
import { useEffect, useRef } from "react";
/* Decorative: two kids walk across the hero, growing up as they go. Pure CSS animation, transform/opacity only. */
type Stage = { H: number; heads: number; leg: number; d: number; prop: 0 | 1 | 2 | 3 };
// Side-view walkers, feet at y=236. Proportions shift believably with age:
// big head + short legs (toddler) -> smaller head ratio, longer legs (teen).
const STAGES: Stage[] = [
  { H: 96, heads: 3.9, leg: 0.37, d: 1.1, prop: 0 },  // toddler
  { H: 140, heads: 5.6, leg: 0.45, d: 1.05, prop: 1 },  // ~8y, backpack
  { H: 172, heads: 6.4, leg: 0.48, d: 1.0, prop: 2 }, // ~12y
  { H: 204, heads: 7.2, leg: 0.5, d: 1.0, prop: 3 },  // teen
];
const G = 236, CX = 60;
const f = (n: number) => Math.round(n * 10) / 10;
function rnd(seed: number) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 - 0.5; }; }

export const stepOf = (st: Stage) => st.H * st.leg * 0.36;

function figure(st: Stage, pose: 0 | 1 | 2 | 3, kid: 0 | 1, seed: number) {
  const j = rnd(seed); const w = (a: number, k = 1.4) => f(a + j() * k);
  const hh = st.H / st.heads, r = hh * (st.prop === 0 ? 0.56 : 0.5);
  const x = CX, top = G - st.H, hy = top + r;
  const sh = top + hh * 1.12;               // shoulder line
  const hipY = G - st.H * st.leg;
  const L = G - hipY, T = hipY - sh, dep = r * st.d;
  const p: string[] = [];
  // head: imperfect loop + tiny nose tick facing right
  p.push(`M${w(x - r)} ${f(hy)}c${w(0)} ${f(-r * 1.08)} ${f(r * 2)} ${f(-r * 1.12)} ${f(r * 2.02)} ${w(0)}c${w(0)} ${f(r * 1.1)} ${f(-r * 1.96)} ${f(r * 1.16)} ${f(-r * 2.03)} ${f(r * 0.08)}`);
  p.push(`M${f(x + r * 0.98)} ${f(hy + r * 0.05)}q${f(r * 0.22)} ${f(r * 0.12)} ${f(-r * 0.02)} ${f(r * 0.3)}`);
  // hair
  if (kid === 0) {
    p.push(`M${f(x - r * 0.98)} ${f(hy + r * 0.1)}c${f(r * 0.1)} ${f(-r * 1.15)} ${f(r * 1.6)} ${f(-r * 1.35)} ${f(r * 1.85)} ${f(-r * 0.45)}`);
    if (st.prop === 0) p.push(`M${f(x - r * 0.15)} ${f(hy - r)}q${f(r * 0.05)} ${f(-r * 0.45)} ${f(r * 0.45)} ${f(-r * 0.4)}`);
    else { const pl = r * (0.7 + st.prop * 0.35); // ponytail grows with age
      p.push(`M${f(x - r * 0.75)} ${f(hy - r * 0.6)}c${f(-r * 0.55)} ${f(-r * 0.1)} ${f(-r * 0.8)} ${f(pl * 0.5)} ${f(-r * 0.55)} ${f(pl)}`); }
  } else {
    p.push(`M${f(x - r * 1.0)} ${f(hy + r * 0.2)}c${f(-r * 0.05)} ${f(-r * 1.25)} ${f(r * 1.5)} ${f(-r * 1.45)} ${f(r * 2.0)} ${f(-r * 0.5)}l${f(r * 0.25)} ${f(r * 0.05)}`);
    if (st.prop >= 2) p.push(`M${f(x + r * 0.3)} ${f(hy - r * 0.95)}q${f(r * 0.35)} ${f(-r * 0.3)} ${f(r * 0.7)} ${f(-r * 0.15)}`); // fringe
  }
  // neck
  p.push(`M${f(x)} ${f(hy + r * 0.98)}L${w(x, 0.6)} ${f(sh)}`);
  // torso: soft rounded tee/hoodie silhouette (side view), slightly flared hem
  p.push(`M${f(x - dep * 0.7)} ${f(sh + 1)}c${f(-dep * 0.35)} ${f(T * 0.25)} ${f(-dep * 0.45)} ${f(T * 0.7)} ${f(-dep * 0.35)} ${f(T + 2)}` +
    `c${f(dep * 0.6)} ${w(1.5)} ${f(dep * 1.4)} ${w(1.5)} ${f(dep * 2)} ${f(-0.5)}` +
    `c${f(dep * 0.05)} ${f(-T * 0.45)} ${f(0)} ${f(-T * 0.8)} ${f(-dep * 0.3)} ${f(-T - 1)}c${f(-dep * 0.4)} ${f(-1.6)} ${f(-dep * 0.9)} ${f(-1.6)} ${f(-dep * 1.35)} ${f(-0.5)}`);
  if (st.prop === 1) p.push(`M${f(x - dep * 0.95)} ${f(sh + T * 0.08)}c${f(-dep * 0.75)} ${f(0)} ${f(-dep * 0.95)} ${f(T * 0.2)} ${f(-dep * 0.95)} ${f(T * 0.45)}s${f(dep * 0.2)} ${f(T * 0.25)} ${f(dep * 0.7)} ${f(T * 0.25)}`); // backpack
  if (st.prop === 3 && kid === 0) p.push(`M${f(x - dep * 0.2)} ${f(sh + 2)}L${f(x - dep * 1.2)} ${f(hipY + L * 0.05)}M${f(x - dep * 1.75)} ${f(hipY - T * 0.05)}h${f(dep * 1.0)}l${f(dep * 0.1)} ${f(T * 0.4)}h${f(-dep * 1.25)}z`); // tote
  // legs (from hip). Ankle x positions are exact so the walk can be stepped to keep the planted foot still:
  // contact: ankles at hx +/- A; passing: support ankle at hx. Body advances A per frame.
  const hx = x + dep * 0.15, fl = r * (0.55 + st.heads * 0.02), Ast = stepOf(st);
  const near: string[] = [], far: string[] = [];
  const contactFront = (o: string[]) => o.push(`M${f(hx)} ${f(hipY)}Q${f(hx + Ast * 0.45)} ${f(hipY + L * 0.5)} ${f(hx + Ast)} ${f(G - 1)}l${f(fl)} ${f(0.5)}`);
  const contactBack = (o: string[]) => o.push(`M${f(hx)} ${f(hipY)}Q${f(hx - Ast * 0.4)} ${f(hipY + L * 0.52)} ${f(hx - Ast)} ${f(G - fl * 0.35)}l${f(fl * 0.95)} ${f(fl * 0.35)}`);
  const support = (o: string[]) => o.push(`M${f(hx)} ${f(hipY)}Q${f(hx + L * 0.05)} ${f(hipY + L * 0.5)} ${f(hx)} ${f(G - 1)}l${f(fl)} ${f(0.5)}`);
  const swing = (o: string[]) => o.push(`M${f(hx)} ${f(hipY)}C${f(hx + L * 0.12)} ${f(hipY + L * 0.2)} ${f(hx + L * 0.2)} ${f(hipY + L * 0.4)} ${f(hx + L * 0.18)} ${f(hipY + L * 0.46)}C${f(hx + L * 0.14)} ${f(hipY + L * 0.62)} ${f(hx + L * 0.02)} ${f(G - L * 0.2)} ${f(hx - L * 0.04)} ${f(G - L * 0.16)}l${f(fl * 0.85)} ${f(L * 0.04)}`);
  // 4-frame cycle: 0 contact (near front), 1 passing (near supports), 2 contact (far front), 3 passing (far supports)
  if (pose === 0) { contactFront(near); contactBack(far); }
  else if (pose === 1) { support(near); swing(far); }
  else if (pose === 2) { contactBack(near); contactFront(far); }
  else { swing(near); support(far); }
  const contact = pose === 0 || pose === 2;
  // arms: swing opposite to legs; elbow soft
  const A = T * 0.98 + r * 0.2, ax = x - dep * 0.1, ay = sh + 2;
  if (contact) {
    const sgn = pose === 0 ? 1 : -1; // near arm swings opposite the near leg
    p.push(`M${f(ax)} ${f(ay)}Q${f(ax - sgn * A * 0.18)} ${f(ay + A * 0.52)} ${f(ax - sgn * A * 0.42)} ${f(ay + A * 0.84)}`);
    far.push(`M${f(ax)} ${f(ay)}Q${f(ax + sgn * A * 0.14)} ${f(ay + A * 0.52)} ${f(ax + sgn * A * 0.4)} ${f(ay + A * 0.82)}`);
  } else {
    p.push(`M${f(ax)} ${f(ay)}Q${f(ax - A * 0.04)} ${f(ay + A * 0.55)} ${f(ax + A * 0.06)} ${f(ay + A * 0.98)}`);
  }
  return { near: p.join("") + near.join(""), far: far.join("") };
}

function Kid({ kid, seed }: { kid: 0 | 1; seed: number }) {
  return (
    <div className={`walker walker-${kid}`} data-pose="0">
      <div className="walker-bob">
        {STAGES.map((st, i) => (
          <svg key={i} className={`stage stage-${i}`} viewBox="0 0 120 240" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            {([0, 1, 2, 3] as const).map((k) => {
              const d = figure(st, k, kid, seed + i * 7 + (k % 2) * 3);
              return <g key={k} className={`pose pose-${k}`}><path d={d.far} className="far" /><path d={d.near} /></g>;
            })}
          </svg>
        ))}
      </div>
    </div>
  );
}

/* Stepped walk: each frame shows one pose and the body advances exactly one step (ankle offset A),
   so the planted foot keeps the same ground position across frames (no skating). */
function useWalk(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = root.current;
    if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kids = Array.from(host.querySelectorAll<HTMLElement>(".walker")).map((el, i) => ({
      el, bob: el.querySelector<HTMLElement>(".walker-bob")!, stages: Array.from(el.querySelectorAll<SVGElement>(".stage")),
      x: -140, k: 0, next: i ? 4200 : 300, dt: i ? 330 : 310, wait: 0,
    }));
    let raf = 0, visible = true, last = performance.now(), clock = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);
    const place = (c: (typeof kids)[number]) => {
      const W = host.clientWidth, p = Math.min(Math.max((c.x + 60) / (W + 60), 0), 1) * 4 - 0.5; // stage i centred at (i+.5)/4 of the crossing
      c.stages.forEach((s, i) => { s.style.opacity = String(Math.min(1, Math.max(0, (0.62 - Math.abs(p - i)) / 0.24))); });
      c.el.dataset.pose = String(c.k % 4);
      c.el.style.transform = `translate3d(${c.x.toFixed(1)}px,0,0)`;
      c.bob.style.transform = c.k % 2 ? "translateY(-2px)" : "translateY(0)"; // up on passing, down on contact
      return p;
    };
    kids.forEach(place);
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100); last = now;
      if (visible) {
        clock += dt;
        for (const c of kids) {
          if (!c.el.offsetParent || clock < c.next) continue;
          c.next = clock + c.dt;
          const W = host.clientWidth, unit = c.el.offsetHeight / 240;
          if (c.x > W + 20) { c.x = -140; c.k = 0; c.next = clock + 3500; place(c); continue; } // rest off-stage, then loop
          const si = Math.min(3, Math.max(0, Math.round(Math.min(Math.max((c.x + 60) / (W + 60), 0), 1) * 4 - 0.5)));
          c.x += stepOf(STAGES[si]) * unit; c.k++;
          place(c);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [root]);
}

export default function HeroWalk() {
  const ref = useRef<HTMLDivElement>(null);
  useWalk(ref);
  return (
    <div className="hero-walk" aria-hidden="true" ref={ref}>
      <Kid kid={0} seed={11} />
      <Kid kid={1} seed={23} />
    </div>
  );
}
