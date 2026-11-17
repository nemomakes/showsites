"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { UTM_KEYS, sanitizeLabel, type Attribution } from "@/lib/attribution";

const STORAGE_KEY = "wainow-attr";

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Attribution = {};
    for (const key of UTM_KEYS) {
      const value = sanitizeLabel(parsed[key]);
      if (value) out[key] = value;
    }
    const fbclid = sanitizeLabel(parsed.fbclid);
    if (fbclid) out.fbclid = fbclid;
    return out;
  } catch {
    return {};
  }
}

function writeAttribution(next: Attribution) {
  const current = readAttribution();
  const merged = { ...current, ...next };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function AttributionCapture() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const found: Attribution = {};
    let any = false;
    for (const key of UTM_KEYS) {
      const value = sanitizeLabel(search.get(key));
      if (value) {
        found[key] = value;
        any = true;
      }
    }
    const fbclid = sanitizeLabel(search.get("fbclid"));
    if (fbclid) {
      found.fbclid = fbclid;
      any = true;
    }
    if (any) writeAttribution(found);
  }, [pathname, search]);

  return null;
}
