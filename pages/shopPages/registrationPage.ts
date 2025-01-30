import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class registrationPage {
  private URL =
    "https://teststore.automationtesting.co.uk/index.php?controller=registration";
  private readonly FIRST_NAME_INPUT = "input[id='field-firstname']";
  private readonly LAST_NAME_INPUT = 'input[id="field-lastname"]';
  private readonly EMAIL_INPUT = 'input[id="field-email"]';
  private readonly PASSWORD_INPUT = 'input[id="field-password"]';
  private readonly BIRTHDATE_INPUT = 'input[id="field-birthday"]';
  private readonly OFFERS_CHECKBOX = 'input[name="optin"]';
  private readonly POLICY_CHECKBOX = 'input[name="psgdpr"]';
  private readonly NEWSLETTER_CHECKBOX = 'input[name="newsletter"]';
  private readonly SAVE_BUTTON = 'button[type="submit"]';
  private readonly LENGTH_PASSWORD_REQUIREMENTS_NOT_ACTIVE =
    'p[class="password-requirements-length"] i[class="material-icons"]';
  public async randomDate(date1, date2) {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || "01-01-1970";
    var date2 = date2 || new Date().toLocaleDateString();
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
      return new Date(randomValueBetween(date2, date1)).toLocaleDateString(
        "en-US"
      );
    } else {
      return new Date(randomValueBetween(date1, date2)).toLocaleDateString(
        "en-US"
      );
    }
  }
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
    await allure.step("Checking loaded page", async () => {
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
  }

  public async fillLastNameInput(page) {
    await allure.step("Filling Last name input", async () => {
      let randomLastName: string = await this.makeString();
      await page.locator(this.LAST_NAME_INPUT).fill(randomLastName);
    });
  }
  public async fillEmailInput(page) {
    await allure.step("Filling Email input", async () => {
      let randomEmail: string = (await this.makeString()) + "@gmail.com";
      await page.locator(this.EMAIL_INPUT).fill(randomEmail);
    });
  }
  public async fillEmailInputManually(page, email: string) {
    await allure.step("Filling Email input manually", async () => {
      await page.locator(this.EMAIL_INPUT).fill(email);
    });
  }
  public async fillPasswordInput(page) {
    await allure.step("Filling Password input", async () => {
      let randomPassword: string = (await this.makeString()) + "!.@1a";
      await page.locator(this.PASSWORD_INPUT).fill(randomPassword);
    });
  }
  public async fillPasswordInputManually(page, password: string) {
    await allure.step("Filling Password input manually", async () => {
      await page.locator(this.PASSWORD_INPUT).fill(password);
    });
  }
  public async fillBirthdateInput(page) {
    await allure.step("Filling Birthdate input", async () => {
      let randomDate: string = await this.randomDate(
        "02/01/1960",
        "01/01/2023"
      );
      await page.locator(this.BIRTHDATE_INPUT).fill(randomDate);
    });
  }
  public async clickOffersCheckbox(page) {
    await allure.step('Click "Offers" Checkbox', async () => {
      await page.locator(this.OFFERS_CHECKBOX).check();
    });
  }
  public async clickPolicyCheckbox(page) {
    await allure.step('Click "Policy" Checkbox', async () => {
      await page.locator(this.POLICY_CHECKBOX).check();
    });
  }
  public async clickNewsletterCheckbox(page) {
    await allure.step('Click "Newsletter" Checkbox', async () => {
      await page.locator(this.NEWSLETTER_CHECKBOX).check();
    });
  }
  public async clickSaveButton(page) {
    await allure.step('Click "Save" Button', async () => {
      await page.locator(this.SAVE_BUTTON).click();
    });
  }
  public async verifyPasswordLengthVerification(page) {
    await allure.step(
      "Verify if wrong password communicate appeard",
      async () => {
        await page
          .locator(this.LENGTH_PASSWORD_REQUIREMENTS_NOT_ACTIVE)
          .toBeVisible();
      }
    );
  }
}
export const RegistrationPage = new registrationPage();
