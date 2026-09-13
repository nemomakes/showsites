import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";
import { VisitPanel } from "@/components/VisitPanel";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Oak & Crumb — a neighborhood bakery on North Main in Walnut Creek, opened in 2019 by Maya Chen and Eli Hart.",
};

export default function AboutPage() {
  return (
    <>
      <Reveal className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:px-8 md:pt-20">
        <p className="eyebrow text-muted">About the bakery</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Named for a tree and a texture.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink">
          Oak & Crumb is a small bakery in downtown Walnut Creek. We bake
          bread, pastry, and a short coffee list for the same people we see
          most mornings — neighbors, school drop-offs, and the folks who walk
          North Main before work.
        </p>
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-[21/9]">
          <Image
            src="/images/bread-loaves.jpg"
            alt="Seeded and flour-dusted bakery loaves arranged with a wheat stalk"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </Reveal>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <Reveal className="md:col-span-4">
          <h2 className="font-display text-3xl md:text-4xl">
            How we got here
          </h2>
        </Reveal>
        <Reveal className="space-y-5 text-pretty text-lg leading-relaxed text-ink md:col-span-8" delay={0.08}>
          <p>
            Maya Chen grew up in Oakland and learned bread the long way — first
            from her grandmother’s Sunday loaves, then in the pastry rooms of a
            few San Francisco shops that cared about butter more than branding.
            Eli Hart cooked on the line in Lafayette until fermentation took
            over his days off.
          </p>
          <p>
            They opened Oak & Crumb in 2019 in a former shoe-repair shop at
            1418 N Main. The live oak in the courtyard was already there. The
            crumb took longer. The starter they still feed — June — dates to a
            shared kitchen in Concord in 2017.
          </p>
          <p>
            We mill a little flour. We do not mill all of it; that would be a
            story we couldn’t stand behind. The rest comes from Central Milling
            and a small miller in Petaluma. Coffee is poured, not roasted: Harbor
            & Pine in Berkeley on weekdays, a guest bag when the weekend
            deserves it.
          </p>
        </Reveal>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src="/images/sourdough.jpg"
              alt="A seeded loaf sliced on a wooden board"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow text-muted">What we care about</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Neighborhood first.
            </h2>
            <ul className="mt-6 space-y-4 text-pretty leading-relaxed text-ink">
              <li>
                <strong className="font-medium text-bark">Walk-in energy.</strong>{" "}
                We are not an app. If you want a country loaf held, call. If you
                want a cake for Sunday, email us a few days out.
              </li>
              <li>
                <strong className="font-medium text-bark">Honest hours.</strong>{" "}
                Closed Monday. Early on weekdays. Short on Sunday so the bakers
                can have a table somewhere else.
              </li>
              <li>
                <strong className="font-medium text-bark">Food that tastes like a person made it.</strong>{" "}
                Some days the focaccia is a little more olive. We will tell you.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <RevealStagger className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <RevealItem>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src="/images/berry-tart.jpg"
              alt="A red-currant and blueberry tart on a white stand"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Seasonal tarts when the fruit is loud enough to bother with.
          </figcaption>
        </figure>
        </RevealItem>
        <RevealItem>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src="/images/cookies.jpg"
              alt="Chocolate chip cookies in a parchment-lined bowl"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            The cookie we refuse to make cute. Brown butter, sea salt, two chocolates.
          </figcaption>
        </figure>
        </RevealItem>
      </RevealStagger>

      <VisitPanel tone="paper" />
    </>
  );
}
