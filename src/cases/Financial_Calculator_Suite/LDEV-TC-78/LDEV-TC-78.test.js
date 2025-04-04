const { faker } = require("@faker-js/faker");
const {
  login,
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");
const financneCalculatorPage = require("../../../../test/pageobjects/financeCalculatorPage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");
const financecalculatortestdata = require("../../../../resources/testdata/financecalculatortestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const financecalculatorElement = require("../../../../resources/elements/financecalculator.json");

beforeEach(async () => {
  await login();
});

let customerFullName;
let estimateName;
let firstName;
let lastName;

describe("LDEV-TC-78", () => {
  it("Estimates - Verify that user can Edit Finance Option", async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    estimateName = `Estimate-${Date.now()}`;
    customerFullName = `${firstName} ${lastName}`;
    // Before each test, ensure the user is logged in and redirect to add new customer.
    await ensureLoggedInAndNavigateToAddCustomer();
    //Add a new customer using randomly generated data and fixed test data from JSON fixtures
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
    await estimatesPage.addNewSidingEstimate(
      estimateTestData.quantity,
      estimateName
    );
    const recentEstimate = await $(`[name='${estimateName}']`);
    await recentEstimate.click();

    await financneCalculatorPage.addFinanceOptionToEstimate(
      financecalculatortestdata.totalAmount,
      financecalculatortestdata.financeCalcDownPayment
    );
    await recentEstimate.click();

    // Edit the finance option from the estimate
    await financneCalculatorPage.editFinanceOptionFromEstimate(
      financecalculatortestdata.updatedTotalAmount,
      financecalculatortestdata.updatedFinanceCalcDownPayment
    );
    await recentEstimate.click();
    const newMsrpText = await $(financecalculatorElement.updateTotalAmount);
    await expect(newMsrpText).toBeDisplayed();
  });
});
