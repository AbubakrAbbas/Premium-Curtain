import { business, nav } from '../data/siteData'
import { Logo } from './Navbar'
import { Facebook, Instagram, WhatsApp } from './Icons'

export default function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-4 text-cream/70">
      <div className="wrap border-t border-white/10 pt-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed">{business.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-cream">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {[
              [Instagram, business.social.instagram, 'Instagram'],
              [Facebook, business.social.facebook, 'Facebook'],
              [WhatsApp, `https://wa.me/${business.whatsapp}`, 'WhatsApp'],
            ].map(([Icon, href, label]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:bg-cream hover:text-ink"
              >
                <Icon width={20} height={20} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-12 text-xs text-cream/50">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
