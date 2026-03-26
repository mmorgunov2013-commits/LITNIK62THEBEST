import type { Product } from "@prisma/client";

/** Превью в каталоге: первое фото галереи или одиночное `image`. */
export function productPrimaryImageUrl(
  product: Pick<Product, "image" | "galleryImages">,
): string | null {
  const g = product.galleryImages;
  if (g?.length) return g[0] ?? null;
  return product.image;
}
