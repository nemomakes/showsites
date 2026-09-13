"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const poster = "/images/hero-croissants.jpg";
const posterAlt =
  "Two golden butter croissants on dark slate, sugar falling through the air";

export function HeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlayVideo(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {playVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
        >
          <source src="/hero-sugar.mp4" type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
