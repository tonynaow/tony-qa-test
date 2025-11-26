import { test, expect } from '@playwright/test';

interface CustomEndpointResource {
  id?: number | string;
  name: string;
  path: string;
  method: string;
  response_data: Record<string, unknown>;
  status_code: number;
  headers: Record<string, unknown>;
  createdAt?: string;
}

interface CustomEndpointCreateResponse {
  data: CustomEndpointResource;
}

function isCreateResponse(body: unknown): body is CustomEndpointCreateResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    typeof (body as { data?: unknown }).data === 'object' &&
    (body as { data?: unknown }).data !== null
  );
}

// POST /custom-endpoints
// Goal: create a new custom endpoint and validate HTTP status + response body.
test('POST /custom-endpoints should create a new custom endpoint', async ({
  request,
}, testInfo) => {
  const uniqueSuffix = Date.now();

  const url = 'https://reqres.in/api/custom-endpoints';

  const payload: CustomEndpointResource = {
    name: `qa-endpoint-${uniqueSuffix}`,
    path: `/qa/path-${uniqueSuffix}`,
    method: 'GET',
    response_data: {},
    status_code: 200,
    headers: {
      'x-data-form': 'test',
    },
  };

  const response = await request.post(url, {
    headers: {
      // x-api-key is provided globally via Playwright extraHTTPHeaders
      'Content-Type': 'application/json',
    },
    data: payload,
  });

  const rawBody = (await response.json()) as unknown;

  // Attach detailed request/response info to the HTML report
  await test.step('Log API call', async () => {
    await testInfo.attach('POST /custom-endpoints - request', {
      contentType: 'application/json',
      body: JSON.stringify(
        {
          method: 'POST',
          url,
          headers: {
            // x-api-key is applied globally via Playwright extraHTTPHeaders
            'Content-Type': 'application/json',
          },
          body: payload,
        },
        null,
        2,
      ),
    });

    await testInfo.attach('POST /custom-endpoints - response', {
      contentType: 'application/json',
      body: JSON.stringify(
        {
          status: response.status(),
          ok: response.ok(),
          headers: await response.headers(),
          body: rawBody,
        },
        null,
        2,
      ),
    });
  });

  await expect.soft(response).toBeOK();
  expect(response.status(), 'Status code should be 201 Created').toBe(201);
  expect(payload.name).toContain('qa-endpoint-');
  expect(payload.path).toContain('/qa/path-');
  expect(payload.method).toBe('GET');
  expect(payload.status_code).toBe(200);

  let resource: CustomEndpointResource;
  if (isCreateResponse(rawBody)) {
    resource = rawBody.data;
  } else {
    resource = rawBody as CustomEndpointResource;
  }

  expect(resource.name, 'Response name should match payload name exactly').toBe(payload.name);
  expect(resource.path, 'Response path should match payload path exactly').toBe(payload.path);
  expect(resource.method, 'Response method should match payload method').toBe(payload.method);
  expect(resource.status_code, 'Response status_code should match payload').toBe(
    payload.status_code,
  );

  expect(resource.response_data, 'response_data should match payload').toEqual(
    payload.response_data,
  );

  expect(resource.headers).toBeDefined();
  expect(resource.headers).toHaveProperty('x-data-form');
  expect(resource.headers['x-data-form']).toBe(payload.headers['x-data-form']);
  expect(typeof resource.name).toBe('string');
  expect(typeof resource.path).toBe('string');
  expect(typeof resource.method).toBe('string');
  expect(typeof resource.status_code).toBe('number');
  expect(resource).toHaveProperty('id');
  expect(resource).toHaveProperty('createdAt');
});
