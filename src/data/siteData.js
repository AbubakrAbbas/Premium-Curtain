/**
 * ONE FILE TO EDIT: business details, products, collections, copy.
 * Everything on the website reads from here.
 *
 * Placeholder values are marked "<- replace". Get the real phone,
 * WhatsApp and email from the client before going live.
 */

export const business = {
  name: "Premium Curtain",
  tagline: "Curtains, wallpaper, TV walls, molding & custom furniture",
  city: "Dubai, UAE",
  address: "Dragon Mart, Dubai, UAE", // <- confirm exact shop/location
  phone: "+971 56 840 9265",
  whatsapp: "971568409265",
  email: "hello@example.com", // <- replace
  hours: [
    ["Monday – Saturday", "10:00 am – 10:00 pm"],
    ["Sunday", "By appointment"],
  ],
  mapQuery: "Dragon Mart, Dubai, UAE",
  social: {
    instagram: "https://instagram.com/premium_curtains_dubai_",
    facebook: "https://facebook.com/",
  },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Curtains", href: "#curtains" },
  { label: "Wallpaper", href: "#wallpaper" },
  { label: "TV Walls", href: "#tv-wall" },
  { label: "Molding", href: "#molding" },
  { label: "Furniture", href: "#furniture" },
  { label: "Contact", href: "#contact" },
];

/**
 * The opening-curtain intro. Visitors scroll, swipe, press a key or tap the button:
 * the curtains part, the overlay fades, and the site is revealed.
 * Set `enabled: false` to turn it off.
 * (It is skipped automatically for visitors who prefer reduced motion.)
 */
export const intro = {
  enabled: true,
  fabric: "#3e2c1e", // velvet color of the opening curtains (deep espresso)
};

/** Hero text + the colors visitors can try on the hero curtains (swap for a real photo, see README). */
export const hero = {
  eyebrow: "Curtains · Wallpaper · TV Walls · Molding · Furniture — Dubai",
  title: "A home that feels finished, down to the last detail.",
  accentWord: "finished", // this word is set in italic accent color
  text: "Made-to-measure curtains, wallpaper, TV wall designs, molding and custom furniture — measured, crafted and installed by one Dubai team.",
  trust: [
    "Free home visit consultation",
    "Made to measure",
    "Installed by our team",
  ],
  sheer: "#f3ead9",
  swatches: [
    { name: "Warm Taupe", hex: "#a58a73" },
    { name: "Sage", hex: "#7f8f78" },
    { name: "Midnight", hex: "#33415f" },
    { name: "Burgundy", hex: "#7a3040" },
    { name: "Oat", hex: "#cdbba0" },
  ],
};

export const whyUs = [
  {
    icon: "ruler",
    title: "Cut to your exact size",
    text: "Every window, wall and room is different. We measure on site and make each piece to fit your space, not an average one.",
  },
  {
    icon: "fabric",
    title: "Materials we stand behind",
    text: "Tightly woven fabrics, honest wood, colorfast wallpaper — chosen for how they look, drape and age over the years.",
  },
  {
    icon: "home",
    title: "Free home visit consultation",
    text: "We visit, measure and help you choose fabrics, finishes and colors against your own walls and light.",
  },
  {
    icon: "clock",
    title: "Clean, quick installation",
    text: "Rods, tracks, panels and furniture handled by our team, with the room left tidy when we leave.",
  },
];

/**
 * The five collections shown as separate sections on the page, in this order.
 * `category` must match the products below. `tour` lines are used in the
 * opening showroom tour.
 */
