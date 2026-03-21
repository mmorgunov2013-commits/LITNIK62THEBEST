import { readFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SourceFile = {
  meta: {
    defaults: { priceNote: string; utp: string };
    qualityPolicy: { gost: string; passports: string };
  };
  categories: Array<{
    slug: string;
    name: string;
    sortOrder: number;
    shortDescription: string;
  }>;
  products: Array<{
    slug: string;
    title: string;
    alloyMark: string;
    categorySlug: string;
    sortOrder: number;
    image: string | null;
    shortDescription: string;
    pricePerKgRub: number | null;
    priceDisplay?: string;
    internalAnalogLabel?: string;
    colorType?: string;
    meltingRange?: string;
    application?: string;
    features?: string;
    compositionText?: string;
    gostReference?: string;
    specs: Array<{ parameter: string; value: string }>;
    internalThirdPartyDocUrl?: string | null;
  }>;
};

async function main() {
  const path = join(__dirname, "../data/litnik-products.source.json");
  const raw = readFileSync(path, "utf8");
  const data = JSON.parse(raw) as SourceFile;

  await prisma.lead.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  const catMap = new Map<string, string>();
  for (const c of data.categories) {
    const row = await prisma.category.create({
      data: {
        slug: c.slug,
        name: c.name,
        sortOrder: c.sortOrder,
        shortDescription: c.shortDescription,
      },
    });
    catMap.set(c.slug, row.id);
  }

  const priceNote = data.meta.defaults.priceNote;

  for (const p of data.products) {
    const categoryId = catMap.get(p.categorySlug);
    if (!categoryId) throw new Error(`Unknown category ${p.categorySlug}`);

    const parts = [p.application, p.features, p.compositionText].filter(Boolean);
    const fullDescription = parts.join("\n\n");

    await prisma.product.create({
      data: {
        slug: p.slug,
        title: p.title,
        alloyMark: p.alloyMark,
        categoryId,
        shortDescription: p.shortDescription,
        fullDescription,
        application: p.application ?? null,
        features: p.features ?? null,
        compositionText: p.compositionText ?? null,
        gostReference: p.gostReference ?? null,
        colorType: p.colorType ?? null,
        meltingRange: p.meltingRange ?? null,
        pricePerKg: p.pricePerKgRub != null ? p.pricePerKgRub : null,
        priceNote,
        priceDisplayOverride:
          p.pricePerKgRub == null ? p.priceDisplay ?? "??????????" : null,
        image: null,
        status: "ACTIVE",
        sortOrder: p.sortOrder,
        seoTitle: `${p.title} | ЛИТНИК`,
        seoDescription: p.shortDescription,
        seoH1: p.title,
        internalAnalogLabel: p.internalAnalogLabel ?? null,
        internalThirdPartyDocUrl: p.internalThirdPartyDocUrl ?? null,
        specs: {
          create: p.specs.map((s, i) => ({
            parameter: s.parameter,
            value: s.value,
            sortOrder: i,
          })),
        },
      },
    });
  }

  const email = process.env.ADMIN_EMAIL ?? "admin@litnik.local";
  const password = process.env.ADMIN_PASSWORD ?? "LitnikAdmin2026";
  const hash = await bcrypt.hash(password, 12);
  await prisma.adminUser.create({
    data: { email, passwordHash: hash },
  });

  console.log("Seed OK. Admin:", email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
