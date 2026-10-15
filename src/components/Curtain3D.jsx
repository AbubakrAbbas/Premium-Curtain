/**
 * Interactive 3D curtain (react-three-fiber).
 *
 * - Two cloth panels are generated procedurally: pleated folds, rings, rod, window, room.
 * - The fabric surface is a real woven micro-structure (colour + normal map, plus an
 *   alpha map for sheer voile), so zooming in shows individual threads.
 * - `openness` (0 = closed, 1 = fully drawn) animates the folds smoothly.
 * - `kind` decides the fabric: blackout (twill) / sheer (open voile) / velvet (pile) / linen (slubby).
 * - `day` switches daylight vs evening lighting (sheer fabrics glow when the window is bright).
 * - `zoom` flies the camera in close to the cloth.
 * - `modelUrl` (optional) swaps the procedural cloth for your own .glb model.
 *
 * This file is lazy-loaded, so three.js never slows down the rest of the site.
 */
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// ---- room / curtain dimensions (world units ≈ meters) ----
const W = 4 // window width
const ROD_Y = 1.8
const TOP = 1.72 // where the cloth hangs from
const FLOOR = -1.62
const DEPTH = 0.34 // distance of the curtain in front of the wall
const SEG_X = 160
const SEG_Y = 60
const RINGS = 14
const PLEATS = 13

// ---- fabric look. `threads` = threads per texture tile; one tile is ~12 cm of cloth ----
const FABRICS = {
  blackout: { weave: 'twill', threads: 24, jitter: 0.1, normal: 3.4, opacity: 1, roughness: 0.88, sheen: 0.35, glow: 0, cast: true },
  sheer: { weave: 'plain', threads: 14, jitter: 0.2, normal: 2.4, opacity: 0.92, alpha: true, roughness: 0.95, sheen: 0.25, glow: 0.55, cast: false },
  velvet: { weave: 'pile', threads: 32, jitter: 0.1, normal: 0.55, opacity: 1, roughness: 0.7, sheen: 1, glow: 0, cast: true },
  linen: { weave: 'plain', threads: 12, jitter: 0.45, slub: true, normal: 4.2, opacity: 1, roughness: 0.97, sheen: 0.1, glow: 0.12, cast: true },
}

const TEX = 1024 // texture resolution
const REPEAT = [30, 28] // tiles across the panel / down its length

// ---------------------------------------------------------------------------
// Procedural woven fabric: build a height field, then derive colour, normal and alpha maps.
// ---------------------------------------------------------------------------
const fabricCache = {}

function buildHeight(f) {
  const N = TEX
  const th = f.threads
  const p = N / th // pixels per thread (th is even / a multiple of 4, so the tile repeats seamlessly)
  const rand = (a) => 1 - f.jitter + Math.random() * f.jitter * 2 * a

  const warp = Array.from({ length: th }, () => rand(1))
  const weft = Array.from({ length: th }, () => rand(1))

  // linen: uneven thick/thin "slubs" along each thread
  const slub = () => {
    const a = Math.random() * 6.28
    const b = Math.random() * 6.28
    const fa = 0.006 + Math.random() * 0.012
    const fb = 0.02 + Math.random() * 0.03
    return (t) => 1 + 0.55 * Math.sin(t * fa + a) * Math.sin(t * fb + b)
  }
  const slubWarp = f.slub ? Array.from({ length: th }, slub) : null
  const slubWeft = f.slub ? Array.from({ length: th }, slub) : null

  const h = new Float32Array(N * N)
  for (let y = 0; y < N; y++) {
    const j = Math.floor(y / p)
    const cy = y / p - j
    const sy = Math.sin(Math.PI * cy)
    for (let x = 0; x < N; x++) {
      const i = Math.floor(x / p)
      const cx = x / p - i
      const sx = Math.sin(Math.PI * cx)
      const wa = sx * (0.7 + 0.3 * sy) * warp[i] * (slubWarp ? slubWarp[i](y) : 1)
      const we = sy * (0.7 + 0.3 * sx) * weft[j] * (slubWeft ? slubWeft[j](x) : 1)
      const over = f.weave === 'twill' ? (i + j) % 4 < 2 : ((i + j) & 1) === 0
      h[y * N + x] = over ? Math.max(wa, we * 0.5) : Math.max(we, wa * 0.5)
    }
  }

  if (f.weave === 'pile') {
    // velvet: dense, soft pile on top of a fine weave
    const noise = new Float32Array(N * N)
    for (let k = 0; k < noise.length; k++) noise[k] = Math.random()
    const blur = new Float32Array(N * N)
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        let s = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) s += noise[((y + dy + N) % N) * N + ((x + dx + N) % N)]
        }
        blur[y * N + x] = s / 9
      }
    }
    for (let k = 0; k < h.length; k++) h[k] = 0.3 * h[k] + 0.7 * blur[k]
  }
  return h
}

