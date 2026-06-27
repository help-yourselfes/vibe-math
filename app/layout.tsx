import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Sidebar } from "@/components/layout/Sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vibe Math — Interactive Calculus",
  description: "Master calculus with interactive lessons. Hands-on, visual, and free.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background antialiased">
        <Navbar />
        <div className="flex min-h-screen" style={{ paddingTop: "3.5rem" }}>
          <Sidebar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
        <footer className="border-t border-border/30 py-8 text-center">
          <div className="container">
            <p className="text-sm text-muted-foreground/60">Vibe Math — Learn calculus at your own pace</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
