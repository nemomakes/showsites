"use client";

import { useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

type Mode = "view" | "load";

function useRevealPlay(mode: Mode) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const play = reduce === false && (mode === "load" || seen);

  useEffect(() => {
    if (reduce !== false || mode === "load") return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -48px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, reduce]);

  return { ref, play };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  /** `load` plays on mount (hero / page titles). `view` waits for the viewport. */
  mode?: Mode;
};

export function Reveal({
  children,
  className,
  delay = 0,
  mode = "view",
}: RevealProps) {
  const { ref, play } = useRevealPlay(mode);
  const style: CSSProperties | undefined =
    play && delay ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={[className, play ? "reveal-play" : ""].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  mode?: Mode;
};

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  mode = "view",
}: GroupProps) {
  const { ref, play } = useRevealPlay(mode);
  const style: CSSProperties = {
    "--reveal-step": `${stagger}s`,
    ...(play && delay ? { animationDelay: `${delay}s` } : {}),
  } as CSSProperties;

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={[className, play ? "reveal-play" : ""].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article" | "figure";
};

export function RevealItem({ children, className, as = "div" }: ItemProps) {
  const itemClass = ["reveal-item", className].filter(Boolean).join(" ");
  if (as === "li") return <li className={itemClass}>{children}</li>;
  if (as === "article") return <article className={itemClass}>{children}</article>;
  if (as === "figure") return <figure className={itemClass}>{children}</figure>;
  return <div className={itemClass}>{children}</div>;
}
