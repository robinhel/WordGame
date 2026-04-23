import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();


// -------- LOBBY TESTING ---------------
Given('I am on the start page', async ({ page }) => {
    await page.goto('/');
})

Given('create game API is mocked for host {string} and room {string}', async ({ page }, hostName, roomCode) => {
    await page.route('**/api/create', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ id: roomCode, url: `/game/${roomCode}` })
        });
    });

    await page.route(`**/api/Join/${roomCode}?name=${hostName}`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({})
        });
    });

    await page.route(`**/api/game/${roomCode}`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: roomCode,
                currentRound: 1,
                players: [{ id: 'p1', name: hostName }]
            })
        });
    });
})

Given('join game API is mocked for host {string} and room {string}', async ({ page }, hostName, roomCode) => {
    await page.route(`**/api/Join/${roomCode}?name=${hostName}`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({})
        });
    });

    await page.route(`**/api/game/${roomCode}`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: roomCode,
                currentRound: 1,
                players: [{ id: 'p1', name: 'Värd' }, { id: 'p2', name: hostName }]
            })
        });
    });
})

When('I enter the name {string}', async ({ page }, name) => {
    await page.getByPlaceholder('Skriv in ditt namn...').fill(name)
})

When('I click on {string}', async ({ page }, buttonText) => {
    await page.getByRole('button', { name: buttonText }).click();
})

Then('I should be redirected to create-game url', async ({ page }) => {
    await expect(page).toHaveURL(/.*localhost:5173\/create-game.*/)
})

Then('I should see {string}', async ({ page }, text) => {
    const message = page.getByText(text);
    await expect(message).toBeVisible();
})

Then('I should see the roomcode input field', async ({ page }) => {
    const input = page.getByPlaceholder('Ange rumskod...')
    await expect(input).toBeVisible();
})

When('I type {string} into the roomcode field', async ({ page }, code) => {
    await page.getByPlaceholder('Ange rumskod...').fill(code)
})

Then('I should be redirected to join-game url', async ({ page }) => {
    await expect(page).toHaveURL(/localhost:5173\/join-game\/.*/);
});
// ---------- INAKTIVERING/AKTIVERING KNAPP TEST -----------

Then('the {string} button should be disabled', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText });
    await expect(button).toBeDisabled();
})

When('I type {string} into the name field', async ({ page }, name) => {
    await page.getByPlaceholder('Skriv in ditt namn...').fill(name)
})

Then('the {string} button should be enabled', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText })
    await expect(button).toBeEnabled()
});
// ------------- AVSLUTA SPEL TEST ---------------
Given('I am on the {string} page', async ({ page }, pageName) => {
    const testId = "123"
    await page.goto(`/game/${testId}`)
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
    await expect(page).toHaveURL(/.*localhost:5173\/$/);
})

Given('I am a guest in the lobby with code {string}', async ({ page }, code) => {
    await page.goto(`http://localhost:5173/join-game/${code}`)
})

Then('the button {string} should not be visible', async ({ page }, buttonText) => {
    const button = page.getByRole('button', { name: buttonText })
    await expect(button).not.toBeVisible()
})

When('the game starts', async ({ page }) => {
    await page.goto('http://localhost:5173/game/ABCDEF')
})

Then('I should be redirected to the {string} page', async ({ page }, destination) => {
    if (destination === 'game') {
        await expect(page).toHaveURL(/.*\/game\/.*/)
        return
    }

    await expect(page).toHaveURL(new RegExp(destination))
})

Given('I am on the game page with code {string}', async ({ page }, code) => {
    await page.route(`**/api/game/${code}`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: code,
                players: [{ name: 'Player 1' }, { name: 'Player 2' }],
                currentRound: 1,
            }),
        })
    })
    await page.goto(`http://localhost:5173/game/${code}`)
})

Then('it should be {string} turn', async ({ page }, player) => {
    await expect(page.locator('.word-history')).toContainText(player)
})

Then('the input for {string} should be disabled', async ({ page }, player) => {
    const select = player === 'Player 2' ? '.play2 input' : '.play1 input'
    await expect(page.locator(select)).toBeDisabled()
})

Then('the input for {string} should be enabled', async ({ page }, player) => {
    const select = player === 'Player 2' ? '.play2 input' : '.play1 input'
    await expect(page.locator(select)).toBeEnabled()
})

When('I type {string} into the {string} input', async ({ page }, word, player) => {
    const select = player === 'Player 1' ? '.play1 input' : '.play2 input'
    await page.locator(select).fill(word)
})

Then('I should see {string} as the last chosen word', async ({ page }, word) => {
    await expect(page.locator('.choosenWord h1')).toHaveText(word)
})

Then('I should see {string} in the history sidebar', async ({ page }, text) => {
    await expect(page.locator('.sidebar')).toContainText(text)
})

Then('I should see the error {string}', async ({ page }, textMessage) => {
    const error = page.getByText(textMessage)
    await expect(error).toBeVisible()
})



// getByRole letar efter en knapp-tagg
// getByLabel letar efter ett fält som är kopplat till <label>
// getByPlaceholder letar efter samma placeholder som du skriver in i paranteserna