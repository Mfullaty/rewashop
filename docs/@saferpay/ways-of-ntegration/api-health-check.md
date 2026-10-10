# API Health Check

The API "Health check" is used to determine, whether the Saferpay environments are generally available. This function is available for test and production respectively and involves a simple **GET** call to the following URL:

- **Live:** `https://www.saferpay.com/api/health/[YOUR CUSTOMERID]`
- **Test:** `https://test.saferpay.com/api/health/[YOUR CUSTOMERID]`

When using the Health check API, you agree to the following rules:

- Do not poll the API status without any limitation (see below).
- Restrict yourself to 1 request every 5 minutes.
- Do not check the API status before every transaction.

In case of violation, Saferpay reserves the right to limit access to this API.

The API responds in two ways:

## Success

The success case returns `200 (OK)`.

```json
{
    "Status": "PASS"
}
```

## Failure

The failure case depends on what is happening, but in case of an unavailability of the Saferpay Service, the response-code would simply be anything else than `200(OK)`.
