import type { Product } from "@prisma/client";
import { siteConfig } from "@/lib/site";

/** Превью в каталоге: первое фото галереи или одиночное `image`. */
export function productPrimaryImageUrl(
  product: Pick<Product, "image" | "galleryImages">,
): string | null {
  const g = product.galleryImages;
  if (g?.length) return g[0] ?? null;
  return product.image;
}

/** Список URL для галереи на странице товара (всегда минимум одна картинка — можно открыть на весь экран). */
export function productGalleryUrls(
  product: Pick<Product, "image" | "galleryImages">,
): string[] {
  const g = product.galleryImages;
  if (g?.length) return [...g];
  if (product.image) return [product.image];
  return [siteConfig.productImagePlaceholder];
}
