import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function VisitPanel({ tone = "espresso" }: { tone?: "espresso" | "linen" }) {
  const dark = tone === "espresso";

  return (
    <section
      className={dark ? "bg-espresso text-ivory" : "bg-linen text-ink"}
      aria-labelledby="visit-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <Reveal>
          <p className={`eyebrow ${dark ? "text-ivory/45" : "text-ash"}`}>
            The salon
          </p>
          <h2
            id="visit-heading"
            className="mt-5 font-display text-4xl font-medium leading-[1.08] md:text-5xl"
          >
            Come sit when the door is open.
          </h2>
          <p className={`mt-5 max-w-md text-pretty ${dark ? "text-ivory/75" : "text-ink/80"}`}>
            We do not take online checkout. Call to book a consult, or write if
            a Saturday is already full. New color guests start with a
            conversation — thirty minutes, applied to the service if you stay.
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
              Call to book
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
              Get directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className={`eyebrow ${dark ? "text-ivory/45" : "text-ash"}`}>
              Address
            </p>
            <p className="mt-3 text-pretty">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </p>
            <p className={`mt-2 text-sm ${dark ? "text-ivory/60" : "text-ash"}`}>
              Downtown Walnut Creek, a short walk from Broadway Plaza.
            </p>
          </div>
          <div>
            <p className={`eyebrow ${dark ? "text-ivory/45" : "text-ash"}`}>
              Hours
            </p>
            <ul className="mt-3 space-y-2">
              {site.hours.map((row) => (
                <li key={row.days} className="flex flex-col">
                  <span className={dark ? "text-ivory/55" : "text-ash"}>
                    {row.days}
                  </span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
