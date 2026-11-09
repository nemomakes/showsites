import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PaidChrome } from "@/components/PaidChrome";
import { resolveCoreCredit } from "@/lib/credit";
import { CORE_BUY_LABEL, CORE_BUY_LABEL_CREDIT, CORE_NAME, CORE_NOT_THERAPY, CORE_PRICE_LABEL, CORE_WITH_CREDIT_LABEL, coreRefundPolicy, KIT_CREDIT_NOTE, kitCreditDays, kitCreditWindowLine } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: CORE_NAME,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NextChapterPage({ searchParams }: { searchParams: Promise<{ t?: string | string[] }> }) {
  const params = await searchParams;
  const raw = Array.isArray(params.t) ? params.t[0] : params.t;
  const credit = await resolveCoreCredit(raw, getStripe());
  const price = credit.discount ? CORE_WITH_CREDIT_LABEL : CORE_PRICE_LABEL;

  return (
    <PaidChrome>
      <section className="offer">
        <div className="wrap">
          <div className="offer-card">
            <p className="wk">{CORE_NAME}</p>
            <h1 className="h1">Six weeks to shape what comes next</h1>
            <p className="offer-sub">A self-paced program by email. One short lesson, one worksheet, one small action each week.</p>
            <ul className="offer-list">
              <li>A new routine, and a clearer way to say who you are now</li>
              <li>Skills you already have, and work or income options that fit</li>
              <li>Finding people your age, then a simple 90-day plan</li>
            </ul>
            <p className="offer-note">{CORE_NOT_THERAPY}</p>
            <p className="offer-price">{price}</p>
            {credit.discount ? (
              <>
                <p className="offer-note">{KIT_CREDIT_NOTE}</p>
                <p className="offer-note">{kitCreditWindowLine(kitCreditDays())}</p>
              </>
            ) : null}
            <p className="fine offer-note">{coreRefundPolicy()}</p>
            <div className="offer-buy">
              <CheckoutButton endpoint="/api/checkout/core" token={credit.discount ? raw : undefined} label={credit.discount ? CORE_BUY_LABEL_CREDIT : CORE_BUY_LABEL} />
            </div>
          </div>
        </div>
      </section>
    </PaidChrome>
  );
}
