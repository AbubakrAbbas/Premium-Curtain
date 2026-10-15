import { useId } from 'react'

// drifting dust motes caught in the light (fixed positions, so every render matches)
const DUST = Array.from({ length: 22 }, (_, i) => ({
  x: 930 + ((i * 97) % 380),
  y: 560 + ((i * 53) % 190),
  r: 1.4 + ((i * 7) % 4) * 0.6,
  delay: -((i * 1.37) % 9),
  dx: ((i % 5) - 2) * 14,
}))

/**
 * Illustrated hero background: a sunny window with drapes, a swaying sheer,
 * light beams and floating dust. The drape color is controlled by the hero swatches.
 * Replace with a real photo by setting `hero.image` in siteData.js.
 */
export default function HeroScene({ drape = '#a58a73', sheer = '#f7f1e6' }) {
  const id = useId().replace(/:/g, '')
  const u = (n) => `url(#${id}${n})`
  const fillT = { fill: drape, transition: 'fill 0.8s ease' }

  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6eee1" />
          <stop offset="1" stopColor="#e6d9c5" />
        </linearGradient>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe3ee" />
          <stop offset="0.55" stopColor="#fdeccb" />
          <stop offset="1" stopColor="#fff6e2" />
        </linearGradient>
        <radialGradient id={`${id}sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffbea" stopOpacity="1" />
          <stop offset="0.35" stopColor="#fff1c9" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff1c9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3d6" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7e0" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff7e0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9c8ad" />
          <stop offset="1" stopColor="#b9a584" />
        </linearGradient>
        <linearGradient id={`${id}pleat`} gradientUnits="userSpaceOnUse" x1="0" x2="34" y1="0" y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor="#000" stopOpacity="0.32" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id={`${id}spleat`} gradientUnits="userSpaceOnUse" x1="0" x2="52" y1="0" y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor="#000" stopOpacity="0.09" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#000" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id={`${id}fall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.18" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.26" />
        </linearGradient>
        <filter id={`${id}blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={`${id}soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id={`${id}win`}>
          <rect x="860" y="150" width="480" height="520" />
        </clipPath>
      </defs>

      {/* wall + sun halo around the window */}
      <rect width="1600" height="900" fill={u('wall')} />

      {/* floor, plank lines, skirting */}
      <rect y="760" width="1600" height="140" fill={u('floor')} />
      {[790, 822, 858].map((y) => (
        <rect key={y} y={y} width="1600" height="1.5" fill="#000" opacity="0.06" />
      ))}
      <rect y="750" width="1600" height="12" fill="#fbf6ee" />

      {/* everything else is nudged right so the left half stays calm for the headline */}
      <g transform="translate(130 0)">
      <ellipse cx="1100" cy="400" rx="560" ry="460" fill={u('halo')} />

      {/* the view outside */}
      <g clipPath={u('win')}>
        <rect x="860" y="150" width="480" height="520" fill={u('sky')} />
        <circle cx="1240" cy="290" r="150" fill={u('sun')} />
        <ellipse cx="1000" cy="250" rx="90" ry="18" fill="#fff" opacity="0.7" filter={u('soft')} />
        <ellipse cx="1130" cy="205" rx="60" ry="12" fill="#fff" opacity="0.6" filter={u('soft')} />
        <path d="M860 520 C 960 470, 1040 505, 1120 472 S 1280 450, 1340 492 V670 H860Z" fill="#cdd8bd" />
        <path d="M860 585 C 980 540, 1100 595, 1200 560 S 1320 560, 1340 578 V670 H860Z" fill="#b2c196" />
        <rect x="934" y="540" width="7" height="60" fill="#8a7b62" />
        <circle cx="938" cy="526" r="34" fill="#8fa774" />
        <circle cx="918" cy="545" r="22" fill="#9db382" />
        <circle cx="1262" cy="560" r="26" fill="#93aa78" />
        <rect x="1259" y="570" width="6" height="40" fill="#8a7b62" />
      </g>
      {/* window frame + sill */}
      <rect x="860" y="150" width="480" height="520" fill="none" stroke="#e8dcc7" strokeWidth="14" />
      <rect x="1096" y="150" width="8" height="520" fill="#e8dcc7" />
      <rect x="860" y="405" width="480" height="8" fill="#e8dcc7" />
      <rect x="842" y="670" width="516" height="16" rx="3" fill="#f2e9d8" />

      {/* light beams across the floor */}
      <g className="beam">
        <polygon points="880,690 1320,690 1500,900 700,900" fill={u('beam')} filter={u('soft')} />
        <polygon points="960,690 1090,690 1130,900 900,900" fill="#fff" opacity="0.14" filter={u('soft')} />
      </g>
      <polygon points="900,770 1310,770 1450,890 770,890" fill="#fff6e2" opacity="0.5" filter={u('blur')} />

      {/* pouf and vase */}
      <ellipse cx="1130" cy="800" rx="108" ry="14" fill="#000" opacity="0.1" />
      <path d="M1030 770 q0 -44 100 -44 q100 0 100 44 v14 q0 20 -100 20 q-100 0 -100 -20z" fill="#b0693a" />
      <ellipse cx="1130" cy="742" rx="96" ry="22" fill="#c47c4b" />
      <path d="M1130 742 q-30 8 -50 0 M1130 742 q30 8 50 0" stroke="#8f522a" strokeOpacity="0.5" fill="none" />
      <path d="M958 742 q-20 12 -14 36 q4 14 20 14 q16 0 20 -14 q6 -24 -14 -36z" fill="#efe3cf" />
      <g stroke="#a58a63" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M971 742 q-6 -50 -28 -86" />
        <path d="M971 742 q4 -56 16 -100" />
        <path d="M971 742 q16 -40 40 -70" />
      </g>

      {/* dust motes */}
      <g fill="#fffbea">
        {DUST.map((d, i) => (
          <circle
            key={i}
            className="dust"
            cx={d.x}
            cy={d.y}
            r={d.r}
            style={{ animationDelay: `${d.delay}s`, '--dx': `${d.dx}px` }}
            opacity="0"
          />
        ))}
      </g>

      {/* swaying sheer */}
      <g className="sway">
        <g opacity="0.55">
          <rect x="770" y="116" width="660" height="646" fill={sheer} />
          <rect x="770" y="116" width="660" height="646" fill={u('spleat')} />
        </g>
      </g>

      {/* drapes */}
      {[740, 1310].map((x) => (
        <g key={x}>
          <rect x={x} y="116" width="150" height="652" rx="4" style={fillT} />
          <rect x={x} y="116" width="150" height="652" rx="4" fill={u('pleat')} />
          <rect x={x} y="116" width="150" height="652" rx="4" fill={u('fall')} />
          {/* tieback-free hem highlight */}
          <rect x={x} y="760" width="150" height="8" rx="2" fill="#000" opacity="0.14" />
        </g>
      ))}

      {/* rod, rings, finials */}
      <rect x="700" y="104" width="740" height="9" rx="4.5" fill="#b08d57" />
      <circle cx="696" cy="108.5" r="12" fill="#c9a36a" />
      <circle cx="1444" cy="108.5" r="12" fill="#c9a36a" />
      {[...Array(7)].map((_, i) => (
        <g key={i}>
          <rect x={746 + i * 21} y="100" width="4" height="22" rx="2" fill="#9b7b49" />
          <rect x={1316 + i * 21} y="100" width="4" height="22" rx="2" fill="#9b7b49" />
        </g>
      ))}

      {/* shadows under the drapes */}
      <ellipse cx="815" cy="774" rx="112" ry="9" fill="#000" opacity="0.14" />
      <ellipse cx="1385" cy="774" rx="112" ry="9" fill="#000" opacity="0.14" />
      </g>
    </svg>
  )
}
