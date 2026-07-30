"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

const ASSURANCES = [
  { icon: Truck, label: "Gratis ongkir seluruh Indonesia" },
  { icon: ShieldCheck, label: "Garansi 30 hari uang kembali" },
  { icon: Sparkles, label: "Konsultasi kulit gratis" },
];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-cream px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative overflow-hidden rounded-[2.5rem] bg-charcoal px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24"
        >
          {/* Background pattern — concentric rings + soft colour blooms */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
            aria-hidden="true"
          >
            <defs>
              <pattern id="cta-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M56 0H0v56" fill="none" stroke="#FAF6F0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sage/30 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-clay/25 blur-[110px]"
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-cream/80 backdrop-blur-sm">
              <Sparkles width={12} height={12} strokeWidth={2} />
              Promo bulan ini · Kode GLOW20
            </span>

            <h2 className="mx-auto mt-7 max-w-3xl font-display text-[2.75rem] leading-[1.03] tracking-[-0.025em] text-cream text-balance sm:text-6xl lg:text-[4.25rem]">
              Kulit sehat itu{" "}
              <em className="font-normal italic text-sage">bukan keberuntungan</em> — tapi rutinitas
              yang tepat
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-cream/65 text-balance">
              Mulai dari skin quiz 60 detik. Gratis, tanpa daftar, dan kamu langsung tahu produk mana
              yang benar-benar dibutuhkan kulitmu.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="blush"
                onClick={() => scrollToSection("quiz")}
                className="w-full sm:w-auto"
              >
                Temukan Rutinitasmu
                <ArrowRight
                  width={16}
                  height={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button
                size="lg"
                onClick={() => scrollToSection("paket")}
                className="w-full border border-cream/25 bg-transparent text-cream hover:bg-cream/10 sm:w-auto"
                variant="ghost"
              >
                Lihat Paket Hemat
              </Button>
            </div>

            {/* Assurance row */}
            <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {ASSURANCES.map((assurance) => (
                <li
                  key={assurance.label}
                  className="flex items-center gap-2 text-[0.75rem] text-cream/55"
                >
                  <assurance.icon width={14} height={14} className="text-sage" strokeWidth={1.7} />
                  {assurance.label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
