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
      return <div className="leading-relaxed text-[15px] text-foreground/90"><RichText content={block.content} /></div>
    case "callout":
      return (
        <div className="border-l-4 border-l-[#4f46e5] bg-[rgba(13,17,23,0.5)] rounded-r-xl py-5 pr-5 my-6">
          <div className="pl-5"><div className="leading-relaxed text-[15px] text-foreground/90"><RichText content={block.content} /></div></div>
        </div>
      )
    case "formula-grid":
      return <FormulaGrid items={block.items} />
    case "key-value": {
      return (
        <div className="space-y-3 my-4">
          {block.pairs.map((p, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border border-border/40 bg-[rgba(13,17,23,0.5)] p-4">
              <span className="shrink-0 rounded-md bg-[#4f46e5]/15 px-2.5 py-1 text-xs font-bold text-[#818cf8]"><RichText content={p.key} /></span>
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
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f46e5]/50" />
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
          <div className="flex items-center gap-2 mb-5 text-xs text-[#64748b]/70 border-b border-border/30 pb-3">
            <BrainIcon size={14} />
            <span>Interactive — try it yourself</span>
          </div>
          {getInteractive(block.name)}
        </div>
      ))}
    </div>
  )
}

function isReferenceHeader(content: string): boolean {
  return /^\*\*(Important|Basic|Key)\s+.+(remember|to know|rules):\*\*$/.test(content)
}

function FullWidthReference({ header, content }: { header: Extract<RenderBlock, { kind: "text" }>; content: RenderBlock }) {
  const items = content.kind === "formula-grid" ? content.items : (content.kind === "bullets" ? content.items : [])
  const isFormula = content.kind === "formula-grid"

  return (
    <div className="my-10 -mx-6 px-6 py-8 bg-[rgba(13,17,23,0.6)] border-y border-[#1f2937]">
      <div className="text-sm font-semibold text-[#e2e8f0] mb-6"><RichText content={header.content} /></div>
      {isFormula ? (
        <FormulaGrid items={items} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-[#1f2937] bg-[rgba(13,17,23,0.5)] p-4">
              <div className="text-sm text-foreground/90 leading-relaxed"><RichText content={item.replace(/^-\s+/, "")} /></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface Segment {
  theory: RenderBlock[]
  interactive: RenderBlock[]
}

export function LessonSplitView({ sections }: { sections: any[] }) {
  const blocks = useMemo(() => buildBlocks(sections), [sections])

  const { segments, referenceGroups } = useMemo(() => {
    const segs: Segment[] = [{ theory: [], interactive: [] }]
    const refs: { header: Extract<RenderBlock, { kind: "text" }>; content: RenderBlock }[] = []
    let i = 0
    while (i < blocks.length) {
      const block = blocks[i]
      if (block.kind === "interactive") {
        segs[segs.length - 1].interactive.push(block)
        i++
        continue
      }
      const next = blocks[i + 1]
      if (
        block.kind === "text" &&
        isReferenceHeader(block.content) &&
        next &&
        (next.kind === "formula-grid" || next.kind === "bullets")
      ) {
        refs.push({ header: block, content: next })
        segs.push({ theory: [], interactive: [] })
        i += 2
        continue
      }
      segs[segs.length - 1].theory.push(block)
      i++
    }
    return { segments: segs, referenceGroups: refs }
  }, [blocks])

  const hasInteractive = segments.some(s => s.interactive.length > 0)

  return (
    <div>
      {segments.map((seg, idx) => (
        <Fragment key={idx}>
          {idx > 0 && referenceGroups[idx - 1] && (
            <FullWidthReference
              header={referenceGroups[idx - 1].header}
              content={referenceGroups[idx - 1].content}
            />
          )}
          <div className="md:grid md:grid-cols-[35fr_65fr] md:gap-8">
            <div className="space-y-8">
              {seg.theory.map((block, bi) => (
                <Fragment key={bi}>
                  {bi > 0 && <SectionDivider />}
                  <TheoryBlock block={block} />
                </Fragment>
              ))}
            </div>
            <div className={hasInteractive ? "hidden md:block" : "hidden"}>
              <InteractivePanel blocks={seg.interactive} />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
