const {
  ensureLoggedInAndNavigateToAddCustomer,
  logOut
} = require("../../../../utils/loginAndHomepage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const { faker } = require("@faker-js/faker");
const proposalPage = require("../../../../test/pageobjects/proposalPage");
const proposaltestdata = require("../../../../resources/testdata/proposaltestdata.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");

describe("LDEV-TC-80", () => {
  let firstName, lastName, customerFullName;
  let allTestFieldTemplateName;
  let savedCustomerFullName; // Store customer for reuse in later tests
  let skipCustomerCreation = false; // Flag to control customer creation

  before(async () => {
    allTestFieldTemplateName = `Proposal-${Date.now()}`;
  });

  beforeEach(async () => {
    if (skipCustomerCreation) return; // Skip adding a new customer for last two tests

    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    customerFullName = `${firstName} ${lastName}`;

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

    // Store the customer for later use and stop creating new customers
    savedCustomerFullName = customerFullName;
  });

  it("should verify that the user is able to create a proposal with All Fields Test Documnet Template and verify the text word cell test section part A.", async () => {
    const keyboardTextBox = faker.lorem.words();
    const emailAddressTextBox = proposaltestdata.customerEmailId;
    const phoneNumberTextBox = customersTestData.phone;
    const creditCardTextbox = proposaltestdata.creditCardNumber;
    const creditCardExpDate = proposaltestdata.creditCardExpDate;
    const keypad1TextBox = proposaltestdata.keypad1;
    const keypad1_00TextBox = proposaltestdata.keypad1_00;
    const numberKeyboardTextBox = proposaltestdata.numberKeyboardTextBox;
    const currency$1_00TextBox = proposaltestdata.currency$1_00TextBox;
    const currency$1TextBox = proposaltestdata.currency$1TextBox;
    const pickerDropDown = proposaltestdata.pickerDropDown;
    const fincanceOptionsPickerDropDown =
      proposaltestdata.financeOptionsPickerDropDown;

    if (!savedCustomerFullName) savedCustomerFullName = customerFullName; // Ensure saved customer is assigned
    skipCustomerCreation = true; // Stop creating new customers for all upcoming tests
    await proposalPage.verifyTextWordCellTestsPart_A(
      allTestFieldTemplateName,
      keyboardTextBox,
      emailAddressTextBox,
      phoneNumberTextBox,
      creditCardTextbox,
      creditCardExpDate,
      keypad1TextBox,
      keypad1_00TextBox,
      numberKeyboardTextBox,
      currency$1_00TextBox,
      currency$1TextBox,
      pickerDropDown,
      fincanceOptionsPickerDropDown
    );
  });

  // The below test case is dependent on the above test case, please run the above test case first.
  it("Verify fields appear as expected in the 'All Fields Test Document' 1/2", async () => {
    const sizePickerDropDown = proposaltestdata.sizePickerDropDown;
    const dateAndTimeDropDown = proposaltestdata.dateAndTimeDropDown;
    const timeDropDown = proposaltestdata.timeDropDown;
    const datePickerDropDown = proposaltestdata.datePickerDropDown;
    const errorMessage = proposaltestdata.alertErrorConditionMessage;

    if (!savedCustomerFullName)
      throw new Error("savedCustomerFullName is not set!");
    await proposalPage.verifyTextWordCellTestsPart_B(
      savedCustomerFullName,
      allTestFieldTemplateName,
      sizePickerDropDown,
      dateAndTimeDropDown,
      timeDropDown,
      datePickerDropDown,
      errorMessage
    );
  });

  after(async () => {
    await logOut();
  });
});
