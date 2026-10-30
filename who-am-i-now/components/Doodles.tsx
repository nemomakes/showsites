/* Hand-drawn line objects for the intro strip. Decorative only. */
const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Shoes() {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" {...common}>
      <path d="M8 58c1-9 3-17 6-23 3-1 7 0 9 2 2 5 6 9 13 11 8 2 14 4 15 9 1 4-1 6-5 6-12 1-26 1-35 0-2 0-3-2-3-5z" />
      <path d="M9 62c13 1 28 1 41 0" /><path d="M20 40l5 3M23 37l5 4M26 35l4 4" />
      <path d="M62 52c1-8 3-15 6-21 3-1 7 0 9 2 2 5 6 8 13 10 8 2 14 5 14 9 1 4-1 6-5 6-12 1-25 1-34 0-2 0-3-2-3-6z" />
      <path d="M63 57c12 1 27 1 40 0" /><path d="M74 37l5 3M77 34l5 4" />
    </svg>
  );
}
function Tee() {
  return (
    <svg viewBox="0 0 100 90" aria-hidden="true" {...common}>
      <path d="M36 9c3 6 9 9 14 9s11-3 14-9l19 8c3 1 4 3 3 6l-6 13c-1 2-3 2-5 1l-6-3 1 44c0 2-1 3-3 3H33c-2 0-3-1-3-3l1-44-6 3c-2 1-4 1-5-1l-6-13c-1-3 0-5 3-6z" />
      <path d="M42 46c2 3 5 4 8 4s6-1 8-4" />
    </svg>
  );
}
function Ball() {
  return (
    <svg viewBox="0 0 90 90" aria-hidden="true" {...common}>
      <path d="M45 7c21 0 38 17 37 38 0 21-17 38-38 37C24 82 7 65 8 44 8 24 25 7 45 7z" />
      <path d="M45 30l13 9-5 15H37l-5-15z" />
      <path d="M45 30V12M58 39l17-6M53 54l10 15M37 54l-10 15M32 39l-17-6" />
    </svg>
  );
}
function Crayon() {
  return (
    <svg viewBox="0 0 110 40" aria-hidden="true" {...common}>
      <path d="M10 14c20-1 52-1 74 0l18 6-18 6c-22 1-54 1-74 0-3 0-4-3-4-6s1-6 4-6z" />
      <path d="M24 14v12M70 14v12M84 14c1 4 1 8 0 12" />
    </svg>
  );
}

export default function Doodles() {
  return (
    <div className="doodles" aria-hidden="true">
      <span className="doodle d-shoes" data-reveal style={{ ["--d" as string]: "150ms" }}><Shoes /></span>
      <span className="doodle d-tee" data-reveal style={{ ["--d" as string]: "300ms" }}><Tee /></span>
      <span className="doodle d-ball" data-reveal style={{ ["--d" as string]: "450ms" }}><Ball /></span>
      <span className="doodle d-crayon" data-reveal style={{ ["--d" as string]: "600ms" }}><Crayon /></span>
    </div>
  );
}
