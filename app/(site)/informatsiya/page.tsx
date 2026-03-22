import type { Metadata } from "next";
import { FloatingPolygonIngots } from "@/components/informatsiya/FloatingPolygonIngots";

export const metadata: Metadata = {
  title: "Информация",
  description:
    "Материалы о цветных сплавах, гранулах и литье для ювелирных мастерских — раздел в подготовке.",
};

export default function InformatsiyaPage() {
  return (
    <div className="relative min-h-[min(100vh,56rem)] overflow-hidden">
      <FloatingPolygonIngots />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-2xl border border-white/[0.06] bg-[var(--bg)]/55 px-4 py-10 backdrop-blur-[2px] sm:px-8">
          <p className="text-center text-6xl leading-none sm:text-7xl" aria-hidden>
            😊
          </p>
          <h1 className="mt-8 text-center text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            Чуть позже
          </h1>
          <div className="mt-8 space-y-5 text-center text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            <p>
              Здесь появятся полезные материалы о цветных сплавах и гранулах для
              ювелирных мастерских и художественного литья: как ориентироваться
              в марках, что учитывать при подборе состава под задачу, нюансы
              плавки и формата, работа с партиями и образцами.
            </p>
            <p>
              Отдельно планируем разбирать практические вопросы — от подготовки
              металла до внедрения в производство: без «магических» обещаний, в
              духе открытого B2B-диалога.
            </p>
          </div>
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            Редактор и лента статей подключим позже — следите за обновлениями.
          </p>
        </div>
      </div>
    </div>
  );
}
