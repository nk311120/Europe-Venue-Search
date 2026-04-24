import { Suspense } from "react"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { parseFiltersFromParams, filtersToParams } from "@/lib/filters"
import { VenueCard, VenueCardSkeleton } from "@/components/venue-card"
import { FilterPanel, FilterSheet } from "@/components/filter-panel"
import { MapView } from "@/components/map-view"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LayoutGrid, Map, Search } from "lucide-react"
import Link from "next/link"
import type { VenueWithReviewStats, VenueSortOption } from "@/types/venue"

export const metadata: Metadata = {
  title: "Browse Venues",
  description: "Search 50 curated European wedding venues. Filter by country, guest count, venue type, price, and more.",
}

const PRICE_BAND_ORDER: Record<string, number> = { "$": 1, "$$": 2, "$$$": 3, "$$$$": 4 }

async function fetchVenues(searchParams: Record<string, string | string[]>): Promise<VenueWithReviewStats[]> {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(searchParams)) {
    if (Array.isArray(v)) v.forEach((val) => params.append(k, val))
    else params.set(k, v)
  }

  const filters = parseFiltersFromParams(params)
  const supabase = await createClient()

  let query = supabase.from("venues").select(`*, reviews(rating, status)`)

  if (filters.country?.length) query = query.in("country", filters.country)
  if (filters.priceBand?.length) query = query.in("price_band", filters.priceBand)
  if (filters.capacityMin != null) query = query.gte("capacity_max", filters.capacityMin)
  if (filters.capacityMax != null) query = query.lte("capacity_min", filters.capacityMax)
  if (filters.onsiteAccommodation) query = query.eq("onsite_accommodation", true)
  if (filters.inHouseCatering) query = query.eq("in_house_catering", true)
  if (filters.ceremonyAndReception) query = query.eq("ceremony_and_reception", true)
  if (filters.outdoorCeremony) query = query.eq("outdoor_ceremony", true)
  if (filters.indoorBackup) query = query.eq("indoor_backup", true)
  if (filters.exclusiveUse) query = query.eq("exclusive_use", true)
  if (filters.petFriendly) query = query.eq("pet_friendly", true)

  if (filters.keyword) {
    query = query.textSearch(
      "name,region,short_description,long_description",
      filters.keyword,
      { type: "plain", config: "simple" }
    )
  }

  const { data } = await query

  let venues: VenueWithReviewStats[] = (data ?? []).map((v: any) => {
    const approvedReviews = (v.reviews ?? []).filter((r: any) => r.status === "approved")
    const ratings = approvedReviews.map((r: any) => r.rating)
    const avg_rating = ratings.length
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : null
    return { ...v, avg_rating, review_count: ratings.length }
  })

  // Filter by venueType (array overlap)
  if (filters.venueType?.length) {
    venues = venues.filter((v) =>
      filters.venueType!.some((t) => v.venue_types.includes(t))
    )
  }

  // Filter by season (array overlap)
  if (filters.season?.length) {
    venues = venues.filter((v) =>
      filters.season!.some((s) => v.seasons.includes(s))
    )
  }

  // Filter by min rating
  if (filters.minRating && filters.minRating > 0) {
    venues = venues.filter((v) => v.avg_rating != null && v.avg_rating >= filters.minRating!)
  }

  // Sort
  const sort: VenueSortOption = filters.sort ?? "relevance"
  if (sort === "rating_desc") {
    venues.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0))
  } else if (sort === "capacity_asc") {
    venues.sort((a, b) => a.capacity_min - b.capacity_min)
  } else if (sort === "capacity_desc") {
    venues.sort((a, b) => b.capacity_max - a.capacity_max)
  } else if (sort === "price_asc") {
    venues.sort((a, b) => PRICE_BAND_ORDER[a.price_band] - PRICE_BAND_ORDER[b.price_band])
  } else if (sort === "price_desc") {
    venues.sort((a, b) => PRICE_BAND_ORDER[b.price_band] - PRICE_BAND_ORDER[a.price_band])
  } else if (sort === "name_asc") {
    venues.sort((a, b) => a.name.localeCompare(b.name))
  }

  return venues
}

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const sp = await searchParams
  const venues = await fetchVenues(sp)

  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(sp)) {
    if (Array.isArray(v)) v.forEach((val) => params.append(k, val))
    else params.set(k, v)
  }

  const view = params.get("view") ?? "grid"
  const keyword = params.get("keyword") ?? ""
  const sort = params.get("sort") ?? "relevance"

  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams(params)
    for (const [k, v] of Object.entries(overrides)) p.set(k, v)
    return `/venues?${p.toString()}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-semibold mb-2">European Wedding Venues</h1>
        <p className="text-muted-foreground">
          {venues.length} venue{venues.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Search */}
        <form className="relative flex-1 min-w-48 max-w-sm" action="/venues" method="get">
          {Array.from(params.entries())
            .filter(([k]) => k !== "keyword")
            .map(([k, v]) => (
              <input key={`${k}=${v}`} type="hidden" name={k} value={v} />
            ))}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            name="keyword"
            defaultValue={keyword}
            placeholder="Search venues…"
            className="pl-9"
          />
        </form>

        {/* Mobile filter trigger */}
        <Suspense>
          <FilterSheet />
        </Suspense>

        {/* Sort */}
        <Select defaultValue={sort}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[
              ["relevance", "Relevance"],
              ["rating_desc", "Highest rated"],
              ["capacity_asc", "Capacity (low–high)"],
              ["capacity_desc", "Capacity (high–low)"],
              ["price_asc", "Price (low–high)"],
              ["price_desc", "Price (high–low)"],
              ["name_asc", "Name (A–Z)"],
            ].map(([val, label]) => (
              <SelectItem key={val} value={val}>
                <Link href={buildUrl({ sort: val })} className="block w-full">
                  {label}
                </Link>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View toggle */}
        <div className="flex gap-1 border border-border rounded-lg p-1 ml-auto">
          <Link href={buildUrl({ view: "grid" })}>
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="sm"
              aria-label="Grid view"
              className="h-8 w-8 p-0"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={buildUrl({ view: "map" })}>
            <Button
              variant={view === "map" ? "secondary" : "ghost"}
              size="sm"
              aria-label="Map view"
              className="h-8 w-8 p-0"
            >
              <Map className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <Suspense>
          <FilterPanel />
        </Suspense>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {venues.length === 0 ? (
            <EmptyState />
          ) : view === "map" ? (
            <MapView venues={venues} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {venues.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl mb-4">🔍</p>
      <h3 className="font-serif text-2xl font-semibold mb-2">No venues match those filters</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Try broadening your search — remove a filter or adjust the guest count range.
      </p>
      <Button asChild variant="outline">
        <Link href="/venues">Clear all filters</Link>
      </Button>
    </div>
  )
}
