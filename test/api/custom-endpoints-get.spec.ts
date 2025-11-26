import { test, expect } from '@playwright/test';

// Types for the expected shape of the GET /custom-endpoints response
interface CustomEndpointSummary {
  id: number | string;
  name: string;
  [key: string]: unknown;
}

interface CustomEndpointsListResponse {
  data?: CustomEndpointSummary[];
  _meta?: {
    powered_by?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// GET /custom-endpoints
// validate HTTP status + basic structure of the response body.
test('GET /custom-endpoints should return a list of custom endpoints', async ({
  request,
}, testInfo) => {
  const url = 'https://reqres.in/api/custom-endpoints';

  const response = await request.get(url);

  const body = (await response.json()) as CustomEndpointsListResponse;

  // Attach detailed request/response info to the HTML report
  await test.step('Log API call', async () => {
    await testInfo.attach('GET /custom-endpoints - request', {
      contentType: 'application/json',
      body: JSON.stringify(
        {
          method: 'GET',
          url,
          // Header will be applied automatically via Playwright extraHTTPHeaders
        },
        null,
        2,
      ),
    });

    await testInfo.attach('GET /custom-endpoints - response', {
      contentType: 'application/json',
      body: JSON.stringify(
        {
          status: response.status(),
          ok: response.ok(),
          headers: await response.headers(),
          body,
        },
        null,
        2,
      ),
    });
  });

  // HTTP assertions
  await expect.soft(response).toBeOK();
  expect(response.status(), 'Status code should be 200 OK').toBe(200);
  expect(typeof body).toBe('object');

  if (body.data) {
    expect(Array.isArray(body.data)).toBe(true);

    const dataArray = body.data;

    if (dataArray.length > 0) {
      const first = dataArray[0];

      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('name');
      const firstRecord = first as Record<string, unknown>;

      if ('year' in firstRecord) {
        expect(typeof firstRecord.year).toBe('number');
      }
      if ('color' in firstRecord) {
        expect(typeof firstRecord.color).toBe('string');
      }
      if ('pantone_value' in firstRecord) {
        expect(typeof firstRecord.pantone_value).toBe('string');
      }
    }
  }

  if (body._meta) {
    expect(body._meta).toHaveProperty('powered_by');
  }
});
