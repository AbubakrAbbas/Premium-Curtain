import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { business, collections, intro, products } from "../data/siteData";
import CurtainArt from "./CurtainArt";
import InteriorArt from "./InteriorArt";
import { Logo } from "./Navbar";
import { Arrow } from "./Icons";

const EASE = [0.22, 1, 0.36, 1];

// fine fabric grain laid over the folds
const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

// velvet folds: two stripe patterns of different widths, shaded at the rod and the hem
const FOLDS = [
  "linear-gradient(to bottom, rgba(0,0,0,.55) 0, rgba(0,0,0,0) 14%)",
  "linear-gradient(to top, rgba(0,0,0,.4) 0, rgba(0,0,0,0) 22%)",
  "repeating-linear-gradient(90deg, rgba(0,0,0,.42) 0, rgba(255,255,255,.09) 30px, rgba(0,0,0,.42) 64px)",
  "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,.07) 97px, rgba(255,255,255,0) 190px)",
].join(",");

function Panel({ side, progress }) {
  const left = side === "left";
  // the cloth gathers toward its outer edge, then slides off the screen
  const scaleX = useTransform(progress, [0, 0.72, 1], [1, 0.12, 0.12]);
  const x = useTransform(
    progress,
    [0, 0.72, 1],
    ["0%", "0%", left ? "-130%" : "130%"],
  );
  const skewX = useTransform(
    progress,
    [0, 0.35, 0.72, 1],
    [0, left ? -2.5 : 2.5, 0, 0],
  );

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-y-0 w-[52%] will-change-transform [contain:layout_paint]"
      style={{
        [left ? "left" : "right"]: 0,
        scaleX,
        x,
        skewX,
        transformOrigin: left ? "0% 50%" : "100% 50%",
        background: `${FOLDS}, ${intro.fabric}`,
        boxShadow: left
          ? "18px 0 60px rgba(0,0,0,.45)"
          : "-18px 0 60px rgba(0,0,0,.45)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{ backgroundImage: GRAIN }}
      />
      {/* heading band with stitching */}
      <div className="absolute inset-x-0 top-0 h-[72px] border-b-2 border-dashed border-white/15 bg-black/15" />
      {/* rings (they squash into thin ovals as the cloth gathers) */}
      <div className="absolute inset-x-3 top-3 flex justify-between">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="block size-6 rounded-full border-[3px] border-[#d6a768] shadow-[0_2px_4px_rgba(0,0,0,.5)]"
          />
        ))}
      </div>
      {/* hem */}
      <div className="absolute inset-x-0 bottom-9 border-t-2 border-dashed border-white/15" />
    </motion.div>
  );
}

/* After the curtains part, a numbered showcase plays: one full-screen slide per
   collection, then the site is revealed. */
const CATEGORY_OF = {
  curtains: "Curtains",
  wallpaper: "Wallpaper",
  "tv-wall": "TV Wall Design",
  molding: "Molding",
  furniture: "Furniture",
};
const SLIDES = collections.map((c) => ({
  ...c,
  product: products.find((p) => p.category === CATEGORY_OF[c.id]),
}));

function SlideArt({ slide }) {
  // real photo when the slide's product has one — fills the square frame, cropped to fit
  const photo = slide.product?.photos?.[0];
  if (photo) {
    return (
      <img
        src={photo}
        alt={slide.eyebrow}
        className="h-full w-full object-cover"
      />
    );
  }
  if (slide.id === "curtains") {
    return (
      <CurtainArt
        kind="velvet"
        color="#8c6a4f"
        variant="drawn"
        className="h-full w-full"
      />
    );
  }
  return (
    <InteriorArt
      art={slide.product.art}
      color={slide.product.colors[0].hex}
      variant={slide.id === "molding" ? "closed" : "drawn"}
      className="h-full w-full"
    />
  );
}

/**
 * Full-screen intro shown on load. Any scroll, swipe, key press or the button opens
 * the curtains; a short numbered showcase of the collections then plays, and the
 * site is revealed when it ends (or when the visitor skips it).
 */
