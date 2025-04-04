const loginPage = require("../../../../test/pageobjects/loginPage");
const resourcesPage = require("../../../../test/pageobjects/resourcesPage");

describe("SALESPRO-TC-304", () => {
  beforeEach(async () => {
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  it("Verify user can open resource files", async () => {
    // Open the Resources section
    await resourcesPage.openResourcesSection();

    // Click on the first visible resource, if available
    await resourcesPage.clickFirstVisibleResource();

    // Close the resource viewer
    await resourcesPage.closeResourceViewer();
  });
});
