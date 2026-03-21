"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { metalShimmerForSlug } from "@/lib/category-shimmer";

export type CategoryCardItem = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
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
}: {
  categories: CategoryCardItem[];
  /** PNG/WebP без фона — напоминание под кнопками категорий, не внутри них */
  accentImageSrc?: string | null;
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

  return (
    <>
      <h2 className="text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
        Категории
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const { beam, glow } = metalShimmerForSlug(c.slug);
          const isHovered = hoveredId === c.id;
          const isPeriodic = shimmeringIds.has(c.id);
          const active = isHovered || isPeriodic;
          const showShimmerOverlay = active && !prefersReducedMotion;
          return (
            <li key={c.id}>
              <Link
                href={`/catalog/${c.slug}`}
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
              </Link>
            </li>
          );
        })}
      </ul>
      {accentImageSrc ? <HeroCategoryAccent src={accentImageSrc} /> : null}
    </>
  );
}
