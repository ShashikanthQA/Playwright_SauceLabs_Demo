import { Page } from "@playwright/test";
import { cartPageLocators } from "../locators/cartPageLocators";

export class cartPage 
{
    constructor(private page: Page){}
    async clickOnContinueShoppingButton()
    {
        await this.page.locator(cartPageLocators.continueShoppingButton).click();
    }
    async getCartPageElements()
    {
        return{
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: this.page.locator(cartPageLocators.continueShoppingButton),
            checkOut: this.page.locator(cartPageLocators.checkOutButton)
        }
    }
    async getCartProducts()
    {
        const allNames = await this.page.locator(cartPageLocators.productName).allTextContents();
            const allDescriptions = await this.page.locator(cartPageLocators.productDesxription).allTextContents();
            const allPrices = await this.page.locator(cartPageLocators.productPrice).allTextContents();
        
            const allCartProducts = allNames.map((_,i)=>
            ({
              name: allNames[i].trim(),
              description : allDescriptions[i].trim(),
              price : allPrices[i].trim()
            }))
            return allCartProducts;
    } 
    async removeFirstProduct()
    {
        await this.page.locator(cartPageLocators.removebutton).click();
    }
    
}