import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("delete post", async ({ page }) => {
  let postPageUrl: string;
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  // Create new post
  await page.goto("/posts/new");

  await page.getByLabel(/title/i).fill(title);
  await page.getByLabel(/content/i).fill(body);
  await page.getByRole("button", { name: /save/i }).click();

  await page.waitForURL(/\/posts\/\d+\/?/);
  postPageUrl = page.url();

  // Can cancel
  await page.getByRole("link", { name: /delete/i }).click();
  await expect(page).toHaveURL(/\/posts\/\d+\/delete\/?$/);
  await page.getByRole("link", { name: /cancel/i }).click();
  await page.waitForURL(postPageUrl);
  await expect(page.getByRole("heading", { name: title })).toBeVisible();

  // Delete this post
  await page.getByRole("link", { name: /delete/i }).click();
  await expect(page).toHaveURL(/\/posts\/\d+\/delete\/?$/);
  await page.getByRole("button", { name: /delete/i }).click();

  // Assert that the post deleted
  await expect(page).toHaveURL("/");
  await page.goto(postPageUrl);
  await expect(page.getByText("could not be found")).toBeVisible();
});
