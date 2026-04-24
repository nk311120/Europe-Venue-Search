import type { VenueFilters, VenueSortOption, CountryCode, VenueType, PriceBand, Season } from "@/types/venue"

/**
 * Parse URL search params into strongly-typed VenueFilters.
 * Pure function — no side effects, fully unit-testable.
 */
export function parseFiltersFromParams(params: URLSearchParams): VenueFilters {
  const filters: VenueFilters = {}

  const country = params.getAll("country") as CountryCode[]
  if (country.length) filters.country = country

  const region = params.getAll("region")
  if (region.length) filters.region = region

  const venueType = params.getAll("venueType") as VenueType[]
  if (venueType.length) filters.venueType = venueType

  const priceBand = params.getAll("priceBand") as PriceBand[]
  if (priceBand.length) filters.priceBand = priceBand

  const season = params.getAll("season") as Season[]
  if (season.length) filters.season = season

  const capMin = params.get("capacityMin")
  if (capMin) filters.capacityMin = parseInt(capMin)

  const capMax = params.get("capacityMax")
  if (capMax) filters.capacityMax = parseInt(capMax)

  const minRating = params.get("minRating")
  if (minRating) filters.minRating = parseFloat(minRating)

  const keyword = params.get("keyword")
  if (keyword) filters.keyword = keyword

  const sort = params.get("sort") as VenueSortOption | null
  if (sort) filters.sort = sort

  if (params.get("onsiteAccommodation") === "true") filters.onsiteAccommodation = true
  if (params.get("inHouseCatering") === "true") filters.inHouseCatering = true
  if (params.get("ceremonyAndReception") === "true") filters.ceremonyAndReception = true
  if (params.get("outdoorCeremony") === "true") filters.outdoorCeremony = true
  if (params.get("indoorBackup") === "true") filters.indoorBackup = true
  if (params.get("exclusiveUse") === "true") filters.exclusiveUse = true
  if (params.get("petFriendly") === "true") filters.petFriendly = true

  return filters
}

/**
 * Serialise VenueFilters back to URLSearchParams for shareable URLs.
 */
export function filtersToParams(filters: VenueFilters): URLSearchParams {
  const params = new URLSearchParams()

  filters.country?.forEach((c) => params.append("country", c))
  filters.region?.forEach((r) => params.append("region", r))
  filters.venueType?.forEach((t) => params.append("venueType", t))
  filters.priceBand?.forEach((b) => params.append("priceBand", b))
  filters.season?.forEach((s) => params.append("season", s))

  if (filters.capacityMin != null) params.set("capacityMin", String(filters.capacityMin))
  if (filters.capacityMax != null) params.set("capacityMax", String(filters.capacityMax))
  if (filters.minRating != null) params.set("minRating", String(filters.minRating))
  if (filters.keyword) params.set("keyword", filters.keyword)
  if (filters.sort) params.set("sort", filters.sort)

  if (filters.onsiteAccommodation) params.set("onsiteAccommodation", "true")
  if (filters.inHouseCatering) params.set("inHouseCatering", "true")
  if (filters.ceremonyAndReception) params.set("ceremonyAndReception", "true")
  if (filters.outdoorCeremony) params.set("outdoorCeremony", "true")
  if (filters.indoorBackup) params.set("indoorBackup", "true")
  if (filters.exclusiveUse) params.set("exclusiveUse", "true")
  if (filters.petFriendly) params.set("petFriendly", "true")

  return params
}

/** Count how many filters are active (excluding sort and keyword). */
export function countActiveFilters(filters: VenueFilters): number {
  let count = 0
  if (filters.country?.length) count++
  if (filters.region?.length) count++
  if (filters.venueType?.length) count++
  if (filters.priceBand?.length) count++
  if (filters.season?.length) count++
  if (filters.capacityMin != null || filters.capacityMax != null) count++
  if (filters.minRating != null && filters.minRating > 0) count++
  if (filters.onsiteAccommodation) count++
  if (filters.inHouseCatering) count++
  if (filters.ceremonyAndReception) count++
  if (filters.outdoorCeremony) count++
  if (filters.indoorBackup) count++
  if (filters.exclusiveUse) count++
  if (filters.petFriendly) count++
  return count
}

/** Validate that a capacity range is sensible. */
export function isCapacityRangeValid(min: number, max: number): boolean {
  return min >= 0 && max >= min && max <= 1000
}

/** Returns the price order for sorting. */
export function priceBandOrder(band: PriceBand): number {
  return { "$": 1, "$$": 2, "$$$": 3, "$$$$": 4 }[band]
}
