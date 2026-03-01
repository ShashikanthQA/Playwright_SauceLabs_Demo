import { Page } from "@playwright/test";
import { ProductPageLocators } from "../locators/ProductPageLocators";

export class ProductPage {
  constructor(private page: Page) {}
  async logoutPage() {
    await this.page.click(ProductPageLocators.menubutton);
    await this.page.click(ProductPageLocators.logoutlink);
  }
  async aboutPage() {
    await this.page.click(ProductPageLocators.menubutton);
    await this.page.click(ProductPageLocators.aboutlink);
  }
  async validateAllProductsDisplayed() {
    const names = await this.page
      .locator(ProductPageLocators.productName)
      .allTextContents();
    const descriptions = await this.page
      .locator(ProductPageLocators.productDesxription)
      .allTextContents();
    const prices = await this.page
      .locator(ProductPageLocators.productPrice)
      .allTextContents();
    const buttons = await this.page
      .locator(ProductPageLocators.addToCartButton)
      .count();

    if (names.length === 0) throw new Error("No products found on the page");
    if (
      names.length !== descriptions.length ||
      names.length !== prices.length ||
      names.length !== buttons
    )
      throw new Error("mismatch in the number of product details");
  }
  async addFirstProductToCart() {
    await this.page
      .locator(ProductPageLocators.addToCartButton)
      .first()
      .click();
  }
  //
  async addAllProductsToCart() {
    const buttons = this.page.locator(ProductPageLocators.addToCartButton);
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      await buttons.nth(i).click();
    }
  }
  async scrollToElement(locator: string) {
    await this.page.locator(locator).scrollIntoViewIfNeeded();
  }
   async addSpecificProductToCart(productName : string[])
   {
    const addProducts = this.page.locator(ProductPageLocators.productName)
    const count = await addProducts.count();
    for(let i=0; i<count; i++)
    {
      const name = await addProducts.nth(i).textContent();
      if(name && productName.includes(name.trim()))
      {
        await this.page.locator(ProductPageLocators.addToCartButton).nth(i).click();
      }
    }
   }
   async filterByNameAtoZ()
   {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'az')
   }
   async filterByNameZtoA()
   {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'za')
   }
   async filterByPriceLowToHigh()
   {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'lohi')
   }
   async filterByPriceHighToLow()
   {
    await this.page.selectOption(ProductPageLocators.filterDropdown, 'hilo')
   }
   async getProductNames()
   {
    return await this.page.locator(ProductPageLocators.productName).allTextContents();
   }
   async getProductPrices()
   {
    const prices = await this.page.locator(ProductPageLocators.productPrice).allTextContents()
    return prices.map(price => parseFloat(price.replace('$', '')))
   }
}
