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

export const metadata: Metadata = {
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
