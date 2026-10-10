# Testing

Saferpay offers an extensive Sandbox, that allows you to simulate transactions, flows and other things, like Mail Phone Order, or the [Secure PayGate](https://docs.saferpay.com/home/interfaces/backoffice/secure-paygate). When integrating Saferpay, it is very benefitial, to create your own test-account. You can [get your own test-account over here](https://test.saferpay.com).

Everything you need will be sent to you via E-Mail, ncluding things like your test CustomerId, TerminalIds, the login for the Saferpay Test-Backoffice, API user and password etc.

**Difference between the Test and Live environments**

- First and foremost, test and live are completely seperated systems. So everything you do on one or the other, cannot be transferred to the other system, like your transactions or your saved cards. Due to this, it is very important, that you also seperate your data accordingly and keep an eye on which system the data belongs to. If actions are performed with data, that does not belong to the respective system, the action will fail. This is so merchants may not confuse one system, with the other. For example by running on the test environment, whilst thinking they're live.
- To reinforce this philosophy, Saferpay will not accept real credit cards on the test environment and vice versa! The test environment uses especially designed test-card, which can be found further down on this page, alongside information about the simulators.
- Furthermore, the test environment only runs simulators, that will emulate the behavior of the given payment method. However, no real money will be transferred, of course.
- The test environment will behave as closely to the live environment, as possible -aside the above mentioned differences-. To ensure this, every function and every URL is mirrored onto the test environment. For example the live backoffice can be found under <https://www.saferpay.com/bo/login>, whereas the test backoffice can be found under <https://test.saferpay.com/bo/login>. You can access any URL, by simply changing the **www** to **test** and vice versa. This also applies to API URLs. For example `https://test.saferpay.com/api/Payment/v1/PaymentPage/Initialize` and `https://www.saferpay.com/api/Payment/v1/PaymentPage/Initialize`. The JSON-Object structure is the same on both systems, making a switch as easy, as possible.

## Simulators and Test cards

Saferpay offers an array of simulators and also connections to certain sandboxes.

In this chapter, you will find every information, you need in order to test and, if needed, activate your desired payment method for testing.

{% hint style="danger" %}
These test payment means only work on the Saferpay Test environment and not on any live-account/the production environment.

On production, you must use youir own, real payment means, like a credit card.
{% endhint %}

{% hint style="warning" %}
While we generally aim to make the simulators as intuitive, as possible:&#x20;

They are simulators!

Not all test cases may be available, or are triggered the way you'd expect. All Saferpay Simulators do not connect to real sytems (especially important in cases, where a 3rd party is simulated) and thus do not perform end-to-end tests.

However Saferpay does offer the possibility to connect towards Sandboxes, if a 3rd party provider offers such an environment. Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), for information on the availability and how to connect towards a sandbox.
{% endhint %}

{% hint style="info" %}
If you have questions, problems or other inquiries, about testing, please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support) for help.
{% endhint %}

### Account-to-Account Payments

Saferpay offers an A2A simulator that is controlled via the amount and has the following values.

#### Authorization

| Amount  | Test case                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 40300tt | Simulates a PENDING authorization, that lasts tt seconds and then results in a <mark style="color:green;">**successful**</mark> transaction. |
| 40400tt | Simulates a PENDING authorization, that lasts tt seconds and then results in a <mark style="color:red;">**declined**</mark> transaction.     |
| 4120000 | Results in a general decline.                                                                                                                |

#### Refund

| Amount  | Test Case                    |
| ------- | ---------------------------- |
| 8120000 | The refund will be declined. |

{% hint style="info" %}
Any other amount may result in a general success.
{% endhint %}

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test Account-to-Account Payments.
{% endhint %}

### Alipay

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test Alipay.
{% endhint %}

### American Express

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

