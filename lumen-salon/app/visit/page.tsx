import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description: "1632 Locust Street — a short walk from Broadway Plaza.",
};

export default function VisitPage() {
  return (
    <>
      <PageIntro oneLine title="Visit us in downtown Walnut Creek.">
        1632 Locust Street — a short walk from Broadway Plaza.
      </PageIntro>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone">
            <iframe
              title="Map of Lumen Salon at 1632 Locust Street, Walnut Creek"
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
          <p className="font-display text-3xl font-medium leading-snug md:text-4xl">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </p>
          <p className="mt-4 text-pretty text-ash">
            Street parking on Locust; Broadway Plaza garage about one block
            over.
          </p>
          <p className="mt-3 text-ash">{site.address.line}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-espresso px-6 text-sm text-ivory hover:bg-copper"
            >
              Open map
            </a>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-sm hover:border-ink"
            >
              Get directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-10">
          <div>
            <p className="text-pretty leading-relaxed text-ink/80">
              {site.hoursLine}
            </p>
            <ul className="mt-4 divide-y divide-ink/10">
              {site.hours.map((row) => (
                <li
                  key={row.days}
                  className="flex items-baseline justify-between gap-6 py-3"
                >
                  <span>{row.days}</span>
                  <span className="text-ash">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ash">{site.hoursNote}</p>
          </div>

          <div>
            <p className="text-pretty leading-relaxed text-ink/80">
              Phone is fastest. Email if Saturday is full — we reply in the
              afternoon.
            </p>
            <p className="mt-4 text-lg">
              {site.phone} · {site.email}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex h-12 items-center rounded-full bg-espresso px-6 text-sm text-ivory hover:bg-copper"
              >
                Call
              </a>
              <a
                href={site.emailHref}
                className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-sm hover:border-ink"
              >
                Email
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-sm hover:border-ink"
              >
                Open map
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <RevealGroup className="grid md:grid-cols-2" stagger={0.1}>
        <RevealItem>
          <div className="relative aspect-[4/3] bg-stone">
            <Image
              src="/images/blowdry.jpg"
              alt="A stylist finishing a blowout at the chair"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </RevealItem>
        <RevealItem>
          <div className="relative aspect-[4/3] bg-stone">
            <Image
              src="/images/shampoo.jpg"
              alt="A guest smiling during a shampoo"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </RevealItem>
      </RevealGroup>

      <section className="bg-espresso text-ivory">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-20">
          <Reveal>
            <h2 className="font-display text-4xl font-medium md:text-5xl">
              First time here?
            </h2>
            <p className="mt-4 max-w-md text-pretty text-ivory/75">
              Bring one or two reference photos if you have them. Wear a shirt
              you don’t mind near color. New color guests start with a consult
              so we can plan what this visit can hold — and what should wait.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center rounded-full bg-ivory px-6 text-sm text-espresso hover:bg-linen"
            >
              Call to book a consult
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
