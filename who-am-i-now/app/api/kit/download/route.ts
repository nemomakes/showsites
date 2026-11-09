import { NextResponse } from "next/server";
import { downloadTokenIsValid, kitSessionIsPaid, readPlaybook } from "@/lib/playbook";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id")?.trim();
  const token = url.searchParams.get("t")?.trim();

  if (!sessionId && !token) {
    return NextResponse.json({ ok: false, error: "missing_credential" }, { status: 400 });
  }

  try {
    if (sessionId) {
      const stripe = getStripe();
      if (!stripe) {
        return NextResponse.json({ ok: false, error: "checkout_not_configured", message: "checkout not configured" }, { status: 503 });
      }
      const paid = await kitSessionIsPaid(stripe, sessionId);
      if (!paid) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    } else if (token) {
      if (!process.env.LINK_SIGNING_SECRET) {
        return NextResponse.json({ ok: false, error: "checkout_not_configured", message: "checkout not configured" }, { status: 503 });
      }
      if (!downloadTokenIsValid(token)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    const pdf = await readPlaybook();
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="friend-finder-playbook.pdf"',
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (error) {
    console.error("kit download failed", error);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 404 });
  }
}
