import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPriceRub } from "@/lib/format";
import { deleteProduct } from "@/app/actions/admin-product";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[var(--text)]">Товары</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[#1a1510]"
        >
          Новый товар
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/[0.08] bg-[var(--surface)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Название</th>
              <th className="px-4 py-3 font-medium">Марка</th>
              <th className="px-4 py-3 font-medium">Категория</th>
              <th className="px-4 py-3 font-medium">Цена / кг</th>
              <th className="px-4 py-3 font-medium">Статус</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/[0.06] last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">{p.alloyMark}</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {p.category.name}
                </td>
                <td className="px-4 py-3">
                  {formatPriceRub(p.pricePerKg, p.priceDisplayOverride)}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">{p.status}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteProduct.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="text-red-400 hover:underline"
                      formNoValidate
                    >
                      Удалить
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
