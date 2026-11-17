export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  referring_site?: string;
  event_source_url?: string;
  event_id?: string;
  fbp?: string;
  fbc?: string;
};

const MAX_LABEL = 200;
const MAX_URL = 500;
const MAX_COOKIE = 256;

export function sanitizeLabel(value: unknown, max = MAX_LABEL): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!cleaned || /[<>]/.test(cleaned)) return undefined;
  return cleaned.slice(0, max);
}

export function sanitizeUrl(value: unknown, max = MAX_URL): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > max) return undefined;
  try {
    const url = new URL(cleaned);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function sanitizeCookie(value: unknown, max = MAX_COOKIE): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > max || !/^[\w.:-]{1,256}$/.test(cleaned)) return undefined;
  return cleaned;
}

export function sanitizeEventId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim();
  if (!/^[A-Za-z0-9-]{8,80}$/.test(cleaned)) return undefined;
  return cleaned;
}

export function attributionFromUnknown(input: unknown): Attribution {
  const source = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const out: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = sanitizeLabel(source[key]);
    if (value) out[key] = value;
  }
  const fbclid = sanitizeLabel(source.fbclid);
  if (fbclid) out.fbclid = fbclid;
  const referring = sanitizeUrl(source.referring_site);
  if (referring) out.referring_site = referring;
  const eventSource = sanitizeUrl(source.event_source_url);
  if (eventSource) out.event_source_url = eventSource;
  const eventId = sanitizeEventId(source.event_id);
  if (eventId) out.event_id = eventId;
  const fbp = sanitizeCookie(source.fbp);
  if (fbp) out.fbp = fbp;
  const fbc = sanitizeCookie(source.fbc);
  if (fbc) out.fbc = fbc;
  return out;
}

/** Native Beehiiv create-subscription fields. utm_content and utm_term are native too. */
export function beehiivFields(attr: Attribution): Record<string, string> {
  return {
    utm_source: attr.utm_source || "who-am-i-now-landing",
    ...(attr.utm_medium ? { utm_medium: attr.utm_medium } : {}),
    ...(attr.utm_campaign ? { utm_campaign: attr.utm_campaign } : {}),
    ...(attr.utm_content ? { utm_content: attr.utm_content } : {}),
    ...(attr.utm_term ? { utm_term: attr.utm_term } : {}),
    ...(attr.referring_site ? { referring_site: attr.referring_site } : {}),
  };
}
