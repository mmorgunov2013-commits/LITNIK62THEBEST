import Link from "next/link";
import type { Category, Product } from "@prisma/client";
import { formatPriceRub } from "@/lib/format";
import { productPrimaryImageUrl } from "@/lib/product-media";
import { siteConfig } from "@/lib/site";

type Props = {
  product: Product & { category: Category };
};

export function ProductCard({ product }: Props) {
  const price = formatPriceRub(product.pricePerKg, product.priceDisplayOverride);
  const imgSrc =
    productPrimaryImageUrl(product) ?? siteConfig.productImagePlaceholder;
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-xl border border-white/[0.08] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent)]/35 hover:shadow-[0_0_0_1px_rgba(201,169,98,0.15)]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[var(--surface2)] ring-1 ring-inset ring-white/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {product.category.name}
      </p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)]">
        {product.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
        {product.shortDescription}
      </p>
      <p className="mt-auto pt-4 text-sm font-medium text-[var(--text)]">
        {price}
        <span className="font-normal text-[var(--muted)]"> / кг</span>
      </p>
    </Link>
  );
}
