import type { ReactNode } from "react";
import { PageTitle } from "@/components/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
      <RevealGroup mode="load" stagger={0.08}>
        <RevealItem distance={16}>
          <PageTitle>{title}</PageTitle>
        </RevealItem>
        {children ? (
          <RevealItem>
            <div className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-sage">
              {children}
            </div>
          </RevealItem>
        ) : null}
      </RevealGroup>
    </header>
  );
}
