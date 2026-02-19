import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/env.Config";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { ProductPageLocators } from "../locators/ProductPageLocators";

test.describe("Product Page Validation", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }: { page: any }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
  test("Validate Logout Functionality", async ({ page }) => {
    await productPage.logoutPage();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
  });

  test("Vaidate About Link and Navigate back", async ({ page }) => {
    await productPage.aboutPage();
    await expect(
      page.locator(ProductPageLocators.requestDemoButton),
    ).toBeVisible();
    await expect(
      page.locator(ProductPageLocators.tryitFreeButton),
    ).toBeVisible();
    await page.goBack();
    await expect(page.locator(ProductPageLocators.menubutton)).toBeVisible();
  });

  test("Validate Products Page", async ({ page }) => {
    await productPage.validateAllProductsDisplayed();
    await productPage.addFirstProductToCart();
    await productPage.addAllProductsToCart();
  });
});
// fresh CI trigger
