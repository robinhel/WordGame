import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();


// -------- LOBBY TESTING ---------------
Given('I am on the start page', async ({page}) => {
    await page.goto('http://localhost:5173');
})

When('I enter the name {string}', async ({page}, name) => {
    await page.getByPlaceholder('Skriv in ditt namn...').fill(name)
})

When ('I click on {string}', async ({page}, buttonText) => {
    await page.getByRole('button', {name: buttonText}).click();
})

Then('I should be redirected to create-game url', async ({page}) => {
    await expect(page).toHaveURL(/.*localhost:5173\/create-game.*/)
})

Then('I should see {string}', async ({page}, text) => {
    const message = page.getByText(text);
    await expect(message).toBeVisible();
})

Then('I should see the roomcode input field', async ({page}) => {
    const input = page.getByPlaceholder('Ange rumskod...')
    await expect(input).toBeVisible();
})

When('I type {string} into the roomcode field', async ({page}, code) => {
    await page.getByPlaceholder('Ange rumskod...').fill(code)
})

Then('I should be redirected to join-game url', async ({ page }) => {
    await expect(page).toHaveURL(/localhost:5173\/join-game\/.*/);
});
// ---------- INAKTIVERING/AKTIVERING KNAPP TEST ----------

Then('the {string} button should be disabled', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText });
    await expect(button).toBeDisabled();
}) 

When('I type {string} into the name field', async({ page }, name) => {
    await page.getByPlaceholder('Skriv in ditt namn...').fill(name)
})

Then('the {string} button should be enabled', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText })
    await expect(button).toBeEnabled()
});
// ------------- AVSLUTA SPEL TEST ---------------
Given('I am on the {string} page', async ({ page }, pageName) => {
    const testId = "123"
    await page.goto(`http://localhost:5173/game/${testId}`)
    await expect(page).toHaveURL(new RegExp('game'))
 })
 When('I click on the button {string}', async ({ page }, buttonText) => {
     await page.getByRole('button', { name: buttonText }).click();
 })
 
 When('I click {string}', async ({ page }, messageText) => {
     await page.getByRole('button', { name: messageText }).click();
 });
 // Om användaren trycker nej 
 Then('I should still be at the game page', async ({ page }) => {
     await expect(page).toHaveURL(/.*\/game\/.*/)
 })
    // Om användaren trycker ja
 Then('I should be redirected to the start page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/');
})


// getByRole letar efter en knapp-tagg
// getByLabel letar efter ett fält som är kopplat till <label>
// getByPlaceholder letar efter samma placeholder som du skriver in i paranteserna