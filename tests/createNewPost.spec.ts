import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";

test("create a new post", async ({ page }) => {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  await page.goto("/");

  await page.getByRole("button", { name: /menu/i }).click();
  await page.getByRole("menuitem", { name: /new post/i }).click();
  await expect(page).toHaveURL("/posts/new");

  await page.getByLabel(/title/i).fill(title);
  await page.getByLabel(/content/i).fill(body);

  await page.getByRole("button", { name: /save/i }).click();

  await expect(page.getByRole("button", { name: /saving.../i })).toBeVisible();

  await page.waitForURL(/\/posts\/\d+\/?$/);

  // Assert that a notification is visible
  await expect(
    page
      .getByRole("alertdialog")
      .filter({ hasText: /your post was successfully created/i }),
  ).toBeVisible();

  // Assert that the post was created
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

test("can cancel from homepage with filter", async ({ page }) => {
  await page.goto("/?q=nihil&p=1");

  await page.getByRole("button", { name: /menu/i }).click();
  await page.getByRole("menuitem", { name: /new/i }).click();

  await page.waitForURL("/posts/new");

  await page.getByRole("link", { name: /cancel/i }).click();

  expect(page).toHaveURL("/?q=nihil&p=1");
});

test("can cancel from post page", async ({ page }) => {
  await page.goto("/posts/1");

  await page.getByRole("button", { name: /menu/i }).click();
  await page.getByRole("menuitem", { name: /new/i }).click();

  await page.waitForURL("/posts/new");

  await page.getByRole("link", { name: /cancel/i }).click();

  expect(page).toHaveURL("/posts/1");
});
