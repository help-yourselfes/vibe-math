import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LessonRenderer } from "@/components/lessons/LessonRenderer"
import { PaymentGate } from "@/components/lessons/PaymentGate"
import { lessons } from "@/lessons-data/lessons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: dbLesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!dbLesson) notFound()

  const { data: { user } } = await supabase.auth.getUser()

  let hasAccess = dbLesson.is_free

  if (!hasAccess && user) {
    const { data: access } = await supabase
      .from("user_lesson_access")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("lesson_id", dbLesson.id)
      .maybeSingle()

    if (access) hasAccess = true
  }

  const lessonData = lessons[slug]
  const allLessons = lessons

  const lessonKeys = Object.keys(allLessons)
  const currentIndex = lessonKeys.indexOf(slug)
  const prevLesson = currentIndex > 0 ? lessonKeys[currentIndex - 1] : null
  const nextLesson = currentIndex < lessonKeys.length - 1 ? lessonKeys[currentIndex + 1] : null

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/lessons" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          All Lessons
        </Link>
        <Badge variant={dbLesson.is_free ? "success" : "secondary"}>
          {dbLesson.is_free ? "Free" : "Premium"}
        </Badge>
      </div>

      <div>
        <h1 className="text-3xl font-bold">
          {dbLesson.lesson_order}. {dbLesson.title}
        </h1>
        <p className="text-muted-foreground mt-1">{dbLesson.description}</p>
      </div>

      {hasAccess && lessonData ? (
        <>
          <LessonRenderer sections={lessonData.sections} />

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              {prevLesson && (
                <Link href={`/lessons/${prevLesson}`}>
                  <Button variant="outline">&larr; Previous Lesson</Button>
                </Link>
              )}
            </div>
            <div>
              {nextLesson && (
                <Link href={`/lessons/${nextLesson}`}>
                  <Button>Next Lesson &rarr;</Button>
                </Link>
              )}
            </div>
          </div>
        </>
      ) : hasAccess ? (
        <div className="rounded-lg bg-muted p-8 text-center">
          <p className="text-muted-foreground">Lesson content coming soon.</p>
        </div>
      ) : (
        <PaymentGate />
      )}
    </div>
  )
}