function toTexture(data, srgb) {
  const c = document.createElement('canvas')
  c.width = c.height = TEX
  c.getContext('2d').putImageData(new ImageData(data, TEX, TEX), 0, 0)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(REPEAT[0], REPEAT[1])
  t.anisotropy = 16 // three clamps this to what the GPU supports
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  t.needsUpdate = true
  return t
}

function getFabric(kind) {
  if (fabricCache[kind]) return fabricCache[kind]
  const f = FABRICS[kind]
  const N = TEX
  const h = buildHeight(f)

  const color = new Uint8ClampedArray(N * N * 4)
  const normal = new Uint8ClampedArray(N * N * 4)
  const alpha = f.alpha ? new Uint8ClampedArray(N * N * 4) : null
  const k = f.normal * 6

  for (let y = 0; y < N; y++) {
    const yu = (y - 1 + N) % N
    const yd = (y + 1) % N
    for (let x = 0; x < N; x++) {
      const xl = (x - 1 + N) % N
      const xr = (x + 1) % N
      const i = y * N + x
      const o = i * 4
      const v = Math.min(1, h[i])

      // colour: threads are lighter, the gaps between them are in shadow
      const c = 140 + 115 * v
      color[o] = color[o + 1] = color[o + 2] = c
      color[o + 3] = 255

      // normal map from the height field (tileable)
      const dx = (h[y * N + xr] - h[y * N + xl]) * k
      const dy = (h[yd * N + x] - h[yu * N + x]) * k // canvas y points down, uv v points up
      const inv = 1 / Math.sqrt(dx * dx + dy * dy + 1)
      normal[o] = (-dx * inv * 0.5 + 0.5) * 255
      normal[o + 1] = (dy * inv * 0.5 + 0.5) * 255
      normal[o + 2] = (inv * 0.5 + 0.5) * 255
      normal[o + 3] = 255

      if (alpha) {
        // voile: threads are solid, the gaps between them let the window through
        const a = Math.max(0, Math.min(1, (v - 0.12) * 2.4)) * 255
        alpha[o] = alpha[o + 1] = alpha[o + 2] = a
        alpha[o + 3] = 255
      }
    }
  }

  fabricCache[kind] = {
    map: toTexture(color, true),
    normalMap: toTexture(normal, false),
    alphaMap: alpha ? toTexture(alpha, false) : null,
  }
  return fabricCache[kind]
}

// ---------------------------------------------------------------------------
// cloth geometry
// ---------------------------------------------------------------------------
const smooth = (o) => o * o * (3 - 2 * o)

function metrics(o) {
  const e = smooth(o)
  const fullSpan = W / 2 + 0.4 // closed: panels overlap slightly in the middle
  const gatherSpan = 0.8 // open: bunched at the side
  return { e, span: fullSpan + (gatherSpan - fullSpan) * e, anchor: W / 2 + 0.2 }
}

