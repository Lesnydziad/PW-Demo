import { expect, Locator, Page } from "@playwright/test";
import { allure } from "allure-playwright";

export class categoryShopPage {
  NUMBER_OF_ARTICLES_ON_PAGE = "article";
  MATT_PAPER_CHECKBOX = "input[id='facet_input_87149_0']";
  GRAPHIC_CORNER_CHECKBOX = "section[data-type='manufacturer'] input";
  SLIDER =
    'div[class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"]';
  CLEAR_FILTER_BUTTON =
    "button[class='btn btn-tertiary js-search-filters-clear-all']";
  public async changeSlider(page: Page, targetPercentage: number) {
    await allure.step("Change slider", async () => {
      const slider = await page.locator(this.SLIDER);
      await slider.scrollIntoViewIfNeeded();

      const sliderBoundingBox = await slider.boundingBox();

      if (!sliderBoundingBox) {
        throw new Error("Unable to locate slider or thumb");
      }

      const startPoint = {
        x: sliderBoundingBox.x + sliderBoundingBox.width / 2,
        y: sliderBoundingBox.y + sliderBoundingBox.height / 2,
      };

      await page.mouse.move(startPoint.x, startPoint.y);
      await page.mouse.click(startPoint.x + targetPercentage, startPoint.y);
    });
  }

  public async verifyNumberOfArticles(page, expectedNUmberOfArticles: number) {
    await allure.step("verify number of articles in shop", async () => {
      await page.waitForTimeout(3000);
      let numberOnSite = await page
        .locator(this.NUMBER_OF_ARTICLES_ON_PAGE)
        .count();
      await expect(numberOnSite).toEqual(expectedNUmberOfArticles);
    });
  }
  public async clearFilters(page) {
    await allure.step("click clear filters button", async () => {
      await page.locator(this.CLEAR_FILTER_BUTTON).click();
    });
  }
  public async clickGraphicCornerCheckBox(page) {
    await allure.step("Click Graphic filters button", async () => {
      await page.locator(this.GRAPHIC_CORNER_CHECKBOX).click();
    });
  }
}
export const CategoryShopPage = new categoryShopPage();
