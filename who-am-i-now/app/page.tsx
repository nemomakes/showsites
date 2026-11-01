import SignupForm from "@/components/SignupForm";
import Reveal from "@/components/Reveal";
import HeroWalk from "@/components/HeroWalk";
import HeroPegasus from "@/components/HeroPegasus";

// Hero background animation. "none" = no animation; "walk" = the kids growing up (tag hero-walk-v1); "pegasus" = the flight.
const HERO_ANIMATION = "none" as "none" | "pegasus" | "walk";
import ShoreWaves from "@/components/ShoreWaves";
import Image from "next/image";
import heroImg from "./images/hero-poster.jpg";
import HeroVideo from "@/components/HeroVideo";
import likeImg from "./images/card-like.jpg";
import goodImg from "./images/card-good.jpg";
import stepImg from "./images/card-step.jpg";
import bandWide from "./images/band-wide.jpg";
import bandMobile from "./images/band-mobile.jpg";
import peek1 from "./images/peek-1.webp";
import peek3 from "./images/peek-3.webp";
import peek4 from "./images/peek-4.webp";
import peek22 from "./images/peek-22.webp";
import whyImg from "./images/why.jpg";
import ctaImg from "./images/cta.jpg";

const items = [
  { title: "Remember what you're like", body: "Short daily prompts help you find your favorites again (food, music, how you spend a free afternoon) without overthinking it.", img: likeImg, alt: "Hands sliding a vinyl record out of its sleeve beside a cup of coffee" },
  { title: "What are you good at now?", body: "Twenty years of running a household built real skills. You'll name them in plain words you could use for a job, a side income, or just yourself.", img: goodImg, alt: "A hand writing in pencil across an open notebook" },
  { title: "Take one real next step.", body: "By day 30 you'll pick one concrete thing to do, whether that's work, earning a little, or finding your people. You won't just come away with a better mood.", img: stepImg, alt: "A woman with a tote bag over her shoulder pulling the front door closed behind her as she walks out, beside a coat rack with a scarf, jacket and straw hat" },
];
const peekPages = [
  { img: peek1, alt: "Workbook cover: \"Who Am I Now?\", a 30-day workbook, with a photo of a woman in an armchair holding a cup of coffee and a line for your name" },
  { img: peek3, alt: "Week 1 opening page: \"Remember what you're like\", Days 1 to 7, with a photo of hands sliding a record from its sleeve" },
  { img: peek4, alt: "Day 1 page: write down 10 things you liked before you had kids, with ten numbered lines" },
  { img: peek22, alt: "Day 30 page: \"My one real next step\", with lines for I will, By, and The first thing I'll do, and a closing note" },
];
const weeks = ["What I like", "What I value", "What I'm good at", "Who I want around me, and my next step"];

export default function Page() {
  return (
    <>
      <Reveal />
      <header className="topbar"><div className="wrap"><span className="wordmark">Who Am I Now?</span></div></header>

      <main>
        <section className="hero">
          {HERO_ANIMATION === "walk" && <HeroWalk />}
          {HERO_ANIMATION === "pegasus" && <HeroPegasus />}
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1 className="h1 load" style={{ ["--d" as string]: "0ms" }}>The kids are gone, and your next chapter starts here.</h1>
              <p className="lede load" style={{ ["--d" as string]: "120ms" }}>Start with a free 30-day workbook that helps you rediscover what you like and what you&apos;re good at, then pick one real next step.</p>
              <div className="load" style={{ ["--d" as string]: "240ms" }}><SignupForm /></div>
            </div>
            <div className="hero-visual load" style={{ ["--d" as string]: "360ms" }}>
              <div className="hero-arch">
                <Image src={heroImg} alt="A woman sitting in an armchair by the window with a cup of coffee" priority placeholder="blur" quality={75} sizes="(min-width: 760px) 380px, 78vw" className="hero-img" />
                <HeroVideo />
              </div>
            </div>
          </div>
        </section>

        <section className="intro sand">
          <ShoreWaves />
          <div className="wrap narrow">
            <p className="intro-text" data-reveal>For years you knew everyone&apos;s favorites, schedules, and shoe sizes. Then the house got quiet. If you&apos;ve caught yourself thinking &ldquo;<mark className="hl">is this it?</mark>&rdquo;, you&apos;re not the only one, and you&apos;re not starting from zero.</p>
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
          <div className="how-bg" aria-hidden="true">
            <Image src={bandWide} alt="" placeholder="blur" quality={70} sizes="100vw" className="band-wide" />
            <Image src={bandMobile} alt="" placeholder="blur" quality={70} sizes="100vw" className="band-mobile" />
          </div>
          <div className="wrap">
            <div data-reveal>
              <h2 className="h2">How it works</h2>
              <p className="sub sub-long">A few minutes a day for 30 days. Each day you answer one short prompt, and each week builds on the last: first you remember what you like, then you name what you&apos;re good at now, and by the end you pick one real next step, whether that&apos;s work, a little income, or new people. Print it, keep it on the kitchen table, and go at your own pace.</p>
            </div>
            <ol className="weeks">
              {weeks.map((w, i) => (
                <li key={w} className="sheet" data-reveal style={{ ["--d" as string]: `${i * 110}ms`, ["--i" as string]: i }}>
                  <div className="sheet-in">
                    <span className="wk">Week</span>
                    <span className="wn">{String(i + 1).padStart(2, "0")}</span>
                    <span className="wt">{w}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="peek">
          <div className="wrap">
            <div className="peek-head" data-reveal>
              <h2 className="h2">Take a look inside</h2>
              <p className="peek-cap">Real pages from the workbook. Print it, grab a pen, and start with Day 1.</p>
            </div>
          </div>
          <ol className="peek-row">
            {peekPages.map((pg, i) => (
              <li key={i} className="peek-page" data-reveal style={{ ["--d" as string]: `${i * 90}ms`, ["--i" as string]: i }}>
                <div className="peek-paper"><Image src={pg.img} alt={pg.alt} quality={80} sizes="(min-width: 760px) 250px, 68vw" /></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="why">
          <div className="wrap why-grid">
            <div data-reveal><div className="why-media"><Image src={whyImg} alt="A hand writing in pencil on printed workbook pages on a kitchen table" placeholder="blur" quality={70} sizes="(min-width: 760px) 460px, 92vw" /></div></div>
            <div data-reveal style={{ ["--d" as string]: "120ms" }}>
              <h2 className="h2">Why it&apos;s different</h2>
              <p className="body-lg">It&apos;s free and private, and it&apos;s printable, so you can do it at your kitchen table. No course to buy, no group to join, and no pep talks. It ends with you doing something.</p>
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <div className="panel" data-reveal>
              <div className="panel-media"><Image src={ctaImg} alt="" placeholder="blur" quality={70} sizes="(min-width: 760px) 1080px, 100vw" /></div>
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
