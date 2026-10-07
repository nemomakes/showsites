import type { CSSProperties, ReactNode } from "react";

const motions = [
  { duration: "16s", delay: "-0.6s" },
  { duration: "11s", delay: "-4.5s" },
  { duration: "13.5s", delay: "-7.4s" },
  { duration: "18s", delay: "-2.2s" },
  { duration: "12.5s", delay: "-5.8s" },
  { duration: "15s", delay: "-1.1s" },
] as const;

export function SwayCard({
  index,
  children,
  className = "",
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const motion = motions[index % motions.length];
  const style = {
    "--sway-duration": motion.duration,
    "--sway-delay": motion.delay,
  } as CSSProperties;

  return (
    <section className={["card-sway", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </section>
  );
}
