"use client"

import { Fragment, useState } from "react"
import { motion } from "framer-motion"
import { MathBlock } from "./MathBlock"

function parseInlineMath(content: string) {
  const parts: Array<{ type: "text" | "math"; value: string }> = []
  const regex = /\$([^$]+)\$/g
  let lastIndex = 0, match
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) parts.push({ type: "text", value: content.slice(lastIndex, match.index) })
    parts.push({ type: "math", value: match[1] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < content.length) parts.push({ type: "text", value: content.slice(lastIndex) })
  return parts
}

function parseFormulaParts(formula: string) {
  const eqIdx = formula.indexOf("=")
  if (eqIdx === -1) return null
  return {
    input: formula.slice(0, eqIdx).trim(),
    output: formula.slice(eqIdx + 1).trim(),
  }
}

function FlipCard({ input, output, label }: { input: string; output: string; label: string }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="cursor-pointer group"
      style={{ perspective: "800px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transformStyle: "preserve-3d",
          minHeight: "70px",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-xl border border-border/50 bg-[#0d1117] p-4 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-center">
            <span className="text-sm leading-relaxed"><MathBlock math={input} /></span>
            {label && <span className="text-[11px] text-muted-foreground block mt-1">{label}</span>}
          </div>
          <motion.span
            className="absolute bottom-1.5 right-2 text-[10px] text-muted-foreground/30"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↻
          </motion.span>
        </div>
        <div
          className="absolute inset-0 rounded-xl border border-[#4f46e5]/30 bg-[#1e1b4b] p-4 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <span className="text-sm leading-relaxed"><MathBlock math={output} /></span>
            {label && <span className="text-[11px] text-muted-foreground/60 block mt-1">{label}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FormulaGrid({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
      {items.map((item, i) => {
        const cleaned = item.replace(/^-\s+/, "")
        const dollarMatch = cleaned.match(/^\$([^$]+)\$\s*(.*)$/)
        if (dollarMatch) {
          const formula = dollarMatch[1]
          const label = dollarMatch[2].replace(/^[\(\[{]|[\\)\]}]$/g, "")
          const parts = parseFormulaParts(formula)
          if (parts) {
            return (
              <FlipCard
                key={i}
                input={parts.input}
                output={parts.output}
                label={label}
              />
            )
          }
          return (
            <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-4 hover:border-border hover:bg-card/50 transition-all duration-200 group">
              <div className="flex items-center justify-between gap-3 min-h-[40px]">
                <span className="text-sm"><MathBlock math={formula} /></span>
                {label && <span className="text-[11px] text-muted-foreground shrink-0 text-right">{label}</span>}
              </div>
            </div>
          )
        }
        return (
          <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-4 hover:border-border hover:bg-card/50 transition-all duration-200">
            <p className="text-sm text-foreground/90 leading-relaxed">
              {parseInlineMath(cleaned).map((part, j) =>
                part.type === "math"
                  ? <MathBlock key={j} math={part.value} />
                  : <Fragment key={j}>{part.value}</Fragment>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}
