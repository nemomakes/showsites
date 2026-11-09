import { describe, expect, it } from "vitest";
import { creditStillValid, mintCreditToken, mintDownloadToken, verifyToken } from "../lib/tokens";

const SECRET = "test-signing-secret";
const NOW = 1_700_000_000;

describe("signed tokens", () => {
  it("signs and verifies a credit token", () => {
    const token = mintCreditToken("Buyer@Example.com", SECRET, NOW);
    expect(token).toBeTruthy();
    const payload = verifyToken(token!, SECRET, "credit");
    expect(payload).toMatchObject({ typ: "credit", email: "buyer@example.com", iat: NOW });
  });

  it("rejects a tampered signature", () => {
    const token = mintCreditToken("buyer@example.com", SECRET, NOW)!;
    const flipped = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
    expect(verifyToken(flipped, SECRET, "credit")).toBeNull();
    expect(verifyToken(token, "other-secret", "credit")).toBeNull();
  });

  it("expires credit tokens after KIT_CREDIT_DAYS and rejects the future", () => {
    const token = mintCreditToken("buyer@example.com", SECRET, NOW)!;
    const payload = verifyToken(token, SECRET, "credit")!;
    expect(creditStillValid(payload.iat, NOW + 60 * 86400, 60)).toBe(true);
    expect(creditStillValid(payload.iat, NOW + 60 * 86400 + 1, 60)).toBe(false);
    expect(creditStillValid(payload.iat, NOW - 121, 60)).toBe(false);
  });

  it("keeps download tokens valid with no expiry and refuses cross-use", () => {
    const download = mintDownloadToken("buyer@example.com", SECRET, NOW - 400 * 86400)!;
    const credit = mintCreditToken("buyer@example.com", SECRET, NOW)!;
    expect(verifyToken(download, SECRET, "download")).toMatchObject({ product: "kit", email: "buyer@example.com" });
    expect(verifyToken(credit, SECRET, "download")).toBeNull();
    expect(verifyToken(download, SECRET, "credit")).toBeNull();
  });
});
