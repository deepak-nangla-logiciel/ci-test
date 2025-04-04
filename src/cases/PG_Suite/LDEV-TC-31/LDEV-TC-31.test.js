const { login } = require("../../../../utils/loginAndHomepage");
const priceGuidePage = require("../../../../test/pageobjects/priceGuidepage");
const priceGuideElements = require('../../../../resources/elements/priceguide.json');
beforeEach(async () => {
    await login();
});
describe("LDEV-TC-31", () => {
    it("Verify that user can view Price Guide prices without an error.", async () => {
        await priceGuidePage.verifyItemPriceInPriceGuide();
        // Assert that the item price is displayed
        expect(await $(priceGuideElements.sidingItem1).isDisplayed()).toBe(true);
        expect(await $(priceGuideElements.sidingItem2).isDisplayed()).toBe(true);
        expect(await $(priceGuideElements.sidingItem1Price).isDisplayed()).toBe(true);
        expect(await $(priceGuideElements.sidingItem2Price).isDisplayed()).toBe(true);
    });
});