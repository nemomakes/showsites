import type Stripe from "stripe";
import { hasPaidKit } from "./kit-purchase";
import { kitCreditDays } from "./products";
import { creditStillValid, verifyToken } from "./tokens";

export type CoreCredit = {
  /** True only when the token is valid and hasPaidKit confirms a paid kit. */
  discount: boolean;
  email?: string;
};

/**
 * Shared by /next-chapter and core checkout.
 * A signed token is not enough: the same paid-kit lookup has to pass.
 * A failed lookup, a missing Stripe client, or no paid kit all mean full price — no error.
 */
export async function resolveCoreCredit(token: string | undefined, stripe: Stripe | null): Promise<CoreCredit> {
  if (!token || !stripe) return { discount: false };
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return { discount: false };
  const payload = verifyToken(token, secret, "credit");
  if (!payload) return { discount: false };
  if (!creditStillValid(payload.iat, Math.floor(Date.now() / 1000), kitCreditDays())) return { discount: false };

  try {
    const paid = await hasPaidKit(stripe, payload.email);
    if (!paid) return { discount: false };
    return { discount: true, email: payload.email };
  } catch (error) {
    console.error("kit credit lookup failed", error);
    return { discount: false };
  }
}
