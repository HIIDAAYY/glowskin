"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, Plus } from "lucide-react";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { StarRating } from "@/components/ui/StarRating";
import { formatIDR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onQuickView, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  // Pointer position, normalised to -0.5…0.5 around the card centre.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), springConfig);
  // The artwork shifts slightly further than the card for a parallax feel.
  const visualX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), springConfig);
  const visualY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), springConfig);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      vessel: product.vessel,
      palette: product.palette,
    });
  };

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sage/15 bg-white/70 transition-shadow duration-500 hover:shadow-[0_36px_70px_-40px_rgba(44,53,49,0.5)]"
      >
        {/* ---------- Artwork ---------- */}
        <div
          className="grain relative aspect-[5/4] overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${product.palette[0]}22, ${product.palette[1]}33)`,
          }}
        >
          {/* Halo that blooms on hover */}
          <div
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
            style={{ background: product.palette[0] }}
          />

          <motion.div
            style={{ x: visualX, y: visualY, translateZ: 60 }}
            className="absolute inset-0 flex items-center justify-center p-7"
          >
            <div className="h-full w-auto drop-shadow-[0_18px_28px_rgba(44,53,49,0.18)]">
              <ProductVisual vessel={product.vessel} palette={product.palette} />
            </div>
          </motion.div>

          {/* Badges */}
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
            {product.badge && (
              <span className="w-fit rounded-full bg-charcoal px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cream">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="w-fit rounded-full bg-clay px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cream">
                Hemat {discount}%
              </span>
            )}
          </div>

          {/* Quick view — slides up from the bottom edge on hover */}
          <button
            onClick={() => onQuickView(product)}
            className="absolute inset-x-4 bottom-4 z-10 flex translate-y-[130%] items-center justify-center gap-2 rounded-full border border-white/60 bg-white/85 py-2.5 text-[0.8125rem] font-medium text-charcoal opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
          >
            <Eye width={14} height={14} strokeWidth={1.8} />
            Quick View
          </button>
        </div>

        {/* ---------- Details ---------- */}
        <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-sage-deep">
              {product.category}
            </span>
            <StarRating rating={product.rating} size={11} showValue reviewCount={product.reviewCount} />
          </div>

          <h3 className="mt-2.5 font-display text-2xl leading-tight tracking-tight text-charcoal">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-charcoal/55">
            {product.tagline}
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              {product.compareAtPrice && (
                <p className="text-[0.75rem] text-charcoal/35 line-through">
                  {formatIDR(product.compareAtPrice)}
                </p>
              )}
              <p className="font-display text-2xl leading-none text-charcoal">
                {formatIDR(product.price)}
              </p>
              <p className="mt-1 text-[0.6875rem] text-charcoal/45">{product.size}</p>
            </div>

            <button
              onClick={handleAdd}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-cream transition-all duration-300 hover:scale-105 hover:bg-sage-deep active:scale-95"
              aria-label={`Tambah ${product.name} ke keranjang`}
            >
              <Plus width={17} height={17} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
