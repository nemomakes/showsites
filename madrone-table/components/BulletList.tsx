export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="copy mt-6 list-disc space-y-3 pl-6 text-pretty marker:text-madrone">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
