import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an integer as Indonesian rupiah — "Rp 129.000".
 * We format manually rather than with Intl so the output is identical on the
 * server and in the browser (Intl's non-breaking space causes hydration noise).
 */
export function formatIDR(value: number): string {
  const rounded = Math.round(value);
  const withSeparators = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${withSeparators}`;
}

/** Smooth-scrolls to a section id, accounting for the fixed navbar height. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
