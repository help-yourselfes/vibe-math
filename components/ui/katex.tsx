"use client"

import { useEffect, useRef } from "react"
import katex from "katex"

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  return ""
}

export function InlineMath({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const source = extractText(children).replace(/\\\\/g, "\\")

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(source, ref.current, { throwOnError: false })
      } catch {
        ref.current.textContent = source
      }
    }
  }, [source])

  return <span ref={ref} className="katex-inline" />
}

export function DisplayMath({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const source = extractText(children).replace(/\\\\/g, "\\")

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(source, ref.current, { throwOnError: false, displayMode: true })
      } catch {
        ref.current.textContent = source
      }
    }
  }, [source])

  return (
    <div className="katex-display-wrapper my-6 text-center overflow-x-auto overflow-y-hidden py-4 px-2 rounded-xl bg-muted/30 border border-border/30">
      <span ref={ref} />
    </div>
  )
}
