"use client"

import dynamic from "next/dynamic"
import { VenueCardSkeleton } from "@/components/venue-card"
import type { VenueWithReviewStats } from "@/types/venue"

const MapViewInner = dynamic(() => import("./map-view-inner").then((m) => m.MapViewInner), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-muted rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Loading map…</p>
    </div>
  ),
})

interface MapViewProps {
  venues: VenueWithReviewStats[]
  shortlistedIds?: string[]
  onToggleShortlist?: (venueId: string) => void
}

export function MapView(props: MapViewProps) {
  return <MapViewInner {...props} />
}
