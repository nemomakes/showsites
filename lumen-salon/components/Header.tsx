"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";
  const overlay = home && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overlay
          ? "border-transparent bg-transparent"
          : "border-b border-ink/8 bg-ivory/92 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className={`font-display text-[1.45rem] leading-none tracking-[0.18em] md:text-[1.6rem] ${
            overlay ? "text-ivory" : "text-ink"
          }`}
        >
          {site.name}
        </Link>

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-10 text-[0.72rem] tracking-[0.22em] uppercase md:flex ${
            overlay ? "text-ivory/75" : "text-ash"
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                overlay
                  ? "hover:text-ivory"
                  : pathname === item.href
                    ? "text-ink"
                    : "hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className={`inline-flex h-10 items-center rounded-full px-5 text-[0.68rem] tracking-[0.18em] transition-colors ${
              overlay
                ? "border border-ivory/45 text-ivory hover:bg-ivory hover:text-espresso"
                : "border border-ink/15 text-ink hover:bg-espresso hover:text-ivory"
            }`}
          >
            Book a consult
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={site.phoneHref}
            className={`inline-flex h-10 items-center rounded-full px-4 text-[0.68rem] tracking-[0.16em] uppercase ${
              overlay
                ? "border border-ivory/45 text-ivory"
                : "bg-espresso text-ivory"
            }`}
          >
            Call
          </a>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center border ${
              overlay ? "border-ivory/35" : "border-ink/15"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px transition-transform ${
                  overlay ? "bg-ivory" : "bg-ink"
                } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px ${overlay ? "bg-ivory" : "bg-ink"} ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px transition-transform ${
                  overlay ? "bg-ivory" : "bg-ink"
                } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ink/10 bg-ivory px-5 py-10 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-4xl font-medium leading-none"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 inline-flex h-12 w-fit items-center rounded-full border border-ink/15 px-6 text-sm tracking-[0.12em] uppercase"
            >
              Book a consult
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