export const collections = [
  {
    id: "curtains",
    eyebrow: "Curtains & blinds",
    title: "Curtains, made to measure.",
    lead: "Blackout, sheer, velvet and linen — measured, stitched and hung by our team. Tap a curtain for details, or preview it in 3D.",
    tour: "Curtains that finish a room",
  },
  {
    id: "wallpaper",
    eyebrow: "Wallpaper",
    title: "Walls with character.",
    lead: "Pattern, texture and color that paint can’t give you. Supplied and professionally installed, seam to seam.",
    tour: "Wallpaper that adds depth",
  },
  {
    id: "tv-wall",
    eyebrow: "TV wall design",
    title: "A feature wall for every screen.",
    lead: "Fluted wood, marble-look panels and hidden LED — designed around your TV and your room, built and fitted in place.",
    tour: "TV walls built around your screen",
  },
  {
    id: "molding",
    eyebrow: "Molding & trim",
    title: "Detail where it matters.",
    lead: "Crown molding, wall paneling and ceiling trim that give plain rooms a tailored, finished feel.",
    tour: "Molding that sharpens a room",
  },
  {
    id: "furniture",
    eyebrow: "Custom furniture",
    title: "Furniture made for your space.",
    lead: "Sofas, headboards and seating upholstered in your choice of fabric, built to your size and style.",
    tour: "Furniture made to order",
  },
];

/**
 * kind  → curtain only: how the fabric behaves in 3D ('blackout' | 'sheer' | 'velvet' | 'linen')
 * art   → which illustration is used until real photos are added ('curtain' | 'wallpaper' | 'tvwall' | 'molding' | 'furniture')
 * photos (optional) → array of image URLs. If present, they replace the drawn artwork.
 * model  (optional) → path to a .glb file to use your own 3D model in the 3D preview.
 */
