import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LessonsPage() {
  const supabase = await createClient()
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("published", true)
    .order("lesson_order")

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Calculus Lessons</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          10 interactive lessons covering the essentials of calculus.
          Start with 3 free lessons, then unlock the rest with a one-time purchase.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons?.map((lesson) => (
          <Card key={lesson.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Lesson {lesson.lesson_order}</span>
                {lesson.is_free ? (
                  <Badge variant="success">Free</Badge>
                ) : (
                  <Badge variant="secondary">Premium</Badge>
                )}
              </div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href={`/lessons/${lesson.slug}`}>
                <Button variant={lesson.is_free ? "default" : "outline"} className="w-full">
                  {lesson.is_free ? "Start Lesson" : "Preview"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
