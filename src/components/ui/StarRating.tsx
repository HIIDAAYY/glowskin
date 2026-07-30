import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
  size?: number;
  /** Shows the numeric value next to the stars. */
  showValue?: boolean;
  reviewCount?: number;
}

export function StarRating({
  rating,
  className,
  size = 13,
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            width={size}
            height={size}
            // Half-steps are rounded up so a 4.6 shows five filled stars —
            // consistent with how marketplaces display aggregate ratings.
            className={cn(
              index < Math.round(rating) ? "fill-clay text-clay" : "fill-none text-charcoal/25",
            )}
            strokeWidth={1.5}
          />
        ))}
      </div>

      {showValue && (
        <span className="text-xs font-medium text-charcoal/60">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-charcoal/40"> ({reviewCount.toLocaleString("id-ID")})</span>
          )}
        </span>
      )}

      <span className="sr-only">{rating} dari 5 bintang</span>
    </div>
  );
}
