import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class guestTrackingOrder {
  PAGE_HEADER = "header h1";
  DELIVERY_ADDRESS = 'article[id="delivery-address"] address';
  FIRST_PRODUCT_IN_ORDER = "tr td a";

  public async isLoaded(page) {
    await allure.step("Check if page is loaded", async () => {
      await page.isVisible(this.PAGE_HEADER);
    });
  }
  public async verifyDeliveryAddressData(
    page,
    firstName: string,
    lastName: string
  ) {
    await allure.step("Verifying all data for order", async () => {
      let deliverAdress = await page.textContent(this.DELIVERY_ADDRESS);
      await expect(deliverAdress).toContain(firstName);
      await expect(deliverAdress).toContain(lastName);
    });
  }
  public async verifyNameOfFirstProduct(page, nameOfProduct) {
    await allure.step("Verifying name of first product in Cart", async () => {
      let nameInCart = await page.textContent(this.FIRST_PRODUCT_IN_ORDER);
      await expect(nameInCart).toContain(nameOfProduct);
    });
  }
}
export const GuestTrackingOrder = new guestTrackingOrder();
