import { describe, expect, it } from "vitest";
import Stripe from "stripe";
import type { BeehiivClient } from "../lib/beehiiv";
import { fulfillPaidSession, processWebhook } from "../lib/fulfill";

const SECRET = "whsec_" + Buffer.from("unit-test-webhook-secret").toString("base64");

function paidKitEvent(): Stripe.Event {
  return {
    id: "evt_test",
    object: "event",
    api_version: "2026-09-30.endive",
    created: 1,
    type: "checkout.session.completed",
    livemode: false,
    pending_webhooks: 0,
    request: null,
    data: {
      object: {
        id: "cs_test",
        object: "checkout.session",
        payment_status: "paid",
        metadata: { product: "kit" },
        customer_details: { email: "buyer@example.com" },
      },
    },
  } as unknown as Stripe.Event;
}

describe("stripe webhook", () => {
  it("rejects a bad signature", async () => {
    const stripe = new Stripe("sk_test_placeholder");
    const payload = JSON.stringify({ id: "evt_bad" });
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret: SECRET });
    const bad = header.replace(/v1=[a-f0-9]+/, "v1=deadbeef");
    let fulfilled = false;

    const result = await processWebhook({
      rawBody: payload,
      signature: bad,
      webhookSecret: SECRET,
      constructEvent: (body, signature, secret) => stripe.webhooks.constructEvent(body, signature, secret),
      fulfill: async () => {
        fulfilled = true;
        return { status: 200, ok: true, outcome: "tagged" };
      },
    });

    expect(result.status).toBe(400);
    expect(result.error).toBe("invalid_signature");
    expect(fulfilled).toBe(false);
  });

  it("treats a replay as a no-op once the Beehiiv tag is present", async () => {
    const tags: string[] = [];
    const added: string[] = [];
    const beehiiv: BeehiivClient = {
      async findByEmail() {
        return { id: "sub_1", tags: [...tags] };
      },
      async create() {
        throw new Error("should not create when the subscriber exists");
      },
      async addTag(_id, tag) {
        added.push(tag);
        tags.push(tag);
      },
    };

    const fulfill = (session: Stripe.Checkout.Session) => fulfillPaidSession(session, beehiiv);
    const event = paidKitEvent();
    const run = () =>
      processWebhook({
        rawBody: "{}",
        signature: "t=1,v1=ok",
        webhookSecret: SECRET,
        constructEvent: () => event,
        fulfill: (session) => fulfill(session),
      });

    const first = await run();
    const second = await run();

    expect(first.outcome).toBe("tagged");
    expect(second.outcome).toBe("noop");
    expect(added).toEqual(["kit-buyer"]);
  });
});
