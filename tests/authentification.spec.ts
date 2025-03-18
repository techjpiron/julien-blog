import test, { expect } from "@playwright/test";
import "dotenv/config";
import { env } from "~/env.server";

test("login and logout", async ({ page }) => {
  await page.goto("/");

  // Log in
  await page.getByRole("button", { name: /menu/i }).click();
  await page.getByRole("menuitem", { name: "Sign in" }).click();

  await page.waitForURL("/login");

  await page.getByLabel(/username/i).fill("tapio");
  await page.getByLabel(/password/i).fill(env.USER_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByRole("button", { name: "Signing in..." }),
  ).toBeVisible();

  await page.waitForURL("/");

  await expect(
    page.getByRole("alertdialog").filter({ hasText: /signed in/i }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/tapio/);

  // Log out
  await page.getByRole("button", { name: /menu/i }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();

  await page.waitForURL("/logout");

  await page.getByRole("button", { name: /sign out/i }).click();

  await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(/tapio/);
  await expect(
    page.getByRole("alertdialog").filter({ hasText: /signed out/i }),
  ).toBeVisible();
});
