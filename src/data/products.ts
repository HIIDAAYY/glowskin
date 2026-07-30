import { BUNDLES } from "@/data/bundles";
import type { Product } from "@/types";

/**
 * The six hero SKUs. Palettes drive both the generated bottle artwork and the
 * card's ambient wash, so each product reads as its own object on the shelf.
 */
export const PRODUCTS: Product[] = [
  {
    id: "glow-serum",
    name: "Glow Serum",
    tagline: "Niacinamide 10% + Alpha Arbutin",
    category: "serum",
    filters: ["all", "serum"],
    price: 129000,
    compareAtPrice: 179000,
    rating: 4.9,
    reviewCount: 2841,
    size: "30 ml",
    description:
      "Serum harian bertekstur ringan yang meratakan warna kulit dan memudarkan bekas jerawat. Diformulasikan pada pH 5.5 sehingga aman dipakai pagi dan malam tanpa memicu purging.",
    benefits: [
      "Memudarkan bekas jerawat & flek hitam",
      "Mengecilkan tampilan pori dalam 14 hari",
      "Tekstur cepat meresap, tidak lengket",
    ],
    keyIngredients: ["Niacinamide 10%", "Alpha Arbutin 2%", "Centella Asiatica", "Zinc PCA"],
    howToUse:
      "Pakai 2–3 tetes pada wajah bersih, pagi dan malam. Tepuk perlahan, lanjutkan dengan pelembap.",
    vessel: "dropper",
    palette: ["#E8C9A0", "#C99A63"],
    badge: "Best Seller",
  },
  {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    tagline: "Low-pH amino acid foam",
    category: "cleanser",
    filters: ["all", "cleanser"],
    price: 89000,
    compareAtPrice: 119000,
    rating: 4.8,
    reviewCount: 1932,
    size: "100 ml",
    description:
      "Pembersih wajah berbusa lembut tanpa SLS. Mengangkat sunscreen dan minyak berlebih tetapi meninggalkan skin barrier tetap utuh — kulit terasa bersih, bukan ketarik.",
    benefits: [
      "Membersihkan tanpa membuat kulit kering",
      "Aman untuk kulit sensitif & berjerawat",
      "Busa lembut, wangi chamomile alami",
    ],
    keyIngredients: ["Amino Acid Surfactant", "Chamomile Extract", "Panthenol", "Glycerin"],
    howToUse:
      "Basahi wajah, busakan seukuran biji kacang, pijat 30 detik, bilas. Gunakan pagi dan malam.",
    vessel: "pump",
    palette: ["#DCE6DA", "#8A9A86"],
  },
  {
    id: "hydrating-toner",
    name: "Hydrating Toner",
    tagline: "5-layer hyaluronic essence",
    category: "toner",
    filters: ["all"],
    price: 99000,
    compareAtPrice: null,
    rating: 4.7,
    reviewCount: 1204,
    size: "150 ml",
    description:
      "Toner esensi dengan lima ukuran molekul hyaluronic acid yang menghidrasi sampai lapisan terdalam. Cocok dipakai dengan teknik 7-skin untuk kulit yang dehidrasi.",
    benefits: [
      "Hidrasi berlapis hingga 72 jam",
      "Menenangkan kulit kemerahan",
      "Menyiapkan kulit menyerap serum lebih baik",
    ],
    keyIngredients: ["5D Hyaluronic Acid", "Beta-Glucan", "Rice Ferment", "Allantoin"],
    howToUse: "Tuang ke telapak tangan, tepuk ke seluruh wajah setelah cuci muka. Ulangi 2–3 lapis.",
    vessel: "mist",
    palette: ["#E6EEF2", "#9BB6C4"],
  },
  {
    id: "daily-sunscreen",
    name: "Daily Sunscreen",
    tagline: "SPF 50+ PA++++ invisible fluid",
    category: "sunscreen",
    filters: ["all"],
    price: 119000,
    compareAtPrice: 149000,
    rating: 4.9,
    reviewCount: 3517,
    size: "40 ml",
    description:
      "Sunscreen hybrid bertekstur fluid yang benar-benar tidak meninggalkan white cast di kulit sawo matang. Finish semi-matte, nyaman dipakai di bawah makeup.",
    benefits: [
      "Proteksi UVA/UVB & blue light",
      "Tanpa white cast di semua skin tone",
      "Tidak memicu komedo (non-comedogenic)",
    ],
    keyIngredients: ["Tinosorb S", "Uvinul A Plus", "Vitamin E", "Cica Extract"],
    howToUse:
      "Aplikasikan 2 ruas jari sebagai langkah terakhir skincare pagi. Reapply tiap 3 jam saat beraktivitas di luar.",
    vessel: "tube",
    palette: ["#FBEBD6", "#EFC178"],
    badge: "Wajib Punya",
  },
  {
    id: "night-cream",
    name: "Night Cream",
    tagline: "Encapsulated retinal 0.05%",
    category: "moisturizer",
    filters: ["all"],
    price: 159000,
    compareAtPrice: 199000,
    rating: 4.8,
    reviewCount: 986,
    size: "50 g",
    description:
      "Krim malam dengan retinal terenkapsulasi yang melepas kandungan aktif secara bertahap — hasil anti-aging maksimal dengan iritasi minimal. Bangun tidur, kulit terasa kenyal.",
    benefits: [
      "Menyamarkan garis halus dalam 8 minggu",
      "Merangsang regenerasi sel semalaman",
      "Formula slow-release, minim iritasi",
    ],
    keyIngredients: ["Encapsulated Retinal", "Ceramide NP", "Squalane", "Peptide Complex"],
    howToUse:
      "Malam hari, ambil seukuran kacang polong. Mulai 2x seminggu, tingkatkan bertahap. Wajib pakai sunscreen esoknya.",
    vessel: "jar",
    palette: ["#E4DCEC", "#9E8CB0"],
  },
  {
    id: "brightening-mask",
    name: "Brightening Sheet Mask",
    tagline: "Vitamin C + rice water · isi 5",
    category: "mask",
    filters: ["all"],
    price: 75000,
    compareAtPrice: 99000,
    rating: 4.6,
    reviewCount: 742,
    size: "5 x 25 ml",
    description:
      "Masker lembar dari serat bambu yang menempel sempurna di kontur wajah. Satu lembar setara satu botol ampoule — instant glow untuk hari-hari penting.",
    benefits: [
      "Efek glowing instan dalam 15 menit",
      "Serat bambu, tidak mudah melorot",
      "Sisa esensi bisa dipakai ke leher",
    ],
    keyIngredients: ["Vitamin C Derivative", "Rice Water", "Licorice Root", "Hyaluronic Acid"],
    howToUse:
      "Tempel pada wajah bersih selama 15–20 menit. Tepuk sisa esensi, tidak perlu dibilas. 2–3x seminggu.",
    vessel: "sachet",
    palette: ["#F7DFE0", "#DFA0A6"],
  },
];

