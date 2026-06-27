import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export function PaymentGate() {
  return (
    <div className="rounded-xl border-2 border-dashed border-muted-foreground/30 p-12 text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-muted p-4">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <h2 className="text-2xl font-bold">Premium Lesson</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        This lesson is part of our premium curriculum. Unlock all 7 advanced lessons
        with a one-time purchase.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/pricing">
          <Button size="lg" className="text-base">
            Unlock All Lessons &mdash; $29
          </Button>
        </Link>
        <Link href="/lessons">
          <Button variant="outline" size="lg">
            Back to Lessons
          </Button>
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">
        Already purchased? <Link href="/auth/login" className="text-primary underline">Sign in</Link> to access your lessons.
      </p>
    </div>
  )
}
