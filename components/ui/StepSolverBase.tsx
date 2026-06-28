"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { InlineMath } from "@/components/ui/katex"
import { StepNav } from "./StepNav"

export function StepSolverBase({
  steps,
  title,
}: {
  steps: { label: string; math: string }[]
  title?: string
}) {
  const [step, setStep] = useState(0)
  const totalSteps = steps.length

  return (
    <div className="space-y-6">
      {title && <p className="text-sm font-medium text-muted-foreground">{title}</p>}
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
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                i === step
                  ? "border-[#4f46e5]/40 bg-[#4f46e5]/15 text-[#4f46e5]"
                  : i < step
                    ? "border-[#4f46e5]/30 bg-[#4f46e5]/10 text-[#4f46e5]/70"
                    : "border-border/50 text-muted-foreground hover:border-border"
              }`}
            >
              {s.label}
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
          <span className="text-lg font-medium"><InlineMath>{steps[step].math}</InlineMath></span>
        </motion.div>
      </AnimatePresence>

      <StepNav
        step={step}
        totalSteps={totalSteps}
        onPrev={() => setStep(Math.max(0, step - 1))}
        onNext={() => setStep(Math.min(totalSteps - 1, step + 1))}
      />
    </div>
  )
}
