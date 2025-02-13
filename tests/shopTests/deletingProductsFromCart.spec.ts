import { test } from "@playwright/test";
import { MainPage } from "../../pages/shopPages/mainPage";
import { ProductPage } from "../../pages/shopPages/productPage";
import { Cartpage } from "../../pages/shopPages/cartPage";

test("Deleting products from cart", async ({ page }) => {
  await MainPage.loadPage(page);
  await MainPage.clickProduct(page, 4);
  await ProductPage.addProductToCart(page);
  await ProductPage.clickContinueShoppingButton(page);
  await MainPage.loadPage(page);
  await MainPage.clickProduct(page, 3);
  await ProductPage.addProductToCart(page);
  await ProductPage.clickContinueShoppingButton(page);
  await ProductPage.verifyAmountOfProducts(page, "2");
  await ProductPage.clickCartButton(page);
  await Cartpage.isLoaded(page);
  await Cartpage.verifyNameOfProduct(
    page,
    "1",
    "The adventure begins Framed poster"
  );
  await Cartpage.verifyNameOfProduct(
    page,
    "2",
    "The best is yet to come' Framed poster"
  );
  await Cartpage.clickDeleteProductFromCartButton(page, "1");
  await Cartpage.verifyNameOfProduct(
    page,
    "1",
    "The best is yet to come' Framed poster"
  );
  await ProductPage.verifyAmountOfProducts(page, "1");
  await Cartpage.clickDeleteProductFromCartButton(page, "1");
  await ProductPage.verifyAmountOfProducts(page, "0");
});
