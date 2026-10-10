# Payment Page

{% hint style="warning" %}
Before you start integrating any of these flows, make sure, you have read the following Chapters:

- [Introduction](https://docs.saferpay.com/home/integration-guide/introduction)
- [Data Security and PCI DSS](https://docs.saferpay.com/home/integration-guide/general-information/data-security-and-pci-dss)
- [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure)
- [Payment Methods](https://docs.saferpay.com/home/integration-guide/payment-methods) for your desired payment method
- [Capture and Daily Closing](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing)
- [PSD2](https://docs.saferpay.com/home/integration-guide/general-information/psd2)
- [Licenses and Interfaces](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces)
  {% endhint %}

{% hint style="warning" %}
The Payment Page is **NOT** meant to be used in [Mail Phone Order (MOTO)](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/mail-phone-order) scenarios.\
Please use the Transaction Interface instead and consider the respective documentation (see above).
{% endhint %}

The Saferpay [Payment Page Interface](https://saferpay.github.io/jsonapi/#ChapterPaymentPage) is intended for a simplified and universal integration of the payment process by using the PaymentPage payment form. All Saferpay supported payment methods can be processes with the Payment Page Interface; credit cards and third-party payment methods like PayPal, iDEAL, SOFORT/Klarna and more. Once integrated, more payment methods can be added at any time without major adjustments.

The PaymentPage can be either used to offer the payer the option to select a desired payment method or can be defined to jump directly to one specific payment method with a preselection option. Please read chapter [Iframe Integration and CSS](https://docs.saferpay.com/home/integration-guide/general-information/iframe-integration-and-css) for examples of the different payment forms. It can also be used in combination with the Secure Card Data to store/tokonize payment data during the payment process.

{% hint style="info" %}
Please consider our [license-chapter](https://docs.saferpay.com/home/master/licensing), to determine, if tall the desired features are available for you.
{% endhint %}

## General overview

![(click to enlarge)](https://3537448238-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fzpi9teY7Tm2pCZ1Bw8zO%2Fuploads%2FOybWNPDcZ4UWbKfkxt4V%2FPP_Flow_OneReturnUrl_NewDesign.png?alt=media&token=4c8a1079-f953-4624-9bf4-b06a7201beee)

1. **Payment Initialization.** The payer arrives at the checkout and the shop initializes the payment.
    - The shop calls [Payment Page Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize), which initializes the payment process and generates the RedirectUrl and token for the Payment Page.
2. **Redirect to the RedirectUrl.** The payer gets redirected to the RedirectUrl and Saferpay processes the payment.
3. **Return to Shop and Notification.** After the payment response has been recieved from the processor, Saferpay will redirect the payer back to the shop. At the same time, Saferpay will also call the respective notification URL.
4. **Gathering of payment information.**
    - The shop calls the [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), which gathers all the information about the payment, like the overall outcome, LiabilityShift through 3D Secure and more, using the Token, gathered in step 1.
5. **Validation of the payment.** Depending on the outcome, the shop displays the result of the payment to the payer. Depending on that outcome, the transaction either has
    - **Failed:** The transaction has been rejected. The whole process ends here and step 6 is not necessary.
    - **Success:** The transaction is generally a success and you can proceed with step 6.
6. **Payment finalization.** If the payment was successful you now have to finalize the payment. Based on the returned data, you may do one of the following:
    - **Capture:** You want to accept the transaction and transfer the money. For that, you have to execute the [Transaction Capture request.](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) Only if the Capture has been successful, the money will be transferred.&#x20;
    - **Cancel:** You do not want to acceppt the transaction (E.g. due to a lack of LiabilityShift.). For that, you have to execute the [Transaction Cancel request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel). The Cancel will release the money again, so the payer may have access to it again.

{% hint style="warning" %}
If you decide to cancel the payment, make sure, that you display the outcome to your customer. In this case, the payment effectively has failed, due to you rejecting it.
{% endhint %}

{% hint style="info" %}
Please note, that the Capture and the Cancel mutually exclude each other. You can either do one, or the other. Once one has been successfully executed, the other is no longer possible. [For more information, see this chapter.](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing)

Also note, that some payment methods do not need the capture/cannot perform a cancel. [Please see the respective payment method chapter for more information.](https://docs.saferpay.com/home/integration-guide/payment-methods)
{% endhint %}

## 1 - PaymentPage Initialize Request

The process begins with the [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) request. With this request, you forward all data necessary for the payment to Saferpay. These include the customer number (CustomerId), the terminal number (Terminal Id), the currency (CurrencyCode), the amount (Value), the internal reference no. of the merchant system (OrderId), and the return addresses (ReturnUrls) to which the customer will return after leaving the PaymentPage.

### Information on the Use and Significance of the available Parameters

#### (Pre-)Selection of the payment method &#x20;

Depending on the use-case and payment method, it may also be desireable to also control the used payment method(s) and the Payment Page does offer a way to control the displayed payment method(s), by submitting their control-values within the **`PaymentMethods`** array, through the [Payment Page Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize).

The Payment Page will behave in three basic ways, depending on the number of values submitted and also the currency:

- If multiple supported values are submitted, the payment page will display all selected payment methods, if available and hide those, that are not selected.
- If only one value is submitted, Saferpay will skip the payment selection and continue with the next step, by either displaying the card-entry, or address form ([as described above](#controlling-the-address-source)). In case of 3rd party payment methods, that require a redirect (e.g.) [PayPal](https://docs.saferpay.com/home/integration-guide/payment-methods/paypal), Saferpay will immediately perform said redirect, skipping the Payment Page alltogether, if the display of the address-form is skipped (see above).

#### Currency

Selecting the correct currency is very important. A currency mismatch can lead to payment methods not being displayed, even if you use pre-selection. The Payment Page will always try to make a payment possible through other means (if available), leading to the following behaior:

- If multiple or no **`PaymentMethod`** values have been submitted, Saferpay will only display the methods, that can be processed with said currency, if available. This is also the case, if none of the values can pe processed (Be it due to unavailability, or non-sensicality, e.g. misspelling).
- If one value was submitted, Saferpay will ignore the value and display all available alternatives, if possible.
- If all this fails and not a single alternative can be found, the [Payment Page Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) will fail with a ["**NO_CONTRACT**" error message](https://docs.saferpay.com/home/integration-guide/error-handling#no_contract).

It is therefore important, that you check the availability of said payment method and currency. You can do so inside the Saferpay Backoffice under [Settings => Terminals](https://docs.saferpay.com/home/interfaces/backoffice/settings#payment-means-terminals).

#### **Strong Consumer Authentication (SCA)**

If a certain transaction needs SCA (please refer to the [PSD2 chapter](https://docs.saferpay.com/home/integration-guide/general-information/psd2)), you can force SCA, by setting **Authentication.ThreeDsChallenge** to **"FORCE"**.

#### **ReturnUrl.Url**

Via the **ReturnUrl**, the customer is returned to the shop after the transaction. For security reasons, Saferpay returns no data to return addresses. The identification of the payment or the returning customers is up to the merchant. We recommend using your own parameters. These can be attached via HTTP GET to the **ReturnUrl**. When a **ReturnUrl** is called, Saferpay returns the appended parameter, thus enabling identification of the customer/transaction. The **ReturnUrl** is **ALWAYS** called through the clients Browser.

{% hint style="warning" %}
We strongly advice against using a session cookie for identifying the customer upon redirect to this URL!

Sessions can be lost during the redirect process, especially, if Saferpay has to redirect to external sites (e.g. PayPal, Sofort etc.).

Also certain browsers -specifically known is Safari- can prove a problem here, due to them discarding 3rd party cookies, especially inside iFrames. Browser behavior can also change with an update, introducing problems, without you being prepared.

Saferpay advices you to use GET-parameters, attached to the ReturnUrl, in order to identify the returning customer!&#x20;
{% endhint %}

#### **Notification.SuccessNotifyUrl & Notification.FailNotifyUrl**

These URLs are meant to notify the merchant server via a server-to-server callback, should the transaction be a success, or failure. The notification URLs circumvent cases, where the redirect to the **ReturnUrl** has failed, due to the payer losing connection, or closing the browser preemptively, so the merchant server may continue with the next steps.

The notification happens via http-GET and **does not carry any data (like the token),** except parameters, that have been added to the URL by the merchant-system. It is intended, that the token (see initialize response) is saved by the merchat system and then linked to these parameters -e.g. a sessionId-, so the merchant system can identify the correct token and perform the authorization this way. Otherwise the notification callback would be an empty request.

It should be noted, that, in a best case scenario, the notification takes place in addition to the respective **ReturnUrl**, due to its redundant nature. Make sure, that your system can handle both calls, so it doesn't interpret them as two separate processes. Moreover, Saferpay expects the merchant server to answer the call with a HTTP status code 200(OK).&#x20;

{% hint style="warning" %}
If no (e.g. a Timeout after 10 seconds), or a different status code (e.g. http 500) is received, Saferpay will re-attempt the notification up to five times more, for a total of six times, to ensure, that the previous error is not caused by a temporal problem.&#x20;

The timespan between each try is increased, after each failure, to a maximum of 1 day. That ensures, that also a longer lasting issue can be circumvented.
{% endhint %}

{% hint style="warning" %}
The usage of **the Notification URLs** is strongly recommended! Only leave it out, if your system cannot recieve external requests!
{% endhint %}

{% hint style="warning" %}
The notification also does not return any data to the merchants application, except your own parameters (See **ReturnUrls** above!) via GET!
{% endhint %}

{% hint style="warning" %}
Any type of authentication (e.g. basic authentication, or certificates) towards your system, is currently not supported!
{% endhint %}

{% hint style="info" %}
&#x20;If you need the outgoing IP-addresses and/or ports, you can [find them here](https://docs.saferpay.com/home/general-information#tls-security-and-communication-settings).
{% endhint %}

#### Payment.OrderId

This optinal parameter is important to keep track of all your transactions in later processes. This ID will be forwarded, so it will show up inside the Saferpay Backoffice (As the Reference number!) and on your reconciliation-files. This will help associate all the transactions for your accounting-department.

#### Gathering of the payers address

If you want, you can also capture your customers address either through Saferpay, or, if possible, through the payment method itsel. [Click here for more information](#controlling-the-address-source).

#### **Card Verification Value**

The Card Verification Value (CVC) is mandatory, when using the PaymentPage, except for card brand Maestro, which offers cards with and without CVC.

#### **Card Holder**

This value is mandatory, when displaye&#x64;**,** however you may hide the input field. See the **CardForm** container with the [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) request.

#### RegisterAlias

Via the **RegisterAlias** container, card details from a payment can be stored safely and in conformity with PCI. [See the Secure Card Data chapter](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/secure-card-data) for more information.

{% hint style="info" %}
A card will be registered only after a successful authorisation. Although the Payment Page Interface can be used to register (store) payment data, it is **NOT** possible to use it for future payments. Registered card data can only be used with the [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface).
{% endhint %}

#### Language

The language can be changed, by setting the **`Payer.LanguageCode`** parameter with the [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) request. A list of all supported languages and their code, can be found with the request specification.

{% hint style="info" %}
Note, that the Payment Page will also try to detect the language automatically, using the payers browser-client, so there may be no need for you to set this parameter.

However, if you set it, it will overrule the auto-detection.
{% endhint %}

### Additional 3D Secure and Compliance-Data

Some data-points may and in some cases **must** be submitted towards the Saferpay gateway, either for 3D Secure compliance, or to speed up the process for the payer and reduce friction during checkout (e.g. by preventing a 3D Secure Challenge.).

Please make sure, that you have [read the 3-D Secure chapter](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure) on this matter.

## PaymentPage Initialize Response

Inside the PaymentPage Initialize Response, the following parameters are important.

#### Token

The **Token** refers to the values temporarily stored regarding the Saferpay transaction and is mandatory during subsequent processing of the transaction ([for more information, see e.g. PaymentPage Assert](http://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Assert)). The Token should be coupled to the http-GET parameters that were previously attached to the **ReturnUrls** and **NotifyUrl** for identification and then stored inside a database, for further actions to come!

#### **RedirectUrl**

The **RedirectURL** provides the address via which the buyer is redirected to the PaymentPage. This can be done automatically via calling up the Iframe or by embedding the URL in an HTML link that must be clicked on by the buyer.

{% hint style="warning" %}
The **RedirectUrl** can only be called one time, due to security restraints. Please make sure, that the **RedirectUrl** cannot be called twice. The second call will automatically trigger the call to the **`ReturnUrl`.**
{% endhint %}

## 2 - Redirect and Transaction

Redirect the buyer to the **RedirectUrl** from the [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) response, using your desired method. The transaction will be fully processed by the PaymentPage. The Payment Page handles all steps automatically, including [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure) and [DCC](https://docs.saferpay.com/home/integration-guide/general-information/dynamic-currency-conversion). No additional steps are necessary on the merchant website.

{% hint style="warning" %}
Saferpay does not recommend the usage of a Client-Side Session (Cookie), for customer identification, due to restrains emposed by browser manufacturers! Those can cause the Session getting lost, during the payment process, thus causing the shop to not being able to identify the returning user. We recommend using GET-parameters, as described above (See parameter-description for Initialize)!
{% endhint %}

### Handling multiple redirects and transaction timeout

As [mentioned above](#redirecturl), the **`RedirectUrl`** can only be called once, which can lead to some confusing transaction-outcomes, if not handled correctly.

For instance, if you open the URL twice, each in its own browser-tab, then the first tab will open the Payment Page, the second however will lead to the ReturnUrl.

[The Assert](#4-paymentpage-assert) will then throw the following error, indicating, that the transaction may still be in progress:

```json
{
    "ResponseHeader": {
        "SpecVersion": "[CURRENT SPEC_VERSION]",
        "RequestId": "23d5729a8b73c897e067afb457fd4149"
    },
    "Behavior": "DO_NOT_RETRY",
    "ErrorName": "TRANSACTION_IN_WRONG_STATE",
    "ErrorMessage": "Invalid action",
    "TransactionId": "xYYCffAdv1C9UAIYtItAbQfnh7Wb",
    "ErrorDetail": ["Transaction still in progress or abandoned by the payer."],
    "OrderId": "0"
}
```

The first tab however may still lead to a successful transaction, which can cause issues, if your system automatically closes the order, based on the first redirect.

There are two main ways of handling this:

- Simply wait for either a success, or a "failed transaction" response and do not close the process, until either of these outcomes has been confirmed.&#x20;
- Prevent the Redirecturl from being called twice. You can do so, by calling the URL through-code, rather than linking to it. This way the redirect is specifically triggered by your system. Make sure, that you mark the URL as "redirected", so the shop does not re-attempt the redirect, should the user use the browser-back button, or similar means, to return to the checkout.

You may call [the Assert](#4-paymentpage-assert) preemtively to check the status at any point, but remember to not use polling. We recommend waiting for [the redirect](#3-return-to-the-shop) or [the notification](#notification) instead.

However should you not receive a definitive status after 1 hour, you can close the process on your end, as the transaction has been abandoned by the payer, however we recommend calling the Assert, just to be sure and then close the process.

## 3 - Return to the Shop

Once the transaction is complete, the card holder is taken back to the shop, to the **ReturnUrl**. Here, the GET parameters can be read and the **Token** can be assigned to the transaction. With the **Token**, the payment can be continued to the next step, where the outcome of the payment itself will be determined.

### Handling multiple redirects

Under certain circumstances, it may happen, that the redirect to the shop happens more, than once. This can be due to the payer trying to go back, by clicking on the back-button in their browser, or accessing their history etc.

These events cannot be handled by Saferpay, as the user sometimes has already left our sites and can have serious impact on your shop, if you do not handle them correctly.

For instance, it could trigger the transaction processing twice, which could lead to errors. These errors could then lead to the shop assuming, that the transaction has failed, even though it did not.

Once you have received a definite response from the [Payment Page Assert](#id-4-paymentpage-assert), you must mark the transaction as "Processed" on your end, so that the shop does not process the transaction twice.

### Handling Notifications

This is also the point, when Saferpay calls [the NotificationUrls](#notification.successnotifyurl-and-notification.failnotifyurl).

Handling the notification correctly is very important, though it does present some challenges.

Ideally, both -the notification and the redirect- happen roughly at the same time, though note, that they are asynchronous, meaning, that one can happen before, or after the other, depending on the connection. So relying on them being called in a specific order is not recommended.

There are multiple ways of tackling this, though we highly recommend to not use one over the other. They are both intended to work in tandem to and suppliment each other. In any case, both should be able to trigger the next processing steps.

The following things may be done to handle this correctly:

- Let both trigger the next steps. With the Payment Page, the transaction already happened, so if you call the Assert with both, they'll both report the same basic result; success, or failure. However, the details may cause some issues, for example if the redirect already triggered [the assert](#4-paymentpage-assert) and then later [the capture or the cancel](#5-capture-or-cancel), a second assert afterwards would then also return a Transaction.Status: "CAPTURED|CANCELLED". This then indicates, that one process, either the redirect, or the notification, has already finished processing. Should it still happen, that both processes continue to the end -e.g. because both happen almost at the same time-, [the Capture and Cancel](#5-capture-or-cancel) mutually exclude each other and also may only be called once. So should you execute one of them twice on a transaction, the API will report an error, stating, that [this process has already been executed.](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/error-handling)
- Write both calls into a queue on your end, so you can process them after each other, instead of in parallel. This way, you can make sure, that the process only runs once on your end. Make sure, that you mark your process as completed at the end, so that if the second call comes up in the queue, the system sees, that this transaction has already been processed successfully and then skips this item.

It is important, that you do not handle both calls as separate transactions. Both calls are part of the same transaction and, in the best case, happen both, as both calls were able to reach your system.

## 4 - PaymentPage Assert

With the [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), the results of a transaction are requested. The returned data may be stored on the merchant side.

{% hint style="warning" %}
The Assert does **NOT** do the transaction itself. The PaymentPage will do that automatically for you. The Assert only calls for the result. So, if you call the Assert, the transaction already happened.
{% endhint %}

{% hint style="info" %}
**The** [**Payment Page Assert**](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) **can be called up to 36 hours, after the** [**Payment Page Initialize**](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)**.**
{% endhint %}

Based on the data obtained, it is to be decided whether or not a transaction is to be further processed. The following data is interesting in this regard:

#### **Transaction.Id**

The transaction identifier returned in the container **Transaction** with **Id** is a unique identifier for a transaction. The value is obligatory for further processing steps (Transaction Capture or Transaction Cancel) and should therefore be saved.

#### **Liability**

This container provides information about whether or notliability shift through [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure) is available or not. It is up to merchant whether or not he wants to accept transactions without liability shift. Evaluation of the parameter provides the opportunity for merchants to incorporate appropriate rules here.

{% hint style="warning" %}
Accepting transaction without LiabilityShift happens at the merchants own risk.
{% endhint %}

#### **Transaction.Status**

As already described [here](https://docs.saferpay.com/home/integration-guide/capture-and-daily-closing#capture), this status states whether or not a transaction has to be finalized via [Capture](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing). If this status is not **CAPTURED**, the capture must be executed in order to finalise the transaction.

{% hint style="info" %}
You can also call the [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), if the Fail-or AbortUrl has been called. It will then return a JSON-Object, containing information about the failed transaction, like the reason (If available!) and error-code from the processor itself. Note, that the http-status will be != 200, indicating a failed transaction.
{% endhint %}

{% hint style="info" %}
Under certain circumstances a PaymentPage Session can be valid for about 1 hour - other sessions, like external redirections to 3D Secure and 3rd party providers can add up to this! - , but a normal session does not take longer, than 20 minutes.
{% endhint %}

### Rejection of the Payment

If the payment has been rejected, the [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) will throw an http status != 200 and a JSON error-message, containing more information about the rejection.

More information about errors and error-handling can be [found over here](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/error-handling).

## 5 - Capture or Cancel

Subsequently, the transaction will be finalised via [Capture](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing) or aborted via [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel).For this, the transaction identifier **Id** is required. Please refer to the notes [in the payment methods chapter](https://docs.saferpay.com/home/integration-guide/payment-methods), to check, if and when a **Capture** is necessary, and whether a **Cancel** can still be executed. Alternatively, you can also check the **Transaction.Status** parameter, within the [PaymentPage Assert Response](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert). If the status is **AUTHORIZED** a [Capture](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing) needs to be performed. If the status is **CAPTURED** you do not need to finalize the payment.

Once these steps are complete, the transaction is completed.

{% hint style="warning" %}
Keep in mind that you **cannot cancel** a transaction, once it is captured! At that point, a refund has to be executed, if available -[please check the respective payment methods chapter](https://docs.saferpay.com/home/integration-guide/payment-methods)- So please make sure, that you really want to finalize the transaction and initiate the money transfer, to avoid confusion with your customers.
{% endhint %}

## Try it out!

[Click here for a live demo!](https://shop.saferpay.eu/saferpayintegration)

## Express Checkout

Ordering as a guest and express checkouts are very common these days, as they offer a way to quickly order goods, without the need of registering yet another account for another shop. Therefore, certain payment methods offer possibilities to gather the address saved on their end and pass it through to the merchant.

Saferpay offers options to implement such checkouts, so the payer can go through it, without much interaction.

### Controlling the Address Source

The important parameter for such cases is **`Billing|DeliveryAddressForm.AddressSource`**, within the [Payment Page Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize). As the name suggests, it controls the source of the payers address and it has three values:

- **NONE:** None is the default and simply results in no address being returned.
- **SAFERPAY:** The address is captured on Saferpay side. This option will display the corresponding address form on the Saferpay Payment Page.

{% hint style="info" %}
If you want to, you can also (partially) send the address, by submitting the respective address within the **`Payer.Billing|DeliveryAddress`** container. Saferpay will then display the submitted data inside the respective form.
{% endhint %}

{% hint style="info" %}
You can also make some fields in the address form mandatory, by submitting the corresponding values inside the **`Billing|DeliveryAddressForm.MandatoryFields`** array, thus ensuring, that these values will be filled and returned.
{% endhint %}

- **PREFER_PAYMENTMETHOD:** This option will return the address stored by the payment method, if available. If the payment method doesn't support this feature, the Payment Page will fall back to the **`SAFERPAY`**-option and display an address form on the payment page itself.
    - **Currently supported Payment Methods**:
        - [PayPal](https://docs.saferpay.com/home/integration-guide/payment-methods/paypal)
        - [Apple Pay](https://docs.saferpay.com/home/integration-guide/payment-methods/applepay)
        - [Google Pay](https://docs.saferpay.com/home/integration-guide/payment-methods/google-pay)

The address is then returned with the [Payment Page Assert response](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), inside the **`Payer.Billing|DeliveryAddress`** container.

### Final things to consider

Depending on the use-case and|or payment method, the following things are important to consider, when building an express-checkout with Saferpay:

#### General

- As of now, **Saferpay does not support the alteration of the payment amount after the address has been returned**. This may be important in cases, where the Delivery Address dictates the final amount (e.g. due to shipping costs). The amount must be set before the user is redirected to Saferpay!

{% hint style="danger" %}
Even though the name may suggest it, the [Transaction AdjustAmount](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AdjustAmount) request does not work in this instance!
{% endhint %}

#### PayPal

- PayPal defines the word "Express Checkout" a bit differently. Specifically, they offer a function to alter the amount, after the address has been gathered. As said above, **this is currently not supported.**
- Saferpay does return the PayPal account e-mail and Id, however it is not returned with the **`Payer.Billing|DeliveryAddress`**, but instead inside **`PaymentMeans.PayPal`** container, as this can differ from the e-mail, that is saved within the address.
