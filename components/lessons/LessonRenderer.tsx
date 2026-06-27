"use client"

import { Fragment, useMemo } from "react"
import "katex/dist/katex.min.css"
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

function TextPara({ content }: { content: string }) {
  return (
    <p className="leading-relaxed text-[15px] text-foreground/90">
      <RichText content={content} />
    </p>
  )
}

function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-l-[#4f46e5] bg-[rgba(13,17,23,0.5)] rounded-r-xl py-5 pr-5 my-8">
      <div className="pl-5 space-y-3">{children}</div>
    </div>
  )
}

function KeyValueList({ pairs }: { pairs: { key: string; desc: string }[] }) {
  return (
    <div className="space-y-4 my-6">
      {pairs.map((pair, i) => (
        <div key={i} className="flex items-start gap-4 rounded-lg border border-border/40 bg-[rgba(13,17,23,0.5)] p-4">
          <span className="shrink-0 rounded-md bg-[#4f46e5]/15 px-2.5 py-1 text-xs font-bold text-[#818cf8]">
            <RichText content={pair.key} />
          </span>
          <span className="text-sm text-muted-foreground leading-relaxed">
            <RichText content={pair.desc} />
          </span>
        </div>
      ))}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item, i) => {
        const cleaned = item.replace(/^-\s+/, "")
        return (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f46e5]/50" />
            <span className="leading-relaxed"><RichText content={cleaned} /></span>
          </li>
        )
      })}
    </ul>
  )
}

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

function isCallout(content: string) {
  return /^(Formally,|The rule:|The derivative is defined as|The formula:)/.test(content) || content.includes(" is defined as ")
}

function isBulletItem(content: string) { return content.trim().startsWith("- ") }
function isFormulaItem(content: string) { return /^-\s+\$/.test(content.trim()) }
function isKeyValueItem(content: string) { return /^-\s+\*\*[^*]+\*\*:/.test(content.trim()) }
function stripBullet(content: string) { return content.trim().replace(/^-\s+/, "") }

function parseKeyValue(content: string) {
  const cleaned = stripBullet(content)
  const match = cleaned.match(/^\*\*([^*]+)\*\*:\s*(.*)$/)
  return match ? { key: match[1], desc: match[2] } : null
}

interface Section {
  type: "text" | "math" | "interactive" | "quiz"
  content: string
  interactive?: string
  quizOptions?: string[]
  quizCorrectIndex?: number
  quizExplanation?: string
}

export type RenderBlock =
  | { kind: "text"; content: string }
  | { kind: "callout"; content: string }
  | { kind: "formula-grid"; items: string[] }
  | { kind: "key-value"; pairs: { key: string; desc: string }[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "interactive"; name: string }
  | { kind: "quiz"; question: string; options: string[]; correctIndex: number; explanation: string }

export function buildBlocks(sections: Section[]): RenderBlock[] {
  const blocks: RenderBlock[] = []
  let bulletBuf: Section[] = []

  function flushBullets() {
    if (bulletBuf.length === 0) return
    const items = bulletBuf.map(s => s.content)
    const formulaCount = items.filter(isFormulaItem).length
    const kvCount = items.filter(isKeyValueItem).length

    if (formulaCount >= 3 || (formulaCount >= 2 && formulaCount >= items.length * 0.5)) {
      blocks.push({ kind: "formula-grid", items: items.map(s => stripBullet(s)) })
    } else if (kvCount >= items.length * 0.5) {
      const pairs = items.map(parseKeyValue).filter(Boolean) as { key: string; desc: string }[]
      blocks.push({ kind: "key-value", pairs })
    } else {
      blocks.push({ kind: "bullets", items })
    }
    bulletBuf = []
  }

  for (const sec of sections) {
    if (sec.type === "text" && isBulletItem(sec.content)) {
      bulletBuf.push(sec)
    } else {
      flushBullets()
      if (sec.type === "text") {
        blocks.push(isCallout(sec.content)
          ? { kind: "callout", content: sec.content }
          : { kind: "text", content: sec.content })
      } else if (sec.type === "interactive" && sec.interactive) {
        blocks.push({ kind: "interactive", name: sec.interactive })
      } else if (sec.type === "quiz") {
        blocks.push({
          kind: "quiz",
          question: sec.content,
          options: sec.quizOptions ?? [],
          correctIndex: sec.quizCorrectIndex ?? 0,
          explanation: sec.quizExplanation ?? "",
        })
      }
    }
  }
  flushBullets()
  return blocks
}

export function LessonRenderer({ sections }: { sections: Section[] }) {
  const blocks = useMemo(() => buildBlocks(sections), [sections])

  return (
    <div className="space-y-10 max-w-none">
      {blocks.map((block, i) => {
        const divider = i > 0 ? <div className="section-divider" /> : null
        switch (block.kind) {
          case "text":
            return <Fragment key={i}>{divider}<TextPara content={block.content} /></Fragment>
          case "callout":
            return <Fragment key={i}>{divider}<CalloutBox><TextPara content={block.content} /></CalloutBox></Fragment>
          case "formula-grid":
            return <Fragment key={i}>{divider}<FormulaGrid items={block.items} /></Fragment>
          case "key-value":
            return <Fragment key={i}>{divider}<KeyValueList pairs={block.pairs} /></Fragment>
          case "bullets":
            return <Fragment key={i}>{divider}<BulletList items={block.items} /></Fragment>
          case "interactive":
            return (
              <Fragment key={i}>
                {divider}
                <div className="section-interactive border border-border/40 p-6">
                  <div className="flex items-center gap-2 mb-5 text-xs text-muted-foreground border-b border-border/30 pb-3">
                    <BrainIcon size={14} />
                    <span>Interactive — try it yourself</span>
                  </div>
                  {getInteractive(block.name)}
                </div>
              </Fragment>
            )
          case "quiz":
            return (
              <Fragment key={i}>
                {divider}
                <QuizCard
                  question={block.question}
                  options={block.options}
                  correctIndex={block.correctIndex}
                  explanation={block.explanation}
                />
              </Fragment>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
