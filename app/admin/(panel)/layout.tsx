import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-[var(--bg)]">
      <div className="border-b border-white/[0.08] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/admin/dashboard"
              className="font-semibold text-[var(--text)]"
            >
              Админка
            </Link>
            <Link
              href="/admin/products"
              className="text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Товары
            </Link>
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--accent)]">
              На сайт
            </Link>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-[var(--muted)] hover:text-[var(--text)]"
            >
              Выйти
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
