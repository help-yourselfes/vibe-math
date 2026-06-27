import Link from "next/link"
import { UserButton } from "@/components/auth/UserButton"
import { InfinityIcon } from "@/components/ui/icons"

export function Navbar() {
  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#c084fc] text-white text-sm">
              <InfinityIcon size={16} />
            </span>
            Vibe Math
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/lessons" className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
              Lessons
            </Link>
            <Link href="/pricing" className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
              Pricing
            </Link>
            <Link href="/dashboard" className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
              Dashboard
            </Link>
          </nav>
        </div>
        <UserButton />
      </div>
    </header>
  )
}
