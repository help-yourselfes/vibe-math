"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { InlineMath } from "@/components/ui/katex"

export function ChainExplorer() {
  const [x, setX] = useState(1.0)

  function outerDerivative(u: number) { return Math.cos(u) }
  function innerDerivative(x: number) { return 2 * x }
  function chainDerivative(x: number) { return outerDerivative(x * x) * innerDerivative(x) }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">f(x) = sin(x²)</p>
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">x = <InlineMath>{`x = ${x.toFixed(2)}`}</InlineMath></p>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.05}
            value={x}
            onChange={e => setX(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/40 bg-card/20 p-3 text-center">
          <p className="text-[11px] text-muted-foreground mb-1">Outside: cos(x²)</p>
          <p className="text-sm font-medium tabular-nums text-primary">{outerDerivative(x * x).toFixed(4)}</p>
        </div>
        <div className="rounded-lg border border-border/40 bg-card/20 p-3 text-center">
          <p className="text-[11px] text-muted-foreground mb-1">Inside: 2x</p>
          <p className="text-sm font-medium tabular-nums text-primary">{innerDerivative(x).toFixed(4)}</p>
        </div>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
        <p className="text-[11px] text-muted-foreground mb-1.5">Chain rule result: cos(x²) · 2x</p>
        <p className="text-xl font-bold tabular-nums text-primary">{chainDerivative(x).toFixed(4)}</p>
      </div>
    </div>
  )
}
