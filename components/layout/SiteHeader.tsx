import Link from "next/link";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/informatsiya", label: "Информация" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--text)]"
        >
          ЛИТНИК
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm sm:gap-x-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
