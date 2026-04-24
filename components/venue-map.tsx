"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { COUNTRY_FLAGS } from "@/types/venue"
import type { VenueWithReviewStats } from "@/types/venue"

function getIcon(priceBand: string, isActive: boolean, isHovered: boolean) {
  const highlight = isActive || isHovered
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${highlight ? "#1c1917" : "#ffffff"};
      color:${highlight ? "#ffffff" : "#1c1917"};
      border:2px solid ${highlight ? "#1c1917" : "#d6d3d1"};
      border-radius:20px;
      padding:4px 10px;
      font-size:12px;
      font-weight:700;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(0,0,0,0.18);
      cursor:pointer;
      font-family:ui-sans-serif,system-ui,sans-serif;
      ${highlight ? "transform:scale(1.12);" : ""}
    ">${priceBand}</div>`,
    iconSize: [52, 28],
    iconAnchor: [26, 14],
    popupAnchor: [0, -20],
  })
}

function MapController({
  activeVenueId,
  venues,
}: {
  activeVenueId: string | null
  venues: VenueWithReviewStats[]
}) {
  const map = useMap()
  useEffect(() => {
    if (!activeVenueId) return
    const venue = venues.find((v) => v.id === activeVenueId)
    if (venue) map.panTo([venue.lat, venue.lng], { animate: true, duration: 0.5 })
  }, [activeVenueId, map, venues])
  return null
}

interface VenueMapProps {
  venues: VenueWithReviewStats[]
  activeVenueId: string | null
  hoveredVenueId: string | null
  onVenueClick: (id: string) => void
}

export default function VenueMap({
  venues,
  activeVenueId,
  hoveredVenueId,
  onVenueClick,
}: VenueMapProps) {
  return (
    <MapContainer
      center={[47, 8]}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController activeVenueId={activeVenueId} venues={venues} />
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={[venue.lat, venue.lng]}
          icon={getIcon(
            venue.price_band,
            venue.id === activeVenueId,
            venue.id === hoveredVenueId
          )}
          eventHandlers={{ click: () => onVenueClick(venue.id) }}
        >
          <Popup closeButton={false} className="venue-map-popup">
            <a href={`/venues/${venue.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={venue.hero_image_url}
                alt={venue.name}
                style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#78716c", margin: "0 0 4px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
                  {COUNTRY_FLAGS[venue.country as keyof typeof COUNTRY_FLAGS]} {venue.region}
                </p>
                <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px", lineHeight: 1.3, fontFamily: "Georgia,serif" }}>
                  {venue.name}
                </p>
                <p style={{ fontSize: 12, color: "#78716c", margin: "0 0 8px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
                  {venue.price_band} · {venue.capacity_min}–{venue.capacity_max} guests
                </p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#b45309", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
                  View venue →
                </span>
              </div>
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
