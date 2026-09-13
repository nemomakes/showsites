import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { menu, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Bread, pastry, and coffee at Oak & Crumb in Walnut Creek. Informational menu — come in to order.",
};

export default function MenuPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <p className="eyebrow text-muted">The board</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
          Menu
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink">
          Prices are a guide. We bake through the day and sell out of the
          good stuff — especially Saturday. Nothing here checks out online.
          Come by, or call {site.phone} if you want something held.
        </p>
        <p className="mt-4 text-sm text-muted">{site.hoursNote}</p>
      </header>

      <div className="mx-auto mb-6 max-w-6xl px-5 md:mb-10 md:px-8">
        <div className="relative aspect-[16/9] overflow-hidden bg-sand md:aspect-[21/8]">
          <Image
            src="/images/bakery-counter.jpg"
            alt="Loaves and baguettes in a bakery display case"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <nav aria-label="Menu sections" className="flex flex-wrap gap-3">
          {menu.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex h-10 items-center rounded-full border border-bark/15 px-4 text-sm text-ink hover:border-bark"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      {menu.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8 md:py-16"
        >
          <div className="grid gap-8 border-t border-bark/10 pt-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="font-display text-4xl">{section.title}</h2>
              <p className="mt-4 max-w-sm text-pretty text-muted">
                {section.intro}
              </p>
            </div>
            <ul className="divide-y divide-bark/10 md:col-span-8">
              {section.items.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
                >
                  <div>
                    <p className="font-medium text-bark">{item.name}</p>
                    <p className="mt-1 max-w-xl text-pretty text-sm text-muted">
                      {item.note}
                    </p>
                  </div>
                  <p className="font-display text-xl text-bark">${item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src="/images/weekend-cake.jpg"
              alt="A baker piping an ombré buttercream cake on a white stand"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow text-muted">Special orders</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Cakes, loaves, and a note on the counter.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-ink">
              We take a few cakes a week — nothing taller than two tiers, nothing
              we can’t finish by Saturday. Email{" "}
              <a href={site.emailHref} className="underline underline-offset-4">
                {site.email}
              </a>{" "}
              with a date and what you have in mind. For catering trays,
              give us four days.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-rust px-6 text-sm text-cream hover:bg-bark"
            >
              Write or visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
