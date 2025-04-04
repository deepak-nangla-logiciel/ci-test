const AuthUtils = require("../../../../utils/leapCRMLogin");
const appointmentCRMPage = require("../../../../test/pageobjects/appointmentCRMPage");
const { login, navigateToCustomersScreen } = require("../../../../utils/loginAndHomepage");
const { faker } = require("@faker-js/faker");

let accessToken;
let appointmentId;
let customerId;

describe("LDEV-TC-4", () => {

  // Login and fetch access token before running tests
  before(async () => {
    accessToken = await AuthUtils.login(
      process.env.LEAP_USERNAME,
      process.env.LEAP_PASSWORD
    );
  });

  it("Customers - Today's Appointments -Verify appointments set via LeapCRM appear", async () => {
    // Generate random data for the customer and appointment
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const customerName = `${firstName} ${lastName}`;
    const testEmail = process.env.LEAP_USERNAME;
    const tradeId = process.env.TRADE_ID;
    const appointmentTitle = faker.lorem.words(1);

    // Step 1: Create customer and job from the Leap CRM web application via API
    const customerAndJobResponse =
      await appointmentCRMPage.createCustomerAndJob({
        accessToken,
        firstName,
        lastName,
        testEmail,
        tradeId,
      });

    const { jobId, customerId: createdCustomerId, customerFullName } =
      customerAndJobResponse;

    customerId = createdCustomerId;

    // Validate the response
    expect(jobId).toBeDefined();
    expect(customerId).toBeDefined();
    expect(customerFullName).toBe(`${firstName} ${lastName}`);

    // Set a fixed start time (for example, 9:00 AM today)
    const startDateTime = new Date();
    startDateTime.setHours(9, 0, 0, 0); // Set to 9:00 AM today

    // Set a fixed end time (1 hour after the start time, so 10:00 AM today)
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // End time: 1 hour after start time

    // Format the dates to match the expected format
    const formattedStartDateTime = startDateTime
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    const formattedEndDateTime = endDateTime
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    // Step 3: Create an appointment for the customer and job on the Leap CRM web application via API
    const appointmentResponse = await appointmentCRMPage.createAppointment({
      appointmentTitle,
      accessToken,
      customerId,
      jobId,
      startDateTime: formattedStartDateTime,
      endDateTime: formattedEndDateTime,
    });

    appointmentId = appointmentResponse.appointmentId; // Save appointmentId for potential cleanup

    // Validate the appointment creation response
    expect(appointmentId).toBeDefined();

    // Step 4: Login to the Sales Pro mobile app and verify the appointment on Customer and Calendar pages
    await login(process.env.LEAP_USERNAME, process.env.PASSWORD);
    // Wait for the app to load and display the dashboard
    await browser.pause(10000);

    // Verify the appointment on the Customer and Calendar pages
    await appointmentCRMPage.verifyAppointmentOnSalesProApp({
      customerName,
    });
    // Navigate to the Customers screen
    await navigateToCustomersScreen();
  });
});

after(async () => {
  // Delete the customer and job after the test if it was created
  if (customerId) {
    await appointmentCRMPage.deleteCustomerAndJob({
      accessToken,
      customerId,
      note: faker.lorem.sentence(1),
      password: process.env.LEAP_PASSWORD,
    });
  }
});