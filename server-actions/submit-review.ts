"use server"

import { createElement } from "react"
import { reviewSchema } from "@/lib/schemas"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"
import ReviewPendingConfirmation from "@/emails/ReviewPendingConfirmation"
import type { ReviewInput } from "@/lib/schemas"

export type SubmitReviewResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }

export async function submitReview(raw: unknown): Promise<SubmitReviewResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "You must be signed in to submit a review." }
  }

  const parsed = reviewSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const input: ReviewInput = parsed.data

  // Check for existing review by this user for this venue
  const service = await createServiceClient()
  const { data: existing } = await service
    .from("reviews")
    .select("id")
    .eq("venue_id", input.venueId)
    .eq("reviewer_name", user.user_metadata?.full_name ?? input.reviewerName)
    .maybeSingle()

  if (existing) {
    return { success: false, error: "You have already submitted a review for this venue." }
  }

  // Fetch venue name
  const { data: venue } = await service
    .from("venues")
    .select("name")
    .eq("id", input.venueId)
    .single()

  const { error } = await service.from("reviews").insert({
    venue_id: input.venueId,
    reviewer_name: input.reviewerName,
    reviewer_location: input.reviewerLocation ?? null,
    event_date: input.eventDate ?? null,
    guest_count: input.guestCount ?? null,
    rating: input.rating,
    title: input.title,
    body: input.body,
    status: "pending",
  })

  if (error) {
    return { success: false, error: "Failed to submit review. Please try again." }
  }

  // Send confirmation email
  if (user.email && venue) {
    await sendEmail({
      to: user.email,
      subject: `Thanks for your review of ${venue.name}`,
      react: createElement(ReviewPendingConfirmation, {
        venueName: venue.name,
        reviewerName: input.reviewerName,
      }),
    })
  }

  return { success: true }
}
