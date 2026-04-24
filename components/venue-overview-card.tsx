"use client"

import { useState } from "react"
import { Check, X, Plane, Users, BedDouble, ChefHat, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InquiryForm } from "@/components/inquiry-form"
import { formatPrice } from "@/lib/format"
import { SEASON_LABELS } from "@/types/venue"
import type { Venue } from "@/types/venue"
import { cn } from "@/lib/utils"

interface VenueOverviewCardProps {
  venue: Venue
}

export function VenueOverviewCard({ venue }: VenueOverviewCardProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-sm">
      {/* Price */}
      <div>
        <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">Venue fee</p>
        <p className="font-serif text-2xl font-semibold text-foreground">
          {formatPrice(venue.estimated_price_eur_min, venue.estimated_price_eur_max)}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Typically includes venue hire. Catering and extras are separate unless noted.
          </p>
        </div>
        <Badge variant="secondary" className="mt-2 font-sans">{venue.price_band}</Badge>
      </div>

      <hr className="border-border" />

      {/* Details grid */}
      <div className="space-y-3">
        <DetailRow icon={<Users className="h-4 w-4" />} label="Guests">
          {venue.capacity_min}–{venue.capacity_max}
        </DetailRow>

        <DetailRow icon={<BedDouble className="h-4 w-4" />} label="Accommodation">
          {venue.onsite_accommodation ? (
            <span className="flex items-center gap-1 text-green-600">
              <Check className="h-3.5 w-3.5" />
              {venue.onsite_beds ? `Yes · ${venue.onsite_beds} beds` : "Yes"}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground">
              <X className="h-3.5 w-3.5" />
              Not on site
            </span>
          )}
        </DetailRow>

        <DetailRow icon={<ChefHat className="h-4 w-4" />} label="Catering">
          <BoolPill value={venue.in_house_catering} trueLabel="In-house" falseLabel="Bring your own" />
        </DetailRow>

        <DetailRow label="Exclusive use">
          <BoolPill value={venue.exclusive_use} trueLabel="Yes" falseLabel="No" />
        </DetailRow>

        <DetailRow label="Ceremony + reception">
          <BoolPill value={venue.ceremony_and_reception} trueLabel="Yes" falseLabel="No" />
        </DetailRow>

        <DetailRow label="Best seasons">
          <div className="flex flex-wrap gap-1">
            {venue.seasons.map((s) => (
              <Badge key={s} variant="outline" className="text-xs font-sans">
                {SEASON_LABELS[s]}
              </Badge>
            ))}
          </div>
        </DetailRow>

        <DetailRow icon={<Plane className="h-4 w-4" />} label="Nearest airport">
          <span>
            {venue.nearest_airport_name} ({venue.nearest_airport_code})
            <span className="text-muted-foreground"> · {venue.airport_drive_minutes} min drive</span>
          </span>
        </DetailRow>
      </div>

      <hr className="border-border" />

      {/* CTA */}
      <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" size="lg">Request information</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Inquire about {venue.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <InquiryForm
              venueId={venue.id}
              venueName={venue.name}
              onSuccess={() => setInquiryOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      {icon ? (
        <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
      ) : (
        <span className="w-4 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm font-medium text-foreground mt-0.5">{children}</div>
      </div>
    </div>
  )
}

function BoolPill({ value, trueLabel, falseLabel }: { value: boolean; trueLabel: string; falseLabel: string }) {
  return value ? (
    <span className="flex items-center gap-1 text-green-600">
      <Check className="h-3.5 w-3.5" />
      {trueLabel}
    </span>
  ) : (
    <span className="flex items-center gap-1 text-muted-foreground">
      <X className="h-3.5 w-3.5" />
      {falseLabel}
    </span>
  )
}
