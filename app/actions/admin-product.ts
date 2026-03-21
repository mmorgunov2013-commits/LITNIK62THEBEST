"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { productFormSchema } from "@/lib/validations";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

function parseSpecsJson(
  raw: string | null,
): { parameter: string; value: string; sortOrder: number }[] {
  if (!raw?.trim()) return [];
  try {
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(
        (x): x is { parameter: string; value: string } =>
          typeof x === "object" &&
          x !== null &&
          "parameter" in x &&
          "value" in x &&
          typeof (x as { parameter: unknown }).parameter === "string" &&
          typeof (x as { value: unknown }).value === "string",
      )
      .map((x, i) => ({
        parameter: x.parameter.slice(0, 500),
        value: x.value.slice(0, 2000),
        sortOrder: i,
      }));
  } catch {
    return [];
  }
}

async function saveUploadedImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > 5 * 1024 * 1024) throw new Error("Файл больше 5 МБ");
  const ext =
    file.name.split(".").pop()?.toLowerCase() === "png"
      ? "png"
      : file.name.split(".").pop()?.toLowerCase() === "webp"
        ? "webp"
        : "jpg";
  const name = `${randomUUID()}.${ext}`;
  const dir = join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), buf);
  return `/uploads/products/${name}`;
}

export type ProductFormState = { error?: string };

