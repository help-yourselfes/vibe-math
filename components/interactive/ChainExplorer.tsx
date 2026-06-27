"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <input
              type="range"
              min={-3}
              max={3}
              step={0.05}
              value={x}
              onChange={e => setX(parseFloat(e.target.value))}
              className="w-full"
            />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-lg border border-border/40 bg-[rgba(13,17,23,0.5)] p-3 text-center"
        >
          <p className="text-[11px] text-muted-foreground mb-1">Outside: cos(x²)</p>
          <p className="text-sm font-medium tabular-nums text-[#4f46e5]">{outerDerivative(x * x).toFixed(4)}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-lg border border-border/40 bg-[rgba(13,17,23,0.5)] p-3 text-center"
        >
          <p className="text-[11px] text-muted-foreground mb-1">Inside: 2x</p>
          <p className="text-sm font-medium tabular-nums text-[#4f46e5]">{innerDerivative(x).toFixed(4)}</p>
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-lg border border-[#4f46e5]/20 bg-[#4f46e5]/5 p-4 text-center"
      >
        <p className="text-[11px] text-muted-foreground mb-1.5">Chain rule result: cos(x²) · 2x</p>
        <motion.p
          key={x.toFixed(2)}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="text-xl font-bold tabular-nums text-[#4f46e5]"
        >
          {chainDerivative(x).toFixed(4)}
        </motion.p>
      </motion.div>
    </div>
  )
}
