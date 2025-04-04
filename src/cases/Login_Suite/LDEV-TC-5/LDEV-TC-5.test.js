// Import the loginPage object containing the login and logout methods
const loginPage = require("../../../../test/pageobjects/loginPage");
const loginELements = require("../../../../resources/elements/login.json");

describe("LDEV-TC-5", () => {
  it("Login - Verify that user can login to the app with valid creds", async () => {
    // Check if login page is already displayed
    const usernameInput = await $(loginELements.inputUsername);
    const isLoginPageDisplayed = await usernameInput.isExisting();

    if (!isLoginPageDisplayed) {
      // If not on login page, logout first
      await loginPage.logout();
      // Wait for login page to be displayed after logout
      await usernameInput.waitForExist({ timeout: 5000 });
    }
    // Login using environment variables for username and password
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });
});
