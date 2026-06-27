import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

  const { data: access } = await supabase
    .from("user_lesson_access")
    .select("lesson_id")
    .eq("user_id", user.id)

  const progressMap = new Map(progress?.map((p) => [p.lesson_id, p]) ?? [])
  const accessSet = new Set(access?.map((a) => a.lesson_id) ?? [])

  const completedCount = progress?.filter((p) => p.completed).length ?? 0
  const totalCount = lessons?.length ?? 0
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! You&apos;ve completed {completedCount} of {totalCount} lessons.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Lessons</h2>
        <div className="grid gap-4">
          {lessons?.map((lesson) => {
            const isCompleted = progressMap.get(lesson.id)?.completed ?? false
            const hasAccess = lesson.is_free || accessSet.has(lesson.id)

            return (
              <Card key={lesson.id} className={`${isCompleted ? "border-green-200" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {lesson.lesson_order}. {lesson.title}
                      </CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {lesson.is_free ? (
                        <Badge variant="success">Free</Badge>
                      ) : hasAccess ? (
                        <Badge variant="success">Unlocked</Badge>
                      ) : (
                        <Badge variant="secondary">Premium</Badge>
                      )}
                      {isCompleted && <Badge variant="default">Complete</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {hasAccess ? (
                    <Link href={`/lessons/${lesson.slug}`}>
                      <Button variant={isCompleted ? "outline" : "default"} size="sm">
                        {isCompleted ? "Review Lesson" : "Start Lesson"}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/pricing">
                      <Button variant="outline" size="sm">Unlock All</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
