const { config } = require('./wdio.shared.conf');

exports.config = {
    ...config,
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': process.env.DEVICE_NAME || 'iPhone 15',
        'appium:platformVersion': process.env.PLATFORM_VERSION || '17.0',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.APP_PATH
    }]
};
