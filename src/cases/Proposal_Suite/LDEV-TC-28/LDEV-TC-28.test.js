/**
 * Test suite for proposal selection functionality
 * @module LDEV-TC-28
 */

const { $, expect } = require("@wdio/globals");
const { logOut, login, ensureLoggedInAndNavigateToAddCustomer } = require("../../../../utils/loginAndHomepage");
const loginElements = require("../../../../resources/elements/login.json");
const proposalElements = require("../../../../resources/elements/proposal.json");
const customersElements = require("../../../../resources/elements/customers.json");
const { scrollToView } = require("../../../../utils/scrollToView");
const { faker } = require("@faker-js/faker");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const customersPage = require("../../../../test/pageobjects/customersPage");

// Constants for timeouts
const TIMEOUTS = {
  LOGIN_PAGE: 10000,
  PROPOSALS_LOAD: 10000,
  NEXT_BUTTON: 5000
};

/**
 * Test suite for verifying proposal selection functionality
 * This test verifies that users can select and unselect proposal documents
 * and the UI state updates accordingly
 */
describe("LDEV-TC-28: Proposal Selection Functionality", () => {
  let firstName, lastName, customerFullName;

  /**
   * Setup before each test:
   * 1. Ensures we're on the login page
   * 2. Performs login
   * 3. Creates a new customer with random data
   */
  beforeEach(async () => {
    try {
      // Check if we're already on the login page
      const isLoginPage = await $(loginElements.inputUsername).isExisting();
      if (!isLoginPage) {
        await logOut();
      }
      
      // Wait for login page to be fully loaded
      await $(loginElements.inputUsername).waitForExist({ timeout: TIMEOUTS.LOGIN_PAGE });
      await login();

      // Generate random customer data
      firstName = faker.person.firstName();
      lastName = faker.person.lastName();
      customerFullName = `${firstName} ${lastName}`;

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
      console.error("Setup failed:", error);
      throw new Error(`Test setup failed: ${error.message}`);
    }
  });

  /**
   * Test case to verify proposal selection functionality
   * Verifies:
   * 1. Initial unselected state
   * 2. Selection of proposal
   * 3. Unselection of proposal
   * 4. Re-selection of proposal
   */
  it("should allow users to select and unselect proposal documents", async () => {
    try {
      // Navigate to Proposals section
      await $(customersElements.leftNavigation).waitForDisplayed();
      await $(customersElements.leftNavigation).click();

      // Navigate to proposal options
      await $(proposalElements.leftNavigationProposalOption).waitForDisplayed();
      await $(proposalElements.leftNavigationProposalOption).click();

      // Wait for proposals to be loaded
      await $(proposalElements.proposalsHeader).waitForExist({ timeout: TIMEOUTS.PROPOSALS_LOAD });

      // Initialize next button and verify initial state
      const nextButton = await $(proposalElements.proposalsTemplatesNextButton);
      await nextButton.waitForExist({ timeout: TIMEOUTS.NEXT_BUTTON });
      expect(await nextButton.isEnabled()).toBe(false);

      // Handle proposal element visibility
      const proposalElement = await $(proposalElements.proposal);
      if (!(await proposalElement.isDisplayed())) {
        await scrollToView(proposalElements.proposal);
      }

      // Test proposal selection
      await proposalElement.click();
      expect(await nextButton.isEnabled()).toBe(true);

      // Test proposal unselection
      await proposalElement.click();
      expect(await nextButton.isEnabled()).toBe(false);

      // Test proposal re-selection
      await proposalElement.click();
      expect(await nextButton.isEnabled()).toBe(true);

    } catch (error) {
      console.error("Test execution failed:", error);
      throw new Error(`Proposal selection test failed: ${error.message}`);
    }
  });
});

/**
 * Cleanup after all tests
 * Ensures proper logout if not already on login page
 */
after(async () => {
  try {
    const isLoginPage = await $(loginElements.inputUsername).isExisting();
    if (!isLoginPage) {
      await logOut();
    }
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
});