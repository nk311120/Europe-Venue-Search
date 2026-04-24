"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type ToggleShortlistResult =
  | { success: true; action: "added" | "removed" }
  | { success: false; error: string }

export async function toggleShortlist(venueId: string): Promise<ToggleShortlistResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Sign in to save venues to your shortlist." }
  }

  const { data: existing } = await supabase
    .from("shortlists")
    .select("venue_id")
    .eq("user_id", user.id)
    .eq("venue_id", venueId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from("shortlists")
      .delete()
      .eq("user_id", user.id)
      .eq("venue_id", venueId)

    if (error) return { success: false, error: "Failed to remove from shortlist." }

    revalidatePath("/shortlist")
    return { success: true, action: "removed" }
  }

  const { error } = await supabase
    .from("shortlists")
    .insert({ user_id: user.id, venue_id: venueId })

  if (error) return { success: false, error: "Failed to add to shortlist." }

  revalidatePath("/shortlist")
  return { success: true, action: "added" }
}

export async function getShortlistedVenueIds(): Promise<string[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from("shortlists")
    .select("venue_id")
    .eq("user_id", user.id)

  return data?.map((r) => r.venue_id) ?? []
}
