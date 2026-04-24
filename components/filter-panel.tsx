"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useTransition, useCallback } from "react"
import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { COUNTRY_LABELS, COUNTRY_FLAGS, VENUE_TYPE_LABELS, SEASON_LABELS, PRICE_BAND_LABELS } from "@/types/venue"
import { filtersToParams, parseFiltersFromParams, countActiveFilters } from "@/lib/filters"
import type { VenueFilters, CountryCode, VenueType, PriceBand, Season } from "@/types/venue"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  regions?: string[]
}

function useFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const filters = parseFiltersFromParams(searchParams)
  const activeCount = countActiveFilters(filters)

  const updateFilters = useCallback(
    (updater: (f: VenueFilters) => VenueFilters) => {
      const updated = updater(filters)
      const params = filtersToParams(updated)
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, router, pathname]
  )

  return { filters, updateFilters, activeCount, isPending }
}

function toggleArray<T>(arr: T[] | undefined, val: T): T[] {
  if (!arr) return [val]
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
}

export function FilterPanel({ regions = [] }: FilterPanelProps) {
  const { filters, updateFilters, activeCount } = useFilters()

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <FilterContent filters={filters} updateFilters={updateFilters} activeCount={activeCount} regions={regions} />
    </aside>
  )
}

export function FilterSheet({ regions = [] }: FilterPanelProps) {
  const { filters, updateFilters, activeCount } = useFilters()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh]">
        <SheetHeader>
          <SheetTitle className="font-serif">Filter venues</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full pb-20 mt-4">
          <FilterContent filters={filters} updateFilters={updateFilters} activeCount={activeCount} regions={regions} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <Button className="w-full">Apply filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface FilterContentProps {
  filters: VenueFilters
  updateFilters: (updater: (f: VenueFilters) => VenueFilters) => void
  activeCount: number
  regions: string[]
}

function FilterContent({ filters, updateFilters, activeCount, regions }: FilterContentProps) {
  return (
    <div className="space-y-6">
      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full gap-2 text-muted-foreground"
          onClick={() => updateFilters(() => ({}))}
        >
          <X className="h-4 w-4" />
          Clear all filters ({activeCount})
        </Button>
      )}

      {/* Country */}
      <Section title="Country">
        <div className="space-y-2">
          {(Object.keys(COUNTRY_LABELS) as CountryCode[]).map((code) => (
            <label key={code} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.country?.includes(code) ?? false}
                onCheckedChange={() =>
                  updateFilters((f) => ({ ...f, country: toggleArray(f.country, code) }))
                }
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {COUNTRY_FLAGS[code]} {COUNTRY_LABELS[code]}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Separator />

      {/* Venue type */}
      <Section title="Venue type">
        <div className="space-y-2">
          {(Object.keys(VENUE_TYPE_LABELS) as VenueType[]).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.venueType?.includes(type) ?? false}
                onCheckedChange={() =>
                  updateFilters((f) => ({ ...f, venueType: toggleArray(f.venueType, type) }))
                }
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {VENUE_TYPE_LABELS[type]}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Separator />

      {/* Price band */}
      <Section title="Price band">
        <div className="space-y-2">
          {(["$", "$$", "$$$", "$$$$"] as PriceBand[]).map((band) => (
            <label key={band} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.priceBand?.includes(band) ?? false}
                onCheckedChange={() =>
                  updateFilters((f) => ({ ...f, priceBand: toggleArray(f.priceBand, band) }))
                }
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                <span className="font-medium">{band}</span> — {PRICE_BAND_LABELS[band]}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Separator />

      {/* Guest capacity */}
      <Section title="Guest capacity">
        <div className="px-1">
          <Slider
            min={20}
            max={300}
            step={10}
            value={[filters.capacityMin ?? 20, filters.capacityMax ?? 300]}
            onValueChange={(v) => {
              const vals = v as number[]
              updateFilters((f) => ({ ...f, capacityMin: vals[0], capacityMax: vals[1] }))
            }}
            className="mb-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{filters.capacityMin ?? 20} guests</span>
            <span>{filters.capacityMax ?? 300}+ guests</span>
          </div>
        </div>
      </Section>

      <Separator />

      {/* Season */}
      <Section title="Best season">
        <div className="space-y-2">
          {(["spring", "summer", "autumn", "winter"] as Season[]).map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.season?.includes(s) ?? false}
                onCheckedChange={() =>
                  updateFilters((f) => ({ ...f, season: toggleArray(f.season, s) }))
                }
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {SEASON_LABELS[s]}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Separator />

      {/* Minimum rating */}
      <Section title="Minimum rating">
        <div className="px-1">
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filters.minRating ?? 0]}
            onValueChange={(v) => {
              const val = (v as number[])[0]
              updateFilters((f) => ({ ...f, minRating: val > 0 ? val : undefined }))
            }}
            className="mb-3"
          />
          <p className="text-xs text-muted-foreground">
            {filters.minRating ? `★ ${filters.minRating}+` : "Any rating"}
          </p>
        </div>
      </Section>

      <Separator />

      {/* Amenities */}
      <Section title="Amenities">
        <div className="space-y-2">
          {([
            ["onsiteAccommodation", "On-site accommodation"] as const,
            ["inHouseCatering", "In-house catering"] as const,
            ["ceremonyAndReception", "Ceremony + reception"] as const,
            ["outdoorCeremony", "Outdoor ceremony"] as const,
            ["indoorBackup", "Indoor backup space"] as const,
            ["exclusiveUse", "Exclusive use"] as const,
            ["petFriendly", "Pet-friendly"] as const,
          ]).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={!!filters[key]}
                onCheckedChange={(checked) =>
                  updateFilters((f) => ({ ...f, [key]: checked ? true : undefined }))
                }
              />
              <span className="text-sm group-hover:text-foreground transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-sans uppercase tracking-widest text-muted-foreground font-medium mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}
