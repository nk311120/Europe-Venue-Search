"use server"

import { headers } from "next/headers"
import { createElement } from "react"
import { inquirySchema } from "@/lib/schemas"
import { createServiceClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"
import { checkRateLimit } from "@/lib/rate-limit"
import InquiryToVenue from "@/emails/InquiryToVenue"
import InquiryConfirmation from "@/emails/InquiryConfirmation"
import type { InquiryInput } from "@/lib/schemas"

export type SubmitInquiryResult =
  | { success: true; inquiryId: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }

export async function submitInquiry(raw: unknown): Promise<SubmitInquiryResult> {
  // Honeypot check
  const data = raw as Record<string, unknown>
  if (data.honeypot) {
    return { success: false, error: "Submission rejected" }
  }

  // Rate limit by IP
  const headerStore = await headers()
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown"

  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return { success: false, error: "Too many inquiries. Please try again in an hour." }
  }

  // Validate input
  const parsed = inquirySchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return { success: false, error: "Please fix the errors below.", fieldErrors }
  }

  const input: InquiryInput = parsed.data

  // Get authenticated user if present
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch venue for email
  const service = await createServiceClient()
  const { data: venue } = await service
    .from("venues")
    .select("id, name, contact_email")
    .eq("id", input.venueId)
    .single()

  if (!venue) {
    return { success: false, error: "Venue not found." }
  }

  // Insert inquiry via service role (bypasses RLS for guest users)
  const { data: inquiry, error: insertErr } = await service
    .from("inquiries")
    .insert({
      venue_id: input.venueId,
      user_id: user?.id ?? null,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone ?? null,
      preferred_date_from: input.preferredDateFrom ?? null,
      preferred_date_to: input.preferredDateTo ?? null,
      date_flexible: input.dateFlexible,
      guest_count: input.guestCount,
      budget_band: input.budgetBand ?? null,
      message: input.message,
      status: "pending",
    })
    .select("id")
    .single()

  if (insertErr || !inquiry) {
    return { success: false, error: "Failed to save your inquiry. Please try again." }
  }

  // Send emails
  const venueEmail = venue.contact_email ?? process.env.INQUIRY_FALLBACK_EMAIL ?? ""
  const userEmail = input.email

  const [venueResult, userResult] = await Promise.all([
    venueEmail
      ? sendEmail({
          to: venueEmail,
          subject: `New wedding inquiry from ${input.fullName} (${input.guestCount} guests)`,
          react: createElement(InquiryToVenue, {
            venueName: venue.name,
            guestFullName: input.fullName,
            guestEmail: input.email,
            guestPhone: input.phone,
            preferredDateFrom: input.preferredDateFrom,
            preferredDateTo: input.preferredDateTo,
            dateFlexible: input.dateFlexible,
            guestCount: input.guestCount,
            budgetBand: input.budgetBand,
            message: input.message,
          }),
          replyTo: userEmail,
        })
      : Promise.resolve({ success: true }),
    sendEmail({
      to: userEmail,
      subject: `Your inquiry to ${venue.name} is on its way`,
      react: createElement(InquiryConfirmation, {
        venueName: venue.name,
        guestFullName: input.fullName,
        preferredDateFrom: input.preferredDateFrom,
        preferredDateTo: input.preferredDateTo,
        dateFlexible: input.dateFlexible,
        guestCount: input.guestCount,
        message: input.message,
      }),
    }),
  ])

  // Update status based on email outcome
  const emailSuccess = venueResult.success && userResult.success
  await service
    .from("inquiries")
    .update({ status: emailSuccess ? "sent" : "pending" })
    .eq("id", inquiry.id)

  return { success: true, inquiryId: inquiry.id }
}

/** Submit bulk inquiries from the shortlist page */
export async function submitBulkInquiry(
  venueIds: string[],
  raw: unknown
): Promise<SubmitInquiryResult[]> {
  return Promise.all(
    venueIds.map((venueId) =>
      submitInquiry({ ...(raw as object), venueId })
    )
  )
}
