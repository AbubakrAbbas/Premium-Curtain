import { useId } from 'react'

/**
 * Self-drawn interior artwork (SVG) for the non-curtain collections, used until
 * real photos are added via `photos: [...]` on a product in siteData.js.
 * art:     'wallpaper' | 'tvwall' | 'molding' | 'furniture'
 * variant: 'closed' (full scene) | 'drawn' (alternate view) | 'detail' (close-up)
 */
export default function InteriorArt({ art = 'wallpaper', color = '#d9c49a', variant = 'closed', className = '' }) {
  const id = useId().replace(/:/g, '')
  const close = variant === 'detail'
  const alt = variant === 'drawn'

  const wall = `url(#${id}wall)`
  const defs = (
    <defs>
      <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f2ead9" />
        <stop offset="1" stopColor="#e2d5bd" />
      </linearGradient>
      <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#cbb691" />
        <stop offset="1" stopColor="#b39c74" />
      </linearGradient>
      <linearGradient id={`${id}shade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.16" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffe9b8" stopOpacity="0.9" />
        <stop offset="1" stopColor="#ffe9b8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}screen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3a4b63" />
        <stop offset="0.55" stopColor="#1d2634" />
        <stop offset="1" stopColor="#141a24" />
      </linearGradient>
      <pattern id={`${id}damask`} width="56" height="56" patternUnits="userSpaceOnUse">
        <rect width="56" height="56" fill={color} />
        <path
          d="M28 8c7 4 10 10 10 16s-3 12-10 16c-7-4-10-10-10-16s3-12 10-16zM28 16c-3.4 2.4-5 5.6-5 8.6s1.6 6.2 5 8.4c3.4-2.2 5-5.4 5-8.4s-1.6-6.2-5-8.6z"
          fill="#000"
          opacity="0.13"
        />
        <circle cx="28" cy="28" r="2.2" fill="#fff" opacity="0.22" />
        <path d="M0 0h56M0 56h56" stroke="#000" strokeOpacity="0.06" strokeWidth="1" />
      </pattern>
      <pattern id={`${id}geo`} width="48" height="48" patternUnits="userSpaceOnUse">
        <rect width="48" height="48" fill={color} />
        <path d="M0 24h48M24 0v48" stroke="#000" strokeOpacity="0.14" strokeWidth="2" />
        <path d="M0 0l48 48M48 0L0 48" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="24" cy="24" r="4" fill="#000" opacity="0.12" />
      </pattern>
      <pattern id={`${id}fiber`} width="9" height="9" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill={color} />
        <path d="M0 2h9M0 6.5h9" stroke="#000" strokeOpacity="0.12" strokeWidth="1.4" />
        <path d="M2 0v9M6.5 0v9" stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
      </pattern>
      <pattern id={`${id}slats`} width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill={color} />
        <rect x="0" width="7" height="16" fill="#000" opacity="0.18" />
        <rect x="7" width="2" height="16" fill="#fff" opacity="0.1" />
      </pattern>
      <pattern id={`${id}weave`} width="7" height="7" patternUnits="userSpaceOnUse">
        <rect width="7" height="7" fill={color} />
        <path d="M0 3.5h7M3.5 0v7" stroke="#000" strokeOpacity="0.1" strokeWidth="1.2" />
        <path d="M0 1.5h7M1.5 0v7" stroke="#fff" strokeOpacity="0.12" strokeWidth="0.8" />
      </pattern>
    </defs>
  )

  // ---------------- wallpaper ----------------
  if (art === 'wallpaper') {
    const pat = alt ? `url(#${id}geo)` : `url(#${id}damask)`
    if (close) {
      return (
        <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="wallpaper pattern close-up">
          {defs}
          <rect width="400" height="500" fill={pat} />
          <rect width="400" height="500" fill={alt ? `url(#${id}geo)` : `url(#${id}damask)`} transform="scale(2.4) translate(-58 -40)" />
          <rect width="400" height="500" fill={`url(#${id}shade)`} />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="wallpaper on a wall">
        {defs}
        <rect width="400" height="500" fill={wall} />
        <rect y="452" width="400" height="48" fill={`url(#${id}floor)`} />
        <rect y="446" width="400" height="7" fill="#f4ecdc" />
        {/* papered section */}
        <rect x="66" y="60" width="268" height="392" fill={pat} />
        <rect x="66" y="60" width="268" height="392" fill="none" stroke="#00000022" strokeWidth="2" />
        <rect x="66" y="60" width="268" height="392" fill={`url(#${id}shade)`} opacity="0.4" />
        {/* unpapered strip with paste brush */}
        <rect x="334" y="60" width="14" height="392" fill={wall} />
        {/* roll of wallpaper on the floor */}
        <g>
          <rect x="92" y="418" width="120" height="26" rx="13" fill={color} stroke="#00000026" />
          <ellipse cx="92" cy="431" rx="8" ry="13" fill="#efe6d3" stroke="#00000026" />
          <ellipse cx="92" cy="431" rx="3.5" ry="6" fill={color} />
          <rect x="150" y="404" width="46" height="10" rx="5" fill={color} stroke="#00000026" transform="rotate(-14 150 414)" />
        </g>
        <ellipse cx="200" cy="470" rx="140" ry="8" fill="#000" opacity="0.1" />
      </svg>
    )
  }

  // ---------------- tv wall ----------------
  if (art === 'tvwall') {
    const evening = alt
    if (close) {
      return (
        <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="TV wall panel close-up">
          {defs}
          <rect width="400" height="500" fill={`url(#${id}slats)`} />
          <rect width="400" height="500" fill={`url(#${id}weave)`} opacity="0.25" />
          <rect x="0" y="0" width="400" height="70" fill={`url(#${id}glow)`} opacity="evening ? 0.9 : 0.4" />
          <rect width="400" height="500" fill={`url(#${id}shade)`} />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="TV feature wall">
        {defs}
        <rect width="400" height="500" fill={wall} />
        <rect y="452" width="400" height="48" fill={`url(#${id}floor)`} />
        <rect y="446" width="400" height="7" fill="#f4ecdc" />
        {/* fluted panel field */}
        <rect x="40" y="52" width="320" height="396" fill={`url(#${id}slats)`} />
        <rect x="40" y="52" width="320" height="396" fill="none" stroke="#00000030" strokeWidth="3" />
        {evening && (
          <>
            <rect x="40" y="52" width="320" height="30" fill={`url(#${id}glow)`} />
            <rect x="40" y="418" width="320" height="30" fill={`url(#${id}glow)`} />
          </>
        )}
        {/* TV */}
        <rect x="102" y="96" width="196" height="118" rx="4" fill="#101318" />
        <rect x="108" y="102" width="184" height="106" rx="2" fill={`url(#${id}screen)`} />
        <path d="M108 208l60-62 40 34 44-52 40 46v42z" fill={evening ? '#2c3e58' : '#54677f'} opacity="0.7" />
        {/* console */}
        <rect x="76" y="330" width="248" height="12" rx="3" fill="#101318" opacity="0.25" />
        <rect x="80" y="300" width="240" height="46" rx="4" fill={color} stroke="#00000030" strokeWidth="2" />
        <rect x="80" y="300" width="240" height="10" rx="4" fill="#fff" opacity="0.12" />
        <line x1="200" y1="310" x2="200" y2="346" stroke="#00000030" strokeWidth="2" />
        <circle cx="192" cy="328" r="3" fill="#00000040" />
        <circle cx="208" cy="328" r="3" fill="#00000040" />
        <rect x="92" y="346" width="8" height="26" fill="#101318" opacity="0.5" />
        <rect x="300" y="346" width="8" height="26" fill="#101318" opacity="0.5" />
        <ellipse cx="200" cy="470" rx="150" ry="9" fill="#000" opacity="0.12" />
      </svg>
    )
  }

  // ---------------- molding ----------------
  if (art === 'molding') {
    if (close) {
      return (
        <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="molding profile close-up">
          {defs}
          <rect width="400" height="500" fill={wall} />
          {/* layered crown profile */}
          <g fill={color} stroke="#00000022">
            <rect x="0" y="40" width="400" height="16" />
            <rect x="0" y="62" width="400" height="10" />
            <rect x="0" y="78" width="400" height="22" rx="3" />
            <rect x="0" y="106" width="400" height="8" />
          </g>
          <g fill="#fff" opacity="0.35">
            <rect x="0" y="40" width="400" height="4" />
            <rect x="0" y="78" width="400" height="4" />
          </g>
          <rect x="0" y="0" width="400" height="40" fill={`url(#${id}shade)`} opacity="0.5" />
          <rect x="0" y="400" width="400" height="100" fill={`url(#${id}shade)`} />
        </svg>
      )
    }
    const panelFill = alt ? color : 'none'
    const panelStroke = alt ? 'none' : color
    return (
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="wall with molding panels">
        {defs}
        <rect width="400" height="500" fill={wall} />
        <rect y="452" width="400" height="48" fill={`url(#${id}floor)`} />
        {/* ceiling + crown */}
        <rect width="400" height="26" fill="#f7f2e7" />
        <rect x="0" y="26" width="400" height="14" fill={color} stroke="#0000001e" />
        <rect x="0" y="44" width="400" height="7" fill={color} stroke="#0000001e" />
        {/* picture-frame panels */}
        {[64, 210].map((x) => (
          <g key={x}>
            <rect x={x} y="80" width="126" height="150" fill={panelFill} opacity={alt ? 0.85 : 1} stroke={panelStroke} strokeWidth="5" />
            <rect x={x + 12} y="92" width="102" height="126" fill="none" stroke={panelStroke} strokeWidth="2" opacity="0.7" />
            <rect x={x} y="258" width="126" height="150" fill={panelFill} opacity={alt ? 0.7 : 1} stroke={panelStroke} strokeWidth="5" />
            <rect x={x + 12} y="270" width="102" height="126" fill="none" stroke={panelStroke} strokeWidth="2" opacity="0.7" />
          </g>
        ))}
        {/* baseboard */}
        <rect x="0" y="420" width="400" height="32" fill={color} stroke="#0000001e" />
        <ellipse cx="200" cy="470" rx="150" ry="8" fill="#000" opacity="0.08" />
      </svg>
    )
  }

  // ---------------- furniture ----------------
  if (art === 'furniture') {
    const bed = alt
    if (close) {
      return (
        <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="upholstery fabric close-up">
          {defs}
          <rect width="400" height="500" fill={`url(#${id}weave)`} />
          <rect width="400" height="500" fill={`url(#${id}fiber)`} opacity="0.5" />
          <rect x="120" y="0" width="14" height="500" fill="#000" opacity="0.1" />
          <rect x="266" y="0" width="14" height="500" fill="#000" opacity="0.1" />
          <rect width="400" height="500" fill={`url(#${id}shade)`} />
        </svg>
      )
    }
    if (bed) {
      // upholstered headboard wall + bed base
      return (
        <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="upholstered headboard and bed base">
          {defs}
          <rect width="400" height="500" fill={wall} />
          <rect y="452" width="400" height="48" fill={`url(#${id}floor)`} />
          {/* padded wall panels */}
          {[30, 130, 230].map((x) => (
            <g key={x}>
              <rect x={x} y="56" width="88" height="210" rx="8" fill={color} stroke="#00000026" strokeWidth="2" />
              <rect x={x + 8} y="64" width="72" height="194" rx="6" fill="#fff" opacity="0.08" />
            </g>
          ))}
          {/* headboard */}
          <rect x="86" y="150" width="228" height="130" rx="14" fill={color} stroke="#00000030" strokeWidth="2.5" />
          <rect x="96" y="160" width="208" height="110" rx="10" fill="#fff" opacity="0.1" />
          {/* mattress + bedding */}
          <rect x="56" y="300" width="288" height="58" rx="10" fill="#f2ecdf" stroke="#0000001c" strokeWidth="2" />
          <rect x="56" y="300" width="288" height="20" rx="10" fill="#fff" opacity="0.7" />
          <rect x="70" y="270" width="90" height="40" rx="9" fill="#faf6ee" stroke="#00000015" />
          <rect x="240" y="270" width="90" height="40" rx="9" fill="#faf6ee" stroke="#00000015" />
          <rect x="46" y="352" width="308" height="70" rx="8" fill={color} stroke="#00000030" strokeWidth="2" />
          <rect x="46" y="352" width="308" height="14" rx="7" fill="#fff" opacity="0.12" />
          <ellipse cx="200" cy="474" rx="160" ry="8" fill="#000" opacity="0.1" />
        </svg>
      )
    }
    // sofa scene
    return (
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="velvet sofa in a room">
        {defs}
        <rect width="400" height="500" fill={wall} />
        <rect y="452" width="400" height="48" fill={`url(#${id}floor)`} />
        <rect y="446" width="400" height="7" fill="#f4ecdc" />
        {/* wall art */}
        <rect x="150" y="70" width="100" height="70" rx="3" fill="#f6f0e3" stroke="#b08d57" strokeWidth="4" />
        <path d="M162 122l22-26 16 14 20-24 18 20v16h-76z" fill="#c9b795" />
        {/* floor lamp */}
        <rect x="330" y="140" width="5" height="240" fill="#8a7358" />
        <path d="M312 140h41l-8-36h-25z" fill={color} stroke="#00000022" />
        <ellipse cx="332" cy="120" rx="46" ry="30" fill={`url(#${id}glow)`} opacity="0.8" />
        <ellipse cx="332" cy="384" rx="26" ry="7" fill="#000" opacity="0.12" />
        {/* sofa */}
        <g stroke="#0000002b" strokeWidth="2">
          <rect x="52" y="238" width="240" height="86" rx="18" fill={color} />
          <rect x="40" y="268" width="34" height="108" rx="15" fill={color} />
          <rect x="270" y="268" width="34" height="108" rx="15" fill={color} />
          <rect x="66" y="300" width="106" height="70" rx="14" fill={color} />
          <rect x="176" y="300" width="106" height="70" rx="14" fill={color} />
        </g>
        <rect x="66" y="240" width="212" height="14" rx="7" fill="#fff" opacity="0.14" />
        <rect x="78" y="252" width="62" height="42" rx="10" fill="#efe6d3" stroke="#00000018" transform="rotate(-6 78 252)" />
        <rect x="200" y="252" width="62" height="42" rx="10" fill="#d9c49a" stroke="#00000018" transform="rotate(5 200 252)" />
        <rect x="60" y="368" width="10" height="22" rx="3" fill="#4a3a28" />
        <rect x="274" y="368" width="10" height="22" rx="3" fill="#4a3a28" />
        {/* coffee table */}
        <ellipse cx="200" cy="416" rx="72" ry="13" fill={color} stroke="#0000002b" strokeWidth="2" />
        <rect x="192" y="416" width="16" height="30" fill="#4a3a28" />
        <ellipse cx="200" cy="450" rx="30" ry="6" fill="#4a3a28" />
        <ellipse cx="200" cy="468" rx="150" ry="9" fill="#000" opacity="0.1" />
      </svg>
    )
  }

  return null
}
