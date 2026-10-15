import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/siteData";
import Viewer from "./Viewer";
import { Close, Moon, Sun } from "./Icons";

const curtains = products.filter((p) => p.kind);

/** Full-screen 3D preview, opened from a curtain product's "View in 3D" button. */
export default function ViewerModal({
  productId,
  colorIndex = 0,
  onSelect,
  onClose,
}) {
  const product = curtains.find((p) => p.id === productId) || curtains[0];
  const [openness, setOpenness] = useState(0);
  const [day, setDay] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const closeRef = useRef(null);
  const color = product.colors[0];

  // freeze the page behind while open
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-stretch justify-center p-0 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`3D preview of ${product.name}`}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[100dvh] w-full max-w-[1500px] flex-col overflow-hidden bg-ink text-cream shadow-2xl sm:h-[94svh] sm:rounded-[1.5rem] lg:flex-row"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close 3D preview"
          className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-cream/10 backdrop-blur transition hover:bg-cream hover:text-ink"
        >
          <Close />
        </button>

        {/* 3D scene: fixed half — never scrolls */}
        <div className="h-[46dvh] w-full shrink-0 min-h-0 lg:h-full lg:w-1/2">
          <Viewer
            product={product}
            color={color.hex}
            openness={openness}
            day={day}
            zoom={zoom}
            resetKey={resetKey}
          />
        </div>

        {/* controls: the other half — scrolls independently when tall */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6"
        >
          <div className="space-y-6">
            <div>
              <p className="eyebrow">3D preview</p>
              <h3 className="mt-2 text-3xl">{product.name}</h3>
            </div>

            <fieldset>
              <legend className="text-xs font-medium uppercase tracking-[0.18em] text-cream/50">
                Curtain
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {curtains.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={p.id === product.id}
                    onClick={() => {
                      onSelect(p.id, 0);
                      setZoom(false);
                    }}
                    className={`rounded-full px-4 py-2 text-xs transition ${
                      p.id === product.id
                        ? "bg-cream text-ink"
                        : "bg-white/10 text-cream/80 hover:bg-white/20"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-medium uppercase tracking-[0.18em] text-cream/50">
                Open curtains
              </legend>
              <input
                type="range"
                min="0"
                max="100"
                value={openness * 100}
                aria-label="Open curtains"
                onChange={(e) => setOpenness(e.target.value / 100)}
                className="mt-3 w-full accent-[#b08d57]"
              />
            </fieldset>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setDay((d) => !d)}
                className="btn btn-ghost-light !px-5 !py-2.5 !text-xs"
              >
                {day ? (
                  <Moon width={15} height={15} />
                ) : (
                  <Sun width={15} height={15} />
                )}{" "}
                {day ? "Evening" : "Daylight"}
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                className="btn btn-ghost-light !px-5 !py-2.5 !text-xs"
              >
                {zoom ? "Zoom out" : "Zoom into the weave"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenness(0);
                  setZoom(false);
                  setDay(true);
                  setResetKey((k) => k + 1);
                }}
                className="btn btn-ghost-light !px-5 !py-2.5 !text-xs"
              >
                Reset view
              </button>
            </div>

            <p className="text-xs leading-relaxed text-cream/50">
              Drag to rotate, scroll to zoom. The woven surface is generated in
              code — zoom in to see the threads.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
