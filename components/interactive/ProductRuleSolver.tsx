"use client"

import { useState } from "react"

const steps = [
  { label: "Start", math: "f(x) = x² · sin(x)", explanation: "Product of x² and sin(x)." },
  { label: "Identify", math: "u = x²,  v = sin(x)", explanation: "Identify the two functions being multiplied." },
  { label: "Derivatives", math: "u' = 2x,  v' = cos(x)", explanation: "Find the derivative of each separately." },
  { label: "Product Rule", math: "f'(x) = u'v + uv'", explanation: "First times derivative of second, plus second times derivative of first." },
  { label: "Substitute", math: "f'(x) = 2x · sin(x) + x² · cos(x)", explanation: "Plug in u, v, u', v'." },
  { label: "Result", math: "f'(x) = 2x·sin(x) + x²·cos(x)", explanation: "The final derivative." },
]

export function ProductRuleSolver() {
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
