"use client"

import { useRef, useEffect, useState } from "react"
import katex from "katex"

function renderMath(tex: string) {
  return { __html: katex.renderToString(tex, { throwOnError: false }) }
}

const PI = Math.PI
const RANGE = PI * 2 // total range width: -π to π

function pct(value: number) {
  return ((value + PI) / RANGE) * 100
}

function offsetTex(offset: number) {
  const o = offset.toFixed(2)
  return `\\sin(x ${offset >= 0 ? "+" : ""} ${o})`
}

export function SinGraphCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [offset, setOffset] = useState(0)
  const [a, setA] = useState(-2)
  const [b, setB] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width, h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.scale(dpr, dpr)

      const pad = { top: 24, right: 24, bottom: 24, left: 24 }
      const plotW = w - pad.left - pad.right
      const plotH = h - pad.top - pad.bottom
      const cx = pad.left + plotW / 2
      const cy = pad.top + plotH / 2

      const xMin = -PI, xMax = PI
      const yMin = -1.6, yMax = 1.6
      const xScale = plotW / (xMax - xMin)
      const yScale = plotH / (yMax - yMin)

      const toX = (x: number) => cx + (x - xMin) * xScale - plotW / 2
      const toY = (y: number) => cy - (y - yMin) * yScale + plotH / 2

      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = "rgba(79, 70, 229, 0.06)"
      ctx.lineWidth = 1
      for (let x = -3; x <= 3; x++) {
        const px = toX(x)
        ctx.beginPath()
        ctx.moveTo(px, pad.top)
        ctx.lineTo(px, h - pad.bottom)
        ctx.stroke()
      }
      for (let y = -1; y <= 1; y++) {
        const py = toY(y)
        ctx.beginPath()
        ctx.moveTo(pad.left, py)
        ctx.lineTo(w - pad.right, py)
        ctx.stroke()
      }

      ctx.strokeStyle = "rgba(79, 70, 229, 0.2)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(pad.left, toY(0))
      ctx.lineTo(w - pad.right, toY(0))
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(toX(0), pad.top)
      ctx.lineTo(toX(0), h - pad.bottom)
      ctx.stroke()

      const aClamped = Math.max(xMin, Math.min(xMax, a))
      const bClamped = Math.max(xMin, Math.min(xMax, b))
      if (aClamped < bClamped) {
        ctx.beginPath()
        ctx.moveTo(toX(aClamped), toY(0))
        const steps = 100
        for (let i = 0; i <= steps; i++) {
          const t = aClamped + (bClamped - aClamped) * (i / steps)
          const val = Math.sin(t + offset)
          ctx.lineTo(toX(t), toY(val))
        }
        ctx.lineTo(toX(bClamped), toY(0))
        ctx.closePath()
        ctx.fillStyle = "rgba(79, 70, 229, 0.12)"
        ctx.fill()
      }

      ctx.strokeStyle = "#818cf8"
      ctx.lineWidth = 2
      ctx.beginPath()
      const totalSteps = 200
      for (let i = 0; i <= totalSteps; i++) {
        const t = xMin + (xMax - xMin) * (i / totalSteps)
        const val = Math.sin(t + offset)
        const px = toX(t), py = toY(val)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.stroke()

      for (const [val, label] of [[aClamped, "a"], [bClamped, "b"]] as const) {
        const px = toX(val)
        const py = toY(Math.sin(val + offset))
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, PI * 2)
        ctx.fillStyle = label === "a" ? "#f97316" : "#22d3ee"
        ctx.fill()
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, PI * 2)
        ctx.strokeStyle = "#fff"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.fillStyle = label === "a" ? "#f97316" : "#22d3ee"
        ctx.font = "11px monospace"
        ctx.textAlign = "center"
        ctx.fillText(label, px, py - 10)
      }
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [offset, a, b])

  const aMax = b - 0.1
  const bMin = a + 0.1

  return (
    <div className="rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-5">
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-sm text-foreground [&_.katex]:text-base"
          dangerouslySetInnerHTML={renderMath(`f(x) = ${offsetTex(offset)}`)}
        />
        <span className="text-xs text-muted-foreground/80">
          <span dangerouslySetInnerHTML={renderMath(`\\int_{a}^{b} f(x) \\, dx =`)} />
          {" "}
          <span className="text-[#818cf8] font-mono">
            {(-Math.cos(b + offset) - (-Math.cos(a + offset))).toFixed(3)}
          </span>
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-[200px] rounded-lg" />

      <div className="space-y-3 mt-4">
        <div className="space-y-1">
          <label className="flex justify-between text-sm text-muted-foreground">
            <span>offset</span>
            <span className="font-mono text-[#818cf8]">{offset.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min={-PI}
            max={PI}
            step={0.01}
            value={offset}
            onChange={(e) => setOffset(+e.target.value)}
            className="w-full"
          />
        </div>

        <SliderWithOverlay
          label="a"
          color="#f97316"
          value={a}
          min={-PI}
          max={PI}
          step={0.01}
          overlayStart={pct(aMax)}
          onChange={(v) => setA(Math.min(v, aMax))}
        />

        <SliderWithOverlay
          label="b"
          color="#22d3ee"
          value={b}
          min={-PI}
          max={PI}
          step={0.01}
          overlayEnd={pct(bMin)}
          onChange={(v) => setB(Math.max(v, bMin))}
        />
      </div>
    </div>
  )
}

function SliderWithOverlay({
  label,
  color,
  value,
  min,
  max,
  step,
  overlayStart,
  overlayEnd,
  onChange,
}: {
  label: string
  color: string
  value: number
  min: number
  max: number
  step: number
  overlayStart?: number
  overlayEnd?: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1">
      <label className="flex justify-between text-sm text-muted-foreground">
        <span style={{ color }}>{label}</span>
        <span className="font-mono" style={{ color }}>{value.toFixed(2)}</span>
      </label>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[6px] mx-[2px] pointer-events-none rounded overflow-hidden">
          {overlayStart != null && (
            <div
              className="absolute inset-y-0 right-0 rounded-r bg-black/35"
              style={{ left: `${overlayStart}%` }}
            />
          )}
          {overlayEnd != null && (
            <div
              className="absolute inset-y-0 left-0 rounded-l bg-black/35"
              style={{ right: `${100 - overlayEnd}%` }}
            />
          )}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="w-full relative z-10"
        />
      </div>
    </div>
  )
}
