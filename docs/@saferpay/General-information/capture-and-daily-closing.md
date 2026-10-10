# Capture and Daily Closing

These two features are extremely important Saferpay features. Depending on the means of payment, the two can be directly associated with each other, and they must be carried out for the cash flow to be initiated to the merchant’s account. If no capture and batch has been executed, no money will be transferred.

This is why this dedicated chapter is so important. Here, we'll cover, what the capture is, how it is triggered and how you know, that it must be triggered.

{% hint style="warning" %}
To clarify one thing from the beginning:\
**Saferpay does not support automatic capturing**.

If a capture is needed, it always has to be executed by the merchant. The API allows you to automize the capture, but it is still executed by your system and not by Saferpay.
{% endhint %}

## Capture

The [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) serves to book and thus to conclude/finalize a payment. As long as a transaction has not passed through the capture, the amount is merely reserved (“authorized”), but it will not be transferred to the merchant account. This is, why the capture is so important.

On the API side, you receive information about the transaction via the **Transaction.Status** parameter, e.g. through the [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), or [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize). Transactions which have not yet been booked are visible in Saferpay Backoffice as **"Reservation"**, Reservations are marked as **"AUTHORIZED"** on API-level and have to go through the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), to be finalized:

```json
"Transaction": {
  "Type": "PURCHASE",
  "Status": "AUTHORIZED",
  "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
  "Date": "2015-09-18T09:19:27.078Z",
  "Amount": {
    "Value": "100",
    "CurrencyCode": "CHF"
  },
  "AcquirerName": "AcquirerName",
  "AcquirerReference": "Reference"
}
```

&#x20;If a transaction has already passed through, or does not need the capture, the status is changed to **“CAPTURED”**:

```json
"Transaction": {
  "Type": "PURCHASE",
  "Status": "CAPTURED",
  "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
  "Date": "2015-09-18T09:19:27.078Z",
  "Amount": {
    "Value": "100",
    "CurrencyCode": "CHF"
  },
  "AcquirerName": "AcquirerName",
  "AcquirerReference": "Reference"
}
```

A successful [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) may only be executed once. Should a second [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) be attempted, the API will throw an error, informing you, that the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) already happened:

```json
{
    "ResponseHeader": {
        "SpecVersion": "1.14",
        "RequestId": "93388d85dc4519ea37595121dd8bd4ae"
    },
    "Behavior": "ABORT",
    "ErrorName": "TRANSACTION_ALREADY_CAPTURED",
    "ErrorMessage": "Transaction already captured"
}
```

{% hint style="info" %}
Note, that this error doesn't mean, that this transaction has failed. It simply means, that the capture has already been executed, so the transaction is already finalized and the money will be transferred to your bank account.
{% endhint %}

Not all payment methods need a separate capture to trigger the cash flow. The respective[ Payment Method ](https://docs.saferpay.com/home/integration-guide/payment-methods)chapter will give you the necessary information, if a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) is needed. However, dynamically reacting on the **Transaction.Status** parameter is the preferred method, as this enables you to also react to more payment methods, that will be added to your account, down the line, with no, or just minimal code-changes.

{% hint style="info" %}
&#x20;Payment methods, that do not need the capture, will return the status **"CAPTURED"** right away.
{% endhint %}

### **Capturing a different amount and Multipart Captures**

The [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) can also be used to change the amount of the transaction. It is generally possible to capture less, than initially authorized. So applying things like voucher codes, or similar, is possible. Capturing more than initially authorized, however, may result in an error and is not recommended and sometimes downright blocked. This however depends on your processor/used payment method.

It is important to note, that a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) can only be performed once. The rest of the authorized amount will be released and can no longer be captured, if you capture less.

