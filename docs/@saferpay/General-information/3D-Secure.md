# 3-D Secure

PS3-D Secure – 3DS for short – is supported by Visa (Visa Secure), Mastercard (Mastercard ID check), American Express (SafeKey), Diners Club (ProtectBuy) and others and is intended as an anti-fraud measure.

Via liability shift, merchants who offer the 3-D Secure process benefit from fewer payment defaults and from increased security with respect to credit card acceptance. It does not matter whether the card holder (CH) participates in this process or not.

The 3-D Secure procedure can only be used for payments on the Internet. If participating in the process, CHs must identify themselves to their card-issuing banks (issuer) while making payments. Payments that merchants conclude via 3-D Secure are to be specially flagged. Only when the corresponding criteria have been sent with the authorisation to the credit card company does the liability shift apply. This step is done automatically via the Transaction Interface and the Payment Page, meaning that no additional integration costs arise. The authentication of the CH proceeds via a web form provided by the issuer or by the service provider contracted by the issuer. The 3-D Secure authentication of the CH is done via an Internet browser.

{% hint style="danger" %}
Worldline does not recommend to circumvent 3D Secure, as it is an anti-fraud measure!

We generally recommend to do 3D Secure wherever possible!
{% endhint %}

{% hint style="warning" %}
3D Secure is only available through the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page), [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) flows, or via the [Standalone Secure Card Data registration](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration), using the ["ONLINE_STRONG"](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#the-check-function) check function.

Transactions can be done via other means and flows, but **those do not support 3D Secure!**

Please make sure, that you use the above flows, if you want (or in case of [PSD2 HAVE TO](https://docs.saferpay.com/home/integration-guide/general-information/psd2)) use 3D Secure.&#x20;
{% endhint %}

A transaction with the 3-D Secure process proceeds as follows:

1. The merchant sends the credit card details together with the relevant payment data to Saferpay.
2. Saferpay checks whether the CH uses the 3DS process or not. If yes, she or he will be required to authenticate her or himself to her or his bank. If not, the payment can be carried out without authentication.
3. The 3DS request will be forwarded to the card-issuing bank via the CH’s Internet browser.
4. The Issuing bank, or its 3DS provider will then perform a so called scoring. This scoring will determine the fraud risk, which will lead to one of two outcomes:
5. **Frictionless:** The fraud risk is low and 3-D Secure will proceed without user interaction. The bank will be the liable entity. This also applies to all orders smaller, or equal to 30 Euro, or equivalent, though with a maximum of 5 concurrent transactions (Globally, not merchant/shop-based!). Please note that the issuer might grant the frictionless flow but does not have to.&#x20;
6. **Challenged:** The fraud risk is high, or the issuer wants to force 3D Secure (E.g. after 5 concurrent transactions, as described above!, or for some other internal reason), thus the cardholder needs to authenticate him/herself, by using a password, an SMS-TAN, an App, or even the fingerprint-sensor on his phone. If 3-D Secure was successful, the bank will still be the liable entity.
7. The result of this authentication is sent back to Saferpay.
8. Saferpay checks the result and ensures that no manipulation has occurred.
9. Saferpay links the 3DS data to the token used by the JSON API and uses this data automatically when authorising the card.
10. When receiving the authorisation response, the merchant also receives information about the outcome of the 3-D Secure process.

## What is Liability Shift and why is it important for me as a merchant?

The best way to understand what **Liability Shift** means, is through a small example:

Let's say a merchant does get an order for 1000 EUR. The merchant finalizes the order and the money gets charged from the card holder's bank account. After he received his money, the merchant ships the goods to the given destination.

After three weeks the merchant gets the information, that this transaction is a fraud-case and that the actual cardholder initiated a chargeback. Here is what happens, either with, or without 3-D Secure/Liability Shift:

#### **Without 3-D Secure/liability shift:**&#x20;

The Money gets transferred back, from the merchants bank account, to the original card holder. The merchant, in this case, is liable for the damage that has been caused and even though the goods already have been shipped (probably to a criminal subject), he has to pay the full amount back to the card holder. So he carries the whole risk and the cost in a fraud-case!

{% hint style="danger" %}
**Attention:** A high amount of chargebacks can also cause penalties from the brands (E.g. VISA and Mastercard) directly! So it can be, that they will force you -the merchant- into using 3-D Secure, if the fraud-rate is too high!
{% endhint %}

#### **With 3-D Secure/liability shift:**

Like the name suggests, the liability gets shifted! Shifted from the merchant, to the bank. So in case of fraud, the chargeback gets completely carried by the issuer. The card holder will get his money back, **BUT**, unlike before, the merchant can keep the charged money. The risk and the cost is carried by the issuer in this case, negating the costs on the merchant side.

{% hint style="danger" %}
Important: Even though LiabilityShift by default does state that the liability in case of fraud is on side of the card issuing bank it does not protect the merchant against all cases of fraud and thereby chargebacks. \
Actually there are quite some conditions which do allow the issuing bank to accept a charge back by the cardholder and forward liability to the merchant even though liability shift was granted for the transaction. \
In this concern it actually does matter whether the customer did authenticate himself (reducing the risk of a charge back) or whether the liability shift has been granted without such personal authentification. \
For detailed information about this topic and the legal regulations applying to Liability Shift please contact your contractual correspondent on acquiring side. \
Especially for high-risk business and business dealing with higher amounts and valuable goods (Electronics, Jewelery etc.), or for a first, or guest order of a card holder in your shop, we therefore do recommend forcing a 3DS-Challenge, so the card holder has to confirm this payment, through a full authentication. &#x20;

Via our API this can be triggered by submitting the parameter **Authentication.ThreeDsChallenge=FORCE**. Saferpay will then always request a Challenged Flow on issuer side.&#x20;
{% endhint %}

### Transactions without liability shift

There are certain kinds of transactions, that do not have liability shift and it is important to know beforehand, in order to avoid unwanted chargebacks and fraud issues.

Here is a list of transactions, that generally do not offer liability shift:

#### **Mail Phone Order Transaction**

Mail Phone Order does not support 3D Secure in general and thusly does not know liability shift by design.

#### [**Recurring/MIT transactions**](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/recurring-payments)

Merchant Initiated Transactions, like recurring transactions, installments, subscriptions, or just re-authorizations, without card holder presence, are exempt from liabilityshift. This also applies to processes, where 3D-Secure has been performed during the first capture of the card details. It is highly recommended to perform 3D Secure at this point and liability shift can be granted for this one time, but it is not extended onto the subsequent payments.

#### Transactions with rejected liability shift

Liability shift through 3D Secure can also be rejected, if the bank deems it necessary, e.g. due to high risk. These are cases, where Saferpay cannot prevent the authorization/transaction, because the rejection is thrown with said transaction. Therefore, you [always have to check the response from Saferpay](#id-3-d-secure-on-api-level) and make your decision of whether to accept the transaction, or [cancel it](https://docs.saferpay.com/home/licences-and-interfaces/capture-and-daily-closing#cancel) accordingly.

{% hint style="danger" %}
This is very important. Always [check the response from Saferpay](#id-3-d-secure-on-api-level) and make decisions on said response. Just having 3D Secure activated, does not cover 100% of all cases.&#x20;
{% endhint %}

{% hint style="warning" %}
Saferpay does not offer an autocancel feature in these cases for legal reasons. If you want to reject these transactions, you actively have to [perform a cancel](https://docs.saferpay.com/home/licences-and-interfaces/capture-and-daily-closing#cancel).
{% endhint %}

In general, liability shift through 3D Secure is only granted for the transaction/process, where 3D Secure is performed. For any new transaction, 3D Secure has to be performed again, if you want liability shift.

### Liabilityshift is NOT a free hall pass to get out of trouble.

While it may seem so, Liabilityshift does not exempt you from any harm, or generally chargebacks. Chargebacks might still happen and you'll still encounter them.&#x20;

These cases are, like any other fraud case, a legal matter, in which it is to be determined, who is at fault; the card holder (maybe due to negligence with their physical card) , the merchant (for examply by ignoring safety standards, or not doing 3DS in the first place), the acquirer (e.g. by returning the wrong information to the merchant, causing a false judgement), or the bank of the card holder (issuer - e.g. if their anti-fraud measures prove to be inadequate). Whatever the case: No two fraud cases are the same, so the required actions may vary from case to case.

LiabilityShift however is a base on which to build your argument against (usually) the issuer, should a fraud case occur.

{% hint style="info" %}
The legal specifics are set within your acquiring contract. If you are unsure, need specific information, or have other questions about 3D Secure and Liability Shift, please contact your acquirer.

For Worldline acquiring, please contact your account manager, [or our sales](https://docs.saferpay.com/home/support#worldline-sales-team).
{% endhint %}

The stricter the **`AuthenticationType`** ([see below](#recommended-behaviors)), the stronger your argument will be, to the point, where the issuer has no valid argument against you.

For example, a 3DS Challange is always a stronger argument, than Frictionless, due to the latter requiring biometric (or similar) methods for card holder verification, that are extremely hard to circumvent by fraudsters. Something a Frictionless flow inherently does not have.

Does that mean, that a 3DS Challenge is more secure? Yes, it does indeed, but it also is a greater hassle for the card holder to go through, than a Frictionless flow. **It also does not mean, that a Frictionless flow is completely insecure.** There are simply different levels of security, that come with greater hurdles and thus "friction" for the card holder, hence the name. These hurdles can cause the card holder to abort the payment.

Being aware of this is very important and depending on your business, Saferpay offers the option to influence these things. Low risk businesses may be perfectly fine with the normal 3DS behavior, while high risk merchants may want to consider to [force the 3DS challenge](#forcing-a-3ds-challenge) for that extra level of security, in exchange for a **_maybe_** lower conversion-rate.

It is up to you, what measures to employ in this case and what fits best for your business.

## ALWAYS check the 3DS response

No matter, what you request, or what you expect, you must always check the 3DS response. There are cases, where transactions without Liabilityshift happen, even though 3DS is activated, has been attempted, and you even requested a 3DS challenge.

At the end of the day, it is the card holders bank, who is in full control here. They may have to follow certain rules, but they also have the right to accept the transaction, but reject the Liabilityshift.

In order to have the outcome in your favor, please always check the API response from Saferpay and decide accordingly, to make 100% sure, that everything is to your liking.

## 3-D Secure on API-Level

The Saferpay JSON-API does return all necessary information inside the Liability-Container, when using [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) or [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert). The important parameters are **AuthenticationType** and especially **LiabilityShift**. Furthermore **LiableEntity** will provide information about who will be liable in case of fraud.

{% hint style="danger" %}
&#x20;**Caution:** **Liability shift can only be granted through 3D Secure!**

Saferpay will return **LiabilityShift: false**, if the used payment method does not support 3D Secure at all! Please also check the used payment method, when making decisions, based on the LiabilityShift!

Information, about whether, or not a payment method does support 3DS, can be found in the respective [Payment Methods chapter](https://docs.saferpay.com/home/integration-guide/payment-methods)!
{% endhint %}

{% hint style="warning" %}
&#x20;**Attention:** Only the [Transaction interface](https://saferpay.github.io/sndbx/Integration_trx.html) and [Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html) processes do support 3-D Secure! Please keep that in mind, when implementing Saferpay!
{% endhint %}

{% hint style="info" %}
**Info:** With 3DSv2 the XID value format changes (see respective request specification and below), while the VerificationValue is no longer returned!
{% endhint %}

```json
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
```

### Recommended behaviors

It then depends on the merchant, how to proceed further. However Saferpay does recommend the following behaviors:

{% hint style="warning" %}
&#x20;**Attention:** These are **only recommendations!** Your credit card contract can dictate otherwise. Please contact your acquirer/card processor for further information!
{% endhint %}

{% hint style="info" %}
&#x20;**Tip:** Only want to accept transactions with LiabilityShift? Check out the **Condition**-flag, that can be set within the [Payment Page Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) and [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) requests, to control whether an authorization should be performed, or not, in the first place. **Important Note:** Issuers may reject the LiabilityShift with the authorization itself. The Condition-parameter does not cover such cases. Please still process the parameters accordingly!
{% endhint %}

<table data-header-hidden data-full-width="true"><thead><tr><th width="167">Authenticated</th><th width="162">LiabilityShift (Overall/3DS)</th><th width="131">Liable Entity</th><th width="153">Recommended behavior</th><th>Info</th></tr></thead><tbody><tr><td>Authentication Type</td><td>LiabilityShift</td><td>Liable Entity</td><td>Recommended behavior</td><td>Info</td></tr><tr><td><em>STRONG_CUSTOMER_AUTHENTICATION, FRICTIONLESS</em></td><td>true</td><td>THREEDS</td><td>Everything is okay. <strong>Continue transaction</strong></td><td>3D Secure has been performed successfully and Liabilityshift has been granted.</td></tr><tr><td><em>STRONG_CUSTOMER_AUTHENTICATION,</em> FRICTIONLESS, <em>NONE</em></td><td>false</td><td>MERCHANT</td><td><p>No Liability Shift is given.</p><p><strong>Abort transaction</strong></p></td><td>3DS has been performed, yet Liabilityshift has not been granted.</td></tr><tr><td>ATTEMPT</td><td>true|false</td><td>THREEDS|MERCHANT</td><td>In any case: <strong>Abort transaction</strong></td><td>3DS has been attempted, but could not be performed. The merchant is allowed to accept, if LiabilityShift is granted, though it is not recommended.</td></tr><tr><td>EXEMPTION</td><td>false</td><td>MERCHANT</td><td>No Liabilityshift has been granted.<br><strong>Continue transaction*</strong></td><td><p>This is a special case, where an Exemption has been granted, which skips the 3DS process alltogether. No Liabilityshift is given in this case.</p><p><br>*Since Exemptions must be specifically requested by the merchant, this may be wanted behavior.<br><br>More about exemptions <a href="../psd2#sca-exemptions">see here</a>.</p></td></tr></tbody></table>

{% hint style="warning" %}
&#x20;**Attention:** If you intend on doing a dummy authorization, using 3-D Secure as a card holder verification measure, we do not recommend an amount < 1,-! Small amounts often get rejected by issuing banks, thus causing issues, with amount 0 not being possible at all. **However**, if you just want to register and validate cards, without charging them, you may want to take a look at the [Online Strong Card Check](https://saferpay.github.io/sndbx/scd.html#scd-check), you can perform with a standalone card registration!
{% endhint %}

### Forcing a 3DS Challenge

If you want to force a Challanged flow, for instance, if you have a high-risk business and are in need of a high level of protection, you can set the parameter **Authentication.ThreeDsChallenge** to **FORCE** for the [**Payment Page**](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page) and [**Transaction Interface**](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) and an [**ONLINE_CHALLENGED check**](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#the-check-function) for the [**standalone card registration**](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration)**.**

{% hint style="danger" %}
While this setting does cover 99% of all transactions, Worldline has been made aware of certain banks behaving in a non-compliant manner.

Thusly, it can happen, that some transactions will be processed as frictionless, even though a challenge has been requested.

Please always check the **`AuthenticationType`** and make sure, that it is set to **\*`STRONG_CUSTOMER_AUTHENTICATION`**.\*

This behavior is currently out of the control of Worldline Saferpay and has been reported.
{% endhint %}

{% hint style="danger" %}
**Important:** All other values, like the **AVOID** and the **Exemption parameter** underly the PSD2 rules. **DO NOT** submit these on your own accord, without having read and understood the [PSD2 Chapter](https://saferpay.github.io/sndbx/psd2.html). Violating these rules may result in heavy consequences for you and your business. **Authentication.ThreeDsChallenge = FORCE** is the only value you may use, without considering these rules.
{% endhint %}

### Cards without 3DS

Whilst 3DS is generally a process, that is pushed by the card schemes, there are cards, that do not use it.

In rare cases, you will encounter so called business cards. These cards have been issued towards a business as a whole and not a single person. Since 3DS relies on the card being owned by a single person, it is not feasable to be used here.

Saferpay does try to detect these cards, based on their BIN range. You'll get this information with the rest of the transaction-data inside the **`PaymentMeans.Card.HolderSegment`** parameter.

{% hint style="warning" %}
Please note, that this detection is not 100% perfect, as issuers sometimes do not stick to the designated BIN-ranges. In these case, Saferpay has no way of knowing the HolderSegment.
{% endhint %}

{% hint style="info" %}
Saferpay offers an option to block these cards, if so desired, by using the [Risk Management from the Backoffice](https://docs.saferpay.com/home/interfaces/backoffice/risk-management#card-type).

Note, that this block-list also relies on the BIN-range detection.
{% endhint %}

The more likely encounter however, will be cards, that simply have not been activated by the card holder yet. In most cases, the card holder needs to perform a one time 3DS activation for their card. Be it inside an app, or by other means.

Especially if the card holder never owned a card before and just now got one for themselves, this step may get lost and they attempt to perform a transaction without 3DS. These transactions then usually fail, until the card holder performs said activation.

In some cases, Saferpay does get the appropriate information, as to how to do said activation. If so, you will also get this message from Saferpay inside the **`PayerMessage`** parameter, so you may display it to your customer.

#### Example

A response may look like this:

```json
{
    "ResponseHeader": {
        "SpecVersion": "[current Spec-Version]",
        "RequestId": "[your request id]"
    },
    "Behavior": "DO_NOT_RETRY",
    "ErrorName": "3DS_AUTHENTICATION_FAILED",
    "ErrorMessage": "3D-Secure authentication failed",
    "TransactionId": "b5zQ22b6r9zOtAnES2Uxb6KOY14b",
    "OrderId": "4",
    "PayerMessage": "This card has not yet been activated for 3D Secure. Please follow this link, in order to activate it: https://www.somebank.com/3-d-secure"
}
```

## Compliance and conversion-rate

Since 2024, the Schemes make it mandatory to submit certain parameters during a transaction, in order for 3DS to work and the authorization to be accepted. This also helps to minimize the risk of a 3D Secure challenge, reducing the number of redirects needed and thusly the friction for your customers during checkout, making the experience smoother and increasing the conversion-rate.

Saferpay already collects certain data-points automatically, like:

- **Card Holder Name:** This field is displayed by default on all Saferpay forms.
- **Browser-Data:** Saferpay does collect this data upon redirect to Saferpay. However, you can also [pass it to Saferpay beforehand](#capturing-browser-data).
- **IP-Address:** Saferpay does capture the IP automatically, upon redirect, though you can [submit it beforehand, using the Address containers](#capturing-the-address).

The following data-points **are NOT captured** automatically and need to be captured and submitted by you:

- **Card Holder E-Mail:** The E-Mail must be submitted, by using the address-containers, [as described below.](#capturing-the-address)

### Capturing the address

**While for the most part optional**, the more data you submit, the higher the chance of avoiding a 3DS Challenge. So if you want to minimize the friction for your customers, Saferpay recommends, that you submit their whole address, using the **`Payer.BillingAddress`** and **`DeliveryAddress`** containers, within the respective Initialize requests. If you only have one of the two, or if they are the same, simply submit the same address with both.

### Capturing browser-data

In order for the 3DS fraud-scoring to work, Saferpay has to submit certain data-points towards the 3DS provider, like the customer addresses (see above) and also certain browser information.

This data is then only used for the scoring process, to evaluate, if a frictionless-flow is applicable, or if the risk is too high, so a 3D Secure challenge has to be performed.

#### Payment Page

The [Saferpay Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page) does collect the necessary data upon redirect. No additional steps are needed.

#### Transaction Interface

The [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface), due to its more integrated nature, can do it in two ways:

- Like the Payment Page, the necessary data is collected automatically upon redirect to the RedirectUrl.
- The merchant can alternatively submit the necessary data with the [Transaction Initialize](https://docs.saferpay.com/home/licences-and-interfaces/transaction-interface#1-transaction-initialize), within the Payer-container:

{% code title="Example" %}

```json
"Payer":{
    "AcceptHeader": "text/html,application/xhtml\u002Bxml,application/xml",
    "IpAddress": "192.189.3.2",
    "Ipv6Address2001": "0db8:0000:0042:0000:8a2e:0370:7334",
    "JavaEnabled": true,
    "LanguageCode": "en",
    "ColorDepth": "10bit",
    "ScreenHeight": 1080,
    "ScreenWidth": 1920,
    "TimeZoneOffsetMinutes": 720,
    "UserAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    "JavascriptEnabled": true
}
```

{% endcode %}

This data will then be forwarded to the 3DS-provider, which could lead to the redirect towards the RedirectUrl not being necessary. The parameter **`RedirectRequired`** inside the [Transaction Initialize response](https://docs.saferpay.com/home/licences-and-interfaces/transaction-interface#transaction-initialize-response) would then be set to **`false`** and no **`RedirectUrl`** will be returned. This can be used to streamline the user-experience on your site, through negating the need for a redirect, in case of a frictionless flow.

## Using external 3DS providers

While Saferpay does mainly use its own 3D Secure implementation, it is capable of accepting data from external 3D Secure providers, if necessary.

You can use the [Authorize Direct request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) for transactions and [Insert Direct](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_InsertDirect) for registrations to pass this data towards Saferpay for an authorization, inside the **`Authentication.ExternalThreeDS`** container.

However note the following things, when integrating this feature:

- **Spec Version 1.47+** is required.
- For Authorize Direct:&#x20;
    - Please make sure, to also set the **`Initiator`** parameter to **`"PAYER"`**, to flag this as a Customer Initiated Transaction (CIT).
- For insert Direct:
    - Please make sure to set the **`Check`** container with **`Type`** set to **`"ONLINE_STRONG"`**.
    - Please make sure to force a full 3D Secure challenge. A Frictionless authentication may cause problems with the authorization.
- [Dynamic Currency Conversion](https://docs.saferpay.com/home/integration-guide/general-information/dynamic-currency-conversion) is **not supported** in this case.

Saferpay will then use the provided 3DS data and perform a normal authorization. The response will then also return any information on the [Liability Shift](#what-is-liability-shift-and-why-is-it-important-for-me-as-a-merchant).

{% hint style="info" %}
Please do not forget to also [capture](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing), or [cancel](https://docs.saferpay.com/home/licences-and-interfaces/transaction-interface/refunds#difference-between-cancel-and-refund) your transaction.
{% endhint %}

### Configuration

The configuration of your 3DS solution does need certain datapoints to function properly. Specifically the following:

- **MerchantId:** The MerchantId is your [contract number](https://docs.saferpay.com/home/master/common-saferpay-terms-glossary#contract-number). You can [find it inside the Saferpay Backoffice under Settings > Terminals](https://docs.saferpay.com/home/interfaces/backoffice/settings#payment-means-terminals) for the given Payment Method.
- **Acquirer BIN:** The Acquirer BIN is the identification-number of your card processor, or acquirer. Please contact them, in order to get the BIN for your processor. Make sure to mention the contract-number (see above), as these are contract specific. Thusly, you may also have different BINs for different contract numbers and [TerminalIds](https://docs.saferpay.com/home/master/common-saferpay-terms-glossary#terminalid). [<mark style="color:$success;">**For Worldline Acquiring, please contact the Integration Support.**</mark>](https://docs.saferpay.com/home/support#integration-support)
