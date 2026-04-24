import { z } from "zod"

const DISPOSABLE_EMAIL_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "10minutemail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "dispostable.com",
  "maildrop.cc",
]

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase()
  return domain ? DISPOSABLE_EMAIL_DOMAINS.includes(domain) : false
}

export const inquirySchema = z
  .object({
    venueId: z.string().uuid(),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .refine((e) => !isDisposableEmail(e), "Disposable email addresses are not accepted"),
    phone: z
      .string()
      .optional()
      .refine((v) => !v || /^[\+\d\s\-\(\)]{7,20}$/.test(v), "Please enter a valid phone number"),
    preferredDateFrom: z.string().optional(),
    preferredDateTo: z.string().optional(),
    dateFlexible: z.boolean(),
    guestCount: z
      .number()
      .int()
      .min(10, "Minimum 10 guests")
      .max(400, "Maximum 400 guests"),
    budgetBand: z.enum(["$", "$$", "$$$", "$$$$"]).optional(),
    message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message must be under 2000 characters"),
    consent: z.boolean().refine((v) => v, "You must agree to share your details"),
    honeypot: z.string().max(0, "Bot detected").optional(),
  })
  .refine(
    (d) => d.dateFlexible || (d.preferredDateFrom && d.preferredDateTo),
    { message: "Please select preferred dates or check 'Dates are flexible'", path: ["preferredDateFrom"] }
  )

export type InquiryInput = z.infer<typeof inquirySchema>

export const reviewSchema = z.object({
  venueId: z.string().uuid(),
  reviewerName: z.string().min(2, "Name must be at least 2 characters"),
  reviewerLocation: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.number().int().min(1).max(2000).optional(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters").max(120),
  body: z.string().min(20, "Review must be at least 20 characters").max(3000),
})

export type ReviewInput = z.infer<typeof reviewSchema>

export const replySchema = z.object({
  venueReply: z.string().min(10).max(5000),
})

export type ReplyInput = z.infer<typeof replySchema>
