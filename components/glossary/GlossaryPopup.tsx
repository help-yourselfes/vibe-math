"use client"

import { useEffect, useCallback, useState } from "react"
import { getGlossaryEntry, catColor, catLabel } from "./glossaryData"
import { renderMath } from "@/lib/katex-utils"
import { createClient } from "@/lib/supabase/client"
import { Modal } from "@/components/ui/Modal"

export function GlossaryPopup({
  term,
  onClose,
}: {
  term: string | null
  onClose: () => void
}) {
  const [saved, setSaved] = useState(false)
  const [hasAccount, setHasAccount] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setHasAccount(true)
        supabase
          .from("saved_glossary_terms")
          .select("term")
          .eq("user_id", user.id)
          .then(({ data }) => {
            const savedTerms = new Set(data?.map((r) => r.term) ?? [])
            if (term && savedTerms.has(term)) setSaved(true)
          })
      }
    })
  }, [term])

  const toggleSaved = useCallback(async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !term) return

    if (saved) {
      await supabase.from("saved_glossary_terms").delete().eq("user_id", user.id).eq("term", term)
      setSaved(false)
    } else {
      await supabase.from("saved_glossary_terms").insert({ user_id: user.id, term })
      setSaved(true)
    }
  }, [saved, term])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (term) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [term, handleKeyDown])

  const entry = term ? getGlossaryEntry(term) : null

  return (
    <Modal open={!!term} onClose={onClose} maxWidth="max-w-2xl">
      {entry && (
        <div>
          <div className="flex items-start justify-between mb-5">
            <div className="space-y-2">
              <span
                className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${catColor[entry.category] || ""}`}
              >
                {catLabel[entry.category] || entry.category}
              </span>
              <h2 className="text-2xl font-bold tracking-tight">{entry.term}</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasAccount && (
                <button
                  onClick={toggleSaved}
                  className="p-1.5 text-muted-foreground/50 hover:text-amber-400 transition-colors shrink-0"
                  title={saved ? "Remove from saved" : "Save to glossary"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={saved ? "text-amber-400" : ""}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed mb-6">{entry.definition}</p>

          {entry.formula && (
            <div className="rounded-xl bg-[rgba(13,17,23,0.5)] border border-[#1f2937] p-5 text-center overflow-x-auto">
              <p className="text-[11px] text-muted-foreground/40 font-semibold uppercase tracking-widest mb-3">
                Mathematical Representation
              </p>
              <div
                className="text-lg text-[#818cf8] [&_.katex]:text-xl"
                dangerouslySetInnerHTML={renderMath(entry.formula)}
              />
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
