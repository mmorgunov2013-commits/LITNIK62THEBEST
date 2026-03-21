"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadState } from "@/app/actions/leads";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 min-w-[160px] items-center justify-center rounded-lg bg-[var(--accent)] px-6 text-sm font-medium text-[#1a1510] transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Отправка…" : label}
    </button>
  );
}

const initial: LeadState = {};

export function LeadForm({
  productId,
  defaultAlloy,
  source,
  submitLabel = "Отправить заявку",
}: {
  productId?: string;
  defaultAlloy?: string;
  source?: string;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        Заявка отправлена. Мы свяжемся с вами.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="productId" value={productId ?? ""} />
      <input type="hidden" name="source" value={source ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)]">
            Имя *
          </label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] outline-none ring-[var(--accent)]/0 transition focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--muted)]">
            Телефон *
          </label>
          <input
            name="phone"
            required
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)]">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--muted)]">
            Интересующий сплав / марка
          </label>
          <input
            name="alloyInterest"
            defaultValue={defaultAlloy}
            className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Объём / задача
        </label>
        <input
          name="volume"
          className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Комментарий
        </label>
        <textarea
          name="comment"
          rows={4}
          className="mt-1 w-full rounded-lg border border-white/[0.1] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
        />
      </div>
      {state.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}
      <SubmitButton label={submitLabel} />
    </form>
  );
}
