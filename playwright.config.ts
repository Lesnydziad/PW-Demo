import { defineConfig, devices } from "@playwright/test";
import { TestOptions } from "./test-options";
export default defineConfig<TestOptions>({
  testDir: "./tests/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: "allure-playwright",

  use: {
    trace: "on-first-retry",
    extraHTTPHeaders: {
      Authorization: `Token ${process.env.ACCES_TOKEN}`,
    },
  },

  projects: [
    { name: "setup", testMatch: "auth.setup.ts" },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },
    {
      name: "Mobile Chrome",
      testMatch: "mainPageTest.spec.ts",
      use: { ...devices["Pixel 5"], headless: false },
    },
  ],
});
