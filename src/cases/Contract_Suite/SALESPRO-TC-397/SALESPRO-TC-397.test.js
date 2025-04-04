const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contracttestdata = require("../../../../resources/testdata/contracttestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");

describe("SALESPRO-TC-397", () => {
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

  it("Contracts - Verify that user can Review Contract", async () => {
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

  // Adding static wait due to the loading of the current page
  await browser.pause(3000);
  // Tap on the screen to activate signature functionality
  await driver.execute("mobile: tap", { x: 500, y: 500 });

  // Click on the review button
  await $(contractElements.contractReviewButton).click();
  await $(contractElements.warningText).waitForExist();

  // Enter email address
  await $(contractElements.reviewEmailTextBox).clearValue();
  await $(contractElements.reviewEmailTextBox).setValue(contracttestdata.hoaEmail);

  // Click on the send button
  await $(contractElements.sendReviewButton).waitForExist();
  await $(contractElements.sendReviewButton).click();

  await $(contractElements.successTextLabel).waitForExist();
  await $(contractElements.emailSuccessTextMessage).waitForExist();
  await $(contractElements.successOkButton).click();

  // Click on the print button
  await $(contractElements.printButton).click();
  await $(contractElements.noPrinterSelectedText).waitForExist();
  await $(contractElements.printCancelButton).click();
  await $(contractElements.contractCloseButton).click();
  await $(contractElements.contractBackButton).waitForExist();
  await $(contractElements.contractBackButton).click();

});

});

after(async () => {
  await logOut();
});