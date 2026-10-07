export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="card-copy mt-5 list-disc space-y-2 pl-5 text-pretty marker:text-madrone">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
