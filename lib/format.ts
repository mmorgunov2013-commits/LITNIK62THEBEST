export function formatPriceRub(
  price: unknown,
  displayOverride: string | null | undefined,
): string {
  if (price != null && price !== "") {
    const n = Number(price);
    if (!Number.isNaN(n)) {
      return `${new Intl.NumberFormat("ru-RU").format(n)}\u00A0₽`;
    }
  }
  if (displayOverride?.trim()) return displayOverride;
  return "—";
}
