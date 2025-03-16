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

  await expect(page.getByRole("button", { name: /saving.../i })).toBeVisible();

  await expect(page).toHaveURL(/\/posts\/\d+\/?$/);
  await expect(page.getByRole("heading")).toContainText(title);
  await expect(page.getByText(body)).toBeVisible();
});

test("get errors when the form is not valid", async ({ page }) => {
  await page.goto("/posts/new");

  await page.getByRole("button", { name: /save/i }).click();

  await expect(page.getByLabel(/title/i)).toHaveAccessibleDescription(
    "Required",
  );
  await expect(page.getByLabel(/content/i)).toHaveAccessibleDescription(
    "Required",
  );

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
