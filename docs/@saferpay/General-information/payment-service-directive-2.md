# Payment Service Directive 2 - PSD2

With the introduction of PSD2 within the EU, the ruleset for doing card transactions, has been changed in many ways. Specifically the need for **S**trong **Cu**stomer **A**uthentication needs special attention from merchants. This chapter will contain important information on PSD2 and SCA specifically.

## Does PSD2 apply to me?

The first step, is to figure out, if PSD2 applies to you -the merchant- in the first place. Important to know is, that PSD2 is valid for all countries inside the EEA (European Economic Area), which is **NOT the same as the European Union!** However the important part is, where you have signed your acquiring contract. When signing a card acceptance contract with an Acquirer, you have to pay attention to the country in which the contract is signed. Should this country be inside the EEA, then PSD2 does apply to you. **This is also applies, if you -the merchant- have your company headquarters outside the EEA!**

However should PSD2 not apply to you, then you do not have to follow the rules for SCA. Even though we highly recommend doing 3D Secure, since it is also an anti-fraud measure, you can request an exemption, to avoid 3DS (see further below).

### API-response

Saferpay also tries to determine, whether or not a transaction has been inside the PSD2 scope. This information is then returned to you via the API, through the **Liability.InPsd2Scope** parameter.

```javascript
{
  "ResponseHeader": {
    "SpecVersion": "[current Spec-Version]",
    "RequestId": "[unique request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "Date": "2021-05-17T13:05:49.920+02:00",
    "Amount": {
      "Value": "245",
      "CurrencyCode": "EUR"
    },
    "OrderId": "0",
    "AcquirerName": "MasterCard Saferpay Test",
    "AcquirerReference": "05945355638",
    "SixTransactionReference": "0:0:3:f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "ApprovalCode": "292749",
    "IssuerReference": {
      "TransactionStamp": "767980829703",
      "SettlementDate": "0517"
    }
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "MASTERCARD",
      "Name": "MasterCard"
    },
    "DisplayText": "xxxx xxxx xxxx 0006",
    "Card": {
      "MaskedNumber": "xxxxxxxxxxxx0006",
      "ExpYear": 2021,
      "ExpMonth": 5,
      "HolderName": "John Doe",
      "CountryCode": "US",
      "HashValue": "0DBC2E4EB492F7AB4122602B46D60D89DEF51C8C"
    }
  },
  "Payer": {
    "IpAddress": "87.123.201.46",
    "IpLocation": "DE",
    "BillingAddress": {
      "FirstName": "John",
      "LastName": "Doe",
      "CountryCode": "de",
      "Email": "john.doe@provider.com"
    }
  },
  "Liability": {
    "LiabilityShift": true,
    "LiableEntity": "THREEDS",
    "ThreeDs": {
      "Authenticated": true,
      "Xid": "700a100f-5942-47a4-81ca-c3b0a9746fb2",
      "Version": "2",
      "AuthenticationType": "STRONG_CUSTOMER_AUTHENTICATION"
    },
    "InPsd2Scope": "NO"
  }
}
```

## When to do SCA?

As a rule of thumb, ask yourself the following question:

**Is the card holder present, to enter his/her card details, or otherwise be able to interact with your webshop/system? If so: SCA has to be performed, in any case!**

This also applies to card registrations, if the card holder is not present during the next, real, transaction!

