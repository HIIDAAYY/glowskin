import type { CartItem } from "@/types";
import { formatIDR } from "@/lib/utils";

/** Fictional store number — swap for the real one in production. */
export const STORE_WHATSAPP = "6281234567890";

interface OrderPayload {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
}

/**
 * Builds a `wa.me` deep link containing a pre-formatted, itemised invoice.
 * WhatsApp renders `*bold*` and newlines, so the message arrives in the
 * merchant's inbox already looking like a receipt — no retyping required.
 */
export function buildWhatsAppOrderUrl({
  items,
  subtotal,
  discount,
  total,
  couponCode,
}: OrderPayload): string {
  const lines: string[] = [];

  lines.push("Halo *GlowSkin*, saya ingin pesan:");
  lines.push("");

  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.quantity}x ${item.name} (${item.size}) — ${formatIDR(lineTotal)}`,
    );
  });

  lines.push("");
  lines.push(`Subtotal: ${formatIDR(subtotal)}`);

  if (discount > 0 && couponCode) {
    lines.push(`Diskon (${couponCode}): -${formatIDR(discount)}`);
  }

  lines.push(`*Total: ${formatIDR(total)}*`);
  lines.push("");
  lines.push("Mohon info ongkir & ketersediaan stoknya ya. Terima kasih!");

  return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}
