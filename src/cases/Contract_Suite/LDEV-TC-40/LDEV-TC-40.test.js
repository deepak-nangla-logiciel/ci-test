const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");
const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
} = require("../../../../utils/loginAndHomepage");

describe("LDEV-TC-40", () => {
  let firstName = "",
    lastName = "";

  beforeEach(async () => {
    try {
      await ensureLoggedInAndNavigateToAddCustomer();

      // Generate test data
      firstName = faker.person.firstName();
      lastName = faker.person.lastName();

      // Create test customer
      await customersPage.addNewCustomer(
        firstName,
        lastName,
        faker.location.streetAddress(),
        faker.location.city(),
        customersTestData.stateNJ,
        faker.location.zipCode(),
        customersTestData.email,
        customersTestData.phone
      );
    } catch (error) {
      throw new Error("Failed to create test customer");
    }
  });

  it("Custom Documents - Verify that user can select more than one custom document (if applicable)", async () => {
    try {
      // Navigate to contracts screen
      await contractsPage.navigateToCustomContractsScreen(
        contractElements.leftNavSuccedo,
        contractElements.customContractsHeader
      );

      // Verify multiple document selection with specific contract selectors
      const selectionState =
        await contractsPage.getMultipleDocumentSelectionState(
          "aTemplate",
          "bTemplate"
        );

      // Early return if required contracts not found
      expect(selectionState.hasEnoughDocuments).toBe(true, selectionState.message);

      // Verify multiple selection functionality
      expect(selectionState.isMultipleSelectionPossible).toBe(
        true,
        selectionState.message
      );
    } catch (error) {
      throw new Error(`Test case failed: ${error.message}`);
    }
  });

  after(async () => {
    try {
      await logOut();
    } catch (error) {
      throw new Error(`Test case failed: ${error.message}`);
    }
  });
});
