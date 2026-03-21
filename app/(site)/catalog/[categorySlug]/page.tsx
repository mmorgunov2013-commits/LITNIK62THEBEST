import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/catalog/ProductCard";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { categorySlug } = await params;
  const cat = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });
  if (!cat) return { title: "Категория" };
  return {
    title: cat.name,
    description: cat.shortDescription ?? undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      products: {
        where: { status: "ACTIVE" },
        orderBy: { sortOrder: "asc" },
        include: { category: true },
      },
    },
  });
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/catalog" className="hover:text-[var(--accent)]">
          Каталог
        </Link>
        <span className="mx-2 text-white/30">/</span>
        <span className="text-[var(--text)]">{category.name}</span>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)]">
        {category.name}
      </h1>
      {category.shortDescription ? (
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          {category.shortDescription}
        </p>
      ) : null}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
