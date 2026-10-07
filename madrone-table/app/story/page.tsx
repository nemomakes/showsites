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

      <div className="relative h-[50vh] min-h-[14rem] w-full overflow-hidden bg-stone">
        <Image
          src="/images/hall.jpg"
          alt="A wood dining set in an empty restaurant room"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-8 px-5 py-16 md:gap-10 md:px-8 md:py-24 xl:px-12">
        <SwayCard index={0} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] bg-stone md:h-full md:aspect-auto md:min-h-[28rem]">
                <Image
                  src="/images/chef-luke.jpg"
                  alt="Chef Luke Park plating a salmon dish at the pass"
                  fill
                  loading="eager"
                  className="object-cover object-[center_42%]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="px-6 py-10 md:px-8 md:py-14 xl:px-12 xl:py-16">
                <SectionTitle card>{story.originTitle}</SectionTitle>
                <div className="mt-5 space-y-5">
                  {story.origin.map((paragraph) => (
                    <p key={paragraph} className="card-copy text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard index={1} className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="grid items-stretch md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
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
              <div className="px-6 py-10 md:px-8 md:py-14 xl:px-12 xl:py-16">
                <SectionTitle card>{story.cookTitle}</SectionTitle>
                <BulletList items={story.cook} />
              </div>
            </Reveal>
          </div>
        </SwayCard>

        <SwayCard
          index={2}
          className="overflow-hidden rounded-[1.75rem] bg-forest text-paper"
        >
          <div className="px-6 py-10 md:px-8 md:py-14 xl:px-12 xl:py-16">
            <Reveal>
              <SectionTitle card className="text-paper">{story.reserveTitle}</SectionTitle>
              <p className="card-copy on-dark mt-5 max-w-3xl text-pretty">
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
