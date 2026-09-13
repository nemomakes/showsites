import Image from "next/image";
import Link from "next/link";
import { HeroMedia } from "@/components/HeroMedia";
import { Marquee } from "@/components/Marquee";
import { featured, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-bark text-cream">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/80 via-bark/25 to-bark/30" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="eyebrow text-cream/75">{site.tagline}</p>
          <h1 className="mt-4 font-display text-[clamp(4.75rem,22vw,9.5rem)] leading-[0.78] tracking-[-0.04em]">
            oak
            <span className="block">
              <span className="italic text-gold">&amp;</span> crumb
            </span>
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg text-cream/85 md:text-xl">
            Pastries, sourdough, and a quiet cup — baked for Walnut Creek,
            not for a feed.
          </p>
        </div>
      </section>

      <Marquee />

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <p className="eyebrow text-muted md:col-span-3">On North Main</p>
          <div className="md:col-span-9">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] text-pretty md:text-6xl">
              We bake for the people who walk these streets.
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink">
              Oak is the live oak in the courtyard. Crumb is what we chase in
              every loaf. Maya and Eli opened the shop in a former shoe-repair
              on North Main in 2019, and we still mix the country dough the
              night before so it can take its time.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex h-12 items-center text-sm underline decoration-bark/25 underline-offset-4 hover:decoration-bark"
            >
              Read the story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-muted">From the case</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                Our essentials
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-sm underline decoration-bark/25 underline-offset-4 hover:decoration-bark"
            >
              See the full menu
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {featured.map((item) => (
              <article key={item.name}>
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl">{item.name}</h3>
                <p className="mt-2 text-pretty text-muted">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand md:aspect-[5/6]">
          <Image
            src="/images/bakery-counter.jpg"
            alt="A bakery case of loaves and baguettes behind glass"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </div>
        <div>
          <p className="eyebrow text-muted">In the shop</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] md:text-5xl">
            Come in when you like. Stay as long as you want.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink">
            The door opens onto the case — bread on the left, pastry on the
            right, coffee at the far end. Take your time. Ask what’s just out of
            the oven. We’ll wrap a croissant in paper, slice a country loaf if
            you’re heading home, or pour a cup to drink at the window.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-ink">
            Nobody is in a hurry here. If you need a loaf held, call ahead. If
            you just wandered in, we’ll find you something good. Then you’re
            back on North Main with a warm bag and the rest of the morning still
            ahead. The{" "}
            <Link href="/menu" className="underline underline-offset-4">
              full board
            </Link>{" "}
            is on the menu page, if you want to look before you come.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] bg-sand">
          <Image
            src="/images/seeded-loaf.jpg"
            alt="A seeded loaf, half-sliced, on oats and flour"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="relative aspect-[4/3] bg-sand">
          <Image
            src="/images/sandwich-loaves.jpg"
            alt="Two scored sandwich loaves on a dark surface"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

    </>
  );
}
