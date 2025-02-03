import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class paymentPage {
  private PAGE_URL: string =
    "https://teststore.automationtesting.co.uk/index.php?controller=order";
  PAY_BY_BANK_RADIO_BUTTON = 'input[id="payment-option-1"]';
  TERMS_OF_SERVICE_CHECKBOX =
    'input[id="conditions_to_approve[terms-and-conditions]"]';

  public async isLoaded(page) {
    await allure.step("Check if payment page is loaded", async () => {
      await expect(page).toHaveURL(this.PAGE_URL);
    });
  }
  public async clickPayByBankRaddioButton(page) {
    await allure.step("Choose payment by bank option", async () => {
      await page.locator(this.PAY_BY_BANK_RADIO_BUTTON).click();
    });
  }
  public async clickTermsOfServiceCheckbox(page) {
    await allure.step("Accepting terms of service", async () => {
      await page.locator(this.TERMS_OF_SERVICE_CHECKBOX).click();
    });
  }
}
export const PaymentPage = new paymentPage();
