"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type PeekPage = { img: StaticImageData; large: string; alt: string };

export default function PeekGallery({ pages }: { pages: PeekPage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnRef = useRef<HTMLElement | null>(null);
  const down = useRef<{ x: number; y: number } | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const n = pages.length;

  const openAt = (i: number, el: HTMLElement) => {
    returnRef.current = el;
    setOpen(i);
  };
  const close = useCallback(() => {
    setShown(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setOpen(null);
      returnRef.current?.focus();
    }, reduce ? 0 : 200);
  }, []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const sb = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (sb > 0) body.style.paddingRight = `${sb}px`;
    const raf = requestAnimationFrame(() => setShown(true));
    closeRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
    // run only on open/close transitions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  // preload neighbours once the viewer is open
  useEffect(() => {
    if (open === null) return;
    [1, -1].forEach((d) => { const im = new window.Image(); im.src = pages[(open + d + n) % n].large; });
  }, [open, pages, n]);

  const pg = open === null ? null : pages[open];

  return (
    <>
      <ol className="peek-row">
        {pages.map((p, i) => (
          <li key={i} className="peek-page" data-reveal style={{ ["--d" as string]: `${i * 90}ms`, ["--i" as string]: i }}>
            <button
              type="button"
              className="peek-paper peek-btn"
              aria-label={`View larger: ${p.alt}`}
              aria-haspopup="dialog"
              onPointerDown={(e) => { down.current = { x: e.clientX, y: e.clientY }; }}
              onClick={(e) => {
                const d = down.current;
                down.current = null;
                if (d && e.detail > 0 && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8) return;
                openAt(i, e.currentTarget);
              }}
            >
              <Image src={p.img} alt="" quality={80} sizes="(min-width: 760px) 250px, 68vw" draggable={false} />
            </button>
          </li>
        ))}
      </ol>

      {pg && open !== null && (
        <div
          ref={dialogRef}
          className={`lb${shown ? " is-on" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Workbook page ${open + 1} of ${n}`}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={(e) => { const t = e.touches[0]; swipe.current = { x: t.clientX, y: t.clientY }; }}
          onTouchEnd={(e) => {
            const s = swipe.current; swipe.current = null;
            if (!s) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - s.x, dy = t.clientY - s.y;
            if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
          }}
        >
          <figure className="lb-fig" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={pg.large} className="lb-img" src={pg.large} alt={pg.alt} width={1082} height={1400} decoding="async" />
            <figcaption className="lb-count" aria-live="polite">{open + 1} / {n}</figcaption>
          </figure>
          <button ref={closeRef} type="button" className="lb-btn lb-close" aria-label="Close" onClick={close}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <button type="button" className="lb-btn lb-prev" aria-label="Previous page" onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="lb-btn lb-next" aria-label="Next page" onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
