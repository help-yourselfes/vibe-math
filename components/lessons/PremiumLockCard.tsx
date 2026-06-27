"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CrownIcon, LockIcon, ZapIcon, CheckIcon, SparklesIcon } from "@/components/ui/icons"

export function PremiumLockCard() {
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-12 text-center space-y-6">
      <div className="rounded-full bg-gradient-to-br from-[#4f46e5]/20 to-[#818cf8]/20 p-4 ring-1 ring-[#4f46e5]/30 inline-flex">
        <LockIcon className="h-8 w-8 text-[#818cf8]" />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="text-xl font-bold tracking-tight">Premium Lesson</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This lesson is part of the premium curriculum. Unlock all 10 lessons
          with a single purchase and level up your calculus skills.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
        {[
          { title: "All 10 Lessons", desc: "From limits to differential equations" },
          { title: "Interactive Tools", desc: "Step solvers, graphs, and visualizers" },
          { title: "Full Progress", desc: "Streaks, tracking, and milestones" },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-[#4f46e5]/20 bg-[#4f46e5]/5 p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#818cf8] mb-3">
              <CheckIcon size={12} />
              {item.title}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 pt-2">
        <Link href="/pricing">
          <Button variant="premium" size="lg">
            <CrownIcon size={16} />
            Unlock Premium — $29 Lifetime
          </Button>
        </Link>
        <Link href="/lessons">
          <Button variant="ghost" size="lg">
            Back to Lessons
          </Button>
        </Link>
      </div>
    </div>
  )
}
