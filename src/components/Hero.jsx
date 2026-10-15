import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { hero } from '../data/siteData'
import HeroScene from './HeroScene'
import { Arrow } from './Icons'

const EASE = [0.22, 1, 0.36, 1]

/**
 * `ready` becomes true when the opening curtains part, so the headline
 * animates in as the page is revealed.
 */
export default function Hero({ ready = true }) {
  const ref = useRef(null)
  const [pick, setPick] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // gentle parallax: the background drifts slower than the page
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const swatch = hero.swatches[pick]

  const fade = (delay) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.9, delay, ease: EASE },
  })

  const words = hero.title.split(' ')

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        {hero.image ? (
          <img src={hero.image} alt="" className="h-full w-full object-cover" fetchPriority="high" />
        ) : (
          <HeroScene drape={swatch.hex} sheer={hero.sheer} />
        )}
      </motion.div>
      {/* keeps the text readable, and fades the scene into the next section */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cream from-20% via-cream/65 via-45% to-transparent to-72% max-lg:from-cream/90 max-lg:via-cream/65 max-lg:to-cream/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-cream to-transparent" />

      <div className="wrap pb-24 pt-28 sm:pb-20">
        <div className="max-w-[38rem]">
          <motion.p className="eyebrow flex items-center gap-3" {...fade(0.05)}>
            <span className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[3.9rem]" aria-label={hero.title}>
            {words.map((w, i) => {
              const accent = w.replace(/[^a-z]/gi, '').toLowerCase() === hero.accentWord
              return (
                <span key={i} aria-hidden="true">
                  <span className="inline-block overflow-hidden pb-[0.16em] align-bottom -mb-[0.16em]">
                    <motion.span
                      className={`inline-block ${accent ? 'italic text-accent' : ''}`}
                      initial={{ y: '115%' }}
                      animate={{ y: ready ? 0 : '115%' }}
                      transition={{ duration: 1, delay: 0.1 + i * 0.07, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>{' '}
                </span>
              )
            })}
          </h1>

          <motion.p className="lead mt-6 max-w-xl" {...fade(0.55)}>
            {hero.text}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap gap-3" {...fade(0.7)}>
            <a href="#collection" className="btn btn-primary !px-7 !py-3.5">
              Explore Collections <Arrow width={18} height={18} />
            </a>
            <a href="#contact" className="btn btn-ghost !px-7 !py-3.5">
              Book a Free Visit
            </a>
          </motion.div>

          <motion.ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1.5 text-[13px] text-muted" {...fade(0.85)}>
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </motion.ul>

{/* minimal inline color swatches */}
        {!hero.image && (
          <motion.div className="mt-9 flex flex-wrap items-center gap-3.5" {...fade(1.0)}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Try a color <span className="normal-case tracking-normal text-ink/70">· {swatch.name}</span>
            </p>
            <div className="flex gap-2" role="group" aria-label="Try a curtain color">
              {hero.swatches.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  title={s.name}
                  aria-label={s.name}
                  aria-pressed={pick === i}
                  onClick={() => setPick(i)}
                  className={`size-6 rounded-full ring-1 ring-ink/15 transition ${
                    pick === i ? 'scale-110 outline-2 outline-offset-2 outline-accent' : 'hover:scale-110'
                  }`}
                  style={{ background: s.hex, outlineStyle: pick === i ? 'solid' : 'none' }}
                />
              ))}
            </div>
          </motion.div>
        )}
        </div>
      </div>

    </section>
  )
}
