"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "blush";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  // The primary button uses a hover "sweep": a lighter panel slides across
  // from the left rather than a flat colour change.
  primary:
    "bg-sage-deep text-cream shadow-[0_10px_30px_-12px_rgba(47,60,50,0.55)] hover:shadow-[0_16px_40px_-14px_rgba(47,60,50,0.6)]",
  outline: "border border-sage/45 text-charcoal hover:border-sage-deep hover:text-sage-deep",
  ghost: "text-charcoal/70 hover:text-charcoal",
  blush: "bg-blush text-charcoal hover:bg-blush-deep",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[0.9375rem]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight",
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-45",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-sage transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
});
