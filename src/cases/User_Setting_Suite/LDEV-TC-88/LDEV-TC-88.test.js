const { login } = require("../../../../utils/loginAndHomepage");
const userInfoPage = require("../../../../test/pageobjects/userInfoPage");
const userInfoTestData = require("../../../../resources/testdata/userinfotestdata.json");
const userInfoElements = require("../../../../resources/elements/userInfo.json");

describe("LDEV-TC-88", () => {
  beforeEach(async () => {
    await login();
  });
  it("Check User Info", async () => {
    //act
    await userInfoPage.navigateToUserInfoPage();
    //assert for user details
    const firstName = await $(userInfoElements.usernameField);
    expect (await firstName.getText()).toContain(username=process.env.USERNAME);
    // Check if the fields are displayed
    await $(userInfoElements.firstnameField).waitForDisplayed();
    await $(userInfoElements.lastnameField).waitForDisplayed();
    await $(userInfoElements.phoneField).waitForDisplayed();
    await $(userInfoElements.emailField).waitForDisplayed();
    await $(userInfoElements.licenseNumberField).waitForDisplayed();
    await $(userInfoElements.officeField).waitForEnabled();
    // assert for office
    const officeLabel = await $(userInfoElements.officeField);
    expect (await officeLabel.getText()).toContain(userInfoTestData.firstOffice);
    await $(userInfoElements.saveButton).waitForDisplayed();
    await $(userInfoElements.saveButton).click();
  });
});