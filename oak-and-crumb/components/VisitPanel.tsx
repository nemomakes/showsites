import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function VisitPanel({ tone = "moss" }: { tone?: "moss" | "paper" }) {
  const moss = tone === "moss";

  return (
    <section
      className={moss ? "bg-moss text-cream" : "bg-paper text-bark"}
      aria-labelledby="visit-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <Reveal>
          <p className={`eyebrow ${moss ? "text-cream/55" : "text-muted"}`}>
            The shop
          </p>
          <h2
            id="visit-heading"
            className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl"
          >
            Come by when the door is open.
          </h2>
          <p className={`mt-5 max-w-md text-pretty ${moss ? "text-cream/80" : "text-ink"}`}>
            We don’t take online orders. Call if you want a loaf held, or just
            walk in — we bake through the morning and keep the coffee on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex h-12 items-center rounded-full px-6 text-sm ${
                moss
                  ? "bg-cream text-bark hover:bg-paper"
                  : "bg-rust text-cream hover:bg-bark"
              }`}
            >
              Get directions
            </a>
            <a
              href={site.phoneHref}
              className={`inline-flex h-12 items-center rounded-full border px-6 text-sm ${
                moss
                  ? "border-cream/30 text-cream hover:border-cream"
                  : "border-bark/20 text-bark hover:border-bark"
              }`}
            >
              Call {site.phone}
            </a>
          </div>
        </Reveal>

        <Reveal className="grid gap-8 sm:grid-cols-2" delay={0.08}>
          <div>
            <p className={`eyebrow ${moss ? "text-cream/55" : "text-muted"}`}>
              Address
            </p>
            <p className="mt-3 text-pretty">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </p>
            <p className={`mt-2 text-sm ${moss ? "text-cream/65" : "text-muted"}`}>
              Downtown Walnut Creek, a short walk from the plaza.
            </p>
          </div>
          <div>
            <p className={`eyebrow ${moss ? "text-cream/55" : "text-muted"}`}>
              Hours
            </p>
            <ul className="mt-3 space-y-2">
              {site.hours.map((row) => (
                <li key={row.days} className="flex flex-col">
                  <span className={moss ? "text-cream/65" : "text-muted"}>
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
