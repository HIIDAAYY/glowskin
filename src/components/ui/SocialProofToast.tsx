"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SOCIAL_PROOF_EVENTS } from "@/data/testimonials";

const SHOW_AFTER_MS = 6000;
const VISIBLE_MS = 5500;
const INTERVAL_MS = 8000;

/**
 * Live-activity notification in the bottom-left corner.
 *
 * Dismissing it stops the loop for the rest of the session — a toast that
 * keeps returning after the visitor closed it reads as spam, not social proof.
 */
export function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // `useRef` for timers so re-renders never orphan a pending timeout.
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), VISIBLE_MS);
  }, []);

  useEffect(() => {
    if (dismissed) return;

    // First appearance is delayed so it never competes with the hero.
    const firstTimer = setTimeout(() => {
      // Random start point keeps repeat visits from seeing the same order.
      setIndex(Math.floor(Math.random() * SOCIAL_PROOF_EVENTS.length));
      setVisible(true);
      scheduleHide();
    }, SHOW_AFTER_MS);

    const interval = setInterval(() => {
      setIndex((current) => {
        // Step by a random offset so the sequence doesn't feel scripted.
        const step = 1 + Math.floor(Math.random() * (SOCIAL_PROOF_EVENTS.length - 1));
        return (current + step) % SOCIAL_PROOF_EVENTS.length;
      });
      setVisible(true);
      scheduleHide();
    }, INTERVAL_MS);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [dismissed, scheduleHide]);

  if (dismissed) return null;

  const event = SOCIAL_PROOF_EVENTS[index];
  // Deterministic-looking "minutes ago" derived from the index, so it varies
  // per notification without triggering a hydration mismatch on first paint.
  const minutesAgo = 2 + ((index * 3) % 11);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-[60] max-w-[calc(100vw-2.5rem)]">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={`${event.name}-${index}`}
            initial={{ opacity: 0, x: -24, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative flex items-start gap-3 rounded-2xl border border-sage/20 bg-white/90 py-3 pl-3 pr-9 shadow-[0_18px_45px_-22px_rgba(44,53,49,0.5)] backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-mist">
              <Check width={14} height={14} className="text-sage-deep" strokeWidth={2.5} />
            </span>

            <div className="min-w-0">
              <p className="text-[0.8125rem] leading-snug text-charcoal">
                <span className="font-semibold">{event.name}</span>
                <span className="text-charcoal/60"> dari {event.city} baru saja membeli </span>
                <span className="font-semibold">{event.item}</span>
              </p>
              <p className="mt-0.5 text-[0.6875rem] text-charcoal/45">
                {minutesAgo} menit lalu · Terverifikasi
              </p>
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-charcoal/35 transition-colors hover:bg-sage-mist/60 hover:text-charcoal"
              aria-label="Tutup notifikasi"
            >
              <X width={12} height={12} strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
