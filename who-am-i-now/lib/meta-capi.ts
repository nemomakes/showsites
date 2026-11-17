import { createHash } from "crypto";
import { sanitizeCookie, sanitizeLabel, sanitizeUrl, type Attribution } from "./attribution";

export const GRAPH_VERSION = "v27.0";

export function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export function buildFbc(fbclid: string | undefined, nowMs = Date.now()): string | undefined {
  const safe = sanitizeLabel(fbclid);
  if (!safe) return undefined;
  return `fb.1.${nowMs}.${safe}`;
}

export function cookieValue(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  const parts = header.split(";");
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (rawKey === name) return sanitizeCookie(decodeURIComponent(rest.join("=")));
  }
  return undefined;
}

export function clientIp(req: Request): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || req.headers.get("x-real-ip")?.trim();
  if (!ip || ip.length > 64 || !/^[0-9a-fA-F:.]+$/.test(ip)) return undefined;
  return ip;
}

export type LeadInput = {
  email: string;
  eventId?: string;
  eventTime: number;
  eventSourceUrl?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  testEventCode?: string;
};

export function buildLeadPayload(input: LeadInput): { data: Array<Record<string, unknown>>; test_event_code?: string } {
  const userData: Record<string, unknown> = {
    em: [hashEmail(input.email)],
  };
  if (input.ip) userData.client_ip_address = input.ip;
  if (input.userAgent) userData.client_user_agent = input.userAgent.slice(0, 512);
  const fbp = sanitizeCookie(input.fbp);
  if (fbp) userData.fbp = fbp;
  const fbc = sanitizeCookie(input.fbc) || buildFbc(input.fbclid, input.eventTime * 1000);
  if (fbc) userData.fbc = fbc;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: input.eventTime,
    action_source: "website",
    user_data: userData,
  };
  if (input.eventId) event.event_id = input.eventId;
  const source = sanitizeUrl(input.eventSourceUrl);
  if (source) event.event_source_url = source;

  const body: { data: Array<Record<string, unknown>>; test_event_code?: string } = { data: [event] };
  const testCode = sanitizeLabel(input.testEventCode, 64);
  if (testCode) body.test_event_code = testCode;
  return body;
}

export function capiConfigured(): { pixelId: string; token: string } | null {
  const pixelId = (process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
  const token = (process.env.META_CAPI_ACCESS_TOKEN || "").trim();
  if (!/^\d{5,20}$/.test(pixelId) || !token) return null;
  return { pixelId, token };
}

export async function sendMetaLead(
  input: LeadInput,
  deps: { fetchImpl?: typeof fetch; log?: (message: string, status?: number) => void } = {},
): Promise<void> {
  const config = capiConfigured();
  if (!config) return;
  const log = deps.log ?? ((message, status) => console.error(message, status ?? ""));
  const fetchImpl = deps.fetchImpl ?? fetch;
  try {
    const res = await fetchImpl(
      `https://graph.facebook.com/${GRAPH_VERSION}/${config.pixelId}/events?access_token=${encodeURIComponent(config.token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildLeadPayload(input)),
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) log("meta capi failed", res.status);
  } catch {
    log("meta capi failed");
  }
}

export function leadInputFromRequest(req: Request, email: string, attr: Attribution): LeadInput {
  return {
    email,
    eventId: attr.event_id,
    eventTime: Math.floor(Date.now() / 1000),
    eventSourceUrl: attr.event_source_url || sanitizeUrl(req.headers.get("referer")) ,
    ip: clientIp(req),
    userAgent: req.headers.get("user-agent") || undefined,
    fbp: cookieValue(req.headers.get("cookie"), "_fbp") || attr.fbp,
    fbc: cookieValue(req.headers.get("cookie"), "_fbc") || attr.fbc,
    fbclid: attr.fbclid,
    testEventCode: process.env.META_TEST_EVENT_CODE,
  };
}
