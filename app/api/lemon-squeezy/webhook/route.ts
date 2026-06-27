import { NextRequest } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const text = await request.text()
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

    const crypto = await import("crypto")
    const hmac = crypto.createHmac("sha256", secret!)
    const digest = crypto.createHash("sha256").update(text).digest("hex")
    const signature = request.headers.get("x-signature")

    if (signature !== digest) {
      return new Response("Invalid signature", { status: 401 })
    }

    const payload = JSON.parse(text)
    const meta = payload.meta
    const eventName = meta.event_name

    if (eventName === "order_created") {
      const data = payload.data
      const attributes = data.attributes

      const userEmail = attributes.user_email
      const orderId = attributes.id.toString()
      const variantId = attributes.first_order_item?.variant_id?.toString()
      const productId = attributes.first_order_item?.product_id?.toString()
      const status = attributes.status

      const customData = meta.custom_data || {}
      const userId = customData.user_id

      if (!userId) {
        return new Response("No user_id in custom data", { status: 400 })
      }

      const supabase = createAdminClient()

      await supabase.from("purchases").insert({
        user_id: userId,
        lemon_order_id: orderId,
        lemon_product_id: productId,
        lemon_variant_id: variantId,
        status,
      })

      const { data: paidLessons } = await supabase
        .from("lessons")
        .select("id")
        .eq("is_free", false)

      if (paidLessons) {
        const accessRows = paidLessons.map((lesson) => ({
          user_id: userId,
          lesson_id: lesson.id,
        }))

        await supabase.from("user_lesson_access").upsert(accessRows, {
          onConflict: "user_id, lesson_id",
          ignoreDuplicates: true,
        })
      }
    }

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new Response("Webhook error", { status: 400 })
  }
}
