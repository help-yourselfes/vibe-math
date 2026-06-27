"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BrainIcon, CheckIcon } from "@/components/ui/icons"
import { RichText } from "./RichText"
import { ParticleBurst } from "@/components/ui/ParticleBurst"

export function QuizCard({
  question,
  options,
  correctIndex,
  explanation,
}: {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [burst, setBurst] = useState(0)
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const isCorrect = selected === correctIndex

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    if (i === correctIndex && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setBurstPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      setBurst((b) => b + 1)
    }
  }

  return (
    <div ref={cardRef} className="relative rounded-xl border border-[#4f46e5]/30 bg-gradient-to-r from-[#4f46e5]/10 to-[#818cf8]/10 p-6 my-2 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 text-xs font-medium text-[#818cf8]">
        <BrainIcon size={14} />
        <span>Check your understanding</span>
      </div>
      <div className="text-sm text-foreground/90 mb-4"><RichText content={question} /></div>
      <div className="grid gap-2.5">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const showCorrect = selected !== null && i === correctIndex
          const showWrong = isSelected && i !== correctIndex

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              whileHover={selected === null ? { scale: 1.01, x: 2 } : {}}
              whileTap={selected === null ? { scale: 0.99 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-left transition-colors duration-150",
                showCorrect && "border-[#4f46e5]/50 bg-[#4f46e5]/10 text-[#4f46e5]",
                showWrong && "border-[#f04438]/50 bg-[#f04438]/10 text-[#f04438]",
                !showCorrect && !showWrong && isSelected && "border-[#4f46e5]/50 bg-[#4f46e5]/10",
                !showCorrect && !showWrong && !isSelected && "border-border/60 bg-background/40 hover:border-border hover:bg-accent/50",
                selected !== null && !showCorrect && !showWrong && "opacity-50"
              )}
            >
              <motion.span
                animate={showCorrect ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 border transition-colors",
                  showCorrect && "bg-[#4f46e5]/20 text-[#4f46e5] border-[#4f46e5]/40",
                  showWrong && "bg-[#f04438]/20 text-[#f04438] border-[#f04438]/40",
                  !showCorrect && !showWrong && isSelected && "bg-[#4f46e5]/20 text-[#818cf8] border-[#4f46e5]/40",
                  !showCorrect && !showWrong && !isSelected && "bg-muted text-muted-foreground border-border"
                )}
              >
                {showCorrect ? <CheckIcon size={12} /> : String.fromCharCode(65 + i)}
              </motion.span>
              <span>{opt}</span>
            </motion.button>
          )
        })}
      </div>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "mt-4 rounded-lg border p-4 text-sm",
            isCorrect ? "border-[#4f46e5]/30 bg-[#4f46e5]/5 text-[#4f46e5]" : "border-[#f04438]/30 bg-[#f04438]/5 text-[#f04438]"
          )}
        >
          <p className="font-medium mb-1">{isCorrect ? "✓ Correct!" : "✗ Not quite."}</p>
          <div className="text-xs opacity-80"><RichText content={explanation} /></div>
        </motion.div>
      )}
      {burst > 0 && <ParticleBurst trigger={burst} x={burstPos.x} y={burstPos.y} color="#4f46e5" />}
    </div>
  )
}
