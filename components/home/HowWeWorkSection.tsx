import {
  ClipboardPen,
  FlaskConical,
  Package,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

const STEPS: { text: string; icon: LucideIcon }[] = [
  {
    text: "Заявка и уточнение задачи",
    icon: ClipboardPen,
  },
  {
    text: "Согласование состава, фракции, объёма",
    icon: SlidersHorizontal,
  },
  {
    text: "Образец или тестовая партия",
    icon: FlaskConical,
  },
  {
    text: "Постоянные поставки по договорённости",
    icon: Package,
  },
];

export function HowWeWorkSection() {
  return (
    <section className="border-t border-white/[0.08] bg-[var(--surface)]/35 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[var(--surface)]/90 via-[var(--bg)]/80 to-[#0a0b0d] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_80px_-32px_rgba(0,0,0,0.65)] sm:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,169,98,0.12),transparent_68%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,169,98,0.06),transparent_70%)]"
            aria-hidden
          />

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              Процесс
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
              Как работаем
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
              Четыре шага от заявки до поставок — прозрачно и без лишней бюрократии.
            </p>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-4 lg:gap-5">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const n = String(i + 1).padStart(2, "0");
                return (
                  <li key={step.text} className="relative">
                    <div className="group relative flex h-full min-h-[10.5rem] flex-col rounded-xl border border-white/[0.1] bg-[var(--bg)]/55 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-[0_12px_48px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,169,98,0.12)] sm:min-h-[11rem] sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-3xl font-bold tabular-nums leading-none tracking-tight text-[var(--accent)] sm:text-[2rem]">
                          {n}
                        </span>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-[var(--surface2)]/90 text-[var(--accent)] shadow-sm transition-colors duration-300 group-hover:border-[var(--accent)]/25">
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </div>
                      </div>
                      <p className="mt-5 text-base font-medium leading-snug tracking-tight text-[var(--text)] sm:text-[1.05rem]">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
