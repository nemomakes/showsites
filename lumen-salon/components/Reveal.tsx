"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, amount: 0.22, margin: "0px 0px -48px 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  /** `load` plays on mount (hero / page titles). `view` waits for the viewport. */
  mode?: "view" | "load";
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  mode = "view",
}: RevealProps) {
  const reduce = useReducedMotion();
  const hidden = reduce ? false : { opacity: 0, y: distance };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: reduce ? 0 : 0.72, delay: reduce ? 0 : delay, ease };

  const props: HTMLMotionProps<"div"> = {
    className,
    initial: hidden,
    transition,
    ...(mode === "load"
      ? { animate: shown }
      : { whileInView: shown, viewport }),
  };

  return <motion.div {...props}>{children}</motion.div>;
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  mode?: "view" | "load";
};

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  mode = "view",
}: GroupProps) {
  const reduce = useReducedMotion();
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial={reduce ? "visible" : "hidden"}
      variants={variants}
      {...(mode === "load"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport })}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article" | "figure";
};

export function RevealItem({
  children,
  className,
  distance = 20,
  as = "div",
}: ItemProps) {
  const reduce = useReducedMotion();
  const variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.68, ease },
    },
  };

  const shared = { className, variants };

  if (as === "li") {
    return <motion.li {...shared}>{children}</motion.li>;
  }
  if (as === "article") {
    return <motion.article {...shared}>{children}</motion.article>;
  }
  if (as === "figure") {
    return <motion.figure {...shared}>{children}</motion.figure>;
  }
  return <motion.div {...shared}>{children}</motion.div>;
}
