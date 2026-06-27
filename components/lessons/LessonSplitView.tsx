"use client"

import { useMemo, Fragment } from "react"
import { buildBlocks, type RenderBlock } from "./LessonRenderer"
import { RichText } from "./RichText"
import { FormulaGrid } from "./FormulaGrid"
import { QuizCard } from "./QuizCard"
import { LimitExplorer } from "@/components/interactive/LimitExplorer"
import { DerivativeStepSolver } from "@/components/interactive/DerivativeStepSolver"
import { IntegralVisualizer } from "@/components/interactive/IntegralVisualizer"
import { ChainExplorer } from "@/components/interactive/ChainExplorer"
import { ProductRuleSolver } from "@/components/interactive/ProductRuleSolver"
import { USubSolver } from "@/components/interactive/USubSolver"
import { BrainIcon } from "@/components/ui/icons"

function getInteractive(name?: string) {
  switch (name) {
    case "LimitExplorer": return <LimitExplorer />
    case "DerivativeStepSolver": return <DerivativeStepSolver />
    case "IntegralVisualizer": return <IntegralVisualizer />
    case "ChainExplorer": return <ChainExplorer />
    case "ProductRuleSolver": return <ProductRuleSolver />
    case "USubSolver": return <USubSolver />
    default: return null
  }
}

function SectionDivider() {
  return <div className="section-divider" />
}

function TheoryBlock({ block }: { block: RenderBlock }) {
  switch (block.kind) {
    case "text":
      return <p className="leading-relaxed text-[15px] text-foreground/90"><RichText content={block.content} /></p>
    case "callout":
      return (
        <div className="border-l-4 border-l-primary bg-[#0b0f19] rounded-r-xl py-5 pr-5 my-6">
          <div className="pl-5"><p className="leading-relaxed text-[15px] text-foreground/90"><RichText content={block.content} /></p></div>
        </div>
      )
    case "formula-grid":
      return <FormulaGrid items={block.items} />
    case "key-value": {
      return (
        <div className="space-y-3 my-4">
          {block.pairs.map((p, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border border-border/40 bg-[#0b0f19] p-4">
              <span className="shrink-0 rounded-md bg-[#7c5cfc]/15 px-2.5 py-1 text-xs font-bold text-[#c084fc]"><RichText content={p.key} /></span>
              <span className="text-sm text-muted-foreground leading-relaxed"><RichText content={p.desc} /></span>
            </div>
          ))}
        </div>
      )
    }
    case "bullets":
      return (
        <ul className="space-y-2 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cfc]/50" />
              <span className="leading-relaxed"><RichText content={item.replace(/^-\s+/, "")} /></span>
            </li>
          ))}
        </ul>
      )
    case "quiz":
      return (
        <QuizCard
          question={block.question}
          options={block.options}
          correctIndex={block.correctIndex}
          explanation={block.explanation}
        />
      )
    default:
      return null
  }
}

function InteractivePanel({ blocks }: { blocks: RenderBlock[] }) {
  const items = blocks.filter((b): b is Extract<RenderBlock, { kind: "interactive" }> => b.kind === "interactive")
  if (items.length === 0) return null
  return (
    <div style={{ position: "sticky", top: "80px" }} className="space-y-6">
      {items.map((block, i) => (
        <div key={i} className="section-interactive border border-border/40 p-6">
          <div className="flex items-center gap-2 mb-5 text-xs text-muted-foreground border-b border-border/30 pb-3">
            <BrainIcon size={14} />
            <span>Interactive — try it yourself</span>
          </div>
          {getInteractive(block.name)}
        </div>
      ))}
    </div>
  )
}

export function LessonSplitView({ sections }: { sections: any[] }) {
  const blocks = useMemo(() => buildBlocks(sections), [sections])

  const theoryBlocks = useMemo(() => blocks.filter(b => b.kind !== "interactive"), [blocks])
  const interactiveBlocks = useMemo(() => blocks.filter(b => b.kind === "interactive"), [blocks])

  return (
    <div className="md:grid md:grid-cols-[35fr_65fr] md:gap-8">
      <div className="space-y-8">
        {theoryBlocks.map((block, i) => (
          <Fragment key={i}>
            {i > 0 && <SectionDivider />}
            <TheoryBlock block={block} />
          </Fragment>
        ))}
      </div>
      <div className="hidden md:block">
        <InteractivePanel blocks={interactiveBlocks} />
      </div>
    </div>
  )
}
