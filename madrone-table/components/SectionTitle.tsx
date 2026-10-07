import type { CSSProperties } from "react";

function titleStyle(title: string, maxRem: number): CSSProperties {
  return {
    "--title-factor": (title.length * 0.58).toFixed(2),
    "--title-max": `${maxRem}rem`,
  } as CSSProperties;
}

export function SectionTitle({
  children,
  className = "",
  maxRem = 3.15,
  card = false,
  scaleWith,
}: {
  children: string;
  className?: string;
  maxRem?: number;
  /** Shared size for home and story cards. Ignores per-title scaling. */
  card?: boolean;
  /** Size this title as if it read `scaleWith`, so short labels match a longer one. */
  scaleWith?: string;
}) {
  return (
    <div className={`title-frame ${className}`}>
      <h2
        className={card ? "section-title card-title" : "section-title"}
        style={card ? undefined : titleStyle(scaleWith ?? children, maxRem)}
      >
        {children}
      </h2>
    </div>
  );
}

export function PageTitle({
  children,
  maxRem = 4.5,
}: {
  children: string;
  maxRem?: number;
}) {
  return (
    <div className="title-frame">
      <h1 className="page-title" style={titleStyle(children, maxRem)}>
        {children}
      </h1>
    </div>
  );
}
