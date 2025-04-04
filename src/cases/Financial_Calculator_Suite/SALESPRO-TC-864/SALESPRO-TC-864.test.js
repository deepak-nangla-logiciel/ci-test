const {
  login,
  logOut,
  navigateToCustomersScreen
} = require("../../../../utils/loginAndHomepage");
const financneCalculatorPage = require("../../../../test/pageobjects/financeCalculatorPage");
const financecalculatortestdata = require("../../../../resources/testdata/financecalculatortestdata.json");

beforeEach(async () => {
  await login();
});

describe("SALESPRO-TC-864", () => {
  it("Finance Calculator - plans are hidden if customer doesn't qualify (based on total/deposit) Part-A", async () => {
    // Navigate to Finance Calculator screen
    await financneCalculatorPage.navigateToFinanceCalculatorScreen();
    // Set the total amount to 6000 and verify the visibility of Dividend Finance Plan 4012
    await financneCalculatorPage.lowMonthlyPaymentsWith6000TotalAmount(
      financecalculatortestdata.totalAmountwith6000,
      financecalculatortestdata.downPayment,
      financecalculatortestdata.lowMonthlyPaymentsVisibility,
      financecalculatortestdata.dividendFinanceNotDisplayedMessage
    );
    // Navigate to the Customers screen
    await navigateToCustomersScreen();
  });

  it("Finance Calculator - plans are hidden if customer doesn't qualify (based on total/deposit) Part-A", async () => {
    // Navigate to Finance Calculator screen
    await financneCalculatorPage.navigateToFinanceCalculatorScreen();
    // Set the total amount to 4000 and verify the non-visibility of Dividend Finance Plan 4012
    await financneCalculatorPage.lowMonthlyPaymentsWith4000TotalAmount(
      financecalculatortestdata.totalAmountwith4000,
      financecalculatortestdata.downPayment,
      financecalculatortestdata.lowMonthlyPaymentsVisibility,
      financecalculatortestdata.dividendFinanceNotDisplayedMessage
    );
    // Navigate to the Customers screen
    await navigateToCustomersScreen();
  });

});

after(async () => {
  await logOut();
});