import Image from "next/image";

const frames = [
  {
    src: "/images/gallery/dish-table-1.jpg",
    alt: "Roasted beets with herbs on a dark table",
    position: "center",
  },
  {
    src: "/images/gallery/dish-counter-1.jpg",
    alt: "Day-boat rockfish with lemon and herbs on a marble counter",
    position: "center",
  },
  {
    src: "/images/gallery/dish-table-2.jpg",
    alt: "Squash risotto finished with herbs on a dark table",
    position: "center",
  },
  {
    src: "/images/gallery/dish-counter-2.jpg",
    alt: "Olive oil cake with citrus and crème fraîche on a marble counter",
    position: "center",
  },
  {
    src: "/images/gallery/dish-table-3.jpg",
    alt: "Half chicken with potatoes and greens on a dark table",
    position: "center",
  },
  {
    src: "/images/gallery/dish-counter-3.jpg",
    alt: "Grilled Little Gem with dressing on a marble counter",
    position: "center",
  },
] as const;

/** Repeat the set so each half of the track stays wider than the viewport. */
const rowFrames = [...frames, ...frames];

function FrameRow({ decorative }: { decorative?: boolean }) {
  return (
    <div
      className="flex gap-5 pr-5 md:gap-8 md:pr-8"
      aria-hidden={decorative || undefined}
    >
      {rowFrames.map((frame, index) => (
        <figure
          key={`${frame.src}-${index}`}
          className="relative aspect-[4/5] h-[22rem] w-[17.6rem] shrink-0 overflow-hidden bg-stone md:h-[32rem] md:w-[25.6rem] lg:h-[38rem] lg:w-[30.4rem]"
        >
          <Image
            src={frame.src}
            alt={decorative ? "" : index < frames.length ? frame.alt : ""}
            fill
            loading="eager"
            className="object-cover"
            style={{ objectPosition: frame.position }}
            sizes="(min-width: 1024px) 30rem, (min-width: 768px) 26rem, 18rem"
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