However, certain payment methods do support [Multipart Captures](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing/partial-captures), which allow you to claim the money in multiple, smaller chunks. Please refer to the given [payment method chapter](https://docs.saferpay.com/home/integration-guide/payment-methods), to see, if [Multipart Captures](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing/partial-captures) are supported.

### What if a capture fails?

This depends on the given payment-method and the processor behind it. Generally, if an authorization is successful, the capture should not be rejected, unless the [reservation-time has been exceeded](#reservation-times-and-delayed-captures), a technical problem has occurred, or the processor has very specific reasons to not accept the capture.

One example may be a suspicion of fraud, though the processor generally will reject the reservation beforehand, so that a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) isn't even needed.

However, should a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) be rejected, you are allowed to execute another attempt at another time. The exact time-frame also depends on the payment method and its processor, but it is generally recommended to do it within 24 hours.

Should the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) still be rejected, then please contact the support of the respective processor on that matter.

### Cancel

A [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) is the direct opposite of a capture. Instead of claiming the money, it releases the authorized amount. A [Cancel ](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)should always be performed, if you no longer want to [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) the money of a given transaction.

{% hint style="warning" %}
Note, that this does not apply, if you intend on using [Partial Captures](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing/partial-captures), as those do work in a different way, also in terms of releasing money! Please read the chapter there, on how to handle [Partial Captures](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/capture-and-daily-closing/partial-captures).
{% endhint %}

This is also important to understand, because the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) and the [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) are in direct relationship to one another. Generally

- If a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) is available, a [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) can also be performed.
- If a[ Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) has been performed, a [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) can no longer be issued. A [Refund](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface/refunds) has to be executed instead.
    - &#x20;If a [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) has been executed, you can no longer[ Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) the transaction and thus claim the money.

{% hint style="info" %}
Please refer to the given [payment method chapter](https://docs.saferpay.com/home/integration-guide/payment-methods) for more information, as there may be special cases.
{% endhint %}

### Reservation times & Delayed Captures

While it is possible and sometimes even necessary to delay a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), until the goods can be shipped, a reservation, made through a certain payment processor, may only last for a limited time only. If this timeframe is exceeded, the authorized amount is released and becomes available to the account holder again. This may have the result that the amount can no longer be claimed. We recommend to [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) an authorization as soon as possible. Either by direct API call, or manually via Saferpay Backoffice.

The time-frame depends on the given payment method and your contract with your processor. Please ask there for further information. In case of Worldline (e.g. credit cards), please contact your account manager or [our sales department](https://docs.saferpay.com/home/support#worldline-sales-team).

### Smart decision-making

Just capturing every transaction, may not be the smartest thing to do for your business.\
Remember: <mark style="color:orange;">**A capture not only initiates the money-flow, it also is you -the merchant- accepting this transaction and everything, that comes with it.**</mark>

There are multiple things, that should be considered, when making this decision, like:

- Do I have Liability Shift through [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure)?
- Do I trust this customer?
- Some countries even prohibit a capture, before the goods have been shipped to the customer. So the capture may only happen, if the goods are shipped to the payer.

These are just the most important things to consider, so please be smart about this and make the decision to capture wisely, to minimize fraud and legal troubles in certain countries.

## Daily Closing

The daily closing follows the capture once daily, automatically at 22h CEST. During this process, all transactions that have passed through the capture are filed with the payment method processor in order. Depending on the payment processor, this is also the point, where all captured transactions are paid out onto the merchant's bank-account. Please contact your processor for the given payment method, if you need more information.

It also serves as a "collecting" step, where all captured transactions are filed together, which then can be [viewed inside the Backoffice.](https://docs.saferpay.com/home/interfaces/backoffice/transactions/batch-close)&#x20;

### Triggering the Batch Close via API

If desired, this step can also be triggered via the Saferpay API. The request necessary for this is called [Batch Close](http://saferpay.github.io/jsonapi/index.html#ChapterBatch).

However, before you can use the API, you need to disable the daily closing in the Saferpay Backoffice via "[Settings -> Terminals](https://docs.saferpay.com/home/interfaces/backoffice/settings#payment-means-terminals)" for the respective terminal.&#x20;

{% hint style="warning" %}
A Batch Close **must** be carried out only once a day. It is possible to do it multiple times, but it is only recommended to do so, if really needed.&#x20;

If you deactivate the batch close, but then do not trigger it via API, it will lead to some transactions not being paid out, so make sure, that either one, or the other is being done.
{% endhint %}
