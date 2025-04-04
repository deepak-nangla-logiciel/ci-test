const { faker } = require("@faker-js/faker");
const { login } = require("../../../../utils/loginAndHomepage");
const calendarsPage = require("../../../../test/pageobjects/calendarsPage");
const calendartestdata = require("../../../../resources/testdata/calendarstestdata.json");

let eventTitle;

beforeEach(async () => {
  // Create an event
  eventTitle = await calendarsPage.createEvent(calendartestdata.calendarTextValue, faker.lorem.word());
  // Log in
  await login();
});

describe("SALESPRO-TC-865", () => {
  it("Import Calendars and View Calendar", async () => {
    // Import the calendar
    await calendarsPage.importCalendar(calendartestdata.calendarTextValue);
    // Verify the event on the calendar
    await calendarsPage.setCalendar(eventTitle);
  });
});
