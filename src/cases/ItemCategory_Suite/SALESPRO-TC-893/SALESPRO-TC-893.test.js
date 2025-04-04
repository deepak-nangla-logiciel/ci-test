const calendarElements = require("../../resources/elements/calendars.json");
const itemCatalogElements = require("../../resources/elements/itemCatalog.json");
const itemCatalogPage = require("../pageobjects/itemCatalogPage");
const {
  login,
  navigateToCustomersScreen,
  logOut,
} = require("../../utils/loginAndHomepage");
const {
  scrollToElementAndClick,
} = require("../../utils/scrollToView.js");

let categoryName = "";
let itemName = "";
let itemPrice = "";
let newItemName = "";
let templateName = "";

describe("SALESPRO-TC-893", () => {
  beforeEach(async () => {
    categoryName = `Category ${Math.floor(Math.random() * 10000)}`;
    itemName = `Item ${Math.floor(Math.random() * 10000)}`;
    newItemName = `New Item ${Math.floor(Math.random() * 10000)}`;
    itemPrice = Math.floor(Math.random() * 10000);
    templateName = `Template ${Math.floor(Math.random() * 10000)}`;
    await login();
  });

  it("Edit Custom Category Items", async () => {
    await itemCatalogPage.addNewItem(categoryName, itemName, itemPrice);
    await scrollToElementAndClick(`~${categoryName}`);
    await $(`[label='${itemName}']`).click();
    await $(itemCatalogElements.itemNameInput).clearValue();
    await $(itemCatalogElements.itemNameInput).setValue(newItemName);
    await $(itemCatalogElements.saveButton).click();
    await $(itemCatalogElements.backButtonItemCatalog).click();
    // added manual wait to avoid flakiness
    await browser.pause(5000);
    await scrollToElementAndClick(`~${categoryName}`);
    expect(await $(`[label='${newItemName}']`).isDisplayed()).toBe(true);
    await $(itemCatalogElements.backButtonItemCatalog).click();
    await $(calendarElements.backButton).click();
    await navigateToCustomersScreen();
  });
  
  after(async () => {
    await logOut();
  });
});
