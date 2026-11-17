import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy — Who Am I Now?",
  description: "How Who Am I Now? handles your email and the data used to measure our ads.",
};

export default function PrivacyPage() {
  return (
    <>
      <header className="topbar"><div className="wrap"><Link className="wordmark" href="/">Who Am I Now?</Link></div></header>
      <main className="privacy">
        <div className="wrap">
          <h1 className="h1">Privacy</h1>
          <p className="sub">Effective November 17, 2026. Written for people in the United States.</p>
          <div className="privacy-body">
            <p>Who Am I Now? is operated by Nemomakes, 785 Oak Grove Rd, Ste E2 #1220, Concord, CA 94518. You can reach us at <a href="mailto:hello@nemomakes.com">hello@nemomakes.com</a>.</p>

            <h2>What we collect</h2>
            <p>If you sign up for the free workbook, we collect your email address. We also keep the campaign details that brought you here, such as utm_source, utm_medium, utm_campaign, utm_content, and utm_term, plus the site that referred you, when your browser sends them.</p>
            <p>We store that with Beehiiv so we can email you the workbook and an occasional note. Every one of those emails has an unsubscribe link.</p>

            <h2>Ads</h2>
            <p>When we run ads, we use the Meta Pixel and Meta&apos;s Conversions API. That can set cookies in your browser and send Meta a hashed version of your email after you sign up, along with your IP address and browser, so we can tell whether an ad led to a signup. We do not send Meta your email in plain text. Meta&apos;s own policy is at <a href="https://www.facebook.com/privacy/policy/">facebook.com/privacy/policy</a>. You can review ad settings at <a href="https://www.facebook.com/adpreferences">facebook.com/adpreferences</a>.</p>
            <p>If those tools are turned off, this site does not load Meta&apos;s script and does not send signup events to Meta.</p>

            <h2>Site measurement</h2>
            <p>We use Vercel Web Analytics. It is cookieless and aggregated. It tells us things like which pages were viewed. It does not identify you.</p>

            <h2>Selling data</h2>
            <p>We do not sell your information.</p>

            <h2>Deletion</h2>
            <p>To ask us to delete the email we have for you, email <a href="mailto:hello@nemomakes.com">hello@nemomakes.com</a>. Unsubscribing stops future emails. A deletion request is separate, and we will remove what we can from Beehiiv.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
