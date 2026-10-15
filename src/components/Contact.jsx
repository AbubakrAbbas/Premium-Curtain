import { useEffect, useState } from "react";
import { business, products } from "../data/siteData";
import Reveal from "./Reveal";
import { Mail, Phone, Pin, WhatsApp } from "./Icons";

const field =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/10";

export default function Contact({ interest }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  // when someone taps "Request Quote" on a product, preselect it here
  useEffect(() => {
    setForm((f) => ({ ...f, interest: interest || "" }));
  }, [interest]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // phone: digits only — typing or pasting anything else gets cleaned instantly
  const setPhone = (e) =>
    setForm((f) => ({ ...f, phone: e.target.value.replace(/[^0-9]/g, "") }));

  // No backend needed: the form opens WhatsApp with the message pre-filled.
  // HTML5 validation blocks submit until name, phone and category are filled.
  const submit = (e) => {
    e.preventDefault();
    const text = [
      `Hello ${business.name}, I'd like a free quote.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.interest}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
    setSent(true);
  };

  return (
    <section id="contact" className="section bg-ink text-cream">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Get in touch</p>
          <h2 className="h2 mt-4">
            Let’s find the right curtains for your space.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/70">
            Tell us a little about your windows. We’ll reply with a free quote
            and arrange a time to measure.
          </p>

          <form onSubmit={submit} className="mt-10 space-y-4 text-ink">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input
                  required
                  className={field}
                  placeholder="Your name *"
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="sr-only">Phone number</span>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{7,15}"
                  title="Digits only, with country code — e.g. 971568409265"
                  className={field}
                  placeholder="Phone number * (e.g. 971568409265)"
                  value={form.phone}
                  onChange={setPhone}
                  autoComplete="tel"
                />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Product you’re interested in</span>
              <select
                required
                className={field}
                value={form.interest}
                onChange={set("interest")}
              >
                <option value="" disabled>
                  Choose a product or category… *
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea
                rows={4}
                className={field}
                placeholder="Number of windows, room type, anything we should know…"
                value={form.message}
                onChange={set("message")}
              />
            </label>
            <button type="submit" className="btn btn-accent w-full sm:w-auto">
              <WhatsApp width={18} height={18} /> Send on WhatsApp
            </button>
            {sent && (
              <p role="status" className="text-sm text-cream/70">
                Opening WhatsApp… if nothing happened, message us directly on{" "}
                {business.phone}.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          <ul className="space-y-5 text-[15px]">
            <li className="flex gap-4">
              <Pin className="mt-0.5 shrink-0 text-accent" />
              <span>
                {business.address}
                <br />
                <span className="text-cream/60">{business.city}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-0.5 shrink-0 text-accent" />
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="hover:text-accent"
              >
                {business.phone}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-0.5 shrink-0 text-accent" />
              <a
                href={`mailto:${business.email}`}
                className="hover:text-accent"
              >
                {business.email}
              </a>
            </li>
          </ul>

          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm">
            {business.hours.map(([d, h]) => (
              <div key={d} className="contents">
                <dt className="text-cream/60">{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={`Map of ${business.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`}
              className="h-64 w-full grayscale-[40%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
