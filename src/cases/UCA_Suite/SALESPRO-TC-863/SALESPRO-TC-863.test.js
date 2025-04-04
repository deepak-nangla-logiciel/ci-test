const {
  ensureLoggedInAndNavigateToAddCustomer
} = require("../../../../utils/loginAndHomepage");
// Importing required page object files for login, customers, and estimates pages
const customersPage = require("../../../../test/pageobjects/customersPage");
const ucaPage = require("../../../../test/pageobjects/ucaPage");

const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const ucaTestData = require("../../../../resources/testdata/ucatestdata.json");
const ucaElements = require("../../../../resources/elements/uca.json");

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");
let customerFullName;
let firstName;
let lastName;

describe("This suite will verify the UCA cases.", () => {
  beforeEach(async () => {
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
  });

  it("UCA - Continue Existing Application Flow", async () => {
    const appName = `UCA-${Date.now()}`;
    const propertyAddress = faker.location.streetAddress();
    await ucaPage.submitNewUCAforFoundation(appName);
    await ucaPage.fillFoundationLenderDetails(
      ucaTestData.totalAmount,
      ucaTestData.downPayment,
      ucaTestData.pendingFirstName,
      ucaTestData.pendingLastName,
      ucaTestData.pendingSSN,
      ucaTestData.dob,
      customersTestData.phone,
      customersTestData.email,
      ucaTestData.idNumber,
      customersTestData.stateNJ,
      propertyAddress,
      ucaTestData.city,
      ucaTestData.zipCode,
      ucaTestData.monthlyMortgagePayment,
      ucaTestData.yearsAtAddress,
      ucaTestData.monthsAtAddress,
      ucaTestData.employmentStatus,
      ucaTestData.occupation,
      ucaTestData.employerName,
      ucaTestData.grossMonthlyIncome
    );
    await ucaPage.addFoundationLoanInfo(
      ucaTestData.monthsAtAddress,
      ucaTestData.projectType,
      ucaTestData.residence
    );
    // Click the back button 4 times
    for (let i = 0; i < 4; i++) {
      await $(ucaElements.backButtonUCA).click();
    }
    await $(ucaElements.existingCreditApp).click();
    await expect(
      $(
        `//XCUIElementTypeCell[@name="creditApplication_existingApplicationsTableViewCell_${appName}"]`
      )
    ).toBeDisplayed();
    await $(
      `//XCUIElementTypeCell[@name="creditApplication_existingApplicationsTableViewCell_${appName}"]`
    ).click();
    await ucaPage.editExistingApp(
      ucaTestData.approvedFirstName,
      ucaTestData.approvedLastName,
      ucaTestData.approvedSSN
    );
    // Assert that changes are saved in existing UCA.
    await expect($(ucaElements.pendingStatus)).toBeDisplayed();
    await $(ucaElements.backButtonExistingUCA).click();
    await expect($(ucaElements.firstName)).toHaveText(
      ucaTestData.approvedFirstName
    );
    await expect($(ucaElements.lastName)).toHaveText(
      ucaTestData.approvedLastName
    );
    await $(ucaElements.backButtonExistingUCA).click();
    await $(ucaElements.backButtonUCA).click();
  });
});
