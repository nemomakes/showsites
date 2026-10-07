"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openPath === pathname;
  const home = pathname === "/";
  const overlay = home && !scrolled && !open;

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
          : "border-b border-ink/8 bg-paper/92 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className={`font-display text-[1.65rem] leading-none tracking-[-0.02em] md:text-[1.85rem] ${
            overlay ? "text-paper" : "text-ink"
          }`}
        >
          {site.name}
        </Link>

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-10 text-[0.72rem] tracking-[0.18em] uppercase md:flex ${
            overlay ? "text-paper/75" : "text-sage"
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`transition-colors ${
                overlay
                  ? "hover:text-paper"
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
            className={`inline-flex h-10 items-center rounded-full px-5 text-[0.68rem] tracking-[0.16em] transition-colors ${
              overlay
                ? "border border-paper/45 text-paper hover:bg-paper hover:text-forest"
                : "border border-ink/15 text-ink hover:bg-forest hover:text-paper"
            }`}
          >
            Call
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={site.phoneHref}
            className={`inline-flex h-10 items-center rounded-full px-4 text-[0.68rem] tracking-[0.16em] uppercase ${
              overlay
                ? "border border-paper/45 text-paper"
                : "bg-forest text-paper"
            }`}
          >
            Call
          </a>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center border ${
              overlay ? "border-paper/35" : "border-ink/15"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px transition-transform ${
                  overlay ? "bg-paper" : "bg-ink"
                } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px ${overlay ? "bg-paper" : "bg-ink"} ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px transition-transform ${
                  overlay ? "bg-paper" : "bg-ink"
                } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ink/10 bg-paper px-5 py-10 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="font-display text-4xl font-medium leading-none"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 inline-flex h-12 w-fit items-center rounded-full border border-ink/15 px-6 text-sm"
            >
              Call
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
