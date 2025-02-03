import { test } from "@playwright/test";
import { MainPage } from "../../pages/shopPages/mainPage";
import { LoginPage } from "../../pages/shopPages/loginPage";
import { RegistrationPage } from "../../pages/shopPages/registrationPage";
import { allure } from "allure-playwright";
import { ProductPage, productPage } from "../../pages/shopPages/productPage";
import {faker} from '@faker-js/faker';


test("E2E test", async ({ page }) => {
  await MainPage.loadPage(page);
  await MainPage.clickSignInButton(page);
  await LoginPage.isLoaded(page);
  await LoginPage.clickRegisterLink(page);
  await RegistrationPage.isLoaded(page);
  await RegistrationPage.pickSocialTitle(page, 1);
  await RegistrationPage.fillFirstNameInput(page);
  await RegistrationPage.fillLastNameInput(page);
  await RegistrationPage.fillBirthdateInput(page);
  await RegistrationPage.fillEmailInput(page);
  await RegistrationPage.fillPasswordInput(page);
  await RegistrationPage.clickOffersCheckbox(page);
  await RegistrationPage.clickNewsletterCheckbox(page);
  await RegistrationPage.clickPolicyCheckbox(page);
  await RegistrationPage.clickSaveButton(page);
  await MainPage.isLoaded(page);
  await MainPage.clickProduct(page, 4);
  await ProductPage.clickMoreQuantity(page, 3);
  await ProductPage.addProductToCart(page);
  await ProductPage.verifyQuantityInCart(page, "4");
  await ProductPage.verifyPriceOfShipping(page, "$7.00 ");
  await ProductPage.verifyPriceOfChosenProduct(page, "$116.00");
  await ProductPage.verifyTotalPrice(page, "$123.00");
});
