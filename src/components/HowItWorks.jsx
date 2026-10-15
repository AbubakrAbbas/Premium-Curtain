import { steps } from '../data/siteData'
import Reveal from './Reveal'

export default function HowItWorks() {
  return (
    <section id="process" className="section">
      <div className="wrap">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="h2 mt-4">From first idea to hung curtains, in four simple steps.</h2>
        </Reveal>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
              <span className="font-serif text-6xl leading-none text-accent/30">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-2xl">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute right-0 top-8 hidden h-px w-10 bg-stone lg:block" />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
