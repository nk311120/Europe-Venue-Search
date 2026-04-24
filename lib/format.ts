import type { PriceBand } from "@/types/venue"

export function formatPrice(min: number | null, max: number | null): string {
  if (!min && !max) return "Price on request"
  if (min && max) {
    return `€${min.toLocaleString("en-GB")} – €${max.toLocaleString("en-GB")}`
  }
  if (min) return `From €${min.toLocaleString("en-GB")}`
  return `Up to €${max!.toLocaleString("en-GB")}`
}

export function formatPriceBand(band: PriceBand): string {
  const map: Record<PriceBand, string> = {
    "$": "Budget-friendly",
    "$$": "Mid-range",
    "$$$": "Luxury",
    "$$$$": "Ultra-luxury",
  }
  return map[band]
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" })
}

export function formatRating(rating: number | null): string {
  if (rating == null) return "No reviews yet"
  return rating.toFixed(1)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen - 1) + "…"
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural ?? singular + "s"}`
}
