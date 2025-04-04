const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const proposalPage = require("../../../../test/pageobjects/proposalPage");
const proposaltestdata = require("../../../../resources/testdata/proposaltestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const proposalElements = require("../../../../resources/elements/proposal.json");

describe("SALESPRO-TC-883", () => {
  let firstName, lastName, customerFullName;
  let allTestFieldTemplateName;
  let savedCustomerFullName; // Store customer for reuse in later tests
  let skipCustomerCreation = false; // Flag to control customer creation

  before(async () => {
    allTestFieldTemplateName = `Proposal-${Date.now()}`;
  });

  beforeEach(async () => {
    if (skipCustomerCreation) return; // Skip adding a new customer for last two tests

    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    customerFullName = `${firstName} ${lastName}`;

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

    // Store the customer for later use and stop creating new customers
    savedCustomerFullName = customerFullName;
  });


  it("Proposals - verify that a user can Save and Open a Saved Contract", async () => {
  const templateName = `Template-${Date.now()}`;

  await proposalPage.createProposalWithProposalTemplate(
    proposaltestdata.windowsNumber,
    proposaltestdata.windowsInstalled,
    proposaltestdata.oneYearPrice
  );
  await $(proposalElements.proposalSaveButton).click();
  await $(proposalElements.proposalSaveAlertTextField).click();
  await $(proposalElements.proposalSaveAlertTextField).setValue(templateName);
  await $(proposalElements.proposalSaveAlertSaveButton).click();
  await $(proposalElements.proposalsBackButton).click();
  await browser.pause(5000); // Avoid flakiness
  await $(proposalElements.openProposal).click();

  await $(`[label='${templateName}']`).waitForExist();
  expect(await $(`[label='${templateName}']`).isDisplayed()).toBe(true);
  await $(proposalElements.cancelButtonOnOpenProposal).click();
  await navigateToCustomersScreen();
});

after(async () => {
  await logOut();
});
});