/**
 * The bundles re-expressed as products so they can share the grid, the Quick
 * View modal and the cart. Derived rather than duplicated — pricing and
 * contents stay defined in exactly one place (`data/bundles.ts`).
 */
const BUNDLES_AS_PRODUCTS: Product[] = BUNDLES.map((bundle) => ({
  id: bundle.id,
  name: bundle.name,
  tagline: bundle.pitch,
  category: "serum",
  filters: ["bundle"],
  price: bundle.price,
  compareAtPrice: bundle.compareAtPrice,
  rating: 4.9,
  reviewCount: 640,
  size: bundle.size,
  description: `${bundle.pitch} Seluruh isi paket dikirim dalam satu kotak dengan panduan urutan pemakaian, sehingga kamu tidak perlu menebak-nebak lagi.`,
  benefits: bundle.features.slice(0, 3),
  keyIngredients: ["Niacinamide", "Hyaluronic Acid", "Ceramide", "SPF 50+"],
  howToUse:
    "Ikuti kartu panduan di dalam paket: pagi untuk rangkaian hidrasi & proteksi, malam untuk rangkaian perbaikan.",
  vessel: bundle.vessel,
  palette: bundle.palette,
  badge: bundle.highlighted ? "Paling Populer" : undefined,
}));

/** Everything the grid can display — individual SKUs plus the bundle offers. */
export const CATALOG: Product[] = [...PRODUCTS, ...BUNDLES_AS_PRODUCTS];

/** O(1) lookup used by the quiz, bundles and cart when resolving ids. */
export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(
  CATALOG.map((product) => [product.id, product]),
);

export const CATEGORY_TABS: { value: "all" | "serum" | "cleanser" | "bundle"; label: string }[] = [
  { value: "all", label: "Semua Produk" },
  { value: "serum", label: "Serum" },
  { value: "cleanser", label: "Cleanser" },
  { value: "bundle", label: "Bundle" },
];
