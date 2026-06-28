"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { lessons } from "@/lessons-data/lessons"
import { cn } from "@/lib/utils"
import { LockIcon, CheckIcon } from "@/components/ui/icons"
import { Logo } from "@/components/ui/Logo"
import { InlineMath } from "@/components/ui/katex"
import { useApp } from "./AppShell"
import { glossaryTerms, type GlossaryEntry } from "@/components/glossary/glossaryData"
import { reviewQuestions, type ReviewQuestion } from "@/components/review/reviewQuestions"

const lessonSlugs = Object.keys(lessons)
const freeCount = 3

const categoryLabels: Record<string, string> = {
  definition: "Definitions",
  formula: "Formulas",
  theorem: "Core Theorems",
}

function CircularProgress({ pct, glow }: { pct: number; glow?: boolean }) {
  const r = 18
  const circ = 2 * Math.PI * r
  return (
    <div className="relative shrink-0">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#1f2937" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={r}
          fill="none" stroke="#4f46e5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - (pct / 100) * circ}
          transform="rotate(-90 22 22)"
          className="transition-all duration-500"
        />
        <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fill="#e2e8f0" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
          {pct}
        </text>
      </svg>
      {glow && (
        <svg
          width="52" height="52" viewBox="0 0 52 52"
          className="absolute -inset-1 pointer-events-none"
        >
          <circle
            cx="26" cy="26" r="24"
            fill="none" stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-pulse-glow"
          />
        </svg>
      )}
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back to course
    </button>
  )
}

