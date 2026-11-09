export function requestOrigin(req: Request): string {
  const url = new URL(req.url);
  const forwarded = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const host = forwarded?.split(",")[0]?.trim();
  const proto = (req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "")).split(",")[0].trim();
  if (host) return `${proto}://${host}`;
  return url.origin;
}
