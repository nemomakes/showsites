import Image from "next/image";
import Link from "next/link";
import { BulletList } from "@/components/BulletList";
import { Cta } from "@/components/Cta";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { PageTitle, SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { SwayCard } from "@/components/SwayCard";
import { home, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-forest text-paper">
        <Image
          src="/images/dining.jpg"
          alt="An empty dining room with tables set before service"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/20" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <Reveal mode="load">
            <PageTitle maxRem={3.75}>{home.heroTitle}</PageTitle>
            <p className="hero-copy mt-6 max-w-2xl text-pretty">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={site.phoneHref} tone="on-dark">
                Call {site.phone}
              </Cta>
              <Cta href={site.emailHref} tone="on-dark-ghost">
                Email {site.email}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:gap-12 md:px-10 md:py-24">
        <SwayCard index={0} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-2">
            <Reveal>
              <div className="px-6 py-10 md:px-12 md:py-16">
                <SectionTitle>{home.introTitle}</SectionTitle>
                <p className="copy mt-6 text-pretty">{home.introBody}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/5] bg-stone md:h-full md:aspect-auto md:min-h-[28rem]">
                <Image
                  src="/images/room.jpg"
                  alt="An empty wood table set before dinner service"
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard index={1} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-2">
            <Reveal className="md:order-2">
              <div className="px-6 py-10 md:px-12 md:py-16">
                <SectionTitle>{home.expectTitle}</SectionTitle>
                <BulletList items={home.expect} />
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:order-1">
              <div className="relative aspect-[4/5] bg-stone md:h-full md:aspect-auto md:min-h-[28rem]">
                <Image
                  src="/images/produce.jpg"
                  alt="Greens, herbs, and tomatoes on a prep board"
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard index={2} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-2">
            <Reveal>
              <div className="px-6 py-10 md:px-12 md:py-16">
                <SectionTitle>{home.menuTitle}</SectionTitle>
                <p className="copy mt-6 text-pretty">{home.menuBody}</p>
                <BulletList items={home.menuItems} />
                <p className="copy mt-8 text-pretty">
                  <Link
                    href="/menu"
                    className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                  >
                    See the full seasonal menu
                  </Link>
                  {" · or just "}
                  <a
                    href={site.phoneHref}
                    className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                  >
                    call
                  </a>
                  {" and we'll walk you through it."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/5] bg-stone md:h-full md:aspect-auto md:min-h-[28rem]">
                <Image
                  src="/images/plate.jpg"
                  alt="Sliced beets and greens on a white ceramic plate"
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard index={3} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] bg-stone md:h-full md:aspect-auto md:min-h-[28rem]">
                <Image
                  src="/images/dining.jpg"
                  alt="An empty dining room with tables set before service"
                  fill
                  loading="eager"
                  className="object-cover object-[center_30%]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="px-6 py-10 md:px-12 md:py-16">
                <SectionTitle>{home.patioTitle}</SectionTitle>
                <p className="copy mt-6 text-pretty">{home.patioBody}</p>
              </div>
            </Reveal>
          </div>
        </SwayCard>
      </div>

      <MarqueeGallery />

      <section className="bg-forest text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionTitle className="text-paper">{home.visitTitle}</SectionTitle>
            <p className="mt-6 max-w-2xl text-pretty text-xl font-semibold leading-snug text-paper md:text-2xl">
              {home.visitBody}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-xl font-semibold leading-snug text-paper md:text-2xl">
              {home.visitAddress}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-xl font-semibold leading-snug text-paper md:text-2xl">
              {home.visitNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={site.phoneHref} tone="on-dark">
                Call
              </Cta>
              <Cta href={site.emailHref} tone="on-dark-ghost">
                Email
              </Cta>
              <Cta href={site.mapsUrl} tone="on-dark-ghost" external>
                Open map
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
