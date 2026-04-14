import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, Then, When } = createBdd();

// getByRole letar efter en knapp-tagg
// getByLabel letar efter ett fält som är kopplat till <label>
// getByPlaceholder letar efter samma placeholder som du skriver in i paranteserna


Given('att jag öppnar startsidan', async ({ page }) => {
    await page.goto('/');
});

Given('att jag öppnar {string} i webbläsaren', async ({ page }, path) => {
    await page.goto(path);
});

Then('ska jag se en rubrik på nivå {int} på sidan', async ({ page }, level) => {
    const heading = page.locator(`h${level}`);
    await expect(heading).toBeVisible();
});

Then('ska jag se texten {string}', async ({ page }, text) => {
    await expect(page.locator('body')).toContainText(text);
});

// -----------------------------------------------------------------

// TESTING FÖR INAKTIVERAD/AKTIVERAD KNAPP
Then('ska knappen {string} vara inaktiverad', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText });
    await expect(button).toBeDisabled();
});
When('jag skriver in {string} i namnfältet', async ({ page }, name) => {
    await page.getByPlaceholder('Skriv in ditt namn...').fill(name);
});
Then('ska knappen {string} vara aktiverad', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText });
    await expect(button).toBeEnabled();
});
