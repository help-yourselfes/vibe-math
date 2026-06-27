"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { MathSparkline } from "@/components/ui/MathSparkline"
import { CrownIcon, LockIcon } from "@/components/ui/icons"
import { Clock, Zap, Brain } from "lucide-react"

interface CatalogCardProps {
  slug: string
  order: number
  title: string
  isFree: boolean
  time: string
  xp: number
  interactives: number
}

export function CatalogCard({ slug, order, title, isFree, time, xp, interactives }: CatalogCardProps) {
  return (
    <Link href={isFree ? `/lessons/${slug}` : "/pricing"}>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={cn(
          "group relative rounded-xl overflow-hidden cursor-pointer",
          "bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] border border-[#1f2937]",
          "hover:border-[#4f46e5]/40 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]",
          "transition-all duration-200"
        )}
      >
        {!isFree && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[rgba(5,5,8,0.7)] backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-[#4f46e5]/20 p-3 mb-3 ring-1 ring-[#4f46e5]/30">
              <LockIcon className="h-6 w-6 text-[#818cf8]" />
            </div>
            <p className="text-sm font-medium mb-2">Premium Lesson</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#818cf8] px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
              <CrownIcon size={12} />
              Unlock All
            </span>
          </div>
        )}

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-[#4f46e5]/10 text-[#818cf8] text-xs font-bold border border-[#4f46e5]/20">
                {order}
              </span>
              <h3 className="text-base font-semibold leading-tight truncate">{title}</h3>
            </div>
            {isFree ? (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#4f46e5]/60 px-2 py-0.5 rounded border border-[#4f46e5]/20">
                Free
              </span>
            ) : (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 px-2 py-0.5 rounded border border-border">
                Premium
              </span>
            )}
          </div>

          <div className="flex justify-center py-2">
            <MathSparkline slug={slug} width={180} height={50} />
          </div>

          <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-[#4f46e5]/50 shrink-0" />
              {time}
            </span>
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-[#4f46e5]/50 shrink-0" />
              XP +{xp}
            </span>
            {interactives > 0 && (
              <span className="flex items-center gap-1">
                <Brain size={12} className="text-[#4f46e5]/50 shrink-0" />
                {interactives} interactive
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
