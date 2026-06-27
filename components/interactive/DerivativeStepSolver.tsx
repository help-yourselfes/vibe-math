"use client"

import { useState } from "react"

const steps = [
  { label: "Start", math: "f(x) = x²", explanation: "We begin with the function x²." },
  { label: "Definition", math: "f'(x) = lim(h→0) (f(x+h) - f(x))/h", explanation: "Recall the limit definition of the derivative." },
  { label: "Substitute", math: "f'(x) = lim(h→0) ((x+h)² - x²)/h", explanation: "Plug in f(x+h) and f(x)." },
  { label: "Expand", math: "f'(x) = lim(h→0) (x² + 2xh + h² - x²)/h", explanation: "Expand (x+h)²." },
  { label: "Simplify", math: "f'(x) = lim(h→0) (2xh + h²)/h", explanation: "Cancel x² terms." },
  { label: "Factor", math: "f'(x) = lim(h→0) (2x + h)", explanation: "Cancel h from numerator and denominator." },
  { label: "Result", math: "f'(x) = 2x", explanation: "As h approaches 0, we get 2x!" },
]

export function DerivativeStepSolver() {
  const [step, setStep] = useState(0)
  const s = steps[step]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-muted p-6 text-center">
        <p className="text-xl font-mono font-medium">{s.math}</p>
      </div>
      <p className="text-sm text-muted-foreground text-center">{s.explanation}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="rounded-md bg-secondary px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
