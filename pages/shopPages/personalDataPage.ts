import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class personalDataPage {
  private URL =
    "https://teststore.automationtesting.co.uk/index.php?controller=order";
  private readonly FIRST_NAME_INPUT = "input[id='field-firstname']";
  private readonly LAST_NAME_INPUT = 'input[id="field-lastname"]';
  private readonly EMAIL_INPUT = '(//input[@id="field-email"]) [1]';
  private readonly PASSWORD_INPUT = 'input[id="field-password"]';
  private readonly BIRTHDATE_INPUT = 'input[id="field-birthday"]';
  private readonly POLICY_CHECKBOX = 'input[name="psgdpr"]';
  CONNTINUE_BUTTON = 'button[data-link-action="register-new-customer"]';
  makeString(): string {
    let outString: string = "";
    let inOptions: string = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 8; i++) {
      outString += inOptions.charAt(
        Math.floor(Math.random() * inOptions.length)
      );
    }

    return outString;
  }
  public async isLoaded(page) {
    await allure.step("Check if page is loaded", async () => {
      await expect(page).toHaveURL(this.URL);
    });
  }
  public async pickSocialTitle(page, gender: number) {
    let GENDER_RADIO_BUTTON = "input[name='id_gender'][value='" + gender + "']";
    await allure.step("Picking Social title", async () => {
      await page.locator(GENDER_RADIO_BUTTON).click();
    });
  }

  public async fillFirstNameInput(page) {
    const randomName = faker.person.firstName();
    await allure.step("Filling First name input", async () => {
      await page.locator(this.FIRST_NAME_INPUT).fill(randomName);
    });
    return randomName;
  }

  public async fillLastNameInput(page) {
    let randomLastName: string = await faker.person.lastName();
    await allure.step("Filling Last name input", async () => {
      await page.locator(this.LAST_NAME_INPUT).fill(randomLastName);
    });
    return randomLastName;
  }
  public async fillEmailInput(page) {
    let mail = await allure.step("Filling Email input", async () => {
      let randomEmail: string = (await this.makeString()) + "@gmail.com";
      await page.locator(this.EMAIL_INPUT).fill(randomEmail);
      return randomEmail;
    });
    return mail;
  }
  public async clickPolicyCheckbox(page) {
    await allure.step('Click "Policy" Checkbox', async () => {
      await page.locator(this.POLICY_CHECKBOX).check();
    });
  }
  public async clickContinueButton(page) {
    await allure.step('Click "Continue Button', async () => {
      await page.locator(this.CONNTINUE_BUTTON).click();
    });
  }
}
export const PersonalDataPage = new personalDataPage();