/** Re-shapes one panel for the given openness (0..1): this is what makes the folds. */
function layoutPanel(geo, side, o) {
  const pos = geo.attributes.position
  // use the geometry's real segment counts (fewer on phones) — never the constants
  const SEGX = geo.parameters.widthSegments
  const SEGY = geo.parameters.heightSegments
  const { e, span, anchor } = metrics(o)
  const amp = 0.07 + 0.12 * e // folds get deeper as the cloth bunches up
  const height = TOP - FLOOR
  const ax = anchor * side

  for (let iy = 0; iy <= SEGY; iy++) {
    const v = iy / SEGY
    for (let ix = 0; ix <= SEGX; ix++) {
      const t = ix / SEGX
      const s = side < 0 ? t : 1 - t // distance from the side the cloth is hung from
      const phase = s * PLEATS * Math.PI * 2 + v * 0.35 * Math.sin(s * 5 + side)
      const wave = Math.sin(phase) + 0.22 * Math.sin(phase * 2.3 + 1.1)
      const relax = 0.72 + 0.38 * v // folds are pinched at the top, relaxed at the hem

      const x = ax - side * s * span
      const y = TOP - v * height + 0.015 * Math.sin(phase) * v * v * v
      const z = DEPTH + amp * relax * wave + 0.04 * Math.sin(v * Math.PI)
      pos.setXYZ(iy * (SEGX + 1) + ix, x, y, z)
    }
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
}

function layoutRings(mesh, dummy, side, o) {
  if (!mesh) return
  const { span, anchor } = metrics(o)
  for (let k = 0; k < RINGS; k++) {
    const s = k / (RINGS - 1)
    dummy.position.set(anchor * side - side * s * span, ROD_Y, DEPTH)
    dummy.rotation.set(0, Math.PI / 2, 0)
    dummy.updateMatrix()
    mesh.setMatrixAt(k, dummy.matrix)
  }
  mesh.instanceMatrix.needsUpdate = true
}


// 1×1 pixel used so useTexture can be called unconditionally when no photo texture exists
const EMPTY_TEX =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

/** Loads the real curtain photo as the cloth texture (null when the product has none). */
function usePhotoTexture(url) {
  const tex = useTexture(url || EMPTY_TEX)
  return useMemo(() => {
    if (!url) return null
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(1, 1)
    tex.anisotropy = 16
    tex.needsUpdate = true
    return tex
  }, [tex, url])
}

function Panel({ side, kind, color, target, day, narrow = false, textureUrl }) {
  const f = FABRICS[kind]
  const fabric = useMemo(() => getFabric(kind), [kind])
  const photoTex = usePhotoTexture(textureUrl)
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1, narrow ? 96 : SEG_X, narrow ? 40 : SEG_Y), [narrow])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const rings = useRef(null)
  const current = useRef(null) // smoothed openness
  const shown = useRef(null) // last openness we built geometry for
  const sheenColor = useMemo(() => new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.35), [color])

  useFrame((_, dt) => {
    if (current.current === null) current.current = target
    current.current = THREE.MathUtils.damp(current.current, target, 3.2, Math.min(dt, 0.05))
    if (Math.abs(current.current - target) < 0.0005) current.current = target
    if (shown.current === current.current) return
    shown.current = current.current
    layoutPanel(geo, side, current.current)
    layoutRings(rings.current, dummy, side, current.current)
  })

  return (
    <group>
      <mesh geometry={geo} castShadow={f.cast} receiveShadow frustumCulled={false}>
        <meshPhysicalMaterial
          key={kind + (textureUrl || '')} // new material when the fabric/photo changes
          color={photoTex ? '#ffffff' : color}
          map={photoTex || fabric.map}
          normalMap={fabric.normalMap}
          normalScale={[1, 1]}
          alphaMap={fabric.alphaMap}
          roughness={f.roughness}
          sheen={f.sheen}
          sheenRoughness={0.5}
          sheenColor={sheenColor}
          side={THREE.DoubleSide}
          transparent={f.opacity < 1}
          opacity={f.opacity}
          emissive={color}
          emissiveIntensity={f.glow * (day ? 1 : 0.12)} // light shining through the cloth
        />
      </mesh>
      <instancedMesh ref={rings} args={[undefined, undefined, RINGS]} castShadow frustumCulled={false}>
        <torusGeometry args={[0.06, 0.012, 10, 24]} />
        <meshStandardMaterial color="#b08d57" metalness={1} roughness={0.3} />
      </instancedMesh>
    </group>
  )
}

