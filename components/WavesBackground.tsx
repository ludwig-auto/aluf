'use client'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

export function WavesBackground({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })

  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    noiseRef.current = createNoise2D()
    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // High DPI support
    const setSize = () => {
      const { width, height } = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      return { width, height }
    }

    // Grid constants - Optimized density for performance (4x fewer points)
    const xGap = 25
    const yGap = 25
    const strokeColor = '#10b981' // emerald-500

    // Points storage
    let points: { x: number; y: number; vx: number; vy: number; ox: number; oy: number }[] = []

    const initPoints = () => {
      const { width, height } = setSize()
      points = []
      const totalCol = Math.ceil((width + 100) / xGap)
      const totalRow = Math.ceil((height + 100) / yGap)
      const xStart = (width - xGap * totalCol) / 2
      const yStart = (height - yGap * totalRow) / 2

      for (let i = 0; i < totalCol; i++) {
        for (let j = 0; j < totalRow; j++) {
          const x = xStart + i * xGap
          const y = yStart + j * yGap
          points.push({ x, y, vx: 0, vy: 0, ox: x, oy: y })
        }
      }
    }

    const updateMouse = (x: number, y: number) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = x - rect.left
      mouseRef.current.y = y - rect.top

      if (!mouseRef.current.set) {
        mouseRef.current.sx = mouseRef.current.x
        mouseRef.current.sy = mouseRef.current.y
        mouseRef.current.lx = mouseRef.current.x
        mouseRef.current.ly = mouseRef.current.y
        mouseRef.current.set = true
      }
    }

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateMouse(e.touches[0].clientX, e.touches[0].clientY)
    }

    let frameCount = 0
    const tick = (time: number) => {
      frameCount++
      const { width, height } = canvas.getBoundingClientRect()
      const noise = noiseRef.current!
      const mouse = mouseRef.current

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Skip expensive physics calculations every other frame
      const skipPhysics = frameCount % 2 === 0

      if (!skipPhysics) {
        // Smooth mouse
        mouse.sx += (mouse.x - mouse.sx) * 0.1
        mouse.sy += (mouse.y - mouse.sy) * 0.1
        const dx = mouse.x - mouse.lx
        const dy = mouse.y - mouse.ly
        const d = Math.sqrt(dx * dx + dy * dy) // Optimized distance calc
        mouse.vs += (d - mouse.vs) * 0.1
        mouse.vs = Math.min(100, mouse.vs)
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.a = Math.atan2(dy, dx)
      }

      // Draw lines
      ctx.beginPath()
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.6 // Consistent emerald visibility

      const totalCol = Math.ceil((width + 100) / xGap)
      const totalRow = Math.ceil((height + 100) / yGap)

      for (let i = 0; i < totalCol; i++) {
        for (let j = 0; j < totalRow; j++) {
          const idx = i * totalRow + j
          const p = points[idx]
          if (!p) continue

          const noiseVal = noise((p.ox + time * 0.005) * 0.003, (p.oy + time * 0.002) * 0.002) * 8
          const waveX = Math.cos(noiseVal) * 10
          const waveY = Math.sin(noiseVal) * 5

          if (!skipPhysics) {
            // Mouse interaction - optimized distance calculation
            const mdx = p.ox - mouse.sx
            const mdy = p.oy - mouse.sy
            const mdSq = mdx * mdx + mdy * mdy // Squared distance (avoid sqrt)
            const l = Math.max(150, mouse.vs * 2)
            const lSq = l * l

            if (mdSq < lSq) {
              const md = Math.sqrt(mdSq)
              const s = 1 - md / l
              const f = Math.cos(md * 0.001) * s
              p.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.0004
              p.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.0004
            }

            p.vx *= 0.92
            p.vy *= 0.92
          }

          // Current pos
          const posX = p.ox + waveX + p.vx * 20
          const posY = p.oy + waveY + p.vy * 20

          if (j === 0) {
            ctx.moveTo(posX, posY)
          } else {
            ctx.lineTo(posX, posY)
          }
        }
      }
      ctx.stroke()

      rafRef.current = requestAnimationFrame(tick)
    }

    initPoints()
    window.addEventListener('resize', initPoints)
    window.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchmove', onTouchMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', initPoints)
      window.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden bg-black ${className}`}
    >
      {/* Subtle obsidian overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Subtle radial glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  )
}
