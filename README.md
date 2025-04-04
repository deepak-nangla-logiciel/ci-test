# SalesPro Mobile Test Automation

Appium/WebdriverIO end-to-end test automation covering the top user flows for SalesPro

## Adding Cases
To get started adding cases, [AddingCases.md](./docs/AddingCases.md)

## Getting Started

Clone this repository to your local development environment

### Install Dependencies

```shell
pnpm  install
```

### Set Up SalesPro App Locally and Copy App to your Project Config 

1. Clone the salespro-ios repo to your local development environment
2. Install XCode and open the salespro-ios repo
3. Install XCode Dependencies

```shell
pod  install
```

4. Switch to the branch of SalesPro iOS you want to test
5. Select a device from the list of simulators in the top center of the app
6. Click the Play button to start a build. SalesPro should open in the emulator.
7. You can copy the latest app build using either of these methods:

   **Method 1 - Automated Script:**
   ```shell
   ./scripts/copy_latest_build.sh
   ```
   This script will:
   - Automatically detect your system username
   - Find the latest build in DerivedData folder
   - Copy the Leap.app to config/apps directory
   - Handle any existing app files and provide status messages

   If you get a "Permission denied" error, make the script executable first:
   ```shell
   chmod +x scripts/copy_latest_build.sh
   ```

   **Method 2 - Manual Copy:**
   Copy the Application file created at Library > Developer > Xcode > DerivedData > Estimate_Pro(latest) > Build > Products > Debugging-iphonesimulator > Leap to your project at salespro-mobile-testing > config > apps

### Additional Config and Setup

 1. Create an .env file in your leap-mobile-testing and retrieve the values from 1Password Dev vault.
 2. Install Appium 
 ```shell
pnpm  i  --location=global  appium
```

### Run the Tests

From salespro-mobile-testing, run the tests with the scripts in package.json

-  **`test`**: Runs the WebDriverIO tests using the default configuration.

Usage: `pnpm run test`

  

-  **`test:dev`**: Runs the tests in the development environment by setting the `NODE_ENV` to `dev`.

Usage: `pnpm run test:dev`

  

-  **`test:stage`**: Executes the tests in the staging environment by setting the `NODE_ENV` to `stage`.

Usage: `pnpm run test:stage`

  

-  **`test:hotfix`**: Runs the tests for the hotfix environment, with `NODE_ENV` set to `hotfix`.

Usage: `pnpm run test:hotfix`

  

-  **`test:prod`**: Executes the tests in the production environment by setting the `NODE_ENV` to `production`.

Usage: `pnpm run test:prod`

  

#### Notes:

- These scripts leverage `NODE_ENV` to dynamically adjust the testing environment.


### Writing Tests: Use Appium Inspector to Find Locators

Use Appium Inspector alongside the Simulator to identify Accessibility IDs for elements

1. Download Appium Inspector or Appium Inspector 2.
2. Turn on the Appium server: in the terminal run
```shell
appium
```
3. Open Appium Inspector
4. Match the capabilities in the Appium Inspector to your wdio.conf.js file  
5. Run the Inspector
6. Click elements to identify their Accessibility ID
7. As needed, refresh the view to reflect a different screen on your simulator


### Generating reports with Mocha-awesome

#### Automatic Report Generation
Reports are now automatically generated after each test run. The system will:
1. Detect your operating system (Mac/Linux or Windows)
2. Use the appropriate command with or without `sudo` as needed
3. Generate reports in the following locations:
   - Individual test reports: `./runtime/reports/mochawesome/`
   - Combined report: `./runtime/reports/combined-report.json`
   - HTML report: `./runtime/reports/html/report.html`

#### Manual Report Generation
If you need to generate reports manually, follow these steps:

1. Execute the tests first.

2. Then run the below command:

For Mac OS/Linux:

```shell
sudo npx mochawesome-merge ./runtime/reports/mochawesome/*.json > ./runtime/reports/combined-report.json
```

For Windows:

```shell
npx mochawesome-merge ./runtime/reports/mochawesome/*.json > ./runtime/reports/combined-report.json
```

3. Then after run the below command:

```shell
npx marge ./runtime/reports/combined-report.json --reportDir ./runtime/reports/html --reportFilename report.html
```

4. The report.html named file should be available under /salespro-mobile-testing/reports/html/report.html

### Install rimraf to clean runtime folder

  

pnpm add rimraf -D