export async function createProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const specs = parseSpecsJson(formData.get("specsJson")?.toString() ?? "[]");
  const priceRaw = formData.get("pricePerKg")?.toString().trim();
  const parsed = productFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    alloyMark: formData.get("alloyMark"),
    categoryId: formData.get("categoryId"),
    shortDescription: formData.get("shortDescription"),
    fullDescription: formData.get("fullDescription")?.toString() || undefined,
    application: formData.get("application")?.toString() || undefined,
    features: formData.get("features")?.toString() || undefined,
    compositionText: formData.get("compositionText")?.toString() || undefined,
    gostReference: formData.get("gostReference")?.toString() || undefined,
    colorType: formData.get("colorType")?.toString() || undefined,
    meltingRange: formData.get("meltingRange")?.toString() || undefined,
    pricePerKg: priceRaw,
    priceNote: formData.get("priceNote")?.toString() || undefined,
    priceDisplayOverride:
      formData.get("priceDisplayOverride")?.toString() || undefined,
    status: formData.get("status"),
    sortOrder: formData.get("sortOrder"),
    seoTitle: formData.get("seoTitle")?.toString() || undefined,
    seoDescription: formData.get("seoDescription")?.toString() || undefined,
    seoH1: formData.get("seoH1")?.toString() || undefined,
    internalAnalogLabel:
      formData.get("internalAnalogLabel")?.toString() || undefined,
    internalThirdPartyDocUrl:
      formData.get("internalThirdPartyDocUrl")?.toString() || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().formErrors.join("; ") };
  }
  const file = formData.get("image") as File | null;
  let imagePath: string | null = null;
  try {
    imagePath = await saveUploadedImage(file);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Ошибка загрузки файла" };
  }

  const priceNum =
    parsed.data.pricePerKg?.trim() !== ""
      ? Number(parsed.data.pricePerKg?.replace(",", "."))
      : undefined;
  const pricePerKg =
    priceNum !== undefined && !Number.isNaN(priceNum) ? priceNum : null;

  try {
    await prisma.product.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        alloyMark: parsed.data.alloyMark,
        categoryId: parsed.data.categoryId,
        shortDescription: parsed.data.shortDescription,
        fullDescription: parsed.data.fullDescription ?? null,
        application: parsed.data.application ?? null,
        features: parsed.data.features ?? null,
        compositionText: parsed.data.compositionText ?? null,
        gostReference: parsed.data.gostReference ?? null,
        colorType: parsed.data.colorType ?? null,
        meltingRange: parsed.data.meltingRange ?? null,
        pricePerKg,
        priceNote: parsed.data.priceNote ?? null,
        priceDisplayOverride: parsed.data.priceDisplayOverride ?? null,
        image: imagePath,
        status: parsed.data.status,
        sortOrder: parsed.data.sortOrder,
        seoTitle: parsed.data.seoTitle ?? null,
        seoDescription: parsed.data.seoDescription ?? null,
        seoH1: parsed.data.seoH1 ?? null,
        internalAnalogLabel: parsed.data.internalAnalogLabel ?? null,
        internalThirdPartyDocUrl:
          parsed.data.internalThirdPartyDocUrl?.trim() || null,
        specs: {
          create: specs.map((s) => ({
            parameter: s.parameter,
            value: s.value,
            sortOrder: s.sortOrder,
          })),
        },
      },
    });
  } catch {
    return { error: "Не удалось создать товар (возможно, slug уже занят)" };
  }
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const specs = parseSpecsJson(formData.get("specsJson")?.toString() ?? "[]");
  const priceRaw = formData.get("pricePerKg")?.toString().trim();
  const parsed = productFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    alloyMark: formData.get("alloyMark"),
    categoryId: formData.get("categoryId"),
    shortDescription: formData.get("shortDescription"),
    fullDescription: formData.get("fullDescription")?.toString() || undefined,
    application: formData.get("application")?.toString() || undefined,
    features: formData.get("features")?.toString() || undefined,
    compositionText: formData.get("compositionText")?.toString() || undefined,
    gostReference: formData.get("gostReference")?.toString() || undefined,
    colorType: formData.get("colorType")?.toString() || undefined,
    meltingRange: formData.get("meltingRange")?.toString() || undefined,
    pricePerKg: priceRaw,
    priceNote: formData.get("priceNote")?.toString() || undefined,
    priceDisplayOverride:
      formData.get("priceDisplayOverride")?.toString() || undefined,
    status: formData.get("status"),
    sortOrder: formData.get("sortOrder"),
    seoTitle: formData.get("seoTitle")?.toString() || undefined,
    seoDescription: formData.get("seoDescription")?.toString() || undefined,
    seoH1: formData.get("seoH1")?.toString() || undefined,
    internalAnalogLabel:
      formData.get("internalAnalogLabel")?.toString() || undefined,
    internalThirdPartyDocUrl:
      formData.get("internalThirdPartyDocUrl")?.toString() || undefined,
  });
  if (!parsed.success) {
    return {
      error:
        parsed.error.flatten().formErrors.join("; ") ||
        "Проверьте поля формы",
    };
  }
  const file = formData.get("image") as File | null;
  let imagePath: string | null | undefined = undefined;
  try {
    const uploaded = await saveUploadedImage(file);
    if (uploaded) imagePath = uploaded;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Ошибка загрузки файла" };
  }

  const priceNum =
    parsed.data.pricePerKg?.trim() !== ""
      ? Number(parsed.data.pricePerKg?.replace(",", "."))
      : undefined;
  const pricePerKg =
    priceNum !== undefined && !Number.isNaN(priceNum) ? priceNum : null;

  const removeImage = formData.get("removeImage") === "on";

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        alloyMark: parsed.data.alloyMark,
        categoryId: parsed.data.categoryId,
        shortDescription: parsed.data.shortDescription,
        fullDescription: parsed.data.fullDescription ?? null,
        application: parsed.data.application ?? null,
        features: parsed.data.features ?? null,
        compositionText: parsed.data.compositionText ?? null,
        gostReference: parsed.data.gostReference ?? null,
        colorType: parsed.data.colorType ?? null,
        meltingRange: parsed.data.meltingRange ?? null,
        pricePerKg,
        priceNote: parsed.data.priceNote ?? null,
        priceDisplayOverride: parsed.data.priceDisplayOverride ?? null,
        ...(removeImage ? { image: null } : imagePath ? { image: imagePath } : {}),
        status: parsed.data.status,
        sortOrder: parsed.data.sortOrder,
        seoTitle: parsed.data.seoTitle ?? null,
        seoDescription: parsed.data.seoDescription ?? null,
        seoH1: parsed.data.seoH1 ?? null,
        internalAnalogLabel: parsed.data.internalAnalogLabel ?? null,
        internalThirdPartyDocUrl:
          parsed.data.internalThirdPartyDocUrl?.trim() || null,
        specs: {
          deleteMany: {},
          create: specs.map((s) => ({
            parameter: s.parameter,
            value: s.value,
            sortOrder: s.sortOrder,
          })),
        },
      },
    });
  } catch {
    return { error: "Не удалось сохранить (проверьте slug и данные)" };
  }
  revalidatePath("/catalog");
  revalidatePath(`/product/${parsed.data.slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/catalog");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
