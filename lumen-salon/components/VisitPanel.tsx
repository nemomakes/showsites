import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function VisitPanel({ tone = "espresso" }: { tone?: "espresso" | "linen" }) {
  const dark = tone === "espresso";

  return (
    <section
      className={dark ? "bg-espresso text-ivory" : "bg-linen text-ink"}
      aria-labelledby="visit-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <Reveal>
          <h2
            id="visit-heading"
            className="font-display text-4xl font-medium leading-[1.08] md:text-5xl"
          >
            Come in when we’re open.
          </h2>
          <p className={`mt-5 max-w-md text-pretty ${dark ? "text-ivory/75" : "text-ink/80"}`}>
            Tue–Fri 9–6, Sat 9–4, closed Sun–Mon. Last color chair 4:00
            weekdays / 2:30 Sat. Evening consults by request. No online
            checkout — call to book, or email if Saturday is full.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className={`inline-flex h-12 items-center rounded-full px-6 text-sm ${
                dark
                  ? "bg-ivory text-espresso hover:bg-linen"
                  : "bg-espresso text-ivory hover:bg-copper"
              }`}
            >
              Call
            </a>
            <a
              href={site.emailHref}
              className={`inline-flex h-12 items-center rounded-full border px-6 text-sm ${
                dark
                  ? "border-ivory/30 text-ivory hover:border-ivory"
                  : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              Email
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex h-12 items-center rounded-full border px-6 text-sm ${
                dark
                  ? "border-ivory/30 text-ivory hover:border-ivory"
                  : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              Open map
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="font-display text-4xl font-medium leading-[1.08] md:text-5xl">
            Downtown on Locust Street.
          </h3>
          <p className={`mt-5 max-w-md text-pretty ${dark ? "text-ivory/75" : "text-ink/80"}`}>
            1632 Locust Street — street parking on Locust; plaza garage one
            block over.
          </p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className={`mt-8 inline-flex h-12 items-center rounded-full border px-6 text-sm ${
              dark
                ? "border-ivory/30 text-ivory hover:border-ivory"
                : "border-ink/20 text-ink hover:border-ink"
            }`}
          >
            Get directions
          </a>
        </Reveal>
      </div>
    </section>
  );
}
