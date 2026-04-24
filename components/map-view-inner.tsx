"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { COUNTRY_FLAGS } from "@/types/venue"
import type { VenueWithReviewStats } from "@/types/venue"

// Leaflet is browser-only — this component is loaded dynamically (no SSR)
import "leaflet/dist/leaflet.css"

interface MapViewInnerProps {
  venues: VenueWithReviewStats[]
  shortlistedIds?: string[]
  onToggleShortlist?: (venueId: string) => void
}

export function MapViewInner({ venues }: MapViewInnerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<import("leaflet").Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    async function init() {
      const L = (await import("leaflet")).default

      // Fix default marker icon path
      // @ts-expect-error - leaflet icon default image path fix
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current!, {
        center: [46, 8],
        zoom: 5,
        scrollWheelZoom: false,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Add markers
      venues.forEach((venue) => {
        const flag = COUNTRY_FLAGS[venue.country]
        const rating = venue.avg_rating != null ? venue.avg_rating.toFixed(1) : "–"

        const popup = L.popup({ maxWidth: 260, className: "venue-popup" }).setContent(`
          <div style="font-family: sans-serif; min-width: 220px;">
            <div style="font-size:11px; color:#8A8070; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">
              ${flag} ${venue.region}
            </div>
            <div style="font-size:16px; font-weight:600; color:#1C1A17; margin-bottom:4px; font-family: Georgia, serif;">
              ${venue.name}
            </div>
            <div style="font-size:12px; color:#8A8070; margin-bottom:8px;">
              ★ ${rating} · ${venue.capacity_min}–${venue.capacity_max} guests · ${venue.price_band}
            </div>
            <a href="/venues/${venue.slug}"
               style="display:inline-block; background:#1C1A17; color:#FAF8F5; padding:6px 14px; border-radius:6px; text-decoration:none; font-size:12px; font-weight:500;">
              View venue →
            </a>
          </div>
        `)

        L.marker([venue.lat, venue.lng])
          .addTo(map)
          .bindPopup(popup)
      })

      leafletMapRef.current = map
    }

    init()

    return () => {
      leafletMapRef.current?.remove()
      leafletMapRef.current = null
    }
  }, [venues])

  return (
    <div
      ref={mapRef}
      className="w-full h-[600px] rounded-2xl overflow-hidden border border-border z-0"
      aria-label="Map showing venue locations"
    />
  )
}
