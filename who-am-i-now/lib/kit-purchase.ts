import type Stripe from "stripe";
import { normalizeEmail } from "./email";

/**
 * True when a completed, paid Checkout Session for this email has metadata product=kit.
 * Stripe's customer_details.email filter is case-sensitive, and tokens store a lowercased
 * address, so the address Stripe saved needs to match that lowercase form.
 */
export async function hasPaidKit(stripe: Stripe, email: string): Promise<boolean> {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;

  let startingAfter: string | undefined;
  for (let page = 0; page < 5; page += 1) {
    const found = await stripe.checkout.sessions.list({
      customer_details: { email: normalized },
      status: "complete",
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    if (found.data.some((session) => session.payment_status === "paid" && session.metadata?.product === "kit")) {
      return true;
    }
    if (!found.has_more || found.data.length === 0) return false;
    startingAfter = found.data[found.data.length - 1]?.id;
    if (!startingAfter) return false;
  }
  return false;
}
