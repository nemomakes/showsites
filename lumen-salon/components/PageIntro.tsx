import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export function PageIntro({
  title,
  titleClassName,
  className,
  children,
}: {
  title: string;
  titleClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={`mx-auto px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32 ${className ?? "max-w-6xl"}`}
    >
      <RevealGroup mode="load" stagger={0.08}>
        <RevealItem distance={16}>
          <h1
            className={
              titleClassName ??
              "max-w-4xl font-display text-5xl font-medium leading-[0.96] md:text-7xl"
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
