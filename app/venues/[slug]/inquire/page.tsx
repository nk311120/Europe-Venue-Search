import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InquiryForm } from "@/components/inquiry-form"
import { createClient } from "@/lib/supabase/server"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: venue } = await supabase.from("venues").select("name").eq("slug", slug).single()
  return { title: `Inquire — ${venue?.name ?? "Venue"}` }
}

export default async function InquirePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: venue } = await supabase.from("venues").select("id, name").eq("slug", slug).single()

  if (!venue) notFound()

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href={`/venues/${slug}`}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {venue.name}
        </Link>
      </Button>

      <h1 className="font-serif text-3xl font-semibold mb-2">Request information</h1>
      <p className="text-muted-foreground mb-8">
        Tell <strong>{venue.name}</strong> about your plans. They&apos;ll respond within 2–3 business days.
      </p>

      <InquiryForm venueId={venue.id} venueName={venue.name} />
    </div>
  )
}
