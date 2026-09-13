"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-bark/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <Link
          href="/"
          className="font-display text-[1.65rem] leading-none tracking-tight text-bark md:text-[1.85rem]"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide ${
                  active
                    ? "text-bark"
                    : "text-muted transition-colors hover:text-bark"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-full bg-rust px-5 text-sm text-cream transition-colors hover:bg-bark"
          >
            Come by
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 items-center rounded-full border border-bark/20 px-4 text-sm text-bark md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-bark/10 bg-cream px-5 py-8 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            <Link
              href="/"
              className="font-display py-3 text-4xl text-bark"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display py-3 text-4xl text-bark"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-6 text-sm text-muted"
            >
              {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
