import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { business, collections, nav } from "../data/siteData";
import { Close, Menu } from "./Icons";

export function Logo({ light = false }) {
  return (
    <span
      className={`flex items-center gap-3 font-serif text-xl font-semibold xl:text-2xl ${light ? "text-cream" : "text-ink"}`}
    >
      <img
        src="/images/logo-mark.png"
        alt=""
        className="h-10 w-10 object-contain xl:h-11 xl:w-11"
      />
      <span className="flex flex-col items-start leading-none">
        {business.name}
        <span className="mt-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-muted">
          Curtains crafted for royal living
        </span>
      </span>
    </span>
  );
}

function Chevron({ className = "" }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar({ onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  // hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (y > lastY.current && y > 120) setHidden(true);
    else setHidden(false);
    lastY.current = y;
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden && !open ? "-translate-y-full" : ""
      } ${
        scrolled || open
          ? "bg-cream/85 py-3 shadow-[0_10px_30px_-12px_rgba(23,19,14,0.18)] backdrop-blur-md"
          : "bg-cream/60 py-5 backdrop-blur-sm"
      }`}
    >
      <div className="wrap flex items-center justify-between">
        <a href="#home" aria-label={`${business.name}, home`}>
          <Logo />
        </a>

        {/* desktop: Home, Collections (dropdown), Contact */}
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <a
            href="#home"
            className="text-[13px] text-ink/75 transition hover:text-accent"
          >
            Home
          </a>

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-[13px] text-ink/75 transition hover:text-accent"
            >
              Collections
              <Chevron className="transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-60 rounded-2xl bg-cream p-2 shadow-xl shadow-ink/10 ring-1 ring-ink/10">
                {collections.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="block rounded-xl px-4 py-2.5 transition hover:bg-sand"
                  >
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">
                      {c.eyebrow}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink">
                      {c.tour}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#contact"
            className="text-[13px] text-ink/75 transition hover:text-accent"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onQuote("")}
            className="btn btn-primary hidden !py-2.5 sm:inline-flex"
          >
            Get a Free Quote
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="wrap flex flex-col gap-1 pb-6 pt-4">
              {nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/10 py-3.5 font-serif text-2xl"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onQuote("");
                }}
                className="btn btn-primary mt-5"
              >
                Get a Free Quote
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
