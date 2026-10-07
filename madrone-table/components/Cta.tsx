import type { ReactNode } from "react";

const tones = {
  solid:
    "inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm text-paper transition-colors hover:bg-madrone",
  ghost:
    "inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-sm text-ink transition-colors hover:border-ink",
  "on-dark":
    "inline-flex h-12 items-center rounded-full bg-paper px-6 text-sm text-forest transition-colors hover:bg-mist",
  "on-dark-ghost":
    "inline-flex h-12 items-center rounded-full border border-paper/40 px-6 text-sm text-paper transition-colors hover:border-paper",
} as const;

export function Cta({
  href,
  children,
  tone = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={tones[tone]}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
