import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--text)]">Панель</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Управление каталогом и заявками (заявки — в базе, просмотр через Prisma
        Studio или позже в админке).
      </p>
      <ul className="mt-8 space-y-3 text-sm">
        <li>
          <Link
            href="/admin/products"
            className="text-[var(--accent)] hover:underline"
          >
            Товары — список, создание, редактирование
          </Link>
        </li>
        <li>
          <Link href="/catalog" className="text-[var(--accent)] hover:underline">
            Открыть витрину каталога
          </Link>
        </li>
      </ul>
    </div>
  );
}
