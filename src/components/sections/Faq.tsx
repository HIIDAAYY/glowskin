"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ_ITEMS } from "@/data/faq";
import { cn } from "@/lib/utils";

export function Faq() {
  // Single-open accordion — index of the expanded row, or null.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-shell py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Masih ragu?"
          title={
            <>
              Pertanyaan yang sering <em className="font-normal italic text-sage-deep">ditanya</em>
            </>
          }
        />

        <div className="mt-14 divide-y divide-sage/15 border-y border-sage/15">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item.question} delay={index * 0.06}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start gap-4">
                      <span className="mt-1 font-display text-sm italic text-sage">
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          "font-display text-xl leading-snug tracking-tight transition-colors duration-300 sm:text-2xl",
                          isOpen ? "text-sage-deep" : "text-charcoal group-hover:text-sage-deep",
                        )}
                      >
                        {item.question}
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                        isOpen
                          ? "border-sage-deep bg-sage-deep text-cream"
                          : "border-sage/30 text-charcoal group-hover:border-sage-deep",
                      )}
                    >
                      <Plus width={15} height={15} strokeWidth={2} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-9 pr-14 text-[0.9375rem] leading-relaxed text-charcoal-soft">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-[0.875rem] text-charcoal-soft">
            Masih ada yang mau ditanyakan?{" "}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sage-deep underline decoration-sage/40 underline-offset-4 transition-colors hover:decoration-sage-deep"
            >
              Chat langsung dengan tim kami
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
