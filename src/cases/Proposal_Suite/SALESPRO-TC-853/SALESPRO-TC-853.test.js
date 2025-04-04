const {
  logOut,
  loginWithNewUser,
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const proposalPage = require("../../../../test/pageobjects/proposalPage");
const proposalElements = require("../../../../resources/elements/proposal.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const customersElements = require("../../../../resources/elements/customers.json");

describe("SALESPRO-TC-853", () => {
  let firstName = "",
    lastName = "",
    customerFullName = "";

  before(async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    await loginWithNewUser(process.env.CAUSERNAME, process.env.CAPASSWORD); 
  });

  it("Proposals - Select Proposal for Customer in Canada with Postal Code/Province", async () => {
    await $(customersElements.addNewButton).isExisting();
    await $(customersElements.addNewButton).waitForDisplayed();
    await $(customersElements.addNewButton).click();
    await customersPage.addNewCustomer(
      firstName,
      lastName,
      faker.location.streetAddress(),
      faker.location.city(),
      customersTestData.province,
      customersTestData.postalCode,
      customersTestData.email,
      customersTestData.phone
    );
    //Create a new proposal and verify the Canadian data on the PDF
    await proposalPage.createProposalWithProposalRoofingTemplate();
    await $(proposalElements.proposalsTemplatesNextButton).click();
    await $(proposalElements.proposalsTemplatesNextButton).isEnabled();
    await browser.pause(5000);
    await proposalPage.verifyDataOnPDF(customerFullName, customersTestData.postalCode);
    await driver.execute("mobile: tap", { x: 500, y: 500 });
    await $(proposalElements.closeButton).click();
    await $(proposalElements.proposalsBackButton).click();
  });

  after(async () => {
    await logOut();
  });
});
