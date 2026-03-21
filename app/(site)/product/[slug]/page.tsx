import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { formatPriceRub } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, status: "ACTIVE" },
  });
  if (!product) return { title: "Товар" };
  return {
    title: product.seoTitle ?? product.title,
    description: product.seoDescription ?? product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, status: "ACTIVE" },
    include: { category: true, specs: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) notFound();

  const price = formatPriceRub(product.pricePerKg, product.priceDisplayOverride);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/catalog" className="hover:text-[var(--accent)]">
          Каталог
        </Link>
        <span className="mx-2 text-white/30">/</span>
        <Link
          href={`/catalog/${product.category.slug}`}
          className="hover:text-[var(--accent)]"
        >
          {product.category.name}
        </Link>
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--surface2)] ring-1 ring-inset ring-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image ?? siteConfig.productImagePlaceholder}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            {product.category.name}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)]">
            {product.seoH1 ?? product.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Марка:{" "}
            <span className="text-[var(--text)]">{product.alloyMark}</span>
          </p>
          <p className="mt-6 text-2xl font-medium text-[var(--text)]">
            {price}
            <span className="text-base font-normal text-[var(--muted)]">
              {" "}
              / кг
            </span>
          </p>
          {product.priceNote ? (
            <p className="mt-2 text-sm text-[var(--muted)]">{product.priceNote}</p>
          ) : null}
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
            {product.shortDescription}
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)]">
          {product.application ? (
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text)]">
                Применение
              </h2>
              <p className="mt-2 whitespace-pre-line">{product.application}</p>
            </section>
          ) : null}
          {product.features ? (
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text)]">
                Особенности
              </h2>
              <p className="mt-2 whitespace-pre-line">{product.features}</p>
            </section>
          ) : null}
          {product.compositionText ? (
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text)]">
                Состав
              </h2>
              <p className="mt-2 whitespace-pre-line">
                {product.compositionText}
              </p>
            </section>
          ) : null}
          {product.gostReference ? (
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text)]">
                Нормативная ориентировка
              </h2>
              <p className="mt-2">{product.gostReference}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">
                {siteConfig.quality.gost}
              </p>
            </section>
          ) : null}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Характеристики
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08]">
            <table className="w-full text-left text-sm">
              <tbody>
                {product.specs.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/[0.06] last:border-0"
                  >
                    <th className="w-2/5 px-4 py-3 font-normal text-[var(--muted)]">
                      {row.parameter}
                    </th>
                    <td className="px-4 py-3 text-[var(--text)]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-xl border border-white/[0.08] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-semibold text-[var(--text)]">
              Запросить образец или условия
            </h3>
            <div className="mt-4">
              <LeadForm
                productId={product.id}
                defaultAlloy={product.alloyMark}
                source="product"
                submitLabel="Отправить"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
