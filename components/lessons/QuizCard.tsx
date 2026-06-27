"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BrainIcon, CheckIcon } from "@/components/ui/icons"
import { RichText } from "./RichText"

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

  const isCorrect = selected === correctIndex

  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-[#c084fc]/10 p-6 my-2">
      <div className="flex items-center gap-2 mb-4 text-xs font-medium text-[#c084fc]">
        <BrainIcon size={14} />
        <span>Check your understanding</span>
      </div>
      <p className="text-sm text-foreground/90 mb-4"><RichText content={question} /></p>
      <div className="grid gap-2.5">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const showCorrect = selected !== null && i === correctIndex
          const showWrong = isSelected && i !== correctIndex

          return (
            <button
              key={i}
              onClick={() => selected === null && setSelected(i)}
              disabled={selected !== null}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-left transition-all duration-200",
                showCorrect && "border-primary/50 bg-primary/10 text-primary",
                showWrong && "border-[#f04438]/50 bg-[#f04438]/10 text-[#f04438]",
                !showCorrect && !showWrong && isSelected && "border-primary/50 bg-primary/10",
                !showCorrect && !showWrong && !isSelected && "border-border/60 bg-background/40 hover:border-border hover:bg-accent/50",
                selected !== null && !showCorrect && !showWrong && "opacity-50"
              )}
            >
              <span className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 border transition-colors",
                showCorrect && "bg-primary/20 text-primary border-primary/40",
                showWrong && "bg-[#f04438]/20 text-[#f04438] border-[#f04438]/40",
                !showCorrect && !showWrong && isSelected && "bg-primary/20 text-[#c084fc] border-primary/40",
                !showCorrect && !showWrong && !isSelected && "bg-muted text-muted-foreground border-border"
              )}>
                {showCorrect ? <CheckIcon size={12} /> : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className={cn(
          "mt-4 rounded-lg border p-4 text-sm",
          isCorrect ? "border-primary/30 bg-primary/5 text-primary" : "border-[#f04438]/30 bg-[#f04438]/5 text-[#f04438]"
        )}>
          <p className="font-medium mb-1">{isCorrect ? "✓ Correct!" : "✗ Not quite."}</p>
          <p className="text-xs opacity-80"><RichText content={explanation} /></p>
        </div>
      )}
    </div>
  )
}
