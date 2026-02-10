import { test, expect } from '@playwright/test';

test.describe('MOC 106 Form Generator - Navigation Tests', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');

    // Should show form by default or navigation options
    await expect(page).toHaveTitle(/MOC 106/i);
  });

  test('should navigate to form page', async ({ page }) => {
    await page.goto('/');

    // Look for form navigation link or button
    const formLink = page.locator('a, button').filter({ hasText: /Form|form/i });

    if (await formLink.first().isVisible()) {
      await formLink.first().click();
    } else {
      await page.goto('/form');
    }

    // Should show form heading
    await expect(page.locator('h1')).toContainText('MOC 106 Form');
  });

  test('should navigate to settings page', async ({ page }) => {
    await page.goto('/');

    // Look for settings navigation link
    const settingsLink = page.locator('a, button').filter({ hasText: /Settings|settings/i });

    if (await settingsLink.first().isVisible()) {
      await settingsLink.first().click();
    } else {
      await page.goto('/settings');
    }

    // Should show settings heading
    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('should navigate to logs page', async ({ page }) => {
    await page.goto('/');

    // Look for logs navigation link
    const logsLink = page.locator('a, button').filter({ hasText: /Logs|logs/i });

    if (await logsLink.first().isVisible()) {
      await logsLink.first().click();
    } else {
      await page.goto('/logs');
    }

    // Should show logs heading
    await expect(page.locator('h1')).toContainText('Logs');
  });

  test('should navigate to help page', async ({ page }) => {
    await page.goto('/');

    // Look for help navigation link
    const helpLink = page.locator('a, button').filter({ hasText: /Help|help/i });

    if (await helpLink.first().isVisible()) {
      await helpLink.first().click();
    } else {
      await page.goto('/help');
    }

    // Should show help heading
    await expect(page.locator('h1')).toContainText(/Help|help/i);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');

    // Look for about navigation link
    const aboutLink = page.locator('a, button').filter({ hasText: /About|about/i });

    if (await aboutLink.first().isVisible()) {
      await aboutLink.first().click();
    } else {
      await page.goto('/about');
    }

    // Should show about heading or developer info
    const heading = page.locator('h1, h2, h3');
    await expect(heading).toContainText(/About|Developer/i);
  });

  test('should have navigation in header', async ({ page }) => {
    await page.goto('/');

    // Check if header has navigation links
    const header = page.locator('header');
    const navLinks = header.locator('a, button').filter({ hasText: /Form|Settings|Logs|Help|About/i });

    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have footer with information', async ({ page }) => {
    await page.goto('/');

    // Check for footer
    const footer = page.locator('footer');

    if (await footer.isVisible()) {
      // Should have some content in footer
      const footerText = await footer.textContent();
      expect(footerText).toBeTruthy();
    }
  });

  test('should maintain navigation accessibility', async ({ page }) => {
    await page.goto('/form');

    // Test keyboard navigation to settings
    const settingsLink = page.locator('a, button').filter({ hasText: /Settings|settings/i });

    if (await settingsLink.first().isVisible()) {
      // Should be focusable
      await settingsLink.first().focus();
      const focused = await settingsLink.first().evaluate((el) => document.activeElement === el);
      expect(focused).toBe(true);
    }
  });

  test('should show mobile responsive navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Navigation should still be accessible
    const navElements = page.locator('a, button').filter({ hasText: /Form|Settings/i });
    const count = await navElements.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should handle 404 routes gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/nonexistent', { waitUntil: 'load' });

    // Should not crash
    await expect(page).toHaveTitle(/MOC 106/i);

    // Should show content
    const content = page.locator('body');
    await expect(content).toBeVisible();
  });
});
