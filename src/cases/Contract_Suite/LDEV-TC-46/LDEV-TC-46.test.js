const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");

describe("LDEV-TC-46", () => {
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

  it("Contracts -  Verify that user can access Contracts", async () => {

    // Navigate to Contracts screen from side menu
    await $(contractElements.leftNavigation).click();
    await $(contractElements.leftNavigationContractsOption).click();

    // Wait for and verify the Contracts header is displayed
    await $(contractElements.contractsHeader).waitForExist();
    await expect($(contractElements.contractsHeader)).toBeDisplayed();
  })

});

after(async () => {
  await logOut();
});