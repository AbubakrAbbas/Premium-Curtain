import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { intro } from "./data/siteData";
import CurtainIntro from "./components/CurtainIntro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Collection from "./components/Collection";
import ProductModal from "./components/ProductModal";
import ViewerModal from "./components/ViewerModal";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
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
  const [introActive, setIntroActive] = useState(shouldShowIntro);
  const [revealed, setRevealed] = useState(!introActive);
  const [modalProduct, setModalProduct] = useState(null);
  const [preview, setPreview] = useState(null); // { id, color } — 3D modal
  const [interest, setInterest] = useState("");

  const closeModal = useCallback(() => setModalProduct(null), []);
  const closePreview = useCallback(() => setPreview(null), []);
  const onReveal = useCallback(() => setRevealed(true), []);
  const onIntroDone = useCallback(() => setIntroActive(false), []);

  // "View in 3D": open the 3D modal with that curtain selected
  const openPreview = useCallback((id, color = 0) => {
    setModalProduct(null);
    setPreview({ id, color });
  }, []);

  // "Request Quote": preselect the product and glide to the contact form.
  // Lenis is paused for the duration of the glide so wheel input can't
  // interrupt it (the "stops at How It Works" bug on desktop).
  const requestQuote = useCallback((productName = "") => {
    setInterest(productName);
    document.body.style.overflow = "";
    setModalProduct(null);
    setPreview(null);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (!el) return;
      const lenis = window.__lenis;
      if (lenis) {
        lenis.stop(); // ignore wheel/touch during the glide
        lenis.scrollTo(el, {
          offset: -84,
          duration: 1.4,
          force: true,
          onComplete: () => lenis.start(), // re-enable on arrival
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
          <Collection onOpen={setModalProduct} onView3D={openPreview} />
          <HowItWorks />
          <Testimonials />
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
            onView3D={openPreview}
          />
        )}
        {preview && (
          <ViewerModal
            key="viewer"
            productId={preview.id}
            colorIndex={preview.color}
            onSelect={(id, color) => setPreview({ id, color })}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
