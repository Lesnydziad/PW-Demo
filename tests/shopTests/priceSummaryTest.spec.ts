import { test } from "@playwright/test";
import { MainPage } from "../../pages/shopPages/mainPage";
import { Cartpage } from "../../pages/shopPages/cartPage";
import { ProductPage } from "../../pages/shopPages/productPage";

test("Price Summary test", async ({ page }) => {
  await MainPage.loadPage(page);
  await MainPage.clickProduct(page, 4);
  await ProductPage.addProductToCart(page);
  let priceOfFirstProduct = await ProductPage.getPriceOfProduct(page);
  await ProductPage.clickContinueShoppingButton(page);
  await MainPage.loadPage(page);
  await MainPage.clickProduct(page, 3);
  await ProductPage.addProductToCart(page);
  let priceOfSecondProduct = await ProductPage.getPriceOfProduct(page);
  await ProductPage.clickContinueShoppingButton(page);
  await ProductPage.clickCartButton(page);
  await Cartpage.isLoaded(page);
  let priceOfItems = await Cartpage.getItemsPrice(page);
  let priceOfShipping = await Cartpage.getShippingPrice(page);
  let totalPrice = await Cartpage.getTotalPrice(page);
  await Cartpage.verifyTotalPrice(
    priceOfFirstProduct,
    priceOfSecondProduct,
    priceOfItems
  );
  await Cartpage.verifyTotalPrice(priceOfItems, priceOfShipping, totalPrice);
  await Cartpage.clickDeleteProductFromCartButton(page, "1");
  let priceOfItems2 = await Cartpage.getItemsPrice(page);
  let totalPrice2 = await Cartpage.getTotalPrice(page);
  await Cartpage.verifyTotalPrice(priceOfItems2, priceOfShipping, totalPrice2);
});
