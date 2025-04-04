const {
  ensureLoggedInAndNavigateToAddCustomer,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
// Importing required page object files for login, customers, and estimates pages
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");

// Importing fixture files containing locators and test data for login, customers, and estimates
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const customersElements = require("../../../../resources/elements/customers.json");
const loginElements = require("../../../../resources/elements/login.json");
const alertElements = require("../../../../resources/elements/alerts.json");
const estimateElements = require("../../../../resources/elements/estimates.json");

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");
let customerFullName;
let estimateName;
let firstName;
let lastName;

describe("LDEV-TC-11", () => {
  beforeEach(async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    estimateName = `Estimate-${Date.now()}`;
    customerFullName = `${firstName} ${lastName}`;
    // Before each test, ensure the user is logged in and redirect to add new customer.
    await ensureLoggedInAndNavigateToAddCustomer();
    //Add a new customer using randomly generated data and fixed test data from JSON fixtures
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

it("Customers - Recent Estimates - Verify Replace button navigates user to Estimates with previous save", async () => {
  await estimatesPage.addNewSidingEstimate(
    estimateTestData.quantity,
    estimateName
  );
  await navigateToCustomersScreen();
  await ensureLoggedInAndNavigateToAddCustomer();
  await customersPage.addNewCustomer(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.streetAddress(),
    faker.location.city(),
    customersTestData.stateNJ,
    faker.location.zipCode(),
    customersTestData.email,
    customersTestData.phone
  );
  await estimatesPage.addNewWindowEstimate(
    estimateTestData.quantity,
    estimateName
  );
  await navigateToCustomersScreen();
  await $(`[name='${customerFullName}']`).click();
  await $(alertElements.replace).click({ force: true });
  await $(customersElements.leftNavigation).waitForDisplayed();
  await $(customersElements.leftNavigation).click();
  await $(loginElements.logoutButton).waitForDisplayed();
  const customerNameText = await $(`~${customerFullName}`).getText();

  // Assert that correct customer's full name and estimate category is displayed
  expect(customerNameText).toEqual(customerFullName);
  expect(await $(estimateElements.sidingCategory).isEnabled()).toBe(true);
});
});