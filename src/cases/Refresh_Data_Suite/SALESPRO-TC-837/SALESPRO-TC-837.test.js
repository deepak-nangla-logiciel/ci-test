const { login } = require("../../../../utils/loginAndHomepage");
const refreshOptionsPage = require("../../../../test/pageobjects/refreshOptionsPage.e2e");

describe("SALESPRO-TC-837", () => {
    beforeEach(async() => {
        await login();
    });

    it("Refresh - Refresh Price guide Option", async () => {
        // Click the refresh button for the refresh price guide option
        await refreshOptionsPage.clickRefreshButtonForPriceGuideOption();
        // Navigate to the price guide screen after the refresh and assert the windows price guide option is displayed
        await refreshOptionsPage.navigateToPriceGuideScreenAfterRefresh();
    });
});