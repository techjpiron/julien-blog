import { test, expect } from "@playwright/test";

test.beforeEach(async ({ request }) => {
  await request.post("/reset");
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

  await page.getByRole("link", { name: "Julien's Blog" }).click();
  await expect(page).toHaveURL("/");
});

test("get a 404 when looking a post that does not exist", async ({ page }) => {
  await page.goto("/posts/123123123");

  await expect(
    page.getByRole("heading", { name: /is missing/i }),
  ).toBeVisible();
  await page.getByRole("link", { name: /homepage/i }).click();

  await expect(page).toHaveURL("/");
});

test("look at different pages of posts on homepage", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("article")).toHaveCount(12);

  await page.getByRole("link", { name: /next page/i }).click();

  await page.waitForURL("/?p=2");
  await expect(page.locator("article")).toHaveCount(12);
});

test("see image on post page", async ({ page }) => {
  await page.goto("/");

  const firstArticle = page.getByRole("article").first();

  await expect(firstArticle.locator("img")).toBeVisible();

  await firstArticle.click();

  await page.waitForURL("/posts/*");

  await expect(page.locator("img")).toBeVisible();
});

test("filter posts", async ({ page }) => {
  await page.goto("/");

  const searchField = page.getByLabel(/search posts/i);

  await searchField.fill("nihil");
  await searchField.press("Enter");

  expect(page).toHaveURL("/?q=nihil&p=1");

  expect(page.getByRole("article").first()).toHaveText(/nihil/i);
  expect(await page.getByRole("article").all()).toHaveLength(2);
});
