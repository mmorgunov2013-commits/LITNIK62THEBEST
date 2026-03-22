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
    <section className="relative flex min-h-[min(92vh,56rem)] flex-col overflow-hidden border-b border-white/[0.08]">
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
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16">
        <h1 className="mb-6 text-xl font-semibold tracking-tight text-[var(--text)] sm:mb-8 sm:text-2xl">
          Каталог продукции
        </h1>
        <CategoryHeroCards
          heading={null}
          categories={cards}
          photoPlaceholders
        />
      </div>
    </section>
  );
}
