import type { Metadata } from "next";
import Image from "next/image";
import { Cta } from "@/components/Cta";
import { PageIntro } from "@/components/PageIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { site, visit } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description: visit.sub,
};

export default function VisitPage() {
  return (
    <>
      <PageIntro title={visit.title}>{visit.sub}</PageIntro>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone">
            <iframe
              title="Map of Madrone Table at 2104 School Street, Lafayette"
              src={site.mapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <Reveal>
          <SectionTitle>{visit.findTitle}</SectionTitle>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sage">
            {visit.findBody}
          </p>
          <p className="mt-5 font-display text-2xl font-medium leading-snug md:text-3xl">
            {site.address.line}
          </p>
          <div className="mt-8">
            <Cta href={site.mapsUrl} external>
              Open map
            </Cta>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:pt-2">
          <p className="text-pretty text-lg leading-relaxed text-ink">
            {site.hoursLine}
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-sage">
            {site.hoursNote}
          </p>
        </Reveal>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <Reveal>
            <SectionTitle>{visit.reserveTitle}</SectionTitle>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sage">
              {visit.reserveBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={site.phoneHref}>Call</Cta>
              <Cta href={site.emailHref} tone="ghost">
                Email
              </Cta>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-ink">
              <a href={site.phoneHref} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                {site.phone}
              </a>
              {" · "}
              <a href={site.emailHref} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                {site.email}
              </a>
            </p>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-sage">
              {visit.talkBody}
            </p>
          </Reveal>
        </div>
      </section>

      <RevealGroup className="grid md:grid-cols-2" stagger={0.1}>
        <RevealItem>
          <div className="relative aspect-[4/3] bg-stone">
            <Image
              src="/images/patio.jpg"
              alt="Empty outdoor tables under string lights at dusk"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </RevealItem>
        <RevealItem>
          <div className="relative aspect-[4/3] bg-stone">
            <Image
              src="/images/produce.jpg"
              alt="Greens, herbs, and tomatoes on a prep board"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </RevealItem>
      </RevealGroup>
    </>
  );
}
