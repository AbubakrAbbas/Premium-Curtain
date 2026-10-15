import { Component, lazy, Suspense, useEffect, useState } from 'react'
import CurtainArt from './CurtainArt'

// three.js is only downloaded when the viewer is actually shown
const Curtain3D = lazy(() => import('./Curtain3D'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

/** Static image + message, shown when 3D can't run on the device. */
function Fallback({ product, color }) {
  return (
    <div className="relative h-full w-full">
      <CurtainArt kind={product.kind} color={color} variant="drawn" />
      <p className="absolute inset-x-4 bottom-4 rounded-xl bg-cream/90 px-4 py-3 text-center text-sm text-ink backdrop-blur">
        3D preview isn’t supported on this device or browser, so here is a 2D preview instead.
      </p>
    </div>
  )
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function Viewer({ product, color, openness, day, zoom, resetKey = 0 }) {
  const [supported] = useState(hasWebGL)
  const fallback = <Fallback product={product} color={color} />
  if (!supported) return fallback

  return (
    <Boundary fallback={fallback}>
      <Suspense
        fallback={
          <div className="grid h-full w-full place-items-center bg-sand text-sm text-muted">
            <span className="animate-pulse">Loading 3D preview…</span>
          </div>
        }
      >
        <Curtain3D kind={product.kind} color={color} openness={openness} day={day} zoom={zoom} modelUrl={product.model}
          textureUrl={product.textureUrl}
          resetKey={resetKey} />
      </Suspense>
    </Boundary>
  )
}
