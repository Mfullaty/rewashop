# Demo For Initializing the Payment

https://shop.saferpay.eu/saferpayintegration/pp_initialize.php

## Browser Request

URL: https://shop.saferpay.eu:443/saferpayintegration/pp_initialize.php
Method: GET
Parameters:

```json
{
    "PHPSESSID": "4a1acf843a6fe579b8784469e535f55c"
}
```

## Web Server Session

```json
{
    "token": false,
    "status": "initialized",
    "id": false,
    "offerId": false,
    "alias": false,
    "action": false,
    "created": 1776857638,
    "updated": 1776857638,
    "paymentMethod": false,
    "currency": "EUR",
    "amount": "245",
    "capture": {
        "finalized": false,
        "list": []
    },
    "recurring": false
}
```

## Request

URL: https://test.saferpay.com/api/payment/v1/PaymentPage/Initialize
Method: POST
Parameters:

```json
{
    "TerminalId": "17869305",
    "Payment": {
        "Amount": {
            "Value": "245",
            "CurrencyCode": "EUR"
        },
        "OrderId": 4,
        "Description": "Test Order #4"
    },
    "Notification": {
        "SuccessNotifyUrl": "https://shop.saferpay.eu:443/saferpayintegration/status_safp_success_notify.php?sessionId=4",
        "FailNotifyUrl": "https://shop.saferpay.eu:443/saferpayintegration/status_safp_fail_notify.php?sessionId=4"
    },
    "Payer": {
        "BillingAddress": {
            "FirstName": "John",
            "LastName": "Doe",
            "Email": "john.doe@provider.com",
            "CountryCode": "de"
        }
    },
    "Order": {
        "Items": [
            {
                "Type": "DIGITAL",
                "Quantity": 1,
                "Name": "Test product",
                "UnitPrice": 245
            }
        ]
    },
    "RiskFactors": {
        "DeliveryType": "HOMEDELIVERY",
        "PayerProfile": {
            "HasAccount": false,
            "HasPassword": false,
            "FirstName": "John",
            "LastName": "Doe",
            "DateOfBirth": "1990-12-17",
            "Gender": "MALE",
            "Email": "john.doe@provider.com",
            "Phone": {
                "Main": "+411234509876",
                "Mobile": "+410987612345"
            }
        }
    },
    "RequestHeader": {
        "SpecVersion": "1.48",
        "CustomerId": "242225",
        "RequestId": "a9ef8b265048fceff8cb4c7316798886",
        "RetryIndicator": 0,
        "ClientInfo": {
            "ShopInfo": "My Shop",
            "OsInfo": "Windows Server 2013"
        }
    },
    "ReturnUrl": {
        "Url": "https://shop.saferpay.eu:443/saferpayintegration/status_redirect.php?sessionId=4"
    }
}
```

## Browser Requested

URL: https://shop.saferpay.eu:443/saferpayintegration/pp_initialize_submit.php
Method: POST
Parameters:

