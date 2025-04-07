exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    port: 4723,
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPad Pro 13-inch (M4)',
        'appium:platformVersion': '17.4', // Update this to match your iOS version
        'appium:app': './app/Leap.app', // Update this with your app path
        'appium:noReset': false
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 300000,
    connectionRetryTimeout: 200000,
    connectionRetryCount: 3,
    outputDir: './runtime/logs',
    services: [
        ['appium', {
            logPath: './runtime/logs',
            command: 'appium',
            args: {
                relaxedSecurity: true,
                address: 'localhost',
                port: 4723,
                '--session-override': true
            }
        }]
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: './runtime/reports/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000,
        retries: 2
    },
    beforeTest: function (test, context) {
        // Add any setup code here
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const testTitle = test.title.replace(/[^a-zA-Z0-9]/g, '_');
            const path = `runtime/screenshots/${testTitle}.png`;
            await browser.saveScreenshot(path);
        }
    },
    onComplete: async function() {
        console.log('Quitting the Appium driver...');
        if (global.browser) {
            await browser.deleteSession();
        }
    }
} 