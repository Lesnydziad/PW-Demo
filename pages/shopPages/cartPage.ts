import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class cartPage {
  private PAGE_URL: string =
    "https://teststore.automationtesting.co.uk/index.php?controller=cart&action=show";
  private static PAGE_TITLE = "Cart";
  PROOCED_TO_CHECKOUT = "//*[text()[contains(.,'Proceed to checkout')]]";

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
}
export const Cartpage = new cartPage();
