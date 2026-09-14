import type { Metadata } from "next";
import Image from "next/image";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { howWeWork, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Lumen is Noor Alami’s neighborhood salon — for color done carefully, and cuts that respect how your hair grows.",
};

export default function StoryPage() {
  return (
    <>
      <PageIntro oneLine title="A quieter chair on Locust Street.">
        Lumen is Noor Alami’s neighborhood salon — for color done carefully, and
        cuts that respect how your hair grows.
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
            From kitchen color to a Locust Street chair.
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-8">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/80">
            <p>
              Noor grew up in Oakland and learned color the long way — first on
              friends in a kitchen, then in busy San Francisco salons. After a
              decade of that pace, she wanted a room where the consult wasn’t a
              pitch, and the grow-out mattered as much as the reveal.
            </p>
            <p>
              Lumen opened in 2021 at 1632 Locust, in a former florist shop. The
              idea was simple: a small downtown Walnut Creek salon for lived-in
              color, honest advice, and time to talk — not a sales script.
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
            <h2 className="font-display text-4xl font-medium md:text-5xl">
              What you can expect.
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-pretty leading-relaxed text-ink/80 marker:text-copper">
              {howWeWork.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <MarqueeGallery />

      <section className="bg-espresso text-ivory">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h2 className="font-display text-4xl font-medium md:text-5xl">
              Ready to book a consult?
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-ivory/75">
              New color guests start with thirty minutes. Call or email — we’ll
              find a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex h-12 items-center rounded-full bg-ivory px-6 text-sm text-espresso hover:bg-linen"
              >
                Call
              </a>
              <a
                href={site.emailHref}
                className="inline-flex h-12 items-center rounded-full border border-ivory/40 px-6 text-sm text-ivory hover:border-ivory"
              >
                Email
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
