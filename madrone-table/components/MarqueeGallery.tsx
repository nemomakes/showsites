import Image from "next/image";

const frames = [
  {
    src: "/images/gallery/dish-table-1.jpg",
    alt: "Roasted beets with herbs on a dark table",
  },
  {
    src: "/images/gallery/dish-counter-1.jpg",
    alt: "Day-boat rockfish with lemon and herbs on a marble counter",
  },
  {
    src: "/images/gallery/dish-table-2.jpg",
    alt: "Squash risotto finished with herbs on a dark table",
  },
  {
    src: "/images/gallery/dish-counter-2.jpg",
    alt: "Olive oil cake with citrus and crème fraîche on a marble counter",
  },
  {
    src: "/images/gallery/dish-table-3.jpg",
    alt: "Half chicken with potatoes and greens on a dark table",
  },
  {
    src: "/images/gallery/dish-counter-3.jpg",
    alt: "Grilled Little Gem with dressing on a marble counter",
  },
] as const;

/** Repeat the set so each half of the track stays wider than the viewport. */
const rowFrames = [...frames, ...frames];

function FrameRow({ decorative }: { decorative?: boolean }) {
  return (
    <div className="flex" aria-hidden={decorative || undefined}>
      {rowFrames.map((frame, index) => (
        <figure key={`${frame.src}-${index}`} className="gallery-frame">
          <Image
            src={frame.src}
            alt={decorative ? "" : index < frames.length ? frame.alt : ""}
            width={1600}
            height={1073}
            loading="eager"
            className="h-auto w-full"
            sizes="100vw"
          />
        </figure>
      ))}
    </div>
  );
}

export function MarqueeGallery() {
  return (
    <section
      aria-label="Plated dishes"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-16 md:py-24"
    >
      <div className="marquee-ltr flex w-max">
        <FrameRow />
        <FrameRow decorative />
      </div>
    </section>
  );
}
