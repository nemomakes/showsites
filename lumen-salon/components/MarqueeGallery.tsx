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

function FrameRow({ decorative }: { decorative?: boolean }) {
  return (
    <div
      className="flex gap-5 pr-5 md:gap-8 md:pr-8"
      aria-hidden={decorative || undefined}
    >
      {frames.map((frame) => (
        <figure
          key={frame.src}
          className="relative aspect-[4/5] h-[22rem] w-[17.6rem] shrink-0 overflow-hidden bg-stone md:h-[28rem] md:w-[22.4rem] lg:h-[34rem] lg:w-[27.2rem]"
        >
          <Image
            src={frame.src}
            alt={decorative ? "" : frame.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 27rem, (min-width: 768px) 22rem, 18rem"
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
      className="overflow-hidden py-16 md:py-24"
    >
      <div className="marquee-ltr flex w-max">
        <FrameRow />
        <FrameRow decorative />
      </div>
    </section>
  );
}
