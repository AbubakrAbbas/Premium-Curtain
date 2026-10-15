import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/siteData'
import Reveal from './Reveal'
import { Arrow, ArrowLeft } from './Icons'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const n = testimonials.length
  const t = testimonials[i]

  // gentle auto-advance (off for reduced-motion users, or while hovering/focused)
  useEffect(() => {
    if (reduce || paused || n < 2) return
    const timer = setInterval(() => setI((v) => (v + 1) % n), 8000)
    return () => clearInterval(timer)
  }, [reduce, paused, n])

  if (!n) return null

  return (
    <section id="reviews" className="section bg-sand/50">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Kind words</p>

          <div
            className="relative mt-8 min-h-[16rem] sm:min-h-[14rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45 }}
              >
                <blockquote className="font-serif text-3xl leading-snug sm:text-4xl">“{t.quote}”</blockquote>
                <figcaption className="mt-7 text-sm text-muted">
                  <span className="font-medium text-ink">{t.name}</span> · {t.detail}
                  {t.sample && (
                    <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] text-accent">Sample</span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {n > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => setI((v) => (v - 1 + n) % n)}
                className="grid size-11 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-cream"
              >
                <ArrowLeft width={18} height={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    type="button"
                    aria-label={`Show review ${k + 1}`}
                    aria-current={k === i}
                    onClick={() => setI(k)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-8 bg-accent' : 'w-1.5 bg-ink/20'}`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => setI((v) => (v + 1) % n)}
                className="grid size-11 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-cream"
              >
                <Arrow width={18} height={18} />
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