// ── Glossary Panel ──
function GlossaryPanel({
  viewedSlugs,
  activeTerm,
  onBack,
}: {
  viewedSlugs: Set<string>
  activeTerm: string | null
  onBack: () => void
}) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [activeTerm])

  const groups = useMemo(() => {
    const map: Record<string, GlossaryEntry[]> = { definition: [], formula: [], theorem: [] }
    for (const entry of glossaryTerms) {
      if (!map[entry.category]) map[entry.category] = []
      map[entry.category].push(entry)
    }
    return map
  }, [])

  const activeLower = activeTerm?.toLowerCase()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 h-[60px] border-b border-[#1f2937] shrink-0">
        <BackButton onClick={onBack} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {(["definition", "formula", "theorem"] as const).map((cat) => {
          const entries = groups[cat]
          if (!entries.length) return null
          return (
            <div key={cat}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40 mb-3">
                {categoryLabels[cat]}
              </p>
              <div className="space-y-2">
                {entries.map((entry) => {
                  const isActive = activeLower === entry.term.toLowerCase()
                  const isViewed = viewedSlugs.has(entry.lessonSlug)
                  return (
                    <div
                      key={entry.term}
                      ref={isActive ? activeRef : undefined}
                      className={cn(
                        "rounded-lg border p-3 transition-all duration-200",
                        isActive
                          ? "border-[#4f46e5]/40 bg-[#4f46e5]/8 shadow-[0_0_12px_rgba(79,70,229,0.15)]"
                          : "border-[#1f2937] bg-[rgba(13,17,23,0.4)]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className={cn(
                          "text-sm font-medium",
                          isActive ? "text-[#818cf8]" : "text-foreground/80"
                        )}>
                          {entry.term}
                        </p>
                        <span className={cn(
                          "text-[10px] font-medium px-1.5 py-0.5 rounded",
                          isViewed
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-[#1f2937] text-muted-foreground/40"
                        )}>
                          {isViewed ? "Learned" : "New"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/70 leading-relaxed">{entry.definition}</p>
                      {entry.formula && (
                        <div className="mt-1.5 text-xs text-[#818cf8]/80">
                          <InlineMath>{entry.formula}</InlineMath>
                        </div>
                      )}
                      <Link
                        href={`/lessons/${entry.lessonSlug}`}
                        className="inline-block mt-2 text-[11px] text-[#4f46e5]/60 hover:text-[#818cf8] hover:bg-[#4f46e5]/10 hover:underline px-1.5 py-0.5 rounded transition-all duration-150"
                      >
                        View context lesson →
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Review Sprint ──
function ReviewSprint({
  slug,
  onBack,
  onComplete,
}: {
  slug: string
  onBack: () => void
  onComplete: () => void
}) {
  const questions = reviewQuestions[slug]
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const lesson = lessons[slug]

  const q = questions?.[qIdx]

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-4 h-[60px] border-b border-[#1f2937] shrink-0">
          <BackButton onClick={onBack} />
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-xs text-muted-foreground/50">No review questions for this lesson yet.</p>
        </div>
      </div>
    )
  }

  const handleSelect = (idx: number) => {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    if (idx === q.correctIndex) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (qIdx < questions.length - 1) {
      setQIdx((i) => i + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      setFinished(true)
      if (score >= Math.ceil(questions.length * 0.6)) {
        onComplete()
      }
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-4 h-[60px] border-b border-[#1f2937] shrink-0">
          <BackButton onClick={onBack} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl font-bold font-mono transition-all duration-500",
            pct >= 80
              ? "bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
              : "bg-[#1f2937] text-muted-foreground"
          )}>
            {pct}
          </div>
          <p className="text-sm font-medium text-foreground/80 mb-1">
            {pct >= 80 ? "Sprint cleared!" : "Keep practicing"}
          </p>
          <p className="text-xs text-muted-foreground/50 mb-6">
            {score}/{questions.length} correct
          </p>
          <button
            onClick={onBack}
            className="text-xs text-[#4f46e5]/60 hover:text-[#818cf8] transition-colors"
          >
            Back to course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-[60px] border-b border-[#1f2937] shrink-0">
        <BackButton onClick={onBack} />
        <span className="text-[11px] text-muted-foreground/40 font-mono">{qIdx + 1}/{questions.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm font-medium text-foreground/80 mb-4 leading-relaxed">
          {q?.question}
        </p>
        <div className="space-y-2">
          {q?.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex
            const isSelected = i === selected
            let stateClass = "border-[#1f2937] hover:border-[#334155]"
            if (revealed && isCorrect) stateClass = "border-emerald-500/50 bg-emerald-500/8"
            else if (revealed && isSelected && !isCorrect) stateClass = "border-red-500/40 bg-red-500/8"

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  "w-full text-left text-xs px-3 py-2.5 rounded-lg border transition-all duration-150",
                  stateClass,
                  revealed ? "cursor-default" : "cursor-pointer"
                )}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {revealed && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground/60 leading-relaxed mb-3">{q?.explanation}</p>
            <button
              onClick={handleNext}
              className="w-full text-xs py-2 rounded-lg bg-[#4f46e5] text-white hover:brightness-110 transition-all"
            >
              {qIdx < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Sidebar ──
export function Sidebar() {
  const pathname = usePathname()
  const {
    collapsed, setCollapsed,
    sidebarMode, setSidebarMode,
    activeGlossaryTerm, setActiveGlossaryTerm,
    reviewGlow, triggerReviewGlow,
    reviewLessonSlug, setReviewLessonSlug,
  } = useApp()

  const currentSlug = pathname.startsWith("/lessons/") ? pathname.replace("/lessons/", "") : null

  const [viewedSlugs, setViewedSlugs] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vibemath_viewed_lessons")
      if (stored) setViewedSlugs(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  useEffect(() => {
    if (!currentSlug) return
    setViewedSlugs((prev) => {
      if (prev.has(currentSlug)) return prev
      const next = new Set(prev)
      next.add(currentSlug)
      try {
        localStorage.setItem("vibemath_viewed_lessons", JSON.stringify([...next]))
      } catch {}
      return next
    })
  }, [currentSlug])

  const pct = Math.round((viewedSlugs.size / lessonSlugs.length) * 100)

  const handleBackToCourse = () => {
    setSidebarMode("course")
    setActiveGlossaryTerm(null)
    setReviewLessonSlug(null)
  }

  const handleGlossaryTerm = (term: string) => {
    setActiveGlossaryTerm(term)
    setSidebarMode("glossary")
    setCollapsed(false)
  }

  const handleStartReview = (slug: string) => {
    setReviewLessonSlug(slug)
    setSidebarMode("review")
  }

  const reviewSlugs = lessonSlugs.filter((slug) => viewedSlugs.has(slug) && reviewQuestions[slug])

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen z-40 flex flex-col bg-[#030308] border-r border-[#1f2937] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap",
          collapsed ? "w-0" : "w-[280px]"
        )}
      >
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-[60px] border-b border-[#1f2937] shrink-0">
          {sidebarMode !== "course" ? (
            <BackButton onClick={handleBackToCourse} />
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2.5 font-semibold text-base tracking-tight min-w-0">
                <Logo size="sm" />
                <span className="truncate text-foreground/90">Vibe Math</span>
              </Link>
              <div className="ml-auto">
                <CircularProgress pct={pct} glow={reviewGlow} />
              </div>
            </>
          )}
        </div>

        {/* Content */}
        {sidebarMode === "glossary" && (
          <GlossaryPanel
            viewedSlugs={viewedSlugs}
            activeTerm={activeGlossaryTerm}
            onBack={handleBackToCourse}
          />
        )}

        {sidebarMode === "review" && reviewLessonSlug && (
          <ReviewSprint
            slug={reviewLessonSlug}
            onBack={handleBackToCourse}
            onComplete={() => triggerReviewGlow()}
          />
        )}

        {sidebarMode === "course" && (
          <>
            <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto">
              {lessonSlugs.map((slug, i) => {
                const lesson = lessons[slug]
                const isCurrent = slug === currentSlug
                const isViewed = viewedSlugs.has(slug)
                const isPremium = i >= freeCount
                const isLocked = isPremium && !isViewed

                const row = (
                  <div
                    className={cn(
                      "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer",
                      isCurrent
                        ? "bg-[#4f46e5]/12 text-foreground shadow-[inset_0_0_0_1px_rgba(79,70,229,0.25)]"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.03]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center w-7 h-7 rounded-md text-[11px] font-bold shrink-0 border transition-all duration-150",
                        isCurrent
                          ? "bg-[#4f46e5]/20 text-[#818cf8] border-[#4f46e5]/40 shadow-[0_0_12px_rgba(79,70,229,0.25)]"
                          : isViewed
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-[#1f2937] text-muted-foreground/40 border-[#1f2937]"
                      )}
                    >
                      {isViewed ? (
                        <CheckIcon size={10} />
                      ) : isLocked ? (
                        <LockIcon size={10} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className={cn("flex-1 truncate", isCurrent && "font-medium")}>
                      {lesson.title}
                    </span>
                    {isViewed && !isCurrent && (
                      <CheckIcon size={12} className="shrink-0 text-emerald-400/60" />
                    )}
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] shadow-[0_0_6px_rgba(79,70,229,0.6)] shrink-0" />
                    )}
                  </div>
                )

                if (isLocked) {
                  return <div key={slug} className="cursor-not-allowed">{row}</div>
                }

                return (
                  <Link key={slug} href={`/lessons/${slug}`}>
                    {row}
                  </Link>
                )
              })}
            </nav>

            {/* Review section */}
            <div className="border-t border-[#1f2937] p-4 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Link
                  href="/glossary"
                  className="text-xs text-muted-foreground/50 hover:text-[#818cf8] transition-colors flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  My Glossary
                </Link>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
                <span className="inline-block w-2 h-2 rounded-full bg-[#4f46e5]/30" />
                <span>Free lessons 1–{freeCount}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1f2937] flex items-center justify-center text-[10px] font-bold text-muted-foreground/60 border border-border/30 shrink-0">
                  U
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-muted-foreground/80 truncate">guest@vibemath.app</p>
                  <p className="text-[11px] text-muted-foreground/40">Guest</p>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "fixed top-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#1f2937] border border-[#1f2937] text-muted-foreground/60 hover:text-foreground hover:bg-[#334155] transition-all duration-200 ease-in-out cursor-pointer",
          collapsed ? "left-4" : "left-[296px]"
        )}
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={collapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
        </svg>
      </button>
    </>
  )
}
