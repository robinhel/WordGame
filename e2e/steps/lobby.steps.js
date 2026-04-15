import { expect } from '@playwright/test';
import { getByText } from '@testing-library/react';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('I am on the start page', async ({page}) => {
    await page.goto('http://localhost:5173');
})

When('I enter the name {string}', async ({page}, name) => {
        const input = page.locator('.username');
        await input.fill(name);
})

When ('I click on {string}', async ({page}, buttonText) => {
    await page.getByRole('button', {name: buttonText}).click();
})

Then('I should be redirected to create-game url', async ({page}) => {
    await expect(page).toHaveURL('http://localhost:5173/create-game')
})

Then('I should see {string}', async ({page}, welcomeText) => {
    const message = page.getByText(welcomeText);
    await expect(message).toBeVisible();
})