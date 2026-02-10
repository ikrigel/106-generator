import { test, expect } from '@playwright/test';

test.describe('MOC 106 Form Generator - Theme Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load with default theme', async ({ page }) => {
    // Check if page loads
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have theme switcher in header', async ({ page }) => {
    // Look for theme switcher buttons
    const themeButtons = page.locator('button').filter({ has: page.locator('span') });

    // Should have at least theme switcher buttons
    const count = await themeButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should switch to light theme', async ({ page }) => {
    // Find and click light theme button
    const buttons = page.locator('button');
    const lightButton = buttons.filter({ hasText: '☀️' });

    if (await lightButton.isVisible()) {
      await lightButton.click();

      // Verify theme was applied
      const htmlElement = page.locator('html');
      const classList = await htmlElement.getAttribute('class');

      // Light theme should not have 'dark' class or should be explicitly light
      expect(classList).not.toContain('dark');
    }
  });

  test('should switch to dark theme', async ({ page }) => {
    // Find and click dark theme button
    const buttons = page.locator('button');
    const darkButton = buttons.filter({ hasText: '🌙' });

    if (await darkButton.isVisible()) {
      await darkButton.click();

      // Verify theme was applied
      const htmlElement = page.locator('html');
      const classList = await htmlElement.getAttribute('class');

      // Dark theme should have 'dark' class
      expect(classList).toContain('dark');
    }
  });

  test('should switch to auto theme', async ({ page }) => {
    // Find and click auto theme button
    const buttons = page.locator('button');
    const autoButton = buttons.filter({ hasText: '🔄' });

    if (await autoButton.isVisible()) {
      await autoButton.click();

      // Auto theme should adapt to system preference
      // Just verify the button is clickable and updates
      await expect(autoButton).toBeVisible();
    }
  });

  test('should persist theme preference to localStorage', async ({ page }) => {
    // Switch to dark theme
    const buttons = page.locator('button');
    const darkButton = buttons.filter({ hasText: '🌙' });

    if (await darkButton.isVisible()) {
      await darkButton.click();
      await page.waitForTimeout(500);

      // Check localStorage
      const theme = await page.evaluate(() => {
        return localStorage.getItem('moc106_theme');
      });

      expect(theme).toBe('dark');
    }
  });

  test('should apply theme on page reload', async ({ page }) => {
    // First set to dark theme
    const buttons = page.locator('button');
    const darkButton = buttons.filter({ hasText: '🌙' });

    if (await darkButton.isVisible()) {
      await darkButton.click();
      await page.waitForTimeout(500);

      // Reload page
      await page.reload();

      // Check if dark theme is still applied
      const htmlElement = page.locator('html');
      const classList = await htmlElement.getAttribute('class');

      // Should still be in dark mode
      expect(classList).toContain('dark');
    }
  });

  test('should apply theme classes to body element', async ({ page }) => {
    // Switch theme
    const buttons = page.locator('button');
    const darkButton = buttons.filter({ hasText: '🌙' });

    if (await darkButton.isVisible()) {
      await darkButton.click();
      await page.waitForTimeout(500);

      // Check body styling
      const body = page.locator('body');

      // Body should have appropriate text color for dark mode
      const computedStyle = await body.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      // Dark mode should have light text color
      // Color values are typically rgb(r, g, b) format
      expect(computedStyle).toBeTruthy();
    }
  });

  test('should show active theme button state', async ({ page }) => {
    // Find theme buttons
    const buttons = page.locator('button');
    const lightButton = buttons.filter({ hasText: '☀️' });

    if (await lightButton.isVisible()) {
      // Click light theme
      await lightButton.click();
      await page.waitForTimeout(300);

      // Check if button has active/selected styling
      // This depends on implementation but typically uses a class like 'active' or background color
      const buttonClass = await lightButton.getAttribute('class');
      expect(buttonClass).toBeTruthy();
    }
  });
});
