"use client";
import { useId, useState } from "react";
import { readAttribution } from "@/components/AttributionCapture";
import { trackLead } from "@/components/MetaPixel";

type Status = "idle" | "sending" | "success" | "error";

function cookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function SignupForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const eventId = crypto.randomUUID();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          event_id: eventId,
          event_source_url: window.location.href,
          referring_site: document.referrer,
          fbp: cookieValue("_fbp"),
          fbc: cookieValue("_fbc"),
          ...readAttribution(),
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      trackLead(eventId);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-msg form-msg--success" role="status" aria-live="polite">
        <p className="form-msg-title">You&apos;re in. Your workbook is on its way.</p>
        <p>Check your inbox in a few minutes (and your spam folder, just in case).</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <label htmlFor={id} className="form-label">Where should we send your workbook?</label>
      <input
        id={id}
        className="input"
        type="email"
        name="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
        disabled={status === "sending"}
      />
      <button className="btn" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
        Send me the workbook
      </button>
      {status === "error" && (
        <p className="form-msg form-msg--error" role="alert">Something went wrong. Please try again in a moment.</p>
      )}
      <p className="fine">Free PDF by email, plus an occasional note. Unsubscribe anytime.</p>
    </form>
  );
}
