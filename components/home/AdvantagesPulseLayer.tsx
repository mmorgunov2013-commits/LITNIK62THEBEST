"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

const CYCLE_MS = 5000;

function pulseBackground(intensity: number): CSSProperties {
  const k = intensity / 0.17;
  return {
    background: `
      radial-gradient(circle at center,
        rgba(201, 169, 98, ${0.22 * k}) 0%,
        rgba(201, 169, 98, ${0.08 * k}) 32%,
        transparent 58%),
      radial-gradient(circle at center,
        transparent 44%,
        rgba(201, 169, 98, ${0.45 * k}) 48.5%,
        rgba(201, 169, 98, ${0.72 * k}) 50%,
        rgba(201, 169, 98, ${0.45 * k}) 51.5%,
        transparent 56%)
    `,
    boxShadow: `0 0 48px 0 rgba(201, 169, 98, ${0.2 * k})`,
  };
}

function Wave({
  intensity,
  delayMs,
}: {
  intensity: number;
  delayMs: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.visibility = "hidden";
      return;
    }
    if (typeof el.animate !== "function") {
      return;
    }

    const anim = el.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
        {
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 1,
          offset: 0.06,
        },
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 0,
          offset: 0.7,
        },
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 0,
          offset: 1,
        },
      ],
      {
        duration: CYCLE_MS,
        iterations: Infinity,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        delay: delayMs,
      }
    );

    return () => anim.cancel();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 aspect-square h-[min(200vmax,120rem)] w-[min(200vmax,120rem)] max-w-none rounded-full will-change-transform"
      style={{
        ...pulseBackground(intensity),
        transform: "translate(-50%, -50%) scale(0)",
        opacity: 0,
      }}
    />
  );
}

export function AdvantagesPulseLayer({ intensity }: { intensity: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[9999] overflow-hidden rounded-xl"
      aria-hidden
    >
      <Wave intensity={intensity} delayMs={0} />
      <Wave intensity={intensity} delayMs={CYCLE_MS / 2} />
    </div>
  );
}
