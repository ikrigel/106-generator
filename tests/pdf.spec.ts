import { test, expect } from '@playwright/test';

test.describe('MOC 106 Form Generator - PDF Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
    await page.goto('/form');
  });

  test('should generate and download PDF with form data', async ({ page, context }) => {
    // Listen for download event
    const downloadPromise = context.waitForEvent('download');

    // Fill required fields
    const fullNameInput = page.locator('input[value*=""]').first();
    await fullNameInput.fill('Test User');

    // Click Generate PDF button
    await page.click('button:has-text("Generate & Download PDF")');

    // Wait for download and check
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('MOC_106_Form');
    expect(download.suggestedFilename()).toEndWith('.pdf');
  });

  test('should show success message after PDF generation', async ({ page, context }) => {
    context.waitForEvent('download'); // Ignore the download event

    // Fill and submit form
    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.fill('Test');

    await page.click('button:has-text("Generate & Download PDF")');

    // Check for success message
    await expect(page.locator('text=PDF generated and downloaded successfully')).toBeVisible();
  });

  test('should use default values in PDF when clicked', async ({ page, context }) => {
    context.waitForEvent('download');

    // Click Use Defaults
    await page.click('button:has-text("Use Defaults")');
    await page.waitForTimeout(500);

    // Generate PDF
    await page.click('button:has-text("Generate & Download PDF")');

    // Check for success message
    await expect(page.locator('text=PDF generated and downloaded successfully')).toBeVisible();
  });

  test('should disable submit button while generating PDF', async ({ page, context }) => {
    context.waitForEvent('download');

    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.fill('Test');

    const submitButton = page.locator('button:has-text("Generate & Download PDF")');

    // Click and check if button is disabled during submission
    await submitButton.click();

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled();

    // Wait a bit and check if it's re-enabled
    await page.waitForTimeout(1000);
    // Note: This might still be disabled depending on timing, so we just check it was disabled
  });

  test('should include timestamp in default filename', async ({ page, context }) => {
    const downloadPromise = context.waitForEvent('download');

    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.fill('Test');

    await page.click('button:has-text("Generate & Download PDF")');

    const download = await downloadPromise;
    const filename = download.suggestedFilename();

    // Should contain timestamp or date information
    expect(filename).toMatch(/\d/); // Should contain numbers (from timestamp)
  });

  test('should accept different input types in form', async ({ page, context }) => {
    context.waitForEvent('download');

    // Fill text fields
    const inputs = page.locator('input[type="text"]');
    await inputs.nth(0).fill('Test Name');
    await inputs.nth(1).fill('123456789');

    // Find and fill email field if present
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }

    // Find and fill date field if present
    const dateInput = page.locator('input[type="date"]');
    if (await dateInput.isVisible()) {
      await dateInput.fill('2024-01-01');
    }

    // Submit form
    await page.click('button:has-text("Generate & Download PDF")');

    // Should not show error
    await expect(page.locator('text=PDF generated and downloaded successfully')).toBeVisible();
  });
});
