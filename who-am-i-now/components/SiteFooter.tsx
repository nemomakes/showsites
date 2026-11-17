import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="wordmark">Who Am I Now?</span>
        <p className="footer-links"><Link href="/privacy">Privacy</Link></p>
      </div>
    </footer>
  );
}
