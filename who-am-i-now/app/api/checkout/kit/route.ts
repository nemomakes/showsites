import { NextResponse } from "next/server";
import { buildCheckoutParams } from "@/lib/checkout";
import { getStripe } from "@/lib/stripe";
import { requestOrigin } from "@/lib/origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function notConfigured() {
  return NextResponse.json({ ok: false, error: "checkout_not_configured", message: "checkout not configured" }, { status: 503 });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const price = process.env.STRIPE_PRICE_KIT;
  if (!stripe || !price) return notConfigured();

  const decision = await buildCheckoutParams({
    stripe,
    product: "kit",
    price,
    origin: requestOrigin(req),
  });
  if (!decision.ok) {
    return NextResponse.json({ ok: false, error: "checkout_not_configured", message: decision.message }, { status: decision.status });
  }

  try {
    const session = await stripe.checkout.sessions.create(decision.params);
    if (!session.url) {
      console.error("kit checkout: Stripe returned no url", { sessionId: session.id });
      return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("kit checkout failed", error);
    return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
  }
}
