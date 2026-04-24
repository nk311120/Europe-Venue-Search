"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, ArrowRight, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InquiryForm } from "@/components/inquiry-form"
import { VenuePlaceholder } from "@/components/venue-placeholder"
import { createClient } from "@/lib/supabase/client"
import { COUNTRY_FLAGS, COUNTRY_LABELS, VENUE_TYPE_LABELS } from "@/types/venue"
import { formatPrice } from "@/lib/format"
import { toast } from "sonner"
import type { Venue } from "@/types/venue"

export default function ShortlistPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkVenueIndex, setBulkVenueIndex] = useState(0)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const supabase = createClient()

  useEffect(() => {
    loadShortlist()
  }, [])

  async function loadShortlist() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data } = await supabase
        .from("shortlists")
        .select("venue_id, venues(*)")
        .eq("user_id", user.id)

      setVenues(data?.map((r: any) => r.venues).filter(Boolean) ?? [])
    } else {
      const ids: string[] = JSON.parse(localStorage.getItem("shortlist") ?? "[]")
      if (ids.length) {
        const { data } = await supabase.from("venues").select("*").in("id", ids)
        setVenues(data ?? [])
      }
    }
    setLoading(false)
  }

  async function removeVenue(venueId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("shortlists").delete().eq("user_id", user.id).eq("venue_id", venueId)
    } else {
      const ids: string[] = JSON.parse(localStorage.getItem("shortlist") ?? "[]")
      localStorage.setItem("shortlist", JSON.stringify(ids.filter((id) => id !== venueId)))
    }
    setVenues((prev) => prev.filter((v) => v.id !== venueId))
    toast("Removed from shortlist")
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading your shortlist…</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Your shortlist</h1>
          <p className="text-muted-foreground mt-1">
            {venues.length === 0
              ? "No venues saved yet"
              : `${venues.length} venue${venues.length > 1 ? "s" : ""} saved`}
          </p>
        </div>
        {venues.length > 1 && (
          <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Send inquiry to all
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  Inquiry {bulkVenueIndex + 1} of {venues.length}: {venues[bulkVenueIndex]?.name}
                </DialogTitle>
              </DialogHeader>
              <InquiryForm
                venueId={venues[bulkVenueIndex]?.id}
                venueName={venues[bulkVenueIndex]?.name}
                onSuccess={() => {
                  if (bulkVenueIndex < venues.length - 1) {
                    setBulkVenueIndex((i) => i + 1)
                    toast(`Sent to ${venues[bulkVenueIndex].name}`)
                  } else {
                    setBulkOpen(false)
                    setBulkVenueIndex(0)
                    toast.success("All inquiries sent!")
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {venues.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h3 className="font-serif text-2xl font-semibold mb-2">Your shortlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Save venues by clicking the heart icon on any listing.
          </p>
          <Button asChild>
            <Link href="/venues">
              Browse venues
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {venues.slice(0, 5).map((venue) => (
            <div key={venue.id} className="relative group rounded-2xl border border-border bg-card overflow-hidden">
              <div className="relative aspect-[4/3]">
                {imgErrors[venue.id] ? (
                  <VenuePlaceholder className="absolute inset-0" label={venue.name} />
                ) : (
                  <Image
                    src={venue.hero_image_url}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    onError={() => setImgErrors((e) => ({ ...e, [venue.id]: true }))}
                  />
                )}
                <button
                  onClick={() => removeVenue(venue.id)}
                  className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full text-destructive hover:bg-destructive hover:text-white transition-all"
                  aria-label={`Remove ${venue.name} from shortlist`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  {COUNTRY_FLAGS[venue.country]} {venue.region}
                </p>
                <Link href={`/venues/${venue.slug}`}>
                  <h2 className="font-serif text-lg font-semibold hover:text-accent transition-colors mb-2">
                    {venue.name}
                  </h2>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{venue.short_description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">{venue.price_band}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {venue.capacity_min}–{venue.capacity_max} guests
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/venues/${venue.slug}`}>View venue</Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1">Inquire</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-xl">Inquire about {venue.name}</DialogTitle>
                      </DialogHeader>
                      <InquiryForm venueId={venue.id} venueName={venue.name} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {venues.length >= 5 && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          Showing 5 of {venues.length} shortlisted venues (maximum displayed).
        </p>
      )}
    </div>
  )
}
