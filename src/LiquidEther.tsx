import { useEffect, useMemo, useRef, useState } from 'react'

type LiquidEtherProps = {
  colors?: string[]
  mouseForce?: number
  cursorSize?: number
  autoDemo?: boolean
  autoSpeed?: number
  autoIntensity?: number
  resolution?: number
  compositeOperation?: GlobalCompositeOperation
  blobAlpha?: number
  color0?: string
  color1?: string
  color2?: string
}

type BlobParticle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
}

export default function LiquidEther({
  colors,
  mouseForce = 20,
  cursorSize = 100,
  autoDemo = false,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  resolution = 0.5,
  compositeOperation = 'lighter',
  blobAlpha = 0.8,
  color0,
  color1,
  color2,
}: LiquidEtherProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const palette = useMemo(() => {
    const list = Array.isArray(colors) && colors.length ? colors : []
    const base = [color0, color1, color2].filter(Boolean)
    const merged = [...(list.length ? list : base)]
    return merged.length ? merged : ['#5227FF', '#FF9FFC', '#B19EEF']
  }, [colors, color0, color1, color2])

  const [size, setSize] = useState({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      setSize({ w: Math.max(1, rect.width), h: Math.max(1, rect.height), dpr })
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = Math.max(1, Math.floor(size.w * size.dpr * resolution))
    const h = Math.max(1, Math.floor(size.h * size.dpr * resolution))

    canvas.width = w
    canvas.height = h
    canvas.style.width = `${size.w}px`
    canvas.style.height = `${size.h}px`
  }, [size, resolution])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const blobs: BlobParticle[] = []
    const blobCount = 10

    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    const makeBlobs = () => {
      blobs.length = 0
      const w = canvas.width
      const h = canvas.height
      const baseR = Math.min(w, h) * 0.12

      for (let i = 0; i < blobCount; i++) {
        const r = baseR * rand(0.55, 1.15)
        blobs.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.6, 0.6),
          vy: rand(-0.6, 0.6),
          r,
          color: palette[i % palette.length] ?? '#5227FF',
        })
      }
    }

    makeBlobs()

    let raf = 0
    let t0 = performance.now()

    const mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) * size.dpr * resolution
      const y = (e.clientY - rect.top) * size.dpr * resolution
      mouse.x = x
      mouse.y = y
      mouse.active = true
    }

    const onLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const alphaToHex = (a: number) => {
      const v = Math.round(Math.max(0, Math.min(1, a)) * 255)
      return v.toString(16).padStart(2, '0')
    }

    const draw = (now: number) => {
      const dt = Math.min(32, now - t0)
      t0 = now

      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const target = { x: mouse.x, y: mouse.y }
      if (autoDemo && !mouse.active) {
        const s = now * 0.001 * autoSpeed
        target.x = w * 0.5 + Math.cos(s) * w * 0.25 * autoIntensity
        target.y = h * 0.5 + Math.sin(s * 0.9) * h * 0.22 * autoIntensity
      }

      const influenceRadius = Math.max(40, cursorSize) * size.dpr * resolution
      const force = mouseForce * 0.0012

      for (const b of blobs) {
        const dx = target.x - b.x
        const dy = target.y - b.y
        const dist = Math.max(1, Math.hypot(dx, dy))
        const influence = Math.max(0, 1 - dist / influenceRadius)

        b.vx += (dx / dist) * influence * force * dt
        b.vy += (dy / dist) * influence * force * dt

        b.vx *= 0.992
        b.vy *= 0.992

        b.x += b.vx * dt
        b.y += b.vy * dt

        if (b.x < -b.r) b.x = w + b.r
        if (b.x > w + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = h + b.r
        if (b.y > h + b.r) b.y = -b.r
      }

      ctx.save()
      ctx.globalCompositeOperation = compositeOperation

      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `${b.color}${alphaToHex(blobAlpha)}`)
        g.addColorStop(1, `${b.color}00`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [
    palette,
    mouseForce,
    cursorSize,
    autoDemo,
    autoSpeed,
    autoIntensity,
    size.dpr,
    resolution,
    compositeOperation,
    blobAlpha,
  ])

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          filter: 'blur(18px) saturate(1.2)',
          opacity: 0.9,
        }}
      />
    </div>
  )
}
