import Image from "next/image";
import Link from "next/link";
import { BulletList } from "@/components/BulletList";
import { Cta } from "@/components/Cta";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { PageTitle, SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
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
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-forest/25" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <Reveal mode="load">
            <PageTitle maxRem={3.75}>{home.heroTitle}</PageTitle>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/85 md:text-xl">
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

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-28">
        <Reveal>
          <SectionTitle>{home.introTitle}</SectionTitle>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sage">
            {home.introBody}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
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
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-28">
          <Reveal className="md:order-2">
            <SectionTitle>{home.expectTitle}</SectionTitle>
            <BulletList items={home.expect} />
          </Reveal>
          <Reveal delay={0.08} className="md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
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
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-28">
        <Reveal>
          <SectionTitle>{home.menuTitle}</SectionTitle>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sage">
            {home.menuBody}
          </p>
          <BulletList items={home.menuItems} />
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink">
            <Link
              href="/menu"
              className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              See the full seasonal menu
            </Link>
            {" · or just "}
            <a
              href={site.phoneHref}
              className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              call
            </a>
            {" and we'll walk you through it."}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
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
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-28">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone md:aspect-[5/6]">
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
            <SectionTitle>{home.patioTitle}</SectionTitle>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sage">
              {home.patioBody}
            </p>
          </Reveal>
        </div>
      </section>

      <MarqueeGallery />

      <section className="bg-forest text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionTitle className="text-paper">{home.visitTitle}</SectionTitle>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-paper/80">
              {home.visitBody}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-paper">
              {home.visitAddress}
            </p>
            <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-paper/75">
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
