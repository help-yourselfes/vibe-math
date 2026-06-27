"use client"

import { useRef, useEffect, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

interface ParticleBurstProps {
  trigger: number
  x: number
  y: number
  color?: string
  particleCount?: number
}

export function ParticleBurst({ trigger, x, y, color = "#4f46e5", particleCount = 30 }: ParticleBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05
      p.life -= 1
      p.size *= 0.98

      if (p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      const alpha = p.life / p.maxLife
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = alpha * 0.8
      ctx.fill()
    }
    ctx.globalAlpha = 1

    if (particles.length > 0) {
      frameRef.current = requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    if (trigger <= 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = 400 * dpr
    canvas.height = 400 * dpr
    canvas.style.width = "400px"
    canvas.style.height = "400px"
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.scale(dpr, dpr)

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 3 + Math.random() * 6
      particlesRef.current.push({
        x: 200,
        y: 200,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 40 + Math.random() * 20,
        maxLife: 60,
        size: 2 + Math.random() * 3,
        color: i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#4f46e5" : "#c4b5fd",
      })
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(animate)
  }, [trigger])

  useEffect(() => {
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: x - 200,
        top: y - 200,
        width: 400,
        height: 400,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  )
}
