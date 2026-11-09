import type { Product } from "./products";
import { getStripe } from "./stripe";

export type SessionCheck =
  | { state: "paid"; product: Product }
  | { state: "not_paid" }
  | { state: "unconfigured" }
  | { state: "error" };

export async function checkPaidSession(sessionId: string): Promise<SessionCheck> {
  const stripe = getStripe();
  if (!stripe) return { state: "unconfigured" };
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const product = session.metadata?.product;
    if (session.payment_status === "paid" && (product === "kit" || product === "core")) {
      return { state: "paid", product };
    }
    return { state: "not_paid" };
  } catch (error) {
    console.error("checkout session lookup failed", error);
    return { state: "error" };
  }
}
