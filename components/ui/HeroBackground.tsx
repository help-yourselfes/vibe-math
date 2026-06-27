"use client"

import { useRef, useEffect, useState } from "react"

interface Point3D {
  x: number
  y: number
  z: number
}

function project(p: Point3D, cx: number, cy: number, scale: number, rotX: number, rotY: number) {
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY)

  const x1 = p.x * cosY - p.z * sinY
  const z1 = p.x * sinY + p.z * cosY
  const y1 = p.y * cosX + z1 * sinX
  const z2 = -p.y * sinX + z1 * cosX

  const d = 700
  const factor = d / (d + z2)
  return {
    sx: cx + x1 * scale * factor,
    sy: cy - y1 * scale * factor,
    depth: z2,
  }
}

interface GridData {
  points: Point3D[]
  indices: [number, number][]
  seeds: number[]
  half: number
  spacing: number
  size: number
}

let grid: GridData | null = null

function buildGrid(w: number, h: number): GridData {
  const size = 26
  const spacing = Math.max(w, h) / size * 1.5
  const half = (size - 1) * spacing * 0.5
  const points: Point3D[] = []
  for (let ix = 0; ix < size; ix++) {
    for (let iz = 0; iz < size; iz++) {
      points.push({ x: ix * spacing - half, y: 0, z: iz * spacing - half })
    }
  }
  const seeds = points.map(() => Math.random() * Math.PI * 2)
  const indices: [number, number][] = []
  for (let ix = 0; ix < size; ix++) {
    for (let iz = 0; iz < size; iz++) {
      const idx = ix * size + iz
      if (ix < size - 1) indices.push([idx, idx + size])
      if (iz < size - 1) indices.push([idx, idx + 1])
    }
  }
  return { points, indices, seeds, half, spacing, size }
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1

    let w = 0, h = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + "px"
      canvas!.style.height = h + "px"
      grid = buildGrid(w, h)
    }
    resize()
    window.addEventListener("resize", resize)

    const animate = (time: number) => {
      const cvs = canvasRef.current
      if (!cvs || !grid) return
      const c = cvs.getContext("2d")
      if (!c) return

      c.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const t = time * 0.001

      const autoRotY = Math.sin(t * 0.12) * 0.25
      const autoRotX = Math.sin(t * 0.08 + 1) * 0.06

      const rotY = autoRotY + (mx - 0.5) * 0.35 + 0.5
      const rotX = autoRotX + (my - 0.5) * 0.12 + 0.3
      const scale = w / (grid.half * 1.6)
      const cx = w * 0.5
      const cy = h * 0.38
      const amp = 12

      const flatProj = grid.points.map((p) => project({ x: p.x, y: 0, z: p.z }, cx, cy, scale, rotX, rotY))

      c.strokeStyle = "rgba(79, 70, 229, 0.12)"
      c.lineWidth = 1
      for (const [i1, i2] of grid.indices) {
        const a = flatProj[i1], b = flatProj[i2]
        const depthFade = Math.max(0, 1 - Math.abs(a.depth) / 800)
        if (depthFade <= 0.01) continue
        const midSx = (a.sx + b.sx) / 2
        const midSy = (a.sy + b.sy) / 2
        const edgeFadeX = 1 - Math.pow(Math.abs(midSx - cx) / (w * 0.6), 2)
        const edgeFadeY = 1 - Math.pow(Math.abs(midSy - cy) / (h * 0.7), 2)
        const fade = Math.max(0, Math.min(1, (edgeFadeX + edgeFadeY) * 0.6)) * depthFade
        if (fade <= 0) continue
        c.globalAlpha = fade
        c.beginPath()
        c.moveTo(a.sx, a.sy)
        c.lineTo(b.sx, b.sy)
        c.stroke()
      }
      c.globalAlpha = 1

      const waveProj = grid.points.map((p, i) => {
        const y = Math.sin(p.x * 0.03 + t * 0.8) * Math.cos(p.z * 0.03 + t * 0.5) * amp
        const pr = project({ x: p.x, y, z: p.z }, cx, cy, scale, rotX, rotY)
        return { ...pr, y3d: y, idx: i }
      })

      waveProj.sort((a, b) => b.depth - a.depth)

      for (const p of waveProj) {
        const depthFade = Math.max(0, 1 - Math.abs(p.depth) / 800)
        if (depthFade <= 0.01) continue

        const edgeFadeX = 1 - Math.pow(Math.abs(p.sx - cx) / (w * 0.6), 3)
        const edgeFadeY = 1 - Math.pow(Math.abs(p.sy - cy) / (h * 0.7), 3)
        const edgeFade = Math.max(0, Math.min(1, (edgeFadeX + edgeFadeY) * 0.6))
        if (edgeFade <= 0) continue

        const fade = depthFade * edgeFade
        const seed = grid.seeds[p.idx]
        const baseSize = 2.5 + seed * 0.4
        const pulse = 1 + 0.4 * Math.sin(t * 1.2 + seed * 3)
        const depthSize = Math.max(0.6, 1 - p.depth * 0.002)
        const size = baseSize * pulse * depthSize * fade

        const yNorm = (p.y3d / amp + 1) * 0.5
        const alpha = fade
        const hue = 240 + (1 - yNorm) * 35
        const sat = 65 + yNorm * 25
        const light = 50 + yNorm * 30

        c.beginPath()
        c.arc(p.sx, p.sy, size, 0, Math.PI * 2)
        c.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
        c.fill()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
