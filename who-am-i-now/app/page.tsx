import SignupForm from "@/components/SignupForm";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import heroImg from "./images/hero.jpg";
import likeImg from "./images/card-like.jpg";
import goodImg from "./images/card-good.jpg";
import stepImg from "./images/card-step.jpg";
import bandWide from "./images/band-wide.jpg";
import bandMobile from "./images/band-mobile.jpg";
import whyImg from "./images/why.jpg";
import ctaImg from "./images/cta.jpg";

const items = [
  { title: "Remember what you actually like.", body: "Short daily prompts help you find your favorites again (food, music, how you spend a free afternoon) without overthinking it.", img: likeImg, alt: "Hands holding a record sleeve beside a cup of coffee" },
  { title: "See what you're good at, now.", body: "Twenty years of running a household built real skills. You'll name them in plain words you could use for a job, a side income, or just yourself.", img: goodImg, alt: "A hand writing in a notebook with a pencil" },
  { title: "Leave with one real next step.", body: "By day 30 you'll pick one concrete thing to do, whether that's work, earning a little, or finding your people. You won't just come away with a better mood.", img: stepImg, alt: "Walking shoes by a front door left open to the morning" },
];
const weeks = ["What I like", "What I value", "What I'm good at", "Who I want around me, and my next step"];

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
            <div className="hero-visual load" style={{ ["--d" as string]: "360ms" }}>
              <div className="hero-arch">
                <Image src={heroImg} alt="A woman sitting in an armchair by the window with a cup of coffee" priority placeholder="blur" quality={75} sizes="(min-width: 760px) 380px, 78vw" className="hero-img" />
              </div>
            </div>
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
                  <div className="card-media"><Image src={it.img} alt={it.alt} placeholder="blur" quality={70} sizes="(min-width: 760px) 340px, 92vw" /></div>
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

        <div className="band" data-reveal>
          <Image src={bandWide} alt="" placeholder="blur" quality={70} sizes="100vw" className="band-wide" />
          <Image src={bandMobile} alt="" placeholder="blur" quality={70} sizes="100vw" className="band-mobile" />
        </div>

        <section className="why">
          <div className="wrap why-grid">
            <div data-reveal><div className="why-media"><Image src={whyImg} alt="Printed workbook pages on a kitchen table, a hand holding a pencil" placeholder="blur" quality={70} sizes="(min-width: 760px) 460px, 92vw" /></div></div>
            <div data-reveal style={{ ["--d" as string]: "120ms" }}>
              <h2 className="h2">Why it&apos;s different</h2>
              <p className="body-lg">It&apos;s free and private, and it&apos;s printable, so you can do it at your kitchen table. No course to buy, no group to join, and no pep talks. It ends with you doing something.</p>
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <div className="panel" data-reveal>
              <div className="panel-media"><Image src={ctaImg} alt="" placeholder="blur" quality={70} sizes="(min-width: 760px) 720px, 92vw" /></div>
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
