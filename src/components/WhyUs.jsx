import { whyUs } from '../data/siteData'
import { iconMap } from './Icons'
import Reveal from './Reveal'

export default function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why choose us</p>
          <h2 className="h2 mt-4">Made for your window, not an average one.</h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <Reveal key={item.title} delay={i * 0.08} className="text-center sm:text-left">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-accent sm:mx-0">
                  <Icon width={26} height={26} />
                </span>
                <h3 className="mt-6 text-2xl">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
