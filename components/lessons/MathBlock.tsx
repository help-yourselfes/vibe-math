"use client"

import { useEffect, useRef } from "react"
import katex from "katex"

export function MathBlock({ math, display }: { math: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const normalized = math.replace(/\\\\/g, "\\")

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(normalized, ref.current, { throwOnError: false, displayMode: display ?? false, fleqn: false })
      } catch {
        ref.current.textContent = math
      }
    }
  })

  return display ? (
    <div className="katex-display-wrapper my-8 text-center overflow-x-auto overflow-y-hidden whitespace-nowrap py-5 px-4 rounded-xl bg-muted/30 border border-border/30">
      <span ref={ref} />
    </div>
  ) : (
    <span ref={ref} className="katex-inline mx-0.5" />
  )
}
