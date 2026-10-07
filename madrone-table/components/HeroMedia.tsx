"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const HOLD_MS = 2000;
const FADE_MS = 1000;

/**
 * Still dining room, then a crossfade into the chef clip, then a crossfade
 * back during the clip's last second. The still is in the first paint; the
 * video sources are attached only after load, and never under reduced motion.
 */
export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const still = stillRef.current;
    if (!video || !still) return;

    video.muted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mountedAt = performance.now();
    let cancelled = false;
    let primed = false;
    let holdTimer = 0;
    let fadeTimer = 0;
    let cancelArm: (() => void) | undefined;

    const showStill = () => {
      still.style.opacity = "1";
    };
    const showClip = () => {
      still.style.opacity = "0";
    };
    const clearTimers = () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(fadeTimer);
    };

    const playFromStart = async () => {
      video.muted = true;
      video.currentTime = 0;
      try {
        await video.play();
      } catch {
        showStill();
        return;
      }
      if (cancelled) return;
      showClip();
      const duration = video.duration;
      if (Number.isFinite(duration) && duration * 1000 > FADE_MS) {
        const wait = Math.max(0, duration * 1000 - FADE_MS - video.currentTime * 1000);
        fadeTimer = window.setTimeout(showStill, wait);
      }
    };

    const holdThenPlay = (ms: number) => {
      showStill();
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(() => {
        if (!cancelled) void playFromStart();
      }, ms);
    };

    const onEnded = () => {
      window.clearTimeout(fadeTimer);
      video.pause();
      holdThenPlay(HOLD_MS);
    };

    const onCanPlay = () => {
      if (primed || cancelled || reduce.matches) return;
      primed = true;
      video.muted = true;
      const elapsed = performance.now() - mountedAt;
      const wait = Math.max(0, HOLD_MS - elapsed);
      video
        .play()
        .then(() => {
          video.pause();
          video.currentTime = 0;
          if (!cancelled) holdThenPlay(wait);
        })
        .catch(() => {
          if (!cancelled) holdThenPlay(wait);
        });
    };

    const stopForReducedMotion = () => {
      cancelled = true;
      clearTimers();
      video.pause();
      showStill();
      while (video.firstChild) video.firstChild.remove();
      video.load();
    };

    const armSources = () => {
      if (cancelled || reduce.matches || video.querySelector("source")) return;
      const webm = document.createElement("source");
      webm.src = "/videos/hero.webm";
      webm.type = "video/webm";
      const mp4 = document.createElement("source");
      mp4.src = "/videos/hero.mp4";
      mp4.type = "video/mp4";
      video.append(webm, mp4);
      video.load();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("canplay", onCanPlay);

    const onReduce = () => {
      if (reduce.matches) stopForReducedMotion();
    };
    reduce.addEventListener("change", onReduce);

    if (reduce.matches) {
      showStill();
    } else if (document.readyState === "complete") {
      const timer = window.setTimeout(armSources, 0);
      cancelArm = () => window.clearTimeout(timer);
    } else {
      window.addEventListener("load", armSources, { once: true });
      cancelArm = () => window.removeEventListener("load", armSources);
    }

    return () => {
      cancelled = true;
      clearTimers();
      cancelArm?.();
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", onCanPlay);
      reduce.removeEventListener("change", onReduce);
      video.pause();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        ref={stillRef}
        className="hero-still absolute inset-0"
        style={{ opacity: 1 }}
      >
        <Image
          src="/images/dining.jpg"
          alt="An empty dining room with tables set before service"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
