import type { Metadata } from "next";
import { CategoryHeroCards } from "@/components/home/CategoryHeroCards";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Каталог продукции",
  description:
    "Категории сплавов и гранул для ювелирных мастерских и художественного литья. Полная витрина — по кнопке «Всё».",
};

export default async function CatalogLandingPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const cards = [
    ...categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      shortDescription: c.shortDescription,
    })),
    {
      id: "catalog-all-products",
      slug: "vse",
      name: "Всё",
      shortDescription:
        "Полная витрина: поиск, фильтры по категории и сортировка.",
      href: "/catalog/all",
    },
  ];

  return (
    <section className="relative min-h-[min(88vh,52rem)] overflow-hidden border-b border-white/[0.08]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${siteConfig.heroBackgroundImage})`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0c0d0f]/88 via-[#0c0d0f]/72 to-[var(--bg)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
          Каталог продукции
        </h1>
        <CategoryHeroCards heading={null} categories={cards} />
      </div>
    </section>
  );
}
