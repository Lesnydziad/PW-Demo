export class MyAccountPage  {
 
     MY_WISHLISTS_BUTTON = "a[id=\"wishlist-link\"]";
 
    public async clickMyWishlistsButton(page){
        await page.locator(this.MY_WISHLISTS_BUTTON).click();
    }

}
const myAccountPage = new MyAccountPage();