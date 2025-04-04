const {
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");
// Importing required page object files for login, customers, and estimates pages
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");

// Importing fixture files containing locators and test data for login, customers, and estimates
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const estimateElements = require("../../../../resources/elements/estimates.json");

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");
let customerFullName;
let estimateName;
let firstName;
let lastName;

describe("SALESPRO-TC-847", () => {
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
it("Estimate - Total Estimate Price reflects Sum of all items as well as tax, markup", async () => {
  await estimatesPage.calculateEstimate(
    estimateTestData.quantity,
    estimateName
  );
  //Assert that the sum of products from different categories is calculated correctly
  const totalMSRP = await $(estimateElements.totalMSRP);
  await $(estimateElements.totalMSRP).waitForDisplayed();
  await expect(totalMSRP).toHaveTextContaining(estimateTestData.totalMSRP);
  await $(estimateElements.totalMSRP).click();
  await expect(totalMSRP).toHaveTextContaining(
    estimateTestData.totalIntialVisit
  );
  await $(estimateElements.totalMSRP).click();
  await expect(totalMSRP).toHaveTextContaining(estimateTestData.totalFloor);
});
});