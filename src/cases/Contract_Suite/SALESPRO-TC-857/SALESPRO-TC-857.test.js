const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contracttestdata = require("../../../../resources/testdata/contracttestdata.json");
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const contractElements = require("../../../../resources/elements/contracts.json");

describe("SALESPRO-TC-857", () => {
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

  it("Contracts - Validate Dynamic fields", async () => {
  await estimatesPage.addNewSidingEstimate(
    estimateTestData.quantity,
    estimateName
  );
  await navigateToCustomersScreen();
  await contractsPage.calculateDiscount(
    contracttestdata.discountPercentage,
    contracttestdata.managerCode
  );
  //Assert that the discount amount is calculated correctly
  const discount = await $(contractElements.discountedAmount);
  await expect(discount).toBeDisplayed();
  await $(contractElements.contractBackButton).click();
});

});

after(async () => {
  await logOut();
});