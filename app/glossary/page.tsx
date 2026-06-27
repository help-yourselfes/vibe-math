import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getGlossaryEntry, glossaryTerms, type GlossaryEntry } from "@/components/glossary/glossaryData"
import katex from "katex"

function renderMath(tex: string) {
  return { __html: katex.renderToString(tex, { throwOnError: false, displayMode: false }) }
}

const catColor: Record<string, string> = {
  definition: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  formula: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  theorem: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}
const catLabel: Record<string, string> = {
  definition: "Definition",
  formula: "Formula",
  theorem: "Theorem",
}

function GlossaryCard({ entry }: { entry: GlossaryEntry }) {
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-5 hover:border-[#4f46e5]/30 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${catColor[entry.category] || ""}`}>
            {catLabel[entry.category] || entry.category}
          </span>
          <h3 className="text-lg font-bold tracking-tight mt-2">{entry.term}</h3>
        </div>
        <Link
          href={`/lessons/${entry.lessonSlug}`}
          className="shrink-0 text-[11px] text-[#4f46e5]/60 hover:text-[#818cf8] transition-colors mt-1"
        >
          View lesson →
        </Link>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{entry.definition}</p>
      {entry.formula && (
        <div className="text-sm text-[#818cf8]/80 text-center bg-[rgba(13,17,23,0.5)] rounded-lg p-3 border border-[#1f2937]">
          <span dangerouslySetInnerHTML={renderMath(entry.formula)} />
        </div>
      )}
    </div>
  )
}

export default async function GlossaryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: saved } = await supabase
    .from("saved_glossary_terms")
    .select("term")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })

  const entries = (saved ?? [])
    .map((r) => getGlossaryEntry(r.term))
    .filter((e): e is GlossaryEntry => e !== undefined)

  const groups: Record<string, GlossaryEntry[]> = { definition: [], formula: [], theorem: [] }
  for (const e of entries) {
    if (groups[e.category]) groups[e.category].push(e)
  }

  return (
    <div className="container py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">My Glossary</h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Your saved glossary terms — star terms from any lesson to save them here.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground/50 text-sm mb-2">No saved terms yet</p>
          <p className="text-muted-foreground/30 text-xs">
            Click the star icon on any glossary term popup to save it here.
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-10">
          {(["definition", "formula", "theorem"] as const).map((cat) => {
            const catEntries = groups[cat]
            if (!catEntries.length) return null
            return (
              <section key={cat}>
                <h2 className="text-lg font-semibold tracking-tight mb-4 text-muted-foreground/80">
                  {catLabel[cat]}
                </h2>
                <div className="space-y-4">
                  {catEntries.map((entry) => (
                    <GlossaryCard key={entry.term} entry={entry} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
