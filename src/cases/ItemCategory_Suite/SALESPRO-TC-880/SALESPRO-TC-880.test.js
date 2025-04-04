const calendarElements = require("../../resources/elements/calendars.json");
const itemCatalogElements = require("../../resources/elements/itemCatalog.json");
const itemCatalogPage = require("../pageobjects/itemCatalogPage");
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

describe("SALESPRO-TC-880", () => {
  beforeEach(async () => {
    categoryName = `Category ${Math.floor(Math.random() * 10000)}`;
    itemName = `Item ${Math.floor(Math.random() * 10000)}`;
    newItemName = `New Item ${Math.floor(Math.random() * 10000)}`;
    itemPrice = Math.floor(Math.random() * 10000);
    templateName = `Template ${Math.floor(Math.random() * 10000)}`;
    await login();
  });

  it("Add Custom Item from Catalog", async () => {
  await itemCatalogPage.addNewItem(categoryName, itemName, itemPrice);
  await itemCatalogPage.addNewTemplate(templateName);
  await scrollToView(`~${templateName}`);
  expect(await $(`~${templateName}`).isDisplayed()).toBe(true);
  await $(`[label='${templateName}']`).click();
  await scrollToElementAndClick(`~${categoryName}`);
  await $(`//XCUIElementTypeSwitch[@name='${itemName}']`).click();
  expect(await $("[value='1']").isDisplayed()).toBe(true);
  await $(itemCatalogElements.backButtonOnItemCatalog).click();
  for (let i = 0; i < 2; i++) {
    await $(itemCatalogElements.backButtonItemCatalog).click();
  }
  await $(calendarElements.backButton).click();
  await navigateToCustomersScreen();
});
});

after(async () => {
  await logOut();
});