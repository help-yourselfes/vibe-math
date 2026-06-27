"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { InlineMath } from "@/components/ui/katex"

export function IntegralVisualizer() {
  const [n, setN] = useState(6)

  const a = 0, b = 2
  const f = (x: number) => x * x

  const data = useMemo(() => {
    const dx = (b - a) / n
    const points: { x: number; y: number }[] = []
    const rects: { x: number; y: number; w: number; h: number }[] = []
    for (let i = 0; i < n; i++) {
      const left = a + i * dx
      const right = left + dx
      const mid = (left + right) / 2
      points.push({ x: left, y: f(left) })
      rects.push({ x: left, y: 0, w: dx, h: f(mid) })
    }
    points.push({ x: b, y: f(b) })
    const riemannSum = rects.reduce((sum, r) => sum + r.w * r.h, 0)
    const actualArea = (b * b * b - a * a * a) / 3
    return { points, rects, riemannSum, actualArea }
  }, [n])

  const viewW = 460, viewH = 320
  const margin = { top: 20, right: 20, bottom: 30, left: 40 }
  const plotW = viewW - margin.left - margin.right
  const plotH = viewH - margin.top - margin.bottom

  const xMin = 0, xMax = 2.2, yMin = -0.2, yMax = 4.5

  function xToPixel(x: number) { return margin.left + ((x - xMin) / (xMax - xMin)) * plotW }
  function yToPixel(y: number) { return margin.top + plotH - ((y - yMin) / (yMax - yMin)) * plotH }

  const curvePath = data.points.map((p, i) =>
    `${i === 0 ? "M" : "L"}${xToPixel(p.x).toFixed(1)},${yToPixel(p.y).toFixed(1)}`
  ).join(" ")

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-auto" style={{ maxHeight: "340px" }}>
        <rect x={margin.left} y={margin.top} width={plotW} height={plotH} fill="rgba(255,255,255,0.02)" rx="4" />

        {data.rects.map((r, i) => (
          <motion.rect
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.02 }}
            style={{ transformOrigin: `${xToPixel(r.x) + Math.abs(xToPixel(r.x + r.w) - xToPixel(r.x)) / 2}px ${yToPixel(0)}px` }}
            x={xToPixel(r.x)}
            y={yToPixel(r.h)}
            width={Math.abs(xToPixel(r.x + r.w) - xToPixel(r.x))}
            height={Math.abs(yToPixel(0) - yToPixel(r.h))}
            fill="rgba(79,70,229,0.15)"
            stroke="rgba(79,70,229,0.4)"
            strokeWidth="1"
          />
        ))}

        <path d={curvePath} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        <line x1={xToPixel(0)} y1={yToPixel(0)} x2={xToPixel(xMax)} y2={yToPixel(0)} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1={xToPixel(0)} y1={yToPixel(yMin)} x2={xToPixel(0)} y2={yToPixel(yMax)} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {[0, 1, 2].map(v => (
          <text key={v} x={xToPixel(v)} y={yToPixel(0) + 18} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11">{v}</text>
        ))}
        {[1, 2, 3, 4].map(v => (
          <text key={v} x={xToPixel(0) - 8} y={yToPixel(v) + 4} textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="11">{v}</text>
        ))}

        <text x={xToPixel(b)} y={yToPixel(-0.1) + 18} textAnchor="middle" fill="#4f46e5" fontSize="12" fontWeight="600">b</text>
      </svg>

      <div>
        <p className="text-xs text-muted-foreground mb-1.5">Rectangles: <InlineMath>{`n = ${n}`}</InlineMath></p>
        <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <input
            type="range"
            min={2}
            max={30}
            step={1}
            value={n}
            onChange={e => setN(parseInt(e.target.value))}
            className="w-full"
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="min-w-[140px] rounded-lg border border-[#4f46e5]/20 bg-[#4f46e5]/5 px-3 py-2">
          <p className="text-[11px] text-muted-foreground">Riemann sum</p>
          <p className="text-lg font-bold font-mono tabular-nums text-[#4f46e5] leading-tight">
            {data.riemannSum.toFixed(4)}
          </p>
        </div>
        <div className="min-w-[140px] rounded-lg border border-border/40 bg-[rgba(13,17,23,0.5)] px-3 py-2">
          <p className="text-[11px] text-muted-foreground">Exact area</p>
          <p className="text-lg font-bold font-mono tabular-nums text-foreground leading-tight">{data.actualArea.toFixed(4)}</p>
        </div>
      </div>
    </div>
  )
}
