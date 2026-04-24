"use client"

import dynamic from "next/dynamic"
import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Users, Map, List } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { COUNTRY_FLAGS, COUNTRY_LABELS } from "@/types/venue"
import { cn } from "@/lib/utils"
import type { VenueWithReviewStats } from "@/types/venue"

const VenueMap = dynamic(() => import("@/components/venue-map"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-muted flex items-center justify-center">
      <div className="text-muted-foreground text-sm animate-pulse">Loading map…</div>
    </div>
  ),
})

interface MapPageClientProps {
  venues: VenueWithReviewStats[]
}

export function MapPageClient({ venues }: MapPageClientProps) {
  const [activeVenueId, setActiveVenueId] = useState<string | null>(null)
  const [hoveredVenueId, setHoveredVenueId] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState<"list" | "map">("map")
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleMarkerClick = useCallback((venueId: string) => {
    setActiveVenueId(venueId)
    setMobileView("list")
    const el = cardRefs.current[venueId]
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])

  const handleCardClick = useCallback((venueId: string) => {
    setActiveVenueId(venueId)
    setMobileView("map")
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Mobile toggle */}
      <div className="flex lg:hidden items-center justify-center gap-2 p-3 border-b border-border bg-background shrink-0">
        <Button
          size="sm"
          variant={mobileView === "list" ? "default" : "outline"}
          className="gap-1.5"
          onClick={() => setMobileView("list")}
        >
          <List className="h-4 w-4" /> List
        </Button>
        <Button
          size="sm"
          variant={mobileView === "map" ? "default" : "outline"}
          className="gap-1.5"
          onClick={() => setMobileView("map")}
        >
          <Map className="h-4 w-4" /> Map
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Side panel */}
        <div
          className={cn(
            "w-full lg:w-[420px] shrink-0 flex flex-col border-r border-border bg-background",
            mobileView === "map" ? "hidden lg:flex" : "flex"
          )}
        >
          <div className="px-4 py-3 border-b border-border shrink-0">
            <p className="font-serif text-lg font-semibold">{venues.length} venues</p>
            <p className="text-xs text-muted-foreground mt-0.5">Click a card to pan the map</p>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-border">
            {venues.map((venue) => (
              <div
                key={venue.id}
                ref={(el) => { cardRefs.current[venue.id] = el }}
                className={cn(
                  "flex gap-3 p-4 cursor-pointer transition-colors hover:bg-muted/50",
                  activeVenueId === venue.id && "bg-accent/10 border-l-4 border-l-accent"
                )}
                onMouseEnter={() => setHoveredVenueId(venue.id)}
                onMouseLeave={() => setHoveredVenueId(null)}
                onClick={() => handleCardClick(venue.id)}
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={venue.hero_image_url}
                    alt={venue.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider mb-0.5">
                    {COUNTRY_FLAGS[venue.country]} {venue.region}, {COUNTRY_LABELS[venue.country]}
                  </p>
                  <Link
                    href={`/venues/${venue.slug}`}
                    className="font-serif text-base font-semibold leading-snug hover:text-accent transition-colors line-clamp-1 block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {venue.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge variant="secondary" className="text-xs font-sans px-1.5 py-0">
                      {venue.price_band}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {venue.capacity_min}–{venue.capacity_max}
                    </span>
                    {venue.avg_rating != null && (
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {venue.avg_rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div
          className={cn(
            "flex-1 relative",
            mobileView === "list" ? "hidden lg:block" : "block"
          )}
        >
          <VenueMap
            venues={venues}
            activeVenueId={activeVenueId}
            hoveredVenueId={hoveredVenueId}
            onVenueClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  )
}
