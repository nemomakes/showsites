import { mintCreditToken, mintDownloadToken } from "./tokens";

function originOf(origin: string): string {
  return origin.replace(/\/$/, "");
}

/**
 * Absolute PDF link for the kit-buyer onboarding email.
 * HMAC over email + product=kit. No expiry. Null when LINK_SIGNING_SECRET is unset
 * or the email is not usable.
 */
export function mintKitDownloadUrl(origin: string, email: string, nowSec?: number): string | null {
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return null;
  const token = mintDownloadToken(email, secret, nowSec);
  if (!token) return null;
  return `${originOf(origin)}/api/kit/download?t=${encodeURIComponent(token)}`;
}

/** /next-chapter?t= link that can unlock the $27 kit credit. Same secret, separate token type. */
export function mintCoreCreditUrl(origin: string, email: string, nowSec?: number): string | null {
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return null;
  const token = mintCreditToken(email, secret, nowSec);
  if (!token) return null;
  return `${originOf(origin)}/next-chapter?t=${encodeURIComponent(token)}`;
}