export const products = [
  {
    id: "noir-blackout",
    name: "Noir Blackout",
    category: "Curtains",
    type: "Blackout",
    kind: "blackout",
    art: "curtain",
    photos: ["/images/products/noir-blackout.jpg"],
    textureUrl: "/images/products/noir-blackout-tex.jpg",
    tagline: "Deep, dark rooms for better sleep and cooler afternoons.",
    description:
      "A triple-woven blackout fabric with a soft face and a thermal backing. It blocks almost all daylight, helps keep rooms cooler in summer and quieter all year, and hangs in full, even folds.",
    fabric: "Triple-weave polyester with thermal backing",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Wide 100" × 84"',
      "Made to measure",
    ],
    colors: [
      { name: "Charcoal", hex: "#3d3d42" },
      { name: "Midnight Navy", hex: "#27334d" },
      { name: "Warm Taupe", hex: "#8c7b6b" },
      { name: "Ivory", hex: "#e9e2d4" },
      { name: "Deep Sage", hex: "#5d6b5a" },
    ],
    features: [
      "Blocks nearly all daylight",
      "Thermal lining helps insulate",
      "Reduces outside noise",
      "Wrinkle-resistant, easy to hang",
    ],
    care: "Machine wash cold on a gentle cycle or dry clean. Steam on low heat; do not bleach.",
  },
  {
    id: "cloud-sheer",
    name: "Cloud Sheer Voile",
    category: "Curtains",
    type: "Sheer",
    kind: "sheer",
    art: "curtain",
    photos: ["/images/products/cloud-sheer.jpg"],
    textureUrl: "/images/products/cloud-sheer-tex.jpg",
    tagline: "Soft, filtered daylight with privacy that still feels airy.",
    description:
      "A fine voile that diffuses harsh sun into a gentle glow while keeping the view out of your living room. Wear it alone for a light look or pair it with blackout panels for day and night control.",
    fabric: "Fine woven polyester voile",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Extra wide 120" × 96"',
      "Made to measure",
    ],
    colors: [
      { name: "Snow", hex: "#f7f4ee" },
      { name: "Champagne", hex: "#eadfc9" },
      { name: "Soft Grey", hex: "#d5d3cf" },
      { name: "Blush", hex: "#ecd5cc" },
    ],
    features: [
      "Diffuses harsh sunlight",
      "Daytime privacy without darkness",
      "Light, floating drape",
      "Layers beautifully with blackout",
    ],
    care: "Hand wash or machine wash cold in a garment bag. Line dry and iron on low.",
  },
  {
    id: "royal-velvet",
    name: "Royal Velvet",
    category: "Curtains",
    type: "Velvet",
    kind: "velvet",
    art: "curtain",
    photos: ["/images/products/royal-velvet.jpg"],
    textureUrl: "/images/products/royal-velvet-tex.jpg",
    tagline: "Rich color and a heavy, luxurious fall for statement rooms.",
    description:
      "A dense, soft-touch velvet with a deep pile that catches the light and gives any room a tailored, luxurious feel. Heavy enough to block drafts and most light on its own.",
    fabric: "Dense-pile polyester velvet",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Wide 100" × 96"',
      "Made to measure",
    ],
    colors: [
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Navy", hex: "#1f2d4f" },
      { name: "Mustard", hex: "#b88a2d" },
      { name: "Blush Rose", hex: "#c99a9a" },
    ],
    features: [
      "Deep, rich color with natural sheen",
      "Heavy, elegant drape",
      "Blocks drafts and most light",
      "Ideal for bedrooms and lounges",
    ],
    care: "Dry clean recommended. Steam gently from the back; never press directly on the pile.",
  },
  {
    id: "natural-linen",
    name: "Natural Linen Blend",
    category: "Curtains",
    type: "Linen",
    kind: "linen",
    art: "curtain",
    photos: ["/images/products/natural-linen.jpg"],
    textureUrl: "/images/products/natural-linen-tex.jpg",
    tagline: "Relaxed texture and warm, natural light for everyday living.",
    description:
      "A linen-look blend with an honest, woven texture. It lets in a warm, soft light while keeping the room feeling calm, and it softens the more it is washed.",
    fabric: "Linen-cotton blend",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Wide 100" × 84"',
      "Made to measure",
    ],
    colors: [
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Sand", hex: "#c3ae8d" },
      { name: "Stone", hex: "#a9a398" },
      { name: "White", hex: "#f1eee8" },
      { name: "Olive", hex: "#7d8062" },
    ],
    features: [
      "Natural woven texture",
      "Soft, warm daylight",
      "Breathable and easy to live with",
      "Gets softer with every wash",
    ],
    care: "Machine wash cold, tumble dry low. Iron while slightly damp for a crisp look, or leave relaxed.",
  },
  {
    id: "made-to-measure-pleat",
    name: "Made-to-Measure Pleat",
    category: "Curtains",
    type: "Custom",
    kind: "linen",
    art: "curtain",
    tagline: "Tailored pleats and finishes for tall, wide or unusual windows.",
    description:
      "For bay windows, floor-to-ceiling glass or offices that need a uniform look. Choose your fabric, heading style (pinch pleat, wave or eyelet) and lining, and we cut and stitch it to fit.",
    fabric: "Your choice from the collection",
    sizes: ["Any width", 'Any drop up to 120"', "Track or rod fitting"],
    colors: [
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Stone", hex: "#a9a398" },
      { name: "Sage", hex: "#8a9378" },
      { name: "Clay", hex: "#b98b6d" },
    ],
    features: [
      "Pinch pleat, wave or eyelet headings",
      "Optional blackout or thermal lining",
      "Perfect for bay and floor-to-ceiling windows",
      "Consistent finish across a whole office",
    ],
    care: "Care depends on the fabric and lining chosen; we give you a care card with every order.",
  },
  {
    id: "day-night-duo",
    name: "Day & Night Duo",
    category: "Curtains",
    type: "Custom",
    kind: "blackout",
    art: "curtain",
    photos: ["/images/products/day-night-duo.jpg"],
    textureUrl: "/images/products/day-night-duo-tex.jpg",
    tagline:
      "A sheer and a blackout on one track: light by day, dark by night.",
    description:
      "A double-layer system pairing a sheer voile with a blackout curtain on a double rod or track. Draw the sheer for soft daytime privacy, then close the blackout when it is time to sleep.",
    fabric: "Sheer voile + blackout, double rod or track",
    sizes: ["Made to measure only"],
    colors: [
      { name: "Charcoal + Snow", hex: "#3d3d42" },
      { name: "Taupe + Champagne", hex: "#8c7b6b" },
      { name: "Navy + Snow", hex: "#27334d" },
    ],
    features: [
      "Two layers, total light control",
      "Privacy by day, darkness at night",
      "Matched colors, designed as a pair",
      "Installed on a double rod or track",
    ],
    care: "Wash each layer separately: cold and gentle for the sheer, dry clean or cold wash for the blackout.",
  },

  // ---------------- Wallpaper ----------------
  {
    id: "silk-damask",
    name: "Silk Damask Wallpaper",
    category: "Wallpaper",
    art: "wallpaper",
    photos: [
      "/images/products/silk-damask.jpg",
      "/images/products/silk-damask-2.jpg",
    ],
    tagline: "A classic damask with a soft sheen for formal rooms.",
    description:
      "A deep-embossed damask pattern with a silk-like finish that catches the light. Ideal for master bedrooms, dining rooms and formal lounges where you want quiet luxury.",
    fabric: "Vinyl-coated, scrubbable finish",
    sizes: ["Rolls of 10.05 m × 53 cm", "Made to measure panels"],
    colors: [
      { name: "Champagne", hex: "#d9c49a" },
      { name: "Ivory", hex: "#efe7d6" },
      { name: "Sage", hex: "#9aa48c" },
      { name: "Dove Grey", hex: "#b7b3ac" },
    ],
    features: [
      "Embossed damask with a soft sheen",
      "Scrubbable and fade-resistant",
      "Pattern-matched hanging by our team",
      "Suits feature walls or full rooms",
    ],
    care: "Wipe clean with a damp cloth. Avoid abrasive cleaners.",
  },
  {
    id: "geo-line",
    name: "Modern Geometric",
    category: "Wallpaper",
    art: "wallpaper",
    photos: [
      "/images/products/geo-line.jpg",

      "/images/products/geo-line-2.jpg",
    ],
    tagline: "Clean lines and quiet rhythm for contemporary spaces.",
    description:
      "A precise geometric print in muted tones that adds structure without shouting. Works beautifully in living rooms, offices and hallways, and pairs with plain curtains.",
    fabric: "Non-woven, breathable paper",
    sizes: ["Rolls of 10.05 m × 53 cm", "Made to measure panels"],
    colors: [
      { name: "Sand & Ink", hex: "#c9b795" },
      { name: "Sage & Cream", hex: "#a8b09a" },
      { name: "Blush & Taupe", hex: "#d3b3a3" },
    ],
    features: [
      "Crisp, modern print",
      "Breathable non-woven backing",
      "Easy to hang and to remove",
      "Hides minor wall imperfections",
    ],
    care: "Dust with a soft brush or wipe gently with a damp cloth.",
  },
  {
    id: "grasscloth",
    name: "Textured Grasscloth",
    category: "Wallpaper",
    art: "wallpaper",
    photos: ["/images/products/grasscloth.jpg"],
    tagline: "Natural fiber texture with warm, organic variation.",
    description:
      "A woven natural-fiber wallpaper with subtle color variation roll to roll. It brings warmth and depth to dining rooms, studies and bedrooms, and no two walls look identical.",
    fabric: "Natural sisal weave on paper backing",
    sizes: ["Made to measure panels"],
    colors: [
      { name: "Natural", hex: "#c9b184" },
      { name: "Wheat", hex: "#d8c8a4" },
      { name: "Clay", hex: "#b98a6d" },
    ],
    features: [
      "Real woven natural fiber",
      "Warm, organic texture",
      "Each panel subtly unique",
      "Sealed for easier cleaning",
    ],
    care: "Dust only; keep away from high humidity. We seal it on request.",
  },

  // ---------------- TV wall design ----------------
  {
    id: "fluted-tv-wall",
    name: "Fluted Wood TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/fluted-tv-wall.jpg",
      "/images/products/fluted-tv-wall-2.jpg",

      "/images/products/fluted-tv-wall-3.jpg",
    ],
    tagline: "Vertical wood slats with hidden LED around your screen.",
    description:
      "A full-height fluted wood panel wall built around your TV, with a recessed niche for the screen and warm LED coves. Measured and fitted in your home, with cables fully hidden.",
    fabric: "MDF slats in walnut or oak veneer",
    sizes: ["Made to measure", 'Fits screens 43" – 100"'],
    colors: [
      { name: "Walnut", hex: "#6b4a33" },
      { name: "Smoked Oak", hex: "#8a7358" },
      { name: "Matte Black", hex: "#2e2a26" },
    ],
    features: [
      "Recessed TV niche, cables hidden",
      "Warm LED coves included",
      "Vertical fluting adds height",
      "Designed, built and installed by us",
    ],
    care: "Dust with a dry cloth. LED driver is serviceable from below.",
  },
  {
    id: "marble-media-wall",
    name: "Marble-Look Media Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/marble-media-wall.jpg",
      "/images/products/marble-media-wall-2.jpg",
    ],
    tagline: "Large-format marble panels with a floating console.",
    description:
      "Porcelain marble-look panels with natural veining, a floating media console and discreet lighting. The luxury look of marble without the weight, cost or maintenance.",
    fabric: "Large-format porcelain panels + lacquered console",
    sizes: ["Made to measure", 'Fits screens 43" – 100"'],
    colors: [
      { name: "Calacatta", hex: "#e8e4da" },
      { name: "Emperador", hex: "#7a5f4b" },
      { name: "Travertine", hex: "#cfc0a5" },
    ],
    features: [
      "Realistic marble veining",
      "Floating console with storage",
      "Stain-proof and easy to clean",
      "Lighting designed with the wall",
    ],
    care: "Wipe panels with a damp cloth; polish the console with a soft dry cloth.",
  },
  {
    id: "matte-panel-wall",
    name: "Matte Panel TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/matte-panel-wall.jpg",
      "/images/products/matte-panel-wall-2.jpg",
    ],
    tagline: "Quiet, seamless panels for a minimal room.",
    description:
      "Flat matte panels with fine shadow gaps and a low-profile console. The screen sits almost flush against a clean wall — built for apartments and minimal interiors.",
    fabric: "Matte-lacquered MDF panels",
    sizes: ["Made to measure", 'Fits screens 43" – 85"'],
    colors: [
      { name: "Warm White", hex: "#efe9dd" },
      { name: "Greige", hex: "#b3a897" },
      { name: "Graphite", hex: "#4a4742" },
    ],
    features: [
      "Near-flush screen mounting",
      "Fine shadow-gap detailing",
      "Fingerprint-resistant matte finish",
      "Low-profile console included",
    ],
    care: "Wipe with a soft damp cloth; no polish needed.",
  },

  // ---------------- Molding ----------------
  {
    id: "crown-molding",
    name: "Classic Crown Molding",
    category: "Molding",
    art: "molding",
    photos: ["/images/products/crown-molding.jpg"],
    tagline: "A crisp transition where wall meets ceiling.",
    description:
      "Decorative crown molding in a range of profiles, from a simple cove to a layered traditional profile. It frames a room and makes ceilings feel higher and finished.",
    fabric: "Primed polyurethane (moisture-proof)",
    sizes: ["Profile heights 6 cm – 20 cm", "Any room length"],
    colors: [
      { name: "Brilliant White", hex: "#f4f1ea" },
      { name: "Soft Cream", hex: "#e9dfc8" },
    ],
    features: [
      "Won’t warp or crack like wood",
      "Painted to match your walls",
      "Mitered corners, caulked seams",
      "Suits villas and apartments",
    ],
    care: "Dust with a dry cloth; repaint only with water-based paint.",
  },
  {
    id: "wall-panel-molding",
    name: "Wall Panel Molding",
    category: "Molding",
    art: "molding",
    photos: [
      "/images/products/wall-panel-molding.jpg",
      "/images/products/wall-panel-molding-2.jpg",

      "/images/products/wall-panel-molding-3.jpg",
    ],
    tagline: "Picture-frame panels for dining rooms and hallways.",
    description:
      "Rectangular panel molding applied to walls in a balanced grid, then painted wall color or a contrast tone. It adds architecture to plain drywall in a single day.",
    fabric: "Primed polyurethane strips",
    sizes: ["Panel widths 40 cm – 90 cm", "Any wall height"],
    colors: [
      { name: "Brilliant White", hex: "#f4f1ea" },
      { name: "Greige", hex: "#b3a897" },
      { name: "Deep Green", hex: "#3d5244" },
    ],
    features: [
      "Adds instant architecture",
      "Paint any color you like",
      "Protects walls from scuffs",
      "Installed and caulked in a day",
    ],
    care: "Wipe with a damp cloth; touch up paint as needed.",
  },
  {
    id: "ceiling-trim",
    name: "Ceiling Trim & Coves",
    category: "Molding",
    art: "molding",
    photos: [
      "/images/products/ceiling-trim.jpg",
      "/images/products/ceiling-trim-2.jpg",
    ],
    tagline: "Tray ceilings and hidden cove lighting.",
    description:
      "Dropped tray ceilings with coves for hidden LED strips, plus cornice detailing. We design the layout with your lighting plan so the glow lands where it should.",
    fabric: "Moisture-proof boards + LED coves",
    sizes: ["Made to measure", "Works with recessed and cove lighting"],
    colors: [
      { name: "Brilliant White", hex: "#f4f1ea" },
      { name: "Warm Cream", hex: "#ece2cc" },
    ],
    features: [
      "Hidden, glare-free LED coves",
      "Makes ceilings feel higher",
      "Designed with your lighting plan",
      "Painted to match the ceiling",
    ],
    care: "Dust the cove line twice a year; LED is serviceable.",
  },

  // ---------------- Furniture ----------------
  {
    id: "velvet-sofa",
    name: "Velvet 3-Seater Sofa",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/velvet-sofa.jpg",
      "/images/products/velvet-sofa-2.jpg",

      "/images/products/velvet-sofa-3.jpg",
    ],
    tagline: "A deep, plush sofa upholstered in your choice of fabric.",
    description:
      "A generously proportioned three-seater built on a solid hardwood frame, upholstered in your choice of velvet, linen-look or performance fabric. Sized to your room and your comfort.",
    fabric: "Hardwood frame, high-resilience foam",
    sizes: ["Standard 220 cm", "Made to any width"],
    colors: [
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Sand", hex: "#c3ae8d" },
      { name: "Graphite", hex: "#4a4742" },
    ],
    features: [
      "Fabric and color of your choice",
      "Solid hardwood frame",
      "High-resilience, seat-friendly foam",
      "Delivered and placed by our team",
    ],
    care: "Vacuum weekly; spot-clean with a damp cloth and mild soap.",
  },
  {
    id: "upholstered-headboard",
    name: "Upholstered Headboard & Bed Base",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/upholstered-headboard.jpg",
      "/images/products/upholstered-headboard-2.jpg",
      "/images/products/upholstered-headboard-3.jpg",
      "/images/products/upholstered-headboard-4.jpg",
    ],
    tagline: "A tailored headboard wall for the bedroom.",
    description:
      "A padded headboard and matching bed base, built to your mattress size and upholstered to match or contrast your curtains. Optional wall panels behind for a hotel look.",
    fabric: "Plywood base, foam padding, your fabric",
    sizes: ["Single / Queen / King", "Made to any size"],
    colors: [
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Blush Rose", hex: "#c99a9a" },
      { name: "Midnight", hex: "#33415f" },
      { name: "Taupe", hex: "#8c7b6b" },
    ],
    features: [
      "Sized to your mattress",
      "Matches your curtains on request",
      "Optional full headboard wall",
      "Installed in your bedroom",
    ],
    care: "Vacuum with a soft brush; keep out of direct sun to avoid fading.",
  },
  {
    id: "accent-chairs",
    name: "Accent Chairs & Benches",
    category: "Furniture",
    art: "furniture",
    photos: ["/images/products/accent-chairs.jpg"],
    tagline: "One-off chairs and benches that finish a corner.",
    description:
      "Occasional chairs, bedroom benches and window seating, upholstered in the same fabrics as our curtains so the room feels designed as one piece.",
    fabric: "Hardwood frame, your choice of fabric",
    sizes: ["Made to order"],
    colors: [
      { name: "Mustard", hex: "#b88a2d" },
      { name: "Sage", hex: "#7f8f78" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Oat", hex: "#d8cbb4" },
    ],
    features: [
      "Coordinates with your curtains",
      "Any fabric from the collection",
      "Comfortable, everyday seating",
      "Delivered and placed by our team",
    ],
    care: "Spot-clean promptly; vacuum crevices monthly.",
  },
];

