import { useId } from 'react'

/**
 * Self-drawn curtain artwork (SVG) used as product imagery until you add real photos.
 * variant: 'closed' | 'drawn' (curtains pulled open) | 'detail' (close-up of the fabric)
 * kind:    'blackout' | 'sheer' | 'velvet' | 'linen'
 *
 * To use real photos instead, add a `photos: [...]` array to a product in siteData.js.
 */
export default function CurtainArt({ color = '#8c7b6b', kind = 'blackout', variant = 'closed', className = '' }) {
  const id = useId().replace(/:/g, '')
  const sheer = kind === 'sheer'
  const velvet = kind === 'velvet'
  const linen = kind === 'linen'

  const dims = {
    closed: { L: [58, 148], R: [194, 148], pleat: 22 },
    drawn: { L: [44, 86], R: [270, 86], pleat: 15 },
  }[variant]

  const panel = (x, w, key) => (
    <g key={key} opacity={sheer ? 0.66 : 1}>
      <rect x={x} y="70" width={w} height="384" rx="3" fill={color} />
      <rect x={x} y="70" width={w} height="384" rx="3" fill={`url(#${id}pleat)`} />
      <rect x={x} y="70" width={w} height="384" rx="3" fill={`url(#${id}weave)`} />
      {velvet && <rect x={x} y="70" width={w} height="384" rx="3" fill={`url(#${id}sheen)`} />}
      <rect x={x} y="70" width={w} height="384" rx="3" fill={`url(#${id}fall)`} />
    </g>
  )

  return (
    <svg
      viewBox="0 0 400 500"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${kind} curtain illustration`}
    >
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4ede2" />
          <stop offset="1" stopColor="#e7dccb" />
        </linearGradient>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#ffe9c4" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3c2a8" />
          <stop offset="1" stopColor="#bfab8d" />
        </linearGradient>
        {/* repeating vertical folds */}
        <linearGradient
          id={`${id}pleat`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          x2={variant === 'detail' ? 64 : dims.pleat}
          y1="0"
          y2="0"
          spreadMethod="repeat"
        >
          <stop offset="0" stopColor="#000" stopOpacity="0.30" />
          <stop offset="0.5" stopColor="#fff" stopOpacity={velvet ? 0.16 : 0.1} />
          <stop offset="1" stopColor="#000" stopOpacity="0.30" />
        </linearGradient>
        <linearGradient id={`${id}fall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <pattern id={`${id}weave`} width={linen ? 5 : 4} height={linen ? 7 : 4} patternUnits="userSpaceOnUse">
          <path d={linen ? 'M0 1.5H5M0 5H5' : 'M0 2H4'} stroke="#000" strokeOpacity={linen ? 0.1 : 0.06} />
          <path d={linen ? 'M2 0V7' : 'M2 0V4'} stroke="#fff" strokeOpacity={linen ? 0.14 : 0.07} />
        </pattern>
        <radialGradient id={`${id}vig`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {variant === 'detail' ? (
        <g>
          <rect width="400" height="500" fill={color} />
          <rect width="400" height="500" fill={`url(#${id}pleat)`} />
          <rect width="400" height="500" fill={`url(#${id}weave)`} />
          {velvet && <rect width="400" height="500" fill={`url(#${id}sheen)`} />}
          <rect width="400" height="500" fill={`url(#${id}vig)`} />
        </g>
      ) : (
        <g>
          {/* wall + floor */}
          <rect width="400" height="500" fill={`url(#${id}wall)`} />
          <rect y="452" width="400" height="48" fill={`url(#${id}floor)`} />
          <rect y="446" width="400" height="7" fill="#fbf6ee" />

          {/* window */}
          <rect x="112" y="96" width="176" height="250" fill={`url(#${id}sky)`} />
          <rect x="112" y="96" width="176" height="250" fill="none" stroke="#e2d6c2" strokeWidth="7" />
          <rect x="197" y="96" width="6" height="250" fill="#e2d6c2" />
          <rect x="104" y="346" width="192" height="8" rx="2" fill="#efe6d8" />

          {/* curtains */}
          {panel(...dims.L, 'l')}
          {panel(...dims.R, 'r')}

          {/* rod + finials */}
          <rect x="34" y="58" width="332" height="7" rx="3.5" fill="#b08d57" />
          <circle cx="32" cy="61.5" r="7" fill="#b08d57" />
          <circle cx="368" cy="61.5" r="7" fill="#b08d57" />
          {[...Array(9)].map((_, i) => (
            <rect key={i} x={dims.L[0] + 6 + i * ((dims.R[0] + dims.R[1] - dims.L[0] - 18) / 8)} y="54" width="3" height="18" rx="1.5" fill="#9b7b49" />
          ))}

          {/* soft shadow on floor */}
          <ellipse cx="200" cy="470" rx="150" ry="9" fill="#000" opacity="0.1" />
        </g>
      )}
    </svg>
  )
}
