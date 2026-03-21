"use client";

import "./globals.css";

/**
 * Корневой error boundary (свой html/body). Стабилизирует prerender /_global-error при сборке.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#0a0b0d] p-8 text-[var(--text)]">
        <h1 className="text-xl font-semibold">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {error.message || "Ошибка приложения"}
        </p>
        <button
          type="button"
          className="mt-6 rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--accent)]/50"
          onClick={() => reset()}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
