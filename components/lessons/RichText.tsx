"use client"

import { Fragment } from "react"
import { MathBlock } from "./MathBlock"

export function RichText({ content }: { content: string }) {
  const parts = parseContent(content)
  return (
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.type === "math-display") return <MathBlock key={i} math={part.value} display />
        if (part.type === "math") return <MathBlock key={i} math={part.value} />
        const formatted = part.value.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
          seg.startsWith("**") && seg.endsWith("**")
            ? <strong key={j} className="font-semibold text-foreground">{seg.slice(2, -2)}</strong>
            : <Fragment key={j}>{seg}</Fragment>
        )
        return <span key={i}>{formatted}</span>
      })}
    </span>
  )
}

function parseContent(content: string) {
  const parts: Array<{ type: "text" | "math" | "math-display"; value: string }> = []
  const combinedRegex = /(\$\$[^$]*\$\$|\$[^$]*\$)/g
  let lastIndex = 0, match
  while ((match = combinedRegex.exec(content)) !== null) {
    if (match.index > lastIndex) parts.push({ type: "text", value: content.slice(lastIndex, match.index) })
    const eq = match[1]
    parts.push(eq.startsWith("$$") && eq.endsWith("$$")
      ? { type: "math-display", value: eq.slice(2, -2) }
      : { type: "math", value: eq.slice(1, -1) })
    lastIndex = match.index + match[1].length
  }
  if (lastIndex < content.length) parts.push({ type: "text", value: content.slice(lastIndex) })
  return parts
}
