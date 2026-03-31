import { catalogCategoryTileImage } from "@/lib/catalog-category-images";

type Props = {
  categorySlug: string;
  children: React.ReactNode;
};

/**
 * Фон страницы (как на /catalog): фото гранул категории + затемнение.
 * Не использовать внутри карточек товара в сетке — только как оболочка страницы.
 */
export function CategorySceneSection({ categorySlug, children }: Props) {
  const src = catalogCategoryTileImage(categorySlug);

  return (
    <section className="relative overflow-hidden">
      {src ? (
        <>
          <div className="pointer-events-none absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0c0d0f]/93 via-[#0c0d0f]/90 to-[var(--bg)]"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-[var(--bg)]"
          aria-hidden
        />
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {children}
      </div>
    </section>
  );
}
