import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = { title: "Admin Overview" }

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { count: venueCount },
    { count: inquiryCount },
    { count: pendingReviews },
    { count: totalReviews },
  ] = await Promise.all([
    supabase.from("venues").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    { label: "Total venues", value: venueCount ?? 0, href: "/admin/venues" },
    { label: "Total inquiries", value: inquiryCount ?? 0, href: "/admin/inquiries" },
    { label: "Pending reviews", value: pendingReviews ?? 0, href: "/admin/reviews", highlight: (pendingReviews ?? 0) > 0 },
    { label: "Total reviews", value: totalReviews ?? 0, href: "/admin/reviews" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, value, href, highlight }) => (
        <Link key={label} href={href} className={`p-6 border rounded-2xl hover:bg-muted/30 transition-colors ${highlight ? "border-accent/50 bg-accent/5" : "border-border"}`}>
          <p className="font-serif text-4xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{label}</p>
          <span className="text-xs text-accent flex items-center gap-1 mt-3">
            Manage <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      ))}
    </div>
  )
}
