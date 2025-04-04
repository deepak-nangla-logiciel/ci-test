const { login} = require("../../../../utils/loginAndHomepage");
const refreshOptionsPage = require("../../../../test/pageobjects/refreshOptionsPage.e2e");

describe("SALESPRO-TC-838", () => {
    beforeEach(async() => {
        await login();
    });
   
    it("Refresh - Remove Local Data then after Refresh customer screen displays", async () => {
        // Click the refresh button for the remove local data option
        await refreshOptionsPage.clickRefreshButtonForRemoveLocalDataOption();
        // Navigate to the customer screen after the refresh and assert the search field is displayed
        await refreshOptionsPage.navigateToCustomersScreenAfterRefresh();
    });
});