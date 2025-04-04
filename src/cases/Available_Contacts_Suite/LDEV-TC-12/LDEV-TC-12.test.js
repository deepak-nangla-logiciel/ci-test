const { login, logOut } = require("../../../../utils/loginAndHomepage");
const AvailableContactsPage = require("../../../../test/pageobjects/availableContactsPage");
const loginElements = require("../../../../resources/elements/login.json");

/**
 * Test suite for Available Contacts functionality
 * Verifies that users can view and interact with available contacts
 */
describe("This test suite will verify the Available Contacts functionality.", () => {
  /**
   * Setup before each test
   * Ensures user is logged in before running tests
   */
  beforeEach(async () => {
    try {
      // Check if we're already on the login page
      const isLoginPage = await $(loginElements.inputUsername).isExisting();
      if (!isLoginPage) {
        // If not on login page, perform logout
        await logOut();
      }
      
      // Wait for login page to be fully loaded
      await $(loginElements.inputUsername).waitForExist({
        timeout: 10000,
        timeoutMsg: 'Login page not loaded after timeout'
      });
      
      await login(
        process.env.LEAP_USERNAME,
        process.env.SHARED_USER_SALESPRO_PASSWORD
      );
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(`Test setup failed: ${error.message}`);
    }
  });

  /**
   * Test case to verify viewing available contacts
   * Verifies that:
   * 1. User can navigate to Available Contacts screen
   * 2. Admin Test contact is visible on the screen
   */
  it("Verify that user can view Available Contacts", async () => {
    try {
      // Navigate to Available Contacts
      await AvailableContactsPage.navigateToAvailableContacts();

      // Verify Admin Test contact exists
      const isAdminTestContactDisplayed =
        await AvailableContactsPage.verifyAdminTestContact();
      expect(isAdminTestContactDisplayed).toBe(true);
    } catch (error) {
      console.error("Test execution failed:", error);
      throw new Error(`Test case failed: ${error.message}`);
    }
  });
});

/**
 * Cleanup after all tests
 * Ensures user is logged out after test suite completion
 */
after(async () => {
  try {
    await logOut();
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error(`Test cleanup failed: ${error.message}`);
  }
});
