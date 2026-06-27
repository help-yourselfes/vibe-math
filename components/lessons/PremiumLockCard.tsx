import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LockIcon, CrownIcon, SparklesIcon, ZapIcon } from "@/components/ui/icons"

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "Start your calculus journey",
    features: ["3 interactive lessons", "Basic progress tracking", "Community access"],
    cta: "Get Started",
    href: "/lessons",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "lifetime",
    desc: "Full access, forever",
    features: ["All 10 lessons", "Interactive step-by-step solvers", "Graph visualizations", "Progress tracking", "Future lessons included", "AI Tutor access"],
    cta: "Unlock All",
    href: "/pricing",
    featured: true,
  },
  {
    name: "Premium",
    price: "$49",
    period: "lifetime",
    desc: "Everything plus extras",
    features: ["Everything in Pro", "Downloadable cheat sheets", "Practice problem sets", "Certificate of completion", "Priority support"],
    cta: "Go Premium",
    href: "/pricing",
    featured: false,
  },
]

export function PremiumLockCard() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-10 text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-[#7c5cfc]/20 to-[#c084fc]/20 p-4 ring-1 ring-[#7c5cfc]/30">
            <LockIcon className="h-8 w-8 text-[#c084fc]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Premium Lesson</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          This lesson is part of our premium curriculum. Unlock all advanced lessons with a one-time purchase.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/pricing">
            <Button variant="premium" size="lg">
              <CrownIcon size={18} />
              Unlock All Lessons
            </Button>
          </Link>
          <Link href="/lessons">
            <Button variant="outline" size="lg">Back to Lessons</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-5 transition-all duration-200 ${
              tier.featured
                ? "border-[#7c5cfc]/40 bg-gradient-to-b from-[#7c5cfc]/5 to-transparent shadow-lg shadow-[#7c5cfc]/5"
                : "border-border/50 bg-card hover:border-border/80"
            }`}
          >
            {tier.featured && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#c084fc] mb-3">
                <SparklesIcon size={12} />
                <span>Most popular</span>
              </div>
            )}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-bold">{tier.price}</span>
              {tier.period && <span className="text-xs text-muted-foreground">/{tier.period}</span>}
            </div>
            <p className="text-sm font-medium mb-0.5">{tier.name}</p>
            <p className="text-xs text-muted-foreground mb-4">{tier.desc}</p>
            <ul className="space-y-2 mb-5">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ZapIcon size={12} className="text-[#7c5cfc]" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href={tier.href}>
              <Button variant={tier.featured ? "premium" : "outline"} className="w-full" size="sm">
                {tier.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