Also make sure, that you use a flow, that can do SCA -in form of [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure)- in the first Place! Be it the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), the [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) or [a Standalone Secure Card Data Registration](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration) with an [ONLINE_STRONG check](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#the-check-function). Saferpay will always attempt 3D Secure and thus SCA!

**Your acquiring contract also has to support 3D Secure!** However most acquirers do not offer contracts without 3D Secure in the first place, without being explicitly asked for one. When in doubt: Ask your acquirer, if your contract is set up for 3D Secure, or not!

### Overview

PSD2 is very complex. So to give you an overview of what flows need and what do not need SCA, please refer to the following tables:

#### Transactions and flows, that DO need SCA

| Case                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Flows/Requests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Customer Initiated Transactions (CIT)     | This is your standard transaction-type. The card holder comes to the shop and orders something. The card holer is present during these transactions and as mentioned above, they must be covered with SCA and thus 3-D Secure!                                                                                                                                                                                                                                                                                                                                                 | [Payment Page Integration](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction interface Integration](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface), [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize) & [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize), [Payment Page Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) & [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert)                                                                                                                                             |
| Initial Recurring/Installment Transaction | This is a special type of Customer Initiated Transaction. With PSD2 the first (initial) transaction within a recurring-chain needs to be covered by SCA! Thus, we highly recommend forcing SCA (see further down in this chapter). Each subsequent transaction then references this transaction.                                                                                                                                                                                                                                                                               | [Recurring Integration](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/recurring-payments), [Payment Page Integration](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction Interface Integration](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface), [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize) & [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize), [Payment Page Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) & [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) |
| Saving Cards                              | <p>You must make sure, that SCA is performed during a card registration. This also includes such cases, where you do not intend on performing MITs and instead only want to provide a service, where your customer does not have to insert their card again.<br><br><strong>Note:</strong> The Payment Page and Transaction Interface perform 3DS automatically during the process. However note, that, if your intention is to maybe perform MITs, you must force SCA -see further down-. With normal CITs, this is not necessary, the default 3DS process is sufficient.</p> | [Standalone Secure Card Data registration](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration), [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface)                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Transactions and flows, that DO NOT need SCA

| Case                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Flows/Requests                                                                                                                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Merchant Initiated Transactions (MIT)        | Basically all transactions, that are triggered by Merchant, with the card holders consent, while not being present. **However: SCA has to be made, while acquiring the card details for this transaction, e.g. via a Secure Card Data registration (see above)!**                                                                                                                                                                                                                                                                                                                             | [Authorize Direct](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) e.g. using [an alias](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/secure-card-data)                                    |
| Subsequent Recurring/installment Transaction | These are transactions, that follow the initial recurring transaction (see above) and are a special type of Merchant initiated Transaction (see above). They must reference the initial transaction.                                                                                                                                                                                                                                                                                                                                                                                          | [Recurring Integration](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/recurring-payments), [Authorize Referenced](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeReferenced) |
| Mail Phone Order                             | Transactions, where the payment means are provided to the merchant via phone, or mail. **MPO transactions are out-of-scope of PSD2! SCA does not apply here!**                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                                                                                                                |
| One legged CIT transactions                  | Generally, we always recommend doing 3D Secure. However there are CITs, that do not need SCA. Cases are, if either the card issuer (bank of the card holder), or the Acquirer of the Merchant, are outside the EEA (European Economic Area)! However, what is important here for the latter, is, in which country the acquiring contract has been signed. For instance: If a swiss merchant signs a contract within germany and a german card holder comes to his shop, PSD2 does indeed apply, even though the merchant is not inside the EEA! However the card issuer and the acquirer are! | N/A                                                                                                                                                                                                                                                |

## How to force SCA

There are certain Cases, where SCA must be made, with no exception! Saferpay offers the option to force SCA during a transaction and you -the merchant- has to make sure, that the transaction (or registration) is covered by SCA in the following cases:

- **MITs via Card Alias:** If you intend on doing any kind of MIT, like [Recurring Payments](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/recurring-payments), via an alias, you must force SCA during the registration.
    - **Forcing SCA during a transaction:** When registering a card, during a transaction, be it via the [Transaction interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) or the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), you must force a 3D Secure Challanged flow, by also setting the **Authentication.ThreeDsChallenge** parameter to **FORCE**, within the respective Initialization request.
    - **Forcing SCA during a standalone registration:** In some cases, it may be viable to save a card first, but charge it way later down the line. However, those transactions are usually MIT, with the card holder not being present! Due to that, SCA has to be performed during registration, requiring a [Strong Online Check with SCA](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#the-check-function)!
- **Initial Recurring Transactions:** During an initial transaction, for [Recurring Payments](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/recurring-payments), SCA is automatically enforced, if either **`Payment.Recurring.Initial`** or **`Payment.Installment.Initial`** are set to **`true`**.

{% hint style="danger" %}
While these settings do cover 99% of all transactions, Worldline has been made aware of certain banks/issuers behaving in a non-compliant manner. Thusly, it can happen, that some transactions will be processed as frictionless, even though a challenge has been requested. Please always check the authentication result at the end of the transaction.

- **During a transaction:** Please check the **`Liability.ThreeDs.AuthenticationType`** parameter and make sure, that it is set to **_`STRONG_CUSTOMER_AUTHENTICATION.`_**
- **Standalone registration:** Please make sure, that **_`CheckResult.Authentication.Result`_** is **_`OK`_**.

This behavior is currently out of the control of Worldline Saferpay and has been reported.
{% endhint %}

{% hint style="danger" %}
Forcing SCA during the first transaction/registration, does NOT excuse you from doing SCA/3D Secure afterwards, if you intend on doing CITs with a saved card! There are exemptions (see below), but those also have their own set of rules to follow!
{% endhint %}

{% hint style="warning" %}
Forcing SCA is only possible with [Visa/Vpay](https://docs.saferpay.com/home/integration-guide/payment-methods/visa-and-vpay), [Mastercard](https://docs.saferpay.com/home/integration-guide/payment-methods/mastercard)/[Maestro](https://docs.saferpay.com/home/integration-guide/payment-methods/maestro) and [American Express](https://docs.saferpay.com/home/integration-guide/payment-methods/american-express)! **Other card-brands are currently NOT MIT-compliant under PSD2 and thusly cannot be used in this way!**
{% endhint %}

{% hint style="info" %}
This only applies, if you intend on doing MITs right after the registration! However if you plan on using the Alias for CITs with 3DS -and thus SCA- beforehand, or only that, then you do not have to consider this!
{% endhint %}

{% hint style="info" %}
If you have a high risk business, or generally want a higher level of protection against fraud, you can, of course, force SCA too!
{% endhint %}

{% hint style="info" %}
If you have previously created aliases, without the necessary SCA-Info attached, you can perform a transaction with forced SCA and Saferpay will automatically update the Alias, with the SCA-data, so you may use the Alias for MITs.
{% endhint %}

## SCA Exemptions

SCA Exemptions are certain cases, where SCA either doesn't have to be applied, or cannot be applied! Transactions in these cases must be flagged accordingly, or they may be refused. Also, in any case, the merchant would perform transactions against the PSD2! The Exemption value may be submitted via the **Authentication.Exemption** parameter, within the respective initial request (see flows and requests column).

{% hint style="danger" %}
Do not submit exemptions on your own, without the consent of your Acquirer! The Acquirer otherwise has the right to deny these transsactions at any time!
{% endhint %}

{% hint style="danger" %}
Even if you are allowed to submit exemptions, you have to make sure, that your implementation generally follows the PSD2 rules!
{% endhint %}

{% hint style="danger" %}
When an exemption is granted, no [Liabilityshift through 3D Secure](https://docs.saferpay.com/home/integration-guide/3d-secure#what-is-liability-shift-and-why-is-it-important-for-me-as-a-merchant) is given! You, the merchant, will thus take full responsibility, in case of fraud!
{% endhint %}

{% hint style="warning" %}
&#x20;The issuing bank always has the right to reject a transaction and ask for a full transaction, with SCA. This also applies to Recurring Transactions. In these cases, the transaction will run into a **Soft decline (**[**see below**](#non-compliance)**).**

Furthermore, while it may seem so, 3D Secure will still be attempted (If the flow supports it!). You still have to do a redirect. Saferpay will forward your requested exemption to the bank and the bank will decide, whether they accept the exemption, or not.

If it is accepted, 3DS will be skipped and Saferpay will continue with the next step.&#x20;

If it is rejected, 3D Secure will still be performed, as normal.
{% endhint %}

| Exemption                                                 | Usecase                                                                                                                                                                                                                                                                                                                                                                                                                 | Flows and requests                                                                                                                                                                                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication.Exemption: "LOW_VALUE"**                 | <p>This transaction has an overall value of 30 Euros, or lower and thus does not fall under SCA by PSD2! However, that falls under certain rules:</p><ul><li>After 5 transactions, without SCA, SCA must be performed again!</li><li>After a cumulative value of 100,-, SCA must be performed again!</li></ul>                                                                                                          | [Payment Page Flow](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction Interface Flow](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) |
| **Authentication.Exemption: "TRANSACTION_RISK_ANALYSIS"** | <p> External Fraud Risk Analysis has been done and the transaction has been deemed at low risk.</p><p></p><p><strong>Tip:</strong> Interested in using such a tool? <a href="../licences-and-interfaces/fraud-intelligence/fraud-intelligence">Saferpay Fraud Intelligence</a> offers the possibility of automatically analyzing transactions and applying the TRA exemption for you, if applicable!</p>                | [Payment Page Flow](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction Interface Flow](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) |
| **Authentication.Exemption: "RECURRING"**                 | <p><strong>DO NOT USE THIS, IF YOU DO NOT KNOW, THAT YOU ARE ALLOWED TO O SO!</strong> </p><p></p><p>This is a special exemption for extreme edge-cases and does not necessarily do, what you think it does!</p>                                                                                                                                                                                                        |                                                                                                                                                                                                                                          |
| **Authentication.ThreeDsChallenge: "AVOID"**              | <p>A 3D Secure authentication should be avoided for this transaction!</p><p></p><p><strong>CAUTION:</strong> This value may only be used by merchants and transactions outside the PSD2 scope. <strong>Do not</strong> use this value, without evaluating, if PSD2 applies to you/the transaction, or not! Attempting a transaction inside the PSD2 scope, with avoidance, will lead to a soft decline (see below)!</p> | [Payment Page Flow](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction Interface Flow](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) |

## Special Cases

While Saferpay aims to make handling these cases as trivial, as possible, there are certain special cases, that deviate from the usual flows and integrations.

### Transferring SCA from and to Saferpay

{% hint style="danger" %}
This flow is only possible, if you are fully PCI certified!
{% endhint %}

In certain cases, it may be necessary to perform SCA through a system, that is not connected to Saferpay, or transfer existing SCA-data to an external system. While Saferpay **does not support the inclusion of external 3D Secure-systems**, it does support the transfer of the transaction stamp, once an authorization has been made with SCA. So please keep that in mind, since these two are not the same. The transaction-stamp is only returned by the bank on a successful authrorization of a card!

#### SCA transfer to Saferpay

The transfer of SCA-data to Saferpay is currently only supported, while doing MIT transactions, using [Authorize Direct](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) and a direct post of the card-data (**note the PCI-warning above!**). In order to reference the SCA-data, one must also submit the parameters **Authentication.IssuerReference.TransactionStamp** and **Authentication.IssuerReference.SettlementDate** (if applicable), alsongside the [Authorize Direct](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) request:

```javascript
{
  "RequestHeader": {
    "SpecVersion": "[current Spec-Version]",
    "CustomerId": "[your customer id]",
    "RequestId": "[unique request id]",
    "RetryIndicator": 0
  },
  "TerminalId": "[your terminal id]",
  "Payment": {
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    },
    "Description": "Test123",
    "PayerNote": "Order123_Testshop"
  },
  "PaymentMeans": {
    "Card": {
      "Number": "912345678901234",
      "ExpYear": 2015,
      "ExpMonth": 9,
      "HolderName": "Max Mustermann",
      "VerificationCode": "123"
    }
  },
  "Authentication": {
    "IssuerReference": {
      "TransactionStamp": "767980829703",
      "SettlementDate": "0517"
    }
  }
}
```

#### SCA transfer from Saferpay

Likewise, whenever a transaction is done with SCA, Saferpay will return these values, alongside the [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) and [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) authorization responses, inside the **Transaction.IssuerReference** container.

```javascript
{
  "ResponseHeader": {
    "SpecVersion": "[current Spec-Version]",
    "RequestId": "[unique request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "Date": "2021-05-17T13:05:49.920+02:00",
    "Amount": {
      "Value": "245",
      "CurrencyCode": "EUR"
    },
    "OrderId": "0",
    "AcquirerName": "MasterCard Saferpay Test",
    "AcquirerReference": "05945355638",
    "SixTransactionReference": "0:0:3:f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "ApprovalCode": "292749",
    "IssuerReference": {
      "TransactionStamp": "767980829703",
      "SettlementDate": "0517"
    }
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "MASTERCARD",
      "Name": "MasterCard"
    },
    "DisplayText": "xxxx xxxx xxxx 0006",
    "Card": {
      "MaskedNumber": "xxxxxxxxxxxx0006",
      "ExpYear": 2021,
      "ExpMonth": 5,
      "HolderName": "John Doe",
      "CountryCode": "US",
      "HashValue": "0DBC2E4EB492F7AB4122602B46D60D89DEF51C8C"
    }
  },
  "Payer": {
    "IpAddress": "87.123.201.46",
    "IpLocation": "DE",
    "BillingAddress": {
      "FirstName": "John",
      "LastName": "Doe",
      "CountryCode": "de",
      "Email": "john.doe@provider.com"
    }
  },
  "Liability": {
    "LiabilityShift": true,
    "LiableEntity": "ThreeDs",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "c54a264e-dae2-45ad-b784-3eaa6be6956c"
    }
  }
}
```

These values then can be transferred to the external system.

{% hint style="warning" %}
Not all external systems may support this feature!
{% endhint %}

## Non Compliance

What happens in case of non-compliance? With PSD2, every bank inside the EEA is now obliged to reject transactions, that are not PSD2-compliant.

So for instance, if you register card details for, for example, recurring payments, without enforcing SCA during the registration, the card holders bank is obliged to reject every MIT, as they are described above.

In these cases, a so called **Soft Decline** is thrown:

#### Example of a Soft Decline Error message with Mastercard

```javascript
{
"ResponseHeader": {
   "SpecVersion": "[current SpecVersion]",
   "RequestId": "[unique request id]"
 },
 "Behavior": "ABORT",
 "ErrorName": "PAYER_AUTHENTICATION_REQUIRED",
 "ErrorMessage": "Transaction declined by acquirer",
 "TransactionId": "llOKnfAEW57QSAErGdIYbAtAQ1fb",
 "ProcessorResult": "1A",
 "ProcessorMessage": "Additional customer authentication required"
}
```

#### Example of a Soft Decline Error message with Visa/American Express

```javascript
{
"ResponseHeader": {
   "SpecVersion": "[current SpecVersion]",
   "RequestId": "[unique request id]"
 },
 "Behavior": "ABORT",
 "ErrorName": "PAYER_AUTHENTICATION_REQUIRED",
 "ErrorMessage": "Transaction declined by acquirer",
 "TransactionId": "dOrvUAAWn16USAU8d08OA10A03SA",
 "ProcessorResult": "65",
 "ProcessorMessage": "Soft decline, SCA required"
}
```

### Test Cards

If you want to force a Soft-Decline response, you can do so, by using our test-card&#x73;**,** found [in this chapter](https://docs.saferpay.com/home/testing-and-go-live#simulators-and-test-cards).

### What to do, in case of a Soft Decline

If you recieve a Soft Decline, you have to re-initiate your process, with **forced** (see above) SCA in mind. In case of the above example, the card details have to be re-registered, with SCA. The old Alias effectively becomes invalid and has to be re-created. This also applies to [Referenced Recurring Transactions](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/recurring-payments), requiring a new initial transaction, to start a new recurring-chain. So you must contact your customer, for him/her to go through the process again, e.g. via e-mail, or similar means.

{% hint style="info" %}
A bank has the right to request SCA and thus throw a soft decline at any point, if it deems it necessary! This is out of control of Wordline/Saferpay!

Thusly, we highly recommend, that you implement a Soft Decline handling, to automatically recognize this error and maybe contact your customers.
{% endhint %}
