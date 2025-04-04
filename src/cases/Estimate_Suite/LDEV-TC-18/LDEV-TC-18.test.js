const {
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");

// Importing required page object files for login, customers, and estimates pages
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");

// Importing fixture files containing locators and test data for login, customers, and estimates
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");

// Importing fixture files containing locators and test data for estimates
const estimateElements = require("../../../../resources/elements/estimates.json");

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");

let estimateName;
let firstName;
let lastName;

describe("LDEV-TC-18", () => {
  beforeEach(async () => {
    // Generate random customer details
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    estimateName = `Estimate-${Date.now()}`;

    // Ensure user is logged in and navigate to add a new customer
    await ensureLoggedInAndNavigateToAddCustomer();

    // Add a new customer
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
  });

  it("Estimates - Verify that user can Enable/Disable Categories", async () => {
    // Define variables for enabled and disabled category values
    const enabledCategory = "[value='1']";
    const disabledCategory = "[value='0']";

    // Add a new estimate
    await estimatesPage.addNewSidingEstimate(
      estimateTestData.quantity,
      estimateName
    );

    // Select the recently added estimate
    const recentEstimate = await $(`[name='${estimateName}']`);
    await recentEstimate.waitForExist();
    await recentEstimate.click();

    // Store assertion result for enabled category
    const isEnabledInitially = await $(enabledCategory).isDisplayed();

    // Disable the category and save the estimate
    await $(estimateElements.sidingCategory).click();
    await $(estimateElements.saveButton).waitForExist();
    await $(estimateElements.saveButton).click();
    await $(estimateElements.saveEstimateTitle).waitForExist();
    await $(estimateElements.saveEstimateTitle).click();

    // Store assertion result for disabled category
    const isDisabledAfter = await $(disabledCategory).isDisplayed();

    // Execute assertions at the end
    expect(isEnabledInitially).toBe(true);
    expect(isDisabledAfter).toBe(true);
  });
});
