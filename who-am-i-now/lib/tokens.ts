import { createHmac, timingSafeEqual } from "crypto";
import { normalizeEmail } from "./email";

export type TokenType = "credit" | "download";

export type TokenPayload = {
  typ: TokenType;
  email: string;
  iat: number;
  product?: "kit";
};

function signBody(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export function signToken(payload: TokenPayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${signBody(body, secret)}`;
}

export function verifyToken(token: string, secret: string, expected: TokenType): TokenPayload | null {
  if (!secret || !token) return null;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot !== token.lastIndexOf(".")) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expectedSig = signBody(body, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  let parsed: Partial<TokenPayload>;
  try {
    parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Partial<TokenPayload>;
  } catch {
    return null;
  }
  if (parsed.typ !== expected) return null;
  if (typeof parsed.email !== "string" || typeof parsed.iat !== "number" || !Number.isFinite(parsed.iat)) return null;
  const email = normalizeEmail(parsed.email);
  if (!email) return null;
  if (expected === "download" && parsed.product !== "kit") return null;
  return { typ: expected, email, iat: parsed.iat, product: expected === "download" ? "kit" : undefined };
}

/** True when issued-at is not in the future (beyond a small skew) and not older than `days`. */
export function creditStillValid(iat: number, nowSec: number, days: number): boolean {
  if (iat > nowSec + 120) return false;
  return nowSec - iat <= days * 86400;
}

export function mintCreditToken(email: string, secret: string, nowSec = Math.floor(Date.now() / 1000)): string | null {
  const normalized = normalizeEmail(email);
  if (!normalized || !secret) return null;
  return signToken({ typ: "credit", email: normalized, iat: nowSec }, secret);
}

export function mintDownloadToken(email: string, secret: string, nowSec = Math.floor(Date.now() / 1000)): string | null {
  const normalized = normalizeEmail(email);
  if (!normalized || !secret) return null;
  return signToken({ typ: "download", email: normalized, iat: nowSec, product: "kit" }, secret);
}
