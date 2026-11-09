import type Stripe from "stripe";
import { tagBuyer, type BeehiivClient } from "./beehiiv";
import { normalizeEmail } from "./email";
import { buyerTag, type Product } from "./products";

export type FulfillOutcome = {
  status: number;
  ok: boolean;
  outcome: "tagged" | "noop" | "ignored" | "unpaid" | "missing_email" | "not_configured" | "failed";
  product?: string;
  subscriptionId?: string;
};

export function sessionEmail(session: Stripe.Checkout.Session): string | null {
  const raw = session.customer_details?.email || session.customer_email || "";
  return normalizeEmail(raw);
}

export async function fulfillPaidSession(session: Stripe.Checkout.Session, client: BeehiivClient): Promise<FulfillOutcome> {
  const product = session.metadata?.product;
  if (product !== "kit" && product !== "core") {
    console.log("stripe webhook: ignored session", { product: product ?? null, sessionId: session.id });
    return { status: 200, ok: true, outcome: "ignored", product };
  }
  if (session.payment_status !== "paid") {
    console.log("stripe webhook: unpaid session skipped", { product, sessionId: session.id, payment_status: session.payment_status });
    return { status: 200, ok: true, outcome: "unpaid", product };
  }
  const email = sessionEmail(session);
  if (!email) {
    console.error("stripe webhook: paid session has no email", { product, sessionId: session.id });
    return { status: 200, ok: false, outcome: "missing_email", product };
  }

  const tag = buyerTag(product as Product);
  const result = await tagBuyer(client, email, tag);
  if (result.skipped) {
    console.log("stripe webhook: replay no-op, tag already present", { product, tag, subscriptionId: result.subscriptionId, sessionId: session.id });
    return { status: 200, ok: true, outcome: "noop", product, subscriptionId: result.subscriptionId };
  }
  console.log("stripe webhook: tagged buyer", { product, tag, subscriptionId: result.subscriptionId, sessionId: session.id });
  return { status: 200, ok: true, outcome: "tagged", product, subscriptionId: result.subscriptionId };
}

export async function processWebhook(input: {
  rawBody: string;
  signature: string | null;
  webhookSecret: string | undefined;
  constructEvent: (rawBody: string, signature: string, secret: string) => Stripe.Event;
  fulfill: (session: Stripe.Checkout.Session) => Promise<FulfillOutcome>;
}): Promise<FulfillOutcome & { error?: string }> {
  if (!input.webhookSecret) {
    console.error("stripe webhook: STRIPE_WEBHOOK_SECRET missing");
    return { status: 503, ok: false, outcome: "not_configured", error: "webhook not configured" };
  }
  if (!input.signature) {
    console.error("stripe webhook: missing Stripe-Signature header");
    return { status: 400, ok: false, outcome: "failed", error: "invalid_signature" };
  }

  let event: Stripe.Event;
  try {
    event = input.constructEvent(input.rawBody, input.signature, input.webhookSecret);
  } catch (error) {
    console.error("stripe webhook: signature rejected", error instanceof Error ? error.message : error);
    return { status: 400, ok: false, outcome: "failed", error: "invalid_signature" };
  }

  if (event.type !== "checkout.session.completed") {
    console.log("stripe webhook: ignored event", { type: event.type });
    return { status: 200, ok: true, outcome: "ignored" };
  }

  try {
    return await input.fulfill(event.data.object as Stripe.Checkout.Session);
  } catch (error) {
    console.error("stripe webhook: fulfillment failed", error);
    return { status: 500, ok: false, outcome: "failed", error: "fulfillment_failed" };
  }
}
