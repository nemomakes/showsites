import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
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

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pub}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true, utm_source: "who-am-i-now-landing" }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("beehiiv error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("beehiiv fetch failed", e);
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }
}
