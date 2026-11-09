import { NextResponse } from "next/server";
import { beehiivFromEnv } from "@/lib/beehiiv";
import { fulfillPaidSession, processWebhook } from "@/lib/fulfill";
import { stripeForWebhooks } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");
  const client = beehiivFromEnv();
  const stripe = stripeForWebhooks();

  const result = await processWebhook({
    rawBody,
    signature,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    constructEvent: (body, sig, secret) => stripe.webhooks.constructEvent(body, sig, secret),
    fulfill: async (session) => {
      if (!client) {
        console.error("stripe webhook: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID missing");
        return { status: 500, ok: false, outcome: "not_configured" };
      }
      return fulfillPaidSession(session, client);
    },
  });

  return NextResponse.json(
    { ok: result.ok, outcome: result.outcome, error: result.error },
    { status: result.status },
  );
}
