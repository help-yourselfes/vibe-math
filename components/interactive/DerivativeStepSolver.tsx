"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { InlineMath } from "@/components/ui/katex"

interface MathSeg {
  id: string
  tex: string
}

interface StepDef {
  label: string
  segs: MathSeg[]
}

const steps: StepDef[] = [
  {
    label: "Write the function",
    segs: [
      { id: "lhs", tex: "f(x)" },
      { id: "eq", tex: "=" },
      { id: "rhs", tex: "x^2" },
    ],
  },
  {
    label: "Apply the limit definition",
    segs: [
      { id: "lhs", tex: "f'(x)" },
      { id: "eq", tex: "=" },
      { id: "lim", tex: "\\lim_{h \\to 0}" },
      { id: "frac", tex: "\\frac{(x+h)^2 - x^2}{h}" },
    ],
  },
  {
    label: "Expand the binomial",
    segs: [
      { id: "lhs", tex: "f'(x)" },
      { id: "eq", tex: "=" },
      { id: "lim", tex: "\\lim_{h \\to 0}" },
      { id: "frac", tex: "\\frac{x^2 + 2xh + h^2 - x^2}{h}" },
    ],
  },
  {
    label: "Cancel x² − x²",
    segs: [
      { id: "lhs", tex: "f'(x)" },
      { id: "eq", tex: "=" },
      { id: "lim", tex: "\\lim_{h \\to 0}" },
      { id: "frac", tex: "\\frac{2xh + h^2}{h}" },
    ],
  },
  {
    label: "Cancel h from the fraction",
    segs: [
      { id: "lhs", tex: "f'(x)" },
      { id: "eq", tex: "=" },
      { id: "rhs", tex: "\\lim_{h \\to 0} (2x + h)" },
    ],
  },
  {
    label: "Let h → 0",
    segs: [
      { id: "lhs", tex: "f'(x)" },
      { id: "eq", tex: "=" },
      { id: "rhs", tex: "2x" },
    ],
  },
]

function SegDisplay({ seg, changed }: { seg: MathSeg; changed: boolean }) {
  return (
    <motion.span
      key={seg.id + seg.tex}
      initial={changed ? { opacity: 0, scale: 0.8, filter: "blur(6px)" } : false}
      animate={changed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn("inline-block", changed ? "text-[#818cf8]" : "text-foreground/80")}
    >
      <InlineMath>{seg.tex}</InlineMath>
    </motion.span>
  )
}

function CompactView({
  step,
  setStep,
}: {
  step: number
  setStep: (n: number) => void
}) {
  const totalSteps = steps.length
  const prevSegs = step > 0 ? steps[step - 1].segs : null

  return (
    <div className="space-y-5">
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

      <div className="rounded-lg border border-border/50 bg-[rgba(13,17,23,0.5)] p-5 text-center min-h-[100px] flex flex-col items-center justify-center">
        <p className="text-xs text-muted-foreground/60 mb-3">{steps[step].label}</p>
        <div className="text-lg flex flex-wrap items-center justify-center gap-x-1.5">
          {steps[step].segs.map((seg) => {
            const prev = prevSegs?.find((p) => p.id === seg.id)
            const changed = !prev || prev.tex !== seg.tex
            return <SegDisplay key={seg.id} seg={seg} changed={changed} />
          })}
        </div>
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

function ExpandedView({
  step,
  setStep,
}: {
  step: number
  setStep: (n: number) => void
}) {
  const totalSteps = steps.length
  const prevSegs = step > 0 ? steps[step - 1].segs : null

  return (
    <div className="flex gap-10">
      <div className="w-48 shrink-0 space-y-1">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors duration-150",
              i === step
                ? "border-[#4f46e5]/50 bg-[#4f46e5]/10 text-[#818cf8]"
                : i < step
                  ? "border-transparent bg-[rgba(79,70,229,0.05)] text-[#818cf8]/60"
                  : "border-transparent text-muted-foreground/50 hover:text-muted-foreground hover:bg-[rgba(13,17,23,0.5)]"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0",
                i === step
                  ? "bg-[#4f46e5] text-white"
                  : i < step
                    ? "bg-[#4f46e5]/30 text-[#818cf8]"
                    : "bg-border/50 text-muted-foreground"
              )}>
                {i + 1}
              </span>
              <span className="leading-snug">{s.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-[300px]">
        <div className="rounded-lg border border-border/50 bg-[rgba(13,17,23,0.5)] p-12 text-center flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-2xl flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {steps[step].segs.map((seg) => {
              const prev = prevSegs?.find((p) => p.id === seg.id)
              const changed = !prev || prev.tex !== seg.tex
              return <SegDisplay key={seg.id} seg={seg} changed={changed} />
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
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
    </div>
  )
}

export function DerivativeStepSolver() {
  const [step, setStep] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const overlay = expanded ? (
    <motion.div
      key="expand-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setExpanded(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0d1117] border border-border/50 rounded-xl p-8 w-full max-w-3xl mx-4 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-foreground/80">Derivative Step Solver</h2>
          <button
            onClick={() => setExpanded(false)}
            className="p-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            title="Shrink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 1v4h4" />
              <path d="M5 15v-4H1" />
              <path d="M1 6h4V1" />
              <path d="M15 10h-4v5" />
            </svg>
          </button>
        </div>
        <ExpandedView step={step} setStep={setStep} />
      </motion.div>
    </motion.div>
  ) : null

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setExpanded(true)}
          className="absolute top-0 right-0 p-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          title="Expand"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1H1v5" />
            <path d="M10 15h5v-5" />
            <path d="M1 10v5h5" />
            <path d="M15 6V1h-5" />
          </svg>
        </button>
        <CompactView step={step} setStep={setStep} />
      </div>

      {mounted && createPortal(
        <AnimatePresence>{overlay}</AnimatePresence>,
        document.body
      )}
    </>
  )
}
