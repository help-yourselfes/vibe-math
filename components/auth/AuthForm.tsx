"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Mode = "signin" | "register"

export function AuthForm() {
  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const redirectTo = `${window.location.origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  const title = mode === "signin" ? "Welcome back" : "Create your account"
  const description = mode === "signin"
    ? "Enter your email and we&apos;ll send you a magic link"
    : "Enter your email to get started with a magic link"
  const buttonText = mode === "signin" ? "Send Magic Link" : "Create Account"

  if (sent) {
    return (
      <div className="w-full max-w-sm mx-auto rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-8 text-center">
        <h2 className="text-2xl font-bold text-center mb-2">Check your email</h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          {mode === "register" ? "Your account" : "We"} sent a magic link to <span className="text-[#818cf8]">{email}</span>. Click it to{mode === "register" ? " verify your email and sign in" : " sign in"}.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="inline-flex items-center rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.6)] backdrop-blur-[8px] p-1 mb-5">
        <button
          onClick={() => setMode("signin")}
          className={cn(
            "px-5 py-2 text-sm rounded-lg transition-all duration-150",
            mode === "signin"
              ? "bg-[#4f46e5]/20 text-[#818cf8] font-medium shadow-sm"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("register")}
          className={cn(
            "px-5 py-2 text-sm rounded-lg transition-all duration-150",
            mode === "register"
              ? "bg-[#4f46e5]/20 text-[#818cf8] font-medium shadow-sm"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          )}
        >
          Register
        </button>
      </div>
      <div className="w-full rounded-xl border border-[#1f2937] bg-[rgba(13,17,23,0.75)] backdrop-blur-[12px] p-8">
        <h2 className="text-2xl font-bold text-center mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : buttonText}
          </Button>
        </form>
      </div>
    </div>
  )
}
