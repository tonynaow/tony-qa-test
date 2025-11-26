import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/api',
  use: {
    baseURL: 'https://reqres.in/api',
    extraHTTPHeaders: {
      // Default API key for ReqRes; can be overridden with REQRES_API_KEY env var
      'x-api-key': process.env.REQRES_API_KEY ?? 'reqres-free-v1',
    },
  },
  reporter: [['html', { outputFolder: 'playwright-report-api', open: 'never' }]],
  timeout: 30_000,
});
