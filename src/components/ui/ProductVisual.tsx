"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import type { VesselShape } from "@/types";

interface ProductVisualProps {
  vessel: VesselShape;
  palette: [string, string];
  className?: string;
  /** Renders the soft contact shadow beneath the vessel. */
  shadow?: boolean;
}

/**
 * Generates the product artwork as inline SVG instead of shipping photography.
 * Every bottle is drawn from the product's own two-colour palette, so the grid
 * stays perfectly consistent, scales to any size without artefacts, and adds
 * zero image weight to the page.
 */
export function ProductVisual({ vessel, palette, className, shadow = true }: ProductVisualProps) {
  // useId keeps gradient ids unique when several vessels share a page.
  const uid = useId().replace(/:/g, "");
  const liquid = `liquid-${uid}`;
  const glass = `glass-${uid}`;
  const shine = `shine-${uid}`;
  const [light, deep] = palette;

  return (
    <svg
      viewBox="0 0 200 300"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={liquid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>

        {/* Frosted-glass wash layered over the liquid. */}
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="28%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="72%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.32" />
        </linearGradient>

        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {shadow && <ellipse cx="100" cy="278" rx="52" ry="9" fill="#2C3531" opacity="0.1" />}

      {vessel === "dropper" && (
        <g>
          {/* Dropper cap */}
          <rect x="86" y="24" width="28" height="34" rx="4" fill={deep} />
          <rect x="80" y="52" width="40" height="16" rx="4" fill="#2C3531" opacity="0.85" />
          {/* Body */}
          <path d="M68 68h64a8 8 0 0 1 8 8v168a12 12 0 0 1-12 12H72a12 12 0 0 1-12-12V76a8 8 0 0 1 8-8Z" fill={`url(#${liquid})`} />
          <path d="M68 68h64a8 8 0 0 1 8 8v168a12 12 0 0 1-12 12H72a12 12 0 0 1-12-12V76a8 8 0 0 1 8-8Z" fill={`url(#${glass})`} />
          {/* Label */}
          <rect x="60" y="140" width="80" height="62" fill="#FDF8F5" opacity="0.94" />
          <rect x="72" y="158" width="56" height="3" rx="1.5" fill={deep} opacity="0.8" />
          <rect x="72" y="170" width="38" height="2.5" rx="1.25" fill="#2C3531" opacity="0.35" />
          <rect x="72" y="180" width="46" height="2.5" rx="1.25" fill="#2C3531" opacity="0.2" />
          <rect x="72" y="88" width="14" height="34" rx="7" fill={`url(#${shine})`} opacity="0.55" />
        </g>
      )}

      {vessel === "pump" && (
        <g>
          {/* Pump head */}
          <path d="M96 18h20v14h10a6 6 0 0 1 0 12h-30V18Z" fill="#2C3531" opacity="0.85" />
          <rect x="94" y="32" width="14" height="26" fill={deep} />
          <rect x="78" y="54" width="44" height="18" rx="5" fill={deep} />
          {/* Body */}
          <rect x="58" y="72" width="84" height="184" rx="16" fill={`url(#${liquid})`} />
          <rect x="58" y="72" width="84" height="184" rx="16" fill={`url(#${glass})`} />
          <rect x="58" y="146" width="84" height="66" fill="#FDF8F5" opacity="0.94" />
          <rect x="72" y="164" width="56" height="3" rx="1.5" fill={deep} opacity="0.8" />
          <rect x="72" y="176" width="34" height="2.5" rx="1.25" fill="#2C3531" opacity="0.35" />
          <rect x="72" y="186" width="48" height="2.5" rx="1.25" fill="#2C3531" opacity="0.2" />
          <rect x="72" y="94" width="14" height="36" rx="7" fill={`url(#${shine})`} opacity="0.5" />
        </g>
      )}

      {vessel === "mist" && (
        <g>
          {/* Fine-mist nozzle */}
          <rect x="88" y="20" width="24" height="18" rx="4" fill="#2C3531" opacity="0.8" />
          <rect x="82" y="36" width="36" height="20" rx="5" fill={deep} />
          {/* Tall slim body */}
          <path d="M64 56h72v186a14 14 0 0 1-14 14H78a14 14 0 0 1-14-14V56Z" fill={`url(#${liquid})`} />
          <path d="M64 56h72v186a14 14 0 0 1-14 14H78a14 14 0 0 1-14-14V56Z" fill={`url(#${glass})`} />
          <rect x="64" y="132" width="72" height="72" fill="#FDF8F5" opacity="0.92" />
          <rect x="78" y="152" width="44" height="3" rx="1.5" fill={deep} opacity="0.8" />
          <rect x="78" y="164" width="30" height="2.5" rx="1.25" fill="#2C3531" opacity="0.35" />
          <rect x="78" y="174" width="40" height="2.5" rx="1.25" fill="#2C3531" opacity="0.2" />
          <rect x="78" y="76" width="12" height="34" rx="6" fill={`url(#${shine})`} opacity="0.5" />
        </g>
      )}

      {vessel === "tube" && (
        <g>
          {/* Screw cap */}
          <rect x="80" y="22" width="40" height="26" rx="6" fill={deep} />
          <rect x="80" y="30" width="40" height="3" fill="#2C3531" opacity="0.25" />
          <rect x="80" y="38" width="40" height="3" fill="#2C3531" opacity="0.25" />
          {/* Soft squeeze tube — tapers toward the crimped base */}
          <path d="M74 48h52l12 186a10 10 0 0 1-10 11H72a10 10 0 0 1-10-11L74 48Z" fill={`url(#${liquid})`} />
          <path d="M74 48h52l12 186a10 10 0 0 1-10 11H72a10 10 0 0 1-10-11L74 48Z" fill={`url(#${glass})`} />
          <rect x="62" y="238" width="76" height="10" rx="2" fill={deep} opacity="0.55" />
          <rect x="66" y="130" width="68" height="70" fill="#FDF8F5" opacity="0.93" />
          <rect x="80" y="150" width="46" height="3" rx="1.5" fill={deep} opacity="0.8" />
          <rect x="80" y="162" width="30" height="2.5" rx="1.25" fill="#2C3531" opacity="0.35" />
          <rect x="80" y="172" width="42" height="2.5" rx="1.25" fill="#2C3531" opacity="0.2" />
        </g>
      )}

      {vessel === "jar" && (
        <g>
          {/* Wide lid */}
          <rect x="46" y="74" width="108" height="34" rx="10" fill={deep} />
          <rect x="46" y="100" width="108" height="8" fill="#2C3531" opacity="0.18" />
          {/* Squat jar body */}
          <path d="M52 108h96v104a16 16 0 0 1-16 16H68a16 16 0 0 1-16-16V108Z" fill={`url(#${liquid})`} />
          <path d="M52 108h96v104a16 16 0 0 1-16 16H68a16 16 0 0 1-16-16V108Z" fill={`url(#${glass})`} />
          <rect x="52" y="150" width="96" height="52" fill="#FDF8F5" opacity="0.93" />
          <rect x="70" y="166" width="60" height="3" rx="1.5" fill={deep} opacity="0.8" />
          <rect x="70" y="178" width="36" height="2.5" rx="1.25" fill="#2C3531" opacity="0.35" />
          <rect x="66" y="120" width="14" height="22" rx="7" fill={`url(#${shine})`} opacity="0.45" />
        </g>
      )}

      {vessel === "sachet" && (
        <g>
          {/* Foil sachet with a serrated tear-strip */}
          <path d="M50 44h100v212H50z" fill={`url(#${liquid})`} />
          <path d="M50 44h100v212H50z" fill={`url(#${glass})`} />
          <path
            d="M50 44h100v10H50z M50 246h100v10H50z"
            fill={deep}
            opacity="0.5"
          />
          <path
            d="M50 58l8 5-8 5-0 5 8 5-8 5 0 5 8 5-8 5"
            stroke="#FDF8F5"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          <rect x="50" y="126" width="100" height="76" fill="#FDF8F5" opacity="0.94" />
          <rect x="68" y="146" width="64" height="3.5" rx="1.75" fill={deep} opacity="0.85" />
          <rect x="68" y="160" width="40" height="2.5" rx="1.25" fill="#2C3531" opacity="0.35" />
          <rect x="68" y="170" width="52" height="2.5" rx="1.25" fill="#2C3531" opacity="0.2" />
          <circle cx="132" cy="182" r="9" fill={deep} opacity="0.28" />
          <rect x="64" y="72" width="12" height="34" rx="6" fill={`url(#${shine})`} opacity="0.4" />
        </g>
      )}
    </svg>
  );
}
