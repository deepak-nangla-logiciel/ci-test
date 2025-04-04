
const {
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");
// Importing required page object files for login, customers, and estimates pages
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");

// Importing fixture files containing locators and test data for login, customers, and estimates
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const customersElements = require("../../../../resources/elements/customers.json");
const estimateElements = require("../../../../resources/elements/estimates.json");
const contractElements = require("../../../../resources/elements/contracts.json");

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");
let customerFullName;
let estimateName;
let firstName;
let lastName;

describe("LDEV-TC-25", () => {
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

it("Estimates - Verify that user can Create Custom Packages", async () => {
  const packageName = `CustomPackage-${Date.now()}`; // Generate a unique package name using the current timestamp.
  await $(estimateElements.sidingCategory).waitForDisplayed();
  await $(estimateElements.sidingCategory).click();

  // Added manual wait since this page takes time to load.
  await browser.pause(2000);
  await $(estimateElements.selectQuantitySidingEstimate).waitForDisplayed();
  await $(estimateElements.selectQuantitySidingEstimate).setValue(
    estimateTestData.quantity
  );
  await $(contractElements.doneButton).waitForDisplayed();
  await $(contractElements.doneButton).click();
  await $(
    estimateElements.selectQuantityShingleShakeEstimate
  ).waitForDisplayed();
  await $(estimateElements.selectQuantityShingleShakeEstimate).setValue(
    estimateTestData.quantity
  );
  await $(estimateElements.doneButtonForKeypad).waitForDisplayed();
  await $(estimateElements.doneButtonForKeypad).click();
  await $(estimateElements.doneButton).waitForDisplayed();
  await $(estimateElements.doneButton).click();

  // Create a custom package estimate with the specified package name.
  await estimatesPage.createCustomPackageEstimate(
    packageName,
    estimateElements.hardieRevealPackage
  );
  
  // Assert that the created package name  and price is displayed correctly on the screen.
  expect(await $(`~estimateScreen_packageCell_${packageName}`).isDisplayed()).toBe(true);
  expect(await $(estimateElements.customPackagePriceOnEstimateScreen).isDisplayed()).toBe(true);
  expect(await $(estimateElements.totalMSRP).isDisplayed()).toBe(true);
  expect(await $(estimateElements.totalMSRP)).toHaveTextContaining(
    estimateTestData.customPackagePrice
  );

  await $(estimateElements.saveButton).waitForDisplayed();
  await $(estimateElements.saveButton).click();
  await $(estimateElements.estimateTitle).waitForEnabled();
  await $(estimateElements.estimateTitle).clearValue();
  await $(estimateElements.estimateTitle).addValue(estimateName);
  await $(estimateElements.saveEstimateTitle).click();
  await $(customersElements.leftNavigation).click();
  await $(customersElements.customerMenu).click();
});
});
