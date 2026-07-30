"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgePercent,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { cn, formatIDR, scrollToSection } from "@/lib/utils";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import {
  selectDiscount,
  selectItemCount,
  selectSubtotal,
  selectTotal,
  useCartStore,
} from "@/store/cart-store";

/** Free shipping unlocks at this subtotal — drives the progress meter. */
const FREE_SHIPPING_THRESHOLD = 200000;

export function CartDrawer() {
  const {
    items,
    isOpen,
    coupon,
    couponStatus,
    closeCart,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const itemCount = useCartStore(selectItemCount);
  const subtotal = useCartStore(selectSubtotal);
  const discount = useCartStore(selectDiscount);
  const total = useCartStore(selectTotal);

  const [couponInput, setCouponInput] = useState("");

  // Escape to close + body scroll lock.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  const handleApplyCoupon = (event: React.FormEvent) => {
    event.preventDefault();
    if (!couponInput.trim()) return;
    const status = applyCoupon(couponInput);
    if (status === "applied") setCouponInput("");
  };

  const handleWhatsAppCheckout = () => {
    const url = buildWhatsAppOrderUrl({
      items,
      subtotal,
      discount,
      total,
      couponCode: coupon?.code ?? null,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            role="dialog"
            aria-modal="true"
            aria-label="Keranjang belanja"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-[-30px_0_80px_-30px_rgba(44,53,49,0.5)]"
          >
            {/* ---------- Header ---------- */}
            <header className="flex items-center justify-between border-b border-sage/15 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag width={17} height={17} className="text-sage-deep" strokeWidth={1.7} />
                <h2 className="font-display text-2xl leading-none tracking-tight text-charcoal">
                  Keranjang
                </h2>
                {itemCount > 0 && (
                  <span className="rounded-full bg-sage-mist px-2 py-0.5 text-[0.6875rem] font-semibold text-sage-deep">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sage/20 text-charcoal transition-colors hover:bg-white"
                aria-label="Tutup keranjang"
              >
                <X width={16} height={16} strokeWidth={1.8} />
              </button>
            </header>

            {items.length === 0 ? (
              /* ---------- Empty state ---------- */
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-mist/50">
                  <ShoppingBag width={26} height={26} className="text-sage" strokeWidth={1.3} />
                </span>
                <p className="mt-5 font-display text-2xl text-charcoal">Keranjangmu masih kosong</p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-charcoal-soft">
                  Belum yakin mulai dari mana? Ikuti skin quiz kami — 60 detik dan kamu dapat
                  rutinitas yang sesuai.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    scrollToSection("quiz");
                  }}
                  className="mt-6 rounded-full bg-charcoal px-6 py-3 text-[0.8125rem] font-medium text-cream transition-colors hover:bg-sage-deep"
                >
                  Mulai Skin Quiz
                </button>
              </div>
            ) : (
              <>
                {/* ---------- Free-shipping meter ---------- */}
                <div className="border-b border-sage/15 bg-shell px-5 py-3.5">
                  <div className="flex items-center gap-2 text-[0.75rem] text-charcoal-soft">
                    <Truck width={13} height={13} className="text-sage-deep" strokeWidth={1.8} />
                    {remainingForFreeShipping > 0 ? (
                      <span>
                        Belanja <strong className="text-charcoal">{formatIDR(remainingForFreeShipping)}</strong>{" "}
                        lagi untuk gratis ongkir
                      </span>
                    ) : (
                      <span className="font-medium text-sage-deep">
                        Selamat, kamu dapat gratis ongkir!
                      </span>
                    )}
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-mist/70">
                    <motion.div
                      className="h-full rounded-full bg-sage-deep"
                      initial={false}
                      animate={{ width: `${shippingProgress}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* ---------- Line items ---------- */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-3 rounded-2xl border border-sage/15 bg-white/60 p-3">
                            <div
                              className="h-20 w-16 shrink-0 rounded-xl p-1.5"
                              style={{
                                background: `linear-gradient(155deg, ${item.palette[0]}33, ${item.palette[1]}44)`,
                              }}
                            >
                              <ProductVisual
                                vessel={item.vessel}
                                palette={item.palette}
                                shadow={false}
                              />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate text-[0.875rem] font-semibold leading-tight text-charcoal">
                                    {item.name}
                                  </p>
                                  <p className="mt-0.5 text-[0.6875rem] text-charcoal/45">
                                    {item.size}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="shrink-0 rounded-full p-1.5 text-charcoal/35 transition-colors hover:bg-blush hover:text-charcoal"
                                  aria-label={`Hapus ${item.name}`}
                                >
                                  <Trash2 width={13} height={13} strokeWidth={1.8} />
                                </button>
                              </div>

                              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                                <div className="flex items-center gap-0.5 rounded-full border border-sage/25 bg-white p-0.5">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-sage-mist/60"
                                    aria-label="Kurangi jumlah"
                                  >
                                    <Minus width={12} height={12} strokeWidth={2} />
                                  </button>
                                  <span className="w-6 text-center text-[0.8125rem] font-semibold tabular-nums text-charcoal">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-sage-mist/60"
                                    aria-label="Tambah jumlah"
                                  >
                                    <Plus width={12} height={12} strokeWidth={2} />
                                  </button>
                                </div>

                                <p className="text-[0.875rem] font-semibold text-charcoal">
                                  {formatIDR(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>

                {/* ---------- Summary ---------- */}
                <footer className="border-t border-sage/15 bg-shell px-5 py-4">
                  {/* Coupon */}
                  {coupon ? (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-sage/30 bg-sage-mist/50 px-3 py-2.5">
                      <span className="flex min-w-0 items-center gap-2">
                        <BadgePercent
                          width={14}
                          height={14}
                          className="shrink-0 text-sage-deep"
                          strokeWidth={1.8}
                        />
                        <span className="min-w-0">
                          <span className="block text-[0.8125rem] font-semibold text-charcoal">
                            {coupon.code}
                          </span>
                          <span className="block truncate text-[0.6875rem] text-charcoal/55">
                            {coupon.label}
                          </span>
                        </span>
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="shrink-0 text-[0.75rem] font-medium text-charcoal/50 underline-offset-2 transition-colors hover:text-charcoal hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon}>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag
                            width={13}
                            height={13}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/35"
                            strokeWidth={1.8}
                          />
                          <input
                            value={couponInput}
                            onChange={(event) => setCouponInput(event.target.value)}
                            placeholder="Kode kupon (coba GLOW20)"
                            aria-label="Kode kupon"
                            className={cn(
                              "h-10 w-full rounded-xl border bg-white pl-8 pr-3 text-[0.8125rem] text-charcoal placeholder:text-charcoal/35 transition-colors",
                              couponStatus === "invalid"
                                ? "border-clay"
                                : "border-sage/25 focus:border-sage",
                            )}
                          />
                        </div>
                        <button
                          type="submit"
                          className="h-10 shrink-0 rounded-xl border border-sage/30 px-4 text-[0.8125rem] font-medium text-charcoal transition-colors hover:border-sage-deep hover:bg-white"
                        >
                          Pakai
                        </button>
                      </div>
                      {couponStatus === "invalid" && (
                        <p className="mt-1.5 text-[0.6875rem] text-clay">
                          Kode kupon tidak valid atau sudah kedaluwarsa.
                        </p>
                      )}
                    </form>
                  )}

                  {/* Totals */}
                  <dl className="mt-4 space-y-1.5 text-[0.8125rem]">
                    <div className="flex justify-between text-charcoal-soft">
                      <dt>Subtotal</dt>
                      <dd className="tabular-nums">{formatIDR(subtotal)}</dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sage-deep">
                        <dt>Diskon ({coupon?.code})</dt>
                        <dd className="tabular-nums">−{formatIDR(discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between text-charcoal-soft">
                      <dt>Ongkir</dt>
                      <dd className="tabular-nums">
                        {remainingForFreeShipping > 0 ? (
                          "Dihitung saat checkout"
                        ) : (
                          <span className="text-sage-deep">Gratis</span>
                        )}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-sage/15 pt-2.5">
                      <dt className="text-[0.875rem] font-semibold text-charcoal">Total</dt>
                      <dd className="font-display text-2xl leading-none text-charcoal tabular-nums">
                        {formatIDR(total)}
                      </dd>
                    </div>
                  </dl>

                  {/* WhatsApp checkout */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#128C7E] py-4 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:bg-[#0f7568] active:scale-[0.99]"
                  >
                    <WhatsAppIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                    Pesan via WhatsApp
                  </button>

                  <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-charcoal/45">
                    <ShieldCheck width={12} height={12} strokeWidth={1.8} />
                    Invoice otomatis terkirim ke admin · Garansi 30 hari
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

/** lucide-react has no WhatsApp glyph, so we ship the official mark inline. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}
