Command lines:

For tests in chrome browser: npx playwright test  --project="Chromium" 

For test in mobile chrome browser: npx playwright test  --project="Mobile Chrome" 

Allure reports: allure serve ..\allure-results

For api tests: npx playwright test --project=chromium --grep "API"
