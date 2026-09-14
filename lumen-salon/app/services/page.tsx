import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Prices are a guide. Length, density, and color history change chair time. Nothing checks out online — call to book a consult, or email if you already know what you need.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Services and what to book.">
        Prices are a guide. Length, density, and color history change chair
        time. Nothing checks out online — call to book a consult, or email if
        you already know what you need.
      </PageIntro>

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
            <p className="eyebrow text-ash">Start here</p>
            <h2 className="mt-5 font-display text-4xl font-medium md:text-5xl">
              New to Lumen? Book a consult.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-ink/80">
              Thirty minutes: we look at your hair and history, talk goals, and
              leave you with a plan you can live with. Credited to the ticket if
              you book same day. Otherwise you leave with a clear note — not a
              hard sell.
            </p>
            <p className="mt-5 font-display text-2xl font-medium">
              $50{" "}
              <span className="text-lg text-ash">
                (credited if you book same day)
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
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
        className="mx-auto grid max-w-6xl gap-4 px-5 pb-6 pt-8 md:grid-cols-3 md:px-8"
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
              <h2 className="font-display text-4xl font-medium">{section.title}</h2>
              {section.intro ? (
                <p className="mt-4 max-w-sm text-pretty text-ash">
                  {section.intro}
                </p>
              ) : null}
              {section.note ? (
                <p className="mt-4 max-w-sm text-sm text-ash">{section.note}</p>
              ) : null}
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
                    {item.note ? (
                      <p className="mt-1 max-w-xl text-pretty text-sm text-ash">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-display text-xl font-medium text-ink">
                    {item.price}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      <section className="bg-linen">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h2 className="font-display text-4xl font-medium md:text-5xl">
              How to book
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ink/80">
              Call {site.phone} or email {site.email}. Evening consults by
              request. We read email in the afternoon after the last gloss.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
