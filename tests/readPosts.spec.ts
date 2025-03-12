import { test, expect } from "@playwright/test";

test("read posts", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /^sunt aut facere/ }).click();

  await expect(page).toHaveURL("/posts/1");

  await expect(
    page.getByRole("heading", { name: /^sunt aut facere/ }),
  ).toBeVisible();
});
