import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  /** Two-digit section index, e.g. "02" — part of the editorial system. */
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal className={cn("flex items-center gap-3", centered && "justify-center")}>
        <span className="font-display text-sm italic text-sage">{index}</span>
        <span className="h-px w-8 bg-sage/40" />
        <span className="eyebrow text-sage-deep">{eyebrow}</span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={cn(
            "font-display text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-charcoal text-balance",
            "sm:text-5xl lg:text-[3.75rem]",
            centered ? "mx-auto max-w-3xl" : "max-w-2xl",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "text-[0.9375rem] leading-relaxed text-charcoal-soft text-balance",
              centered ? "mx-auto max-w-xl" : "max-w-lg",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
