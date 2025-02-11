import test from "@playwright/test";
import { MainPage } from "../../pages/shopPages/mainPage";
import { CategoryShopPage } from "../../pages/shopPages/categoryShopPage";

test("Filter By options test", async ({ page }) => {
  await MainPage.loadPage(page);
  await MainPage.isLoaded(page);
  await MainPage.clickChosenSection(page, "Art");
  await CategoryShopPage.changeSlider(page, 25);
  await CategoryShopPage.verifyNumberOfArticles(page, 3);
  await CategoryShopPage.clearFilters(page);
  await CategoryShopPage.clickGraphicCornerCheckBox(page);
  await CategoryShopPage.verifyNumberOfArticles(page, 6);
});
