/** Цвета проблеска по slug категории (герой главной) */
export function metalShimmerForSlug(slug: string): {
  beam: string;
  glow: string;
} {
  switch (slug) {
    case "serebristye-splavy":
      return {
        beam: "rgba(248, 250, 252, 0.95)",
        glow: "rgba(148, 163, 184, 0.55)",
      };
    case "zheltaya-latun":
      return {
        beam: "rgba(253, 224, 71, 0.92)",
        glow: "rgba(234, 179, 8, 0.45)",
      };
    case "krasnaya-latun":
      return {
        beam: "rgba(252, 165, 165, 0.9)",
        glow: "rgba(185, 90, 70, 0.5)",
      };
    case "bronza":
      return {
        beam: "rgba(217, 119, 87, 0.92)",
        glow: "rgba(180, 83, 9, 0.42)",
      };
    /** Карточка «Всё» на лендинге каталога */
    case "vse":
      return {
        beam: "rgba(214, 189, 120, 0.95)",
        glow: "rgba(201, 169, 98, 0.48)",
      };
    default:
      return {
        beam: "rgba(201, 169, 98, 0.85)",
        glow: "rgba(201, 169, 98, 0.35)",
      };
  }
}
