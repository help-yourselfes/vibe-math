"use client"

import { useEffect, useState } from "react"
import { FireIcon } from "@/components/ui/icons"

export function StreakCounter() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("vibemath-streak")
    const lastDate = stored ? JSON.parse(stored) : null
    const today = new Date().toDateString()

    if (lastDate?.date === today) {
      setStreak(lastDate.count)
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      if (lastDate?.date === yesterday) {
        const newStreak = (lastDate?.count || 0) + 1
        setStreak(newStreak)
        localStorage.setItem("vibemath-streak", JSON.stringify({ date: today, count: newStreak }))
      } else {
        setStreak(1)
        localStorage.setItem("vibemath-streak", JSON.stringify({ date: today, count: 1 }))
      }
    }
  }, [])

  return (
    <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2">
      <FireIcon className="text-primary" size={18} />
      <div>
        <p className="text-sm font-bold text-primary tabular-nums">{streak}</p>
        <p className="text-[10px] text-muted-foreground leading-tight">day streak</p>
      </div>
    </div>
  )
}
