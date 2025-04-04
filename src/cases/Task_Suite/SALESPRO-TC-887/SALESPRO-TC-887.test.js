const { faker } = require("@faker-js/faker");
const tasksPage = require("../../../../test/pageobjects/tasksPage");
const userInfoPage = require("../../../../test/pageobjects/userInfoPage");
const userInfoTestData = require("../../../../resources/testdata/userinfotestdata.json");
const customersElements = require("../../../../resources/elements/customers.json");
const {
  login,
  navigateToCustomersScreen
} = require("../../../../utils/loginAndHomepage");

describe("SALESPRO-TC-887", () => {
  let tasksName;
  let tasksNotes;
  
  beforeEach(async () => {
    await login();
    tasksName = faker.lorem.word();
    tasksNotes = faker.lorem.sentence(1);
  });

  it("Tasks - Verify Tasks are Available in All Offices", async () => {
    // Create a new task
    await tasksPage.createTask(tasksName, tasksNotes);
    // View the latest task
    await tasksPage.viewLatestTasksOnTasksScreen(tasksName);
    // Complete the task
    await tasksPage.completeTasksOnTasksScreen(tasksName);
    // Navigate to the customers screen
    await navigateToCustomersScreen();
    // Navigate to the user info page to change office
    await userInfoPage.navigateToUserInfoPage();
    await userInfoPage.changeOffice(userInfoTestData.secondOffice);
    // Wait until the left navigation is displayed
    await browser.waitUntil(
      async () => await $(customersElements.leftNavigation).isDisplayed(),
      {
        timeout: 15000
      }
    );
    // Click on the left navigation
    await $(customersElements.leftNavigation).click();
    // Pause to allow for any necessary loading
    await browser.pause(20000);
    // Scroll down the tasks list
    await tasksPage.scrollDeep(3);
    // Verify the task is displayed in the new office
    const isTaskDisplayed = await $(`~${tasksName}`).isDisplayed();
    expect(isTaskDisplayed).toBe(true);
    // Navigate back to the user info page to switch back to the original office
    await userInfoPage.navigateToUserInfoPage();
    await userInfoPage.changeOffice(userInfoTestData.firstOffice);
  });

});
