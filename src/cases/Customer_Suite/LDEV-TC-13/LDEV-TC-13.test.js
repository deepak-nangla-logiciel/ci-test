const {
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const { faker } = require("@faker-js/faker");

describe("LDEV-TC-13", () => {

  let firstName = "",
    lastName = "",
    customerFullName = "";

  beforeEach(async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    customerFullName = `${firstName} ${lastName}`;

    // Login and navigate to the Add New Customer page
    await ensureLoggedInAndNavigateToAddCustomer();

    // Add a new customer
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

  it("Customers - Verify user can Add New Customer", async () => {
    // Add a new estimate for the customer
    await estimatesPage.addNewSidingEstimate(
      estimateTestData.quantity,
      faker.finance.accountName()
    );

    // Search for the customer
    await customersPage.searchCustomer(`${firstName} ${lastName}`);
  });
});
