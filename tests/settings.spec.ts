import { test, expect } from '@playwright/test';

test.describe('MOC 106 Form Generator - Settings Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('should load settings page', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Settings');

    // Check for description
    await expect(page.locator('p')).toContainText('Customize your preferences');
  });

  test('should have form settings section', async ({ page }) => {
    // Check for Form Settings heading
    await expect(page.locator('h2')).toContainText('Form Settings');

    // Check for Auto-save toggle
    await expect(page.locator('label')).toContainText('Auto-save Form Progress');
  });

  test('should toggle auto-save setting', async ({ page }) => {
    // Find and click the auto-save checkbox
    const autoSaveCheckbox = page.locator('input[type="checkbox"]').first();
    const isChecked = await autoSaveCheckbox.isChecked();

    await autoSaveCheckbox.click();

    // Verify checkbox state changed
    const newChecked = await autoSaveCheckbox.isChecked();
    expect(newChecked).toBe(!isChecked);

    // Check for success message
    await expect(page.locator('text=Auto-save setting updated')).toBeVisible();
  });

  test('should change auto-save interval', async ({ page }) => {
    // First ensure auto-save is enabled
    const autoSaveCheckbox = page.locator('input[type="checkbox"]').first();
    const isChecked = await autoSaveCheckbox.isChecked();
    if (!isChecked) {
      await autoSaveCheckbox.click();
      await page.waitForTimeout(500);
    }

    // Find interval input (should be visible after enabling auto-save)
    const intervalInputs = page.locator('input[type="number"]');
    await intervalInputs.first().fill('10');

    // Check for update message
    await expect(page.locator('text=Auto-save interval updated')).toBeVisible();
  });

  test('should have PDF settings section', async ({ page }) => {
    // Check for PDF Settings heading
    await expect(page.locator('h2')).toContainText('PDF Settings');

    // Check for filename pattern input
    await expect(page.locator('label')).toContainText('PDF Filename Pattern');
  });

  test('should update PDF filename pattern', async ({ page }) => {
    // Find and update filename input
    const filenameInputs = page.locator('input[type="text"]');
    const filenameInput = filenameInputs.nth(0); // First text input
    await filenameInput.fill('My_Form_{timestamp}');

    // Should automatically save (if form uses onChange)
    await page.waitForTimeout(500);

    // Verify the value was updated
    const value = await filenameInput.inputValue();
    expect(value).toBe('My_Form_{timestamp}');
  });

  test('should toggle timestamp inclusion', async ({ page }) => {
    // Find all checkboxes and identify timestamp one
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    if (count > 1) {
      const timestampCheckbox = checkboxes.nth(1);
      const isChecked = await timestampCheckbox.isChecked();
      await timestampCheckbox.click();

      const newChecked = await timestampCheckbox.isChecked();
      expect(newChecked).toBe(!isChecked);

      // Check for success message
      await expect(page.locator('text=PDF filename setting updated')).toBeVisible();
    }
  });

  test('should have logging settings section', async ({ page }) => {
    // Check for Logging Settings heading
    await expect(page.locator('h2')).toContainText('Logging Settings');

    // Check for Enable Logging toggle
    await expect(page.locator('label')).toContainText('Enable Logging');
  });

  test('should have data management buttons', async ({ page }) => {
    // Check for data management section
    await expect(page.locator('h2')).toContainText('Data Management');

    // Check for all data management buttons
    await expect(page.locator('button')).toContainText('Export Settings');
    await expect(page.locator('button')).toContainText('Import Settings');
    await expect(page.locator('button')).toContainText('Reset Settings');
    await expect(page.locator('button')).toContainText('Clear Form Data');
  });

  test('should clear form data with confirmation', async ({ page }) => {
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('clear all saved form data');
      dialog.accept();
    });

    // Click Clear Form Data button
    await page.click('button:has-text("Clear Form Data")');

    // Check for success message
    await expect(page.locator('text=Form data cleared successfully')).toBeVisible();
  });

  test('should cancel clear form data if user declines', async ({ page }) => {
    page.on('dialog', dialog => {
      dialog.dismiss();
    });

    // Click Clear Form Data button
    await page.click('button:has-text("Clear Form Data")');

    // No success message should appear
    await expect(page.locator('text=Form data cleared successfully')).not.toBeVisible();
  });

  test('should show settings information', async ({ page }) => {
    // Check for settings info section
    await expect(page.locator('h3')).toContainText('Settings Information');

    // Check for info items
    await expect(page.locator('text=Created:')).toBeVisible();
    await expect(page.locator('text=Last Updated:')).toBeVisible();
    await expect(page.locator('text=Version:')).toBeVisible();
  });
});
