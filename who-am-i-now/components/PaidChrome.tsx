import type { ReactNode } from "react";

export function PaidChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="wrap">
          <span className="wordmark">Who Am I Now?</span>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="wrap">
          <span className="wordmark">Who Am I Now?</span>
        </div>
      </footer>
    </>
  );
}
