"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Users, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VenuePlaceholder } from "@/components/venue-placeholder"
import { COUNTRY_LABELS, COUNTRY_FLAGS, VENUE_TYPE_LABELS } from "@/types/venue"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { VenueWithReviewStats } from "@/types/venue"

interface VenueCardProps {
  venue: VenueWithReviewStats
  isShortlisted?: boolean
  onToggleShortlist?: (venueId: string) => void
  className?: string
}

export function VenueCard({ venue, isShortlisted = false, onToggleShortlist, className }: VenueCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className={cn("group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border transition-shadow hover:shadow-lg", className)}>
      {/* Image */}
      <Link href={`/venues/${venue.slug}`} className="relative aspect-[4/3] block overflow-hidden rounded-2xl">
        {imgError ? (
          <VenuePlaceholder className="absolute inset-0 rounded-2xl" label={venue.name} />
        ) : (
          <Image
            src={venue.hero_image_url}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Shortlist heart */}
        {onToggleShortlist && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleShortlist(venue.id)
            }}
            aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all duration-200 bg-background/80 backdrop-blur-sm hover:bg-background",
              isShortlisted ? "text-accent" : "text-muted-foreground hover:text-accent"
            )}
          >
            <Heart className={cn("h-4 w-4", isShortlisted && "fill-current")} />
          </button>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <div className="mb-2">
          <p className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground font-medium">
            {COUNTRY_FLAGS[venue.country]} {venue.region}, {COUNTRY_LABELS[venue.country]}
          </p>
        </div>

        <Link href={`/venues/${venue.slug}`}>
          <h2 className="font-serif text-lg font-semibold leading-snug text-foreground hover:text-accent transition-colors mb-1">
            {venue.name}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">
          {venue.short_description}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2 mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {venue.capacity_min}–{venue.capacity_max}
              </span>
            </div>
            <Badge variant="secondary" className="text-xs font-sans">
              {venue.price_band}
            </Badge>
          </div>

          {venue.avg_rating != null ? (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-foreground">{venue.avg_rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({venue.review_count})</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">No reviews yet</span>
          )}
        </div>
      </div>
    </article>
  )
}

export function VenueCardSkeleton() {
  return (
    <div className="flex flex-col bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
        <div className="h-px bg-muted rounded mt-2" />
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-1/4" />
        </div>
      </div>
    </div>
  )
}
