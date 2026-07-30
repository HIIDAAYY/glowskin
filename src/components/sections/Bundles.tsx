"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BUNDLES } from "@/data/bundles";
import { cn, formatIDR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function Bundles() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section id="paket" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-sage-mist/40 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Hemat sampai 35%"
          title={
            <>
              Pilih paket yang <em className="font-normal italic text-sage-deep">pas</em> untukmu
            </>
          }
          description="Membeli dalam paket lebih hemat dan memastikan urutan rutinitasmu lengkap sejak hari pertama."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {BUNDLES.map((bundle, index) => {
            const savings = bundle.compareAtPrice - bundle.price;
            const savingsPercent = Math.round((savings / bundle.compareAtPrice) * 100);

            return (
              <motion.article
                key={bundle.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 transition-shadow duration-500",
                  bundle.highlighted
                    ? // The featured plan lifts out of the row and inverts to dark
                      "border-charcoal/20 bg-charcoal text-cream shadow-[0_40px_90px_-45px_rgba(44,53,49,0.75)] lg:-mt-6 lg:pb-10"
                    : "border-sage/20 bg-white/70 hover:shadow-[0_30px_70px_-45px_rgba(44,53,49,0.45)]",
                )}
              >
                {bundle.highlighted && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sage/25 blur-3xl"
                    />
                    <span className="absolute right-6 top-7 inline-flex items-center gap-1.5 rounded-full bg-clay px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cream">
                      <Sparkles width={11} height={11} strokeWidth={2} />
                      Paling Populer
                    </span>
                  </>
                )}

                {/* Vessel motif */}
                <div className="relative h-20 w-16">
                  <ProductVisual vessel={bundle.vessel} palette={bundle.palette} shadow={false} />
                </div>

                <h3
                  className={cn(
                    "mt-5 font-display text-[2rem] leading-tight tracking-tight",
                    bundle.highlighted ? "text-cream" : "text-charcoal",
                  )}
                >
                  {bundle.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[0.8125rem] leading-relaxed",
                    bundle.highlighted ? "text-cream/65" : "text-charcoal/55",
                  )}
                >
                  {bundle.pitch}
                </p>

                {/* Price block */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className={cn(
                        "font-display text-[2.75rem] leading-none tracking-tight",
                        bundle.highlighted ? "text-cream" : "text-charcoal",
                      )}
                    >
                      {formatIDR(bundle.price)}
                    </span>
                    <span
                      className={cn(
                        "text-[0.875rem] line-through",
                        bundle.highlighted ? "text-cream/40" : "text-charcoal/35",
                      )}
                    >
                      {formatIDR(bundle.compareAtPrice)}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 inline-block rounded-full px-3 py-1 text-[0.6875rem] font-semibold",
                      bundle.highlighted
                        ? "bg-cream/10 text-cream/85"
                        : "bg-sage-mist/60 text-sage-deep",
                    )}
                  >
                    Hemat {formatIDR(savings)} ({savingsPercent}%) · {bundle.size}
                  </p>
                </div>

                {/* Feature checklist */}
                <ul className="mt-7 flex-1 space-y-2.5">
                  {bundle.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          bundle.highlighted ? "bg-sage" : "bg-sage-mist",
                        )}
                      >
                        <Check
                          width={10}
                          height={10}
                          strokeWidth={3}
                          className={bundle.highlighted ? "text-charcoal" : "text-sage-deep"}
                        />
                      </span>
                      <span
                        className={cn(
                          "text-[0.8125rem] leading-relaxed",
                          bundle.highlighted ? "text-cream/80" : "text-charcoal-soft",
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  variant={bundle.highlighted ? "blush" : "outline"}
                  className="mt-8 w-full"
                  onClick={() =>
                    addItem({
                      id: bundle.id,
                      name: bundle.name,
                      price: bundle.price,
                      size: bundle.size,
                      vessel: bundle.vessel,
                      palette: bundle.palette,
                    })
                  }
                >
                  Ambil {bundle.name}
                </Button>

                <p
                  className={cn(
                    "mt-3 text-center text-[0.6875rem]",
                    bundle.highlighted ? "text-cream/45" : "text-charcoal/40",
                  )}
                >
                  Garansi 30 hari uang kembali
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
