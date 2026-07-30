"use client";

import { Instagram, Music2, Sparkles, Youtube } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const NAV_COLUMNS = [
  {
    title: "Jelajahi",
    links: [
      { label: "Skin Quiz", id: "quiz" },
      { label: "Hasil Nyata", id: "hasil" },
      { label: "Semua Produk", id: "produk" },
      { label: "Paket Hemat", id: "paket" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Ulasan Pelanggan", id: "ulasan" },
      { label: "FAQ", id: "faq" },
      { label: "Cara Pemakaian", id: "faq" },
      { label: "Kebijakan Retur", id: "faq" },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Music2, label: "TikTok", href: "https://tiktok.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

/** Marketplace + payment badges, drawn as text marks to stay dependency-free. */
const PAYMENT_BADGES = [
  { label: "Shopee", tone: "#EE4D2D" },
  { label: "Tokopedia", tone: "#42B549" },
  { label: "QRIS", tone: "#E31E24" },
  { label: "WhatsApp", tone: "#128C7E" },
  { label: "Transfer Bank", tone: "#2C3531" },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-sage/15 bg-shell">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Sparkles width={18} height={18} className="text-sage" strokeWidth={1.6} />
              <span className="font-display text-2xl leading-none tracking-tight text-charcoal">
                Glow<span className="italic text-sage-deep">Skin</span>
              </span>
            </div>

            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-charcoal-soft">
              Skincare lokal yang diformulasikan bersama dermatolog Indonesia, untuk iklim tropis dan
              warna kulit Indonesia. Terdaftar BPOM, bebas alkohol dan pewangi sintetis.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/25 text-charcoal/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-sage-deep hover:bg-white hover:text-sage-deep"
                >
                  <social.icon width={16} height={16} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="eyebrow text-charcoal/40">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-[0.875rem] text-charcoal-soft transition-colors duration-300 hover:text-sage-deep"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p className="eyebrow text-charcoal/40">Hubungi Kami</p>
            <ul className="mt-5 space-y-3 text-[0.875rem] text-charcoal-soft">
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-sage-deep"
                >
                  WhatsApp · +62 812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:halo@glowskin.id"
                  className="transition-colors hover:text-sage-deep"
                >
                  halo@glowskin.id
                </a>
              </li>
              <li className="leading-relaxed text-charcoal/55">
                Senin–Sabtu, 09.00–18.00 WIB
                <br />
                Jakarta Selatan, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Payment / marketplace badges */}
        <div className="mt-14 border-t border-sage/15 pt-8">
          <p className="eyebrow text-charcoal/40">Metode Pembayaran</p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {PAYMENT_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="flex h-9 items-center gap-2 rounded-lg border border-sage/20 bg-white/70 px-3.5 text-[0.75rem] font-semibold text-charcoal/70"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: badge.tone }}
                  aria-hidden="true"
                />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-sage/15 pt-7 sm:flex-row sm:items-center">
          <p className="text-[0.75rem] text-charcoal/45">
            © {year} GlowSkin Indonesia. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[0.75rem] text-charcoal/40">
            Merek fiktif — dibuat sebagai studi kasus desain & frontend.
          </p>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="-mb-[0.18em] translate-y-[0.12em] text-center font-display text-[22vw] leading-none tracking-[-0.04em] text-sage/10">
          GlowSkin
        </p>
      </div>
    </footer>
  );
}
