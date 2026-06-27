import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { data: access } = await supabase
    .from("user_lesson_access")
    .select("lesson_id")
    .eq("user_id", user.id)

  if (access && access.length >= 7) {
    return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` })
  }

  const response = await fetch(
    "https://api.lemonsqueezy.com/v1/checkouts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            product_options: {
              enabled_variants: [parseInt(process.env.LEMON_SQUEEZY_VARIANT_ID || "0")],
              redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            },
            checkout_data: {
              email: user.email,
              custom: {
                user_id: user.id,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEEZY_STORE_ID!,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: process.env.LEMON_SQUEEZY_VARIANT_ID!,
              },
            },
          },
        },
      }),
    }
  )

  const json = await response.json()

  if (json.data?.attributes?.url) {
    return NextResponse.json({ url: json.data.attributes.url })
  }

  return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
}
