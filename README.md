# iOS App Testing with WebdriverIO and Appium

This project contains automated tests for iOS app using WebdriverIO and Appium.

## Prerequisites

- Node.js (v14 or higher)
- Xcode (latest version)
- iOS Simulator
- Appium

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the `wdio.conf.js` file with your app-specific configuration:
   - Update `platformVersion` to match your iOS version
   - Update `app` path to point to your .app file
   - Update `deviceName` if you want to use a specific simulator

3. Install Appium and required drivers:
```bash
npm install -g appium
appium driver install xcuitest
appium driver install uiautomator2
```

## Running Tests

1. Start Appium server:
```bash
npm run appium
```

2. In a new terminal, run the tests:
```bash
npm test
```

For debugging:
```bash
npm run test:debug
```

## Project Structure

```
.
├── test/
│   ├── specs/           # Test files
│   └── pageobjects/     # Page objects
├── app/                 # Place your .app file here
├── wdio.conf.js        # WebdriverIO configuration
└── package.json
```

## Writing Tests

1. Create page objects in `test/pageobjects/`
2. Create test files in `test/specs/`
3. Use the provided base page object for common functionality

## Best Practices

- Use page objects pattern for better maintainability
- Keep tests atomic and independent
- Use meaningful test and variable names
- Add comments for complex logic
- Use explicit waits instead of hard delays 