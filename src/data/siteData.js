/**
 * ONE FILE TO EDIT: business details, products, collections, copy.
 * Everything on the website reads from here.
 */

export const business = {
  name: "Premium Curtain",
  tagline: "Curtains, wallpaper, TV walls, molding & custom furniture",
  city: "Dubai, UAE",
  address: "Dragon Mart, Dubai, UAE", // <- confirm exact shop/location
  phone: "+971 56 840 9265",
  whatsapp: "971568409265", // digits only, no spaces, no +
  email: "asadcurtainsuae@gmail.com",
  hours: [
    ["Monday – Saturday", "10:00 am – 10:00 pm"],
    ["Sunday", "By appointment"],
  ],
  mapQuery: "Dragon Mart, Dubai, UAE",
  social: {
    instagram: "https://www.instagram.com/premium_curtains_dubai_",
    facebook: "https://www.facebook.com/share/14pTfSjyW2x/?mibextid=wwXIfr",
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
 * The opening-curtain intro. Set `enabled: false` to turn it off.
 * (Skipped automatically for visitors who prefer reduced motion.)
 */
export const intro = {
  enabled: true,
  fabric: "#3e2c1e",
};

export const hero = {
  eyebrow: "Curtains · Wallpaper · TV Walls · Molding · Furniture — Dubai",
  title: "A home that feels finished, down to the last detail.",
  accentWord: "finished",
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

export const collections = [
  {
    id: "curtains",
    eyebrow: "Curtains & blinds",
    title: "Curtains, made to measure.",
    lead: "Blackout, sheer, printed and plain — measured, stitched and hung by our team. Tap a curtain for details.",
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
    lead: "Fluted wood, stone-look panels and hidden lighting — designed around your TV and your room, built and fitted in place.",
    tour: "TV walls built around your screen",
  },
  {
    id: "molding",
    eyebrow: "Molding & trim",
    title: "Detail where it matters.",
    lead: "Crown molding, wall paneling and ceiling coves that give plain rooms a tailored, finished feel.",
    tour: "Molding that sharpens a room",
  },
  {
    id: "furniture",
    eyebrow: "Custom furniture",
    title: "Furniture made for your space.",
    lead: "Sofas, beds and seating in your choice of fabric, built to your size and style.",
    tour: "Furniture made to order",
  },
];

/**
 * art → fallback illustration type ('curtain' | 'wallpaper' | 'tvwall' | 'molding' | 'furniture')
 * photos (optional) → image URLs; shown instead of the artwork.
 */
export const products = [
  {
    id: "natural-linen",
    name: "Botanical Print Curtains",
    category: "Curtains",
    type: "Linen",
    art: "curtain",
    photos: ["/images/products/natural-linen.webp"],
    tagline: "Leaf-print panels in sage and cream, tied back with tassels.",
    description:
      "A fresh botanical print on a linen-look base — sage green and cream panels that brighten a room without overwhelming it. Finished with eyelet headings and matching tie-backs with tassels.",
    fabric: "Linen-look polyester blend",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Wide 100" × 84"',
      "Made to measure",
    ],
    colors: [
      { name: "Sage + Cream", hex: "#a8b09a" },
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Sand", hex: "#c3ae8d" },
      { name: "Stone", hex: "#a9a398" },
      { name: "Olive", hex: "#7d8062" },
    ],
    features: [
      "Luxury two-tone options",
      "Matching tie-backs with tassels",
      "Soft, warm daylight",
      "Easy to live with and machine washable",
    ],
    care: "Machine wash cold, tumble dry low. Iron while slightly damp for a crisp look, or leave relaxed.",
  },
  {
    id: "noir-blackout",
    name: "Slate Blackout Curtains",
    category: "Curtains",
    type: "Blackout",
    art: "curtain",
    photos: ["/images/products/blackout.webp"],
    tagline: "Blue-grey eyelet panels that block the light and the heat.",
    description:
      "Plain-dyed blackout curtains in a soft blue-grey, finished with easy-glide eyelets. The triple-weave fabric blocks almost all daylight, helps keep the room cooler in summer, and hangs in clean, even folds.",
    fabric: "Triple-weave polyester with thermal backing",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Wide 100" × 84"',
      "Made to measure",
    ],
    colors: [
      { name: "Blue Grey", hex: "#8fa3b0" },
      { name: "Charcoal", hex: "#3d3d42" },
      { name: "Warm Taupe", hex: "#8c7b6b" },
      { name: "Ivory", hex: "#e9e2d4" },
      { name: "Deep Sage", hex: "#5d6b5a" },
    ],
    features: [
      "Blocks nearly all daylight",
      "Thermal lining helps insulate",
      "Easy-glide eyelet heading",
      "Wrinkle-resistant, easy to hang",
    ],
    care: "Machine wash cold on a gentle cycle or dry clean. Steam on low heat; do not bleach.",
  },
  {
    id: "cloud-sheer",
    name: "Wave Sheer Curtains",
    category: "Curtains",
    type: "Sheer",
    art: "curtain",
    photos: [
      "/images/products/cloud-sheer.webp",
      "/images/products/cloud-sheer-2.webp",
    ],
    tagline: "A soft wave of sheer across the whole window.",
    description:
      "A fine voile hung in a continuous wave — it diffuses harsh sun into a gentle glow and gives daytime privacy without closing the room in. Pair it with side drapes for evenings.",
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
      "Wave heading for a soft ripple",
      "Diffuses harsh sunlight",
      "Daytime privacy without darkness",
      "Pairs beautifully with side drapes",
    ],
    care: "Hand wash or machine wash cold in a garment bag. Line dry and iron on low.",
  },
  {
    id: "royal-velvet",
    name: "Two-Tone Eyelet Drapes",
    category: "Curtains",
    type: "Velvet",
    art: "curtain",
    photos: ["/images/products/royal-velvet.webp"],
    tagline: "Chocolate and taupe panels with a dressed, hold-back look.",
    description:
      "Heavy, soft-touch panels in two complementary tones — deep chocolate and warm taupe — hung on eyelets and styled with hold-backs for a tailored window. The dense fabric blocks drafts and most light on its own.",
    fabric: "Dense-pile polyester velvet",
    sizes: [
      'Standard 52" × 84"',
      'Standard 52" × 96"',
      'Wide 100" × 96"',
      "Made to measure",
    ],
    colors: [
      { name: "Chocolate + Taupe", hex: "#5b4636" },
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Navy", hex: "#1f2d4f" },
      { name: "Mustard", hex: "#b88a2d" },
    ],
    features: [
      "Two-tone panel design",
      "Heavy, elegant drape",
      "Blocks drafts and most light",
      "Optional hold-backs and sheers",
    ],
    care: "Dry clean recommended. Steam gently from the back; never press directly on the pile.",
  },
  {
    id: "day-night-duo",
    name: "Pinch Pleat & Sheer Duo",
    category: "Curtains",
    type: "Custom",
    art: "curtain",
    photos: ["/images/products/day-night-duo.webp"],
    tagline: "Soft beige pinch pleats layered over a white sheer.",
    description:
      "A classic pairing: full-length beige pinch-pleat drapes in front of a white sheer on a double track. The sheer filters daytime light; close the drapes for privacy and darkness at night.",
    fabric: "Brushed weave drapes + fine voile sheer",
    sizes: ["Made to measure only"],
    colors: [
      { name: "Beige + White", hex: "#cbb59a" },
      { name: "Taupe + Champagne", hex: "#8c7b6b" },
      { name: "Charcoal + Snow", hex: "#3d3d42" },
    ],
    features: [
      "Two layers on one double track",
      "Pinch-pleat heading on the drapes",
      "Privacy by day, darkness at night",
      "Measured and fitted by our team",
    ],
    care: "Wash each layer separately: cold and gentle for the sheer, dry clean or cold wash for the drapes.",
  },
  {
    id: "made-to-measure-pleat",
    name: "Made-to-Measure Drapes & Sheer",
    category: "Curtains",
    type: "Custom",
    art: "curtain",
    photos: ["/images/products/image.webp"],
    tagline: "Taupe drapes with hold-backs over a full-width sheer.",
    description:
      "A real living-room install: floor-to-ceiling taupe drapes, tailored with banded hold-backs, layered over a full-width white sheer on a double track. We measure, make and hang this exact setup for your window — in your choice of fabric and color.",
    fabric: "Your choice from the collection",
    sizes: ["Any width", 'Any drop up to 120"', "Track or rod fitting"],
    colors: [
      { name: "Taupe", hex: "#b3a08c" },
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Stone", hex: "#a9a398" },
      { name: "Sage", hex: "#8a9378" },
    ],
    features: [
      "Drapes with banded hold-backs",
      "Full-width sheer on a double track",
      "Any fabric, any color, your size",
      "Perfect for wide and tall windows",
    ],
    care: "Care depends on the fabric chosen; we give you a care card with every order.",
  },

  // ---------------- Wallpaper ----------------
  {
    id: "silk-damask",
    name: "Bronze Marble-Texture Wallpaper",
    category: "Wallpaper",
    art: "wallpaper",
    photos: [
      "/images/products/silk-damask.webp",
      "/images/products/silk-damask-2.webp",
    ],
    tagline: "Swirling bronze texture for a quiet, luxurious wall.",
    description:
      "A deep, marble-like swirl in bronze and grey with a soft sheen that catches the light. Ideal for master bedrooms and formal lounges where you want texture without a busy pattern.",
    fabric: "Vinyl-coated, scrubbable finish",
    sizes: ["Rolls of 10.05 m × 53 cm", "Made to measure panels"],
    colors: [
      { name: "Bronze", hex: "#b0977a" },
      { name: "Champagne", hex: "#d9c49a" },
      { name: "Dove Grey", hex: "#b7b3ac" },
      { name: "Ivory", hex: "#efe7d6" },
    ],
    features: [
      "Deep embossed swirl texture",
      "Scrubbable and fade-resistant",
      "Pattern-matched hanging by our team",
      "Suits feature walls or full rooms",
    ],
    care: "Wipe clean with a damp cloth. Avoid abrasive cleaners.",
  },
  {
    id: "geo-line",
    name: "Modern Geometric Wallpaper",
    category: "Wallpaper",
    art: "wallpaper",
    photos: [
      "/images/products/geo-line.webp",
      "/images/products/geo-line-2.webp",
    ],
    tagline: "Fine grey lines over a soft textured base.",
    description:
      "A precise geometric line print in muted grey tones that adds structure without shouting. Works beautifully behind sofas, in offices and hallways, and pairs with plain curtains.",
    fabric: "Non-woven, breathable paper",
    sizes: ["Rolls of 10.05 m × 53 cm", "Made to measure panels"],
    colors: [
      { name: "Grey & Ivory", hex: "#b7b3ac" },
      { name: "Sand & Ink", hex: "#c9b795" },
      { name: "Sage & Cream", hex: "#a8b09a" },
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
    name: "Gold-Line Wallpaper Rolls",
    category: "Wallpaper",
    art: "wallpaper",
    photos: ["/images/products/grasscloth.webp"],
    tagline: "Soft-tone paper with fine gold lines, supplied in rolls.",
    description:
      "A refined wallpaper in pale grey, blush and ivory with fine gold line work, supplied ready to hang. We measure your walls, match the pattern and install it seam to seam.",
    fabric: "Non-woven wallpaper with metallic line print",
    sizes: ["Rolls of 10.05 m × 53 cm", "Made to measure panels"],
    colors: [
      { name: "Pale Grey + Gold", hex: "#d5d3cf" },
      { name: "Blush + Gold", hex: "#e8cfc4" },
      { name: "Ivory + Gold", hex: "#efe7d6" },
    ],
    features: [
      "Fine metallic gold lines",
      "Supplied in standard rolls",
      "Pattern-matched installation",
      "Scrubbable finish",
    ],
    care: "Wipe gently with a damp cloth.",
  },

  // ---------------- TV wall design ----------------
  {
    id: "fluted-tv-wall",
    name: "Fluted Wood TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/fluted-tv-wall.webp",
      "/images/products/fluted-tv-wall-2.webp",
      "/images/products/fluted-tv-wall-3.webp",
    ],
    tagline: "Full-height wood slats with floating display shelves.",
    description:
      "A floor-to-ceiling fluted wood panel wall built around your TV, with open display shelves and warm spotlights above. Cables are fully hidden and everything is measured and fitted in your home.",
    fabric: "MDF slats in walnut or oak veneer",
    sizes: ["Made to measure", 'Fits screens 43" – 100"'],
    colors: [
      { name: "Walnut", hex: "#6b4a33" },
      { name: "Smoked Oak", hex: "#8a7358" },
      { name: "Matte Black", hex: "#2e2a26" },
    ],
    features: [
      "Recessed TV mount, cables hidden",
      "Floating display shelves included",
      "Warm LED or spot lighting",
      "Designed, built and installed by us",
    ],
    care: "Dust with a dry cloth. Lighting is serviceable from below.",
  },
  {
    id: "marble-media-wall",
    name: "Travertine & Oak TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/marble-media-wall.webp",
      "/images/products/marble-media-wall-2.webp",
    ],
    tagline:
      "Stone-look panels framed in fluted wood, with a floating console.",
    description:
      "Large-format travertine-look panels as the centerpiece, framed by fluted wood columns and paired with a floating console and black sconce lights. The luxury look of natural stone without the weight, cost or maintenance.",
    fabric: "Porcelain stone-look panels + oak veneer",
    sizes: ["Made to measure", 'Fits screens 43" – 100"'],
    colors: [
      { name: "Travertine", hex: "#cfc0a5" },
      { name: "Calacatta", hex: "#e8e4da" },
      { name: "Emperador", hex: "#7a5f4b" },
    ],
    features: [
      "Realistic stone veining",
      "Fluted wood framing both sides",
      "Floating console with storage",
      "Stain-proof and easy to clean",
    ],
    care: "Wipe panels with a damp cloth; dust the fluted columns with a dry cloth.",
  },
  {
    id: "matte-panel-wall",
    name: "Designer Panel TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/matte-panel-wall.webp",
      "/images/products/tvunitextra1.webp",
      "/images/products/tvunitextra2.webp",
      "/images/products/tvunitextra3.webp",
      "/images/products/matte-panel-wall-2.webp",
    ],
    tagline: "Full-height decorative panels with integrated wall lights.",
    description:
      "Full-height decorative wall panels with a subtle vertical texture, designer wall lights and a long floating console. A clean, finished backdrop for both the TV and the room — built for apartments and modern interiors.",
    fabric: "Embossed decorative panels + lacquered console",
    sizes: ["Made to measure", 'Fits screens 43" – 85"'],
    colors: [
      { name: "Warm White", hex: "#efe9dd" },
      { name: "Greige", hex: "#b3a897" },
      { name: "Graphite", hex: "#4a4742" },
    ],
    features: [
      "Full-height decorative panels",
      "Designer wall lights included",
      "Long floating console with storage",
      "Fingerprint-resistant finish",
    ],
    care: "Wipe with a soft damp cloth; no polish needed.",
  },

  {
    id: "matte-panel-wall",
    name: "Designer Panel TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/tvunitextra1.webp",
      "/images/products/tvunitextra2.webp",
      "/images/products/tvunitextra3.webp",
      "/images/products/matte-panel-wall-2.webp",
    ],
    tagline: "Full-height decorative panels with integrated wall lights.",
    description:
      "Full-height decorative wall panels with a subtle vertical texture, designer wall lights and a long floating console. A clean, finished backdrop for both the TV and the room — built for apartments and modern interiors.",
    fabric: "Embossed decorative panels + lacquered console",
    sizes: ["Made to measure", 'Fits screens 43" – 85"'],
    colors: [
      { name: "Warm White", hex: "#efe9dd" },
      { name: "Greige", hex: "#b3a897" },
      { name: "Graphite", hex: "#4a4742" },
    ],
    features: [
      "Full-height decorative panels",
      "Designer wall lights included",
      "Long floating console with storage",
      "Fingerprint-resistant finish",
    ],
    care: "Wipe with a soft damp cloth; no polish needed.",
  },

  {
    id: "matte-panel-wall",
    name: "Designer Panel TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/tvunitextra2.webp",
      "/images/products/tvunitextra3.webp",
      "/images/products/matte-panel-wall-2.webp",
    ],
    tagline: "Full-height decorative panels with integrated wall lights.",
    description:
      "Full-height decorative wall panels with a subtle vertical texture, designer wall lights and a long floating console. A clean, finished backdrop for both the TV and the room — built for apartments and modern interiors.",
    fabric: "Embossed decorative panels + lacquered console",
    sizes: ["Made to measure", 'Fits screens 43" – 85"'],
    colors: [
      { name: "Warm White", hex: "#efe9dd" },
      { name: "Greige", hex: "#b3a897" },
      { name: "Graphite", hex: "#4a4742" },
    ],
    features: [
      "Full-height decorative panels",
      "Designer wall lights included",
      "Long floating console with storage",
      "Fingerprint-resistant finish",
    ],
    care: "Wipe with a soft damp cloth; no polish needed.",
  },

  {
    id: "matte-panel-wall",
    name: "Designer Panel TV Wall",
    category: "TV Wall Design",
    art: "tvwall",
    photos: [
      "/images/products/tvunitextra3.png",
      "/images/products/matte-panel-wall-2.webp",
    ],
    tagline: "Full-height decorative panels with integrated wall lights.",
    description:
      "Full-height decorative wall panels with a subtle vertical texture, designer wall lights and a long floating console. A clean, finished backdrop for both the TV and the room — built for apartments and modern interiors.",
    fabric: "Embossed decorative panels + lacquered console",
    sizes: ["Made to measure", 'Fits screens 43" – 85"'],
    colors: [
      { name: "Warm White", hex: "#efe9dd" },
      { name: "Greige", hex: "#b3a897" },
      { name: "Graphite", hex: "#4a4742" },
    ],
    features: [
      "Full-height decorative panels",
      "Designer wall lights included",
      "Long floating console with storage",
      "Fingerprint-resistant finish",
    ],
    care: "Wipe with a soft damp cloth; no polish needed.",
  },

  // ---------------- Molding ----------------
  {
    id: "crown-molding",
    name: "Cove Ceiling & Crown Molding",
    category: "Molding",
    art: "molding",
    photos: ["/images/products/crown-molding.webp"],
    tagline: "A dropped ceiling with hidden LED glow and classic crown trim.",
    description:
      "A tray ceiling with a hidden LED cove and layered crown molding — the warm glow makes the room feel taller and the detailing finishes it. Painted to match your ceiling, designed around your lighting plan.",
    fabric: "Moisture-proof boards + LED coves",
    sizes: ["Made to measure", "Works with recessed and cove lighting"],
    colors: [
      { name: "Brilliant White", hex: "#f4f1ea" },
      { name: "Warm Cream", hex: "#ece2cc" },
    ],
    features: [
      "Hidden, glare-free LED coves",
      "Layered crown profiles",
      "Makes ceilings feel higher",
      "Painted to match the ceiling",
    ],
    care: "Dust the cove line twice a year; LED is serviceable.",
  },
  {
    id: "wall-panel-molding",
    name: "Classic Wall Panel Molding",
    category: "Molding",
    art: "molding",
    photos: [
      "/images/products/wall-panel-molding.webp",
      "/images/products/wall-panel-molding-2.webp",
      "/images/products/wall-panel-molding-3.webp",
      "/images/products/wall-panel-molding-4.webp",
    ],
    tagline: "Picture-frame panels, painted to match your wall.",
    description:
      "Rectangular panel molding applied to walls in a balanced grid, then painted wall color or a contrast tone. From clean all-white grids to soft greige — it adds architecture to plain drywall in a single day.",
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
    name: "Designer Wall Molding & LED",
    category: "Molding",
    art: "molding",
    photos: [
      "/images/products/ceiling-trim.webp",
      "/images/products/ceiling-trim-2.webp",
    ],
    tagline: "Paneled walls with fluted sections and warm LED inlays.",
    description:
      "A full designer wall treatment: framed panels, fluted strips and continuous LED lines set into the moldings. We lay out the design with your lighting so the glow lands exactly where it should.",
    fabric: "Primed polyurethane + integrated LED strips",
    sizes: ["Made to measure", "Any wall length"],
    colors: [
      { name: "Brilliant White", hex: "#f4f1ea" },
      { name: "Warm Cream", hex: "#ece2cc" },
    ],
    features: [
      "LED lines built into the molding",
      "Framed and fluted panel mix",
      "Designed with your lighting plan",
      "Installed and finished by our team",
    ],
    care: "Dust with a dry cloth; LED strips are serviceable.",
  },

  // ---------------- Furniture ----------------
  {
    id: "velvet-sofa",
    name: "Velvet Sofa Set",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/velvet-sofa.webp",
      "/images/products/velvet-sofa-2.webp",
      "/images/products/velvet-sofa-3.webp",
    ],
    tagline: "Rust-orange velvet seating with a matching bench table.",
    description:
      "Deep, plush seating in a rich rust velvet — sofas styled with bolsters and scatter cushions, plus a matching upholstered bench-coffee table. Built on hardwood frames, upholstered in your choice of fabric and color.",
    fabric: "Hardwood frame, high-resilience foam",
    sizes: ["Standard 220 cm", "Made to any width"],
    colors: [
      { name: "Rust", hex: "#b4552d" },
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Sand", hex: "#c3ae8d" },
    ],
    features: [
      "Fabric and color of your choice",
      "Solid hardwood frame",
      "Bench-coffee table to match",
      "Delivered and placed by our team",
    ],
    care: "Vacuum weekly; spot-clean with a damp cloth and mild soap.",
  },
  {
    id: "upholstered-headboard",
    name: "Scalloped Upholstered Bed",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/upholstered-headboard.webp",
      "/images/products/upholstered-headboard-2.webp",
      "/images/products/upholstered-headboard-3.webp",
      "/images/products/upholstered-headboard-4.webp",
    ],
    tagline: "A channel-tufted, scalloped headboard in soft blush.",
    description:
      "A statement headboard with channel tufting in a fan scallop, paired with a matching upholstered bed base. Built to your mattress size, in your choice of fabric — from soft blush to deep midnight.",
    fabric: "Plywood base, foam padding, your fabric",
    sizes: ["Single / Queen / King", "Made to any size"],
    colors: [
      { name: "Blush", hex: "#c99a9a" },
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Midnight", hex: "#33415f" },
      { name: "Taupe", hex: "#8c7b6b" },
    ],
    features: [
      "Sized to your mattress",
      "Channel-tufted scallop design",
      "Matching upholstered base",
      "Installed in your bedroom",
    ],
    care: "Vacuum with a soft brush; keep out of direct sun to avoid fading.",
  },
  {
    id: "accent-chairs",
    name: "Fabric Armchairs & Sofa",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/accent-chairs.webp",
      "/images/products/dress1-1.webp",
      "/images/products/dress1-2.webp",
      "/images/products/dress1-3.webp",
    ],
    tagline: "Cream fabric seating with dark wood legs.",
    description:
      "Soft cream armchairs and a matching sofa on tapered wood legs — comfortable everyday seating that coordinates with the same fabrics as our curtains, so the room feels designed as one piece.",
    fabric: "Hardwood frame, your choice of fabric",
    sizes: ["Made to order"],
    colors: [
      { name: "Cream", hex: "#e8e0d2" },
      { name: "Oat", hex: "#d8cbb4" },
      { name: "Sage", hex: "#7f8f78" },
      { name: "Mustard", hex: "#b88a2d" },
    ],
    features: [
      "Coordinates with your curtains",
      "Any fabric from the collection",
      "Comfortable, everyday seating",
      "Delivered and placed by our team",
    ],
    care: "Spot-clean promptly; vacuum crevices monthly.",
  },

  {
    id: "velvet-sofa",
    name: "Velvet Sofa Set",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/dress1-1.webp",
      "/images/products/velvet-sofa-2.webp",
      "/images/products/velvet-sofa-3.webp",
    ],
    tagline: "Rust-orange velvet seating with a matching bench table.",
    description:
      "Deep, plush seating in a rich rust velvet — sofas styled with bolsters and scatter cushions, plus a matching upholstered bench-coffee table. Built on hardwood frames, upholstered in your choice of fabric and color.",
    fabric: "Hardwood frame, high-resilience foam",
    sizes: ["Standard 220 cm", "Made to any width"],
    colors: [
      { name: "Rust", hex: "#b4552d" },
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Sand", hex: "#c3ae8d" },
    ],
    features: [
      "Fabric and color of your choice",
      "Solid hardwood frame",
      "Bench-coffee table to match",
      "Delivered and placed by our team",
    ],
    care: "Vacuum weekly; spot-clean with a damp cloth and mild soap.",
  },

  {
    id: "velvet-sofa",
    name: "Velvet Sofa Set",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/dress1-2.webp",
      "/images/products/velvet-sofa-2.webp",
      "/images/products/velvet-sofa-3.webp",
    ],
    tagline: "Rust-orange velvet seating with a matching bench table.",
    description:
      "Deep, plush seating in a rich rust velvet — sofas styled with bolsters and scatter cushions, plus a matching upholstered bench-coffee table. Built on hardwood frames, upholstered in your choice of fabric and color.",
    fabric: "Hardwood frame, high-resilience foam",
    sizes: ["Standard 220 cm", "Made to any width"],
    colors: [
      { name: "Rust", hex: "#b4552d" },
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Sand", hex: "#c3ae8d" },
    ],
    features: [
      "Fabric and color of your choice",
      "Solid hardwood frame",
      "Bench-coffee table to match",
      "Delivered and placed by our team",
    ],
    care: "Vacuum weekly; spot-clean with a damp cloth and mild soap.",
  },

  {
    id: "velvet-sofa",
    name: "Velvet Sofa Set",
    category: "Furniture",
    art: "furniture",
    photos: [
      "/images/products/dress1-3.webp",
      "/images/products/velvet-sofa-2.webp",
      "/images/products/velvet-sofa-3.webp",
    ],
    tagline: "Rust-orange velvet seating with a matching bench table.",
    description:
      "Deep, plush seating in a rich rust velvet — sofas styled with bolsters and scatter cushions, plus a matching upholstered bench-coffee table. Built on hardwood frames, upholstered in your choice of fabric and color.",
    fabric: "Hardwood frame, high-resilience foam",
    sizes: ["Standard 220 cm", "Made to any width"],
    colors: [
      { name: "Rust", hex: "#b4552d" },
      { name: "Emerald", hex: "#2f5d50" },
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Sand", hex: "#c3ae8d" },
    ],
    features: [
      "Fabric and color of your choice",
      "Solid hardwood frame",
      "Bench-coffee table to match",
      "Delivered and placed by our team",
    ],
    care: "Vacuum weekly; spot-clean with a damp cloth and mild soap.",
  },
];

