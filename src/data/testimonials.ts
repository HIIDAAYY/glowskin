import type { Testimonial, TestimonialTag } from "@/types";

export const TESTIMONIAL_TABS: { value: TestimonialTag | "all"; label: string }[] = [
  { value: "all", label: "Semua Ulasan" },
  { value: "jerawat", label: "Jerawat" },
  { value: "kusam", label: "Kusam" },
  { value: "kering", label: "Kulit Kering" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rina Puspita",
    location: "Jakarta Selatan",
    initials: "RP",
    avatarPalette: ["#E8C9A0", "#C99A63"],
    rating: 5,
    tag: "jerawat",
    quote:
      "Beruntusan di dahi yang udah setahun nggak sembuh-sembuh akhirnya rata di minggu ketiga. Yang bikin kaget, nggak ada fase purging sama sekali.",
    product: "Glow Serum + Gentle Cleanser",
    daysUsed: 42,
    verified: true,
  },
  {
    id: "t2",
    name: "Dewi Anggraini",
    location: "Bandung",
    initials: "DA",
    avatarPalette: ["#F7DFE0", "#DFA0A6"],
    rating: 5,
    tag: "kusam",
    quote:
      "Kerja shift malam bikin muka aku abu-abu banget. Dua minggu pakai, temen kantor nanya aku ganti foundation apa — padahal cuma skincare.",
    product: "Paket Complete Glowing",
    daysUsed: 28,
    verified: true,
  },
  {
    id: "t3",
    name: "Siti Nurhaliza",
    location: "Surabaya",
    initials: "SN",
    avatarPalette: ["#DCE6DA", "#8A9A86"],
    rating: 5,
    tag: "kering",
    quote:
      "Kulit aku kering parah sampai suka mengelupas di sekitar hidung. Toner-nya aku pakai teknik 7-skin, sekarang nggak pernah ketarik lagi habis cuci muka.",
    product: "Hydrating Toner",
    daysUsed: 60,
    verified: true,
  },
  {
    id: "t4",
    name: "Maya Kusuma",
    location: "Yogyakarta",
    initials: "MK",
    avatarPalette: ["#E4DCEC", "#9E8CB0"],
    rating: 4,
    tag: "jerawat",
    quote:
      "Jerawat hormonal di rahang berkurang jauh. Bintang empat karena botolnya cepat habis kalau dipakai pagi-malam, semoga ada ukuran besar.",
    product: "Glow Serum",
    daysUsed: 35,
    verified: true,
  },
  {
    id: "t5",
    name: "Anita Wijaya",
    location: "Medan",
    initials: "AW",
    avatarPalette: ["#E6EEF2", "#9BB6C4"],
    rating: 5,
    tag: "kusam",
    quote:
      "Sunscreen-nya yang bikin aku bertahan. Kulit sawo matang aku biasanya abu-abu kalau pakai SPF, ini beneran nggak ada white cast sedikit pun.",
    product: "Daily Sunscreen",
    daysUsed: 90,
    verified: true,
  },
  {
    id: "t6",
    name: "Laras Ayu",
    location: "Semarang",
    initials: "LA",
    avatarPalette: ["#FBEBD6", "#EFC178"],
    rating: 5,
    tag: "kering",
    quote:
      "Umur 38 dan baru mulai serius skincare. Night cream-nya lembut banget, garis halus di bawah mata jauh berkurang tanpa perih sama sekali.",
    product: "Night Cream",
    daysUsed: 75,
    verified: true,
  },
];

/** Rotating social-proof notifications shown in the bottom-left toast. */
export const SOCIAL_PROOF_EVENTS = [
  { name: "Rina", city: "Jakarta", item: "Paket Complete Glowing" },
  { name: "Sarah", city: "Bandung", item: "Glow Serum" },
  { name: "Nabila", city: "Surabaya", item: "Daily Sunscreen" },
  { name: "Putri", city: "Medan", item: "Paket Starter" },
  { name: "Andini", city: "Denpasar", item: "Hydrating Toner" },
  { name: "Kirana", city: "Makassar", item: "Night Cream" },
  { name: "Fitri", city: "Yogyakarta", item: "Gentle Cleanser" },
  { name: "Vina", city: "Palembang", item: "Paket Ultimate Anti-Aging" },
];
