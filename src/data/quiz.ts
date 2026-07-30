import type { QuizOption, QuizResult, SkinConcern, SkinType } from "@/types";

export const SKIN_TYPE_OPTIONS: QuizOption<SkinType>[] = [
  {
    value: "berminyak",
    label: "Berminyak",
    description: "Mengilap di T-zone sejak siang, pori terlihat jelas",
  },
  {
    value: "kering",
    label: "Kering",
    description: "Terasa ketarik setelah cuci muka, kadang mengelupas",
  },
  {
    value: "kombinasi",
    label: "Kombinasi",
    description: "Berminyak di hidung & dahi, kering di area pipi",
  },
  {
    value: "sensitif",
    label: "Sensitif",
    description: "Gampang kemerahan dan perih saat coba produk baru",
  },
];

export const CONCERN_OPTIONS: QuizOption<SkinConcern>[] = [
  {
    value: "jerawat",
    label: "Jerawat",
    description: "Beruntusan, komedo, atau jerawat yang datang berulang",
  },
  {
    value: "flek-hitam",
    label: "Flek Hitam",
    description: "Bekas jerawat & noda gelap yang sulit memudar",
  },
  {
    value: "kusam",
    label: "Kusam",
    description: "Warna kulit tidak merata dan terlihat lelah",
  },
  {
    value: "penuaan-dini",
    label: "Penuaan Dini",
    description: "Garis halus, kulit mulai kehilangan kekenyalan",
  },
];

/**
 * Recommendation matrix. Concern drives the "hero" active, skin type decides
 * the supporting cast — so every one of the 16 combinations returns a routine
 * that actually reads as tailored rather than a single generic bundle.
 */
const RESULTS: Record<SkinConcern, Record<SkinType, QuizResult>> = {
  jerawat: {
    berminyak: {
      title: "Rutinitas Clear & Matte",
      summary:
        "Kulit berminyak dengan jerawat butuh kontrol sebum tanpa over-drying. Niacinamide menekan produksi minyak sambil menenangkan peradangan.",
      routine: ["gentle-cleanser", "glow-serum", "daily-sunscreen"],
    },
    kering: {
      title: "Rutinitas Calm & Repair",
      summary:
        "Jerawat pada kulit kering biasanya tanda skin barrier rusak. Fokus kita: hidrasi dulu, baru aktif — supaya tidak makin iritasi.",
      routine: ["gentle-cleanser", "hydrating-toner", "glow-serum", "daily-sunscreen"],
    },
    kombinasi: {
      title: "Rutinitas Balance Clear",
      summary:
        "Kombinasi butuh dua kecepatan: menahan minyak di T-zone tanpa membuat pipi ketarik. Toner ringan jadi penyeimbangnya.",
      routine: ["gentle-cleanser", "hydrating-toner", "glow-serum", "daily-sunscreen"],
    },
    sensitif: {
      title: "Rutinitas Gentle Clear",
      summary:
        "Kulit sensitif berjerawat butuh langkah seminimal mungkin. Tiga produk, semuanya fragrance-free dan sudah lolos uji dermatologi.",
      routine: ["gentle-cleanser", "hydrating-toner", "daily-sunscreen"],
    },
  },
  "flek-hitam": {
    berminyak: {
      title: "Rutinitas Even Tone",
      summary:
        "Alpha arbutin memutus produksi melanin di sumbernya, sementara sunscreen mencegah flek baru muncul. Keduanya wajib jalan bersama.",
      routine: ["gentle-cleanser", "glow-serum", "daily-sunscreen"],
    },
    kering: {
      title: "Rutinitas Even Tone Nourish",
      summary:
        "Flek pada kulit kering memudar lebih lambat karena regenerasi sel melambat. Night cream mempercepat turnover semalaman.",
      routine: ["gentle-cleanser", "hydrating-toner", "glow-serum", "night-cream", "daily-sunscreen"],
    },
    kombinasi: {
      title: "Rutinitas Fade & Balance",
      summary:
        "Serum brightening di seluruh wajah, night cream difokuskan di area kering. Hasilnya rata tanpa bikin T-zone makin berminyak.",
      routine: ["gentle-cleanser", "glow-serum", "night-cream", "daily-sunscreen"],
    },
    sensitif: {
      title: "Rutinitas Fade Gentle",
      summary:
        "Kita lewati retinal dan andalkan alpha arbutin yang jauh lebih ramah. Sheet mask jadi booster mingguan tanpa risiko iritasi.",
      routine: ["gentle-cleanser", "hydrating-toner", "glow-serum", "daily-sunscreen"],
    },
  },
  kusam: {
    berminyak: {
      title: "Rutinitas Instant Glow",
      summary:
        "Kusam pada kulit berminyak umumnya karena penumpukan sel mati. Serum vitamin-C-adjacent plus masker mingguan mengembalikan cahaya kulit.",
      routine: ["gentle-cleanser", "glow-serum", "brightening-mask", "daily-sunscreen"],
    },
    kering: {
      title: "Rutinitas Dewy Glow",
      summary:
        "Kulit kering terlihat kusam karena kurang air, bukan kurang eksfoliasi. Layering toner adalah kuncinya.",
      routine: ["gentle-cleanser", "hydrating-toner", "glow-serum", "brightening-mask"],
    },
    kombinasi: {
      title: "Rutinitas Radiance Balance",
      summary:
        "Empat langkah untuk mengembalikan glow tanpa mengganggu keseimbangan minyak alami kulitmu.",
      routine: ["gentle-cleanser", "hydrating-toner", "glow-serum", "daily-sunscreen"],
    },
    sensitif: {
      title: "Rutinitas Soft Radiance",
      summary:
        "Glow yang aman: hidrasi maksimal, aktif seminimal mungkin, dan proteksi matahari yang tidak bikin perih.",
      routine: ["gentle-cleanser", "hydrating-toner", "daily-sunscreen"],
    },
  },
  "penuaan-dini": {
    berminyak: {
      title: "Rutinitas Firm & Fresh",
      summary:
        "Retinal terenkapsulasi bekerja di malam hari tanpa membuat kulit berminyak terasa berat esok paginya.",
      routine: ["gentle-cleanser", "glow-serum", "night-cream", "daily-sunscreen"],
    },
    kering: {
      title: "Rutinitas Age Repair",
      summary:
        "Paket lengkap anti-aging: ceramide mengunci kelembapan, peptide memperbaiki elastisitas, retinal mempercepat regenerasi.",
      routine: [
        "gentle-cleanser",
        "hydrating-toner",
        "glow-serum",
        "night-cream",
        "daily-sunscreen",
      ],
    },
    kombinasi: {
      title: "Rutinitas Youth Balance",
      summary:
        "Anti-aging tanpa rasa berat. Night cream di area kering, sunscreen ringan untuk seluruh wajah setiap pagi.",
      routine: ["gentle-cleanser", "hydrating-toner", "night-cream", "daily-sunscreen"],
    },
    sensitif: {
      title: "Rutinitas Gentle Youth",
      summary:
        "Mulai pelan-pelan: barrier dulu diperkuat, retinal dipakai 2x seminggu. Sabar sedikit, hasilnya jauh lebih awet.",
      routine: ["gentle-cleanser", "hydrating-toner", "night-cream", "daily-sunscreen"],
    },
  },
};

export function getQuizResult(skinType: SkinType, concern: SkinConcern): QuizResult {
  return RESULTS[concern][skinType];
}
