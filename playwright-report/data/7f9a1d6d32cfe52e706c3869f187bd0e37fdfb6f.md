# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\features\smoke.feature.spec.js >> Smoke-test >> Startsidan går att öppna
- Location: .features-gen\e2e\features\smoke.feature.spec.js:6:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { createBdd } from 'playwright-bdd';
  3  | 
  4  | const { Given, Then } = createBdd();
  5  | 
  6  | Given('att jag öppnar startsidan', async ({ page }) => {
> 7  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  8  | });
  9  | 
  10 | Given('att jag öppnar {string} i webbläsaren', async ({ page }, path) => {
  11 |     await page.goto(path);
  12 | });
  13 | 
  14 | Then('ska jag se en rubrik på nivå {int} på sidan', async ({ page }, level) => {
  15 |     const heading = page.locator(`h${level}`);
  16 |     await expect(heading).toBeVisible();
  17 | });
  18 | 
  19 | Then('ska jag se texten {string}', async ({ page }, text) => {
  20 |     await expect(page.locator('body')).toContainText(text);
  21 | });
```