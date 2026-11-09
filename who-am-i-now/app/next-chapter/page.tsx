import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PaidChrome } from "@/components/PaidChrome";
import { creditTokenIsValid } from "@/lib/credit";
import { coreRefundPolicy, CORE_NAME, CORE_NOT_THERAPY, CORE_PRICE_LABEL, CORE_WITH_CREDIT_LABEL, KIT_CREDIT_NOTE } from "@/lib/products";

export const metadata: Metadata = {
  title: CORE_NAME,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NextChapterPage({ searchParams }: { searchParams: Promise<{ t?: string | string[] }> }) {
  const params = await searchParams;
  const raw = Array.isArray(params.t) ? params.t[0] : params.t;
  const credit = creditTokenIsValid(raw);
  const price = credit ? CORE_WITH_CREDIT_LABEL : CORE_PRICE_LABEL;

  return (
    <PaidChrome>
      <section className="offer">
        <div className="wrap">
          <div className="offer-card">
            <p className="wk">{CORE_NAME}</p>
            <h1 className="h1">[CORE HEADLINE]</h1>
            <p className="body-lg">[CORE BULLETS]</p>
            <p className="offer-price">{price}</p>
            {credit ? <p className="offer-note">{KIT_CREDIT_NOTE}</p> : null}
            <p className="offer-note">{CORE_NOT_THERAPY}</p>
            <p className="fine offer-note">{coreRefundPolicy()}</p>
            <div className="offer-buy">
              <CheckoutButton endpoint="/api/checkout/core" token={credit ? raw : undefined} label={`${CORE_NAME} — ${price}`} />
            </div>
          </div>
        </div>
      </section>
    </PaidChrome>
  );
}
