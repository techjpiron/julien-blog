import { expect, test } from "@playwright/test";

test("visit about page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /about/i }).click();

  await expect(page).toHaveURL("/about");

  await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  await expect(
    page.getByText("Pictures by Jeremy Bishop from Unsplash"),
  ).toBeVisible();
});
