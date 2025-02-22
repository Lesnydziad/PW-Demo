import { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import exp from "constants";

export class productPage {
  private readonly PRODUCT_TITLE = 'div[class="col-md-6"] h1';
  private readonly PRODUCT_PRICE = 'span[class="current-price-value"]';
  private readonly SIZE_DROPDOWN = 'select[id="group_3"]';
  private readonly QUANTITY_MORE = 'i[class="material-icons touchspin-up"]';
  private readonly QUANTITY_LESS = 'i[class="material-icons touchspin-down"]';
  private readonly QUANTITY_WANTED = 'input[id="quantity_wanted"]';
  private readonly NAME_OF_PRODUCT = 'h1[class="h1"]';
  private readonly PRICE_OF_PRODUCT = "span[class='current-price-value']";
  private readonly ADD_TO_CART_BUTTON =
    'button[data-button-action="add-to-cart"]';
  private readonly QUANTITY_OF_ORDERED_PRODUCTS =
    'span[class="product-quantity"] strong';
  private readonly PRICE_OF_PRODUCTS = 'span[class="subtotal value"]';
  private readonly PRICE_OF_SHIPPING = 'span[class="shipping value"]';
  private readonly PRICE_OF_TOTAL = "(//span[@class='value']) [1]";
  private readonly PROCEED_TO_CHECKOUT_IN_WINDOW =
    'div[class="cart-content-btn"] a';
  private readonly PROCEED_TO_CHECKOUT_MAIN =
    'div[class="card cart-summary"]  a[class="btn btn-primary"]';
  private readonly CONTINUE_SHOPPPING_BUTTON =
    "div[class='cart-content-btn'] button";
  private readonly AMMOUNT_OF_PRODUCTS_IN_CART =
    "span[class='cart-products-count']";

  public async clickMoreQuantity(page, value: number) {
    await allure.step("Add more Quantity", async () => {
      for (let i = 0; i < value; i++) {
        await page.locator(this.QUANTITY_MORE).click();
      }
    });
  }
  public async clickLessQuantity(page, value: number) {
    await allure.step("Substract quantity", async () => {
      for (let i; i < value; i++) {
        await page.locator(this.QUANTITY_LESS).click();
      }
    });
  }
  public async addProductToCart(page) {
    await allure.step("Click add to cart button", async () => {
      await page.locator(this.ADD_TO_CART_BUTTON).click();
    });
  }
  public async verifyQuantityInCart(page, quantity: string) {
    await allure.step(
      "Verify if cart displayed properly quantity",
      async () => {
        let expectedValue = await page
          .locator(this.QUANTITY_OF_ORDERED_PRODUCTS)
          .textContent();
        await expect(expectedValue).toEqual(quantity);
      }
    );
  }
  public async verifyPriceOfChosenProduct(page, value: string) {
    await allure.step(
      "Verify if cart displayed properly price of product",
      async () => {
        let expectedValue = await page
          .locator(this.PRICE_OF_PRODUCTS)
          .textContent();
        await expect(expectedValue).toEqual(value);
      }
    );
  }
  public async verifyPriceOfShipping(page, value: string) {
    await allure.step(
      "Verify if cart displayed properly price of shipping",
      async () => {
        let expectedShipment = await page
          .locator(this.PRICE_OF_SHIPPING)
          .textContent();
        await expect(expectedShipment).toEqual(value);
      }
    );
  }
  public async verifyTotalPrice(page, value: string) {
    await allure.step(
      "Verify if cart displayed properly total price of order",
      async () => {
        let expectedTotalPrice = await page
          .locator(this.PRICE_OF_TOTAL)
          .textContent();
        await expect(expectedTotalPrice).toEqual(value);
      }
    );
  }
  public async clickProceedToCheckout(page) {
    await allure.step(
      "Click Proceed To Checkout button in window",
      async () => {
        await page.locator(this.PROCEED_TO_CHECKOUT_IN_WINDOW).click();
      }
    );
  }
  public async clickProceedToCheckoutMainButton(page) {
    await allure.step("Click Proceed To Checkout button", async () => {
      await page.locator(this.PROCEED_TO_CHECKOUT_MAIN).click();
    });
  }
  public async clickContinueShoppingButton(page) {
    await allure.step("Click Continue Shopping  button", async () => {
      await page.locator(this.CONTINUE_SHOPPPING_BUTTON).click();
    });
  }
  public async getProductName(page) {
    let name = await allure.step("Getting name of product", async () => {
      let productName = await page.locator(this.NAME_OF_PRODUCT).textContent();
      return productName;
    });
    return name;
  }
  public async verifyAmountOfProducts(page, expectedValue: string) {
    await allure.step("checking how many products is in cart", async () => {
      let ammountOnPage = await page
        .locator(this.AMMOUNT_OF_PRODUCTS_IN_CART)
        .textContent();
      await expect(ammountOnPage).toEqual("(" + expectedValue + ")");
    });
  }
  public async clickCartButton(page) {
    await allure.step("Going to cart", async () => {
      await page.locator(this.AMMOUNT_OF_PRODUCTS_IN_CART).click();
    });
  }
  public async getPriceOfProduct(page) {
    let price = await allure.step("Get price of Product", async () => {
      let priceOfProduct = await page.getAttribute(
        this.PRICE_OF_PRODUCT,
        "content"
      );
      return Number(priceOfProduct);
    });
    return price;
  }
}

export const ProductPage = new productPage();
