import Link from "next/link";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { CategoryHeroCards } from "@/components/home/CategoryHeroCards";
import { LeadForm } from "@/components/forms/LeadForm";
import { prisma } from "@/lib/prisma";
import { heroBackdropStyle, siteConfig } from "@/lib/site";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Один блок: текст, кнопки и «Категории» на том же фоне гранул */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          className="lit-hero-backdrop absolute inset-0"
          style={heroBackdropStyle}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0c0d0f]/88 via-[#0c0d0f]/76 to-[#0c0d0f]/94"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:pb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Производство · B2B
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[var(--text)] drop-shadow-sm sm:mt-5 sm:text-4xl sm:leading-[1.12] lg:text-5xl">
            {siteConfig.heroHeadline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:mt-6">
            {siteConfig.heroSubline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
            <Link
              href="/catalog"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-6 text-sm font-medium text-[#1a1510] transition-opacity hover:opacity-90"
            >
              Смотреть каталог
            </Link>
            <a
              href="#request"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/[0.12] bg-[#0c0d0f]/25 px-6 text-sm font-medium text-[var(--text)] backdrop-blur-[2px] hover:border-[var(--accent)]/40"
            >
              Оставить заявку
            </a>
          </div>

          <div className="mt-10 sm:mt-12">
            <CategoryHeroCards
              categories={categories.map((c) => ({
                id: c.id,
                slug: c.slug,
                name: c.name,
                shortDescription: c.shortDescription,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
          Что производим
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Гранулы из цветных сплавов для ювелирного и художественного литья.
          Подбор состава и фракции под задачу, пробные партии, сопровождение
          внедрения.
        </p>
      </section>

      <AdvantagesSection />

      <HowWeWorkSection />

      <section id="request" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
          Заявка
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          {siteConfig.quality.passports}
        </p>
        <div className="mt-8 max-w-xl">
          <LeadForm source="home" submitLabel="Отправить заявку" />
        </div>
      </section>

      <section
        id="production"
        className="border-t border-white/[0.08] bg-[var(--surface)]/35 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            Собственное производство
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Гранулы и сплавы из цветных металлов выпускаем на собственном
              производстве. Подбираем состав и формат под задачу: от образца до
              согласованных партий.
            </p>
            <p>{siteConfig.quality.gost}</p>
            <p>{siteConfig.quality.passports}</p>
            <p>
              Фото производства на сайт можно добавить позже — когда будет
              съёмка, которую вы сочтёте уместной для публичной витрины.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
