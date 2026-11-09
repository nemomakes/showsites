"use client";

import { useState } from "react";

export function CheckoutButton({
  endpoint,
  token,
  label,
}: {
  endpoint: string;
  token?: string;
  label: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function start() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { token } : {}),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; message?: string };
      if (!res.ok || !data.url) {
        setError(data.message || "checkout not configured");
        setBusy(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
      setBusy(false);
    }
  }

  return (
    <>
      <button className="btn" type="button" onClick={start} disabled={busy} aria-busy={busy}>
        {label}
      </button>
      {error ? (
        <p className="form-msg form-msg--error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
