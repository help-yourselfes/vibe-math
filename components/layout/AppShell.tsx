"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { GlossaryPopup } from "@/components/glossary/GlossaryPopup"
import { cn } from "@/lib/utils"

interface AppContextType {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  sidebarMode: "course" | "glossary" | "review"
  setSidebarMode: (mode: "course" | "glossary" | "review") => void
  activeGlossaryTerm: string | null
  setActiveGlossaryTerm: (term: string | null) => void
  reviewGlow: boolean
  triggerReviewGlow: () => void
  reviewLessonSlug: string | null
  setReviewLessonSlug: (slug: string | null) => void
}

const AppContext = createContext<AppContextType>({
  collapsed: false,
  setCollapsed: () => {},
  sidebarMode: "course",
  setSidebarMode: () => {},
  activeGlossaryTerm: null,
  setActiveGlossaryTerm: () => {},
  reviewGlow: false,
  triggerReviewGlow: () => {},
  reviewLessonSlug: null,
  setReviewLessonSlug: () => {},
})

export const useApp = () => useContext(AppContext)
export { AppContext }

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLessonPage = pathname.startsWith("/lessons/")

  const [collapsed, setCollapsed] = useState(true)
  const [sidebarMode, setSidebarMode] = useState<"course" | "glossary" | "review">("course")
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null)
  const [reviewGlow, setReviewGlow] = useState(false)
  const [reviewLessonSlug, setReviewLessonSlug] = useState<string | null>(null)

  useEffect(() => {
    setSidebarMode("course")
    setActiveGlossaryTerm(null)
    setReviewLessonSlug(null)
  }, [pathname])

  useEffect(() => {
    if (isLessonPage) return
    setCollapsed(true)
  }, [pathname, isLessonPage])

  const triggerReviewGlow = useCallback(() => {
    setReviewGlow(true)
    setTimeout(() => setReviewGlow(false), 2000)
  }, [])

  return (
    <AppContext.Provider
      value={{
        collapsed, setCollapsed,
        sidebarMode, setSidebarMode,
        activeGlossaryTerm, setActiveGlossaryTerm,
        reviewGlow, triggerReviewGlow,
        reviewLessonSlug, setReviewLessonSlug,
      }}
    >
      <div className="flex min-h-screen">
        {isLessonPage && <Sidebar />}
        <div
          className="flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out"
          style={{ marginLeft: isLessonPage ? (collapsed ? 0 : 280) + "px" : 0 }}
        >
          {!isLessonPage && <Navbar />}
          <main className={cn("flex-1 pb-16", !isLessonPage && "pt-24")}>
            <div className={cn(isLessonPage && "pt-10")}>
              {children}
            </div>
          </main>
        </div>
      </div>

      <GlossaryPopup
        term={activeGlossaryTerm}
        onClose={() => setActiveGlossaryTerm(null)}
      />
    </AppContext.Provider>
  )
}
