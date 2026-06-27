import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ saved: [] })

  const { data } = await supabase
    .from("saved_glossary_terms")
    .select("term")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })

  return NextResponse.json({ saved: data?.map((r) => r.term) ?? [] })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { term } = await req.json()
  if (!term) return NextResponse.json({ error: "term required" }, { status: 400 })

  const { error } = await supabase
    .from("saved_glossary_terms")
    .insert({ user_id: user.id, term })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ saved: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { term } = await req.json()
  if (!term) return NextResponse.json({ error: "term required" }, { status: 400 })

  const { error } = await supabase
    .from("saved_glossary_terms")
    .delete()
    .eq("user_id", user.id)
    .eq("term", term)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ saved: false })
}
