import { describe, expect, it } from "vitest";
import { attributionFromUnknown, beehiivFields, sanitizeLabel, sanitizeUrl } from "../lib/attribution";
import { buildLeadPayload, hashEmail, sendMetaLead } from "../lib/meta-capi";

describe("utm sanitizer", () => {
  it("keeps allowed fields, limits length, and drops markup", () => {
    const long = "a".repeat(400);
    const attr = attributionFromUnknown({
      utm_source: "  facebook  ",
      utm_medium: "paid",
      utm_campaign: "november",
      utm_content: long,
      utm_term: "friends<age>",
      fbclid: "AbC-123",
      referring_site: "https://instagram.com/stories",
      event_source_url: "javascript:alert(1)",
      event_id: "not an id",
    });
    expect(attr.utm_source).toBe("facebook");
    expect(attr.utm_content).toHaveLength(200);
    expect(attr.utm_term).toBeUndefined();
    expect(attr.fbclid).toBe("AbC-123");
    expect(attr.referring_site).toBe("https://instagram.com/stories");
    expect(attr.event_source_url).toBeUndefined();
    expect(attr.event_id).toBeUndefined();
    expect(sanitizeLabel(123)).toBeUndefined();
    expect(sanitizeUrl("not a url")).toBeUndefined();
  });

  it("maps UTMs onto Beehiiv's native fields, including content and term", () => {
    const fields = beehiivFields(attributionFromUnknown({
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "friends",
      utm_content: "video-a",
      utm_term: "women 45",
      referring_site: "https://facebook.com/",
      fbclid: "click",
    }));
    expect(fields).toEqual({
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "friends",
      utm_content: "video-a",
      utm_term: "women 45",
      referring_site: "https://facebook.com/",
    });
    expect(fields).not.toHaveProperty("fbclid");
    expect(fields).not.toHaveProperty("custom_fields");
    expect(beehiivFields({}).utm_source).toBe("who-am-i-now-landing");
  });
});

describe("meta capi payload", () => {
  it("hashes the email and never puts the raw address in the payload", () => {
    const email = "Reader@Example.com";
    const payload = buildLeadPayload({
      email,
      eventId: "11111111-2222-4333-8444-555555555555",
      eventTime: 1_700_000_000,
      eventSourceUrl: "https://whoaminow.vercel.app/?utm_source=meta",
      ip: "203.0.113.8",
      userAgent: "TestAgent",
      fbclid: "IwAR123",
      testEventCode: "TEST123",
    });
    const event = payload.data[0] as { user_data: { em: string[]; fbc: string } };
    expect(event.user_data.em).toEqual([hashEmail(email)]);
    expect(event.user_data.fbc).toBe("fb.1.1700000000000.IwAR123");
    expect(payload.test_event_code).toBe("TEST123");
    expect(JSON.stringify(payload)).not.toContain("Reader@Example.com");
    expect(JSON.stringify(payload)).not.toContain("reader@example.com");
  });

  it("logs a failure without the email, its hash, or the access token", async () => {
    const previous = {
      pixel: process.env.META_PIXEL_ID,
      token: process.env.META_CAPI_ACCESS_TOKEN,
    };
    process.env.META_PIXEL_ID = "1234567890";
    process.env.META_CAPI_ACCESS_TOKEN = "super-secret-token";
    const lines: string[] = [];
    await sendMetaLead({
      email: "secret@example.com",
      eventTime: 1_700_000_000,
    }, {
      fetchImpl: async () => { throw new Error("network down secret@example.com super-secret-token"); },
      log: (message, status) => lines.push(`${message} ${status ?? ""}`),
    });
    const logged = lines.join("\n");
    expect(logged).toContain("meta capi failed");
    expect(logged).not.toContain("secret@example.com");
    expect(logged).not.toContain(hashEmail("secret@example.com"));
    expect(logged).not.toContain("super-secret-token");
    if (previous.pixel === undefined) delete process.env.META_PIXEL_ID;
    else process.env.META_PIXEL_ID = previous.pixel;
    if (previous.token === undefined) delete process.env.META_CAPI_ACCESS_TOKEN;
    else process.env.META_CAPI_ACCESS_TOKEN = previous.token;
  });
});
