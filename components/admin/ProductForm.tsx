"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Category, Product, ProductSpec } from "@prisma/client";
import { useMemo, useState } from "react";
import {
  createProduct,
  updateProduct,
  type ProductFormState,
} from "@/app/actions/admin-product";
import { siteConfig } from "@/lib/site";

function SubmitBar({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[#1a1510] disabled:opacity-60"
    >
      {pending ? "Сохранение…" : label}
    </button>
  );
}

type SpecRow = { parameter: string; value: string };

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product & { specs: ProductSpec[] };
}) {
  const initialSpecs: SpecRow[] = useMemo(
    () =>
      product?.specs?.length
        ? product.specs.map((s) => ({
            parameter: s.parameter,
            value: s.value,
          }))
        : [{ parameter: "", value: "" }],
    [product],
  );

  const [specs, setSpecs] = useState<SpecRow[]>(initialSpecs);
  const specsJson = JSON.stringify(specs);

  const action = product
    ? updateProduct.bind(null, product.id)
    : createProduct;

  const [state, formAction] = useActionState(action, {} as ProductFormState);

  function addRow() {
    setSpecs((s) => [...s, { parameter: "", value: "" }]);
  }

  function removeRow(i: number) {
    setSpecs((s) => s.filter((_, j) => j !== i));
  }

  function patchRow(i: number, field: keyof SpecRow, value: string) {
    setSpecs((rows) =>
      rows.map((row, j) => (j === i ? { ...row, [field]: value } : row)),
    );
  }

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <input type="hidden" name="specsJson" value={specsJson} />

      {state.error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">Название *</label>
          <input
            name="title"
            required
            defaultValue={product?.title}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Slug (латиница) *</label>
          <input
            name="slug"
            required
            defaultValue={product?.slug}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Марка *</label>
          <input
            name="alloyMark"
            required
            defaultValue={product?.alloyMark}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Категория *</label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Статус *</label>
          <select
            name="status"
            required
            defaultValue={product?.status ?? "ACTIVE"}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          >
            <option value="ACTIVE">Активен</option>
            <option value="DRAFT">Черновик</option>
            <option value="HIDDEN">Скрыт</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Порядок</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? 0}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Краткое описание *</label>
        <textarea
          name="shortDescription"
          required
          rows={3}
          defaultValue={product?.shortDescription}
          className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Полное описание</label>
        <textarea
          name="fullDescription"
          rows={4}
          defaultValue={product?.fullDescription ?? ""}
          className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">Применение</label>
          <textarea
            name="application"
            rows={3}
            defaultValue={product?.application ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">Особенности</label>
          <textarea
            name="features"
            rows={3}
            defaultValue={product?.features ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">Состав (текст)</label>
          <textarea
            name="compositionText"
            rows={2}
            defaultValue={product?.compositionText ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">
            Нормативная ориентировка (ГОСТ)
          </label>
          <textarea
            name="gostReference"
            rows={2}
            defaultValue={product?.gostReference ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Цвет / оттенок</label>
          <input
            name="colorType"
            defaultValue={product?.colorType ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">
            Температура плавления
          </label>
          <input
            name="meltingRange"
            defaultValue={product?.meltingRange ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-[var(--muted)]">
            Цена за кг (число, пусто = нет цены)
          </label>
          <input
            name="pricePerKg"
            defaultValue={
              product?.pricePerKg != null ? String(product.pricePerKg) : ""
            }
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">
            Подпись цены, если нет числа
          </label>
          <input
            name="priceDisplayOverride"
            defaultValue={product?.priceDisplayOverride ?? ""}
            placeholder="??????????"
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">Примечание к цене</label>
          <textarea
            name="priceNote"
            rows={2}
            defaultValue={product?.priceNote ?? siteConfig.defaultPriceNote}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-[var(--muted)]">SEO title</label>
          <input
            name="seoTitle"
            defaultValue={product?.seoTitle ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">SEO H1</label>
          <input
            name="seoH1"
            defaultValue={product?.seoH1 ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">SEO description</label>
          <textarea
            name="seoDescription"
            rows={2}
            defaultValue={product?.seoDescription ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">
            Внутр.: аналоги (не для витрины)
          </label>
          <input
            name="internalAnalogLabel"
            defaultValue={product?.internalAnalogLabel ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-[var(--muted)]">
            Внутр.: URL стороннего документа
          </label>
          <input
            name="internalThirdPartyDocUrl"
            defaultValue={product?.internalThirdPartyDocUrl ?? ""}
            className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">
          Галерея: URL изображений по одному на строку (порядок как на сайте;
          первое — превью в каталоге). Пути от корня сайта, например{" "}
          <code className="text-[var(--text)]">/images/products/...</code>
        </label>
        <textarea
          name="galleryImagesRaw"
          rows={5}
          defaultValue={product?.galleryImages?.join("\n") ?? ""}
          className="mt-1 w-full rounded border border-white/10 bg-[var(--surface2)] px-3 py-2 font-mono text-sm"
          placeholder="/images/products/..."
        />
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">
          Изображение (jpg/png/webp, до 5 МБ)
        </label>
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="mt-1 block w-full text-sm text-[var(--muted)]"
        />
        {product?.image ? (
          <label className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
            <input type="checkbox" name="removeImage" />
            Удалить текущее фото
          </label>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[var(--text)]">
            Таблица характеристик
          </h3>
          <button
            type="button"
            onClick={addRow}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            + строка
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {specs.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={row.parameter}
                onChange={(e) => patchRow(i, "parameter", e.target.value)}
                placeholder="Параметр"
                className="flex-1 rounded border border-white/10 bg-[var(--surface2)] px-2 py-1.5 text-sm"
              />
              <input
                value={row.value}
                onChange={(e) => patchRow(i, "value", e.target.value)}
                placeholder="Значение"
                className="flex-1 rounded border border-white/10 bg-[var(--surface2)] px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="px-2 text-sm text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <SubmitBar label={product ? "Сохранить" : "Создать"} />
    </form>
  );
}
