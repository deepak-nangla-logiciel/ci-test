const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const customContractsPage = require("../../../../test/pageobjects/customContractsPage");

describe("LDEV-TC-8", () => {
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

  it("Custom Document - Verify that user can access custom documents", async () => {
  const customTemplateName = faker.lorem.word()
  await customContractsPage.createCustomContractsFromWeb(
    process.env.SALES_PRO_WEB_URL,
    process.env.WEB_USERNAME,
    process.env.WEB_PASSWORD,
    customTemplateName
  );
  await customContractsPage.verifyTheCustomContractTemplateOnMobile(customTemplateName);
});
});
