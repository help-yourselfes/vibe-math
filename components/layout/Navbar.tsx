"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { UserButton } from "@/components/auth/UserButton"
import { InfinityIcon } from "@/components/ui/icons"

const navLinks = [
  { href: "/lessons", label: "Lessons" },
  { href: "/glossary", label: "Glossary" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
]

export function Navbar() {
  const pathname = usePathname()
  if (pathname.startsWith("/lessons/")) return null

  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#818cf8] text-white text-sm">
              <InfinityIcon size={16} />
            </span>
            Vibe Math
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-100 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <UserButton />
      </div>
    </header>
  )
}
