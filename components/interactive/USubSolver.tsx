"use client"

import { useState } from "react"

const steps = [
  { label: "Problem", math: "∫ 2x · cos(x²) dx", explanation: "Find the antiderivative." },
  { label: "Spot Pattern", math: "u = x²,  du = 2x dx", explanation: "2x is the derivative of x². Let u = x²." },
  { label: "Substitute", math: "∫ cos(u) du", explanation: "Replace x² with u and 2x dx with du." },
  { label: "Integrate", math: "sin(u) + C", explanation: "The antiderivative of cos(u) is sin(u)." },
  { label: "Back-substitute", math: "sin(x²) + C", explanation: "Replace u with x² for the answer in terms of x." },
]

export function USubSolver() {
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
      <div className="rounded-lg bg-muted p-6 text-center text-lg font-mono">{s.math}</div>
      <p className="text-sm text-muted-foreground text-center">{s.explanation}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="rounded-md bg-secondary px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          Prev
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