/** Use your own model: pass `modelUrl` (a .glb). It gets tinted with the selected color. */
function GLBCurtain({ url, color }) {
  const { scene } = useGLTF(url)
  const clone = useMemo(() => scene.clone(true), [scene])
  useLayoutEffect(() => {
    clone.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = o.receiveShadow = true
      if (o.material && !Array.isArray(o.material)) {
        o.material = o.material.clone()
        o.material.color?.set(color)
      }
    })
  }, [clone, color])
  return <primitive object={clone} />
}

function Room({ day }) {
  const frame = '#f6f1e8'
  return (
    <group>
      {/* wall */}
      <mesh position={[0, 1, -0.5]} receiveShadow>
        <planeGeometry args={[24, 8]} />
        <meshStandardMaterial color={day ? '#efe6d8' : '#cfc4b3'} roughness={1} />
      </mesh>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR, 2]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial color="#c9b79d" roughness={0.55} />
      </mesh>
      {/* skirting board */}
      <mesh position={[0, FLOOR + 0.08, -0.47]} receiveShadow>
        <boxGeometry args={[24, 0.16, 0.03]} />
        <meshStandardMaterial color="#faf6ee" roughness={0.6} />
      </mesh>

      {/* window glass (bright by day, dark blue in the evening) */}
      <mesh position={[0, 0.3, -0.48]}>
        <planeGeometry args={[3.5, 2.6]} />
        <meshBasicMaterial color={day ? '#fff7e6' : '#101828'} toneMapped={false} />
      </mesh>
      {/* window frame */}
      {[
        [0, 1.63, 3.66, 0.08],
        [0, -1.03, 3.66, 0.08],
      ].map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, -0.45]}>
          <boxGeometry args={[w, h, 0.06]} />
          <meshStandardMaterial color={frame} roughness={0.5} />
        </mesh>
      ))}
      {[-1.79, 1.79, 0].map((x, i) => (
        <mesh key={i} position={[x, 0.3, -0.45]}>
          <boxGeometry args={[i === 2 ? 0.04 : 0.08, 2.66, 0.06]} />
          <meshStandardMaterial color={frame} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -1.06, -0.38]} receiveShadow>
        <boxGeometry args={[3.9, 0.06, 0.24]} />
        <meshStandardMaterial color={frame} roughness={0.5} />
      </mesh>

      {/* curtain rod, brackets and finials */}
      <group position={[0, ROD_Y, DEPTH]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, W + 1.4, 24]} />
          <meshStandardMaterial color="#b08d57" metalness={1} roughness={0.28} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * (W / 2 + 0.75), 0, 0]} castShadow>
              <sphereGeometry args={[0.065, 24, 24]} />
              <meshStandardMaterial color="#b08d57" metalness={1} roughness={0.28} />
            </mesh>
            <mesh position={[s * (W / 2 + 0.45), 0, -(DEPTH + 0.5) / 2]}>
              <boxGeometry args={[0.03, 0.03, DEPTH + 0.5]} />
              <meshStandardMaterial color="#9b7b49" metalness={0.9} roughness={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

function Lights({ day, narrow = false }) {
  return (
    <>
      <hemisphereLight args={[day ? '#fff4e0' : '#6c7fa8', '#bfae94', day ? 0.55 : 0.2]} />
      <directionalLight
        position={[3.5, 4.2, 5]}
        intensity={day ? 2.1 : 0.45}
        color={day ? '#fff0d8' : '#9fb2e0'}
        castShadow
        shadow-mapSize={narrow ? [1024, 1024] : [2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
      />
      {!day && <pointLight position={[2.2, 1.1, 2]} intensity={14} color="#ffb36b" distance={9} decay={2} />}
      {/* Studio-style reflections without downloading an HDR file */}
      <Environment key={day ? 'day' : 'night'} resolution={256} frames={1}>
        <Lightformer form="rect" intensity={day ? 4 : 0.5} position={[0, 2, -6]} scale={[10, 5, 1]} color="#fff3dc" />
        <Lightformer form="rect" intensity={day ? 1.4 : 0.4} position={[0, 3, 6]} scale={[10, 2, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={day ? 1 : 0.8} position={[-5, 1, 2]} scale={3} color={day ? '#ffffff' : '#ffb36b'} />
      </Environment>
    </>
  )
}

/** Flies the camera in close to the cloth (zoom) or back to the full view. Dragging cancels it. */
function CameraRig({ zoom, openness, narrow }) {
  const controls = useThree((s) => s.controls)
  const camera = useThree((s) => s.camera)
  const goal = useRef({ pos: new THREE.Vector3(), tgt: new THREE.Vector3() })
  const moving = useRef(false)

  useEffect(() => {
    if (zoom) {
      // aim at the middle of the left panel, wherever the cloth currently is
      const { span, anchor } = metrics(openness)
      const cx = -(anchor - span / 2)
      goal.current.pos.set(cx, 0.25, DEPTH + 0.95)
      goal.current.tgt.set(cx, 0.25, DEPTH)
    } else {
      goal.current.pos.set(0, 0.35, narrow ? 8.5 : 6.9)
      goal.current.tgt.set(0, 0.1, 0)
    }
    moving.current = true
    // openness is read once, when the zoom starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, narrow])

  useEffect(() => {
    if (!controls) return
    const stop = () => (moving.current = false)
    controls.addEventListener('start', stop)
    return () => controls.removeEventListener('start', stop)
  }, [controls])

  useFrame((_, dt) => {
    if (!moving.current || !controls) return
    const k = 1 - Math.exp(-4 * Math.min(dt, 0.05))
    camera.position.lerp(goal.current.pos, k)
    controls.target.lerp(goal.current.tgt, k)
    controls.update()
    if (camera.position.distanceTo(goal.current.pos) < 0.01) moving.current = false
  })
  return null
}


/** Recomputes on resize/rotation — replaces the old one-time window.innerWidth check. */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return narrow
}

/** Snaps the camera back to the default view whenever resetKey changes. */
function ResetRig({ resetKey, narrow }) {
  const controls = useThree((s) => s.controls)
  const camera = useThree((s) => s.camera)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!controls) return
    camera.position.set(0, 0.35, narrow ? 8.5 : 6.9)
    controls.target.set(0, 0.1, 0)
    controls.update()
  }, [resetKey, controls, camera, narrow])
  return null
}

export default function Curtain3D({ kind = 'blackout', color = '#8c7b6b', openness = 0, day = true, zoom = false, modelUrl, textureUrl, resetKey = 0 }) {
  const narrow = useIsNarrow()
  return (
    <Canvas
      shadows
      dpr={narrow ? [0.75, 1.5] : [1, 2]}
      camera={{ position: [0, 0.35, narrow ? 8.5 : 6.9], fov: 36, near: 0.05, far: 60 }}
      gl={{ antialias: !narrow, powerPreference: 'high-performance' }}
      performance={{ min: 0.5 }}
      aria-label="Interactive 3D curtain preview. Drag to rotate, scroll to zoom into the fabric."
    >
      <color attach="background" args={[day ? '#efe7da' : '#1b1d27']} />
      <Lights day={day} narrow={narrow} />
      <Room day={day} />

      <Suspense fallback={null}>
        {modelUrl ? (
          <GLBCurtain url={modelUrl} color={color} />
        ) : (
          <>
            <Panel side={-1} kind={kind} color={color} target={openness} day={day} narrow={narrow} textureUrl={textureUrl} />
            <Panel side={1} kind={kind} color={color} target={openness} day={day} narrow={narrow} textureUrl={textureUrl} />
          </>
        )}
      </Suspense>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        zoomToCursor
        target={[0, 0.1, 0]}
        minDistance={0.55}
        maxDistance={10}
        minPolarAngle={0.7}
        maxPolarAngle={1.8}
        minAzimuthAngle={-1.1}
        maxAzimuthAngle={1.1}
      />
      <CameraRig zoom={zoom} openness={openness} narrow={narrow} />
      <ResetRig resetKey={resetKey} narrow={narrow} />
    </Canvas>
  )
}
