import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PaidChrome } from "@/components/PaidChrome";
import { KIT_NAME, KIT_POLICY, KIT_PRICE_LABEL } from "@/lib/products";

export const metadata: Metadata = {
  title: KIT_NAME,
  robots: { index: false, follow: false },
};

export default function KitPage() {
  return (
    <PaidChrome>
      <section className="offer">
        <div className="wrap">
          <div className="offer-card">
            <p className="wk">{KIT_NAME}</p>
            <h1 className="h1">[KIT HEADLINE]</h1>
            <p className="body-lg">[KIT BULLETS]</p>
            <p className="offer-price">{KIT_PRICE_LABEL}</p>
            <p className="fine offer-note">{KIT_POLICY}</p>
            <div className="offer-buy">
              <CheckoutButton endpoint="/api/checkout/kit" label={`${KIT_NAME} — ${KIT_PRICE_LABEL}`} />
            </div>
          </div>
        </div>
      </section>
    </PaidChrome>
  );
}
