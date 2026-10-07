import type { Metadata } from "next";
import Image from "next/image";
import { Cta } from "@/components/Cta";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { menu, menuIntro, menuNote, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seasonal menu",
  description: menuIntro,
};

export default function MenuPage() {
  return (
    <>
      <PageIntro title="Seasonal menu.">{menuIntro}</PageIntro>

      <div className="mx-auto mb-6 max-w-6xl px-5 md:mb-10 md:px-8">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone sm:aspect-[16/10]">
            <Image
              src="/images/plate.jpg"
              alt="Sliced beets and greens on a white ceramic plate"
              fill
              className="object-cover object-[center_45%]"
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <nav aria-label="Menu sections" className="flex flex-wrap gap-3">
            {menu.map((section) => (
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

      {menu.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8 md:py-16"
        >
          <div className="grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <SectionTitle>{section.title}</SectionTitle>
            </Reveal>
            <Reveal delay={0.06} className="md:col-span-8">
              <ul className="list-disc space-y-4 pl-5 marker:text-madrone">
                {section.items.map((item) => (
                  <li key={item.name} className="text-pretty leading-relaxed">
                    <span className="font-medium text-ink">{item.name}</span>
                    <span className="text-sage"> — {item.note} — </span>
                    <span className="whitespace-nowrap font-medium text-ink">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink">
              {menuNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={site.phoneHref}>Call to reserve</Cta>
              <Cta href={site.emailHref} tone="ghost">
                Email the desk
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
