import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { company } = siteConfig;
  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">ЛИТНИК</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              {siteConfig.heroHeadline}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Разделы
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/catalog"
                  className="text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  href="/informatsiya"
                  className="text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  Информация
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Реквизиты
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {company.legalName}
              <br />
              ИНН {company.inn}
              <br />
              КПП {company.kpp}
              <br />
              ОГРН {company.ogrn}
            </p>
          </div>
        </div>
        <p className="mt-12 text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} ЛИТНИК
        </p>
      </div>
    </footer>
  );
}
