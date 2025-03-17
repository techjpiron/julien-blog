import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.beforeAll(async ({ request }) => {
  await request.post("/reset");
});

test.describe("pages have titles and meta descriptions", () => {
  test("homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Julien's Blog");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Welcome to Julien's Blog. This is part of his portfolio.",
    );
  });

  test("post page", async ({ page }) => {
    const title = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    // Create new post
    await page.goto("/posts/new");

    await page.getByLabel(/title/i).fill(title);
    await page.getByLabel(/content/i).fill(body);
    await page.getByRole("button", { name: /save/i }).click();

    await page.waitForURL(/\posts\/\d+\/?/);

    await expect(page).toHaveTitle(`${title} | Julien's Blog`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      body,
    );
  });

  test("edit post page", async ({ page }) => {
    await page.goto("/posts/1/edit");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
  });

  test("delete post page", async ({ page }) => {
    await page.goto("/posts/1/delete");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
  });

  test("new post page", async ({ page }) => {
    await page.goto("/posts/new");

    await expect(page).toHaveTitle("New Post | Julien's Blog");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
  });

  test("about page", async ({ page }) => {
    await page.goto("/about");

    await expect(page).toHaveTitle("About | Julien's Blog");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Welcome to Julien's Blog. This is part of his portfolio.",
    );
  });
});
