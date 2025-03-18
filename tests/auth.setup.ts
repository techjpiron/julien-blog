import { test as setup } from "@playwright/test";
import "dotenv/config";
import { env } from "~/env.server";

setup("authentificate", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/username/i).fill("tapio");
  await page.getByLabel(/password/i).fill(env.USER_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.waitForURL("/");

  await page.context().storageState({ path: "./.playwright-auth/user.json" });
});
