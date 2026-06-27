import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CrownIcon, CheckIcon, SparklesIcon, ZapIcon, InfinityIcon, StarIcon } from "@/components/ui/icons"

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with interactive calculus",
    features: ["3 interactive lessons", "Basic progress tracking", "Community access"],
    cta: "Start Free",
    href: "/lessons",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "lifetime",
    desc: "Everything you need to master calculus",
    features: [
      "All 10 interactive lessons",
      "Step-by-step derivative & integral solvers",
      "Graph visualizations for every concept",
      "Full progress tracking with streaks",
      "All future lessons included",
      "AI Tutor integration",
    ],
    cta: "Unlock Pro",
    href: "#",
    featured: true,
  },
  {
    name: "Premium",
    price: "$49",
    period: "lifetime",
    desc: "For the dedicated math enthusiast",
    features: [
      "Everything in Pro",
      "Downloadable PDF cheat sheets",
      "Practice problem sets with solutions",
      "Certificate of completion",
      "Priority email support",
      "Early access to new topics",
    ],
    cta: "Go Premium",
    href: "#",
    featured: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4 max-w-xl mx-auto">
         <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <SparklesIcon size={14} />
          All lessons free during beta
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Start free, upgrade when you&apos;re ready. No subscriptions, no hidden fees.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border p-6 transition-all duration-200 ${
              plan.featured
                ? "border-[#4f46e5]/40 bg-gradient-to-b from-[#4f46e5]/5 to-transparent shadow-xl shadow-[#4f46e5]/10 scale-105"
                : "border-border/50 bg-card hover:border-border/80"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#818cf8] px-3 py-1 text-[10px] font-semibold text-white shadow-lg">
                <SparklesIcon size={10} />
                Most Popular
              </div>
            )}
            <div className="flex items-baseline gap-1.5 mb-1 mt-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted-foreground">/{plan.period}</span>}
            </div>
            <p className="text-base font-semibold mb-0.5">{plan.name}</p>
            <p className="text-xs text-muted-foreground mb-5">{plan.desc}</p>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckIcon size={14} className="text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href={plan.href}>
              <Button variant={plan.featured ? "premium" : "outline"} className="w-full" size="lg">
                {plan.featured && <CrownIcon size={16} />}
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center space-y-2 max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground">
          Premium plans are coming soon. For now, enjoy all lessons free during our beta.
        </p>
        <p className="text-xs text-muted-foreground/60">
          Your support helps us create more content and keep the platform growing.
        </p>
      </div>
    </div>
  )
}
