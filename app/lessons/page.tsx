import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SparklesIcon, CrownIcon, LockIcon, CheckIcon } from "@/components/ui/icons"

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
    <div className="container py-10 space-y-10">
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <SparklesIcon size={14} />
          All lessons free during beta
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Calculus Lessons</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          10 interactive lessons covering the essentials of calculus.
          Start with the first 3 free, unlock the rest with a one-time purchase.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons?.map((lesson, idx) => {
          const isFree = idx < freeCount || hasPaid
          return (
            <Card key={lesson.id} className="flex flex-col relative overflow-hidden group">
              {!isFree && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/80 to-card/90 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-gradient-to-br from-[#7c5cfc]/20 to-[#c084fc]/20 p-3 mb-3 ring-1 ring-[#7c5cfc]/30">
                    <LockIcon className="h-6 w-6 text-[#c084fc]" />
                  </div>
                  <p className="text-sm font-medium mb-3">Premium Lesson</p>
                  <Link href="/pricing">
                    <Button variant="premium" size="sm">
                      <CrownIcon size={14} />
                      Unlock All
                    </Button>
                  </Link>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-mono">Lesson {lesson.lesson_order}</span>
                  {isFree ? (
                    <Badge variant="success">Free</Badge>
                  ) : (
                    <Badge variant="premium">Premium</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href={isFree ? `/lessons/${lesson.slug}` : "/pricing"}>
                  <Button variant={isFree ? "default" : "outline"} className="w-full">
                    {isFree ? "Start Lesson" : "Unlock"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
