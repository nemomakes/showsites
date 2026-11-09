import { readFile } from "fs/promises";
import path from "path";
import type Stripe from "stripe";
import { verifyToken } from "./tokens";

export function playbookPath(): string {
  return path.join(process.cwd(), "private", "friend-finder-playbook.pdf");
}

export async function readPlaybook(): Promise<Buffer> {
  return readFile(playbookPath());
}

export async function kitSessionIsPaid(stripe: Stripe, sessionId: string): Promise<boolean> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session.payment_status === "paid" && session.metadata?.product === "kit";
}

/** Missing Checkout Sessions are a denial. Any other Stripe failure stays a server error. */
export function kitDownloadStripeStatus(error: unknown): 403 | 500 {
  const record = (error ?? {}) as { code?: unknown; message?: unknown };
  const code = typeof record.code === "string" ? record.code : "";
  const message = typeof record.message === "string"
    ? record.message
    : error instanceof Error
      ? error.message
      : "";
  if (code === "resource_missing" || /no such checkout\.session/i.test(message)) return 403;
  return 500;
}

export async function kitSessionAccess(stripe: Stripe, sessionId: string): Promise<"paid" | "unpaid" | 403 | 500> {
  try {
    return (await kitSessionIsPaid(stripe, sessionId)) ? "paid" : "unpaid";
  } catch (error) {
    return kitDownloadStripeStatus(error);
  }
}

export function downloadTokenIsValid(token: string): boolean {
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return false;
  return verifyToken(token, secret, "download") !== null;
}
