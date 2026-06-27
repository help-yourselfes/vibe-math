import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vibe Math - Interactive Calculus",
  description: "Master calculus with interactive lessons. Free lessons to start, then unlock the full course.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          <div className="container">Vibe Math &mdash; Learn calculus at your own pace</div>
        </footer>
      </body>
    </html>
  )
}
