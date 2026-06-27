"use client"

import { useState } from "react"

export function IntegralVisualizer() {
  const [n, setN] = useState(4)
  const f = (x: number) => x * x
  const a = 0, b = 2

  const rectangles = Array.from({ length: n }, (_, i) => {
    const left = a + ((b - a) * i) / n
    const height = f(left)
    return { x: left, width: (b - a) / n, height, area: height * ((b - a) / n) }
  })

  const totalArea = rectangles.reduce((sum, r) => sum + r.area, 0)
  const actualArea = 8 / 3

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Approximating &int;₀² x² dx with rectangles (Riemann sum)</p>
      <div className="flex items-center gap-4">
        <span className="text-sm shrink-0">Rectangles:</span>
        <input
          type="range"
          min="1"
          max="50"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="flex-1 accent-primary"
        />
        <span className="text-sm font-mono w-8 text-right">{n}</span>
      </div>
      <div className="rounded-lg bg-muted p-4">
        <div className="space-y-1 text-center">
          <p className="text-sm text-muted-foreground">
            Approximated area: <span className="font-mono font-bold">{totalArea.toFixed(4)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Actual area: <span className="font-mono font-bold">{actualArea.toFixed(4)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Error: <span className="font-mono font-bold">{(actualArea - totalArea).toFixed(4)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
