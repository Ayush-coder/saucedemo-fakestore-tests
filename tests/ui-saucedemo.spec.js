const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
require('dotenv').config(); // Load environment variables from .env file

test.describe('SauceDemo E-Commerce Verification Pipeline', () => {

  test('TC_UI_001 - Positive Login Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    // Retrieves credentials securely from the environment variables
    await loginPage.login(process.env.SAUCEDEMO_USER, process.env.SAUCEDEMO_PASSWORD);
    
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('TC_UI_002 - Negative Login Validation (Locked Out)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    // Retrieves locked out user credentials securely
    await loginPage.login(process.env.SAUCEDEMO_LOCKED_USER, process.env.SAUCEDEMO_PASSWORD);
    
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('TC_UI_003 - End-to-End E-Commerce Purchase Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SAUCEDEMO_USER, process.env.SAUCEDEMO_PASSWORD);

    // 1. Core Inventory Actions
    await page.locator('.inventory_item button').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 2. Checkout Navigation Sequence
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    // 3. Populate Checkout Forms
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // 4. Final Verification Complete Action
    await page.locator('[data-test="finish"]').click();
    
    const completionHeader = page.locator('.complete-header');
    await expect(completionHeader).toContainText('Thank you for your order!');
  });
});
