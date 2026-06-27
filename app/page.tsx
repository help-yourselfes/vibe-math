import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InfinityIcon, ZapIcon, SparklesIcon, TrophyIcon, CheckIcon, GraphIcon, FunctionIcon, IntegralIcon, SigmaIcon, CrownIcon } from "@/components/ui/icons"

const features = [
  { icon: FunctionIcon, text: "Limits & Continuity" },
  { icon: GraphIcon, text: "Derivatives & Rates of Change" },
  { icon: IntegralIcon, text: "Integration & Area" },
  { icon: SigmaIcon, text: "The Chain Rule" },
  { icon: InfinityIcon, text: "Product & Quotient Rules" },
  { icon: CrownIcon, text: "U-Substitution & More" },
]

export default function Home() {
  return (
    <div className="container py-16 space-y-24">
      <section className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#7c5cfc]/20 bg-[#7c5cfc]/5 px-4 py-1.5 text-xs font-medium text-[#c084fc] mb-2">
          <SparklesIcon size={14} />
          Interactive calculus, completely free
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
          Calculus, but it actually{" "}
          <span className="gradient-text">clicks</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Interactive lessons that let you see, touch, and feel the math.
          No boring textbooks. Just you and the beauty of calculus.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link href="/lessons">
            <Button size="lg" variant="premium">
              <ZapIcon size={18} />
              Start Learning Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" size="lg">
              View Plans
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {[
          { icon: TrophyIcon, stat: "10", label: "Interactive Lessons", desc: "From limits to differential equations. Each lesson has hands-on interactive demos." },
          { icon: SparklesIcon, stat: "100%", label: "Free to Learn", desc: "All lessons are completely free. No credit card, no sign-up required to get started." },
          { icon: ZapIcon, stat: "6", label: "Interactive Tools", desc: "Limit explorers, derivative step solvers, Riemann sum visualizers, and more." },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border/50 bg-card/50 p-6 hover:border-border/80 transition-all duration-200">
            <item.icon className="text-[#7c5cfc] mb-4" size={24} />
            <p className="text-3xl font-bold mb-1">{item.stat}</p>
            <p className="text-sm font-medium text-foreground mb-2">{item.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">What You&apos;ll Learn</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-left">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4 text-sm transition-all duration-200 hover:border-border/80 hover:bg-card/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#7c5cfc]/10 text-[#7c5cfc]">
                <Icon size={16} />
              </div>
              {text}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
