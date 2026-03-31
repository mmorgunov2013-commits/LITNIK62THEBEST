import Link from "next/link";
import type { Category, Product } from "@prisma/client";
import { catalogCategoryTileImage } from "@/lib/catalog-category-images";
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
  const categoryBg = catalogCategoryTileImage(product.category.slug);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.1] p-5 transition-all hover:border-[var(--accent)]/35 hover:shadow-[0_0_0_1px_rgba(201,169,98,0.15)]"
    >
      {categoryBg ? (
        <>
          <div className="pointer-events-none absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={categoryBg}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          {/* затемнение как на /catalog, чуть сильнее для текста */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0c0d0f]/92 via-[#0a0b0d]/90 to-[#08090a]/94"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-[var(--surface)]"
          aria-hidden
        />
      )}

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/25 ring-1 ring-inset ring-white/[0.08] backdrop-blur-[1px]">
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
      </div>
    </Link>
  );
}
