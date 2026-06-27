"use client"

import { Progress } from "@/components/ui/progress"

export function StickyProgress({ current, total, title }: { current: number; total: number; title: string }) {
  const pct = Math.round((current / total) * 100)

  return (
    <div style={{ position: "sticky", top: "56px", zIndex: 40 }} className="w-full border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1200px] px-6 py-2">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span className="truncate font-medium text-foreground/70">{title}</span>
              <span className="tabular-nums">{current}/{total} · {pct}%</span>
            </div>
            <Progress value={pct} className="h-1.5" />
          </div>
        </div>
      </div>
    </div>
  )
}
