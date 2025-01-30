import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class loginPage {
  private PAGE_URL: string =
    "https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php";
  private EMAIL: string = "p.s@gmail.com";
  private PASSWORD: string = "123qatest!";
  private EMAIL_INPUT: string = "input[id='field-email']";
  private PASSWORD_INPUT: string = "input[id='field-password']";
  private REGISTER_LINK: string = "a[data-link-action='display-register-form']";
  private SIGN_IN_BUTTON: string = "button[id='submit-login']";
  public async isLoaded(page) {
    await allure.step("Checking if Login Page is loaded", async () => {
      await expect(page).toHaveURL(this.PAGE_URL);
    });
  }
  public async clickRegisterLink(page) {
    await allure.step("click Register link", async () => {
      await page.locator(this.REGISTER_LINK).click();
    });
  }
  public async logIn(page) {
    await allure.step("Log in with testing account",async () => {
        await page.locator(this.EMAIL_INPUT).fill(this.EMAIL);
        await page.locator(this.PASSWORD_INPUT).fill(this.PASSWORD);
        await page.locator(this.SIGN_IN_BUTTON).click();
    })
  }
}
export const LoginPage = new loginPage();
