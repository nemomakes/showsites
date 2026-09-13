import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { VisitPanel } from "@/components/VisitPanel";
import { featured, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-espresso text-ivory">
        <Image
          src="/images/hero.jpg"
          alt="Editorial portrait of a woman with auburn hair and a precise fringe"
          fill
          priority
          className="object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-espresso/25" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-end px-5 pb-20 pt-32 text-center md:justify-center md:pb-24">
          <RevealGroup mode="load" stagger={0.09}>
            <RevealItem>
              <p className="eyebrow text-ivory/70">{site.tagline}</p>
            </RevealItem>
            <RevealItem distance={18}>
              <h1 className="mt-5 font-display text-[clamp(4.5rem,16vw,8.5rem)] font-medium leading-[0.86] tracking-[0.02em]">
                Lumen
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mx-auto mt-6 max-w-md text-pretty text-lg text-ivory/85 md:text-xl">
                Lived-in color and precision cuts — a calm chair on Locust
                Street, for the hair you already have.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex h-12 items-center rounded-full bg-ivory px-7 text-[0.72rem] tracking-[0.16em] uppercase text-espresso hover:bg-linen"
                >
                  Book a consult
                </a>
                <Link
                  href="/services"
                  className="inline-flex h-12 items-center rounded-full border border-ivory/40 px-7 text-[0.72rem] tracking-[0.16em] uppercase text-ivory hover:border-ivory"
                >
                  Services
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <p className="eyebrow text-ash">On Locust Street</p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.12] text-pretty md:text-6xl">
            We do not do a new you. We do the hair you will keep living in.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink/70">
            Lumen is a small salon in downtown Walnut Creek. Color is built
            slowly. Cuts are measured twice. Hospitality is a glass of water
            and a conversation that does not rush you toward a trend.
          </p>
          <Link
            href="/story"
            className="mt-9 inline-flex h-12 items-center text-[0.72rem] tracking-[0.18em] uppercase underline decoration-ink/20 underline-offset-[6px] hover:decoration-ink"
          >
            Read the story
          </Link>
        </Reveal>
      </section>

      <section className="bg-linen">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-ash">The work</p>
                <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
                  What we keep on the chair
                </h2>
              </div>
              <Link
                href="/services"
                className="text-[0.72rem] tracking-[0.18em] uppercase underline decoration-ink/20 underline-offset-[6px] hover:decoration-ink"
              >
                Full services
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-12 md:grid-cols-3" stagger={0.12}>
            {featured.map((item) => (
              <RevealItem key={item.name} as="article">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium">
                  {item.name}
                </h3>
                <p className="mt-2 text-pretty text-ash">{item.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone md:aspect-[5/6]">
            <Image
              src="/images/wash.jpg"
              alt="A guest resting at the wash bowl during a shampoo"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow text-ash">How we work</p>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.1] md:text-5xl">
            A consult is a conversation, not a pitch.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/75">
            New color guests start here. Bring a photo if you want. We will
            tell you what the hair can hold this visit, and what should wait.
            There is no checkout on this site — call {site.phone}, or write{" "}
            <a href={site.emailHref} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-ink/75">
            Tuesday through Saturday. Closed Sunday and Monday so the chairs —
            and the people in them — can rest.
          </p>
        </Reveal>
      </section>

      <section className="relative min-h-[72vh] overflow-hidden bg-espresso text-ivory">
        <Image
          src="/images/interior.jpg"
          alt="A quiet row of salon chairs and mirrors in black and white"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
          <Reveal>
            <p className="eyebrow text-ivory/65">Walnut Creek</p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.12] md:text-6xl">
              Lived-in color.
              <span className="block">Precision cuts.</span>
            </h2>
            <Link
              href="/services"
              className="mt-9 inline-flex h-12 items-center rounded-full border border-ivory/45 px-7 text-[0.72rem] tracking-[0.16em] uppercase text-ivory hover:bg-ivory hover:text-espresso"
            >
              See the work
            </Link>
          </Reveal>
        </div>
      </section>

      <VisitPanel />
    </>
  );
}