export const steps = [
  {
    title: "Choose",
    text: "Browse the collections and pick a style you love.",
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
    detail: "Bedroom, blackout curtains",
    sample: true,
  },
  {
    quote:
      "They measured, explained the options without any pressure, and the installation was quick and tidy.",
    name: "Customer name",
    detail: "Living room, sheers",
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
  image: "/images/products/silk-damask.webp",
  eyebrow: "Our story",
  title: "Good interiors are quietly the best part of a home.",
  paragraphs: [
    "We started with curtains — made to your window, not to an average one — and grew with the rooms our customers asked us to finish: wallpaper, TV walls, molding and custom furniture.",
    "Everything is measured on site, made to order and installed by our own team, so one visit is all it takes to pull a whole room together.",
  ],
  values: ["Made to measure", "Honest advice", "Tidy installation"],
};

export const installations = [
  {
    id: "install-curtains",
    title: "Bedroom curtains",
    note: "Made-to-measure curtains, hung floor to ceiling",
    before: "/images/before/before-curtains.webp",
    after: "/images/before/after-curtains.webp",
    filterBefore: false,
  },
  {
    id: "install-molding",
    title: "Living room wall panels",
    note: "Classic molding grid, painted to match the wall",
    before: "/images/before/before-molding.webp",
    after: "/images/before/after-molding.webp",
    filterBefore: false,
  },
  {
    id: "install-walls",
    title: "Bedroom walls refreshed",
    note: "Wall prep, finish and detailing",
    before: "/images/before/before-walls.webp",
    after: "/images/before/after-walls.webp",
    filterBefore: false,
  },
];

/**
 * "Our Satisfied Clients" videos (public/videos/). Loops automatically.
 */
export const clientVideos = [
  { id: "client-5", src: "/videos/client-5.mp4" },
  { id: "client-6", src: "/videos/client-6.mp4" },
  { id: "client-7", src: "/videos/client-7.mp4" },
  { id: "client-1", src: "/videos/client-1.mp4" },
  { id: "client-2", src: "/videos/client-2.mp4" },
  { id: "client-3", src: "/videos/client-3.mp4" },
  { id: "client-4", src: "/videos/client-4.mp4" },
];
