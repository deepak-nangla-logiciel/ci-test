const calendarElements = require("../../resources/elements/calendars.json");
const itemCatalogElements = require("../../resources/elements/itemCatalog.json");
const itemCatalogPage = require("../pageobjects/itemCatalogPage.js");
const {
  login,
  navigateToCustomersScreen,
  logOut,
} = require("../../utils/loginAndHomepage");
const {
  scrollToView,
  scrollToElementAndClick,
} = require("../../utils/scrollToView.js");

let categoryName = "";
let itemName = "";
let itemPrice = "";
let newItemName = "";
let templateName = "";

describe("LDEV-TC-75", () => {
  beforeEach(async () => {
    categoryName = `Category ${Math.floor(Math.random() * 10000)}`;
    itemName = `Item ${Math.floor(Math.random() * 10000)}`;
    newItemName = `New Item ${Math.floor(Math.random() * 10000)}`;
    itemPrice = Math.floor(Math.random() * 10000);
    templateName = `Template ${Math.floor(Math.random() * 10000)}`;
    await login();
  });

  it("Add Custom Category Items", async () => {
    await itemCatalogPage.addNewItem(categoryName, itemName, itemPrice);
    await scrollToElementAndClick(`~${categoryName}`);
    expect(await $(`[label='${itemName}']`).isDisplayed()).toBe(true);
    await $(`[label='${itemName}']`).click();
    await $(itemCatalogElements.saveButton).click();
    await $(itemCatalogElements.backButtonItemCatalog).click();
    await $(calendarElements.backButton).click();
    await navigateToCustomersScreen();
  });

});

after(async () => {
  await logOut();
});