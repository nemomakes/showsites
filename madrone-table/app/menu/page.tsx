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
      <PageIntro band title="Seasonal menu.">
        {menuIntro}
      </PageIntro>

      <div className="mx-auto w-full max-w-[100rem] px-5 pt-8 md:px-8 md:pt-10 xl:px-12">
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

      <div className="relative mt-8 h-[50vh] min-h-[14rem] w-full overflow-hidden bg-stone md:mt-10">
        <Image
          src="/images/plate.jpg"
          alt="Sliced beets and greens on a white ceramic plate"
          fill
          className="object-cover object-[center_45%]"
          sizes="100vw"
          priority
        />
      </div>

      {menu.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto w-full max-w-[100rem] scroll-mt-28 px-5 py-12 md:px-8 md:py-16 xl:px-12"
        >
          <div className="grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <SectionTitle>{section.title}</SectionTitle>
            </Reveal>
            <Reveal delay={0.06} className="md:col-span-9">
              <ul className="menu-list list-disc space-y-5 pl-6 text-pretty marker:text-madrone">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <span> — {item.note} — </span>
                    <span className="whitespace-nowrap">{item.price}</span>
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
            <p className="copy max-w-3xl text-pretty">{menuNote}</p>
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
