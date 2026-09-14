import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { featured, hairGoals, site, visitSteps } from "@/lib/site";

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
            <RevealItem distance={18}>
              <p className="font-display text-[clamp(4.5rem,16vw,8.5rem)] font-medium leading-[0.86] tracking-[0.02em]">
                Lumen
              </p>
            </RevealItem>
            <RevealItem>
              <h1 className="mx-auto mt-6 max-w-xl font-display text-3xl font-medium leading-[1.12] text-pretty md:text-4xl">
                Lived-in color and precise cuts in Walnut Creek.
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mx-auto mt-5 max-w-md text-pretty text-lg text-ivory/85 md:text-xl">
                Lumen is a small salon on Locust Street. We do color that grows
                out clean, and cuts that work with your texture — not against it.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex h-12 items-center rounded-full bg-ivory px-7 text-[0.72rem] tracking-[0.16em] uppercase text-espresso hover:bg-linen"
                >
                  Call {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="inline-flex h-12 items-center rounded-full border border-ivory/40 px-7 text-[0.72rem] tracking-[0.16em] uppercase text-ivory hover:border-ivory"
                >
                  Email {site.email}
                </a>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="bg-linen">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.12] text-pretty md:text-5xl">
              Color that still looks good between visits. Cuts you can wear
              every day.
            </h2>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
              Most people come in for lived-in color — soft dimension for
              brunettes and blondes that still looks intentional at week six,
              not just day one. We cut dry or wet depending on your texture,
              finish with a blowout or air-dry style, and take new color guests
              through a consult before we mix anything.
            </p>
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
          <h2 className="font-display text-4xl font-medium leading-[1.1] text-balance md:text-5xl">
            Here’s what a visit usually looks like.
          </h2>
          <ol className="mt-8 divide-y divide-ink/10">
            {visitSteps.map((step, i) => (
              <li key={step} className="flex gap-4 py-4">
                <span className="font-display text-2xl font-medium text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-pretty leading-relaxed text-ink/75">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-pretty leading-relaxed text-ink/70">
            New color guests start with a consult. If you book the service same
            day, the 30 minutes comes off the ticket.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-32">
        <Reveal>
          <h2 className="font-display text-4xl font-medium leading-[1.1] text-balance md:text-5xl">
            Things people often ask for.
          </h2>
          <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {hairGoals.map((goal) => (
              <li
                key={goal}
                className="py-5 font-display text-2xl font-medium leading-snug text-pretty md:text-[1.65rem]"
              >
                {goal}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-pretty text-ink/75">
            Not sure what to book?{" "}
            <a
              href={site.phoneHref}
              className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
            >
              Call
            </a>{" "}
            and we’ll talk it through.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone md:aspect-[5/6]">
            <Image
              src="/images/chair.jpg"
              alt="A leather salon chair waiting in a quiet room"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
