const {
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const { faker } = require("@faker-js/faker");

describe("SALESPRO-TC-866", () => {

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

  it("Display Customer Info", async () => {
    // Verify Customer details in the Left Panel Customer Info section
    await customersPage.customerInfoSection(customerFullName, customersTestData.phone, customersTestData.email);
  });
});
