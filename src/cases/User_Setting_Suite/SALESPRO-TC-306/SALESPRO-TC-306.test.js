const { login } = require("../../../../utils/loginAndHomepage");
const userInfoPage = require("../../../../test/pageobjects/userInfoPage");
const userInfoTestData = require("../../../../resources/testdata/userinfotestdata.json");
const userInfoElements = require("../../../../resources/elements/userInfo.json");
const menuElements = require("../../../../resources/elements/menu.json");

describe("User Info Scenarios Test Suite", () => {
  beforeEach(async () => {
    await login();
  });

  it("Change offices and validate data is changed", async () => {
    //act
    await userInfoPage.navigateToUserInfoPage();
    await userInfoPage.changeOffice(userInfoTestData.secondOffice);
    //assert
    const officeLabel = await $(userInfoElements.officeLabel);
    expect (await officeLabel.getText()).toContain(userInfoTestData.secondOffice);
    await $(menuElements.userInfo).waitForDisplayed();
    await $(menuElements.userInfo).click();
    await userInfoPage.changeOffice(userInfoTestData.firstOffice);
  });
});