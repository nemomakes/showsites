import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Oak & Crumb Bakery at 1418 N Main Street, Walnut Creek, CA. Hours, phone, email, and map.",
};

export default function ContactPage() {
  return (
    <>
      <Reveal className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:px-8 md:pt-20">
        <p className="eyebrow text-muted">Walnut Creek</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
          Come sit a minute.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink">
          Downtown, on North Main, a short walk from the plaza. Two small
          tables inside, a bench under the oak. We are easiest to reach in
          person — or with a short call.
        </p>
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="relative aspect-[16/10] overflow-hidden bg-sand">
          <Image
            src="/images/coffee.jpg"
            alt="Friends toasting with two lattes and an iced coffee"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </Reveal>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <Reveal>
          <p className="eyebrow text-muted">Address</p>
          <p className="mt-4 font-display text-3xl leading-snug md:text-4xl">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </p>
          <p className="mt-4 text-muted">
            East Bay · downtown Walnut Creek · street parking on Main and the
            plaza garage a block over.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-rust px-6 text-sm text-cream hover:bg-bark"
            >
              Open in Maps
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center rounded-full border border-bark/20 px-6 text-sm hover:border-bark"
            >
              Call the shop
            </a>
          </div>
        </Reveal>

        <Reveal className="grid gap-10" delay={0.08}>
          <div>
            <p className="eyebrow text-muted">Hours</p>
            <ul className="mt-4 divide-y divide-bark/10">
              {site.hours.map((row) => (
                <li
                  key={row.days}
                  className="flex items-baseline justify-between gap-6 py-3"
                >
                  <span>{row.days}</span>
                  <span className="text-muted">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{site.hoursNote}</p>
          </div>

          <div>
            <p className="eyebrow text-muted">Talk to us</p>
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
            <p className="mt-4 max-w-md text-pretty text-muted">
              Loaf holds, cake notes, and wholesale questions all go to the
              same inbox. We read it in the afternoon, after the second bake.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-moss text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-20">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">
              A map, if you want one.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-cream/80">
              Look for the cream awning and the oak in the courtyard. If you
              hit the bookstore, you went one door too far.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="block rounded-sm bg-cream/10 p-8 transition-colors hover:bg-cream/15"
          >
            <p className="eyebrow text-cream/55">Google Maps</p>
            <p className="mt-3 font-display text-2xl">{site.address.line}</p>
            <p className="mt-4 text-sm text-cream/70">Opens in a new tab →</p>
          </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
