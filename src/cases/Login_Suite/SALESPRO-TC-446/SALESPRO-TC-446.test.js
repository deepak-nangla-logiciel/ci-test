const { $, expect } = require("@wdio/globals");
const { logOut } = require("../../../../utils/loginAndHomepage");
const loginElements = require("../../../../resources/elements/login.json");
const loginPage = require("../../../../test/pageobjects/loginPage");

describe("SALESPRO-TC-446", () => {
  beforeEach(async () => {
    try {
      // Check if we're already on the login page
      const isLoginPage = await $(loginElements.inputUsername).isExisting();
      if (!isLoginPage) {
        // If not on login page, perform logout
        await logOut();
      }
      // Wait for login page to be fully loaded
      await $(loginElements.inputUsername).waitForExist({ timeout: 10000 });
    } catch (error) {
      console.error("Setup failed:", error);
      throw error;
    }
  });

  it("Login View - Verify pre-populated Username field when relogin", async () => {
    try {
      // Get the username from environment variables
      const username = process.env.USERNAME;
      
      // Login with the username
      await loginPage.login(username, process.env.PASSWORD);
      
      // Logout
      await logOut();

      // Wait for the login page to be displayed
      await $(loginElements.inputUsername).waitForExist({ timeout: 10000 });
      
      // Get the value of the username field
      const usernameFieldValue = await $(loginElements.inputUsername).getValue();
      
      // Verify that the username field is pre-populated with the correct value
      expect(usernameFieldValue).toBe(username);

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