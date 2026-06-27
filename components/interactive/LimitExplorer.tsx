"use client"

import { useState, useMemo } from "react"
import { InlineMath } from "@/components/ui/katex"

const W = 480, H = 340
const ML = 55, MR = 25, MT = 25, MB = 45
const PW = W - ML - MR  // 400
const PH = H - MT - MB  // 270
const XMIN = -1.5, XMAX = 4.5, YMIN = -2.5, YMAX = 10

const x2s = (x: number) => ML + ((x - XMIN) / (XMAX - XMIN)) * PW
const y2s = (y: number) => MT + ((YMAX - y) / (YMAX - YMIN)) * PH

function generatePath(step = 0.05) {
  const pts: string[] = []
  for (let x = XMIN; x <= XMAX; x += step) {
    const y = x * x - 1
    if (y < YMIN || y > YMAX) continue
    const cmd = pts.length === 0 ? "M" : "L"
    pts.push(`${cmd}${x2s(x).toFixed(1)} ${y2s(y).toFixed(1)}`)
  }
  return pts.join(" ")
}

const gridLines = () => {
  const lines: { x?: number; y?: number }[] = []
  for (let x = -1; x <= 4; x++) lines.push({ x })
  for (let y = 0; y <= 8; y += 2) lines.push({ y })
  return lines
}

export function LimitExplorer() {
  const [x, setX] = useState(1.5)
  const f = (t: number) => t * t - 1
  const target = 2
  const limitVal = f(target)

  const pathD = useMemo(() => generatePath(), [])
  const leftApproach = target - 0.5
  const rightApproach = target + 0.5

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Drag the slider to see how <InlineMath>f(x) = x^2 - 1</InlineMath> behaves as <InlineMath>x</InlineMath> approaches 2
      </p>

      <div className="relative pt-2 pb-1">
        <input
          type="range"
          min="0"
          max="4"
          step="0.05"
          value={x}
          onChange={(e) => setX(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] h-auto" xmlns="http://www.w3.org/2000/svg">
          <rect width={W} height={H} fill="transparent" rx={8} />

          {/* Grid lines */}
          {gridLines().map((g, i) => {
            if (g.x !== undefined) {
              const sx = x2s(g.x)
              return <line key={`gx${i}`} x1={sx} y1={MT} x2={sx} y2={H - MB} stroke="currentColor" strokeOpacity={0.08} strokeWidth={0.5} />
            }
            const sy = y2s(g.y!)
            return <line key={`gy${i}`} x1={ML} y1={sy} x2={W - MR} y2={sy} stroke="currentColor" strokeOpacity={0.08} strokeWidth={0.5} />
          })}

          {/* X axis */}
          <line x1={ML} y1={y2s(0)} x2={W - MR} y2={y2s(0)} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.5} />
          {/* X axis labels */}
          {[-1, 0, 1, 2, 3, 4].map((v) => (
            <text key={`xt${v}`} x={x2s(v)} y={H - MB + 18} textAnchor="middle" fill="currentColor" fillOpacity={0.45} fontSize={11} fontFamily="var(--font-mono)">
              {v}
            </text>
          ))}
          <text x={W - MR + 12} y={y2s(0) + 4} fill="currentColor" fillOpacity={0.4} fontSize={12}>x</text>

          {/* Y axis */}
          <line x1={x2s(0)} y1={MT} x2={x2s(0)} y2={H - MB} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.5} />
          {/* Y axis labels */}
          {[0, 2, 4, 6, 8].map((v) => (
            <text key={`yt${v}`} x={x2s(0) - 8} y={y2s(v) + 4} textAnchor="end" fill="currentColor" fillOpacity={0.45} fontSize={11} fontFamily="var(--font-mono)">
              {v}
            </text>
          ))}
          <text x={x2s(0) - 14} y={MT + 12} textAnchor="start" fill="currentColor" fillOpacity={0.4} fontSize={12}>y</text>

          {/* f(x) = x² - 1 curve */}
          <path d={pathD} fill="none" stroke="#7c5cfc" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

          {/* Target limit point glow */}
          <circle cx={x2s(target)} cy={y2s(limitVal)} r={12} fill="#7c5cfc" fillOpacity={0.15} />
          <circle cx={x2s(target)} cy={y2s(limitVal)} r={6} fill="#7c5cfc" fillOpacity={0.3} />
          <circle cx={x2s(target)} cy={y2s(limitVal)} r={3} fill="#c084fc" />

          {/* Limit point label */}
          <text x={x2s(target)} y={y2s(limitVal) - 14} textAnchor="middle" fill="#c084fc" fontSize={12} fontFamily="var(--font-sans)" fontWeight={600}>
            (2, 3)
          </text>

          {/* Left approach arrow */}
          {x < target && (
            <>
              <line x1={x2s(leftApproach)} y1={y2s(f(leftApproach)) + 16} x2={x2s(x)} y2={y2s(f(x)) + 16} stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 3" />
              <polygon points={`${x2s(x) + 6},${y2s(f(x)) + 10} ${x2s(x)},${y2s(f(x)) + 16} ${x2s(x) + 6},${y2s(f(x)) + 22}`} fill="#22c55e" fillOpacity={0.7} />
            </>
          )}

          {/* Right approach arrow */}
          {x > target && (
            <>
              <line x1={x2s(rightApproach)} y1={y2s(f(rightApproach)) + 16} x2={x2s(x)} y2={y2s(f(x)) + 16} stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3" />
              <polygon points={`${x2s(x) - 6},${y2s(f(x)) + 10} ${x2s(x)},${y2s(f(x)) + 16} ${x2s(x) - 6},${y2s(f(x)) + 22}`} fill="#f59e0b" fillOpacity={0.7} />
            </>
          )}

          {/* Vertical guide line */}
          <line x1={x2s(x)} y1={MT} x2={x2s(x)} y2={H - MB} stroke="#7c5cfc" strokeWidth={1.5} strokeDasharray="5 4" strokeOpacity={0.7} />

          {/* Intersection point */}
          <circle cx={x2s(x)} cy={y2s(f(x))} r={5} fill="#e879f9" stroke="#7c5cfc" strokeWidth={2} />
        </svg>
      </div>

      {/* Value readout */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#131926] border border-border/50 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1"><InlineMath>x</InlineMath></p>
          <p className="text-2xl font-bold tabular-nums">{x.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-[#131926] border border-border/50 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1"><InlineMath>f(x)</InlineMath></p>
          <p className="text-2xl font-bold tabular-nums">{f(x).toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-[#7c5cfc]/10 to-[#c084fc]/10 border border-[#7c5cfc]/20 p-5 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          As <InlineMath>x \\to 2</InlineMath> from {x < target ? "below" : "above"}, <InlineMath>f(x) \\to</InlineMath>
        </p>
        <p className="text-4xl font-bold gradient-text">{limitVal.toFixed(0)}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {x < target
            ? `← Approaching from the left (x = ${x.toFixed(2)})`
            : `→ Approaching from the right (x = ${x.toFixed(2)})`}
        </p>
      </div>
    </div>
  )
}
