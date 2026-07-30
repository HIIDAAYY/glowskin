"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, ShoppingBag, Sparkles, X } from "lucide-react";
import { cn, scrollToSection } from "@/lib/utils";
import { selectItemCount, useCartStore } from "@/store/cart-store";

const NAV_LINKS = [
  { id: "quiz", label: "Skin Quiz" },
  { id: "hasil", label: "Hasil Nyata" },
  { id: "produk", label: "Produk" },
  { id: "ulasan", label: "Ulasan" },
  { id: "paket", label: "Paket" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const { scrollYProgress } = useScroll();
  // Spring-smoothed so the bar glides instead of snapping on fast scrolls.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const itemCount = useCartStore(selectItemCount);
  const lastAddedAt = useCartStore((state) => state.lastAddedAt);
  const openCart = useCartStore((state) => state.openCart);

  // Condenses the bar after the hero, and tracks which section is in view so
  // the matching link can be underlined.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const midpoint = window.scrollY + window.innerHeight / 2.4;
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= midpoint) current = link.id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress indicator — sits on the very top edge of the viewport */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-gradient-to-r from-sage via-sage-deep to-clay"
      />

      <div className="px-4 pt-3 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5",
            scrolled
              ? "border-sage/20 bg-white/70 shadow-[0_8px_32px_-16px_rgba(44,53,49,0.28)] backdrop-blur-md"
              : "border-transparent bg-white/25 backdrop-blur-sm",
          )}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2"
            aria-label="GlowSkin — kembali ke atas"
          >
            <Sparkles
              className="text-sage transition-transform duration-500 group-hover:rotate-90"
              width={17}
              height={17}
              strokeWidth={1.6}
            />
            <span className="font-display text-[1.375rem] leading-none tracking-tight text-charcoal">
              Glow<span className="italic text-sage-deep">Skin</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavigate(link.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                    activeSection === link.id
                      ? "text-sage-deep"
                      : "text-charcoal/65 hover:text-charcoal",
                  )}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-sage-deep"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate("quiz")}
              className="hidden rounded-full bg-charcoal px-5 py-2.5 text-[0.8125rem] font-medium text-cream transition-colors duration-300 hover:bg-sage-deep sm:inline-flex"
            >
              Mulai Quiz
            </button>

            {/* Cart trigger with live count badge */}
            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sage/25 bg-white/60 text-charcoal transition-all duration-300 hover:border-sage-deep hover:bg-white"
              aria-label={`Buka keranjang, ${itemCount} item`}
            >
              <ShoppingBag width={17} height={17} strokeWidth={1.6} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    // Re-keying on lastAddedAt makes the badge re-pop on every
                    // add, even when the number itself doesn't change.
                    key={lastAddedAt}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-sage-deep px-1 text-[10px] font-semibold text-cream"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/25 bg-white/60 text-charcoal lg:hidden"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X width={17} height={17} strokeWidth={1.6} />
              ) : (
                <Menu width={17} height={17} strokeWidth={1.6} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-sage/20 bg-white/85 backdrop-blur-md lg:hidden"
            >
              <ul className="flex flex-col p-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleNavigate(link.id)}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-charcoal/80 transition-colors hover:bg-sage-mist/50 hover:text-charcoal"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
