import Image from "next/image";
import Link from "next/link";
import { VisitPanel } from "@/components/VisitPanel";
import { featured, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-espresso text-ivory">
        <Image
          src="/images/hero.jpg"
          alt="Editorial portrait of a woman with auburn hair and a precise fringe"
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/40 to-espresso/15" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24">
          <p className="eyebrow text-ivory/70">{site.tagline}</p>
          <h1 className="mt-5 font-display text-[clamp(5rem,20vw,9.5rem)] italic leading-[0.82] tracking-[-0.03em]">
            Lumen
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg text-ivory/85 md:text-xl">
            Lived-in color and precision cuts — a calm chair on Locust Street,
            for the hair you already have.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center rounded-full bg-ivory px-6 text-sm text-espresso hover:bg-linen"
            >
              Call to book
            </a>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-full border border-ivory/35 px-6 text-sm text-ivory hover:border-ivory"
            >
              See services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <p className="eyebrow text-ash md:col-span-3">On Locust Street</p>
          <div className="md:col-span-9">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.08] text-pretty italic md:text-6xl">
              We do not do a new you. We do the hair you will keep living in.
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/80">
              Lumen is a small salon in downtown Walnut Creek. Color is built
              slowly. Cuts are measured twice. Hospitality is a glass of water
              and a conversation that does not rush you toward a trend.
            </p>
            <Link
              href="/story"
              className="mt-8 inline-flex h-12 items-center text-sm underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
            >
              Read the story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-linen">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-ash">The work</p>
              <h2 className="mt-3 font-display text-4xl italic md:text-5xl">
                What we keep on the chair
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
            >
              Full services
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {featured.map((item) => (
              <article key={item.name}>
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl italic">{item.name}</h3>
                <p className="mt-2 text-pretty text-ash">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone md:aspect-[5/6]">
          <Image
            src="/images/wash.jpg"
            alt="A guest resting at the wash bowl during a shampoo"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </div>
        <div>
          <p className="eyebrow text-ash">How we work</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] italic md:text-5xl">
            A consult is a conversation, not a pitch.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/80">
            New color guests start here. Bring a photo if you want. We will
            tell you what the hair can hold this visit, and what should wait.
            There is no checkout on this site — call {site.phone}, or write{" "}
            <a href={site.emailHref} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-ink/80">
            Tuesday through Saturday. Closed Sunday and Monday so the chairs —
            and the people in them — can rest.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] bg-stone">
          <Image
            src="/images/interior.jpg"
            alt="A quiet row of salon chairs and mirrors in black and white"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="relative aspect-[4/3] bg-stone">
          <Image
            src="/images/waves.jpg"
            alt="Dark hair being shaped with a curling iron"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

      <VisitPanel />
    </>
  );
}
