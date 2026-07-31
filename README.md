# GlowSkin — Luxury Skincare Landing Page

Single-page, conversion-focused landing page for a fictional Indonesian skincare
brand. Built as a portfolio piece to demonstrate micro-interactions, state
management and CRO patterns in a real Next.js App Router codebase.

## Tech stack

| Concern     | Choice                                        |
| ----------- | --------------------------------------------- |
| Framework   | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling     | Tailwind CSS v4 (`@theme` tokens), `clsx`, `tailwind-merge` |
| Animation   | Framer Motion 12                              |
| Icons       | `lucide-react`                                |
| State       | Zustand (cart + quiz stores)                  |

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts: `npm run build`, `npm start`, `npm run typecheck`.

## File structure

```
src/
├─ app/
│  ├─ layout.tsx              # Fonts (Cormorant Garamond + Plus Jakarta Sans), metadata
│  ├─ page.tsx                # Section composition + global overlays
│  ├─ globals.css             # Design tokens, grain texture, keyframes
│  └─ icon.svg                # Generated favicon
│
├─ components/
│  ├─ layout/
│  │  ├─ Navbar.tsx           # Glass nav, scroll progress, active-link tracking, cart badge
│  │  └─ Footer.tsx           # Brand bio, nav, socials, payment badges, oversized wordmark
│  ├─ sections/
│  │  ├─ Hero.tsx             # Headline, floating trust badges, product stage, trust marquee
│  │  ├─ SkinQuiz.tsx         # 3-step quiz → personalised routine
│  │  ├─ BeforeAfterSlider.tsx# Pointer/touch-driven comparison slider
│  │  ├─ ProductGrid.tsx      # Filter tabs + grid + quick view wiring
│  │  ├─ Testimonials.tsx     # Concern-filtered review cards
│  │  ├─ Bundles.tsx          # 3 pricing cards, middle one highlighted
│  │  ├─ Faq.tsx              # Height-animated accordion
│  │  └─ FinalCta.tsx         # Closing banner with pattern background
│  ├─ product/
│  │  ├─ ProductCard.tsx      # 3D tilt + parallax artwork + add to cart
│  │  └─ QuickViewModal.tsx   # Ingredients, benefits, quantity selector
│  ├─ cart/
│  │  └─ CartDrawer.tsx       # Slide-over, coupons, free-shipping meter, WhatsApp checkout
│  └─ ui/
│     ├─ Button.tsx           # Variants with hover sweep
│     ├─ ProductVisual.tsx    # SVG bottle artwork generator (6 vessel shapes)
│     ├─ Reveal.tsx           # Scroll-triggered entrance wrapper
│     ├─ SectionHeading.tsx   # Numbered editorial heading
│     ├─ StarRating.tsx
│     └─ SocialProofToast.tsx # Rotating live-activity notification
│
├─ data/                      # products, bundles, testimonials, quiz matrix, faq
├─ store/                     # cart-store.ts, quiz-store.ts (Zustand)
├─ lib/                       # utils.ts (cn, formatIDR, scrollToSection), whatsapp.ts
└─ types/index.ts             # Product, CartItem, Testimonial, Bundle, quiz types
```

## Design system

Tokens live in `src/app/globals.css` under `@theme`, so every colour is
available as a normal Tailwind utility (`bg-cream`, `text-sage-deep`, …).

- **Surfaces** — Warm Cream `#FAF6F0`, Shell `#FDF8F5`, Blush `#F3E3DF`
- **Accents** — Sage `#8A9A86`, Sage Deep `#5F6F5C`, Clay `#B98A6E`
- **Ink** — Charcoal `#2C3531`
- **Type** — Cormorant Garamond (display) / Plus Jakarta Sans (body)

Product photography is **generated as inline SVG** (`ProductVisual.tsx`) from
each product's two-colour palette. Six vessel shapes — dropper, pump, mist,
tube, jar, sachet — render crisply at any size and add zero image weight.

## Notable implementation details

**Cart & coupons** — `src/store/cart-store.ts` holds items, drawer state and the
applied coupon; totals are exposed as plain selectors (`selectSubtotal`,
`selectDiscount`, `selectTotal`) so components only subscribe to what they
render. Valid codes: `GLOW20` (20% off) and `GLOW10` (10% off).

**WhatsApp checkout** — `src/lib/whatsapp.ts` turns the cart into a
`https://wa.me/...` deep link carrying a formatted invoice:

```
Halo *GlowSkin*, saya ingin pesan:

1. 2x Gentle Cleanser (100 ml) — Rp 178.000
2. 1x Glow Serum (30 ml) — Rp 129.000

Subtotal: Rp 307.000
Diskon (GLOW20): -Rp 61.400
*Total: Rp 245.600*
```

Change `STORE_WHATSAPP` in that file to point at a real number.

**Skin quiz** — `src/data/quiz.ts` holds a 4×4 matrix (skin type × concern), so
all 16 combinations return a genuinely different routine rather than one generic
bundle. Selecting an answer auto-advances to keep completion rates high.

**Before/after slider** — pointer listeners are bound to `window` during a drag
so it survives the cursor leaving the component, with `touch-action: none` to
stop mobile browsers stealing the gesture as a page scroll. Arrow keys nudge the
divider for keyboard users.

**Social card** — `src/app/opengraph-image.tsx` renders the 1200×630 OG image at
build time with `next/og`, pulling Cormorant Garamond and Plus Jakarta Sans from
the same `fonts.gstatic.com` origin `next/font` already uses. If that fetch
fails the build still succeeds, falling back to Satori's bundled sans.

`metadataBase` is resolved from `NEXT_PUBLIC_SITE_URL`, falling back to
`VERCEL_URL`, so preview and production deployments get absolute image URLs with
no configuration. Because the page is statically prerendered, this is baked in at
**build** time — after pointing a custom domain at the project, set
`NEXT_PUBLIC_SITE_URL` in the Vercel project and redeploy.

Two Satori limitations worth knowing if you edit that file: every node with more
than one child needs an explicit `display: flex`, and neither
`font-variant-numeric` nor `font-feature-settings` is supported — which is why
the card reads "Dua Minggu" where the page says "14 Hari" (Cormorant's old-style
figures would otherwise render "14" as "I4").

**Currency formatting** — `formatIDR` formats manually instead of using `Intl`,
because `Intl`'s non-breaking space differs between server and client and causes
hydration warnings.

**Accessibility & motion** — the drawer and modal trap Escape, lock body scroll
and expose `role="dialog"`; the slider exposes `role="slider"` with live values;
`prefers-reduced-motion` collapses all animation to near-zero duration.

## Notes

GlowSkin is a fictional brand. Product claims, BPOM numbers, reviews and the
WhatsApp number are illustrative placeholders for design purposes only.
