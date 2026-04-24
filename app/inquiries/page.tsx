import { redirect } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/format"
import { ArrowRight, MessageSquare } from "lucide-react"

export const metadata: Metadata = { title: "My Inquiries" }

const STATUS_COLORS = {
  pending: "secondary",
  sent: "default",
  replied: "outline",
  closed: "secondary",
} as const

export default async function InquiriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/sign-in?next=/inquiries")

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, venues(slug, name, hero_image_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold mb-8">My inquiries</h1>

      {!inquiries?.length ? (
        <div className="text-center py-16">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h3 className="font-serif text-2xl font-semibold mb-2">No inquiries yet</h3>
          <p className="text-muted-foreground mb-6">
            Browse venues and send your first inquiry.
          </p>
          <Button asChild>
            <Link href="/venues">Browse venues <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry: any) => (
            <div key={inquiry.id} className="border border-border rounded-2xl overflow-hidden bg-card">
              <div className="flex flex-col sm:flex-row">
                {/* Venue thumbnail */}
                <div className="relative w-full sm:w-32 h-32 shrink-0">
                  {inquiry.venues?.hero_image_url ? (
                    <Image
                      src={inquiry.venues.hero_image_url}
                      alt={inquiry.venues.name ?? ""}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <Link
                        href={`/venues/${inquiry.venues?.slug}`}
                        className="font-serif text-lg font-semibold hover:text-accent transition-colors"
                      >
                        {inquiry.venues?.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Submitted {formatDate(inquiry.created_at)}
                      </p>
                    </div>
                    <Badge variant={STATUS_COLORS[inquiry.status as keyof typeof STATUS_COLORS] ?? "secondary"}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                    {(inquiry.preferred_date_from || inquiry.date_flexible) && (
                      <span>
                        {inquiry.date_flexible
                          ? "Flexible dates"
                          : `${formatDate(inquiry.preferred_date_from)} – ${formatDate(inquiry.preferred_date_to)}`}
                      </span>
                    )}
                    <span>{inquiry.guest_count} guests</span>
                    {inquiry.budget_band && <span>Budget: {inquiry.budget_band}</span>}
                  </div>

                  {inquiry.venue_reply && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-xl">
                      <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">
                        Venue replied · {formatDate(inquiry.replied_at)}
                      </p>
                      <p className="text-sm text-foreground">{inquiry.venue_reply}</p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/venues/${inquiry.venues?.slug}`}>View venue</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
