import type Stripe from "stripe";
import { hasPaidKit } from "./kit-purchase";
import { coreRefundPolicy, KIT_POLICY, kitCreditDays, type Product } from "./products";
import { integrationIdentifier } from "./stripe";
import { creditStillValid, verifyToken } from "./tokens";

export type CheckoutDecision =
  | { ok: true; params: Stripe.Checkout.SessionCreateParams }
  | { ok: false; status: 503 | 502; message: string };

export async function buildCheckoutParams(input: {
  stripe: Stripe;
  product: Product;
  price: string;
  origin: string;
  token?: string;
}): Promise<CheckoutDecision> {
  const policy = input.product === "kit" ? KIT_POLICY : coreRefundPolicy();
  const successPath = input.product === "kit" ? "/thanks/kit" : "/thanks/core";
  const cancelPath = input.product === "kit" ? "/kit" : "/next-chapter";
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [{ price: input.price, quantity: 1 }],
    success_url: `${input.origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}${cancelPath}`,
    metadata: { product: input.product },
    custom_text: { submit: { message: policy } },
    integration_identifier: integrationIdentifier(input.product),
  };

  if (input.product === "kit") {
    params.allow_promotion_codes = false;
    return { ok: true, params };
  }

  const credit = await coreCredit(input.stripe, input.token);
  if (credit.status === "misconfigured") {
    return { ok: false, status: 503, message: "checkout not configured" };
  }
  if (credit.status === "lookup_failed") {
    return { ok: false, status: 502, message: "couldn't confirm the kit credit" };
  }
  if (credit.status === "apply") {
    params.discounts = [{ coupon: credit.coupon }];
    params.customer_email = credit.email;
    params.cancel_url = `${input.origin}${cancelPath}?t=${encodeURIComponent(input.token ?? "")}`;
    return { ok: true, params };
  }

  params.allow_promotion_codes = false;
  return { ok: true, params };
}

type CreditResult =
  | { status: "none" }
  | { status: "apply"; coupon: string; email: string }
  | { status: "misconfigured" }
  | { status: "lookup_failed" };

async function coreCredit(stripe: Stripe, token: string | undefined): Promise<CreditResult> {
  if (!token) return { status: "none" };
  const secret = process.env.LINK_SIGNING_SECRET;
  if (!secret) return { status: "none" };
  const payload = verifyToken(token, secret, "credit");
  if (!payload) return { status: "none" };
  const now = Math.floor(Date.now() / 1000);
  if (!creditStillValid(payload.iat, now, kitCreditDays())) return { status: "none" };

  const coupon = process.env.STRIPE_COUPON_KIT_CREDIT;
  if (!coupon) return { status: "misconfigured" };

  try {
    const paid = await hasPaidKit(stripe, payload.email);
    if (!paid) return { status: "none" };
    return { status: "apply", coupon, email: payload.email };
  } catch (error) {
    console.error("kit credit lookup failed", error);
    return { status: "lookup_failed" }; // caller returns 502 so we don't charge $97 on a failed lookup
  }
}
