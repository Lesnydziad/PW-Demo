import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class cartPage {
  private PAGE_URL: string =
    "https://teststore.automationtesting.co.uk/index.php?controller=cart&action=show";
  private static PAGE_TITLE = "Cart";
  PROOCED_TO_CHECKOUT = "//*[text()[contains(.,'Proceed to checkout')]]";
  TITLE_OF_PRODUCT = "//div[@class='product-line-info']";
  DELETE_PRODUCT_FROM_CART_BUTTON = "//a[@class='remove-from-cart']";
  PRICE_OF_PRODUCT = "div[id='cart-subtotal-products'] span[class='value']";
  PRICE_OF_SHIPPING = "div[id='cart-subtotal-shipping'] span[class='value']";
  TOTAL_PRICE = "div[class='cart-summary-line cart-total'] span[class='value']";

  public async isLoaded(page) {
    await allure.step("Check if cart page is loaded", async () => {
      await expect(page).toHaveURL(this.PAGE_URL);
    });
  }
  public async clickCheckoutButton(page) {
    await allure.step("Proceed to checkout", async () => {
      await page.locator(this.PROOCED_TO_CHECKOUT).click();
    });
  }
  public async verifyNameOfProduct(
    page,
    numberOfProduct: string,
    expectedName: string
  ) {
    await allure.step("Checking name of product in cart", async () => {
      let name = await page
        .locator("(" + this.TITLE_OF_PRODUCT + ") [" + numberOfProduct + "]")
        .textContent();
      await expect(name).toContain(expectedName);
    });
  }
  public async clickDeleteProductFromCartButton(page, numberOfProduct: string) {
    await allure.step("Deleting product from cart", async () => {
      await page
        .locator(
          "(" +
            this.DELETE_PRODUCT_FROM_CART_BUTTON +
            ") [" +
            numberOfProduct +
            "]"
        )
        .click();
      await page.waitForTimeout(2000);
    });
  }
  public async getItemsPrice(page) {
    let price = await allure.step("Getting price of items", async () => {
      let priceOfProduct = await page
        .locator(this.PRICE_OF_PRODUCT)
        .textContent();
      let priceOfProduct1 = Number(priceOfProduct.replace(/[\s$]+/g, ""));
      return priceOfProduct1;
    });
    return price;
  }
  public async getShippingPrice(page) {
    let price = await allure.step("Getting price of shipping", async () => {
      let priceOfShipping = await page
        .locator(this.PRICE_OF_SHIPPING)
        .textContent();
      let priceOfShipping1 = Number(priceOfShipping.replace(/[\s$]+/g, ""));
      return priceOfShipping1;
    });
    return price;
  }
  public async getTotalPrice(page) {
    let price = await allure.step("Getting total price", async () => {
      let totalPrice = await page.locator(this.TOTAL_PRICE).textContent();
      let totalPrice1 = Number(totalPrice.replace(/[\s$]+/g, ""));
      return totalPrice1;
    });
    return price;
  }
  public async verifyTotalPrice(
    priceOfItems: number,
    priceOfShipping: number,
    totalPrice: number
  ) {
    await allure.step("veryfing total price calculations", async () => {
      await expect(totalPrice).toEqual(priceOfItems + priceOfShipping);
    });
  }
}
export const Cartpage = new cartPage();
