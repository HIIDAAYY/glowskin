"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATALOG, CATEGORY_TABS } from "@/data/products";
import { cn } from "@/lib/utils";
import type { CategoryFilter, Product } from "@/types";

export function ProductGrid() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () => CATALOG.filter((product) => product.filters.includes(filter)),
    [filter],
  );

  return (
    <section id="produk" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-sage-mist/50 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Katalog lengkap"
          title={
            <>
              Setiap produk punya <em className="font-normal italic text-sage-deep">tugasnya</em>
            </>
          }
          description="Enam formula yang dirancang untuk bekerja bersama. Tidak ada bahan pengisi, tidak ada klaim berlebihan."
        />

        {/* Filter tabs — the active pill slides between options via layoutId */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-sage/20 bg-white/60 p-1.5 backdrop-blur-sm">
            {CATEGORY_TABS.map((tab) => (
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
                    layoutId="product-filter-pill"
                    className="absolute inset-0 rounded-full bg-charcoal"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <p className="mt-16 text-center text-sm text-charcoal/50">
            Belum ada produk di kategori ini.
          </p>
        )}
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
