// Import the loginPage object containing the login and logout methods
const loginPage = require("../../../../test/pageobjects/loginPage");
const loginELements = require("../../../../resources/elements/login.json");

describe("LDEV-TC-890", () => {
  it("Logout - Verify that the user is able to log out.", async () => {
    // If the user is not logged-in, perform login
    if (await $(loginELements.inputUsername).isExisting()) {
      await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    }

    // Perform logout after login
    await loginPage.logout();
  });
});
