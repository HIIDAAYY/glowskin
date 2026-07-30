"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { TESTIMONIALS, TESTIMONIAL_TABS } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import type { TestimonialTag } from "@/types";

export function Testimonials() {
  const [filter, setFilter] = useState<TestimonialTag | "all">("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? TESTIMONIALS
        : TESTIMONIALS.filter((testimonial) => testimonial.tag === filter),
    [filter],
  );

  return (
    <section id="ulasan" className="relative overflow-hidden bg-shell py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-20 h-[26rem] w-[26rem] rounded-full bg-blush/50 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="12.400+ pelanggan"
          title={
            <>
              Yang mereka <em className="font-normal italic text-sage-deep">rasakan</em>
            </>
          }
          description="Semua ulasan berasal dari pembeli terverifikasi. Kami tidak menghapus ulasan bintang empat — kritik itu yang bikin formula kami berkembang."
        />

        {/* Concern filter */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-sage/20 bg-white/60 p-1.5 backdrop-blur-sm">
            {TESTIMONIAL_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[0.8125rem] font-medium transition-colors duration-300",
                  filter === tab.value ? "text-cream" : "text-charcoal/60 hover:text-charcoal",
                )}
              >
                {filter === tab.value && (
                  <motion.span
                    layoutId="testimonial-filter-pill"
                    className="absolute inset-0 rounded-full bg-sage-deep"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-ish grid */}
        <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((testimonial, index) => (
              <motion.li
                key={testimonial.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col rounded-[1.5rem] border border-sage/15 bg-white/70 p-6 transition-shadow duration-500 hover:shadow-[0_28px_60px_-40px_rgba(44,53,49,0.45)]"
              >
                <Quote
                  className="absolute right-5 top-5 text-sage/15 transition-colors duration-500 group-hover:text-sage/25"
                  width={34}
                  height={34}
                  strokeWidth={1.2}
                />

                <StarRating rating={testimonial.rating} size={13} />

                <p className="relative mt-4 flex-1 font-display text-[1.3125rem] leading-snug tracking-tight text-charcoal">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-sage/15 pt-5">
                  {/* Generated avatar — initials on the reviewer's own gradient */}
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold text-white/95"
                    style={{
                      background: `linear-gradient(135deg, ${testimonial.avatarPalette[0]}, ${testimonial.avatarPalette[1]})`,
                    }}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[0.875rem] font-semibold text-charcoal">
                        {testimonial.name}
                      </p>
                      {testimonial.verified && (
                        <BadgeCheck
                          width={14}
                          height={14}
                          className="shrink-0 text-sage-deep"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                    <p className="truncate text-[0.6875rem] text-charcoal/50">
                      {testimonial.location} · {testimonial.daysUsed} hari pemakaian
                    </p>
                  </div>
                </div>

                <p className="mt-3 truncate rounded-full bg-sage-mist/50 px-3 py-1.5 text-[0.6875rem] font-medium text-sage-deep">
                  {testimonial.product}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-charcoal/50">
            Belum ada ulasan untuk kategori ini.
          </p>
        )}
      </div>
    </section>
  );
}
