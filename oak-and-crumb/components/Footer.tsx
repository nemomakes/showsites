import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-moss text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-4xl leading-none md:text-5xl">
            {site.name}
          </p>
          <p className="mt-5 max-w-sm text-pretty text-cream/80">
            A small bakery on North Main. Come in. Say hello. Take something
            warm home.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-cream/55">Visit</p>
          <p className="mt-3 text-pretty">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </p>
          <a
            href={site.mapsUrl}
            className="mt-3 inline-block underline decoration-cream/35 underline-offset-4 transition-colors hover:decoration-cream"
            target="_blank"
            rel="noreferrer"
          >
            Open map
          </a>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-cream/55">Hours</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/85">
            {site.hours.map((row) => (
              <li key={row.days}>
                <span className="block text-cream/60">{row.days}</span>
                {row.time}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-cream/55">Talk to us</p>
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
              <Link key={item.href} href={item.href} className="text-cream/75 hover:text-cream">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-cream/45 md:px-8">
          Fictional neighborhood bakery — a Nemomakes showsite demo. Photos via
          Unsplash and Pexels.
        </p>
      </div>
    </footer>
  );
}
