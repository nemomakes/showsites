import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Lumen Salon at 1632 Locust Street, Walnut Creek, CA. Hours, phone, email, and map.",
};

export default function VisitPage() {
  return (
    <>
      <PageIntro eyebrow="Walnut Creek" title="Come sit a minute.">
        Downtown, on Locust Street, a short walk from Broadway Plaza. Street
        parking on Locust and the plaza garage a block over. We are easiest to
        reach by phone — or with a short email if Saturday is already spoken
        for.
      </PageIntro>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone">
            <Image
              src="/images/chair.jpg"
              alt="A leather salon chair waiting in a quiet room"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <Reveal>
          <p className="eyebrow text-ash">Address</p>
          <p className="mt-4 font-display text-3xl font-medium leading-snug md:text-4xl">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </p>
          <p className="mt-4 text-ash">
            East Bay · downtown Walnut Creek · look for the cream awning and
            the fig in the window.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-espresso px-6 text-sm text-ivory hover:bg-copper"
            >
              Open in Maps
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-sm hover:border-ink"
            >
              Call the salon
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-10">
          <div>
            <p className="eyebrow text-ash">Hours</p>
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
            <p className="eyebrow text-ash">Talk to us</p>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a href={site.phoneHref} className="hover:underline">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="hover:underline">
                  {site.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 max-w-md text-pretty text-ash">
              Consults, holds, and event notes all go to the same desk. We
              read email in the afternoon, after the last gloss.
            </p>
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
              A map, if you want one.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-ivory/75">
              If you hit the bookstore, you went one door too far. If you see
              the fig, you are here.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="block bg-ivory/8 p-8 transition-colors hover:bg-ivory/12"
            >
              <p className="eyebrow text-ivory/45">Google Maps</p>
              <p className="mt-3 font-display text-2xl font-medium">
                {site.address.line}
              </p>
              <p className="mt-4 text-sm text-ivory/65">Opens in a new tab →</p>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
