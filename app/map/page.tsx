import { createClient } from "@/lib/supabase/server"
import { MapPageClient } from "@/components/map-page-client"
import type { VenueWithReviewStats } from "@/types/venue"

export const metadata = {
  title: "Map",
  description: "Explore European wedding venues on an interactive map.",
}

export default async function MapPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("venues")
    .select("*, reviews(rating)")

  const venues: VenueWithReviewStats[] = (data ?? []).map((v: any) => {
    const ratings = (v.reviews ?? [])
      .map((r: any) => r.rating)
    const avg_rating = ratings.length
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : null
    return { ...v, avg_rating, review_count: ratings.length }
  })

  return <MapPageClient venues={venues} />
}
