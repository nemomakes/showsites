import SignupForm from "@/components/SignupForm";
import Reveal from "@/components/Reveal";

const items = [
  { title: "Remember what you actually like.", body: "Short daily prompts help you find your favorites again (food, music, how you spend a free afternoon) without overthinking it.", mark: "circle" },
  { title: "See what you're good at, now.", body: "Twenty years of running a household built real skills. You'll name them in plain words you could use for a job, a side income, or just yourself.", mark: "arch" },
  { title: "Leave with one real next step.", body: "By day 30 you'll pick one concrete thing to do, whether that's work, earning a little, or finding your people. You won't just come away with a better mood.", mark: "leaf" },
];
const weeks = ["What I like", "What I value", "What I'm good at", "Who I want around me, and my next step"];

function Mark({ kind }: { kind: string }) {
  return (
    <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
      {kind === "circle" && <circle cx="20" cy="20" r="16" fill="#F5D1C4" />}
      {kind === "arch" && <path d="M4 38V20a16 16 0 0 1 32 0v18z" fill="#C28C7E" />}
      {kind === "leaf" && <path d="M6 34C6 16 18 6 36 6c0 18-12 28-30 28z" fill="#F5D1C4" />}
    </svg>
  );
}

function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 400 480" aria-hidden="true">
      <defs>
        <clipPath id="arch"><path d="M0 480V200a200 200 0 0 1 400 0v280z" /></clipPath>
      </defs>
      <g clipPath="url(#arch)">
        <rect width="400" height="480" fill="#F5D1C4" />
        <g className="sun"><circle cx="200" cy="190" r="92" fill="#C28C7E" /></g>
        <path d="M0 330c90-34 230-40 400-8v158H0z" fill="#FDF4F0" />
        <path d="M150 480c0-90 70-150 160-150h90v150z" fill="#AB7263" />
      </g>
    </svg>
  );
}

function PagesArt() {
  return (
    <svg className="pages-art" viewBox="0 0 320 300" aria-hidden="true">
      <rect x="0" y="0" width="320" height="300" rx="28" fill="#F9F2E6" />
      <g transform="rotate(-8 140 160)"><rect x="56" y="58" width="160" height="196" rx="10" fill="#FFFAF5" /></g>
      <g transform="rotate(4 170 150)">
        <rect x="96" y="40" width="160" height="196" rx="10" fill="#F5D1C4" />
        <rect x="120" y="76" width="96" height="6" rx="3" fill="#FDF4F0" />
        <rect x="120" y="94" width="72" height="6" rx="3" fill="#FDF4F0" />
      </g>
      <circle cx="244" cy="236" r="26" fill="#AB7263" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <Reveal />
      <header className="topbar"><div className="wrap"><span className="wordmark">Who Am I Now?</span></div></header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1 className="h1 load" style={{ ["--d" as string]: "0ms" }}>The kids are gone, and you can&apos;t remember what you even like.</h1>
              <p className="lede load" style={{ ["--d" as string]: "120ms" }}>This free 30-day workbook helps you find out, and ends with one real next step.</p>
              <div className="load" style={{ ["--d" as string]: "240ms" }}><SignupForm /></div>
            </div>
            <div className="hero-visual load" style={{ ["--d" as string]: "360ms" }}><HeroArt /></div>
          </div>
        </section>

        <section className="intro sand">
          <div className="wrap narrow">
            <p className="intro-text" data-reveal>For years you knew everyone&apos;s favorites, schedules, and shoe sizes. Then the house got quiet. If you&apos;ve caught yourself thinking &ldquo;is this it?&rdquo;, you&apos;re not the only one, and you&apos;re not starting from zero.</p>
          </div>
        </section>

        <section className="inside">
          <div className="wrap">
            <h2 className="h2" data-reveal>What&apos;s inside</h2>
            <div className="cards">
              {items.map((it, i) => (
                <article className="card" key={it.title} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                  <Mark kind={it.mark} />
                  <h3 className="h3">{it.title}</h3>
                  <p>{it.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how sand">
          <div className="wrap how-grid">
            <div data-reveal>
              <h2 className="h2">How it works</h2>
              <p className="sub">4 weeks, a few minutes a day.</p>
            </div>
            <ol className="weeks">
              {weeks.map((w, i) => (
                <li key={w} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <span className="wk">Week {i + 1}</span>
                  <span className="wt">{w}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="why">
          <div className="wrap why-grid">
            <div data-reveal><PagesArt /></div>
            <div data-reveal style={{ ["--d" as string]: "120ms" }}>
              <h2 className="h2">Why it&apos;s different</h2>
              <p className="body-lg">It&apos;s free and private, and it&apos;s printable, so you can do it at your kitchen table. No course to buy, no group to join, and no pep talks. It ends with you doing something.</p>
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <div className="panel" data-reveal>
              <h2 className="h2 center">Start your 30 days today.</h2>
              <div className="panel-form"><SignupForm /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="wrap"><span className="wordmark">Who Am I Now?</span></div></footer>
    </>
  );
}