| Card Number      | Test-case                                                                                                                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9070003150000008 | <p>Frictionless Y. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                      |
| 9070003750000002 | <p>LiabilityShift can't be granted, due to technical reasons. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> N/A</p>                                                                              |
| 9070004950000008 | <p>Challenged Y. This card simulates a successful challenged flow.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                          |
| 9070004250000005 | <p>Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</p>                                                                                                                                                               |
| 9070004350000004 | <p>Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</p>                                                                                                                                   |
| 9070004150000006 | <p>3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift. Card goes through a Challanged flow beforehand!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</p> |
| 9070103204160004 | Card, to simulate a [Soft Decline](https://docs.saferpay.com/home/general-information/psd2#non-compliance). **This card will ALWAYS return a Soft-Decline, even if SCA was performed!**                                                                                                                                                         |

### Apple Pay

Saferpay does offer an extensive Apple Pay simulator. All test-cases are controlled through the simulator-ui. Unlike production, you do not need an Apple device, or browser, to test Apple Pay!

Please refer to the [Activation section](https://docs.saferpay.com/home/payment-methods/applepay#activation), to see, how to activate Applepay on the test-environment.

{% hint style="warning" %}
Note, that the server-to-server method does not use the Saferpay simulator, but instead needs special test-cards provided by Apple, [which you can find over here](https://developer.apple.com/apple-pay/sandbox-testing/).

**Please note: Only the Mastercard PANs are supported at this point!**
{% endhint %}

### Bancontact

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

{% hint style="info" %}
Bancontact uses an authentication-procedure similar to [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure) with VISA and MasterCard. However the difference is, that Bancontact will automatically refuse all payments, that aren't fully authenticated. Due to this, there are only these few outcomes possible.
{% endhint %}

| Card Number      | Test-case                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9110803150000003 | <p>Frictionless Card <strong>"enrolled"</strong>.</p><p><br><strong>Liability shift:</strong> YES</p>                                                                                 |
| 9110803350000001 | <p><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br></p><p><strong>Important:</strong> In this case, the authorization will fail!</p> |
| 9110804950000003 | <p>Challenge Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process!</p><p><br><strong>Liability shift:</strong> YES</p>               |

### blik

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test blik.
{% endhint %}

### Boncard

| Card Number                         | Test-case        |
| ----------------------------------- | ---------------- |
| Success                             | 6299120000000011 |
| Generic Decline                     | 6299120000000201 |
| Card expired                        | 6299120000000235 |
| Card unknown                        | 6299120000000243 |
| Card locked                         | 6299120000000250 |
| No funds                            | 6299120000000268 |
| Card for simulating a failed refund | 6299120000002207 |

### Click to Pay

Please refer to[ this chapter](https://docs.saferpay.com/home/payment-methods/click-to-pay#testing), to test Click to Pay.

### Diners Club International & Discover Card

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

{% hint style="info" %}
Discover is tested as Diners, due to their similarities.
{% endhint %}

| Card Number      | Test-case                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9050003150000002 | <p>Frictionless Y. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                     |
| 9050003250000001 | <p>LiabilityShift can't be granted, due to technical reasons. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> N/A</p>                                                                             |
| 9050004950000002 | <p>Challenged Y. This card simulates a successful challenged flow.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                         |
| 9050004250000009 | <p>Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</p>                                                                                                                                                              |
| 9050004350000008 | <p>Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</p>                                                                                                                                  |
| 9050004550000006 | <p>3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift! Crd goes through a Challanged flow beforehand!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</p> |

### e-przelewy

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test e-przelewy.
{% endhint %}

### eps

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test eps.
{% endhint %}

### giropay

Saferpay does offer an extensive giropay simulator. All test-cases are controlled through the simulator-ui, when opening up the payment page.

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test giropay.
{% endhint %}

### Google Pay

Simply activate Google Pay for your terminal on the test environment (see [Google Pay Activation](https://docs.saferpay.com/home/payment-methods/google-pay#activation)). That will take care of everything necessary for the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page). Google Pay on the Payment Page also supports

{% hint style="warning" %}
Please only activate the **Google Pay Simulator** for testing. Activating standard Google Pay will lead to processing-issues and thusly does not work.
{% endhint %}

For the Server-to-Server method, you can use our [normal test cards](#simulators-and-test-cards) in conjunction with our [Google Pay Token generator](https://test.saferpay.com/Simulators/GooglePay/PaymentTokenGenerator), in order to test GooglePay Server-To-Server, using the normal test-cases, our cards offer you. The generated payment tokens just simply have to be submitted to Saferpay, [as described above](#google-pay-server-to-server).

### Gutschein OeV

| Card Number                         | Test-case        |
| ----------------------------------- | ---------------- |
| Success                             | 2207870000000011 |
| Generic Decline                     | 2207870000000201 |
| Card expired                        | 2207870000000235 |
| Card unknown                        | 2207870000000243 |
| Card locked                         | 2207870000000250 |
| No funds                            | 2207870000000268 |
| Card for simulating a failed refund | 2207870000002207 |

### iDEAL

Saferpay does offer an extensive iDEAL simulator. All test-cases are controlled through the simulator-ui, when opening up the payment page.

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test iDEAL.
{% endhint %}

#### Testing Cases

{% hint style="warning" %}
The following cases must be simulated via amount and not GUI. **Simply do a redirect, without selecting a case on the GUI!**
{% endhint %}

| **Amount** | **Test-case**                                                                                                                                                                                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **490**    | [**Session-Timeout:**](https://docs.saferpay.com/home/payment-methods/ideal#session-timeouts) Transaction results in an Open-Case. User gets redirected to the FailUrl, with the Assert reporting a **TRANSACTION_STILL_IN_PROGRESS** error. The NotifyUrl is then called 10 minutes later, with the Assert reporting a success. |

#### Values for testing Pre-Selection

The following values can be used, if you want to test the [Bank Pre-Selection](https://docs.saferpay.com/home/payment-methods/ideal#bank-pre-selection):

| Bank        | Value |
| ----------- | :---: |
| Test Bank 1 | 0091  |
| Test Bank 2 | 0092  |

### JCB

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

| Card Number      | Test-case                                                                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9060003150000000 | <p>Frictionless Y. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</p>                                                                                                                                      |
| 9060004950000000 | <p>Challenged Y. This card simulates a successful challenged flow.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                          |
| 9060004250000007 | <p>Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</p>                                                                                                               |
| 9060004350000006 | <p>Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</p>                                                                                   |
| 9060002750000006 | <p>3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift.<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</p> |

### Klarna Payments

Saferpay does offer an extensive Klarna Payments simulator and also the possibility, to work on the Klarna Sandbox. All test-cases are controlled through the ui, however you must follow the rules under [Integration](https://docs.saferpay.com/home/payment-methods/klarna-payments#integration), or Klarna won't be displayed.

Please refer to the [Activation section](https://docs.saferpay.com/home/payment-methods/klarna-payments#activation-on-the-test-environment), to see, how to activate Klarna Payments on the test-environment.

### Lunch-Check

| Card Number                         | Test-case        |
| ----------------------------------- | ---------------- |
| Success                             | 6375940000000019 |
| Generic Decline                     | 6375940000000209 |
| Card expired                        | 6375940000000233 |
| Card unknown                        | 6375940000000241 |
| Card locked                         | 6375940000000258 |
| No funds                            | 6375940000000266 |
| Card for simulating a failed refund | 6375940000002205 |

### Maestro International

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

| Card Number      | Test-case                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9040003150000005 | <p>Frictionless Y. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                     |
| 9040003550000001 | <p>LiabilityShift can't be granted, due to technical reasons. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> N/A</p>                                                                             |
| 9040004950000005 | <p>Challenged Y. This card simulates a successful challenged flow.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                         |
| 9040004250000002 | <p>Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</p>                                                                                                                                                              |
| 9040004350000001 | <p>Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</p>                                                                                                                                  |
| 9040004350000001 | <p>3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift! Crd goes through a Challanged flow beforehand!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</p> |

### Mastercard

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

<table data-header-hidden data-full-width="false"><thead><tr><th width="397">Card Number</th><th>Test-case</th></tr></thead><tbody><tr><td>Card Number</td><td>Test-case</td></tr><tr><td>9030003150000007</td><td>Frictionless Y. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td></tr><tr><td>5555555555554444</td><td>Frictionless Y following real Mastercard card format. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td></tr><tr><td>9030003750000001</td><td>LiabilityShift can't be granted, due to technical reasons. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> N/A</td></tr><tr><td>9030004950000007</td><td>Challenged Y. This card simulates a successful challenged flow.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td></tr><tr><td>9030004250000004</td><td>Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</td></tr><tr><td>9030004350000003</td><td>Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</td></tr><tr><td>9030004150000005</td><td>3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift! Crd goes through a Challanged flow beforehand!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</td></tr><tr><td>9030403104000006</td><td>Frictionless Y with DCC. This card additionally will perform DCC. Card currency is USD!<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td></tr><tr><td>9030503104000003</td><td>Frictionless Y with DCC. This card additionally will perform DCC. Card currency is JPY!<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td></tr><tr><td>9030403153150009</td><td>General Decline. This card fails the authorization and also the card check!<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td></tr><tr><td>9030403153900007</td><td><p>Card for simulating response codes via the amount. The last two digits inside the amount are important. Down below you'll find some examples for return-codes/amounts. The codes must be the last digits of the amount eg. 123nn.</p><p></p><p><strong>Important Note:</strong> These are the most common codes! However some Issuers may return codes not on this list!</p><p></p><p><strong>00:</strong> See Frictionless Y</p><p><strong>01:</strong> Successful Authorization and 3DS process. However LiabilityShift will be rejected during authorization.</p><p><strong>62:</strong> Restricted Card </p><p><strong>51:</strong> Insufficient Funds </p><p><strong>43:</strong> Stolen Card </p><p><strong>34:</strong> Suspicion of manipulation </p><p><strong>33:</strong> Card Expired </p><p><strong>30:</strong> Format Error </p><p><strong>14:</strong> Invalid Card </p><p><strong>12:</strong> Invalid Transaction </p><p><strong>09:</strong> Processing temporarily not possible </p><p><strong>05:</strong> Authorization declined </p><p><strong>04:</strong> Card Invalid </p><p><strong>03:</strong> Invalid Merchant Number<br></p></td></tr><tr><td>9030100000021017</td><td>Card, to simulate a <a href="../payment-methods/general-and-special-cases#partial-approvals">partial approval</a>.</td></tr><tr><td>9030103204160003</td><td>Card, to simulate a <a href="../general-information/psd2#non-compliance">Soft Decline</a>. <strong>This card will ALWAYS return a Soft-Decline, even if SCA was performed!</strong></td></tr><tr><td>9030100000001019</td><td><strong>For Issuer Installments:</strong> One fixed installment plan.</td></tr><tr><td>9030100000002017</td><td><strong>For Issuer Installments:</strong> Many fixed installment plans.</td></tr><tr><td>9030100000003015</td><td><strong>For Issuer Installments:</strong> Custom Plan.</td></tr></tbody></table>

### paydirekt

Saferpay does offer an extensive paydirekt simulator. All test-cases are controlled through the simulator-ui, when opening up the payment page.

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test paydirekt.
{% endhint %}

### PayPal

Saferpay does offer an extensive PayPal simulator. All test-cases are controlled through the simulator-ui, when opening up the payment page.

### PostFinance Pay

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test PostFinance Pay.
{% endhint %}

| IBAN                  | Test-case           |
| --------------------- | ------------------- |
| CH6309000000250097798 | **Instant Payouts** |

### SEPA Direct Debit

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test IBANs:

| IBAN                   | Test-case                                                                                                                                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DE17970000011234567890 | **"Success IBAN"**. IBAN to simulate a successful transaction.                                                                                                                                                                                                  |
| DE52970000021234567890 | <p>IBAN to <strong>"simulate response codes"</strong>.<br>IBAN for controlling authorisation codes via the amount.<br>210nn simumulates a decline, where "nn" is the simmulated decline code.<br>Requests with other amounts simumulate positive responses.</p> |

### Sofort by Klarna

Sofort only works via the Sofort Sandbox. In order to test Sofort, please [follow the activation-guide here](https://docs.saferpay.com/home/integration-guide/broken-reference). However you also have to put your newely created project into **Test Mode**. Once you have activated your project in test-mode, [please contact the Integration Support](https://docs.saferpay.com/home/support#integration-support).&#x20;

Please submit your Sofort project-details (Sofort CustomerId, ProjectId and Password), aswell as the Id of the test-terminal, you want Sofort to be activated on.

{% hint style="danger" %}
We recommend to use a seperate Project from your Live project! However if you decide to use the same project for both, make sure, that you de-activate Test Mode, once you go live. Otherwise, people will be able to "pay" in your shop, by using test-data!
{% endhint %}

{% hint style="info" %}
Test-data will be provided by Sofort, once you have activated the **Test Mode**.
{% endhint %}

### TWINT

On the test environment, Saferpay offers a TWINT Simulator for the Currencies CHF only, since this Payment Method is only avalable for the swiss market.\
The Simulator is controlled by submitting different amount-values to simulate the following cases:

{% hint style="warning" %}
The "Abort"-button does not work, unless a decline amount is set. It would result in an abort and then, after the 20 seconds (see below) are expired, the transaction is successful.

All test-cases are amount-controlled.
{% endhint %}

{% hint style="info" %}
Any other amount will cause a success after 20 seconds!
{% endhint %}

<table data-header-hidden><thead><tr><th align="center">Amount</th><th width="309">Test-case</th><th width="146" align="center">Payment Page</th><th align="center">User on File</th></tr></thead><tbody><tr><td align="center">Amount</td><td>Test-case</td><td align="center">Payment Page</td><td align="center">Authorize Direct</td></tr><tr><td align="center">30000<strong>tt</strong></td><td>The execution of the (successful) authorization is delayed by <strong>tt</strong> seconds.</td><td align="center">✅</td><td align="center">❌</td></tr><tr><td align="center">4120000</td><td>Authorization declined</td><td align="center">✅</td><td align="center">✅</td></tr><tr><td align="center">4220000</td><td>Authorization expired</td><td align="center">✅</td><td align="center">❌</td></tr><tr><td align="center">4320000</td><td>Authorization cancelled</td><td align="center">✅</td><td align="center">❌</td></tr><tr><td align="center">7120000</td><td>Declined Refund</td><td align="center">❌</td><td align="center">❌</td></tr></tbody></table>

### UnionPay

Saferpay does offer an extensive UnionPay simulator. All test-cases are controlled through the simulator-ui, when opening up the Payment Page. However, you need to use the following test-card, in order to activate it: **9100104952000008.**

### Visa & V PAY

It may be important to test certain flows and responses, during integration. For that, Saferpay offers the following test cards:

{% hint style="info" %}
V PAY is tested and processed as Visa.
{% endhint %}

| Card Number      | Test-case                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9010003150000001 | <p>Frictionless Y. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 4111111111111111 | <p>Frictionless Y following real VISA card format. Card simulates a fully successful Frictionless Flow!<br><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 9010003750000005 | <p>LiabilityShift can't be granted, due to technical reasons. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> N/A</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 9010004950000001 | <p>Challenged Y. This card simulates a successful challenged flow.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 9010004250000008 | <p>Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false </p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 9010004350000007 | <p>Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 9010004150000009 | <p>3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift! Crd goes through a Challanged flow beforehand!<br><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 9010403104000000 | <p>Frictionless Y with DCC. This card additionally will perform DCC. Card currency is USD!<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 9010503104000007 | <p>Frictionless Y with DCC. This card additionally will perform DCC. Card currency is JPY!<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 9010403153150003 | <p>General Decline. This card fails the card check!<br><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 9010403153900001 | <p>Card for simulating response codes via the amount. The last two digits inside the amount are important. Down below you'll find some examples for return-codes/amounts. The codes must be the last digits of the amount eg. 123nn.</p><p></p><p><strong>Important Note:</strong> These are the most common codes! However some Issuers may return codes not on this list!</p><p></p><p><strong>00:</strong> See Frictionless Y</p><p><strong>01:</strong> Successful Authorization and 3DS process. However LiabilityShift will be rejected during authorization.</p><p><strong>62:</strong> Restricted Card </p><p><strong>51:</strong> Insufficient Funds </p><p><strong>43:</strong> Stolen Card </p><p><strong>34:</strong> Suspicion of manipulation </p><p><strong>33:</strong> Card Expired </p><p><strong>30:</strong> Format Error </p><p><strong>14:</strong> Invalid Card </p><p><strong>12:</strong> Invalid Transaction </p><p><strong>09:</strong> Processing temporarily not possible </p><p><strong>05:</strong> Authorization declined </p><p><strong>04:</strong> Card Invalid </p><p><strong>03:</strong> Invalid Merchant Number</p><p></p> |
| 9010100000020013 | Card, to simulate a [partial approval](https://saferpay.github.io/sndbx/creditcards.html#cc-pappoval).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 9010103204160007 | Card, to simulate a [Soft Decline](https://saferpay.github.io/sndbx/psd2.html#psd2-decline). **This card will ALWAYS return a Soft-Decline, even if SCA was performed!**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### WeChat Pay

On the test environment, Saferpay offers a WeChat Pay Simulator.\
The Simulator is controlled by submitting different amount-values to simulate the following cases:

{% hint style="warning" %}
The "Abort"-button does not work, unless a decline amount is set. It would result in an abort and then, after the 20 seconds (see below) are expired, the transaction is successful.

All test-cases are amount-controlled.
{% endhint %}

{% hint style="info" %}
Any other amount will cause a success after 20 seconds!
{% endhint %}

<table data-header-hidden><thead><tr><th align="center">Amount</th><th width="309">Test-case</th><th width="146" align="center">Payment Page</th><th align="center">User on File</th></tr></thead><tbody><tr><td align="center">Amount</td><td>Test-case</td><td align="center">Payment Page</td><td align="center">Authorize Direct</td></tr><tr><td align="center">30000<strong>tt</strong></td><td>The execution of the (successful) authorization is delayed by <strong>tt</strong> seconds.</td><td align="center">✅</td><td align="center">❌</td></tr><tr><td align="center">4120000</td><td>Authorization declined</td><td align="center">✅</td><td align="center">❌</td></tr><tr><td align="center">4220000</td><td>Authorization expired</td><td align="center">✅</td><td align="center">❌</td></tr><tr><td align="center">4320000</td><td>Authorization cancelled</td><td align="center">✅</td><td align="center">❌</td></tr></tbody></table>

### WL Crypto Payments

Saferpay does offer an extensive WL Crypto Payments simulator. Almost all test-cases are controlled through the simulator-ui, when opening up the payment page.

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test WL Crypto Payments.
{% endhint %}

The following test-cases must be controlled, via the **`Payment.OrderId`**:

| Test case                                                                                                                                                                                                                                                                                                                   | Value                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Forcing a **`PENDING`** status and a subsequent call to the **`PendingNotification.NotifyUrl`**, in order to test the **`PENDING`** [behaviour with Refunds](https://docs.saferpay.com/home/integration-guide/broken-reference). This simulates a delay of 300 seconds. You can change the value at the end to your liking. | Notify_DelayedResponse300 |

### Wero

{% hint style="info" %}
Please [contact the Integration Support](https://docs.saferpay.com/home/support#integration-support), if you want to test Wero.
{% endhint %}
