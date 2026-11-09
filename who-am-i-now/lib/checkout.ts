import type Stripe from "stripe";
import { resolveCoreCredit } from "./credit";
import { coreRefundPolicy, KIT_POLICY, type Product } from "./products";
import { integrationIdentifier } from "./stripe";

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

  const credit = await resolveCoreCredit(input.token, input.stripe);
  if (!credit.discount) {
    params.allow_promotion_codes = false;
    return { ok: true, params };
  }

  const coupon = process.env.STRIPE_COUPON_KIT_CREDIT;
  if (!coupon) return { ok: false, status: 503, message: "checkout not configured" };
  params.discounts = [{ coupon }];
  params.customer_email = credit.email;
  params.cancel_url = `${input.origin}${cancelPath}?t=${encodeURIComponent(input.token ?? "")}`;
  return { ok: true, params };
}