export const steps = [
  {
    title: "Choose",
    text: "Browse the collections, pick a style and color, and preview curtains in 3D.",
  },
  {
    title: "Measure",
    text: "We visit your home or office and measure every window and wall. It is free.",
  },
  {
    title: "Customize",
    text: "Choose fabric, finishes and fittings. We confirm everything before we start.",
  },
  {
    title: "Install",
    text: "We make and fit everything, and leave the room neat and ready.",
  },
];

/**
 * IMPORTANT: these are SAMPLE reviews so the layout is visible.
 * Replace them with real feedback from your customers and remove `sample: true`.
 */
export const testimonials = [
  {
    quote:
      "The blackout curtains changed our bedroom completely. The fabric feels expensive and they fit the window perfectly.",
    name: "Customer name",
    detail: "Bedroom, Noir Blackout",
    sample: true,
  },
  {
    quote:
      "They measured, explained the options without any pressure, and the installation was quick and tidy.",
    name: "Customer name",
    detail: "Living room, Cloud Sheer",
    sample: true,
  },
  {
    quote:
      "We did curtains and a TV wall with them and the finish is consistent across the whole room. It looks professional.",
    name: "Customer name",
    detail: "Villa, curtains + TV wall",
    sample: true,
  },
];

export const about = {
  image: "/images/products/silk-damask.jpg", // photo beside the story
  eyebrow: "Our story",
  title: "Good interiors are quietly the best part of a home.",
  paragraphs: [
    "We started with curtains — made to your window, not to an average one — and grew with the rooms our customers asked us to finish: wallpaper, TV walls, molding and custom furniture.",
    "Everything is measured on site, made to order and installed by our own team, so one visit is all it takes to pull a whole room together.",
  ],
  values: ["Made to measure", "Honest advice", "Tidy installation"],
};

/**
 * Before & after gallery on the home page.
 * Replace `before` with the real "before" photo when available, and set
 * filterBefore: false so it isn't desaturated.
 */
export const installations = [
  {
    id: "install-curtains",
    title: "Bedroom curtains",
    note: "Made-to-measure linen-look curtains, hung floor to ceiling",
    before: "/images/before/before-curtains.jpg",
    after: "/images/before/after-curtains.jpg",
    filterBefore: false,
  },
  {
    id: "install-molding",
    title: "Living room wall panels",
    note: "Classic molding grid, painted to match the wall",
    before: "/images/before/before-molding.jpg",
    after: "/images/before/after-molding.jpg",
    filterBefore: false,
  },
  {
    id: "install-walls",
    title: "Bedroom walls refreshed",
    note: "Wall prep, finish and detailing",
    before: "/images/before/before-walls.jpg",
    after: "/images/before/after-walls.jpg",
    filterBefore: false,
  },
];
