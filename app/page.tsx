import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InfinityIcon, ZapIcon, SparklesIcon, TrophyIcon, GraphIcon, FunctionIcon, IntegralIcon, SigmaIcon, CrownIcon } from "@/components/ui/icons"
import { HeroBackground } from "@/components/ui/HeroBackground"
import { SinGraphCard } from "@/components/ui/SinGraphCard"

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
    <div className="relative overflow-hidden">
      <HeroBackground />

      <div className="container py-20 space-y-28 relative">
        <section className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in min-h-[60vh] flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4f46e5]/20 bg-[#4f46e5]/5 px-4 py-1.5 text-xs font-medium text-[#818cf8] mb-2">
            <SparklesIcon size={14} />
            Interactive calculus, completely free
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
            Calculus, but it actually{" "}
            <span className="text-[#818cf8]">clicks</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 py-2 rounded-lg bg-[rgba(5,5,8,0.5)] backdrop-blur-[4px]">
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
              <Button variant="secondary" size="lg">
                View Plans
              </Button>
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto space-y-5">
          <div className="grid md:grid-cols-4 gap-5">
            <div className="rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-6 hover:border-[#4f46e5]/30 transition-all duration-200 flex flex-col justify-center">
              <TrophyIcon className="text-[#4f46e5] mb-4" size={24} />
              <p className="text-3xl font-bold mb-1">10</p>
              <p className="text-sm font-medium text-foreground mb-2">Interactive Lessons</p>
              <p className="text-sm text-muted-foreground leading-relaxed">From limits to differential equations. Each lesson has hands-on interactive demos.</p>
            </div>
            <div className="md:col-span-3">
              <SinGraphCard />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: SparklesIcon, stat: "100%", label: "Free to Learn", desc: "All lessons are completely free. No credit card, no sign-up required to get started." },
              { icon: ZapIcon, stat: "6", label: "Interactive Tools", desc: "Limit explorers, derivative step solvers, Riemann sum visualizers, and more." },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-6 hover:border-[#4f46e5]/30 transition-all duration-200">
                <item.icon className="text-[#4f46e5] mb-4" size={24} />
                <p className="text-3xl font-bold mb-1">{item.stat}</p>
                <p className="text-sm font-medium text-foreground mb-2">{item.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">What You&apos;ll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-4 text-sm transition-all duration-200 hover:border-[#4f46e5]/30">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#4f46e5]/10 text-[#4f46e5]">
                  <Icon size={16} />
                </div>
                {text}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
