const { login } = require("../../../../utils/loginAndHomepage");
const refreshOptionsPage = require("../../../../test/pageobjects/refreshOptionsPage.e2e");

describe("SALESPRO-TC-889", () => {
    beforeEach(async() => {
        await login();
    });
   
    it("Refresh - Remove Local Data then after Refresh display an item in the price guide ", async () => {
        // Click the refresh button for the remove local data option
        await refreshOptionsPage.clickRefreshButtonForRemoveLocalDataOption();
        // Navigate to the price guide screen after the refresh and assert the windows price guide option is displayed
        await refreshOptionsPage.navigateToPriceGuideScreenAfterRefresh();
    });
});