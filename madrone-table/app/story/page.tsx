import type { Metadata } from "next";
import Image from "next/image";
import { BulletList } from "@/components/BulletList";
import { Cta } from "@/components/Cta";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { SwayCard } from "@/components/SwayCard";
import { site, story } from "@/lib/site";

export const metadata: Metadata = {
  title: "Story",
  description: story.sub,
};

export default function StoryPage() {
  return (
    <>
      <PageIntro band title={story.title}>
        {story.sub}
      </PageIntro>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone md:aspect-[21/9]">
            <Image
              src="/images/hall.jpg"
              alt="A wood dining set in an empty restaurant room"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:gap-12 md:px-10 md:py-24">
        <SwayCard index={0} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid gap-8 px-6 py-10 md:grid-cols-12 md:gap-12 md:px-12 md:py-16">
            <Reveal className="md:col-span-4">
              <SectionTitle>{story.originTitle}</SectionTitle>
            </Reveal>
            <Reveal delay={0.06} className="md:col-span-8">
              <div className="space-y-5">
                {story.origin.map((paragraph) => (
                  <p key={paragraph} className="copy text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard index={1} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] bg-stone md:h-full md:aspect-auto md:min-h-[28rem]">
                <Image
                  src="/images/pass.jpg"
                  alt="Hands finishing a plate with herbs"
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="px-6 py-10 md:px-12 md:py-16">
                <SectionTitle>{story.cookTitle}</SectionTitle>
                <BulletList items={story.cook} />
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard
          index={2}
          className="overflow-hidden rounded-[1.75rem] bg-forest text-paper"
        >
          <div className="px-6 py-10 md:px-12 md:py-16">
            <Reveal>
              <SectionTitle className="text-paper">{story.reserveTitle}</SectionTitle>
              <p className="mt-6 max-w-2xl text-pretty text-xl font-semibold leading-snug text-paper md:text-2xl">
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
        </SwayCard>
      </div>
    </>
  );
}
