const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const contractsPage = require("../../../../test/pageobjects/contractsPage");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const contracttestdata = require("../../../../resources/testdata/contracttestdata.json");

describe("LDEV-TC-54", () => {
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

  it("Contracts - Verify that user can sign Contract using DocuSign", async () => {
    await contractsPage.createContractWithProposalTemplate(
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
    await contractsPage.signContractWithRemoteSignature(customersTestData.email);
    await contractsPage.uploadContractSettings(customerFullName);
  });
});

after(async () => {
  await logOut();
});