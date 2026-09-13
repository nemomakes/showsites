import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { VisitPanel } from "@/components/VisitPanel";
import { team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Story",
  description:
    "The story of Lumen Salon — a neighborhood chair on Locust Street in Walnut Creek, opened in 2021 by Noor Alami.",
};

export default function StoryPage() {
  return (
    <>
      <PageIntro
        eyebrow="About the salon"
        title="Named for the light that finds the hair you already have."
      >
        Lumen is a small salon in downtown Walnut Creek. We color slowly, cut
        with weight in mind, and keep the room quiet enough that you can hear
        the question we actually asked.
      </PageIntro>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/9]">
            <Image
              src="/images/interior.jpg"
              alt="Salon chairs lined under tall windows"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <Reveal className="md:col-span-4">
          <h2 className="font-display text-3xl font-medium md:text-4xl">
            How we got here
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-8">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/80">
            <p>
              Noor Alami grew up in Oakland and learned color the long way —
              first on friends in a kitchen, then in San Francisco rooms that
              cared more about foils than about the person under them. After ten
              years of that, she wanted a quieter chair. One with a door that
              opened onto a street people already walked.
            </p>
            <p>
              Lumen opened in 2021 at 1632 Locust, in a former florist. The
              name is about light: the kind that finds the hair you already have
              and makes it readable. Not a reinvention. A better Tuesday.
            </p>
            <p>
              We work with professional color and care lines — nothing we would
              not put on our own heads. We do not sell a “transformation.” We
              sell time, attention, and a grow-out you will not hide under a hat.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-linen">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image
                src="/images/consult.jpg"
                alt="A stylist talking with a guest before service"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow text-ash">What we care about</p>
            <h2 className="mt-5 font-display text-4xl font-medium md:text-5xl">
              Hospitality, then hair.
            </h2>
            <ul className="mt-6 space-y-4 text-pretty leading-relaxed text-ink/80">
              <li>
                <strong className="font-medium text-ink">Honest consults.</strong>{" "}
                If the hair cannot take a two-level jump this visit, we will
                say so. Kindly, and before you sit for three hours.
              </li>
              <li>
                <strong className="font-medium text-ink">Texture as it grows.</strong>{" "}
                Curly and coily hair is cut in its pattern. We do not
                straighten it first to make our job easier.
              </li>
              <li>
                <strong className="font-medium text-ink">A room that stays human.</strong>{" "}
                Water, a quiet playlist, no shame language, no “before and
                after” speech at the mirror.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ash">The chairs</p>
          <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
            Who you will sit with
          </h2>
          <p className="mt-4 text-pretty text-ink/75">
            Five stylists. We do not publish headshots of people we invented —
            you will meet them in the room.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-12 divide-y divide-ink/10 border-y border-ink/10"
          stagger={0.08}
        >
          {team.map((person) => (
            <RevealItem
              key={person.name}
              as="div"
              className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline"
            >
              <p className="font-display text-2xl font-medium md:col-span-4">
                {person.name}
              </p>
              <p className="eyebrow text-ash md:col-span-3">{person.role}</p>
              <p className="text-pretty text-ink/75 md:col-span-5">
                {person.bio}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <RevealGroup
        className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-24"
        stagger={0.12}
      >
        <RevealItem as="figure">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <Image
              src="/images/texture.jpg"
              alt="Editorial portrait celebrating natural hair texture"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ash">
            Texture is not a problem to solve. It is the hair.
          </figcaption>
        </RevealItem>
        <RevealItem as="figure">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <Image
              src="/images/portrait-bun.jpg"
              alt="Portrait of a woman with a clean bun and soft fringe"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ash">
            A precision fringe, or none at all. We will tell you which.
          </figcaption>
        </RevealItem>
      </RevealGroup>

      <VisitPanel tone="linen" />
    </>
  );
}
