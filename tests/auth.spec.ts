import test, { expect } from "@playwright/test";
import "dotenv/config";
import { env } from "~/env.server";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("authentification", () => {
  test("login and logout", async ({ page }) => {
    await page.goto("/");

    // Log in
    await page.getByRole("button", { name: /menu/i }).click();
    await page.getByRole("menuitem", { name: "Sign in" }).click();

    await page.waitForURL("/login");

    await page.getByLabel(/username/i).fill("tapio");
    await page.getByLabel(/password/i).fill(env.USER_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByRole("button", { name: "Signing in..." }),
    ).toBeVisible();

    await page.waitForURL("/");

    await expect(
      page.getByRole("alertdialog").filter({ hasText: /signed in/i }),
    ).toBeVisible();

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/tapio/);

    // Log out
    await page.getByRole("button", { name: /menu/i }).click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();

    await page.waitForURL("/logout");

    await page.getByRole("button", { name: /sign out/i }).click();
    await expect(
      page.getByRole("button", { name: "Signing out..." }),
    ).toBeVisible();

    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
      /tapio/,
    );
    await expect(
      page.getByRole("alertdialog").filter({ hasText: /signed out/i }),
    ).toBeVisible();
  });

  test("show message and redirect", async ({ page }) => {
    await page.goto(
      "/login?message=You+need+to+sign+in+to+edit+post&redirectTo=/posts/1/edit",
    );

    await expect(
      page.getByText(/You need to sign in to edit post/),
    ).toBeVisible();

    await page.getByLabel(/username/i).fill("tapio");
    await page.getByLabel(/password/i).fill(env.USER_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL("/posts/1/edit");
  });

  test("can close login modal and go back to previous page", async ({
    page,
  }) => {
    await page.goto("/posts/1");

    await page.getByRole("link", { name: /edit/i }).click();

    await page.waitForURL("/login*");

    await page.getByRole("dialog").press("Escape");

    await expect(page).toHaveURL("/posts/1");
  });

  test("can close logout modal and go back to previous page", async ({
    page,
  }) => {
    // Login
    await page.goto("/login");

    await page.getByLabel(/username/i).fill("tapio");
    await page.getByLabel(/password/i).fill(env.USER_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByRole("button", { name: "Signing in..." }),
    ).toBeVisible();

    await page.waitForURL("/");

    // Logout
    await page.goto("/posts/2");

    await page.getByRole("button", { name: /menu/i }).click();
    await page.getByRole("menuitem", { name: /sign out/i }).click();

    await page.waitForURL("/logout");

    await page.getByRole("dialog").press("Escape");

    await expect(page).toHaveURL("/posts/2");
  });
});

test.describe("authorization", () => {
  test("need to be logged in to create post", async ({ page }) => {
    await page.goto("/posts/new");

    await expect(page).toHaveURL(
      "/login?message=You%20need%20to%20be%20signed%20in%20to%20create%20posts.&redirectTo=%2Fposts%2Fnew",
    );
  });

  test("need to be logged in to edit post", async ({ page }) => {
    await page.goto("/posts/1/edit");

    await expect(page).toHaveURL(
      "/login?message=You%20need%20to%20be%20signed%20in%20to%20edit%20this%20post.&redirectTo=%2Fposts%2F1%2Fedit",
    );
  });

  test("need to be logged in to delete post", async ({ page }) => {
    await page.goto("/posts/1/delete");

    await expect(page).toHaveURL(
      "/login?message=You%20need%20to%20be%20signed%20in%20to%20delete%20this%20post.&redirectTo=%2Fposts%2F1%2Fdelete",
    );
  });
});
