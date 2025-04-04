const {
  launchSettingsApp,
} = require("../salespro-mobile-testing/utils/setupAppSettings");
const { generateReports } = require("./utils/reportGenerator");
const path = require("path");
exports.config = {
  runner: 'local',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  reporters: ['spec'],
  services: [
    ['appium', {
      args: {
        address: 'localhost',
        port: 4723,
      },
      logPath: './runtime/logs'
    }]
  ],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  outputDir: "./runtime/logs", // Logs directory
  appium: {
    command: "appium",
    args: {
      relaxedSecurity: true, // Allow relaxed security for Appium
      "--session-override": true,
    },
  },

  before: async function (capabilities, specs) {
    await launchSettingsApp();
  },

  beforeTest: function (test, context) {},

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      const testTitle = test.title.replace(/[^a-zA-Z0-9]/g, "_");
      const path = `runtime/screenshots/${testTitle}.png`;
      await browser.saveScreenshot(path);
    }
  },

  after: function (result, capabilities, specs) {
    // Code to execute after all tests
  },
  onComplete: async function () {
    console.log("Quitting the Appium driver...");
    if (global.browser) {
      await browser.deleteSession(); // Quit Appium session
    }
    
    try {
      await generateReports();
    } catch (error) {
      console.error('Failed to generate reports:', error);
    }
  },
};
