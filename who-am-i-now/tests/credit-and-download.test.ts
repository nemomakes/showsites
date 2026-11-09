import { afterEach, describe, expect, it } from "vitest";
import type Stripe from "stripe";
import { buildCheckoutParams } from "../lib/checkout";
import { resolveCoreCredit } from "../lib/credit";
import { kitDownloadStripeStatus, kitSessionAccess } from "../lib/playbook";
import { mintCreditToken } from "../lib/tokens";

const SECRET = "credit-test-secret";
const EMAIL = "buyer@example.com";

function paidKitList() {
  return {
    data: [{ id: "cs_kit", payment_status: "paid", metadata: { product: "kit" } }],
    has_more: false,
  };
}

function stripeListing(list: () => Promise<unknown>): Stripe {
  return { checkout: { sessions: { list } } } as unknown as Stripe;
}

describe("core credit price", () => {
  const previous: Record<string, string | undefined> = {};

  afterEach(() => {
    for (const key of ["LINK_SIGNING_SECRET", "STRIPE_COUPON_KIT_CREDIT", "KIT_CREDIT_DAYS"]) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  });

  function useEnv() {
    for (const key of ["LINK_SIGNING_SECRET", "STRIPE_COUPON_KIT_CREDIT", "KIT_CREDIT_DAYS"]) {
      previous[key] = process.env[key];
    }
    process.env.LINK_SIGNING_SECRET = SECRET;
    process.env.STRIPE_COUPON_KIT_CREDIT = "coupon_kit";
    process.env.KIT_CREDIT_DAYS = "60";
  }

  it("shows the discount only when hasPaidKit passes, and checkout uses that same result", async () => {
    useEnv();
    const token = mintCreditToken(EMAIL, SECRET)!;
    let calls = 0;
    const stripe = stripeListing(async () => {
      calls += 1;
      return paidKitList();
    });

    const shown = await resolveCoreCredit(token, stripe);
    expect(shown).toEqual({ discount: true, email: EMAIL });

    const checkout = await buildCheckoutParams({
      stripe,
      product: "core",
      price: "price_core",
      origin: "https://example.test",
      token,
    });
    expect(checkout.ok).toBe(true);
    if (!checkout.ok) return;
    expect(checkout.params.discounts).toEqual([{ coupon: "coupon_kit" }]);
    expect(checkout.params.customer_email).toBe(EMAIL);
    expect(checkout.params.allow_promotion_codes).toBeUndefined();
    expect(calls).toBe(2);
  });

  it("shows full price when no paid kit exists", async () => {
    useEnv();
    const token = mintCreditToken(EMAIL, SECRET)!;
    const stripe = stripeListing(async () => ({ data: [], has_more: false }));
    expect(await resolveCoreCredit(token, stripe)).toEqual({ discount: false });

    const checkout = await buildCheckoutParams({
      stripe,
      product: "core",
      price: "price_core",
      origin: "https://example.test",
      token,
    });
    expect(checkout.ok).toBe(true);
    if (!checkout.ok) return;
    expect(checkout.params.discounts).toBeUndefined();
    expect(checkout.params.allow_promotion_codes).toBe(false);
  });

  it("shows full price when the paid-kit lookup throws", async () => {
    useEnv();
    const token = mintCreditToken(EMAIL, SECRET)!;
    const stripe = stripeListing(async () => {
      throw new Error("stripe unavailable");
    });
    expect(await resolveCoreCredit(token, stripe)).toEqual({ discount: false });

    const checkout = await buildCheckoutParams({
      stripe,
      product: "core",
      price: "price_core",
      origin: "https://example.test",
      token,
    });
    expect(checkout.ok).toBe(true);
    if (!checkout.ok) return;
    expect(checkout.params.discounts).toBeUndefined();
    expect(checkout.params.allow_promotion_codes).toBe(false);
  });
});

describe("kit download session errors", () => {
  it("denies a missing checkout session and keeps other Stripe errors as 500", async () => {
    expect(kitDownloadStripeStatus({ code: "resource_missing", message: "No such checkout.session: cs_missing" })).toBe(403);
    expect(kitDownloadStripeStatus(new Error("No such checkout.session: cs_missing"))).toBe(403);
    expect(kitDownloadStripeStatus({ code: "rate_limit", message: "Too many requests" })).toBe(500);

    const missing = { checkout: { sessions: { retrieve: async () => { throw { code: "resource_missing", message: "No such checkout.session: cs_missing" }; } } } } as unknown as Stripe;
    const rateLimited = { checkout: { sessions: { retrieve: async () => { throw { code: "rate_limit", message: "Too many requests" }; } } } } as unknown as Stripe;
    expect(await kitSessionAccess(missing, "cs_missing")).toBe(403);
    expect(await kitSessionAccess(rateLimited, "cs_rate")).toBe(500);
  });
});
