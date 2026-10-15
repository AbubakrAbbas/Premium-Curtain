import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const VARIANTS = {
  up: { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } },
  blur: {
    initial: { opacity: 0, y: 16, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  clip: {
    initial: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    animate: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  },
  left: { initial: { opacity: 0, x: -36 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 36 }, animate: { opacity: 1, x: 0 } },
  zoom: { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } },
}

/**
 * Scroll-into-view animation. variant: up | blur | clip | left | right | zoom
 * (Reduced-motion users get no movement: see <MotionConfig> in App.jsx.)
 */
export default function Reveal({ children, delay = 0, variant = 'up', className = '', as = 'div' }) {
  const v = VARIANTS[variant] || VARIANTS.up
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}
