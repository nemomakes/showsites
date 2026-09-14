import Image from "next/image";

const frames = [
  {
    src: "/images/texture.jpg",
    alt: "Editorial portrait celebrating natural hair texture",
  },
  {
    src: "/images/portrait-bun.jpg",
    alt: "Portrait of a woman with a clean bun and soft fringe",
  },
] as const;

/** Repeat the pair so each half of the track is wider than the viewport. */
const rowFrames = [...frames, ...frames, ...frames];

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
            className="object-cover"
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
      aria-label="Salon portraits"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-16 md:py-24"
    >
      <div className="marquee-ltr flex w-max">
        <FrameRow />
        <FrameRow decorative />
      </div>
    </section>
  );
}
