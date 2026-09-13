import { ticker } from "@/lib/site";

export function Marquee() {
  const items = [...ticker, ...ticker];

  return (
    <div className="overflow-hidden border-y border-bark/10 bg-bark text-cream">
      <div className="marquee-track flex w-max gap-0 py-3">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center px-5 text-sm tracking-[0.18em] uppercase"
          >
            {item}
            <span aria-hidden className="ml-5 text-gold">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
