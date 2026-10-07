import type { ReactNode } from "react";
import { PageTitle } from "@/components/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export function PageIntro({
  title,
  children,
  band = false,
}: {
  title: string;
  children?: ReactNode;
  /** Full-width white band. Menu and Story use this above a full-bleed photo. */
  band?: boolean;
}) {
  return (
    <header className={band ? "bg-white" : undefined}>
      <div
        className={
          band
            ? "mx-auto max-w-6xl px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32"
            : "mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32"
        }
      >
        <RevealGroup mode="load" stagger={0.08}>
          <RevealItem distance={16}>
            <PageTitle>{title}</PageTitle>
          </RevealItem>
          {children ? (
            <RevealItem>
              <div
                className={
                  band
                    ? "copy mt-7 max-w-3xl text-pretty"
                    : "mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-sage"
                }
              >
                {children}
              </div>
            </RevealItem>
          ) : null}
        </RevealGroup>
      </div>
    </header>
  );
}
