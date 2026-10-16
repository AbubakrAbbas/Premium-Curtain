import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProductImage from "./ProductImage";
import { Check, Close, Cube } from "./Icons";

/** Product details popup: photo + details scroll together as one card. */
export default function ProductModal({ product, onClose, onQuote, onView3D }) {
  const closeRef = useRef(null);
  const color = product.colors[0];

  // freeze the page behind while open (data-lenis-prevent keeps the card's own wheel scroll working)
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
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent
        className="relative grid max-h-[94svh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem] md:grid-cols-2"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-cream/90 shadow backdrop-blur transition hover:bg-ink hover:text-cream"
        >
          <Close />
        </button>

        {/* photo */}
        <div className="bg-sand p-4 sm:p-6">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <ProductImage product={product} colorHex={color.hex} view={0} />
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col p-6 sm:p-9">
          {/* <p className="eyebrow">
            {product.type
              ? `${product.category} · ${product.type}`
              : product.category}
          </p> */}
          <h3 id="product-title" className="mt-2 text-4xl">
            {product.name}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {product.description}
          </p>

          <dl className="mt-7 space-y-5 text-sm">
            <div>
              <dt className="font-medium">
                {product.fabricLabel || "Fabric & material"}
              </dt>
              <dd className="mt-1 text-muted">{product.fabric}</dd>
            </div>
            <div>
              <dt className="font-medium">
                {product.sizesLabel || "Sizes & options"}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-sand px-3 py-1 text-xs text-ink/80"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Key features</dt>
              <dd>
                <ul className="mt-2 space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-muted">
                      <Check
                        width={18}
                        height={18}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="font-medium">Care</dt>
              <dd className="mt-1 text-muted">{product.care}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-9">
            <button
              type="button"
              onClick={() => onQuote(product.name)}
              className="btn btn-primary"
            >
              Request Quote
            </button>
            {product.kind && (
              <button
                type="button"
                onClick={() => onView3D(product.id, 0)}
                className="btn btn-ghost"
              >
                <Cube width={18} height={18} /> View in 3D
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
