import { useRef } from "react";
import { motion } from "framer-motion";
import { clientVideos } from "../data/siteData";
import Reveal from "./Reveal";

/**
 * "Our Satisfied Clients" — one row of installation videos that slides
 * left/right: swipe on touchscreens, arrow buttons or mouse-drag on desktop.
 * Videos autoplay muted + loop (Instagram-style).
 */
export default function Clients() {
  const trackRef = useRef(null);
  if (!clientVideos.length) return null;

  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("figure");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="clients"
      className="section"
      aria-label="Our satisfied clients"
    >
      <div className="wrap">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our satisfied clients</p>
          <h2 className="h2 mt-4">Our Satisfied Clients.</h2>
          <p className="lead mt-5">
            Real installs, straight from our clients&apos; homes. Swipe or use
            the arrows.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        {/* arrows (desktop) */}
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Previous videos"
          className="absolute -left-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-xl ring-1 ring-ink/10 transition hover:bg-ink hover:text-cream lg:grid"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Next videos"
          className="absolute -right-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-xl ring-1 ring-ink/10 transition hover:bg-ink hover:text-cream lg:grid"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* sliding track */}
        <div
          ref={trackRef}
          data-lenis-prevent
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-16"
        >
          {clientVideos.map((v, i) => (
            <motion.figure
              key={v.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(i, 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-[74%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
            >
              <div className="relative overflow-hidden rounded-3xl bg-sand">
                <video
                  className="aspect-[3/4] h-full w-full object-cover"
                  src={v.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              {v.caption && (
                <figcaption className="mt-3 text-sm text-muted">
                  {v.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
