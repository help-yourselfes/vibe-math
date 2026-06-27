"use client"

import { useEffect, useRef } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"
import { LimitExplorer } from "@/components/interactive/LimitExplorer"
import { DerivativeStepSolver } from "@/components/interactive/DerivativeStepSolver"
import { IntegralVisualizer } from "@/components/interactive/IntegralVisualizer"
import { ChainExplorer } from "@/components/interactive/ChainExplorer"
import { ProductRuleSolver } from "@/components/interactive/ProductRuleSolver"
import { USubSolver } from "@/components/interactive/USubSolver"

function MathBlock({ math, display }: { math: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          throwOnError: false,
          displayMode: display ?? false,
        })
      } catch {
        ref.current.textContent = math
      }
    }
  }, [math, display])

  return display ? (
    <div className="katex-display my-4 text-center overflow-x-auto py-2">
      <span ref={ref} />
    </div>
  ) : (
    <span ref={ref} className="katex-inline mx-1" />
  )
}

function parseContent(content: string): Array<{ type: "text" | "math" | "math-display"; value: string }> {
  const parts: Array<{ type: "text" | "math" | "math-display"; value: string }> = []
  const combinedRegex = /(\$\$[^$]*\$\$|\$[^$]*\$)/g
  let lastIndex = 0
  let match

  while ((match = combinedRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) })
    }
    const eq = match[1]
    if (eq.startsWith("$$") && eq.endsWith("$$")) {
      parts.push({ type: "math-display", value: eq.slice(2, -2) })
    } else {
      parts.push({ type: "math", value: eq.slice(1, -1) })
    }
    lastIndex = match.index + match[1].length
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) })
  }

  return parts
}

function TextContent({ content }: { content: string }) {
  const parts = parseContent(content)

  return (
    <p className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.type === "math-display") {
          return <MathBlock key={i} math={part.value} display />
        }
        if (part.type === "math") {
          return <MathBlock key={i} math={part.value} />
        }
        const formatted = part.value.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return <strong key={j}>{seg.slice(2, -2)}</strong>
          }
          return seg
        })
        return <span key={i}>{formatted}</span>
      })}
    </p>
  )
}

function getInteractiveComponent(name?: string) {
  switch (name) {
    case "LimitExplorer": return <LimitExplorer />
    case "DerivativeStepSolver": return <DerivativeStepSolver />
    case "IntegralVisualizer": return <IntegralVisualizer />
    case "ChainExplorer": return <ChainExplorer />
    case "ProductRuleSolver": return <ProductRuleSolver />
    case "USubSolver": return <USubSolver />
    default: return null
  }
}

interface Section {
  type: "text" | "math" | "interactive" | "quiz"
  content: string
  interactive?: string
}

export function LessonRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-6 max-w-none">
      {sections.map((section, i) => {
        switch (section.type) {
          case "text":
            return <TextContent key={i} content={section.content} />
          case "interactive":
            return section.interactive ? (
              <div key={i} className="rounded-lg border bg-card p-4 my-4">
                {getInteractiveComponent(section.interactive)}
              </div>
            ) : null
          case "quiz":
            return (
              <div key={i} className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <TextContent content={section.content} />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
