const { $, expect } = require("@wdio/globals");
const { logOut } = require("../../../../utils/loginAndHomepage");
const loginElements = require("../../../../resources/elements/login.json");

describe("SALESPRO-TC-443", () => {
  beforeEach(async () => {
    try {
      // Check if we're already on the login page
      const isLoginPage = await $(loginElements.inputUsername).isExisting();
      if (!isLoginPage) {
        // If not on login page, perform logout
        await logOut();
      }
      // Add a small delay to ensure the login page is fully loaded
      await browser.pause(2000);
    } catch (error) {
      console.error("Setup failed:", error);
      throw error;
    }
  });

  it("Login View - Verify 'eye' button lets a client see their password in clear text or bullets", async () => {
    try {
      // Wait for login page to be displayed
      await $(loginElements.inputUsername).waitForExist({ timeout: 10000 });
      const passwordInput = await $(loginElements.inputPassword);
      await passwordInput.waitForExist({ timeout: 10000 });
      
      // Enter a test password
      const testPassword = "TestPassword123";
      await passwordInput.clearValue();
      await passwordInput.setValue(testPassword);
      
      // Add a small delay to ensure the password is set
      await browser.pause(1000);
      
      // Verify password is initially hidden by checking type
      const initialType = await passwordInput.getAttribute('type');
      expect(initialType).toBe(loginElements.elementTypes.secureTextField);
      
      // Wait for and click the password visibility toggle
      await $(loginElements.passwordVisibilityToggle).waitForExist({ timeout: 5000 });
      await $(loginElements.passwordVisibilityToggle).click();
      
      // Add a small delay to ensure the toggle takes effect
      await browser.pause(1000);
      
      // Verify password is now visible by checking type
      const typeAfterToggle = await passwordInput.getAttribute('type');
      expect(typeAfterToggle).toBe(loginElements.elementTypes.textField);
      
      // Verify the password value is visible
      const visiblePassword = await passwordInput.getValue();
      expect(visiblePassword).toBe(testPassword);
      
      // Click the password visibility toggle again
      await $(loginElements.passwordVisibilityToggle).click();
      
      // Add a small delay to ensure the toggle takes effect
      await browser.pause(1000);
      
      // Verify password is hidden again by checking type
      const typeAfterSecondToggle = await passwordInput.getAttribute('type');
      expect(typeAfterSecondToggle).toBe(loginElements.elementTypes.secureTextField);
      
      // Clean up - clear the password field
      await passwordInput.clearValue();
      
    } catch (error) {
      console.error("Test execution failed:", error);
      throw new Error(`Test case failed: ${error.message}`);
    }
  });
});

after(async () => {
  try {
    // Only attempt logout if we're not already on the login page
    const isLoginPage = await $(loginElements.inputUsername).isExisting();
    if (!isLoginPage) {
      await logOut();
    }
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
});