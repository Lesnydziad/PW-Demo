import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class guestTrackingOrder {
  PAGE_HEADER = "header h1";
  DELIVERY_ADDRESS = 'article[id="delivery-address"] address';

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
}
export const GuestTrackingOrder = new guestTrackingOrder();
