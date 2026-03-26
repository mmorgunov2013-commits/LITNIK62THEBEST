import type { CSSProperties } from "react";

/** См. `.lit-hero-backdrop` в `app/globals.css` — cover и позиция на мобилке */

/** Плейсхолдер изображения товара в каталоге, если в админке нет своего фото (`hero-category-placeholder.png`) */
const PLACEHOLDER_PRODUCT_IMAGE = "/images/hero-category-placeholder.png" as const;

export const siteConfig = {
  title: "ЛИТНИК",
  description:
    "Производим гранулы и сплавы из цветных металлов для ювелирных мастерских и художественного литья. Подбираем состав и формат под задачу клиента, отправляем образцы, сопровождаем внедрение в работу.",
  /** Главный экран: крупный заголовок (вместо прежнего «Реализуем гранулы…») */
  heroHeadline:
    "Производим гранулы и сплавы из цветных металлов для ювелирных мастерских и художественного литья.",
  /** Подзаголовок под H1 */
  heroSubline:
    "Подбираем состав и формат под задачу клиента, отправляем образцы, сопровождаем внедрение в работу.",
  company: {
    legalName: "ООО «ЛИТНИК»",
    ogrn: "1216200009530",
    inn: "6229098780",
    kpp: "622901001",
  },
  quality: {
    gost: "Производство ориентируется на требования соответствующих ГОСТ; контроль параметров по партиям.",
    passports:
      "Паспорта качества на номенклатуру планируется ввести по мере оформления документооборота.",
  },
  defaultPriceNote:
    "При заказе крупных партий — индивидуальные условия. Фракция, объём и скидки — по согласованию с менеджером.",
  /** Фон героя (главная и лендинг /catalog) — файл в `public/images` */
  heroBackgroundImage: "/images/hero-bg.jpg",
  /** Каталог и страница товара, если в админке нет своего фото */
  productImagePlaceholder: PLACEHOLDER_PRODUCT_IMAGE,
} as const;

export const heroBackdropStyle: CSSProperties = {
  backgroundImage: `url(${siteConfig.heroBackgroundImage})`,
};
