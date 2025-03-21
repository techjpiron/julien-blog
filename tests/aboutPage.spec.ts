import { expect, test } from "@playwright/test";

test("visit about page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /menu/i }).click();
  await page.getByRole("menuitem", { name: /about/i }).click();

  await expect(page).toHaveURL("/about");

  await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Annie Spratt" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Unsplash" })).toBeVisible();
});
