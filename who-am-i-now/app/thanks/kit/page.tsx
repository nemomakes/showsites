import type { Metadata } from "next";
import { PaidChrome } from "@/components/PaidChrome";
import { KIT_NAME } from "@/lib/products";
import { checkPaidSession } from "@/lib/session-check";

export const metadata: Metadata = {
  title: KIT_NAME,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ThanksKitPage({ searchParams }: { searchParams: Promise<{ session_id?: string | string[] }> }) {
  const params = await searchParams;
  const raw = Array.isArray(params.session_id) ? params.session_id[0] : params.session_id;
  const check = raw ? await checkPaidSession(raw) : { state: "not_paid" as const };
  const ready = check.state === "paid" && check.product === "kit";

  return (
    <PaidChrome>
      <section className="offer">
        <div className="wrap">
          <div className="offer-card">
            <p className="wk">{KIT_NAME}</p>
            <h1 className="h1">[KIT THANKS]</h1>
            {check.state === "unconfigured" ? <p className="offer-note">checkout not configured</p> : null}
            {ready && raw ? (
              <div className="offer-buy">
                <a className="btn" href={`/api/kit/download?session_id=${encodeURIComponent(raw)}`}>
                  {KIT_NAME}
                </a>
              </div>
            ) : check.state === "unconfigured" ? null : (
              <p className="offer-note">checkout not confirmed</p>
            )}
          </div>
        </div>
      </section>
    </PaidChrome>
  );
}
