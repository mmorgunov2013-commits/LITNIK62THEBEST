import {
  Building2,
  Factory,
  FileCheck,
  FlaskConical,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AdvantagesPulseLayer } from "@/components/home/AdvantagesPulseLayer";

/** Насыщенность золотого следа/кольца (0–1), не номер карточки */
const PULSE_INTENSITY = 0.17;

const ADVANTAGES: { text: string; icon: LucideIcon }[] = [
  {
    text: "Собственное производство и контроль состава по партиям",
    icon: Factory,
  },
  {
    text: "Ориентация на мастерские и литейные участки",
    icon: Building2,
  },
  {
    text: "Пробные партии и подбор под вашу технологию",
    icon: FlaskConical,
  },
  {
    text: "Ориентир на требования ГОСТ; паспорта на номенклатуру — в планах",
    icon: FileCheck,
  },
];

export function AdvantagesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[var(--surface)]/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        <div className="relative z-10 px-5 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            Преимущества
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Работаем как с поставщиком сырья для производства: состав, формат,
            сопровождение внедрения.
          </p>
        </div>

        <div className="relative mx-4 mb-6 min-h-[min(100vw,28rem)] sm:mx-6 sm:mb-8 sm:min-h-[22rem] md:min-h-[20rem]">
          {/* Сначала сетка (ниже по z). Пульс был под z-10 и не был виден + backdrop-blur его гасил. */}
          <div className="relative z-10 grid h-full min-h-[inherit] grid-cols-2 divide-x divide-y divide-white/[0.12] rounded-xl border border-white/[0.12] bg-transparent">
            {ADVANTAGES.map((item, i) => {
              const Icon = item.icon;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={item.text}
                  className="relative flex flex-col gap-3 bg-[var(--surface)]/[0.08] p-4 sm:gap-4 sm:p-6 md:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-[var(--surface2)]/80 text-[var(--accent)] shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </div>
                    <span className="font-semibold tabular-nums tracking-tight text-[var(--accent)]">
                      {num}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <AdvantagesPulseLayer intensity={PULSE_INTENSITY} />

          {/* Звезда поверх колец */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-[10000] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-[var(--surface)] text-[var(--accent)] shadow-[0_0_0_6px_var(--bg),0_0_24px_-4px_rgba(201,169,98,0.35)] sm:h-14 sm:w-14"
            aria-hidden
          >
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
