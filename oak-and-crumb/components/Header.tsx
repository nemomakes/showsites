import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-bark/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 md:h-[4.5rem] md:flex-nowrap md:px-8 md:py-0">
        <Link
          href="/"
          className="font-display text-[1.55rem] leading-none tracking-tight text-bark md:text-[1.85rem]"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-4 text-sm md:gap-8"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink transition-colors hover:text-bark"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex h-10 items-center rounded-full bg-rust px-4 text-cream transition-colors hover:bg-bark md:h-11 md:px-5"
          >
            Come by
          </Link>
        </nav>
      </div>
    </header>
  );
}
