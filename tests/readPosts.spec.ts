import { test, expect } from "@playwright/test";
import { seedDb } from "~/mocks/db.server";

test.beforeEach(() => {
  seedDb();
});

test("read posts", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /^sunt aut facere/ }).click();

  await expect(page).toHaveURL("/posts/1");
  await expect(
    page.getByRole("heading", { name: /^sunt aut facere/ }),
  ).toBeVisible();
});

test("go back from post view to homepage", async ({ page }) => {
  await page.goto("/posts/1");

  await page.getByRole("link", { name: /Julien's Blog/ }).click();
  await expect(page).toHaveURL("/");
});
