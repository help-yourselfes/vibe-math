import Link from "next/link"
import { SparklesIcon, LockIcon, CheckIcon } from "@/components/ui/icons"
import { Clock, Zap, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import katex from "katex"
import { lessons } from "@/lessons-data/lessons"

function renderMath(tex: string) {
  return { __html: katex.renderToString(tex, { throwOnError: false, displayMode: false }) }
}

const lessonMeta: Record<string, {
  time: string
  xp: number
  interactives: number
  description: string
  formula: string
}> = {
  "limits-intro": { time: "8 min", xp: 120, interactives: 1, description: "Understand the foundation of calculus — what happens as x gets closer to a point?", formula: "\\displaystyle\\lim_{x \\to a} f(x) = L" },
  "derivatives-intro": { time: "10 min", xp: 150, interactives: 1, description: "Learn how functions change: instantaneous rate of change and tangent slopes.", formula: "f'(x) = \\displaystyle\\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}" },
  "chain-rule": { time: "12 min", xp: 180, interactives: 1, description: "Differentiate composite functions by handling the outside and inside layers.", formula: "f'(x) = g'(h(x)) \\cdot h'(x)" },
  "product-quotient": { time: "12 min", xp: 180, interactives: 1, description: "Special rules for differentiating multiplied and divided functions.", formula: "(uv)' = u'v + uv'" },
  "integrals-intro": { time: "10 min", xp: 150, interactives: 1, description: "Reverse differentiation and find areas under curves with antiderivatives.", formula: "\\displaystyle\\int f(x) \\, dx = F(x) + C" },
  "u-substitution": { time: "10 min", xp: 150, interactives: 1, description: "Reverse the chain rule to integrate composite functions with substitution.", formula: "\\displaystyle\\int f(g(x))g'(x) \\, dx = \\int f(u) \\, du" },
  "integration-by-parts": { time: "14 min", xp: 200, interactives: 0, description: "The inverse of the product rule — a powerful integration technique.", formula: "\\displaystyle\\int u \\, dv = uv - \\int v \\, du" },
  "lhopitals-rule": { time: "10 min", xp: 150, interactives: 0, description: "Evaluate tricky limits with indeterminate forms using derivatives.", formula: "\\displaystyle\\lim \\frac{f}{g} = \\lim \\frac{f'}{g'}" },
  "taylor-series": { time: "16 min", xp: 220, interactives: 0, description: "Represent functions as infinite polynomial sums — the foundation of numerical methods.", formula: "f(x) = \\displaystyle\\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n" },
  "differential-equations": { time: "14 min", xp: 200, interactives: 0, description: "Equations involving derivatives that model population growth, motion, and more.", formula: "\\frac{dy}{dx} = ky \\;\\Longrightarrow\\; y = Ce^{kt}" },
}

const modules = [
  {
    title: "Differential Calculus",
    subtitle: "Limits, derivatives, and the mathematics of change",
    slugs: ["limits-intro", "derivatives-intro", "chain-rule", "product-quotient"],
  },
  {
    title: "Integral Calculus",
    subtitle: "Antiderivatives, areas, and accumulation",
    slugs: ["integrals-intro", "u-substitution", "integration-by-parts"],
  },
  {
    title: "Advanced Topics",
    subtitle: "Limits, series expansions, and differential equations",
    slugs: ["lhopitals-rule", "taylor-series", "differential-equations"],
  },
]

const allSlugs = modules.flatMap((m) => m.slugs)

function Milestone({ isFree, isLast, isCompleted }: { isFree: boolean; isLast: boolean; isCompleted: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={cn(
          "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0",
          isCompleted
            ? "border-slate-700 bg-slate-800/50"
            : isFree
              ? "border-[#4f46e5] bg-[#4f46e5]/15 shadow-[0_0_12px_rgba(79,70,229,0.3)]"
              : "border-slate-700 bg-slate-800/50"
        )}
      >
        {isCompleted ? (
          <CheckIcon size={14} className="text-slate-500" />
        ) : isFree ? (
          <div className="w-3 h-3 rounded-full bg-[#818cf8]" />
        ) : (
          <LockIcon size={14} className="text-slate-500" />
        )}
      </div>
      {!isLast && (
        <div className="absolute top-10 w-px h-full min-h-[4rem] border-l border-dashed border-slate-800" />
      )}
    </div>
  )
}

export default async function LessonsPage() {
  const hasPaid = false
  const freeCount = 3
  const currentIdx = freeCount - 1

  return (
    <div className="py-16 relative">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#4f46e5]/6 blur-[120px] pointer-events-none" />

      <div className="text-center space-y-5 max-w-xl mx-auto px-6 mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#4f46e5]/20 bg-[#4f46e5]/5 px-4 py-1.5 text-xs font-medium text-[#4f46e5]">
          <SparklesIcon size={14} />
          All lessons free during beta
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Calculus Roadmap</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          10 interactive lessons across 3 modules — follow the path from foundations to advanced topics.
        </p>
      </div>

      <div className="container px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {modules.map((mod, modIdx) => {
            return (
              <details key={mod.title} open className="group">
                <summary className="sticky top-0 z-20 list-none cursor-pointer bg-background/90 backdrop-blur-md py-4 flex items-center justify-between border-b border-slate-800/60 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#4f46e5]/70">
                        Module {modIdx + 1}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-slate-500 transition-transform duration-200 group-open:rotate-180"
                      >
                        <path d="M3 4.5l3 3 3-3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight mt-0.5">{mod.title}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{mod.subtitle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/50 shrink-0 ml-4">
                    {mod.slugs.length} {mod.slugs.length === 1 ? "lesson" : "lessons"}
                  </span>
                </summary>

                <div className="accordion-content">
                  <div>
                  {mod.slugs.map((slug, lIdx) => {
                    const globalIdx = allSlugs.indexOf(slug)
                    const isCompleted = globalIdx < currentIdx
                    const isFree = globalIdx < freeCount || hasPaid
                    const meta = lessonMeta[slug] ?? { time: "10 min", xp: 150, interactives: 1, description: "", formula: "" }
                    const lessonData = lessons[slug]
                    const isLast = lIdx === mod.slugs.length - 1

                    return (
                      <div key={slug} className="flex gap-5">
                        <div className="flex flex-col items-center pt-3">
                          <Milestone isFree={isFree} isLast={isLast} isCompleted={isCompleted} />
                        </div>

                        <Link
                          href={isFree ? `/lessons/${slug}` : "/pricing"}
                          className={cn(
                            "flex-1 block rounded-xl overflow-hidden mb-6",
                            "bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] border border-[#1f2937]",
                            !isCompleted && "hover:border-[#4f46e5]/40 hover:translate-x-1",
                            "transition-all duration-200 p-5 group",
                            isCompleted && "opacity-50"
                          )}
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-xs font-bold text-slate-500 shrink-0">
                                {String(globalIdx + 1).padStart(2, "0")}
                              </span>
                              <h3 className="text-base font-semibold leading-tight truncate transition-colors">
                                {lessonData?.title ?? meta.xp}
                              </h3>
                              <span className={cn(
                                "shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                                isFree
                                  ? "text-[#4f46e5]/60 border-[#4f46e5]/20"
                                  : "text-muted-foreground/50 border-border"
                              )}>
                                {isFree ? "Free" : "Premium"}
                              </span>
                            </div>
                            <div className="shrink-0 flex items-center gap-3 text-xs text-muted-foreground/60">
                              <span className="flex items-center gap-1">
                                <Clock size={11} className="text-[#4f46e5]/50" />
                                {meta.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Zap size={11} className="text-[#4f46e5]/50" />
                                +{meta.xp} XP
                              </span>
                              {meta.interactives > 0 && (
                                <span className="flex items-center gap-1">
                                  <Brain size={11} className="text-[#4f46e5]/50" />
                                  {meta.interactives}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                            {meta.description}
                          </p>

                          <div className="text-xs text-muted-foreground/60 text-center">
                            <span className="text-[#818cf8]/70 [&_.katex]:text-xs" dangerouslySetInnerHTML={renderMath(meta.formula)} />
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </div>
  )
}
