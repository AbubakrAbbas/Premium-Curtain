# Curtain Business Website

A premium, responsive website with an interactive **3D curtain preview**.
Built with React, Vite, Tailwind CSS, Framer Motion and Three.js (react-three-fiber).

## Run it

```bash
npm install
npm run dev        # open the local URL it prints
```

Other commands:

```bash
npm run build      # production build into /dist
npm run preview    # preview the production build locally
```

Requires Node.js 18 or newer.

## Make it yours (5 minutes)

**Almost everything is in one file: `src/data/siteData.js`.**

1. `business`: name, city, address, phone, **WhatsApp number** (digits only with country code), email, opening hours, map search text.
2. `products`: names, descriptions, colors, sizes, features, care instructions. Add or remove products freely.
3. `testimonials`: the three shipped are **samples** marked "Sample". Replace them with real customer reviews and delete `sample: true`.
4. `hero`, `whyUs`, `steps`, `about`: the page copy.
5. `index.html`: update the `<title>`, description and Open Graph tags (search engines read these before React loads).
6. Colors and fonts: `src/index.css`, inside `@theme { ... }`.

## Opening-curtain intro

When the site loads, full-screen curtains cover the page. The visitor scrolls, swipes, presses a key or taps **Open the curtains**, and the curtains part to reveal the site while the headline animates in.

- Turn it off: set `intro.enabled` to `false` in `src/data/siteData.js`. Change the curtain color with `intro.fabric`.
- It is skipped automatically for visitors who prefer reduced motion, and when someone opens a deep link such as `/#contact`.

## Hero

The hero scene has swaying sheer curtains, light beams and floating dust, and a **Try a color** picker that recolors the curtains live. Edit the colors in `hero.swatches`, and the accent word in `hero.accentWord`. To use a real photo instead, set `hero.image`.

## Replace the drawn images with real photos

The site ships with illustrated curtains so it works out of the box. To use your own photos:

- **Hero:** put a photo in `public/images/hero.jpg`, then in `siteData.js` uncomment `image: '/images/hero.jpg'`.
- **Products:** add `photos: ['/images/noir-1.jpg', '/images/noir-2.jpg', '/images/noir-3.jpg']` to a product. The first is the card image; all appear in the product popup gallery.
- Compress photos first (squoosh.app). Aim for under 300 KB each, about 1600 px wide.
- **Social sharing:** add a 1200×630 image at `public/og-image.jpg`.

## The 3D preview

- Each product's **View in 3D** button scrolls to the 3D section with that product selected.
- Visitors can rotate, zoom, change the color, open and close the curtains, and switch Daylight / Evening.
- Fabric behavior comes from each product's `kind`: `blackout`, `sheer`, `velvet` or `linen`.
- The cloth has a real woven surface (generated in code, no image files). **Zoom into the weave** flies the camera in, and scrolling zooms toward the cursor. Blackout shows a twill weave, sheer voile is see-through between the threads, linen has uneven slubs, and velvet has a soft pile. Tune each one in the `FABRICS` table at the top of `src/components/Curtain3D.jsx`.
- It is lazy-loaded (three.js only downloads when the section is near the screen) and falls back to a 2D image on devices without WebGL.

### Use your own 3D model (.glb)

1. Put the file in `public/models/` (for example `public/models/velvet.glb`).
2. Add `model: '/models/velvet.glb'` to that product in `siteData.js`.
3. The selected color tints the model. The open/close slider only animates the built-in procedural curtain.

> A single photo can't be turned into a reliable 3D model automatically in the browser. This viewer lets customers change fabrics and colors on a realistic curtain instead. For photo-real results, have a 3D artist model your best-sellers as `.glb` files.

## Contact form

The form has no server: it opens **WhatsApp with the customer's message pre-filled** (using the number in `siteData.js`). To receive emails instead, use a form service such as Formspree or Netlify Forms and replace the `submit` function in `src/components/Contact.jsx`.

## Deploy

After `npm run build`, upload the contents of `dist/` or connect the repo:

- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Cloudflare Pages:** same settings.
- **Vercel:** framework preset "Vite". Note that Vercel's free Hobby plan is for non-commercial use only, so use Pro for a paying client.
- **cPanel hosting:** upload everything inside `dist/` to `public_html`.

Then connect the client's own domain in the host's dashboard. HTTPS is automatic.

## Project structure

```
src/
  data/siteData.js          ← edit content here
  App.jsx                   ← page order + shared state
  index.css                 ← colors, fonts, buttons
  components/
    Navbar, Hero, WhyUs, Collection, ProductModal,
    PreviewSection, Viewer, Curtain3D (lazy), HowItWorks,
    Testimonials, About, Contact, Footer, WhatsAppButton,
    CurtainArt / HeroScene / ProductImage (drawn artwork),
    Reveal (scroll animation), Icons
```

## Notes

- Fonts (Cormorant Garamond + Inter) load from Google Fonts. To self-host, download them and update `index.html` and `src/index.css`.
- Animations respect the visitor's "reduce motion" setting.
- Before launch: test on a real phone, fix the placeholder phone/address, and run Lighthouse in Chrome DevTools.