export default function CurtainIntro({ onReveal, onDone }) {
  const progress = useMotionValue(0);
  const started = useRef(false);

  // start fetching the showcase photos right away, so the slides don't pop in late
  useEffect(() => {
    SLIDES.forEach((s) => {
      const photo = s.product?.photos?.[0];
      if (photo) new Image().src = photo;
    });
  }, []);
  const revealed = useRef(false);
  const done = useRef(false);
  const stepLock = useRef(0);
  const cb = useRef({ onReveal, onDone });
  cb.current = { onReveal, onDone };

  const [phase, setPhase] = useState("curtain"); // 'curtain' | 'show'
  const [slide, setSlide] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const tour = useMotionValue(1);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const slideRef = useRef(slide);
  slideRef.current = slide;

  // the overlay fades out in step with the curtains, and again when the showcase ends
  const overlayOpacity = useTransform(progress, [0.78, 0.98], [1, 0]);

  const finish = useCallback(
    (hash) => {
      if (leaving) return;
      setLeaving(true);
      animate(tour, 0, {
        duration: 0.6,
        ease: "easeInOut",
        onComplete: () => {
          cb.current.onDone?.();
          if (hash) window.location.hash = hash;
        },
      });
    },
    [leaving, tour],
  );

  const advance = useCallback(
    (d) => {
      if (phaseRef.current !== "show" || leaving) return;
      const now = Date.now();
      if (now - stepLock.current < 400) return;
      stepLock.current = now;
      const next = slideRef.current + d;
      if (next >= SLIDES.length) {
        finish();
      } else {
        setSlide(Math.max(0, next));
      }
    },
    [finish, leaving],
  );

  // curtains part, then the showcase begins
  const open = useCallback(() => {
    if (started.current) return;
    started.current = true;
    animate(progress, 1, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        if (done.current) return;
        done.current = true;
        setPhase("show");
      },
    });
  }, [progress]);

  // let the hero start its entrance as the curtains part
  useMotionValueEvent(progress, "change", (v) => {
    if (v > 0.35 && !revealed.current) {
      revealed.current = true;
      cb.current.onReveal?.();
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let y0 = null;
    const onWheel = (e) => {
      if (phaseRef.current === "show") {
        if (Math.abs(e.deltaY) > 24) advance(e.deltaY > 0 ? 1 : -1);
      } else if (Math.abs(e.deltaY) > 2) {
        open();
      }
    };
    const onTouchStart = (e) => {
      y0 = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (y0 === null) return;
      const dy = y0 - e.changedTouches[0].clientY;
      y0 = null;
      if (phaseRef.current === "show") {
        if (Math.abs(dy) > 48) advance(dy > 0 ? 1 : -1);
      } else if (Math.abs(dy) > 24) {
        open();
      }
    };
    const onKey = (e) => {
      if (phaseRef.current === "show") {
        if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
          e.preventDefault();
          advance(1);
        } else if (["ArrowUp", "PageUp"].includes(e.key)) {
          e.preventDefault();
          advance(-1);
        } else if (e.key === "Escape") {
          finish();
        }
        return;
      }
      if (
        [
          " ",
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "End",
          "Home",
        ].includes(e.key)
      ) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, advance, finish]);

  const hintOpacity = useTransform(progress, [0, 0.1], [1, 0]);
  const rodOpacity = useTransform(progress, [0, 0.7, 0.95], [1, 1, 0]);
  const rodY = useTransform(progress, [0.7, 1], [0, -24]);

  const current = SLIDES[slide];

  return (
    <div
      className={`fixed inset-0 z-[100] touch-none overflow-hidden ${phase === "show" ? "bg-cream" : "bg-ink"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome to ${business.name}. Scroll or press the button to open the curtains.`}
    >
      {phase === "curtain" && (
        <>
          <Panel side="left" progress={progress} />
          <Panel side="right" progress={progress} />

          {/* brass rod */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: rodOpacity, y: rodY }}
            className="pointer-events-none absolute inset-x-0 top-[19px] h-3 bg-gradient-to-b from-[#f0cf9c] via-[#b88a4f] to-[#6f4f26] shadow-[0_4px_10px_rgba(0,0,0,.5)]"
          />

          {/* welcome text, centered over the seam */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center"
          >
            <div className="flex flex-col items-center drop-shadow-[0_2px_12px_rgba(0,0,0,.55)]">
              <Logo light />
              <p className="mt-7 font-serif text-5xl leading-none text-cream sm:text-6xl">
                Welcome
              </p>
              <button
                type="button"
                onClick={open}
                className="btn btn-accent pointer-events-auto mt-9 !px-8 !py-3.5"
              >
                Open the curtains <Arrow width={17} height={17} />
              </button>
            </div>
          </motion.div>
        </>
      )}

      {phase === "show" && (
        <motion.div style={{ opacity: tour }} className="absolute inset-0">
          {/* counter */}
          <p className="absolute inset-x-0 top-8 text-center text-xs tracking-[0.35em] text-muted">
            0{slide + 1} / 0{SLIDES.length}
          </p>
          <button
            type="button"
            onClick={() => finish()}
            className="absolute right-6 top-6 z-20 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-ink"
          >
            Skip
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center px-6 pb-6 pt-16 text-center sm:pt-20"
            >
              <div className="flex flex-col items-center">
                <p className="eyebrow">{current.eyebrow}</p>
                <h2 className="mt-2.5 max-w-2xl font-serif text-4xl leading-[1.08] text-ink sm:text-5xl">
                  {current.tour}
                </h2>
                <button
                  type="button"
                  onClick={() => finish(current.id)}
                  className="btn btn-primary mt-5 !px-6 !py-2.5"
                >
                  Explore {current.eyebrow} <Arrow width={17} height={17} />
                </button>
              </div>

              {/* artwork slides in from the right, like the reference */}
              <motion.div
                initial={{ x: "55%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="relative mt-5 size-[min(58svh,86vw)] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/25 ring-1 ring-ink/10"
              >
                <SlideArt slide={current} />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cream/40 to-transparent" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-muted">
            {slide < SLIDES.length - 1
              ? "Scroll to continue"
              : "Scroll to enter"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
