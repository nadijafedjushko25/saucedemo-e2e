import { test, expect } from "@playwright/test";

test("вхід під standard_user відкриває каталог", async ({ page }) => {
  await page.goto("/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator(".title")).toHaveText("Products");
});

test("неправильний пароль показує помилку", async ({ page }) => {
  await page.goto("/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("wrong_password");
  await page.locator("#login-button").click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username and password do not match"
  );
});