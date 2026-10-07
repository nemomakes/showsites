import Image from "next/image";

const frames = [
  {
    src: "/images/dining.jpg",
    alt: "An empty dining room with tables set before service",
  },
  {
    src: "/images/plate.jpg",
    alt: "Sliced beets and greens on a white ceramic plate",
  },
  {
    src: "/images/pass.jpg",
    alt: "Hands finishing a plate with herbs",
  },
  {
    src: "/images/room.jpg",
    alt: "An empty wood table set before dinner service",
  },
  {
    src: "/images/produce.jpg",
    alt: "Greens, herbs, and tomatoes on a prep board",
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
      aria-label="Patio, plates, and the dining room"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-16 md:py-24"
    >
      <div className="marquee-ltr flex w-max">
        <FrameRow />
        <FrameRow decorative />
      </div>
    </section>
  );
}
