const {
  refreshGoogleToken,
  getGmailThreadsAndSearchMessage,
} = require("../../../../utils/fetchEmail");
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

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");
let customerFullName;
let estimateName;
let firstName;
let lastName;

describe("SALESPRO-TC-845", () => {
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
// currently google token is getting expired in a week, I will looking for a permanent solution so skipping this test case for now.
it.skip("Result Estimate - Document Sending Rules are Respected.", async () => {
  await estimatesPage.addResultAsASaleWithEstimate(
    estimateTestData.quantity,
    faker.number.int(100),
    faker.number.int(1000),
    estimateName,
    customerFullName,
    estimateTestData.resultNote,
    estimateTestData.cashPaymentType,
    estimateTestData.financeOption
  );
  await navigateToCustomersScreen();
  await refreshGoogleToken();
  // Fetch email subject
  const emailSubject = await getGmailThreadsAndSearchMessage();
  // Assert the email is recieved by checking subject is containing customer name
  expect(emailSubject).toContain("SalesPro Results (" + customerFullName);
});
});