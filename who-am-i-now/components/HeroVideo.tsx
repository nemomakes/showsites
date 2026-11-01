"use client";
import { useEffect, useRef, useState } from "react";

/* Looping hero clip layered over the still (the still stays the LCP element and the reduced-motion fallback).
   Sources attach only after idle, never under reduced motion or Save-Data; fades in once actually playing. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mq.matches || conn?.saveData) return;
    const start = () => setOn(true);
    const idle = "requestIdleCallback" in window;
    const id = idle ? requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 600);
    const onChange = () => { if (mq.matches) { ref.current?.pause(); setPlaying(false); setOn(false); } };
    mq.addEventListener("change", onChange);
    return () => { mq.removeEventListener("change", onChange); if (idle) cancelIdleCallback(id); else clearTimeout(id); };
  }, []);
  useEffect(() => { if (on) ref.current?.play().catch(() => {}); }, [on]);
  if (!on) return null;
  return (
    <video ref={ref} className={`hero-video${playing ? " is-playing" : ""}`} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} disablePictureInPicture onPlaying={() => setPlaying(true)}>
      <source src="/hero/hero.webm" type="video/webm" />
      <source src="/hero/hero.mp4" type="video/mp4" />
    </video>
  );
}
