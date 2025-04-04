const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const proposalPage = require("../../../../test/pageobjects/proposalPage");
const proposaltestdata = require("../../../../resources/testdata/proposaltestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");

describe("SALESPRO-TC-878", () => {
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

  it("Verify fields appear as expected in the 'All Fields Test Document' 2/2", async () => {
  await proposalPage.verifyTextWordsTextFormulaTest(
    proposaltestdata.addititionalCosts,
    proposaltestdata.discounts,
    proposaltestdata.itemCValue,
    allTestFieldTemplateName
  );
});

after(async () => {
  await logOut();
});
});