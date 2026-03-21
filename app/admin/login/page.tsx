"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/actions/auth";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-[#1a1510] disabled:opacity-60"
    >
      {pending ? "Вход…" : "Войти"}
    </button>
  );
}

const initial: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[var(--surface)] p-8">
        <h1 className="text-center text-xl font-semibold text-[var(--text)]">
          Вход в админку
        </h1>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">
          ЛИТНИК
        </p>
        <form action={formAction} className="mt-8 space-y-4">
          {state.error ? (
            <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {state.error}
            </p>
          ) : null}
          <div>
            <label className="text-xs text-[var(--muted)]">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--muted)]">Пароль</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-[var(--surface2)] px-3 py-2 text-sm"
            />
          </div>
          <Submit />
        </form>
      </div>
    </div>
  );
}
