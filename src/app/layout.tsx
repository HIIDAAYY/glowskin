import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/** Display face — the serif carries the luxury/editorial half of the brand. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Body face — modern, highly legible at small sizes. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * Absolute base for OG/Twitter image URLs, most specific source first:
 *   1. NEXT_PUBLIC_SITE_URL          — set this once a custom domain is live
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production domain
 *   3. VERCEL_URL                    — the per-deployment URL (preview builds)
 *   4. localhost                     — local development
 * Preferring (2) over (3) keeps production cards pointing at the durable domain
 * rather than a one-off deployment hostname.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GlowSkin — Kulit Glowing & Sehat Alami Dalam 14 Hari",
  description:
    "Rangkaian skincare lokal bersertifikat BPOM dengan bahan alami dan hasil teruji klinis. Temukan rutinitas yang cocok untuk tipe kulitmu dalam 60 detik.",
  keywords: ["skincare", "glowing", "BPOM", "serum", "sunscreen", "GlowSkin"],
  openGraph: {
    title: "GlowSkin — Kulit Glowing & Sehat Alami Dalam 14 Hari",
    description:
      "Rangkaian skincare lokal bersertifikat BPOM dengan bahan alami dan hasil teruji klinis.",
    type: "website",
    locale: "id_ID",
  },
  // Without this, X/Twitter renders a small square thumbnail instead of the
  // full 1200x630 card.
  twitter: {
    card: "summary_large_image",
    title: "GlowSkin — Kulit Glowing & Sehat Alami Dalam 14 Hari",
    description:
      "Rangkaian skincare lokal bersertifikat BPOM dengan bahan alami dan hasil teruji klinis.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
