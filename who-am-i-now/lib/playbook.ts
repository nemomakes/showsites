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

export function downloadTokenIsValid(token: string): boolean {
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return false;
  return verifyToken(token, secret, "download") !== null;
}
