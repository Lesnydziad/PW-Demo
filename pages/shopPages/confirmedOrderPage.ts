import { allure } from "allure-playwright";

export class confrirmedOrderPage {
  PAGE_HEADER = "h3[class='h1 card-title']";
  ORDER_REFERENCE = "li[id='order-reference-value']";
  ORDER_TRACKING_BUTTON = 'a[title="Order tracking"]';

  public async isLoaded(page) {
    await allure.step("Check if page is loaded", async () => {
      await page.isVisible(this.PAGE_HEADER);
    });
  }
  public async getOrderReferenceNumber(page) {
   let order_reference =  await allure.step("Getting order number", async () => {
      let order = await page.textContent(this.ORDER_REFERENCE);
      const match = order.match(/Order reference:\s*(\w+)/);
      return match ? match[1] : null;;
    });
    return order_reference;
  }

  public async clickOrderTracking(page) {
    await allure.step("Go to Order trakcing section", async () => {
      await page.click(this.ORDER_TRACKING_BUTTON);
    });
  }
}
export const ConfirmedOrderPage = new confrirmedOrderPage();
