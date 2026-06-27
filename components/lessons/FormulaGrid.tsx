"use client"

import { Fragment } from "react"
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

export function FormulaGrid({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
      {items.map((item, i) => {
        const cleaned = item.replace(/^-\s+/, "")
        const dollarMatch = cleaned.match(/^\$([^$]+)\$\s*(.*)$/)
        if (dollarMatch) {
          const formula = dollarMatch[1]
          const label = dollarMatch[2].replace(/^[\(\[{]|[\\)\]}]$/g, "")
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
