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

describe("SALESPRO-TC-851", () => {
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

  it("Proposals -  Validate Placeholders Part-A", async () => {
    // Create a new proposal with Proposal Template
    await proposalPage.createProposalWithProposalTemplate(
      proposaltestdata.windowsNumber,
      proposaltestdata.windowsInstalled,
      proposaltestdata.oneYearPrice
    );
    // Verify the customer name on the PDF and send the proposal
    await proposalPage.verifyCustomerNameOnPDFAndSendProposal(
      proposaltestdata.customerEmailId,
      customerFullName
    );
    // Verify the proposal in the completed uploads section
    await proposalPage.uploadProposalSettings(customerFullName);
    // Navigate to the customers screen
    await navigateToCustomersScreen();
  });

  it("Proposals -  Validate Placeholders Part-B", async () => {
    // Create a new proposal with Proposal - Roofing Template
    await proposalPage.createProposalWithProposalRoofingTemplate();
    // Verify the customer name on the PDF and send the proposal
    await proposalPage.verifyCustomerNameOnPDFAndSendProposal(
      proposaltestdata.customerEmailId,
      customerFullName
    );
    // Verify the proposal in the completed uploads section
    await proposalPage.uploadProposalSettings(customerFullName);
    // Navigate to the customers screen
    await navigateToCustomersScreen();
  });

  after(async () => {
    await logOut();
  });
});