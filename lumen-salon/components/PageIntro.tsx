import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/Reveal";

const defaultTitleClass =
  "max-w-4xl font-display text-5xl font-medium leading-[0.96] text-pretty md:text-7xl";

/** Fluid one-line titles that fit the content column (container query, not viewport). */
const oneLineTitleClass =
  "max-w-full whitespace-nowrap font-display text-[length:min(4.25rem,calc(100cqi/20.4))] font-medium leading-[0.96] tracking-[-0.03em]";

export function PageIntro({
  title,
  titleClassName,
  className,
  oneLine = false,
  children,
}: {
  title: string;
  titleClassName?: string;
  className?: string;
  oneLine?: boolean;
  children?: ReactNode;
}) {
  return (
    <header
      className={`mx-auto @container px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32 ${className ?? "max-w-6xl"}`}
    >
      <RevealGroup mode="load" stagger={0.08}>
        <RevealItem distance={16}>
          <h1
            className={
              titleClassName ?? (oneLine ? oneLineTitleClass : defaultTitleClass)
            }
          >
            {title}
          </h1>
        </RevealItem>
        {children ? (
          <RevealItem>
            <div className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink/75">
              {children}
            </div>
          </RevealItem>
        ) : null}
      </RevealGroup>
    </header>
  );
}
