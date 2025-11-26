# tony-qa-mobile-wdio

Automated testing project including:
- Mobile UI tests with **WebdriverIO + Appium + Cucumber** on the Wikipedia Alpha Android app (APK).
- API tests with **Playwright** on the public **Reqres** API.
- HTML reports: **Allure** for UI and **Playwright HTML reporter** for API.

## 1. Prerequisites

### General tools
- **Node.js** >= 18
- **npm** (installed with Node)
- **Git** (to clone the repository)

### For mobile UI tests (WDIO + Appium)
- **Java JDK** (8 or higher) installed and available in the `PATH`.
- **Android SDK** installed (Android Studio or SDK Tools).  
  - Environment variables configured:
    - `ANDROID_HOME` (or `ANDROID_SDK_ROOT`)
    - Add `platform-tools` and `tools` to your `PATH`.
- An **Android emulator** or a **physical device**:
  - API level compatible with the `app-alpha-universal-release.apk` APK.
  - The device must be visible via `adb devices`.
- **Appium server** installed globally (Appium 2 recommended):
  ```bash
  npm install -g appium
  appium driver install uiautomator2
  ```
- **Allure Commandline** to generate/open UI reports:
  ```bash
  npm install -g allure-commandline
  ```

### For API tests (Playwright)
- No specific browser dependency is required for these API tests, but you must install the Playwright binaries:
  ```bash
  npx playwright install
  ```


## 2. Run mobile UI tests (WDIO + Appium)

Main command:

```bash
npm run wdio
```

This command:
- Uses `wdio.conf.ts` with the Cucumber framework.
- Runs `.feature` scenarios located in `test/features`.
- Generates Allure results in the `allure-results` folder.

### Generate and open Allure report (UI)

After running the UI tests:

```bash
npm run report:ui
```

This will:
- Generate the report in `allure-report/`.
- Open the Allure report in your browser.

(Separately, you can use `npm run allure:generate` then `npm run allure:open`.)

## 3. Run API tests (Playwright)

### Execute API tests

```bash
npm run test:api
```

This command:
- Uses `playwright.config.ts`.
- Runs the tests located in `test/api/` against the `https://reqres.in/api` endpoint.
- Generates an HTML report in `playwright-report-api/`.

### Open API HTML report

```bash
npm run report:api
```

This opens the generated Playwright report in your browser.

## 4. Linting & Formatting

- **TypeScript linting**:
  ```bash
  npm run lint
  ```

- **Code formatting (Prettier)**:
  ```bash
  npm run format
  ```

## 5. Summary of npm scripts

In `package.json`:

- `npm run wdio`: run mobile UI tests (WebdriverIO + Appium + Cucumber).
- `npm run report:ui`: generate and open the UI Allure report.
- `npm run test:api`: run Playwright API tests.
- `npm run report:api`: open the Playwright HTML report.
- `npm run lint`: run ESLint.
- `npm run format`: run Prettier.

## 6. Notes

- Cucumber timeouts are configured in `wdio.conf.ts` (`cucumberOpts.timeout`). They have been increased to support scenarios with several manual scrolls.
- The test APK file is located in the `apk/` folder and is referenced in `wdio.conf.ts` as `app-alpha-universal-release.apk`.
- Adjust the API level and emulator configuration if needed so that the app starts correctly.
