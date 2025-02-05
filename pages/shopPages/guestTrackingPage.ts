import { allure } from "allure-playwright/dist/helpers";
import { expect } from "playwright/test";

export class guestOrderTracking {
  URL =
    "https://teststore.automationtesting.co.uk/index.php?controller=guest-tracking";
  ORDER_REFEREMCE_INPUT = "input[name='order_reference']";
  EMAIL_INPUT = "div[class=col-md-6] input[type='email']";
  SEND_BUTTON = 'button[type="submit"]';
  public async isLoaded(page) {
    await allure.step("Check if page is loaded", async () => {
      await expect(page).toHaveURL(this.URL);
    });
  }
  public async fillOrderReferenceInput(page, orderReferenceNumber: string) {
    await allure.step("Filling Order Reference Input", async () => {
      await page.locator(this.ORDER_REFEREMCE_INPUT).fill(orderReferenceNumber);
    });
  }
  public async fillEmailInput(page, email: string) {
    await allure.step("Filling Order Reference Input", async () => {
      await page.locator(this.EMAIL_INPUT).fill(email);
    });
  }
  public async clickSendButton(page) {
    await allure.step("Click Send button", async () => {
      await page.locator(this.SEND_BUTTON).click();
    });
  }
}
export const GuestOrderTracking = new guestOrderTracking();
