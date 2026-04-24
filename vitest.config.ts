import { defineConfig } from "vitest/config"
import { resolve } from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["tests/unit/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
})
