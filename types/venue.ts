import type { Database } from "./database"

export type CountryCode = Database["public"]["Enums"]["country_code"]
export type VenueType = Database["public"]["Enums"]["venue_type"]
export type Season = Database["public"]["Enums"]["season"]
export type PriceBand = Database["public"]["Enums"]["price_band"]
export type InquiryStatus = Database["public"]["Enums"]["inquiry_status"]
export type ReviewStatus = Database["public"]["Enums"]["review_status"]

export type Venue = Database["public"]["Tables"]["venues"]["Row"]
export type Review = Database["public"]["Tables"]["reviews"]["Row"]
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"]
export type Shortlist = Database["public"]["Tables"]["shortlists"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type VenueWithReviewStats = Venue & {
  avg_rating: number | null
  review_count: number
}

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  IT: "Italy",
  FR: "France",
  ES: "Spain",
  PT: "Portugal",
  UK: "United Kingdom",
}

export const COUNTRY_FLAGS: Record<CountryCode, string> = {
  IT: "🇮🇹",
  FR: "🇫🇷",
  ES: "🇪🇸",
  PT: "🇵🇹",
  UK: "🇬🇧",
}

export const VENUE_TYPE_LABELS: Record<VenueType, string> = {
  chateau: "Château",
  villa: "Villa",
  castle: "Castle",
  vineyard: "Vineyard",
  masia: "Masia",
  farmhouse: "Farmhouse",
  coastal: "Coastal Estate",
  country_estate: "Country Estate",
  historic_manor: "Historic Manor",
  palazzo: "Palazzo",
}

export const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
}

export const PRICE_BAND_LABELS: Record<PriceBand, string> = {
  "$": "Under €8,000",
  "$$": "€8,000 – €20,000",
  "$$$": "€20,000 – €40,000",
  "$$$$": "€40,000+",
}

export type VenueFilters = {
  country?: CountryCode[]
  region?: string[]
  venueType?: VenueType[]
  priceBand?: PriceBand[]
  season?: Season[]
  capacityMin?: number
  capacityMax?: number
  minRating?: number
  keyword?: string
  onsiteAccommodation?: boolean
  inHouseCatering?: boolean
  ceremonyAndReception?: boolean
  outdoorCeremony?: boolean
  indoorBackup?: boolean
  exclusiveUse?: boolean
  petFriendly?: boolean
  sort?: VenueSortOption
}

export type VenueSortOption =
  | "relevance"
  | "rating_desc"
  | "capacity_asc"
  | "capacity_desc"
  | "price_asc"
  | "price_desc"
  | "name_asc"
