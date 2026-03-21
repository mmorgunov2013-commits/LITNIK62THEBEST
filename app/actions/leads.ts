"use server";

import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";

export type LeadState = { ok?: boolean; error?: string };

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const emailRaw = formData.get("email")?.toString().trim();
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    email: emailRaw ? emailRaw : undefined,
    alloyInterest: formData.get("alloyInterest")?.toString() || undefined,
    volume: formData.get("volume")?.toString() || undefined,
    comment: formData.get("comment")?.toString() || undefined,
    productId: formData.get("productId")?.toString() || undefined,
    source: formData.get("source")?.toString() || undefined,
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.flatten().formErrors[0] ?? "Проверьте поля формы";
    return { error: msg };
  }

  const productId = parsed.data.productId?.trim();
  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      alloyInterest: parsed.data.alloyInterest,
      volume: parsed.data.volume,
      comment: parsed.data.comment,
      source: parsed.data.source,
      productId: productId ? productId : undefined,
    },
  });

  return { ok: true };
}
