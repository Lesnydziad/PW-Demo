import { expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class mainPage {
    private PAGE_URL:string = "https://teststore.automationtesting.co.uk/index.php";
    private static  PAGE_TITLE = "Test Store";
    private SIGN_IN_BUTTON:string = "a[title='Log in to your customer account']";
    private  FOURTH_PRODUCT_ARTICLE = "article[data-id-product=\"4\"]";

    public async isLoaded(page) {
        await allure.step('Check if main page is loaded',async () => {
            await expect(page).toHaveURL(this.PAGE_URL);
        })

    }
    public async loadPage(page){
        await allure.step('Loading Main Page',async () => {
            await page.goto(this.PAGE_URL);
        })
       
    }
    public async clickSignInButton(page) {
        await allure.step('Click Sign In Button',async () => {
        await page.locator("div[class='user-info'] a[title='Log in to your customer account']").click();
        })
    }
  
    public async clickProduct(page, product:number){
        await allure.step('Click choosen product',async () => {
        await page.locator("article[data-id-product='" + product +"']").click();
        })
    }

    public async clickChosenSection(page, section:string){
        await allure.step('Click choosen section',async () => {
       await page.locator("//li[@class=\"category\"]/a[text()[contains(.,'" +section+"')]]").click();
        })
       
    }

}
export const MainPage =
  new mainPage();