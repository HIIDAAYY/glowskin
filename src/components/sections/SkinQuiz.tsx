"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONCERN_OPTIONS, SKIN_TYPE_OPTIONS, getQuizResult } from "@/data/quiz";
import { PRODUCT_MAP } from "@/data/products";
import { cn, formatIDR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useQuizStore } from "@/store/quiz-store";

const STEP_LABELS = ["Tipe Kulit", "Masalah Utama", "Rutinitasmu"];

/** Slide direction is driven by step index so back/forward feel physical. */
const slideVariants = {
  enter: { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

export function SkinQuiz() {
  const { step, skinType, concern, selectSkinType, selectConcern, goBack, reset } = useQuizStore();
  const addMany = useCartStore((state) => state.addMany);

  const result = skinType && concern ? getQuizResult(skinType, concern) : null;
  const routineProducts = result ? result.routine.map((id) => PRODUCT_MAP[id]) : [];
  const routineTotal = routineProducts.reduce((sum, product) => sum + product.price, 0);

  const handleAddRoutine = () => {
    addMany(
      routineProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        size: product.size,
        vessel: product.vessel,
        palette: product.palette,
      })),
    );
  };

  return (
    <section id="quiz" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/45 blur-[130px]"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="60 detik saja"
          title={
            <>
              Temukan Rutinitas <em className="font-normal italic text-sage-deep">Kulitmu</em>
            </>
          }
          description="Jawab dua pertanyaan singkat. Kami susunkan urutan pemakaian yang cocok untuk kondisi kulitmu — bukan paket generik."
        />

        {/* -------------------- Quiz card -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative mt-14 overflow-hidden rounded-[2rem] border border-sage/15 bg-white/70 p-6 shadow-[0_30px_80px_-40px_rgba(44,53,49,0.35)] backdrop-blur-sm sm:p-10"
        >
          {/* Progress rail */}
          <div className="relative z-10 flex items-center gap-3">
            {STEP_LABELS.map((label, index) => (
              <div key={label} className="flex flex-1 items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold transition-colors duration-500",
                        index < step
                          ? "bg-sage-deep text-cream"
                          : index === step
                            ? "bg-charcoal text-cream"
                            : "bg-sage-mist/70 text-charcoal/40",
                      )}
                    >
                      {index < step ? <Check width={12} height={12} strokeWidth={3} /> : index + 1}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[0.75rem] font-medium transition-colors duration-500 sm:block",
                        index <= step ? "text-charcoal" : "text-charcoal/35",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-sage-mist/60">
                    <motion.div
                      className="h-full rounded-full bg-sage-deep"
                      initial={false}
                      animate={{ scaleX: index <= step ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="relative z-10 mt-9 min-h-[22rem]">
            <AnimatePresence mode="wait">
              {/* ---------- Step 1: skin type ---------- */}
              {step === 0 && (
                <motion.div
                  key="step-type"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-3xl tracking-tight text-charcoal">
                    Bagaimana kondisi kulitmu sehari-hari?
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-soft">
                    Pilih yang paling mendekati kondisi kulitmu di sore hari.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {SKIN_TYPE_OPTIONS.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.45 }}
                        onClick={() => selectSkinType(option.value)}
                        className={cn(
                          "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                          skinType === option.value
                            ? "border-sage-deep bg-sage-mist/50"
                            : "border-sage/20 bg-white/60 hover:border-sage/50 hover:bg-white",
                        )}
                      >
                        <span className="block font-display text-xl text-charcoal">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-[0.8125rem] leading-relaxed text-charcoal/55">
                          {option.description}
                        </span>
                        <span className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blush/0 transition-colors duration-500 group-hover:bg-blush/50" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ---------- Step 2: main concern ---------- */}
              {step === 1 && (
                <motion.div
                  key="step-concern"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={goBack}
                    className="mb-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-charcoal/55 transition-colors hover:text-sage-deep"
                  >
                    <ArrowLeft width={14} height={14} strokeWidth={2} />
                    Kembali
                  </button>

                  <h3 className="font-display text-3xl tracking-tight text-charcoal">
                    Apa yang paling ingin kamu perbaiki?
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-soft">
                    Pilih satu prioritas utama — rutinitas paling efektif kalau fokus.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {CONCERN_OPTIONS.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.45 }}
                        onClick={() => selectConcern(option.value)}
                        className={cn(
                          "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                          concern === option.value
                            ? "border-sage-deep bg-sage-mist/50"
                            : "border-sage/20 bg-white/60 hover:border-sage/50 hover:bg-white",
                        )}
                      >
                        <span className="block font-display text-xl text-charcoal">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-[0.8125rem] leading-relaxed text-charcoal/55">
                          {option.description}
                        </span>
                        <span className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blush/0 transition-colors duration-500 group-hover:bg-blush/50" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ---------- Step 3: result ---------- */}
              {step === 2 && result && (
                <motion.div
                  key="step-result"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-sage-deep px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cream">
                      <Sparkles width={12} height={12} strokeWidth={2} />
                      Rekomendasi Personal
                    </span>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-charcoal/55 transition-colors hover:text-sage-deep"
                    >
                      <RotateCcw width={13} height={13} strokeWidth={2} />
                      Ulangi quiz
                    </button>
                  </div>

                  <h3 className="mt-5 font-display text-[2.5rem] leading-tight tracking-tight text-charcoal">
                    {result.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-charcoal-soft">
                    {result.summary}
                  </p>

                  {/* Routine, numbered in order of use */}
                  <ol className="mt-7 space-y-2.5">
                    {routineProducts.map((product, index) => (
                      <motion.li
                        key={product.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.07, duration: 0.45 }}
                        className="flex items-center gap-4 rounded-2xl border border-sage/15 bg-white/70 p-3"
                      >
                        <span className="font-display text-lg italic text-sage w-5 text-center">
                          {index + 1}
                        </span>
                        <span className="h-12 w-12 shrink-0 rounded-xl bg-sage-mist/40 p-1">
                          <ProductVisual
                            vessel={product.vessel}
                            palette={product.palette}
                            shadow={false}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-charcoal">
                            {product.name}
                          </span>
                          <span className="block truncate text-[0.75rem] text-charcoal/50">
                            {product.tagline}
                          </span>
                        </span>
                        <span className="shrink-0 text-sm font-medium text-charcoal">
                          {formatIDR(product.price)}
                        </span>
                      </motion.li>
                    ))}
                  </ol>

                  <div className="mt-7 flex flex-col gap-4 border-t border-sage/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[0.75rem] uppercase tracking-[0.16em] text-charcoal/45">
                        Total rutinitas
                      </p>
                      <p className="font-display text-3xl text-charcoal">
                        {formatIDR(routineTotal)}
                      </p>
                    </div>
                    <Button size="lg" onClick={handleAddRoutine}>
                      <ShoppingBag width={16} height={16} strokeWidth={1.8} />
                      Masukkan Rutinitas ke Keranjang
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
