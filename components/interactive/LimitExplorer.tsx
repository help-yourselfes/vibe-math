"use client"

import { useState } from "react"

export function LimitExplorer() {
  const [x, setX] = useState(2)
  const f = (t: number) => t * t - 1
  const target = 2

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Drag the slider to see how f(x) = x² - 1 behaves as x approaches 2</p>
      <input
        type="range"
        min="0"
        max="4"
        step="0.1"
        value={x}
        onChange={(e) => setX(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-sm text-muted-foreground">x =</p>
          <p className="text-2xl font-bold">{x.toFixed(1)}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-sm text-muted-foreground">f(x) =</p>
          <p className="text-2xl font-bold">{f(x).toFixed(1)}</p>
        </div>
      </div>
      <div className="rounded-lg bg-primary/10 p-4 text-center">
        <p className="text-sm text-muted-foreground">As x &rarr; 2, f(x) &rarr;</p>
        <p className="text-3xl font-bold text-primary">{f(target).toFixed(0)}</p>
      </div>
    </div>
  )
}
