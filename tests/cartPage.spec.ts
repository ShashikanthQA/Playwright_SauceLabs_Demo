import { test, expect } from "@playwright/test";
import { BASE_URL } from "../utils/env.Config";
import { validUser } from "../test-data/loginData";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { productsToCart } from "../test-data/products";
import { cartPage as CartPage } from "../pages/CartPage";

test.describe("Cart Page Validation", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });
  test("Validate cart page URL & UI elements", async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    const ui = cartPage.getCartPageElements();
    await expect((await ui).cartTitle).toBeVisible();
    await expect((await ui).shoppingCart).toBeVisible();
    await expect((await ui).checkOut).toBeVisible();
  });
  test("Validate Continue shopping Functionality", async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await cartPage.clickOnContinueShoppingButton();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate First Product in the CartPage", async ({ page }) => {
    const firstProduct = await productPage.getFirstProductDetails();
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts[0]).toEqual(firstProduct);
  });
  test("Validate All Product added to Cart Page", async ({ page }) => {});
  test("Validate Specific Product added to Cart Page", async ({ page }) => {});
  test("Validate Remove Product Functionality", async ({ page }) => {});
});
