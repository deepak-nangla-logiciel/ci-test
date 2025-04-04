const {
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");
const contractElements = require("../../../../resources/elements/contracts.json");
const calendarElements = require("../../../../resources/elements/calendars.json");
const customerElements = require("../../../../resources/elements/customers.json");

describe("LDEV-TC-49 - Verify Sort button functionality in Contracts (iPad only)", () => {
  beforeEach(async () => {
    // Ensure the user is logged in and navigated to the Add Customer screen
    await ensureLoggedInAndNavigateToAddCustomer();

    // Navigate back using the calendar back button to reach the main screen
    await $(calendarElements.backButton).click();
  });

  it("should allow setting Alphabetic/Order option using the Sort button", async () => {
    // Navigate to Contracts screen via side menu
    await $(contractElements.leftNavigation).click();
    await $(contractElements.leftNavigationContractsOption).click();

    // Ensure the Contracts header appears
    await $(contractElements.contractsHeader).waitForExist();
    await expect($(contractElements.sortButton)).toBeEnabled();

    // Navigate to Customer screen and verify UI elements
    await $(contractElements.leftNavigation).click();
    await $(customerElements.customerMenu).click();
    await $(customerElements.addNewButton).waitForExist();

    // Reopen Contracts screen
    await $(contractElements.leftNavigation).click();
    await $(contractElements.leftNavigationContractsOption).click();

    // Verify Sort button presence and functionality
    await $(contractElements.sortButton).waitForExist();
    await expect($(contractElements.sortButton)).toBeEnabled();
    await $(contractElements.sortButton).click();

    // Determine if Alphabetic Sort option is displayed
    if (await $(contractElements.alphaSortText).isDisplayed()) {
      await $(contractElements.dismissButton).click();
      await expect($(contractElements.agreementTitleContract)).toBeDisplayed();
    } else {
      // If Alphabetic Sort is not displayed, proceed with sorting
      await $(contractElements.sortOptionButton).waitForExist();
      await $(contractElements.sortOptionButton).click();

      // Confirm that agreement title appears after sorting
      await expect($(contractElements.agreementTitleContract)).toBeDisplayed();
    }
  });
});
