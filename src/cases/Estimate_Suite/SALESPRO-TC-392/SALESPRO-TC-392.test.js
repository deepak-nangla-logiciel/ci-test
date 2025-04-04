const {
  ensureLoggedInAndNavigateToAddCustomer,
  navigateToCustomersScreen
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
let firstName2;
let lastName2;
let customerFullName2;

describe("SALESPRO-TC-392", () => {
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

it("should verify that user clicks Clone Estimate into Existing Customer button, it will apply the estimate to the new Customer.", async () => {
  firstName2 = faker.person.firstName();
  lastName2 = faker.person.lastName();
  customerFullName2 = `${firstName2} ${lastName2}`;
  //Create Siding Estimate for Customer A
  await estimatesPage.addNewSidingEstimate(
    estimateTestData.quantity,
    estimateName
  );
  //Create Windows Estimate for Customer B
  await navigateToCustomersScreen();
  await ensureLoggedInAndNavigateToAddCustomer();
  await customersPage.addNewCustomer(
    firstName2,
    lastName2,
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
  //While on Customer B, select Customer A and click on Clone Estimate into Existing Customer button
  await navigateToCustomersScreen();
  await $(`[name='${customerFullName}']`).click();
  await $(alertElements.clone).click({ force: true });
  await $(customersElements.leftNavigation).waitForDisplayed();
  await $(customersElements.leftNavigation).click();
  await $(loginElements.logoutButton).waitForDisplayed();
  //Assert that Customer B now has a copy of Customer A's Siding estimate.
  const customerNameText = await $(`~${customerFullName2}`).getText();
  expect(customerNameText).toEqual(customerFullName2);
  expect(await $(estimateElements.sidingCategory).isEnabled()).toBe(true);
  await $(customersElements.leftNavigation).waitForDisplayed();
  await $(customersElements.leftNavigation).click();
  await navigateToCustomersScreen();
});
});