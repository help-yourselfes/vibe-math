"use client"

import { useState } from "react"

export function ChainExplorer() {
  const [x, setX] = useState(2)
  const outer = (u: number) => Math.sin(u)
  const inner = (t: number) => t * t
  const chain = (t: number) => outer(inner(t))
  const chainDerivative = (t: number) => 2 * t * Math.cos(t * t)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Explore f(x) = sin(x²) and its derivative using the chain rule</p>
      <input
        type="range"
        min="-3"
        max="3"
        step="0.1"
        value={x}
        onChange={(e) => setX(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-muted p-3 text-center">
          <p className="text-xs text-muted-foreground">x =</p>
          <p className="text-xl font-bold">{x.toFixed(1)}</p>
        </div>
        <div className="rounded-lg bg-muted p-3 text-center">
          <p className="text-xs text-muted-foreground">Inner u = x²</p>
          <p className="text-xl font-bold">{inner(x).toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-center">
          <p className="text-xs text-muted-foreground">sin(x²)</p>
          <p className="text-xl font-bold">{chain(x).toFixed(4)}</p>
        </div>
        <div className="rounded-lg bg-green-100 p-3 text-center dark:bg-green-900">
          <p className="text-xs text-muted-foreground">Derivative 2x&middot;cos(x²)</p>
          <p className="text-xl font-bold">{chainDerivative(x).toFixed(4)}</p>
        </div>
      </div>
    </div>
  )
}
