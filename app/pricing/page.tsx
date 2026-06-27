import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Check } from "lucide-react"

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const features = [
    "All 10 calculus lessons",
    "Interactive step-by-step solvers",
    "Graph visualizations",
    "Progress tracking",
    "Future lessons included",
    "Lifetime access",
  ]

  async function createCheckout() {
    "use server"

    if (!user) {
      redirect("/auth/login?redirect=/pricing")
    }

    const supabase = await createClient()

    const { data: access } = await supabase
      .from("user_lesson_access")
      .select("lesson_id")
      .eq("user_id", user.id)

    if (access && access.length >= 7) {
      redirect("/dashboard")
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
                  id: process.env.LEMON_SQUEEZY_STORE_ID,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: process.env.LEMON_SQUEEZY_VARIANT_ID,
                },
              },
            },
          },
        }),
      }
    )

    const json = await response.json()
    if (json.data?.attributes?.url) {
      redirect(json.data.attributes.url)
    }
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Simple, One-Time Pricing</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Pay once and get lifetime access to all current and future lessons.
          No subscriptions, no recurring charges.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="border-primary/50">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-4xl font-bold">
              $29
              <span className="text-base font-normal text-muted-foreground"> / lifetime</span>
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Full access to all calculus lessons
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <form action={createCheckout} className="w-full">
              <Button type="submit" size="lg" className="w-full text-base">
                {user ? "Unlock All Lessons" : "Sign In to Purchase"}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      <p className="text-center text-xs text-muted-foreground max-w-md mx-auto">
        Your purchase helps us create more lessons and keep the content up to date.
        30-day money-back guarantee if you&apos;re not satisfied.
      </p>
    </div>
  )
}
