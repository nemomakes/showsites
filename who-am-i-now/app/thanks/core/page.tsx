import type { Metadata } from "next";
import { PaidChrome } from "@/components/PaidChrome";
import { CORE_NAME } from "@/lib/products";
import { checkPaidSession } from "@/lib/session-check";

export const metadata: Metadata = {
  title: CORE_NAME,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ThanksCorePage({ searchParams }: { searchParams: Promise<{ session_id?: string | string[] }> }) {
  const params = await searchParams;
  const raw = Array.isArray(params.session_id) ? params.session_id[0] : params.session_id;
  const check = raw ? await checkPaidSession(raw) : { state: "not_paid" as const };
  const ready = check.state === "paid" && check.product === "core";

  return (
    <PaidChrome>
      <section className="offer">
        <div className="wrap">
          <div className="offer-card">
            <p className="wk">{CORE_NAME}</p>
            <h1 className="h1">[CORE THANKS]</h1>
            {ready ? <p className="body-lg">[CORE THANKS BODY]</p> : null}
            {check.state === "unconfigured" ? <p className="offer-note">checkout not configured</p> : null}
            {!ready && check.state !== "unconfigured" ? <p className="offer-note">checkout not confirmed</p> : null}
          </div>
        </div>
      </section>
    </PaidChrome>
  );
}
