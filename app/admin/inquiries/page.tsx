import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = { title: "Admin — Inquiries" }

const STATUS_COLORS = {
  pending: "secondary",
  sent: "default",
  replied: "outline",
  closed: "secondary",
} as const

export default async function AdminInquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, venues(name, slug)")
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-6">All inquiries ({inquiries?.length ?? 0})</h2>
      <div className="space-y-3">
        {inquiries?.map((inq: any) => (
          <div key={inq.id} className="border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{inq.full_name}</span>
                  <span className="text-muted-foreground text-sm">→</span>
                  <Link href={`/venues/${inq.venues?.slug}`} className="font-medium hover:text-accent">
                    {inq.venues?.name}
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {inq.email} · {inq.guest_count} guests · {formatDate(inq.created_at)}
                </p>
              </div>
              <Badge variant={STATUS_COLORS[inq.status as keyof typeof STATUS_COLORS] ?? "secondary"}>
                {inq.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{inq.message}</p>
            <div className="mt-3 flex gap-2">
              <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{inq.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
