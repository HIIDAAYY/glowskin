"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  as?: "div" | "section" | "li" | "span";
}

/**
 * Scroll-triggered entrance used across every section. `once: true` means the
 * page settles after a single pass — content never re-animates on scroll-up,
 * which is what makes long pages feel restless.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Cast keeps JSX happy: every motion element accepts the same subset of
  // props we pass here (className + animation props).
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
