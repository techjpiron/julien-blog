import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("edit post", async ({ page }) => {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  // Create new post
  await page.goto("/posts/new");

  await page.getByLabel(/title/i).fill(title);
  await page.getByLabel(/content/i).fill(body);
  await page.getByRole("button", { name: /save/i }).click();

  // Edit this post
  await page.waitForURL(/\posts\/\d+\/?/);

  await page.getByRole("link", { name: /edit/i }).click();
  await expect(page).toHaveURL(/\/posts\/\d+\/edit\/?$/);

  expect(page.getByLabel(/title/i)).toHaveValue(title);
  expect(page.getByLabel(/content/i)).toHaveValue(body);

  await page.getByLabel(/title/i).fill(`[EDITED] ${title}`);
  await page.getByLabel(/content/i).fill(`[EDITED] ${body}`);
  await page.getByRole("button", { name: /save/i }).click();

  // Assert that the post was modified
  await expect(page).toHaveURL(/\/posts\/\d+\/?$/);
  await expect(page.getByRole("heading")).toContainText(title);
  await expect(page.getByText(body)).toBeVisible();
});
