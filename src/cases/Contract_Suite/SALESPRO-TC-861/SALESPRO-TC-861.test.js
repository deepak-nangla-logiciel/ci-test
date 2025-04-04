const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut,
  navigateToCustomersScreen,
} = require("../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contracttestdata = require("../../../../resources/testdata/contracttestdata.json");

describe("SALESPRO-TC-861", () => {
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


  it("Contracts - select multiple documents and reorder", async () => {
  await contractsPage.createContractWithMultipleTemplates(
    faker.person.firstName(),
    faker.phone.number(),
    contracttestdata.hoaEmail,
    faker.location.streetAddress(),
    contracttestdata.totalContractAmount,
    contracttestdata.depositAmount,
    contracttestdata.depositFormOfPaymentCheck,
    contracttestdata.depositFormOfPaymentCash,
    contracttestdata.balanceFormOfPaymentCheck,
    contracttestdata.balanceFormOfPaymentCash
  );
  await contractsPage.signContractWithLiveSignature();
  await contractsPage.uploadContractSettings(customerFullName);
  await navigateToCustomersScreen();
});

});

after(async () => {
  await logOut();
});