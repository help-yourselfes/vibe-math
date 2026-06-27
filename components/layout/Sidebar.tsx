"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { lessons } from "@/lessons-data/lessons"
import { cn } from "@/lib/utils"
import { LockIcon, CheckIcon } from "@/components/ui/icons"

const lessonSlugs = Object.keys(lessons)
const freeCount = 3

export function Sidebar() {
  const pathname = usePathname()

  if (!pathname.startsWith("/lessons") && pathname !== "/dashboard") return null

  const currentSlug = pathname.startsWith("/lessons/") ? pathname.replace("/lessons/", "") : null

  return (
    <aside
      style={{ position: "sticky", top: "0", height: "calc(100vh - 3.5rem)" }}
      className="hidden lg:flex w-72 shrink-0 flex-col border-r border-[#1e293b] bg-[#0b0f17] overflow-y-auto"
    >
      <div className="px-4 py-4 border-b border-[#1e293b]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">Course</p>
        <p className="text-xs text-muted-foreground/70 mt-0.5">{lessonSlugs.length} lessons</p>
      </div>
      <nav className="flex-1 py-2">
        {lessonSlugs.map((slug, i) => {
          const lesson = lessons[slug]
          const isCurrent = slug === currentSlug
          const isPremium = i >= freeCount

          return (
            <Link
              key={slug}
              href={`/lessons/${slug}`}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 border-l-2",
                isCurrent
                  ? "border-l-[#7c5cfc] bg-[#7c5cfc]/8 text-foreground"
                  : "border-l-transparent text-muted-foreground/70 hover:text-foreground hover:bg-white/[0.03]"
              )}
            >
              <span className={cn(
                "flex items-center justify-center w-7 h-7 rounded-md text-[11px] font-bold shrink-0 border",
                isCurrent
                  ? "bg-[#7c5cfc]/15 text-[#c084fc] border-[#7c5cfc]/30"
                  : "bg-[#1e293b] text-muted-foreground border-[#334155]"
              )}>
                {i + 1}
              </span>
              <span className="flex-1 truncate">{lesson.title}</span>
              {isPremium ? (
                <LockIcon size={12} className="shrink-0 text-muted-foreground/40" />
              ) : (
                <CheckIcon size={12} className="shrink-0 text-[#7c5cfc]/40" />
              )}
            </Link>
          )
        })}
      </nav>
      <div className="px-4 py-3 border-t border-[#1e293b]">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
          <span className="inline-block w-2 h-2 rounded-full bg-[#7c5cfc]/30" />
          <span>Free lessons 1–3</span>
        </div>
      </div>
    </aside>
  )
}
