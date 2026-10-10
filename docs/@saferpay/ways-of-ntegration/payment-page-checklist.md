# Payment Page checklist

## **Introduction**

Thank you for choosing the Saferpay online payment system. We are happy to provide you with a checklist to help you integrate the Saferpay Payment Page (PP) into your platform.

### **Target group**

This website is aimed at programmers and merchants who want to integrate the Saferpay interface individually.

For all other merchants: Please see our large [collection of Saferpay Plugins](https://docs.saferpay.com/home/master/web-shop-plug-ins) for common shop environments.

### **Feedback**

Please send us your feedback and comments or suggestions regarding this checklist by e-mail using your Saferpay Customer ID to [integration.saferpay@six-payment-services.com](<mailto:integration.saferpay@six-payment-services.com?subject=Feedback%20zur%20Checkliste%20für%20individuelle%20Payment%20Page%20Integration&body=Customer%20ID:%20(Bitte%20angeben,%20sofern%20vorhanden)>).

### **Testing environment**

Saferpay offers you the opportunity to test all interfaces with a test account set up specifically for you. To sign up, click on the following link: <https://test.saferpay.com/BO/SignUp>

## P**reparation**

{% hint style="info" %}
To do this, log into the Saferpay Backoffice first.

- [Test Backoffice](https://test.saferpay.com/bo/login)

- [Live Backoffice](https://www.saferpay.com/bo/login)
  {% endhint %}

- [ ] **Set up JSON API credentials**

    First you need to create your [JSON API credentials](https://docs.saferpay.com/home/interfaces/backoffice/settings/json-api-basic-client-certificate-authentication).<br>

- [ ] **Set up important notifications**

    Please ensure to [set up your mail notifications](https://docs.saferpay.com/home/interfaces/backoffice/settings#notifications), to get informed about important topics, like technical changes on the Saferpay interface, deactivation of features, releasenotes and more.

- [ ] **Payment Page configuration**

    If desired, you can also customize the Payment Page, using a [Payment Page configuration](https://docs.saferpay.com/home/interfaces/backoffice/settings/payment-page-configuration).

## Before payment

{% hint style="info" %}
For more information about Payment Page Initialize, please see our [Payment Page Integration Guide](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page/..#1-paymentpage-initialize-request).
{% endhint %}

- [ ] **Displayed amount and currency**

    The amount and currency are correctly displayed.

- [ ] **Correct final amount**

    Shipping costs, etc. are included in the final amount.

- [ ] **Selected means of payment**

    The means of payment are correctly displayed.

- [ ] **Offer description**

    The offer description is correctly displayed.

- [ ] ReturnURL

    [The ReturnUrl](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page#returnurls) is set correctly.<br>

- [ ] **Order ID**\
      Check if [the Order ID](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page#payment.orderid) is submitted.

- [ ] **Notification URLs**

    The [Notification URLs](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page#notification.successnotifyurl-and-notification.failnotifyurl) are submitted correctly.

{% hint style="warning" %}
We **strongly** recommend that you work with the Notification URLs!
{% endhint %}

## Payment

- [ ] **Displayed information**\
      The information on the Payment Page is displayed correctly
    - [ ] **Payment Methods:** The desired payment methods are displayed correctly.
    - [ ] **Amount:** The amount is correct.
    - [ ] **Description:** The description is to your liking.
    - [ ] **Merchant Information:** The information about the merchant is correct.

{% hint style="info" %}
The merchant information is stored on Saferpay side. You can't change it via the Saferpay Backoffice!\
If you need adaptions on live environment, please contact your account manager. \
For changes on test environment contact the Saferpay Integration Support (<integration.saferpay@six-payment-services.com>)
{% endhint %}

## After the payment

- [ ] **Return URL**\
      Depending on the outcome of the transaction, the customer will be redirected to one of the following URLs:
    - Successful transactions: success link
    - Rejected transactions: fail link
    - Abort URL: for cancelled transactions. If this is not set, the fail link will be used instead!

- [ ] **Notification URLs**\
      [Notification URLs](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page#notification.successnotifyurl-and-notification.failnotifyurl) were called. This confirms the current transaction status to your shop, in addition to the Return URLs.<br>

- [ ] **Confirms/validates the payment**

    The [Payment Page Assert](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page/..#4-paymentpage-assert) was called on Notification/|redirect to Return URLs and the data has been validated successfully:
    - [ ] **LiabilityShift:** This transaction has liabilityshift through [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure).
    - [ ] **Transaction.Id:** [The transactionId](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page#transaction.id) has been extracted and saved for further processing
    - [ ] **Transaction.Status:** [The transaction status](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page#transaction.status) has been processed correctly and thus determined, if the next step is necessary/possible.<br>

- [ ] **Capture/Cancel**\
      The transaction is either [captured/booked, or cancelled](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page/..#5-capture-or-cancel), based on the outcome of the Assert

- [ ] **E-Mail notifications (optional)**\
      You, your employee and/or the customer have been notified of the payment.

## Contact

If you have any technical questions, please contact our [integration support team](https://docs.saferpay.com/home/support#integration-support). They will be happy to assist you.
