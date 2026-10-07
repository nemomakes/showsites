export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 list-disc space-y-3 pl-5 text-pretty leading-relaxed text-ink marker:text-madrone">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
