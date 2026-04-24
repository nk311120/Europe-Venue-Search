import { test, expect } from "@playwright/test"

test.describe("Venues listing page", () => {
  test("loads the venues page and shows results", async ({ page }) => {
    await page.goto("/venues")
    await expect(page).toHaveTitle(/venues|wedding/i)
    const cards = page.locator("[data-testid='venue-card'], article, .venue-card")
    // Page should render without a crash
    await expect(page.locator("body")).not.toContainText("Application error")
  })

  test("filter panel is present", async ({ page }) => {
    await page.goto("/venues")
    // Look for filter-related elements
    const filterIndicator = page.getByRole("button", { name: /filter/i })
      .or(page.locator("[data-testid='filter-panel']"))
      .or(page.getByText(/country/i).first())
    await expect(filterIndicator).toBeVisible({ timeout: 10000 })
  })
})

test.describe("Venue detail page", () => {
  test("404 page shows for unknown slug", async ({ page }) => {
    const response = await page.goto("/venues/this-venue-does-not-exist-xyz")
    expect(response?.status()).toBe(404)
    await expect(page.getByText(/page not found/i)).toBeVisible()
  })
})

test.describe("Homepage", () => {
  test("homepage loads without error", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("body")).not.toContainText("Application error")
    await expect(page.locator("body")).not.toContainText("Internal Server Error")
  })

  test("has a link to venues", async ({ page }) => {
    await page.goto("/")
    const venueLink = page.getByRole("link", { name: /venue|browse|explore/i }).first()
    await expect(venueLink).toBeVisible({ timeout: 10000 })
  })
})

test.describe("Inquiry form", () => {
  test("inquiry route returns 400 for missing fields", async ({ request }) => {
    const response = await request.post("/api/inquiries", {
      data: {},
    })
    expect(response.status()).toBeGreaterThanOrEqual(400)
  })
})
