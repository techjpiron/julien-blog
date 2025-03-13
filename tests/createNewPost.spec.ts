import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("create a new post", async ({ page }) => {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  await page.goto("/");

  await page.getByRole("link", { name: /new post/i }).click();
  await expect(page).toHaveURL("/posts/new");

  await page.getByLabel(/title/i).fill(title);
  await page.getByLabel(/content/i).fill(body);
  await page.getByRole("button", { name: /save/i }).click();

  await expect(page).toHaveURL(/\/posts\/\d+\/?$/);
  await expect(page.getByRole("heading")).toContainText(title);
  await expect(page.getByText(body)).toBeVisible();
});
