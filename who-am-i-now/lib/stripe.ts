import { randomBytes } from "crypto";
import Stripe from "stripe";

/** Node SDK client. A new instance per call so tests can change env without a cached key. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

/** Webhook verification only needs the signing secret; the API key is unused by constructEvent. */
export function stripeForWebhooks(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_webhook_verify_only");
}

export function integrationIdentifier(product: "kit" | "core"): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const bytes = randomBytes(8);
  let suffix = "";
  for (const byte of bytes) suffix += alphabet[byte % 26];
  return `whoaminow_${product}_${suffix}`;
}
