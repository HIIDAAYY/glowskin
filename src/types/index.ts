/**
 * Shared domain types for the GlowSkin storefront.
 * Keeping these in one place means the data layer, the stores and the UI
 * all agree on the shape of a product long before render time.
 */

export type ProductCategory = "serum" | "cleanser" | "toner" | "sunscreen" | "moisturizer" | "mask";

/** The tabs shown above the product grid. `all` is a pseudo-category. */
export type CategoryFilter = "all" | "serum" | "cleanser" | "bundle";

export interface Product {
  id: string;
  name: string;
  /** Short editorial line shown under the title on the card. */
  tagline: string;
  category: ProductCategory;
  /** Which filter tabs this product should appear under. */
  filters: CategoryFilter[];
  /** Price in rupiah, stored as a plain integer (no decimals in IDR retail). */
  price: number;
  /** Original price for strike-through display. `null` when not discounted. */
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  size: string;
  /** Longer copy used inside the Quick View modal. */
  description: string;
  benefits: string[];
  keyIngredients: string[];
  howToUse: string;
  /** Drives the generated bottle artwork — see `ProductVisual`. */
  vessel: VesselShape;
  /** Two-stop gradient used for the product's liquid + card wash. */
  palette: [string, string];
  badge?: string;
}

export type VesselShape = "dropper" | "pump" | "mist" | "tube" | "jar" | "sachet";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  vessel: VesselShape;
  palette: [string, string];
}

export interface Coupon {
  code: string;
  /** Percentage off, expressed as 0–1. */
  discount: number;
  label: string;
}

export type SkinType = "berminyak" | "kering" | "kombinasi" | "sensitif";
export type SkinConcern = "jerawat" | "flek-hitam" | "kusam" | "penuaan-dini";

export interface QuizOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

export interface QuizResult {
  title: string;
  summary: string;
  /** Product ids that make up the recommended routine, in order of use. */
  routine: string[];
}

export type TestimonialTag = "jerawat" | "kusam" | "kering";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  /** Initials rendered inside the generated avatar. */
  initials: string;
  avatarPalette: [string, string];
  rating: number;
  tag: TestimonialTag;
  quote: string;
  product: string;
  daysUsed: number;
  verified: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  /** One-line positioning statement. */
  pitch: string;
  price: number;
  compareAtPrice: number;
  features: string[];
  highlighted: boolean;
  size: string;
  vessel: VesselShape;
  palette: [string, string];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SocialProofEvent {
  name: string;
  city: string;
  item: string;
}
