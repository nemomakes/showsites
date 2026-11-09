import { kitCreditDays } from "./products";
import { creditStillValid, verifyToken } from "./tokens";

/** Signature and age only. The Stripe paid-kit check happens when checkout is created. */
export function creditTokenIsValid(token: string | undefined): boolean {
  if (!token) return false;
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return false;
  const payload = verifyToken(token, secret, "credit");
  if (!payload) return false;
  return creditStillValid(payload.iat, Math.floor(Date.now() / 1000), kitCreditDays());
}
