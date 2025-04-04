const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const {
  refreshGoogleToken,
  getGmailThreadsAndSearchMessage,
} = require("../../../../utils/fetchEmail");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contracttestdata = require("../../../../resources/testdata/contracttestdata.json");
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");

describe("SALESPRO-TC-868", () => {
  let firstName = "",
    lastName = "",
    customerFullName = "";
  estimateName = "";

  beforeEach(async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    customerFullName = `${firstName} ${lastName}`;
    estimateName = `Estimate-${Date.now()}`;
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
  });

// currently google token is getting expired in a week, I will looking for a permanent solution so skipping this test case for now.
it.skip("Send Contract - Document Sending Rules are Respected", async () => {
  await estimatesPage.addNewSidingEstimate(
    estimateTestData.quantity,
    estimateName
  );
  await contractsPage.createContractWithProposalTemplate(
    faker.person.firstName(),
    faker.phone.number(),
    contracttestdata.hoaEmail,
    faker.location.streetAddress(),
    contracttestdata.totalContractAmount,
    contracttestdata.depositAmount,
    contracttestdata.depositFormOfPaymentCheck,
    contracttestdata.depositFormOfPaymentCash,
    contracttestdata.balanceFormOfPaymentCheck,
    contracttestdata.balanceFormOfPaymentCash
  );
  await contractsPage.signContractWithLiveSignature();

  // Added this wait to allow extra time as the email is occasionally delayed.
  await browser.pause(10000);

  await $(contractElements.contractBackButton).click();
  await navigateToCustomersScreen();
  await refreshGoogleToken();
  // Fetch email subject
  const emailSubject = await getGmailThreadsAndSearchMessage();
  // Assert the email is recieved by checking subject is containing customer name
  expect(emailSubject).toContain(
    "Contract Generated with SalesPro (" + customerFullName
  );
});

});

after(async () => {
  await logOut();
});