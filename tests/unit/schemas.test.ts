import { describe, it, expect } from "vitest"
import { inquirySchema, reviewSchema, replySchema } from "@/lib/schemas"

const validInquiry = {
  venueId: "123e4567-e89b-12d3-a456-426614174000",
  fullName: "Alice Smith",
  email: "alice@example.com",
  guestCount: 80,
  message: "We are looking for a venue for our summer wedding and would love to know more about availability.",
  consent: true,
  dateFlexible: true,
}

describe("inquirySchema", () => {
  it("accepts a valid inquiry with flexible dates", () => {
    const result = inquirySchema.safeParse(validInquiry)
    expect(result.success).toBe(true)
  })

  it("accepts a valid inquiry with specific dates", () => {
    const result = inquirySchema.safeParse({
      ...validInquiry,
      dateFlexible: false,
      preferredDateFrom: "2026-06-01",
      preferredDateTo: "2026-06-03",
    })
    expect(result.success).toBe(true)
  })

  it("rejects when dates not flexible and no dates given", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, dateFlexible: false })
    expect(result.success).toBe(false)
  })

  it("rejects disposable email", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, email: "test@mailinator.com" })
    expect(result.success).toBe(false)
  })

  it("rejects guest count below minimum", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, guestCount: 5 })
    expect(result.success).toBe(false)
  })

  it("rejects message that is too short", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, message: "Too short" })
    expect(result.success).toBe(false)
  })

  it("rejects when consent is false", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, consent: false })
    expect(result.success).toBe(false)
  })

  it("rejects honeypot when filled", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, honeypot: "spam" })
    expect(result.success).toBe(false)
  })

  it("rejects invalid UUID for venueId", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, venueId: "not-a-uuid" })
    expect(result.success).toBe(false)
  })
})

describe("reviewSchema", () => {
  const validReview = {
    venueId: "123e4567-e89b-12d3-a456-426614174000",
    reviewerName: "Bob Jones",
    rating: 5,
    title: "Absolutely stunning venue",
    body: "We had our wedding here last June and everything was perfect from start to finish.",
  }

  it("accepts a valid review", () => {
    expect(reviewSchema.safeParse(validReview).success).toBe(true)
  })

  it("rejects rating below 1", () => {
    expect(reviewSchema.safeParse({ ...validReview, rating: 0 }).success).toBe(false)
  })

  it("rejects rating above 5", () => {
    expect(reviewSchema.safeParse({ ...validReview, rating: 6 }).success).toBe(false)
  })

  it("rejects body shorter than 20 chars", () => {
    expect(reviewSchema.safeParse({ ...validReview, body: "Too short." }).success).toBe(false)
  })

  it("rejects title shorter than 5 chars", () => {
    expect(reviewSchema.safeParse({ ...validReview, title: "Hi" }).success).toBe(false)
  })
})

describe("replySchema", () => {
  it("accepts valid reply", () => {
    expect(replySchema.safeParse({ venueReply: "Thank you so much for reaching out!" }).success).toBe(true)
  })

  it("rejects reply shorter than 10 chars", () => {
    expect(replySchema.safeParse({ venueReply: "Ok." }).success).toBe(false)
  })
})
