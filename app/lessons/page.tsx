import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { SparklesIcon } from "@/components/ui/icons"
import { CatalogCard } from "@/components/lessons/CatalogCard"

const lessonMeta: Record<string, { time: string; xp: number; interactives: number }> = {
  "limits-intro": { time: "8 min", xp: 120, interactives: 1 },
  "derivatives-intro": { time: "10 min", xp: 150, interactives: 1 },
  "integrals-intro": { time: "10 min", xp: 150, interactives: 1 },
  "chain-rule": { time: "12 min", xp: 180, interactives: 1 },
  "product-quotient": { time: "12 min", xp: 180, interactives: 1 },
  "u-substitution": { time: "10 min", xp: 150, interactives: 1 },
  "integration-by-parts": { time: "14 min", xp: 200, interactives: 0 },
  "lhopitals-rule": { time: "10 min", xp: 150, interactives: 0 },
  "taylor-series": { time: "16 min", xp: 220, interactives: 0 },
  "differential-equations": { time: "14 min", xp: 200, interactives: 0 },
}

export default async function LessonsPage() {
  const supabase = await createClient()
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("published", true)
    .order("lesson_order")

  const { data: { user } } = await supabase.auth.getUser()
  const hasPaid = false
  const freeCount = 3

  return (
    <div className="py-16 space-y-14">
      <div className="text-center space-y-5 max-w-xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#4f46e5]/20 bg-[#4f46e5]/5 px-4 py-1.5 text-xs font-medium text-[#4f46e5]">
          <SparklesIcon size={14} />
          All lessons free during beta
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Calculus Lessons</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          10 interactive lessons covering the essentials of calculus.
        </p>
      </div>

      <div className="container px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {lessons?.map((lesson, idx) => {
            const isFree = idx < freeCount || hasPaid
            const meta = lessonMeta[lesson.slug] ?? { time: "10 min", xp: 150, interactives: 1 }

            return (
              <CatalogCard
                key={lesson.id}
                slug={lesson.slug}
                order={lesson.lesson_order}
                title={lesson.title}
                isFree={isFree}
                time={meta.time}
                xp={meta.xp}
                interactives={meta.interactives}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
