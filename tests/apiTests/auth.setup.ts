import { test as setup } from "@playwright/test";
import user from "C:/Users/pswidzin/Desktop/Playwright_Demo/.auth/user.json";
import fs from "fs";

const authFile = ".auth/user.json";
setup("authentication", async ({ request }) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "XDDD@XD.PL", password: "XD12345" },
      },
    }
  );
  const responseBody = await response.json();
  const accesTokken = responseBody.user.token;
  user.origins[0].localStorage[0].value = accesTokken;
  fs.writeFileSync(authFile, JSON.stringify(user));

  process.env["ACCES_TOKEN"] = accesTokken;
});
