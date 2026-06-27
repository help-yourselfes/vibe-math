import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container py-12 space-y-16">
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Calculus, but it actually{" "}
          <span className="text-primary">clicks</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive lessons that let you see, touch, and feel the math. No boring textbooks. No confusing jargon.
          Just you and the beauty of calculus.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/lessons">
            <Button size="lg">Start Free Lessons</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">See Pricing</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">3</CardTitle>
            <CardDescription className="text-base font-medium">Free Lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start with limits, derivatives, and integrals at no cost. See if the vibe works for you.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">10</CardTitle>
            <CardDescription className="text-base font-medium">Total Lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              From limits to differential equations. A complete calculus journey in your pocket.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">$29</CardTitle>
            <CardDescription className="text-base font-medium">One-Time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Pay once, get all current and future lessons. No subscriptions, no hidden fees.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">What You&apos;ll Learn</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-left">
          {["Limits & Continuity", "Derivatives & Rates of Change", "Integration & Area", "The Chain Rule", "Product & Quotient Rules", "U-Substitution", "Integration by Parts", "L'Hôpital's Rule", "Taylor Series", "Differential Equations"].map((topic) => (
            <div key={topic} className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <span className="text-primary font-bold">&check;</span> {topic}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
