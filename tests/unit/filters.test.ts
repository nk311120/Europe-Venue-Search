import { describe, it, expect } from "vitest"
import {
  parseFiltersFromParams,
  filtersToParams,
  countActiveFilters,
  isCapacityRangeValid,
  priceBandOrder,
} from "@/lib/filters"

describe("parseFiltersFromParams", () => {
  it("returns empty object for empty params", () => {
    expect(parseFiltersFromParams(new URLSearchParams())).toEqual({})
  })

  it("parses single country", () => {
    const p = new URLSearchParams("country=IT")
    expect(parseFiltersFromParams(p).country).toEqual(["IT"])
  })

  it("parses multiple countries", () => {
    const p = new URLSearchParams("country=IT&country=FR")
    expect(parseFiltersFromParams(p).country).toEqual(["IT", "FR"])
  })

  it("parses capacityMin and capacityMax as numbers", () => {
    const p = new URLSearchParams("capacityMin=50&capacityMax=200")
    const f = parseFiltersFromParams(p)
    expect(f.capacityMin).toBe(50)
    expect(f.capacityMax).toBe(200)
  })

  it("parses boolean flags", () => {
    const p = new URLSearchParams("exclusiveUse=true&petFriendly=true")
    const f = parseFiltersFromParams(p)
    expect(f.exclusiveUse).toBe(true)
    expect(f.petFriendly).toBe(true)
  })

  it("does not set boolean flags when false", () => {
    const p = new URLSearchParams("exclusiveUse=false")
    expect(parseFiltersFromParams(p).exclusiveUse).toBeUndefined()
  })

  it("parses minRating as float", () => {
    const p = new URLSearchParams("minRating=4.5")
    expect(parseFiltersFromParams(p).minRating).toBe(4.5)
  })
})

describe("filtersToParams roundtrip", () => {
  it("round-trips countries", () => {
    const original = { country: ["IT", "FR"] as any }
    const params = filtersToParams(original)
    const parsed = parseFiltersFromParams(params)
    expect(parsed.country).toEqual(["IT", "FR"])
  })

  it("round-trips capacity range", () => {
    const original = { capacityMin: 30, capacityMax: 150 }
    const params = filtersToParams(original)
    const parsed = parseFiltersFromParams(params)
    expect(parsed.capacityMin).toBe(30)
    expect(parsed.capacityMax).toBe(150)
  })

  it("round-trips boolean flags", () => {
    const original = { onsiteAccommodation: true, exclusiveUse: true }
    const params = filtersToParams(original)
    const parsed = parseFiltersFromParams(params)
    expect(parsed.onsiteAccommodation).toBe(true)
    expect(parsed.exclusiveUse).toBe(true)
  })
})

describe("countActiveFilters", () => {
  it("returns 0 for empty filters", () => {
    expect(countActiveFilters({})).toBe(0)
  })

  it("counts each active filter group once", () => {
    expect(countActiveFilters({
      country: ["IT"],
      venueType: ["villa", "castle"] as any,
      exclusiveUse: true,
    })).toBe(3)
  })

  it("counts capacity range as one filter even when both set", () => {
    expect(countActiveFilters({ capacityMin: 50, capacityMax: 200 })).toBe(1)
  })

  it("does not count keyword or sort", () => {
    expect(countActiveFilters({ keyword: "tuscany", sort: "price_asc" as any })).toBe(0)
  })
})

describe("isCapacityRangeValid", () => {
  it("accepts valid range", () => {
    expect(isCapacityRangeValid(20, 200)).toBe(true)
  })
  it("rejects min greater than max", () => {
    expect(isCapacityRangeValid(200, 50)).toBe(false)
  })
  it("rejects negative min", () => {
    expect(isCapacityRangeValid(-1, 100)).toBe(false)
  })
  it("rejects max over 1000", () => {
    expect(isCapacityRangeValid(0, 1001)).toBe(false)
  })
})

describe("priceBandOrder", () => {
  it("orders $ < $$ < $$$ < $$$$", () => {
    expect(priceBandOrder("$")).toBeLessThan(priceBandOrder("$$"))
    expect(priceBandOrder("$$")).toBeLessThan(priceBandOrder("$$$"))
    expect(priceBandOrder("$$$")).toBeLessThan(priceBandOrder("$$$$"))
  })
})
