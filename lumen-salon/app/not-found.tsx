import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-24 md:px-8">
      <p className="eyebrow text-ash">404</p>
      <h1 className="mt-4 font-display text-5xl italic md:text-6xl">
        That chair is empty.
      </h1>
      <p className="mt-5 max-w-md text-pretty text-ink/75">
        Nothing here. Head back to the salon — the door is still open.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 w-fit items-center rounded-full bg-espresso px-6 text-sm text-ivory hover:bg-copper"
      >
        Back home
      </Link>
    </div>
  );
}
