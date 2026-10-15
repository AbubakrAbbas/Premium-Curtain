import { business } from '../data/siteData'
import { WhatsApp } from './Icons'

/** Floating WhatsApp chat button, bottom-right on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hello ${business.name}!`)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition duration-300 hover:scale-110"
    >
      <WhatsApp width={28} height={28} />
    </a>
  )
}
