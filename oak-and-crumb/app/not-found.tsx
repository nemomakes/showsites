import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-24 md:px-8">
      <p className="eyebrow text-muted">404</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl">
        That page went the way of Saturday’s rolls.
      </h1>
      <p className="mt-5 max-w-md text-pretty text-ink">
        Nothing here. Head back to the shop — the door is still open.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 w-fit items-center rounded-full bg-rust px-6 text-sm text-cream hover:bg-bark"
      >
        Back home
      </Link>
    </div>
  );
}
