import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-5xl font-medium leading-none tracking-[-0.03em]">
            {site.name}
          </p>
          <p className="mt-5 max-w-sm text-pretty text-paper/75">
            {site.tagline}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-paper/45">Visit</p>
          <p className="mt-3 text-pretty">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </p>
          <a
            href={site.mapsUrl}
            className="mt-3 inline-block underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
            target="_blank"
            rel="noreferrer"
          >
            Open map
          </a>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-paper/45">Hours</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            {site.hours.map((row) => (
              <li key={row.days}>
                <span className="block text-paper/50">{row.days}</span>
                {row.time}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-paper/45">Talk to us</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.phoneHref} className="hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
          <nav aria-label="Footer" className="mt-6 flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-paper/70 hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-paper/40 md:px-8">
          Fictional neighborhood restaurant — a Nemomakes showsite demo. Photos
          via Unsplash and Pexels.
        </p>
      </div>
    </footer>
  );
}
