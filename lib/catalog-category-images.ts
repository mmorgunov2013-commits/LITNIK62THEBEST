/**
 * Превью-картинки для плиток на лендинге `/catalog` (ряд с фото над названием категории).
 * Файлы: `public/images/catalog-categories/<slug>.jpg`
 */
const TILES: Record<string, string> = {
  "serebristye-splavy": "/images/catalog-categories/serebristye-splavy.jpg",
  "zheltaya-latun": "/images/catalog-categories/zheltaya-latun.jpg",
  "krasnaya-latun": "/images/catalog-categories/krasnaya-latun.jpg",
  bronza: "/images/catalog-categories/bronza.jpg",
  vse: "/images/catalog-categories/vse.jpg",
};

export function catalogCategoryTileImage(slug: string): string | null {
  return TILES[slug] ?? null;
}
