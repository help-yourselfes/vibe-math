import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LessonSplitView } from "@/components/lessons/LessonSplitView"
import { PremiumLockCard } from "@/components/lessons/PremiumLockCard"
import { StickyProgress } from "@/components/gamification/StickyProgress"
import { lessons } from "@/lessons-data/lessons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CrownIcon } from "@/components/ui/icons"

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

  const lessonData = lessons[slug]
  const lessonKeys = Object.keys(lessons)
  const currentIndex = lessonKeys.indexOf(slug)
  const prevLesson = currentIndex > 0 ? lessonKeys[currentIndex - 1] : null
  const nextLesson = currentIndex < lessonKeys.length - 1 ? lessonKeys[currentIndex + 1] : null

  const freeCount = 3
  const isFree = currentIndex < freeCount

  return (
    <>
      {lessonData && <StickyProgress current={currentIndex + 1} total={lessonKeys.length} title={dbLesson.title} />}
      <div className="container py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/lessons" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            All Lessons
          </Link>
          <Badge variant={isFree ? "success" : "premium"}>
            {isFree ? "Free" : "Premium"}
          </Badge>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {dbLesson.lesson_order}. {dbLesson.title}
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">{dbLesson.description}</p>
        </div>

        {isFree && lessonData ? (
          <>
            <LessonSplitView sections={lessonData.sections} />
            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <div>
                {prevLesson && (
                  <Link href={`/lessons/${prevLesson}`}>
                    <Button variant="outline">&larr; Previous Lesson</Button>
                  </Link>
                )}
              </div>
              <div>
                {nextLesson ? (
                  <Link href={`/lessons/${nextLesson}`}>
                    <Button>
                      Next Lesson &rarr;
                    </Button>
                  </Link>
                ) : (
                  <Link href="/pricing">
                    <Button variant="premium">
                      <CrownIcon size={16} />
                      Unlock Premium Lessons
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </>
        ) : isFree ? (
          <div className="rounded-xl bg-muted/50 border border-border/50 p-12 text-center">
            <p className="text-muted-foreground">Lesson content coming soon.</p>
          </div>
        ) : (
          <PremiumLockCard />
        )}
      </div>
    </>
  )
}
