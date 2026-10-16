import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { intro } from "./data/siteData";
import CurtainIntro from "./components/CurtainIntro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Collection from "./components/Collection";
import Installations from "./components/Installations";
import ProductModal from "./components/ProductModal";
import HowItWorks from "./components/HowItWorks";
import Clients from "./components/Clients";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";

// The curtain intro is skipped for visitors who prefer reduced motion,
// and when they arrive on a deep link like /#contact.
const shouldShowIntro = () =>
  intro.enabled &&
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.location.hash;

export default function App() {
  // play the intro once per browser session; refreshing or navigating back
  // goes straight to the site (much faster repeat visits)
  const [introActive, setIntroActive] = useState(() => {
    if (sessionStorage.getItem("seenIntro")) return false;
    sessionStorage.setItem("seenIntro", "1");
    return shouldShowIntro();
  });
  const [revealed, setRevealed] = useState(!introActive);
  const [modalProduct, setModalProduct] = useState(null);
  const [interest, setInterest] = useState("");

  const closeModal = useCallback(() => setModalProduct(null), []);
  const onReveal = useCallback(() => setRevealed(true), []);
  const onIntroDone = useCallback(() => setIntroActive(false), []);

  // "Request Quote": preselect the product and glide to the contact form.
  // lock: true makes the glide uninterruptible (wheel ticks can't cut it short).
  const requestQuote = useCallback((productName = "") => {
    setInterest(productName);
    document.body.style.overflow = "";
    setModalProduct(null);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (!el) return;
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(el, {
          offset: -84,
          duration: 1.4,
          force: true,
          lock: true,
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {introActive && <CurtainIntro onReveal={onReveal} onDone={onIntroDone} />}
      <SmoothScroll enabled={!introActive} />

      {/* the page is inert (not clickable or tabbable) until the intro is finished */}
      <div inert={introActive}>
        <ScrollProgress />
        <a
          href="#collection"
          className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to collection
        </a>

        <Navbar onQuote={requestQuote} />
        <main>
          <Hero ready={revealed} />
          <WhyUs />
          <Collection onOpen={setModalProduct} />
          <Installations />
          <HowItWorks />
          <Clients />
          <About />
          <Contact interest={interest} />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>

      <AnimatePresence>
        {modalProduct && (
          <ProductModal
            key={modalProduct.id}
            product={modalProduct}
            onClose={closeModal}
            onQuote={requestQuote}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
