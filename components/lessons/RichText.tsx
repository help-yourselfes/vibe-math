"use client"

import { Fragment, useMemo } from "react"
import { MathBlock } from "./MathBlock"
import { glossaryRegex } from "@/components/glossary/glossaryData"
import { useApp } from "@/components/layout/AppShell"

export function RichText({ content }: { content: string }) {
  const { setActiveGlossaryTerm, setSidebarMode, setCollapsed } = useApp()
  const parts = parseContent(content)

  const nodes = useMemo(() => {
    const result: React.ReactNode[] = []
    let key = 0

    for (const part of parts) {
      if (part.type === "math-display") {
        result.push(<MathBlock key={key++} math={part.value} display />)
        continue
      }
      if (part.type === "math") {
        result.push(<MathBlock key={key++} math={part.value} />)
        continue
      }
      const processed = processTextWithGlossary(part.value, (term) => {
        setActiveGlossaryTerm(term)
        setSidebarMode("glossary")
        setCollapsed(false)
      }, key)
      result.push(...processed.nodes)
      key = processed.nextKey
    }

    return result
  }, [parts, setActiveGlossaryTerm, setSidebarMode, setCollapsed])

  return <span className="leading-relaxed">{nodes}</span>
}

function processTextWithGlossary(
  text: string,
  onGlossaryTerm: (term: string) => void,
  startKey = 0,
): { nodes: React.ReactNode[]; nextKey: number } {
  const nodes: React.ReactNode[] = []
  let key = startKey

  const fmtParts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

  for (const part of fmtParts) {
    if (!part) continue
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2)
      const innerResult = processGlossarySegments(inner, onGlossaryTerm, key)
      nodes.push(<strong key={key++}>{innerResult.nodes}</strong>)
      key = innerResult.nextKey
    } else if (part.startsWith("*") && part.endsWith("*")) {
      const inner = part.slice(1, -1)
      const innerResult = processGlossarySegments(inner, onGlossaryTerm, key)
      nodes.push(
        <span key={key++} className="inline-block border-l-2 border-[#4f46e5]/30 bg-[rgba(13,17,23,0.4)] rounded-r-lg px-3 py-1 my-1.5 text-sm text-[#94a3b8] italic">
          {innerResult.nodes}
        </span>
      )
      key = innerResult.nextKey
    } else if (part) {
      const plainResult = processGlossarySegments(part, onGlossaryTerm, key)
      nodes.push(...plainResult.nodes)
      key = plainResult.nextKey
    }
  }

  return { nodes, nextKey: key }
}

function processGlossarySegments(
  text: string,
  onGlossaryTerm: (term: string) => void,
  startKey = 0,
): { nodes: React.ReactNode[]; nextKey: number } {
  const nodes: React.ReactNode[] = []
  let key = startKey
  let lastIdx = 0
  const re = new RegExp(glossaryRegex.source, "gi")
  let m: RegExpExecArray | null

  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIdx, m.index)}</Fragment>)
    }
    const matchedTerm = m[0]
    nodes.push(
      <button
        key={key++}
        onClick={(e) => {
          e.stopPropagation()
          onGlossaryTerm(matchedTerm)
        }}
        className="cursor-pointer border-b border-dotted border-[#4f46e5]/50 text-foreground/90 hover:text-[#818cf8] transition-colors text-left"
      >
        {matchedTerm}
      </button>,
    )
    lastIdx = m.index + matchedTerm.length
  }

  if (lastIdx < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIdx)}</Fragment>)
  }

  return { nodes, nextKey: key }
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
