import { about, products } from '../data/siteData'
import CurtainArt from './CurtainArt'
import ProductImage from './ProductImage'
import Reveal from './Reveal'
import { Check } from './Icons'

export default function About() {
  const p = products[2] // image shown next to the story: change the index to use another product
  return (
    <section id="about" className="section">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-sand lg:max-w-none">
            {about.image ? (
              <img src={about.image} alt="Our recent installation" className="h-full w-full object-cover" />
            ) : p.photos ? (
              <ProductImage product={p} view={0} />
            ) : (
              <CurtainArt kind={p.kind} color={p.colors[0].hex} variant="drawn" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="h2 mt-4">{about.title}</h2>
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((t) => (
              <p key={t} className="lead">
                {t}
              </p>
            ))}
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {about.values.map((v) => (
              <li key={v} className="flex items-center gap-2.5 text-sm font-medium">
                <Check width={18} height={18} className="text-accent" />
                {v}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary mt-10">
            Book a free measurement
          </a>
        </Reveal>
      </div>
    </section>
  )
}
