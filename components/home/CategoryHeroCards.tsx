"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { metalShimmerForSlug } from "@/lib/category-shimmer";

export type CategoryCardItem = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  /** Если задан — ведёт сюда вместо `/catalog/[slug]` */
  href?: string;
};

const SHIMMER_MS = 1400;
const MIN_GAP_MS = 10_000;
const MAX_GAP_MS = 15_000;

function randomDelayMs() {
  return MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS);
}

function HeroCategoryAccent({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <div className="mt-7 flex justify-center sm:mt-8" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="pointer-events-none h-auto max-h-[min(12rem,30vh)] w-auto max-w-[min(36rem,94vw)] -translate-x-1 rotate-[-1deg] select-none object-contain object-bottom opacity-[0.82] sm:translate-x-1 sm:rotate-[-0.5deg]"
        loading="lazy"
        decoding="async"
        onError={() => setOk(false)}
      />
    </div>
  );
}

export function CategoryHeroCards({
  categories,
  accentImageSrc,
  heading,
  photoPlaceholders = false,
}: {
  categories: CategoryCardItem[];
  /** PNG/WebP без фона — напоминание под кнопками категорий, не внутри них */
  accentImageSrc?: string | null;
  /**
   * Заголовок над сеткой. По умолчанию — «Категории».
   * Передайте `null`, если заголовок задаётся снаружи (например H1 на /catalog).
   */
  heading?: string | null;
  /** Заглушки «фотофотофото» над кнопкой (лендинг /catalog) */
  photoPlaceholders?: boolean;
}) {
  const [shimmeringIds, setShimmeringIds] = useState<Set<string>>(() => new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cancelled = { v: false };
    timersRef.current = [];

    const push = (id: ReturnType<typeof setTimeout>) => {
      timersRef.current.push(id);
    };

    categories.forEach((cat) => {
      const schedule = () => {
        const tid = setTimeout(() => {
          if (cancelled.v) {
            return;
          }
          if (hoveredIdRef.current === cat.id) {
            schedule();
            return;
          }
          setShimmeringIds((prev) => new Set(prev).add(cat.id));
          const off = setTimeout(() => {
            if (cancelled.v) return;
            setShimmeringIds((prev) => {
              const next = new Set(prev);
              next.delete(cat.id);
              return next;
            });
          }, SHIMMER_MS);
          push(off);
          schedule();
        }, randomDelayMs());
        push(tid);
      };
      schedule();
    });

    return () => {
      cancelled.v = true;
      timersRef.current.forEach(clearTimeout);
    };
  }, [categories]);

  const gridClass = photoPlaceholders
    ? "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-stretch"
    : categories.length >= 5
      ? "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      : "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

  const headingText = heading === undefined ? "Категории" : heading ?? "";
  const showHeading = heading !== null;

  return (
    <>
      {showHeading ? (
        <h2 className="text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
          {headingText}
        </h2>
      ) : null}
      <ul className={gridClass}>
        {categories.map((c, index) => {
          const cardHref = c.href ?? `/catalog/${c.slug}`;
          const { beam, glow } = metalShimmerForSlug(c.slug);
          const isHovered = hoveredId === c.id;
          const isPeriodic = shimmeringIds.has(c.id);
          const active = isHovered || isPeriodic;
          const showShimmerOverlay = active && !prefersReducedMotion;
          const linkBody = (
            <>
              {showShimmerOverlay ? (
                <span
                  className={`pointer-events-none absolute inset-0 z-10 ${
                    isHovered
                      ? "animate-lit-category-shimmer-loop"
                      : "animate-lit-category-shimmer"
                  }`}
                  style={{
                    background: `linear-gradient(105deg, transparent 0%, ${beam} 48%, transparent 72%)`,
                  }}
                  aria-hidden
                />
              ) : null}
              <span className="relative z-[1] font-medium text-[var(--text)]">
                {c.name}
              </span>
              {c.shortDescription ? (
                <p className="relative z-[1] mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {c.shortDescription}
                </p>
              ) : null}
            </>
          );
          return (
            <li
              key={c.id}
              className={
                photoPlaceholders
                  ? "flex min-h-0 flex-col lg:min-h-[min(22rem,42vh)]"
                  : undefined
              }
            >
              {photoPlaceholders ? (
                <>
                  <div
                    className="animate-lit-catalog-placeholder-rise relative z-20 -mb-3 flex aspect-[4/3] w-full flex-col items-center justify-center rounded-t-xl border border-b-0 border-white/[0.12] bg-gradient-to-b from-[#1c1f26]/95 to-[#14161a]/90 px-2 text-center shadow-[0_-8px_28px_-12px_rgba(0,0,0,0.85)] backdrop-blur-[4px] sm:-mb-4"
                    style={{ animationDelay: `${80 + index * 70}ms` }}
                    aria-hidden
                  >
                    <span className="select-none text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
                      фотофотофото
                    </span>
                  </div>
                  <Link
                    href={cardHref}
                    className={`relative mt-auto block flex-1 overflow-hidden rounded-b-xl rounded-t-none border border-white/[0.1] border-t-white/[0.06] bg-[#14161a]/80 p-5 pb-5 backdrop-blur-[6px] transition-[box-shadow,border-color] duration-300 hover:border-[var(--accent)]/35 ${
                      active ? "border-white/20" : ""
                    }`}
                    style={
                      active
                        ? {
                            boxShadow: `0 0 36px -6px ${glow}, inset 0 0 0 1px ${glow}`,
                          }
                        : undefined
                    }
                    onMouseEnter={() => {
                      hoveredIdRef.current = c.id;
                      setHoveredId(c.id);
                    }}
                    onMouseLeave={() => {
                      hoveredIdRef.current = null;
                      setHoveredId(null);
                    }}
                  >
                    {linkBody}
                  </Link>
                </>
              ) : (
                <Link
                  href={cardHref}
                  className={`relative block overflow-hidden rounded-xl border border-white/[0.1] bg-[#14161a]/75 p-5 backdrop-blur-[6px] transition-[box-shadow,border-color] duration-300 hover:border-[var(--accent)]/35 ${
                    active ? "border-white/20" : ""
                  }`}
                  style={
                    active
                      ? {
                          boxShadow: `0 0 36px -6px ${glow}, inset 0 0 0 1px ${glow}`,
                        }
                      : undefined
                  }
                  onMouseEnter={() => {
                    hoveredIdRef.current = c.id;
                    setHoveredId(c.id);
                  }}
                  onMouseLeave={() => {
                    hoveredIdRef.current = null;
                    setHoveredId(null);
                  }}
                >
                  {linkBody}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {accentImageSrc ? <HeroCategoryAccent src={accentImageSrc} /> : null}
    </>
  );
}
