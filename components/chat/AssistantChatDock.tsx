"use client";

import { Bot, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

export function AssistantChatDock() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex flex-col items-end p-4 sm:p-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {open ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[var(--surface)] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
                  <Bot className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p id={titleId} className="text-sm font-semibold text-[var(--text)]">
                    Помощник
                  </p>
                  <p className="text-xs text-[var(--muted)]">Пока демо</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--text)]"
                aria-label="Свернуть чат"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="max-h-[min(50vh,20rem)] space-y-3 overflow-y-auto px-4 py-4">
              <div className="rounded-xl rounded-bl-md border border-white/[0.08] bg-[var(--surface2)] px-3 py-2.5 text-sm leading-relaxed text-[var(--text)]">
                Здесь может быть ИИ консультант
              </div>
            </div>
            <div className="border-t border-white/[0.08] px-4 py-3">
              <label htmlFor={`${panelId}-input`} className="sr-only">
                Поле ввода (пока недоступно)
              </label>
              <textarea
                id={`${panelId}-input`}
                rows={2}
                disabled
                readOnly
                placeholder="Скоро здесь можно будет задать вопрос"
                className="w-full resize-none rounded-lg border border-white/[0.08] bg-[var(--bg)]/80 px-3 py-2 text-sm text-[var(--muted)] placeholder:text-[var(--muted)]/60"
              />
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-[var(--surface)] text-[var(--accent)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)] transition-[transform,box-shadow,color] hover:scale-[1.03] hover:border-[var(--accent)]/35 hover:shadow-[0_12px_40px_-10px_rgba(201,169,98,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[0.98]`}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? "Закрыть помощника" : "Открыть чат помощника"}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Bot className="h-6 w-6" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}
