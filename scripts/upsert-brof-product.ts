/**
 * Одноразовое добавление/обновление карточки «БроФ 10-1» на проде без полного db seed.
 * Запуск на сервере (Render Shell): npx tsx scripts/upsert-brof-product.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "brof-10-1-granuly-100g";

const GALLERY = [
  "/images/products/brof-10-1/01.jpg",
  "/images/products/brof-10-1/02.jpg",
  "/images/products/brof-10-1/03.jpg",
  "/images/products/brof-10-1/04.jpg",
  "/images/products/brof-10-1/05.jpg",
  "/images/products/brof-10-1/06.jpg",
] as const;

const SPECS: { parameter: string; value: string }[] = [
  { parameter: "Бренд", value: "ЛИТНИК" },
  { parameter: "Тип", value: "бронза в гранулах для литья" },
  { parameter: "Марка сплава", value: "БроФ 10-1" },
  { parameter: "Вид сплава", value: "фосфористая бронза" },
  { parameter: "Состав (ориентир)", value: "Cu — основа; Sn 9–11%; P 0,4–1,1%" },
  { parameter: "Форма", value: "гранулы" },
  { parameter: "Фасовка", value: "100 г" },
  { parameter: "Цвет сплава", value: "бронзово-золотистый" },
  {
    parameter: "Зарубежные обозначения (ориентир)",
    value: "CuSn10P, PB1, CC481K (CuSn11P-C), C90700, C91700",
  },
];

async function main() {
  const category = await prisma.category.findUnique({
    where: { slug: "bronza" },
  });
  if (!category) {
    throw new Error(
      'Категория "bronza" не найдена. Сначала создайте категории (полный seed или вручную).',
    );
  }

  const application =
    "Ювелирное литьё, художественное литьё, декоративные изделия, сувенирная продукция, фурнитура, литые заготовки — по согласованию технологии и назначения.";
  const features =
    "Гранулированная форма удобна для точной навески, быстрой подготовки к плавке и работы с небольшими партиями; подходит для пробных плавок и повседневной литейной работы в мастерской.";
  const compositionText =
    "Сплав БроФ 10-1 — оловянно-фосфористая бронза: медь — основа, олово 9–11%, фосфор 0,4–1,1%. Ближайшие зарубежные соответствия по обозначениям — CuSn10P, PB1, CC481K (CuSn11P-C); также встречаются C90700, C91700.";
  const fullDescription = [application, features, compositionText].join("\n\n");

  const priceNote =
    process.env.DEFAULT_PRICE_NOTE ??
    "При заказе крупных партий — индивидуальные условия. Фракция, объём и скидки — по согласованию с менеджером.";

  const data = {
    title: "Бронза БроФ 10-1 в гранулах для литья, 100 г",
    alloyMark: "БроФ 10-1",
    categoryId: category.id,
    shortDescription:
      "Фосфористая бронза в гранулах, фасовка 100 г. Для ювелирного и художественного литья, декора, фурнитуры и малых партий.",
    fullDescription,
    application,
    features,
    compositionText,
    gostReference:
      "Нормативная привязка и паспорт качества — по согласованию под партию; условия поставки уточняются с менеджером.",
    colorType: "Бронзово-золотистый",
    meltingRange: "уточняется по партии",
    pricePerKg: null,
    priceNote,
    priceDisplayOverride: "по запросу",
    image: GALLERY[0],
    galleryImages: [...GALLERY],
    status: "ACTIVE" as const,
    sortOrder: 71,
    seoTitle: "Бронза БроФ 10-1 в гранулах для литья, 100 г | ЛИТНИК",
    seoDescription:
      "Фосфористая бронза в гранулах, фасовка 100 г. Для ювелирного и художественного литья, декора, фурнитуры и малых партий.",
    seoH1: "Бронза БроФ 10-1 в гранулах для литья, 100 г",
    internalAnalogLabel: null,
    internalThirdPartyDocUrl: null,
  };

  await prisma.product.upsert({
    where: { slug: SLUG },
    create: {
      slug: SLUG,
      ...data,
      specs: {
        create: SPECS.map((s, i) => ({ ...s, sortOrder: i })),
      },
    },
    update: {
      ...data,
      specs: {
        deleteMany: {},
        create: SPECS.map((s, i) => ({ ...s, sortOrder: i })),
      },
    },
  });

  console.log("OK: товар", SLUG, "создан или обновлён.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
