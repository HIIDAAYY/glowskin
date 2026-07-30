"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { StarRating } from "@/components/ui/StarRating";
import { formatIDR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  // Reset the selector each time a different product is opened.
  useEffect(() => {
    if (product) setQuantity(1);
  }, [product]);

  // Escape to close + scroll lock while open.
  useEffect(() => {
    if (!product) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  const handleAdd = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        size: product.size,
        vessel: product.vessel,
        palette: product.palette,
      },
      quantity,
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Detail ${product.name}`}
            className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-cream shadow-[0_50px_100px_-40px_rgba(44,53,49,0.6)] sm:rounded-[2rem]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-sage/25 bg-white/80 text-charcoal backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Tutup"
            >
              <X width={16} height={16} strokeWidth={1.8} />
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              {/* ---------- Artwork ---------- */}
              <div
                className="grain relative flex min-h-[16rem] items-center justify-center overflow-hidden p-10 md:min-h-full"
                style={{
                  background: `linear-gradient(160deg, ${product.palette[0]}30, ${product.palette[1]}45)`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-56 w-full drop-shadow-[0_24px_36px_rgba(44,53,49,0.22)] md:h-80"
                >
                  <ProductVisual vessel={product.vessel} palette={product.palette} />
                </motion.div>

                {product.badge && (
                  <span className="absolute left-5 top-5 rounded-full bg-charcoal px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cream">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* ---------- Details ---------- */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-sage-deep">
                    {product.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-charcoal/20" />
                  <span className="text-[0.6875rem] text-charcoal/50">{product.size}</span>
                </div>

                <h3 className="mt-2 font-display text-4xl leading-tight tracking-tight text-charcoal">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal/55">{product.tagline}</p>

                <div className="mt-3">
                  <StarRating
                    rating={product.rating}
                    size={13}
                    showValue
                    reviewCount={product.reviewCount}
                  />
                </div>

                <p className="mt-5 text-[0.875rem] leading-relaxed text-charcoal-soft">
                  {product.description}
                </p>

                {/* Benefits */}
                <ul className="mt-5 space-y-2">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sage-mist">
                        <Check width={10} height={10} className="text-sage-deep" strokeWidth={3} />
                      </span>
                      <span className="text-[0.8125rem] leading-relaxed text-charcoal-soft">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Ingredients */}
                <div className="mt-6">
                  <p className="eyebrow flex items-center gap-1.5 text-charcoal/45">
                    <Sparkles width={11} height={11} strokeWidth={2} />
                    Kandungan Utama
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {product.keyIngredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="rounded-full border border-sage/25 bg-white/60 px-2.5 py-1 text-[0.6875rem] font-medium text-charcoal/70"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Usage */}
                <div className="mt-5 rounded-2xl border border-sage/15 bg-white/60 p-4">
                  <p className="eyebrow text-charcoal/45">Cara Pakai</p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-charcoal-soft">
                    {product.howToUse}
                  </p>
                </div>

                {/* Price + quantity + CTA */}
                <div className="mt-7 border-t border-sage/15 pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      {product.compareAtPrice && (
                        <p className="text-[0.8125rem] text-charcoal/35 line-through">
                          {formatIDR(product.compareAtPrice)}
                        </p>
                      )}
                      <p className="font-display text-3xl leading-none text-charcoal">
                        {formatIDR(product.price * quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-sage/25 bg-white/70 p-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-sage-mist/60 disabled:opacity-30"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus width={14} height={14} strokeWidth={2} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold tabular-nums text-charcoal">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-sage-mist/60"
                        aria-label="Tambah jumlah"
                      >
                        <Plus width={14} height={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>

                  <Button size="lg" className="mt-4 w-full" onClick={handleAdd}>
                    <ShoppingBag width={16} height={16} strokeWidth={1.8} />
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
