import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class adressOrderPage {
  private PAGE_URL: string =
    "https://teststore.automationtesting.co.uk/index.php?controller=order";
  private static PAGE_TITLE = "test Store";
  ADDRESS_FIELD = 'input[id = "field-address1"]';
  CITY_FIELD = 'input[id = "field-city"]';
  POSTAL_FIELD = 'input[id = "field-postcode"]';
  STATE_FIELD = 'select[id = "field-id_state"]';
  CONTINUE_BUTTON = 'button[name="confirm-addresses"]'

  public async isLoaded(page) {
    await allure.step("Check if page is loaded", async () => {
      await expect(page).toHaveURL(this.PAGE_URL);
    });
  }
  public async fillAddressField(page, address: string) {
    await allure.step("Fill address field", async () => {
      await page.locator(this.ADDRESS_FIELD).fill(address);
    });
  }
  public async fillCityField(page, city: string) {
    await allure.step("Fill city field", async () => {
      await page.locator(this.CITY_FIELD).fill(city);
    });
  }
  public async selectState(page, state: string) {
    await allure.step("Choose state", async () => {
      await page.selectOption(this.STATE_FIELD, { value: state });
    });
  }
  public async fillPostalCodeFiled(page, postalCode: string) {
    await allure.step("Fill Postal code field", async () => {
      await page.locator(this.POSTAL_FIELD).fill(postalCode);
    });
  }
  public async clickContinueButton(page){
    await allure.step("Click continue order", async () => {
        await page.locator(this.CONTINUE_BUTTON).click();
    })
  }
}
export const AdressOrderPage = new adressOrderPage();
