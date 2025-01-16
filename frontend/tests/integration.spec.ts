import { test, expect } from '@playwright/test';

test.describe('Integration test', () => {
  test('should render page', async ({ page }) => {
    await page.goto('/');
  
    await expect(page).toHaveTitle(/CCUBE/);
    await expect(page.getByText('Document & Identity Check')).toBeVisible();
  });

  test('should interact with the backend', async ({ page }) => {
    await page.route('**/getUserMedia', (route) => {
      route.abort();
    });

    await page.goto('/');
  
    await page.evaluate(() => {
      navigator.mediaDevices.getUserMedia = () => {
        throw new Error('Camera not available');
      };
    });

    await page.fill('#email', 'test@example.com');
    await page.fill('[name="personDetails.firstName"]', 'John');
    await page.fill('[name="personDetails.lastName"]', 'Doe');
    await page.fill('[name="personDetails.dob"]', '1990-01-01');

    await page.click('button[type="submit"]');

    await expect(page.getByText('Verify your identity now')).toBeVisible();
    
    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.getByText('Select document type')).toBeVisible();

    await page.getByText('Passport').click();

    await expect(page.getByText('Provide passport photo page')).toBeVisible();

    await page.getByRole('button', { name: 'or upload an existing photo' }).click();

    await expect(page.getByText('Capture guidance')).toBeVisible();

    const fileInput = page.locator('input[type="file"]');

    const filePath = './public/test.png';
    await fileInput.setInputFiles(filePath);

    await expect(page.getByText('Check image quality')).toBeVisible();

    const confirmButton = page.locator('button[data-complycube-qa="confirm-action-btn"]');

    await confirmButton.waitFor({ timeout: 10000 });

    await confirmButton.click();

    await expect(page.getByText('Take a selfie')).toBeVisible();

    const selfieButton = page.locator('button[data-complycube-qa="selfie-continue-btn"]');

    await selfieButton.click();

    await expect(page.getByText('Allow camera access')).toBeVisible();

    const enableCameraButton = page.locator('button[data-complycube-qa="enable-camera-btn"]');

    await enableCameraButton.click();

    await expect(page.getByText('Allow camera access')).toBeVisible();

    // need to know the sdk logic about tracking camera device

    // then abort it but enable ws connection

    // then mock ws event by using the event below:

    // {
    //   action: "clientSuccess"
    //   captures: [{method: "face", side: null, metadata: {id: "678879cdb758770008367e03", variant: "standard"},…}]
    //   documentId:  "678877441efbef00080184da"
    //   documentType:  "driving_license"
    //   roomId: "SCKV66"
    // }

    // then get back to our logic testing
  });
})


