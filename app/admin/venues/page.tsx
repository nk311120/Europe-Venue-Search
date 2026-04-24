import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { COUNTRY_FLAGS, COUNTRY_LABELS } from "@/types/venue"

export const metadata: Metadata = { title: "Admin — Venues" }

export default async function AdminVenuesPage() {
  const supabase = await createClient()
  const { data: venues } = await supabase
    .from("venues")
    .select("id, slug, name, country, region, price_band, capacity_min, capacity_max, is_featured")
    .order("country")
    .order("name")

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-6">All venues ({venues?.length ?? 0})</h2>
      <div className="border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {["Venue", "Country", "Capacity", "Price", "Featured"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {venues?.map((venue, i) => (
              <tr key={venue.id} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                <td className="px-4 py-3">
                  <Link href={`/venues/${venue.slug}`} className="font-medium hover:text-accent transition-colors">
                    {venue.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{venue.region}</p>
                </td>
                <td className="px-4 py-3">
                  {COUNTRY_FLAGS[venue.country]} {COUNTRY_LABELS[venue.country]}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {venue.capacity_min}–{venue.capacity_max}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{venue.price_band}</Badge>
                </td>
                <td className="px-4 py-3">
                  {venue.is_featured && <Badge className="bg-accent/20 text-accent border-0">Featured</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
