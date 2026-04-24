import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Check, X, MapPin, Plane, PawPrint, Accessibility } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { VenueGallery } from "@/components/venue-gallery"
import { VenueOverviewCard } from "@/components/venue-overview-card"
import { ReviewList } from "@/components/review-list"
import { ReviewForm } from "@/components/review-form"
import { ShortlistToggle } from "@/components/shortlist-toggle"
import { VenueCard } from "@/components/venue-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InquiryForm } from "@/components/inquiry-form"
import { MapView } from "@/components/map-view"
import { COUNTRY_LABELS, COUNTRY_FLAGS, VENUE_TYPE_LABELS, SEASON_LABELS } from "@/types/venue"
import { formatDate } from "@/lib/format"
import { getShortlistedVenueIds } from "@/server-actions/toggle-shortlist"
import { Star } from "lucide-react"
import { ShareButton } from "@/components/share-button"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: venue } = await supabase.from("venues").select("name, short_description").eq("slug", slug).single()

  if (!venue) return { title: "Venue not found" }

  return {
    title: venue.name,
    description: venue.short_description,
  }
}

export default async function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: venue } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!venue) notFound()

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("venue_id", venue.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(20)

  const approvedReviews = reviews ?? []
  const avgRating = approvedReviews.length
    ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
    : null

  // Similar venues
  const { data: similarData } = await supabase
    .from("venues")
    .select("*, reviews(rating, status)")
    .eq("country", venue.country)
    .neq("slug", slug)
    .limit(3)

  const similarVenues = (similarData ?? []).map((v: any) => {
    const ar = (v.reviews ?? []).filter((r: any) => r.status === "approved")
    const ratings = ar.map((r: any) => r.rating)
    return {
      ...v,
      avg_rating: ratings.length ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : null,
      review_count: ratings.length,
    }
  })

  const shortlistedIds = await getShortlistedVenueIds()
  const isShortlisted = shortlistedIds.includes(venue.id)

  const amenities = [
    { label: "Outdoor ceremony", value: venue.outdoor_ceremony },
    { label: "Indoor backup space", value: venue.indoor_backup },
    { label: "In-house catering", value: venue.in_house_catering },
    { label: "Ceremony + reception", value: venue.ceremony_and_reception },
    { label: "Exclusive use", value: venue.exclusive_use },
    { label: "On-site accommodation", value: venue.onsite_accommodation },
    { label: "Pet-friendly", value: venue.pet_friendly },
  ]

  return (
    <div>
      {/* Hero gallery */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl mx-auto">
        <VenueGallery
          heroUrl={venue.hero_image_url}
          galleryUrls={venue.gallery_image_urls}
          venueName={venue.name}
        />
      </div>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main content */}
          <div className="min-w-0">
            {/* Title block */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-2">
                {COUNTRY_FLAGS[venue.country]} {venue.region} · {COUNTRY_LABELS[venue.country]}
              </p>
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">{venue.name}</h1>
                <div className="flex items-center gap-2 mt-1 shrink-0">
                  <ShortlistToggle venueId={venue.id} isShortlisted={isShortlisted} variant="button" />
                  <ShareButton title={venue.name} />
                </div>
              </div>
              {avgRating != null && (
                <div className="flex items-center gap-2 mt-3">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{avgRating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">({approvedReviews.length} reviews)</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {venue.venue_types.map((t) => (
                  <Badge key={t} variant="secondary" className="font-sans">
                    {VENUE_TYPE_LABELS[t]}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Mobile overview card */}
            <div className="lg:hidden mb-8">
              <VenueOverviewCard venue={venue} />
            </div>

            {/* Description */}
            <section className="mb-10">
              <div
                className="prose prose-stone max-w-none text-muted-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: venue.long_description.replace(/\n/g, "<br/>") }}
              />
            </section>

            {/* Highlights */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-semibold mb-4">Highlights</h2>
              <ul className="space-y-2">
                {venue.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Amenities */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-semibold mb-5">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenities.map(({ label, value }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 text-sm ${value ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {value ? (
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    {label}
                  </div>
                ))}
              </div>
              {venue.accessibility_notes && (
                <div className="mt-4 flex gap-2 text-sm p-4 bg-muted/50 rounded-xl">
                  <Accessibility className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Accessibility: </span>
                    <span className="text-muted-foreground">{venue.accessibility_notes}</span>
                  </div>
                </div>
              )}
            </section>

            {/* Reviews */}
            <section id="reviews" className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-semibold">
                  Reviews {approvedReviews.length > 0 && `(${approvedReviews.length})`}
                </h2>
                <ReviewForm
                  venueId={venue.id}
                  venueName={venue.name}
                  isAuthenticated={!!user}
                />
              </div>
              {approvedReviews.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">
                  No reviews yet. Be the first to share your experience.
                </p>
              ) : (
                <ReviewList
                  reviews={approvedReviews.slice(0, 5)}
                  avgRating={avgRating}
                  totalCount={approvedReviews.length}
                />
              )}
            </section>

            {/* Location map */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-semibold mb-2">Location</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                {venue.nearest_city}, {COUNTRY_LABELS[venue.country]}
                <span className="mx-2">·</span>
                <Plane className="h-4 w-4" />
                {venue.nearest_airport_name} ({venue.nearest_airport_code}) — {venue.airport_drive_minutes} min
              </div>
              <MapView
                venues={[{
                  ...venue,
                  avg_rating: avgRating,
                  review_count: approvedReviews.length,
                }]}
              />
            </section>

            {/* Similar venues */}
            {similarVenues.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-semibold mb-6">Similar venues</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {similarVenues.map((v) => (
                    <VenueCard key={v.id} venue={v} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <VenueOverviewCard venue={venue} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sticky CTA (mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-40">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">Request information</Button>
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
  )
}
