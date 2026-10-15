import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Drag-to-compare image slider.
 * - Static styling: Tailwind utilities + the .ba-img rule in index.css.
 * - Dynamic values (clip position, handle position): inline style — they
 *   change every frame while dragging, which no class can express.
 * - On first scroll into view the handle sweeps left → right, then settles.
 * - Each label fades out when the other side fully covers the frame.
 */
export default function BeforeAfter({
  before,
  after,
  alt = "",
  filterBefore = true,
  beforePos = "center",
  afterPos = "center",
}) {
  const ref = useRef(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(8);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const POSITIONS = {
    center: "object-center",
    "center 20%": "object-[center_20%]",
    "center 30%": "object-[center_30%]",
    "center 45%": "object-[center_45%]",
    "center 60%": "object-[center_60%]",
    "left center": "object-left",
    "right center": "object-right",
  };
  const beforePosition = POSITIONS[beforePos] || POSITIONS.center;
  const afterPosition = POSITIONS[afterPos] || POSITIONS.center;

  // demo sweep: left to right once, then settle at 50
  useEffect(() => {
    if (!inView) return;
    const sweep = animate(8, 92, {
      duration: 1.5,
      ease: [0.45, 0, 0.25, 1],
      onUpdate: setPos,
      onComplete: () =>
        animate(92, 50, { duration: 0.7, ease: "easeOut", onUpdate: setPos }),
    });
    return () => sweep.stop();
  }, [inView]);

  const update = useCallback((clientX) => {
    const r = ref.current.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-3xl bg-sand"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* after (base layer) */}
      <img
        src={after}
        alt={alt}
        draggable={false}
        className={`ba-img ${afterPosition}`}
      />

      {/* before — clipped by the wrapper's dynamic clipPath */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt=""
          draggable={false}
          className={`ba-img ${beforePosition} ${
            filterBefore ? "saturate-[0.35] brightness-[1.12]" : ""
          }`}
        />
      </div>

      {/* handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,.5)]" />
        <button
          type="button"
          role="slider"
          aria-label="Reveal before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
          }}
          className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-ink shadow-xl ring-1 ring-ink/10 transition hover:scale-105"
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 1L1 6l4 5M13 1l4 5-4 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* labels — each fades out when the other side fully covers the frame */}
      <span
        aria-hidden={pos < 12}
        className={`absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cream backdrop-blur transition-opacity duration-300 ${
          pos < 12 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        Before
      </span>
      <span
        aria-hidden={pos > 88}
        className={`absolute right-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cream backdrop-blur transition-opacity duration-300 ${
          pos > 88 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        After
      </span>
    </div>
  );
}
