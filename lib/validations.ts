import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Укажите имя").max(200),
  phone: z.string().min(5, "Укажите телефон").max(50),
  email: z.string().email().optional(),
  alloyInterest: z.string().max(500).optional(),
  volume: z.string().max(200).optional(),
  comment: z.string().max(5000).optional(),
  productId: z.string().optional(),
  source: z.string().max(100).optional(),
});

export const productFormSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Латинский slug, через дефис"),
  alloyMark: z.string().min(1).max(100),
  categoryId: z.string().min(1),
  shortDescription: z.string().min(1).max(2000),
  fullDescription: z.string().max(20000).optional(),
  application: z.string().max(20000).optional(),
  features: z.string().max(20000).optional(),
  compositionText: z.string().max(20000).optional(),
  gostReference: z.string().max(20000).optional(),
  colorType: z.string().max(500).optional(),
  meltingRange: z.string().max(200).optional(),
  pricePerKg: z.string().optional(),
  priceNote: z.string().max(2000).optional(),
  priceDisplayOverride: z.string().max(100).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "HIDDEN"]),
  sortOrder: z.coerce.number().int().min(0).max(999999),
  seoTitle: z.string().max(300).optional(),
  seoDescription: z.string().max(2000).optional(),
  seoH1: z.string().max(300).optional(),
  internalAnalogLabel: z.string().max(500).optional(),
  internalThirdPartyDocUrl: z
    .union([z.string().url(), z.literal("")])
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
