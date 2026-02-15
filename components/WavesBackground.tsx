'use client'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Point {
  x: number
  y: number
  wave: { x: number; y: number }
  cursor: { x: number; y: number; vx: number; vy: number }
}

export function WavesBackground({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })
  const pathsRef = useRef<SVGPathElement[]>([])
  const linesRef = useRef<Point[][]>([])
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return

    noiseRef.current = createNoise2D()
    const container = containerRef.current
    const svg = svgRef.current
    const strokeColor = '#10b981' // emerald-500

    // Set size
    const setSize = () => {
      const { width, height } = container.getBoundingClientRect()
      svg.style.width = `${width}px`
      svg.style.height = `${height}px`
      return { width, height }
    }

    // Setup lines
    const setLines = () => {
      const { width, height } = setSize()
      linesRef.current = []
      pathsRef.current.forEach(p => p.remove())
      pathsRef.current = []

      const xGap = 8
      const yGap = 8
      const oWidth = width + 200
      const oHeight = height + 30
      const totalLines = Math.ceil(oWidth / xGap)
      const totalPoints = Math.ceil(oHeight / yGap)
      const xStart = (width - xGap * totalLines) / 2
      const yStart = (height - yGap * totalPoints) / 2

      for (let i = 0; i < totalLines; i++) {
        const points: Point[] = []

        for (let j = 0; j < totalPoints; j++) {
          points.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          })
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', strokeColor)
        path.setAttribute('stroke-width', '1')
        path.setAttribute('opacity', '0.4')
        svg.appendChild(path)
        pathsRef.current.push(path)
        linesRef.current.push(points)
      }
    }

    // Mouse handlers
    const updateMouse = (x: number, y: number) => {
      const rect = container.getBoundingClientRect()
      const mouse = mouseRef.current
      mouse.x = x - rect.left
      mouse.y = y - rect.top + window.scrollY

      if (!mouse.set) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.set = true
      }
    }

    const onMouseMove = (e: MouseEvent) => updateMouse(e.pageX, e.pageY)
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      updateMouse(e.touches[0].clientX, e.touches[0].clientY)
    }

    // Animation
    const tick = (time: number) => {
      const mouse = mouseRef.current
      const noise = noiseRef.current
      if (!noise) return

      // Smooth mouse
      mouse.sx += (mouse.x - mouse.sx) * 0.1
      mouse.sy += (mouse.y - mouse.sy) * 0.1

      const dx = mouse.x - mouse.lx
      const dy = mouse.y - mouse.ly
      const d = Math.hypot(dx, dy)

      mouse.v = d
      mouse.vs += (d - mouse.vs) * 0.1
      mouse.vs = Math.min(100, mouse.vs)
      mouse.lx = mouse.x
      mouse.ly = mouse.y
      mouse.a = Math.atan2(dy, dx)

      // Move points
      linesRef.current.forEach((points) => {
        points.forEach((p) => {
          const move = noise((p.x + time * 0.008) * 0.003, (p.y + time * 0.003) * 0.002) * 8
          p.wave.x = Math.cos(move) * 12
          p.wave.y = Math.sin(move) * 6

          const dx = p.x - mouse.sx
          const dy = p.y - mouse.sy
          const d = Math.hypot(dx, dy)
          const l = Math.max(175, mouse.vs)

          if (d < l) {
            const s = 1 - d / l
            const f = Math.cos(d * 0.001) * s
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035
          }

          p.cursor.vx += (0 - p.cursor.x) * 0.01
          p.cursor.vy += (0 - p.cursor.y) * 0.01
          p.cursor.vx *= 0.95
          p.cursor.vy *= 0.95
          p.cursor.x += p.cursor.vx
          p.cursor.y += p.cursor.vy
          p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x))
          p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y))
        })
      })

      // Draw lines
      linesRef.current.forEach((points, i) => {
        if (points.length < 2 || !pathsRef.current[i]) return

        const first = points[0]
        let d = `M ${first.x + first.wave.x} ${first.y + first.wave.y}`

        for (let j = 1; j < points.length; j++) {
          const p = points[j]
          const x = p.x + p.wave.x + p.cursor.x
          const y = p.y + p.wave.y + p.cursor.y
          d += `L ${x} ${y}`
        }

        pathsRef.current[i].setAttribute('d', d)
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    // Init
    setLines()
    window.addEventListener('resize', setLines)
    window.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', setLines)
      window.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-10 overflow-hidden bg-white ${className}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 pointer-events-none" />

      {/* Waves SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      />

      {/* Radial glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />
    </div>
  )
}
