"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { StarRating } from "@/components/ui/StarRating";
import { scrollToSection } from "@/lib/utils";

/** Floating credibility chips positioned around the product mockup. */
const TRUST_BADGES = [
  {
    icon: Leaf,
    label: "100% Organic",
    sub: "Bahan aktif nabati",
    // Percent-based coordinates keep the badges anchored as the stage resizes.
    position: "left-[-4%] top-[14%]",
    float: "animate-float-slow",
    delay: 0.9,
  },
  {
    icon: ShieldCheck,
    label: "BPOM Approved",
    sub: "NA18230700123",
    position: "right-[-6%] top-[38%]",
    float: "animate-float-slower",
    delay: 1.05,
  },
  {
    icon: Stethoscope,
    label: "Dermatologically Tested",
    sub: "Uji klinis 8 minggu",
    position: "bottom-[12%] left-[-8%]",
    float: "animate-float-slower",
    delay: 1.2,
  },
];

const MARQUEE_ITEMS = [
  "Gratis ongkir seluruh Indonesia",
  "Garansi 30 hari uang kembali",
  "Tanpa alkohol & pewangi sintetis",
  "Cruelty free",
  "Dikirim dari Jakarta & Surabaya",
  "Konsultasi kulit gratis via WhatsApp",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-0 sm:pt-36 lg:pt-40">
      {/* Ambient organic washes — soft, blurred, off-grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-blush opacity-70 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-64 h-[30rem] w-[30rem] rounded-full bg-sage-mist opacity-60 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8">
        {/* ---------------- Copy column ---------------- */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-sage/25 bg-white/60 py-1.5 pl-2 pr-4 backdrop-blur-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-deep">
              <Sparkles width={12} height={12} className="text-cream" strokeWidth={2} />
            </span>
            <span className="text-[0.75rem] font-medium tracking-tight text-charcoal/75">
              Dipercaya 12.400+ pelanggan di Indonesia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[3.25rem] leading-[0.98] tracking-[-0.025em] text-charcoal sm:text-[4.25rem] lg:text-[5.25rem]"
          >
            Kulit{" "}
            <span className="relative inline-block italic text-sage-deep">
              Glowing
              {/* Hand-drawn underline that draws itself on load */}
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute -bottom-1 left-0 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 8C40 3 90 2 128 5c26 2 48 4 70 2"
                  stroke="#B98A6E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
                />
              </motion.svg>
            </span>{" "}
            & Sehat Alami Dalam 14 Hari
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal-soft"
          >
            Formulasi dari{" "}
            <span className="font-medium text-charcoal">bahan aktif alami</span>, sudah{" "}
            <span className="font-medium text-charcoal">terdaftar BPOM</span>, dan terbukti secara
            klinis menaikkan kadar hidrasi kulit hingga{" "}
            <span className="font-medium text-charcoal">63% dalam 8 minggu</span> — tanpa alkohol
            dan pewangi sintetis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button size="lg" onClick={() => scrollToSection("quiz")}>
              Temukan Rutinitasmu
              <ArrowRight
                width={16}
                height={16}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("produk")}>
              Lihat Produk
            </Button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {[
                ["#E8C9A0", "#C99A63"],
                ["#F7DFE0", "#DFA0A6"],
                ["#DCE6DA", "#8A9A86"],
                ["#E4DCEC", "#9E8CB0"],
              ].map(([from, to], index) => (
                <span
                  key={index}
                  className="h-9 w-9 rounded-full border-2 border-cream"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                />
              ))}
            </div>
            <div>
              <StarRating rating={4.9} size={13} />
              <p className="mt-0.5 text-[0.75rem] text-charcoal/55">
                <span className="font-semibold text-charcoal">4.9/5</span> dari 3.284 ulasan
                terverifikasi
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------------- Product stage ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full">
            {/* Layered plinth the bottles sit on */}
            <div className="grain absolute inset-x-4 bottom-0 top-8 overflow-hidden rounded-[3rem] bg-gradient-to-b from-shell via-blush/60 to-sage-mist/70" />
            <div className="absolute inset-x-4 bottom-0 top-8 rounded-[3rem] ring-1 ring-inset ring-white/50" />

            {/* Hero bottle */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[16%] h-[64%] w-[46%] -translate-x-1/2 drop-shadow-[0_28px_45px_rgba(44,53,49,0.18)]"
            >
              <ProductVisual vessel="dropper" palette={["#E8C9A0", "#C99A63"]} />
            </motion.div>

            {/* Supporting bottles, deliberately overlapping the hero */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute bottom-[8%] left-[10%] h-[42%] w-[30%] drop-shadow-[0_18px_32px_rgba(44,53,49,0.15)]"
            >
              <ProductVisual vessel="pump" palette={["#DCE6DA", "#8A9A86"]} />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute bottom-[10%] right-[9%] h-[38%] w-[28%] drop-shadow-[0_18px_32px_rgba(44,53,49,0.15)]"
            >
              <ProductVisual vessel="tube" palette={["#FBEBD6", "#EFC178"]} />
            </motion.div>

            {/* Floating trust badges */}
            {TRUST_BADGES.map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: badge.delay, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${badge.position} ${badge.float} z-20`}
              >
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/85 py-2.5 pl-2.5 pr-4 shadow-[0_10px_30px_-14px_rgba(44,53,49,0.4)] backdrop-blur-md">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage-mist">
                    <badge.icon width={14} height={14} className="text-sage-deep" strokeWidth={1.8} />
                  </span>
                  <span className="whitespace-nowrap">
                    <span className="block text-[0.75rem] font-semibold leading-tight text-charcoal">
                      {badge.label}
                    </span>
                    <span className="block text-[0.6875rem] leading-tight text-charcoal/50">
                      {badge.sub}
                    </span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Infinite trust marquee closing the hero */}
      <div className="relative mt-16 overflow-hidden border-y border-sage/15 bg-shell/60 py-3.5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-6 whitespace-nowrap px-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-charcoal/45"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-clay/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
