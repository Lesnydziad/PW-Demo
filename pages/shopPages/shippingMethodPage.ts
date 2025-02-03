import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class shippingMethodPage {
  private PAGE_URL: string =
    "https://teststore.automationtesting.co.uk/index.php?controller=order";

  COMMENT_FIELD = "textarea[id='delivery_message']";
  CONTINUE_BUTTON = 'button[name="confirmDeliveryOption"]';

  public async isLoaded(page) {
    await allure.step("Check if shipping page is loaded", async () => {
      await expect(page).toHaveURL(this.PAGE_URL);
    });
  }
  public async fillCommentButton(page, comment: string) {
    await allure.step("filling comment field", async () => {
      await page.locator(this.COMMENT_FIELD).fill(comment);
    });
  }
  public async clickContinueButton(page) {
    await allure.step("clicking continue to payment button", async () => {
      await page.locator(this.CONTINUE_BUTTON).click();
    });
  }
}

export const ShippingMethodPage = new shippingMethodPage();
