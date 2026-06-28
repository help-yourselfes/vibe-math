import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InfinityIcon, ZapIcon, TrophyIcon, SparklesIcon, GraphIcon, FunctionIcon, IntegralIcon, SigmaIcon, CrownIcon } from "@/components/ui/icons"
import { HeroBackground } from "@/components/ui/HeroBackground"
import { SinGraphCard } from "@/components/ui/SinGraphCard"
import { GlassCard } from "@/components/ui/GlassCard"
import { BadgePill } from "@/components/ui/BadgePill"

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
    <div className="relative overflow-hidden min-h-screen">
      <HeroBackground />

      <div className="container py-20 space-y-28 relative">
        <section className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in min-h-[60vh] flex flex-col items-center justify-center">
          <BadgePill text="Interactive calculus, completely free" />
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

        <section className="max-w-5xl mx-auto p-5 relative">
          <div className="flex flex-col gap-10 relative">
            <div className="flex gap-5 justify-center">
              <GlassCard hover className="p-6 flex flex-col items-center text-center justify-center min-h-[200px] flex-1 max-w-[240px]">
                <TrophyIcon className="text-[#4f46e5] mb-3" size={22} />
                <p className="text-3xl font-bold mb-1">10</p>
                <p className="text-sm font-medium text-foreground mb-2">Interactive Lessons</p>
                <p className="text-sm text-muted-foreground leading-relaxed">From limits to differential equations. Each lesson has hands-on interactive demos.</p>
              </GlassCard>
              <div className="flex-[3] min-w-0">
                <SinGraphCard />
              </div>
            </div>
            <div className="flex gap-5 justify-center items-center">
              <img src="/main-page/coin.png" alt="coin" className="w-36 h-36 object-contain shrink-0" style={{ animation: "float 3.5s ease-in-out infinite" }} />
              <GlassCard hover className="p-6 w-auto max-w-sm">
                <SparklesIcon className="text-[#4f46e5] mb-4" size={24} />
                <p className="text-3xl font-bold mb-1">100%</p>
                <p className="text-sm font-medium text-foreground mb-2">Free to Learn</p>
                <p className="text-sm text-muted-foreground leading-relaxed">All lessons are completely free. No credit card, no sign-up required to get started.</p>
              </GlassCard>
            </div>
            <div className="absolute left-0 right-0 flex items-center justify-center pointer-events-none" style={{ top: "58%" }}>
              <div className="w-[700px] h-[300px] rounded-full bg-[#4f46e5]/6 blur-[120px]" />
            </div>
            <div className="flex gap-5 justify-center items-center">
              <GlassCard hover className="p-6 w-auto max-w-sm">
                <ZapIcon className="text-[#4f46e5] mb-4" size={24} />
                <p className="text-3xl font-bold mb-1">6</p>
                <p className="text-sm font-medium text-foreground mb-2">Interactive Tools</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Limit explorers, derivative step solvers, Riemann sum visualizers, and more.</p>
              </GlassCard>
              <img src="/main-page/gear.png" alt="gear" className="w-36 h-36 object-contain shrink-0" style={{ animation: "float 3.5s ease-in-out infinite 1s" }} />
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">What You&apos;ll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            {features.map(({ icon: Icon, text }) => (
              <GlassCard hover key={text} className="p-4 flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#4f46e5]/10 text-[#4f46e5]">
                  <Icon size={16} />
                </div>
                {text}
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
