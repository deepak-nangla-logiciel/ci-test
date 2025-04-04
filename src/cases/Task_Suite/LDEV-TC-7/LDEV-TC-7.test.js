const { faker } = require("@faker-js/faker");
const tasksPage = require("../../../../test/pageobjects/tasksPage");
const {
  login
} = require("../../utils/loginAndHomepage");

describe("LDEV-TC-7", () => {
  let tasksName;
  let tasksNotes;
  
  beforeEach(async () => {
    await login();
    tasksName = faker.lorem.word();
    tasksNotes = faker.lorem.sentence(1);
  });

  it("Customers - Today's Tasks - Verify scheduled tasks appear under Today's Tasks", async () => {
    // Create a new task
    await tasksPage.createTask(tasksName, tasksNotes);
    // View the latest task
    await tasksPage.viewLatestTasksOnTasksScreen(tasksName);
    // Complete the task
    await tasksPage.completeTasksOnTasksScreen(tasksName);
  });
});
