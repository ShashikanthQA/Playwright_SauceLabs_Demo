import { test, expect } from "@playwright/test";
import { BASE_URL } from "../utils/env.Config";
import { validUser } from "../test-data/loginData";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { productsToCart } from "../test-data/products";

test.describe("Product Page Validation @regression", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test("Validate Logout Functionality @smoke", async ({ page }) => {
    await productPage.logoutPage();
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Validate About Link and Navigate Back @regression", async ({
    page,
  }) => {
    await productPage.aboutPage();

    await expect(page).toHaveURL(/saucelabs/);

    await page.goBack();

    await expect(page).toHaveURL(/inventory/);
  });

  test("Validate Products Page @smoke", async () => {
    await productPage.validateAllProductsDisplayed();
    await productPage.addFirstProductToCart();
  });

  test("Validate Add All Products To Cart @regression", async () => {
    await productPage.addAllProductsToCart();
  });

  test("Validate add specific products to cart", async ({ page }) => {
    await productPage.addSpecificProductToCart(productsToCart);
  });
  test("Filter by Name A to Z", async () => {
    await productPage.filterByNameAtoZ();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });
  test("Filter by Name Z to A", async () => {
    await productPage.filterByNameZtoA();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });
  test("Filter by Price Low to High", async () => {
    await productPage.filterByPriceLowToHigh();
    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
  test("Filter by Price High to Low", async () => {
    await productPage.filterByPriceHighToLow();
    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
