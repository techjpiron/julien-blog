import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";

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

  await expect(page.getByLabel(/title/i)).toHaveValue(title);
  await expect(page.getByLabel(/content/i)).toHaveValue(body);

  await page.getByLabel(/title/i).fill(`[EDITED] ${title}`);
  await page.getByLabel(/content/i).fill(`[EDITED] ${body}`);
  await page.getByRole("button", { name: /update/i }).click();

  await expect(
    page.getByRole("button", { name: /updating.../i }),
  ).toBeVisible();

  await page.waitForURL(/\/posts\/\d+\/?$/);

  // Assert that a notification is visible
  await expect(
    page
      .getByRole("alertdialog")
      .filter({ hasText: /your post was successfully modified/i }),
  ).toBeVisible();

  // Assert that the post was changed
  await expect(page.getByRole("heading")).toContainText(title);
  await expect(page.getByText(body)).toBeVisible();
});

test("get errors when the form is not valid", async ({ page }) => {
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

  await page.getByLabel(/title/i).fill("T");
  await page.getByLabel(/content/i).fill("Lo");

  await expect(page.getByLabel(/title/i)).toHaveAccessibleDescription(
    "Your title must contain at least 2 characters",
  );
  await expect(page.getByLabel(/content/i)).toHaveAccessibleDescription(
    "Your content must contain at least 5 characters",
  );

  await page.getByLabel(/title/i).fill("The best title");
  await page.getByLabel(/content/i).fill("Lorem ipsum");

  await expect(page.getByLabel(/title/i)).not.toHaveAccessibleDescription(
    "Your title must contain at least 2 characters",
  );
  await expect(page.getByLabel(/content/i)).not.toHaveAccessibleDescription(
    "Your content must contain at least 5 characters",
  );
});
