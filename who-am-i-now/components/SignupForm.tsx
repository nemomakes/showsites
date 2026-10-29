"use client";
import { useId, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function SignupForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-msg form-msg--success" role="status" aria-live="polite">
        [SUCCESS MESSAGE - from Copywriter]
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
        <p className="form-msg form-msg--error" role="alert">[ERROR MESSAGE - from Copywriter]</p>
      )}
      <p className="fine">Free. One email with your PDF, then an occasional note. Unsubscribe anytime.</p>
    </form>
  );
}
