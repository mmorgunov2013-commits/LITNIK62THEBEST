import Link from "next/link";
import { ProductCard } from "@/components/catalog/ProductCard";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    order?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const categorySlug = sp.category?.trim() ?? "";
  const sort = sp.sort === "price" ? "price" : "name";
  const order = sp.order === "desc" ? "desc" : "asc";

  const where: Prisma.ProductWhereInput = {
    status: "ACTIVE",
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { alloyMark: { contains: q } },
          ],
        }
      : {}),
    ...(categorySlug
      ? { category: { slug: categorySlug } }
      : {}),
  };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy:
      sort === "price"
        ? { pricePerKg: order }
        : { title: order },
  });

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const buildHref = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const next = { q, category: categorySlug, sort, order, ...patch };
    if (next.q) p.set("q", next.q);
    if (next.category) p.set("category", next.category);
    if (next.sort && next.sort !== "name") p.set("sort", next.sort);
    if (next.order && next.order !== "asc") p.set("order", next.order);
    const s = p.toString();
    return s ? `/catalog?${s}` : "/catalog";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
        Каталог
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        B2B-витрина сплавов. Корзины нет — оставьте заявку на расчёт или
        образец.
      </p>

      <form
        method="GET"
        action="/catalog"
        className="mt-8 flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[var(--surface)] p-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="block text-xs text-[var(--muted)]">Поиск</label>
          <input
            name="q"
            defaultValue={q}
            placeholder="Название или марка"
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:w-56">
          <label className="block text-xs text-[var(--muted)]">Категория</label>
          <select
            name="category"
            defaultValue={categorySlug}
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm"
          >
            <option value="">Все</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-44">
          <label className="block text-xs text-[var(--muted)]">Сортировка</label>
          <select
            name="sort"
            defaultValue={sort}
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm"
          >
            <option value="name">По названию</option>
            <option value="price">По цене</option>
          </select>
        </div>
        <div className="sm:w-40">
          <label className="block text-xs text-[var(--muted)]">Порядок</label>
          <select
            name="order"
            defaultValue={order}
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm"
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
        <button
          type="submit"
          className="h-10 rounded-lg bg-[var(--accent)] px-4 text-sm font-medium text-[#1a1510]"
        >
          Применить
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link
          href={buildHref({ sort: "name", order: "asc" })}
          className="text-[var(--muted)] hover:text-[var(--accent)]"
        >
          Сбросить сортировку
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-12 text-[var(--muted)]">Ничего не найдено.</p>
      ) : null}
    </div>
  );
}
