const { faker } = require("@faker-js/faker");
const tasksPage = require("../../../../test/pageobjects/tasksPage");
const estimatesPage = require("../../../../test/pageobjects/estimatesPage");
const customersPage = require("../../../../test/pageobjects/customersPage");
const estimateTestData = require("../../../../resources/testdata/estimateTestData.json");
const customersTestData = require("../../../../resources/testdata/customertestdata.json");
const {
  login,
  ensureLoggedInAndNavigateToAddCustomer,
} = require("../../../../utils/loginAndHomepage");

describe("SALESPRO-TC-302", () => {
  let firstName;
  let estimateName;
  let lastName;
  let tasksName;
  let tasksNotes;
  
  beforeEach(async () => {
    await login();
    tasksName = faker.lorem.word();
    tasksNotes = faker.lorem.sentence(1);
  });

  it("Verify that user can create a Task", async () => {
    await ensureLoggedInAndNavigateToAddCustomer();
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    estimateName = `Estimate-${Date.now()}`;
    customerFullName = `${firstName} ${lastName}`;
    //Add a new customer using randomly generated data and fixed test data from JSON fixtures
    await customersPage.addNewCustomer(
      firstName,
      lastName,
      faker.location.streetAddress(),
      faker.location.city(),
      customersTestData.stateNJ,
      faker.location.zipCode(),
      customersTestData.email,
      customersTestData.phone
    );
    await estimatesPage.addNewSidingEstimate(
      estimateTestData.quantity,
      estimateName
    );
    // Create a new task
    await tasksPage.createTaskFromCustomerSection(tasksName, tasksNotes);
    // View the latest task
    await tasksPage.viewLatestTasksOnTasksScreen(tasksName);
    // Complete the task
    await tasksPage.completeTasksOnTasksScreen(tasksName);
  });
});
