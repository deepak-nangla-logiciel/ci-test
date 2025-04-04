const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contracttestdata = require("../../../../resources/testdata/contracttestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");

describe("SALESPRO-TC-881", () => {
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

  it("Contracts - verify that a user can Save and Open a Saved Contract", async () => {
  // Create unique template name for verification
  const templateName = `Template-${Date.now()}`;
  
  // Create contract and save as template
  await contractsPage.createContractFromExistingTemplate(
    faker.person.firstName(),
    faker.phone.number(),
    contracttestdata.hoaEmail,
    faker.location.streetAddress(),
    contracttestdata.totalContractAmount,
    contracttestdata.depositAmount,
    contracttestdata.depositFormOfPaymentCheck,
    contracttestdata.depositFormOfPaymentCash,
    contracttestdata.balanceFormOfPaymentCheck,
    contracttestdata.balanceFormOfPaymentCash,
    templateName
  );
  
  await $(contractElements.contractBackButton).click();
  await browser.pause(5000);
  await $(contractElements.openContract).click();
  
  // Assert that the new template appears in the list
  await $(`[label='${templateName}']`).waitForExist();
  expect(await $(`[label='${templateName}']`).isDisplayed()).toBe(true);
  await $(contractElements.cancelButtonOnOpenContract).click();
  await navigateToCustomersScreen();
});

});

after(async () => {
  await logOut();
});