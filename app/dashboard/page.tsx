import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StreakCounter } from "@/components/gamification/StreakCounter"
import { TrophyIcon, CrownIcon, ZapIcon } from "@/components/ui/icons"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("published", true)
    .order("lesson_order")

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)

  const progressMap = new Map(progress?.map((p) => [p.lesson_id, p]) ?? [])
  const completedCount = progress?.filter((p) => p.completed).length ?? 0
  const totalCount = lessons?.length ?? 0
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const freeCount = 3

  return (
    <div className="container py-10 space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {user.email} &middot; {completedCount} of {totalCount} lessons completed
          </p>
        </div>
        <StreakCounter />
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Overall Progress</span>
          <span className="text-muted-foreground tabular-nums">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2.5" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">All Lessons</h2>
          {completedCount === totalCount && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <TrophyIcon size={16} />
              All complete!
            </div>
          )}
        </div>
        <div className="grid gap-3">
          {lessons?.map((lesson, idx) => {
            const isCompleted = progressMap.get(lesson.id)?.completed ?? false
            const isFree = idx < freeCount

            return (
              <div
                key={lesson.id}
                className={`rounded-xl border p-4 transition-all duration-200 ${
                  isCompleted
                    ? "border-primary/20 bg-primary/5"
                    : "border-border/50 bg-card hover:border-border/80"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5 ${
                      isCompleted
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {isCompleted ? (
                        <TrophyIcon size={14} />
                      ) : (
                        <span className="text-xs font-bold">{lesson.lesson_order}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {lesson.lesson_order}. {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isFree ? (
                      <Badge variant="success">Free</Badge>
                    ) : (
                      <Badge variant="premium">Premium</Badge>
                    )}
                    {isCompleted ? (
                      <Link href={`/lessons/${lesson.slug}`}>
                        <Button variant="ghost" size="sm">Review</Button>
                      </Link>
                    ) : (
                      <Link href={isFree ? `/lessons/${lesson.slug}` : "/pricing"}>
                        <Button variant={isFree ? "default" : "outline"} size="sm">
                          {isFree ? "Start" : "Unlock"}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
