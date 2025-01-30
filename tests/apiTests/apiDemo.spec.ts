import { expect, request, test } from "@playwright/test";
import tags from "../test-data/tags.json";
import exp from "constants";

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://conduit-api.bondaracademy.com/api/tags",
    async (route) => {
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    }
  );

  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(500);
});

test("has title @siema", async ({ page }) => {
  await page.route(
    "https://conduit-api.bondaracademy.com/api/articles*",
    async (route) => {
      const response = await route.fetch();
      const responeBody = await response.json();
      responeBody.articles[0].title = "This is a test title";
      responeBody.articles[0].description = "This is a desctiption";

      await route.fulfill({
        body: JSON.stringify(responeBody),
      });
    }
  );
  await page.getByText("Global Feed").click();
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await page.waitForTimeout(1000);
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is a test title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "This is a desctiption"
  );
});

test("delete article", async ({ page, request }) => {
  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles",
    {
      data: {
        article: {
          tagList: [],
          title: "This is a test title",
          description: "This is a desctiption",
          body: "this is test body",
        },
      },
    }
  );
  await expect(articleResponse.status()).toEqual(201);
  await page.getByText("Global Feed").click();
  await page.getByText("This is a test title").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();
  await expect(page.locator("app-article-list h1").first()).not.toContainText(
    "This is a test title"
  );
});

test("create article", async ({ page, request }) => {
  await page.getByText("New article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("PLaywright is awesome7");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("about Playwright");
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("we like to use plawyright for automation");
  await page.getByRole("button", { name: "Publish Article" }).click();
  const articleResponse = await page.waitForResponse(
    "https://conduit-api.bondaracademy.com/api/articles/"
  );
  const articleResponseBody = await articleResponse.json();
  const slugID = articleResponseBody.article.slug;

  await expect(
    page.locator('div[class="article-page"] h1 ').first()
  ).toContainText("PLaywright is awesome7");
  await page.getByText("Home").click();
  await page.getByText("Global Feed").click();

  await expect(page.locator("app-article-list h1").first()).toContainText(
    "PLaywright is awesome7"
  );
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugID}`
  );
  await expect(deleteArticleResponse.status()).toEqual(204);
});
