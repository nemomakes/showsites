export const KIT_NAME = "Friend-Finder Playbook 45+";
export const CORE_NAME = "Next Chapter";
export const KIT_PRICE_LABEL = "$27";
export const CORE_PRICE_LABEL = "$97";
export const CORE_WITH_CREDIT_LABEL = "$70";
export const KIT_POLICY = "Because it's a digital download, all sales are final.";
export const CORE_NOT_THERAPY = "It's a self-guided course, not coaching or therapy.";
export const KIT_CREDIT_NOTE = "your $27 counts toward it";
export const CORE_REFUND_PLACEHOLDER = "[CORE REFUND POLICY]";
export const KIT_BUYER_TAG = "kit-buyer";
export const CORE_BUYER_TAG = "core-buyer";

export type Product = "kit" | "core";

export function buyerTag(product: Product): string {
  return product === "kit" ? KIT_BUYER_TAG : CORE_BUYER_TAG;
}

/** Course refund wording. Env when Gene sets it, otherwise the marked placeholder. */
export function coreRefundPolicy(): string {
  const fromEnv = process.env.CORE_REFUND_POLICY?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : CORE_REFUND_PLACEHOLDER;
}

/** Kit-credit window in days. Invalid or missing env falls back to 60. */
export function kitCreditDays(): number {
  const raw = process.env.KIT_CREDIT_DAYS?.trim();
  if (!raw) return 60;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 60;
  return n;
}
