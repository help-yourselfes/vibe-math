"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <button
              onClick={() => setStep(i)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-colors duration-150",
                i === step
                  ? "border-[#4f46e5]/40 bg-[#4f46e5]/15 text-[#4f46e5]"
                  : i < step
                    ? "border-[#4f46e5]/30 bg-[#4f46e5]/10 text-[#4f46e5]/70"
                    : "border-border/50 text-muted-foreground hover:border-border"
              )}
            >
              {i + 1}
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-lg border border-border/50 bg-[rgba(13,17,23,0.5)] p-5 text-center min-h-[80px] flex flex-col items-center justify-center"
        >
          <p className="text-sm text-muted-foreground mb-2">{steps[step].label}</p>
          <p className="text-lg"><InlineMath>{steps[step].math}</InlineMath></p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            ← Back
          </button>
        </motion.div>
        <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <button
            onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}
            disabled={step === totalSteps - 1}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
