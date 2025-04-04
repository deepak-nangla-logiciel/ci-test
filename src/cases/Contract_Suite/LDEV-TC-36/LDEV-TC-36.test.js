const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");

/**
 * Test suite for verifying Contracts functionality
 * Tests the sorting functionality in the Contracts screen
 * 
 * @testSuite LDEV-TC-36
 * @category Contracts
 * @priority High
 */
describe("LDEV-TC-36", () => {
  let firstName = "",
    lastName = "";

  /**
   * Setup before each test
   * Creates a new customer with random data for testing
   * 
   * @throws {Error} If customer creation fails
   */
  beforeEach(async () => {
    try {
      // Generate random customer data
      firstName = faker.person.firstName();
      lastName = faker.person.lastName();

      // Navigate and create customer
      await ensureLoggedInAndNavigateToAddCustomer();
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
      throw new Error(`Customer creation failed: ${error.message}`);
    }
  });

  /**
   * Test case to verify Sort button functionality in Contracts screen
   * Verifies that:
   * 1. Default order is displayed correctly
   * 2. Alphabetical order is displayed correctly after sorting
   * 
   * @testCase Verify Sort button functionality
   * @priority High
   * @steps
   * 1. Navigate to Contracts screen
   * 2. Verify default order
   * 3. Apply alphabetical sorting
   * 4. Verify alphabetical order
   */
  it("Custom Document - Verify that Sort button allows to set Alphabetic/Order option", async () => {
    try {
      // Navigate to Contracts screen
      await contractsPage.navigateToCustomContractsScreen(
        contractElements.leftNavSuccedo,
        contractElements.customContractsHeader
      );
      
      // Verify default order
      await contractsPage.verifyDefaultOrder([
        contractElements.customContractsList.defaultOrder.bTemplate,
        contractElements.customContractsList.defaultOrder.aTemplate
      ]);

      // Verify alphabetical order
      await contractsPage.verifyAlphabeticalOrder([
        contractElements.customContractsList.alphabeticalOrder.aTemplate,
        contractElements.customContractsList.alphabeticalOrder.bTemplate
      ]);

      // Navigate back to customers screen
      await navigateToCustomersScreen();
    } catch (error) {
      throw new Error(`Sort button verification failed: ${error.message}`);
    }
  });
});

/**
 * Cleanup after all tests
 * Ensures user is logged out after test suite completion
 * 
 * @throws {Error} If logout fails
 */
after(async () => {
  try {
    await logOut();
  } catch (error) {
    throw new Error(`Test cleanup failed: ${error.message}`);
  }
});