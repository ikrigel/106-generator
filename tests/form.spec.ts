import { test, expect } from '@playwright/test';

test.describe('MOC 106 Form Generator - Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
  });

  test('should load the form page', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1')).toContainText('MOC 106 Form');

    // Check for form description
    await expect(page.locator('p')).toContainText('Fill in the form fields and download your customized PDF');
  });

  test('should have form action buttons', async ({ page }) => {
    // Check for Use Defaults button
    await expect(page.locator('button')).toContainText('Use Defaults');

    // Check for Clear Form button
    await expect(page.locator('button')).toContainText('Clear Form');

    // Check for Generate PDF button
    await expect(page.locator('button')).toContainText('Generate & Download PDF');
  });

  test('should display form fields', async ({ page }) => {
    // Check for some expected fields
    await expect(page.locator('label')).toContainText('Full Name');
    await expect(page.locator('label')).toContainText('Email Address');
    await expect(page.locator('label')).toContainText('Phone Number');
    await expect(page.locator('label')).toContainText('Address');
    await expect(page.locator('label')).toContainText('City');
  });

  test('should fill form with default values when clicking "Use Defaults"', async ({ page }) => {
    // Click the "Use Defaults" button
    await page.click('button:has-text("Use Defaults")');

    // Wait for form to be populated
    await page.waitForTimeout(500);

    // Check if form fields have values
    const fullNameInput = page.locator('input[type="text"]').first();
    const value = await fullNameInput.inputValue();
    expect(value).toBeTruthy(); // Should have a default value
  });

  test('should clear form when clicking "Clear Form"', async ({ page }) => {
    // First fill with defaults
    await page.click('button:has-text("Use Defaults")');
    await page.waitForTimeout(500);

    // Then clear
    await page.click('button:has-text("Clear Form")');
    await page.waitForTimeout(500);

    // Check if form is cleared
    const firstInput = page.locator('input[type="text"]').first();
    const value = await firstInput.inputValue();
    expect(value).toBe('');
  });

  test('should show form information', async ({ page }) => {
    // Check for form info section
    await expect(page.locator('h3')).toContainText('Form Information');

    // Check for total fields count
    await expect(page.locator('text=Total Fields:')).toBeVisible();

    // Check for required fields count
    await expect(page.locator('text=Required Fields:')).toBeVisible();
  });

  test('should persist data to localStorage on input change', async ({ page }) => {
    // Fill first field
    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.fill('Test Value');

    // Wait for auto-save
    await page.waitForTimeout(1500);

    // Check localStorage
    const localStorageData = await page.evaluate(() => {
      return localStorage.getItem('moc106_form_data');
    });

    expect(localStorageData).toBeTruthy();
    expect(localStorageData).toContain('Test Value');
  });

  test('should load saved data on page reload', async ({ page }) => {
    // Fill and save form
    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.fill('Persistent Value');
    await page.waitForTimeout(1500);

    // Reload page
    await page.reload();

    // Check if value is restored
    const reloadedInput = page.locator('input[type="text"]').first();
    const value = await reloadedInput.inputValue();
    expect(value).toBe('Persistent Value');
  });

  test('should validate required fields before submission', async ({ page }) => {
    // Try to submit empty form
    await page.click('button:has-text("Generate & Download PDF")');

    // Should show validation error
    await expect(page.locator('text=Please correct')).toBeVisible();
  });

  test('should show saving indicator when auto-saving', async ({ page }) => {
    // Fill a field
    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.fill('Test');

    // Should show saving indicator (might be brief)
    // This is harder to test due to timing, but we can check the element exists
    await expect(page.locator('text=Saving')).toBeVisible({ timeout: 2000 });
  });
});
