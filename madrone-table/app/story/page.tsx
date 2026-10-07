import type { Metadata } from "next";
import Image from "next/image";
import { BulletList } from "@/components/BulletList";
import { Cta } from "@/components/Cta";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { site, story } from "@/lib/site";

export const metadata: Metadata = {
  title: "Story",
  description: story.sub,
};

export default function StoryPage() {
  return (
    <>
      <PageIntro title={story.title}>{story.sub}</PageIntro>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/9]">
            <Image
              src="/images/room.jpg"
              alt="An empty wood table set before dinner service"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-24">
        <Reveal className="md:col-span-4">
          <SectionTitle>{story.originTitle}</SectionTitle>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-8">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink">
            {story.origin.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image
                src="/images/pass.jpg"
                alt="Hands finishing a plate with herbs"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>{story.cookTitle}</SectionTitle>
            <BulletList items={story.cook} />
          </Reveal>
        </div>
      </section>

      <section className="bg-forest text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <SectionTitle>{story.reserveTitle}</SectionTitle>
            <p className="mt-5 max-w-xl text-pretty text-lg text-paper/80">
              {story.reserveBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={site.phoneHref} tone="on-dark">
                Call
              </Cta>
              <Cta href={site.emailHref} tone="on-dark-ghost">
                Email
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
