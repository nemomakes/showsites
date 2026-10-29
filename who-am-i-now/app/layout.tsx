import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["400"], variable: "--font-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const description = "This free 30-day workbook helps you find out, and ends with one real next step.";

export const metadata: Metadata = {
  title: "Who Am I Now?",
  description,
  openGraph: { title: "Who Am I Now?", description },
};
export const viewport: Viewport = { themeColor: "#FFFAF5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
