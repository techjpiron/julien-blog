import { defineConfig, devices } from "@playwright/test";

const isCIenv: boolean = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCIenv,
  retries: 2,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: isCIenv ? "http://localhost:3000" : "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  outputDir: "playwright-results",
  webServer: {
    command: isCIenv ? "pnpm build && pnpm start" : "pnpm dev",
    url: isCIenv ? "http://localhost:3000" : "http://localhost:5173",
    reuseExistingServer: isCIenv,
  },
});
