import type { Metadata } from "next"
import { AppShell } from "@/components/layout/AppShell"
import "katex/dist/katex.min.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vibe Math — Interactive Calculus",
  description: "Master calculus with interactive lessons. Hands-on, visual, and free.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background antialiased">
        <AppShell>
          {children}
        </AppShell>
        <footer className="border-t border-border/30 py-10 text-center">
          <div className="container">
            <p className="text-sm text-muted-foreground/60">Vibe Math — Learn calculus at your own pace</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
