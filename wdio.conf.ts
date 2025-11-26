import * as path from 'path';

const apkPath = path.join(process.cwd(), 'apk', 'app-alpha-universal-release.apk');

export const config: WebdriverIO.Config = {
  runner: 'local',

  specs: ['./test/features/**/*.feature'],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android Emulator',

      // APK to install / launch
      'appium:app': apkPath,
      'appium:appPackage': 'org.wikipedia.alpha',
      'appium:appActivity': 'org.wikipedia.main.MainActivity',
      'appium:appWaitActivity': 'org.wikipedia.*',

      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'cucumber',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ['./test/steps/*.ts'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 300000,
    ignoreUndefinedDefinitions: false,
  },

  services: [
    [
      'appium',
      {
        command: 'appium',
      },
    ],
  ],
};