```json
{
    "requestParams": "{\"TerminalId\":\"17869305\",\"Payment\":{\"Amount\":{\"Value\":\"245\",\"CurrencyCode\":\"EUR\"},\"OrderId\":4,\"Description\":\"Test Order #4\"},\"Notification\":{\"SuccessNotifyUrl\":\"https:\\/\\/shop.saferpay.eu:443\\/saferpayintegration\\/status_safp_success_notify.php?sessionId=4\",\"FailNotifyUrl\":\"https:\\/\\/shop.saferpay.eu:443\\/saferpayintegration\\/status_safp_fail_notify.php?sessionId=4\"},\"Payer\":{\"BillingAddress\":{\"FirstName\":\"John\",\"LastName\":\"Doe\",\"Email\":\"john.doe@provider.com\",\"CountryCode\":\"de\"}},\"Order\":{\"Items\":[{\"Type\":\"DIGITAL\",\"Quantity\":1,\"Name\":\"Test product\",\"UnitPrice\":245}]},\"RiskFactors\":{\"DeliveryType\":\"HOMEDELIVERY\",\"PayerProfile\":{\"HasAccount\":false,\"HasPassword\":false,\"FirstName\":\"John\",\"LastName\":\"Doe\",\"DateOfBirth\":\"1990-12-17\",\"Gender\":\"MALE\",\"Email\":\"john.doe@provider.com\",\"Phone\":{\"Main\":\"+411234509876\",\"Mobile\":\"+410987612345\"}}},\"RequestHeader\":{\"SpecVersion\":\"1.48\",\"CustomerId\":\"242225\",\"RequestId\":\"a9ef8b265048fceff8cb4c7316798886\",\"RetryIndicator\":0,\"ClientInfo\":{\"ShopInfo\":\"My Shop\",\"OsInfo\":\"Windows Server 2013\"}},\"ReturnUrl\":{\"Url\":\"https:\\/\\/shop.saferpay.eu:443\\/saferpayintegration\\/status_redirect.php?sessionId=4\"}}",
    "sessionId": "4",
    "PHPSESSID": "4a1acf843a6fe579b8784469e535f55c"
}
```

## Executed API Request

URL: https://test.saferpay.com/api/Payment/v1/PaymentPage/Initialize
Method: POST
Parameters:

```json
{
    "TerminalId": "17869305",
    "Payment": {
        "Amount": {
            "Value": "245",
            "CurrencyCode": "EUR"
        },
        "OrderId": 4,
        "Description": "Test Order #4"
    },
    "Notification": {
        "SuccessNotifyUrl": "https://shop.saferpay.eu:443/saferpayintegration/status_safp_success_notify.php?sessionId=4",
        "FailNotifyUrl": "https://shop.saferpay.eu:443/saferpayintegration/status_safp_fail_notify.php?sessionId=4"
    },
    "Payer": {
        "BillingAddress": {
            "FirstName": "John",
            "LastName": "Doe",
            "Email": "john.doe@provider.com",
            "CountryCode": "de"
        }
    },
    "Order": {
        "Items": [
            {
                "Type": "DIGITAL",
                "Quantity": 1,
                "Name": "Test product",
                "UnitPrice": 245
            }
        ]
    },
    "RiskFactors": {
        "DeliveryType": "HOMEDELIVERY",
        "PayerProfile": {
            "HasAccount": false,
            "HasPassword": false,
            "FirstName": "John",
            "LastName": "Doe",
            "DateOfBirth": "1990-12-17",
            "Gender": "MALE",
            "Email": "john.doe@provider.com",
            "Phone": {
                "Main": "+411234509876",
                "Mobile": "+410987612345"
            }
        }
    },
    "RequestHeader": {
        "SpecVersion": "1.48",
        "CustomerId": "242225",
        "RequestId": "a9ef8b265048fceff8cb4c7316798886",
        "RetryIndicator": 0,
        "ClientInfo": {
            "ShopInfo": "My Shop",
            "OsInfo": "Windows Server 2013"
        }
    },
    "ReturnUrl": {
        "Url": "https://shop.saferpay.eu:443/saferpayintegration/status_redirect.php?sessionId=4"
    }
}
```

## API Response

Execution time: 969.93ms
HTTP status code: 200 OK
Body:

```json
{
    "ResponseHeader": {
        "SpecVersion": "1.48",
        "RequestId": "a9ef8b265048fceff8cb4c7316798886"
    },
    "Token": "obdz7jkqh7tsfscn2fqab7j13",
    "Expiration": "2026-04-22T14:36:49.737+02:00",
    "RedirectUrl": "https://test.saferpay.com/vt2/api/PaymentPage/242225/17869305/obdz7jkqh7tsfscn2fqab7j13"
}
```

## Client redirection

URL extracted from API answer: https://test.saferpay.com/vt2/api/PaymentPage/242225/17869305/s2rwdg24kis7lougwi9qne830

To be displayed on the client in an iFrame, fullsize redirect, or, like in this case, as a lightbox:
