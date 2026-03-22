/**
 * Декоративный фон: полигональные «слитки» с лёгким свечением.
 * Уважает prefers-reduced-motion (см. globals.css).
 */
export function FloatingPolygonIngots() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="lit-ingot-noise absolute inset-0 opacity-[0.35]" />

      {INGOTS.map((ingot, i) => (
        <div
          key={i}
          className={`lit-ingot absolute ${ingot.driftClass} ${ingot.glowClass}`}
          style={{
            left: ingot.left,
            top: ingot.top,
            width: ingot.w,
            height: ingot.h,
            clipPath: ingot.clipPath,
            background: ingot.bg,
            animationDelay: ingot.delay,
            opacity: ingot.opacity,
          }}
        />
      ))}
    </div>
  );
}

const INGOTS = [
  {
    clipPath: "polygon(12% 0%, 88% 4%, 100% 42%, 78% 100%, 22% 96%, 0% 38%)",
    bg: "linear-gradient(145deg, #e2e8f0 0%, #64748b 45%, #475569 100%)",
    left: "6%",
    top: "8%",
    w: "4.5rem",
    h: "5.5rem",
    opacity: 0.72,
    delay: "0s",
    driftClass: "lit-ingot-drift-1",
    glowClass: "lit-ingot-glow-silver",
  },
  {
    clipPath: "polygon(0% 18%, 22% 0%, 100% 12%, 94% 88%, 48% 100%, 6% 82%)",
    bg: "linear-gradient(160deg, #f0d78c 0%, #c9a962 40%, #8a7038 100%)",
    left: "72%",
    top: "4%",
    w: "5rem",
    h: "4.25rem",
    opacity: 0.78,
    delay: "-3s",
    driftClass: "lit-ingot-drift-2",
    glowClass: "lit-ingot-glow-gold",
  },
  {
    clipPath: "polygon(8% 8%, 92% 0%, 100% 72%, 70% 100%, 0% 90%)",
    bg: "linear-gradient(135deg, #d4a574 0%, #b87355 50%, #7c4a3a 100%)",
    left: "14%",
    top: "58%",
    w: "4.75rem",
    h: "5rem",
    opacity: 0.7,
    delay: "-7s",
    driftClass: "lit-ingot-drift-3",
    glowClass: "lit-ingot-glow-copper",
  },
  {
    clipPath: "polygon(15% 0%, 85% 10%, 100% 55%, 62% 100%, 0% 78%)",
    bg: "linear-gradient(125deg, #fca5a5 0%, #b45348 48%, #7f1d1d 100%)",
    left: "78%",
    top: "48%",
    w: "4.25rem",
    h: "5.75rem",
    opacity: 0.65,
    delay: "-11s",
    driftClass: "lit-ingot-drift-4",
    glowClass: "lit-ingot-glow-red",
  },
  {
    clipPath: "polygon(0% 30%, 35% 0%, 100% 22%, 88% 100%, 18% 94%)",
    bg: "linear-gradient(175deg, #d6b896 0%, #a67c52 55%, #5c3d2e 100%)",
    left: "42%",
    top: "12%",
    w: "3.75rem",
    h: "4.5rem",
    opacity: 0.68,
    delay: "-2s",
    driftClass: "lit-ingot-drift-2",
    glowClass: "lit-ingot-glow-bronze",
  },
  {
    clipPath: "polygon(20% 6%, 100% 0%, 92% 92%, 48% 100%, 0% 62%)",
    bg: "linear-gradient(190deg, #fde68a 0%, #ca8a04 45%, #713f12 100%)",
    left: "52%",
    top: "62%",
    w: "5.25rem",
    h: "4rem",
    opacity: 0.74,
    delay: "-9s",
    driftClass: "lit-ingot-drift-1",
    glowClass: "lit-ingot-glow-brass",
  },
  {
    clipPath: "polygon(5% 0%, 95% 8%, 100% 85%, 40% 100%, 0% 70%)",
    bg: "linear-gradient(120deg, #cbd5e1 0%, #64748b 100%)",
    left: "2%",
    top: "38%",
    w: "3.5rem",
    h: "5rem",
    opacity: 0.55,
    delay: "-5s",
    driftClass: "lit-ingot-drift-3",
    glowClass: "lit-ingot-glow-silver",
  },
  {
    clipPath: "polygon(0% 12%, 78% 0%, 100% 48%, 82% 100%, 10% 88%)",
    bg: "linear-gradient(155deg, #eab308 0%, #a16207 100%)",
    left: "88%",
    top: "72%",
    w: "4rem",
    h: "4.5rem",
    opacity: 0.58,
    delay: "-14s",
    driftClass: "lit-ingot-drift-4",
    glowClass: "lit-ingot-glow-gold",
  },
] as const;
