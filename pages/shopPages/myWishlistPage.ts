import { expect } from "@playwright/test";

export class MyWishlistPage {

    MY_WISHLIST_BUTTON = "p[class='wishlist-list-item-title']";
    PRODUCT_ON_WISHLIST = "div[class='wishlist-product-image']";
    REMOVE_BUTTON = "button[class='btn btn-primary']";
    FIRST_PRODUCT_ON_WISHLIST = "//button[@class = 'wishlist-button-add']) [1]";

    public async clickMyWhishlist(page) {
        await page.locator(this.MY_WISHLIST_BUTTON).click();
    }
    public async verifyNumberOfProductsInWishlist(page, count: number) {
       let numberOfProducts =  await page.locator(this.PRODUCT_ON_WISHLIST).size();
       await expect(numberOfProducts).toEqual(count);
    }
    public async removeProductsFromWishList(page, numberOfRemovedProducts: number) {
        for(let i; i<= numberOfRemovedProducts; i++){
            await page.locator(this.FIRST_PRODUCT_ON_WISHLIST).click();
            await page.locator(this.REMOVE_BUTTON).click();
        }
    }
}