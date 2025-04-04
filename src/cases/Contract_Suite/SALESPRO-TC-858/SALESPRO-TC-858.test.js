const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");

describe("SALESPRO-TC-858", () => {
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

  
  it("Contracts - Validate Placeholders", async () => {
    // Create a new contract with scope of work template and verify the customer name on the PDF
    await contractsPage.createContractWithScopeOfWorkTemplate(customerFullName);
    // Verify the contract on upload settings
    await contractsPage.uploadContractSettings(customerFullName);
    // Navigate to the customers screen
    await navigateToCustomersScreen();
  });

});

after(async () => {
  await logOut();
});
