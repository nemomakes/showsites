import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Lived-in color, precision cuts, blowouts, and treatments at Lumen Salon in Walnut Creek. Call to book — no online checkout.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <RevealGroup mode="load" stagger={0.08}>
          <RevealItem>
            <p className="eyebrow text-ash">The menu</p>
          </RevealItem>
          <RevealItem distance={16}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] italic md:text-7xl">
              Services
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/80">
              Prices are a guide. Hair length, density, and history change the
              chair time. Nothing here checks out online — call {site.phone} to
              book a consult, or write if you already know who you want.
            </p>
            <p className="mt-4 text-sm text-ash">{site.hoursNote}</p>
          </RevealItem>
        </RevealGroup>
      </header>

      <div className="mx-auto mb-6 max-w-6xl px-5 md:mb-10 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/9]">
            <Image
              src="/images/waves.jpg"
              alt="Dark hair being shaped with a curling iron"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <Reveal>
          <nav aria-label="Service sections" className="flex flex-wrap gap-3">
            {services.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex h-10 items-center rounded-full border border-ink/15 px-4 text-sm text-ink hover:border-ink"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </Reveal>
      </div>

      <RevealGroup
        className="mx-auto grid max-w-6xl gap-4 px-5 pb-6 md:grid-cols-3 md:px-8"
        stagger={0.1}
      >
        <RevealItem>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone">
            <Image
              src="/images/tools-bench.jpg"
              alt="Shears and a round brush at rest on a wood bench"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
        </RevealItem>
        <RevealItem>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone">
            <Image
              src="/images/scissors.jpg"
              alt="A row of salon shears hanging against walnut"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
        </RevealItem>
        <RevealItem>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone">
            <Image
              src="/images/rinse.jpg"
              alt="Hair being rinsed at the bowl after color"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
        </RevealItem>
      </RevealGroup>

      {services.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8 md:py-16"
        >
          <div className="grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <h2 className="font-display text-4xl italic">{section.title}</h2>
              <p className="mt-4 max-w-sm text-pretty text-ash">
                {section.intro}
              </p>
            </Reveal>
            <RevealGroup className="divide-y divide-ink/10 md:col-span-8" stagger={0.06}>
              {section.items.map((item) => (
                <RevealItem
                  key={item.name}
                  as="div"
                  className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
                >
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="mt-1 max-w-xl text-pretty text-sm text-ash">
                      {item.note}
                    </p>
                  </div>
                  <p className="font-display text-xl italic text-ink">
                    {item.price}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      <section className="bg-linen">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image
                src="/images/extensions.jpg"
                alt="Curled hair being prepared during an extension appointment"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow text-ash">New guests</p>
            <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
              Start with thirty minutes.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-ink/80">
              A consult is a look at the hair, a look at the history, and a
              plan you can live with. If you book the service, those thirty
              minutes come off the ticket. If you need time to think, you
              leave with a note — not a hard sell.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex h-12 items-center rounded-full bg-espresso px-6 text-sm text-ivory hover:bg-copper"
              >
                Call to book
              </a>
              <a
                href={site.emailHref}
                className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-sm hover:border-ink"
              >
                Email the desk
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
