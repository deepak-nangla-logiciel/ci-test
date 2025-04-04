
const {
  ensureLoggedInAndNavigateToAddCustomer
} = require("../../../../utils/loginAndHomepage");
// Importing required page object files for login, customers, and estimates pages
const customersPage = require("../../../../test/pageobjects/customersPage");

// Importing fixture files containing locators and test data for login, customers, and estimates
const estimateTestData = require("../../../../resources/testdata/estimatetestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const estimatePackagePage = require("../../../../test/pageobjects/estimatePackagePage");
const estimatepackagetestdata = require("../../../../resources/testdata/estimatepackagetestdata.json");

// Importing faker library to generate random test data
const { faker } = require("@faker-js/faker");
let customerFullName;
let estimateName;
let firstName;
let lastName;

describe("SALESPRO-TC-536", () => {
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


it("should verify that Total Price is updating when swiping through the Packages (including Custom Packages).", async () => {
  const packageName = `CustomPackage-${Date.now()}`;
  // Siding Category: Create a Siding Category package estimate with the specified package name and verify the Siding Category package details.

  await estimatePackagePage.totalPriceUpdateswithPackageSwiping(
    estimateTestData.quantity,
    estimatepackagetestdata.msrpProdigyPackageValue,
    estimatepackagetestdata.msrpAlsideProdigyPackageValue,
    estimatepackagetestdata.charterOakXLPackageValue,
    estimatepackagetestdata.boardAndBattenPackageValue,
    estimatepackagetestdata.charterOakPackageValue,
    estimatepackagetestdata.odysseyPlusPackageValue,
    estimatepackagetestdata.willamsportPackageValue,
    estimatepackagetestdata.plyGemSteelPackageValue,
    estimatepackagetestdata.hardiePlankPackageValue,
    estimatepackagetestdata.defaultPackageValue
  );

  // Adding static wait to load the page, without this test cases will fail
  await browser.pause(2000);

  // Create a custom package estimate with the specified package name and verify the custom package details.
  await estimatePackagePage.customizePackageFromDefaultPackage(packageName);

  // Assert that the created package name and price is displayed correctly on the screen.
  await estimatePackagePage.customPackagePriceVerification(
    packageName,
    estimatepackagetestdata.customPackageValue,
    estimateName
  );
});
});