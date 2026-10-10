# Dynamic Currency Conversion

Dynamic Currency Conversion (DCC) is a service that allows international customers to pay the purchase price in the local currency or their home currency. DCC is available for Worldline acceptance contracts with DCC expansion, via the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page) or the [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) flows. For this, the terminal used for making the payment request receives a base currency in which all transactions are settled. Via DCC, international customers are shown the purchase price in the base currency and the current exchange rate in their national currency. The customer can then decide the currency in which the payment is to be made. Saferpay automatically handles this step during the redirect.

#### Supported Payment Methods

The following payment methods do support DCC:

- [Mastercard](https://docs.saferpay.com/home/integration-guide/payment-methods/mastercard) **(only via Worldline Acquiring)**
- [Maestro](https://docs.saferpay.com/home/integration-guide/payment-methods/maestro) **(only via Worldline Acquiring)**
- [Visa/V PAY](https://docs.saferpay.com/home/integration-guide/payment-methods/visa-and-vpay) **(only via Worldline Acquiring)**

#### Example of the DCC Screen

![(click to enlarge)](https://3537448238-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fzpi9teY7Tm2pCZ1Bw8zO%2Fuploads%2FBQC9Cp8rNpm2tojiFcIQ%2FDCC_Screen.png?alt=media&token=8f37df4c-651e-4ade-bbab-6ae148881dc8)

## DCC Compliance

While DCC itself is performed automatically, the card schemes require, that the merchant shares the DCC information to the payer, if DCC was performed. The merchant must share the following information:

- The original amount and currency
- The DCC amount and currency
- The exchange rate
- The markup rate

### How to gather the DCC information via API

Besides the original transaction amount, which is set by the merchant beforehand, Saferpay does return all the DCC related information inside the DCC container, together with the rest of the transaction data, e.g. via the [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), or [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize).

#### Example of a DCC response

```json
"Dcc": {
    "PayerAmount": {
      "Value": "352",
      "CurrencyCode": "JPY"
    },
    "Markup": "3%",
    "ExchangeRate": "1.234"
  }
```

### Payer notification options

You -the merchant- have different options, when it comes to notifying the payer about DCC:

1. With the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), you can use its built in payer notification system by filling out the **`Notification.PayerEmail`** parameter. This will send a notification e-mail to the specified address, containing all necessary data. Alternatively, the parameter **`Notification.PayerDccReceiptEmail`** (API Spec version 1.35 or higher is required) can be used instead. In contrast to **`Notification.PayerEmail`**, an email is only sent when a DCC transaction was processed. If both parameters are used, only one email will still be sent (in the case of a DCC transaction, an email will be sent to the address in the Notification.PayerDccReceiptEmail parameter. If no DCC is performed, the address from the Notification.PayerEmail parameter will be used instead).
2. The parameter **`Notification.PayerDccReceiptEmail`** can be used (API Spec version 1.35 or higher is required). \
   An email is only sent in case of a DCC transaction, and in this case it replaces the **`Notfication.PayerEmail`,** containing only the necessary information for the DCC compliance.
3. Alternatively, you can of course send your own email and use the data provided by the API (API Spec version 1.27 or higher is required), as described above.
4. If #1, #2 and #3 are no options to you, if there were complications, or if you simply want to trigger the Saferpay notification again, you can also [trigger the notification from the transaction details inside the Saferpay Backoffice](https://docs.saferpay.com/home/interfaces/backoffice/transactions/journal-details#notification).

## Find out if DCC is active

You can access this information on a per [terminalId](https://docs.saferpay.com/home/master/common-saferpay-terms-glossary#terminalid) basis, by logging into the Saferpay Backoffice and check the terminal-configuration under [Settings => Terminals](https://docs.saferpay.com/home/interfaces/backoffice/settings#payment-means-terminals).

## Custom DCC selection-screen.

If you want to, you can also build your own DCC selection screen, by [using our DCC Inquire Interface](https://docs.saferpay.com/home/licences-and-interfaces/inquire-interface#dcc-inquire).
