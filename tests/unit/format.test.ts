import { describe, it, expect } from "vitest"
import {
  formatPrice,
  formatPriceBand,
  formatDate,
  formatRating,
  slugify,
  truncate,
  pluralize,
} from "@/lib/format"

describe("formatPrice", () => {
  it("returns both bounds when min and max given", () => {
    expect(formatPrice(10000, 20000)).toBe("€10,000 – €20,000")
  })
  it("returns from when only min given", () => {
    expect(formatPrice(15000, null)).toBe("From €15,000")
  })
  it("returns up-to when only max given", () => {
    expect(formatPrice(null, 30000)).toBe("Up to €30,000")
  })
  it("returns price on request when both null", () => {
    expect(formatPrice(null, null)).toBe("Price on request")
  })
})

describe("formatPriceBand", () => {
  it("maps $ to Budget-friendly", () => {
    expect(formatPriceBand("$")).toBe("Budget-friendly")
  })
  it("maps $$$$ to Ultra-luxury", () => {
    expect(formatPriceBand("$$$$")).toBe("Ultra-luxury")
  })
})

describe("formatDate", () => {
  it("returns empty string for null", () => {
    expect(formatDate(null)).toBe("")
  })
  it("formats a date string", () => {
    // Use a date with a time component to avoid UTC midnight timezone shifts
    const result = formatDate("2025-06-15T12:00:00.000Z")
    expect(result).toMatch(/June|Jun/)
    expect(result).toMatch(/2025/)
  })
})

describe("formatRating", () => {
  it("returns no-reviews message for null", () => {
    expect(formatRating(null)).toBe("No reviews yet")
  })
  it("returns one decimal place", () => {
    expect(formatRating(4.6)).toBe("4.6")
    expect(formatRating(3)).toBe("3.0")
  })
})

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world")
  })
  it("strips accented characters", () => {
    expect(slugify("Château Élégant")).toBe("chateau-elegant")
  })
  it("collapses multiple non-alphanumeric into single hyphen", () => {
    expect(slugify("a  --  b")).toBe("a-b")
  })
  it("strips leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello")
  })
})

describe("truncate", () => {
  it("returns text unchanged if within limit", () => {
    expect(truncate("hello", 10)).toBe("hello")
  })
  it("truncates with ellipsis when over limit", () => {
    expect(truncate("hello world", 8)).toBe("hello w…")
  })
})

describe("pluralize", () => {
  it("uses singular for count of 1", () => {
    expect(pluralize(1, "venue")).toBe("1 venue")
  })
  it("appends s for count other than 1", () => {
    expect(pluralize(3, "venue")).toBe("3 venues")
  })
  it("uses explicit plural when provided", () => {
    expect(pluralize(2, "ox", "oxen")).toBe("2 oxen")
  })
})
