import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PaidChrome } from "@/components/PaidChrome";
import { KIT_BUY_LABEL, KIT_NAME, KIT_POLICY, KIT_PRICE_LABEL } from "@/lib/products";

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
            <h1 className="h1">Places, scripts, and a plan for friends your age</h1>
            <p className="offer-sub">A printable playbook for when the school years stopped bringing people to you.</p>
            <ul className="offer-list">
              <li>Where women your age actually show up</li>
              <li>What to say, and first texts you can send</li>
              <li>How to turn one coffee into a real friendship, plus a 4-week plan</li>
            </ul>
            <p className="fine offer-support">Companion to the free Who Am I Now? workbook.</p>
            <p className="offer-price">{KIT_PRICE_LABEL}</p>
            <p className="fine offer-note">{KIT_POLICY}</p>
            <div className="offer-buy">
              <CheckoutButton endpoint="/api/checkout/kit" label={KIT_BUY_LABEL} />
            </div>
          </div>
        </div>
      </section>
    </PaidChrome>
  );
}
