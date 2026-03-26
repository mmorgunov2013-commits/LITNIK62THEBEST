"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  productTitle: string;
};

export function ProductGallery({ images, productTitle }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const open = useCallback((index: number) => setLightbox(index), []);
  const close = useCallback(() => setLightbox(null), []);

  const go = useCallback(
    (delta: number) => {
      setLightbox((i) => {
        if (i === null || images.length === 0) return null;
        const n = images.length;
        return ((i + delta) % n + n) % n;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, go]);

  if (images.length === 0) return null;

  const main = images[0];

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => open(0)}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--surface2)] ring-1 ring-inset ring-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        aria-label={`Открыть фото 1: ${productTitle}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={main}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
      </button>

      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.slice(1).map((src, i) => {
            const indexInGallery = i + 1;
            const photoNumber = i + 2;
            return (
              <button
                key={`${indexInGallery}-${src}`}
                type="button"
                onClick={() => open(indexInGallery)}
                className="relative aspect-square overflow-hidden rounded-lg bg-[var(--surface2)] ring-1 ring-inset ring-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label={`Фото ${photoNumber} из ${images.length}, увеличить`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}

      {lightbox !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-3 top-3 z-20 rounded-lg p-2 text-white/90 hover:bg-white/10 hover:text-white"
            aria-label="Закрыть"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 sm:left-4"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 sm:right-4"
                aria-label="Следующее фото"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          ) : null}

          <div
            className="relative z-10 mx-auto max-h-[min(90vh,100%)] max-w-[min(96vw,1200px)] touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              touchStartX.current = null;
              if (start === null || images.length < 2) return;
              const end = e.changedTouches[0]?.clientX ?? start;
              const dx = end - start;
              if (dx > 56) go(-1);
              else if (dx < -56) go(1);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightbox]}
              alt=""
              className="max-h-[min(90vh,100%)] max-w-full object-contain"
            />
          </div>

          <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white/90">
            {lightbox + 1} / {images.length} · Esc
          </p>
        </div>
      ) : null}
    </div>
  );
}
