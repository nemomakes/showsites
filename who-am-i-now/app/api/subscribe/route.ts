import { NextResponse } from "next/server";
import { attributionFromUnknown, beehiivFields } from "@/lib/attribution";
import { leadInputFromRequest, sendMetaLead } from "@/lib/meta-capi";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const record = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const email = typeof record.email === "string" ? record.email.trim() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const pub = process.env.BEEHIIV_PUBLICATION_ID;
  const key = process.env.BEEHIIV_API_KEY;
  if (!pub || !key) {
    return NextResponse.json(
      { ok: false, error: "not_configured", message: "Subscription service is not configured (BEEHIIV_PUBLICATION_ID / BEEHIIV_API_KEY missing)." },
      { status: 503 },
    );
  }

  const attribution = attributionFromUnknown(record);
  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pub}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        ...beehiivFields(attribution),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("beehiiv error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
  } catch (e) {
    console.error("beehiiv fetch failed", e);
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }

  await sendMetaLead(leadInputFromRequest(req, email, attribution));
  return NextResponse.json({ ok: true });
}
