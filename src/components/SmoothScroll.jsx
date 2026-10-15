import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery inertia scrolling for the whole site (Lenis).
 * Disabled during the curtain intro, and for reduced-motion users.
 * Also glides #anchor navigation instead of jumping.
 * Exposes window.__lenis so modals can stop/start it.
 */
export default function SmoothScroll({ enabled = true }) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // route #anchor clicks through lenis so they glide instead of jump
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -84, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [enabled]);

  return null;
}
