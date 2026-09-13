"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <Link
          href="/"
          className="font-display text-[1.65rem] leading-none tracking-[0.04em] text-ink md:text-[1.9rem]"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[0.8rem] tracking-[0.16em] uppercase md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-ink ${
                pathname === item.href ? "text-ink" : "text-ash"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="inline-flex h-11 items-center rounded-full bg-espresso px-5 text-[0.72rem] tracking-[0.14em] text-ivory transition-colors hover:bg-copper"
          >
            Book a consult
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={site.phoneHref}
            className="inline-flex h-10 items-center rounded-full bg-espresso px-4 text-[0.7rem] tracking-[0.12em] uppercase text-ivory"
          >
            Call
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-ink/15 text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px bg-ink transition-transform ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span className={`h-px bg-ink ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px bg-ink transition-transform ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ink/10 bg-ivory px-5 py-8 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-4xl italic leading-none"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 inline-flex h-12 w-fit items-center rounded-full bg-espresso px-6 text-sm text-ivory"
            >
              Book a consult
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
