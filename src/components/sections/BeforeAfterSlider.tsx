"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Stand-in for skincare photography: an abstract macro "skin" surface built
 * from layered gradients. The `state` prop swaps texture, tone and blemishes
 * so the two halves read as genuinely different skin conditions.
 */
function SkinPanel({ state }: { state: "before" | "after" }) {
  const isBefore = state === "before";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base complexion */}
      <div
        className="absolute inset-0"
        style={{
          background: isBefore
            ? "linear-gradient(150deg, #D8B79B 0%, #C9A183 45%, #B08B70 100%)"
            : "linear-gradient(150deg, #F3DCC4 0%, #E8C6A6 45%, #D9AE8D 100%)",
        }}
      />

      {/* Cheek / forehead volume */}
      <div
        className="absolute inset-0"
        style={{
          background: isBefore
            ? "radial-gradient(ellipse 60% 45% at 32% 30%, rgba(255,255,255,0.10), transparent 70%), radial-gradient(ellipse 50% 40% at 72% 68%, rgba(90,60,45,0.28), transparent 70%)"
            : "radial-gradient(ellipse 55% 42% at 34% 28%, rgba(255,255,255,0.55), transparent 68%), radial-gradient(ellipse 45% 38% at 70% 66%, rgba(255,240,225,0.35), transparent 70%)",
        }}
      />

      {/* Blemishes and uneven tone — only on the "before" half */}
      {isBefore && (
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[
            [22, 34, 9],
            [38, 62, 6],
            [63, 28, 7],
            [71, 55, 10],
            [48, 44, 5],
            [30, 76, 8],
            [82, 40, 6],
            [56, 18, 5],
            [18, 52, 6],
            [66, 80, 7],
          ].map(([x, y, r], index) => (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="#8A5A44"
              opacity={index % 3 === 0 ? 0.3 : 0.18}
            />
          ))}
          {/* Dull, flat overlay */}
          <rect width="100%" height="100%" fill="#6B5A4E" opacity="0.16" />
        </svg>
      )}

      {/* Dewy highlights on the "after" half */}
      {!isBefore && (
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[
            [30, 32, 26],
            [62, 58, 20],
            [46, 22, 14],
            [76, 36, 12],
          ].map(([x, y, r], index) => (
            <circle key={index} cx={`${x}%`} cy={`${y}%`} r={r} fill="#FFFFFF" opacity="0.14" />
          ))}
        </svg>
      )}

      {/* Pore grain — texture keeps it from reading as a flat gradient */}
      <div className="grain absolute inset-0 opacity-70" />
    </div>
  );
}

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);

  /** Converts a viewport x-coordinate into a 0–100 divider position. */
  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  // Listeners live on the window so the drag survives the cursor leaving the
  // component — the single most common failure of hand-rolled sliders.
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (event: PointerEvent) => {
      event.preventDefault();
      updateFromClientX(event.clientX);
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener("pointermove", handleMove, { passive: false });
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [isDragging, updateFromClientX]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <section id="hasil" className="relative overflow-hidden bg-shell py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Hasil nyata pelanggan"
          title={
            <>
              Geser untuk lihat <em className="font-normal italic text-sage-deep">bedanya</em>
            </>
          }
          description="Dokumentasi asli salah satu pelanggan kami, diambil dengan pencahayaan dan sudut yang sama. Tanpa filter, tanpa retouching."
        />

        <Reveal delay={0.1} className="mt-14">
          <div
            ref={containerRef}
            onPointerDown={(event) => {
              setIsDragging(true);
              updateFromClientX(event.clientX);
            }}
            className={cn(
              "relative aspect-[16/11] w-full select-none overflow-hidden rounded-[2rem] border border-sage/20 shadow-[0_40px_90px_-50px_rgba(44,53,49,0.55)] sm:aspect-[16/9]",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            // touch-none stops the browser hijacking the drag as a page scroll
            style={{ touchAction: "none" }}
          >
            {/* AFTER sits underneath and is revealed as the divider moves left */}
            <SkinPanel state="after" />

            {/* BEFORE is clipped to the left of the divider */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <SkinPanel state="before" />
            </div>

            {/* Labels */}
            <div className="pointer-events-none absolute left-5 top-5 z-20">
              <span className="rounded-full border border-white/30 bg-charcoal/55 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                Before · 14 Hari Lalu
              </span>
            </div>
            <div className="pointer-events-none absolute right-5 top-5 z-20">
              <span className="rounded-full border border-white/40 bg-white/80 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-charcoal backdrop-blur-sm">
                After · Hari Ini
              </span>
            </div>

            {/* Caption */}
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 flex flex-wrap items-end justify-between gap-3">
              <div className="rounded-2xl border border-white/25 bg-charcoal/45 px-4 py-3 backdrop-blur-md">
                <p className="font-display text-lg italic leading-none text-cream">Rina, 27</p>
                <p className="mt-1.5 text-[0.75rem] text-cream/75">
                  Glow Serum + Gentle Cleanser · 14 hari pemakaian
                </p>
              </div>
            </div>

            {/* Divider + handle */}
            <div
              className="absolute inset-y-0 z-30 w-px bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.65)]"
              style={{ left: `${position}%` }}
            >
              <motion.button
                type="button"
                onKeyDown={handleKeyDown}
                animate={{ scale: isDragging ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/95 shadow-[0_8px_24px_rgba(44,53,49,0.35)]"
                aria-label="Geser untuk membandingkan sebelum dan sesudah"
                role="slider"
                aria-valuenow={Math.round(position)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <MoveHorizontal width={18} height={18} className="text-charcoal" strokeWidth={1.8} />
              </motion.button>
            </div>
          </div>
        </Reveal>

        {/* Supporting metrics */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-sage/15 bg-sage/15 sm:grid-cols-3">
          {[
            { value: "94%", label: "merasa kulit lebih lembap dalam 7 hari" },
            { value: "87%", label: "bekas jerawat terlihat memudar di minggu ke-4" },
            { value: "4.9/5", label: "rata-rata kepuasan dari 3.284 ulasan" },
          ].map((stat, index) => (
            <Reveal key={stat.value} delay={index * 0.1} className="bg-shell p-7 text-center">
              <p className="font-display text-4xl tracking-tight text-sage-deep">{stat.value}</p>
              <p className="mx-auto mt-2 max-w-[15rem] text-[0.8125rem] leading-relaxed text-charcoal-soft">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
