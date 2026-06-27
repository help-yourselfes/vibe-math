"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { InlineMath } from "@/components/ui/katex"

export function ProductRuleSolver() {
  const [step, setStep] = useState(0)
  const totalSteps = 5

  const steps = [
    { label: "Identify u and v", math: "u = x^2,\\; v = \\sin(x)" },
    { label: "Find u' and v'", math: "u' = 2x,\\; v' = \\cos(x)" },
    { label: "Apply product rule", math: "f'(x) = u'v + uv'" },
    { label: "Substitute", math: "f'(x) = (2x)(\\sin(x)) + (x^2)(\\cos(x))" },
    { label: "Result", math: "f'(x) = 2x\\sin(x) + x^2\\cos(x)" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md border transition-all",
              i === step
                ? "border-primary/40 bg-primary/15 text-primary"
                : i < step
                  ? "border-primary/30 bg-primary/10 text-primary/70"
                  : "border-border/50 text-muted-foreground hover:border-border"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border/50 bg-card/30 p-5 text-center min-h-[80px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground mb-2">{steps[step].label}</p>
        <p className="text-lg"><InlineMath>{steps[step].math}</InlineMath></p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
        <button
          onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}
          disabled={step === totalSteps - 1}
          className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
