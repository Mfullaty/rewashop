# General Information

The following information is aplicable for multiple or all Saferpay Interfaces, like technical limitations, support for certain browsers and features, that are supported by multiple interfaces.

## General dos and don'ts

#### Plain text card details

The following is really important:

<mark style="color:red;">**Never, ever do a request with plain text card details, unless you are specifically allowed to do so by your acquirer!**</mark>

While Saferpay is able to accept plain text cards, you are only allowed to do so, if you have the necessary [PCI certification level](https://docs.saferpay.com/home/integration-guide/general-information/data-security-and-pci-dss). Not following this rule can lead to severe legal and financial consequences for you, so make sure, that you are allowed to handle this data.

As a rule of thumb: If you aren't sure, if you are allowed, then you most likely aren't.

Such a certification is so intensive in both manpower and financial ressources, that you should know about this detail. If you don't, then you probably are not certified.

{% hint style="info" %}
This guide generally assumes, that you do not have said certification and will thusly only cover cases, where such a high certification-level is not necessary, **unless stated otherwise**.

If you are certified and have questions about the integration of Saferpay on higher PCI-levels, [please contact our integration team](https://docs.saferpay.com/home/support#integration-support).
{% endhint %}

#### Polling

<mark style="color:red;">**Polling in general is strictly forbidden!**</mark>\
You should always react to the redirect and/or notification, that is triggered by our Gateway.

{% hint style="danger" %}
Not following this rule, can lead to your account being blocked.
{% endhint %}

#### Proactive requests

While polling is forbidden, you are allowed to execute calls proactively, but please do so in a sensible manner, for example:

- Do not initialize a payment and immediately start asking for the payment outcome. A payment takes time. The token is usually valid for up to one hour. So the process after a redirect can take up to one hour, though normal are 20 minutes at most.

#### Error Handling

React to the messages our gateway is giving you, not just the http response code. Our API does return [error messages with important details about the payment status](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/error-handling).\
Make sure, that your system reacts accordingly to these status.\
Executing another assert and the like on a payment, that previously reported a failure, does not make sense, as a failure won't magically turn into a success, if you ask multiple times.\
So make sure, that your system marks payments as failed, if our gateway returns a corresponding message.

#### Reactive behavior and Notifications

Saferpay is generally built upon giving you the necessary information and notifications to successfully process payments.&#x20;

While generally optional, it is highly recommended to use the Notification URL callbacks from Saferpay, whenever possible. They circumvent many technical limitations of normal redirects, like connection problems on the payers device (bad mobile connection and the like) and more.

{% hint style="warning" %}
Not using the notification can lead to successful payments not being registered by you shop.
{% endhint %}

Thusly, while possible, a proactive effort on your end should not be necessary.

For more information, see the corresponding flows, like the [Payment Page](https://docs.saferpay.com/home/licences-and-interfaces/payment-page#notification.successnotifyurl-and-notification.failnotifyurl) or the [Transaction Interface](https://docs.saferpay.com/home/licences-and-interfaces/transaction-interface#redirectnotifyurls).

#### Session handling

While Saferpay itself is not involved with your session-handling, here are some tips, that can avoid difficulties and unhappy customers:

Make sure, that your system handles multiple payment inits correctly. Always keep track of any payment initialization you do, even if it is just for one order. Any of these inits can lead to a successful payment, if redirected. So make sure, that your system keeps track of these inits.

For Saferpay, each init is its own new process, that has no connection to the previous one.

Do not overwrite old data with new one. This could lead to old inits resulting in a successful payment and your system asking for the outcome of the new one, confusing different datasets and processing the wrong data.

Always keep your data clean and keep track of everything your system does, so you do not confuse/miss important events.

The easiest solution would be to only allow one init per order, to make sure, that only one payment is active at a given time. This prevents multiple open processes, that could lead to multiple payments.

Should you still prefer the othe solution, make sure, that your system can also handle multiple payments, if that ever happens. Execute a transaction cancel or an automatic refund, if the order is already fully payed. [Proactively check the status](#proactive-requests) of the previous process. Maybe it is already payed, but a technical hiccup prevented the processing of the payment on your end.

Maybe use integration-methods, that only uses as many redirects as needed, for example the [Saferpay Fields](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/saferpay-fields) and open necessary redirects in a lightbox, so the payer can stay on your site, where you havve the most control and insight on the users and payments current status.

#### Session Timeouts

Generally, Saferpay has two timeouts, that are important:

- Inactivity timout: This timeout is triggered, if a payer is redirected to Saferpay, but then doesn't act for more, than <mark style="color:green;">**20 minutes**</mark>. The session will then be closed and no further action can be taken on that payment.
- General timeout: If the user is trying to pay, or is redirected to external sites (e.g. 3rd party payment methods, 3D Secure etc.), <mark style="color:orange;">**Saferpay will close the session after one hour, even if activity is observed**</mark>. However you can still perform other actions, like executing the Payment Page Assert and the like, to ask for the final status.

These timeouts are fixed and cannot be altered.\
If a specific session-timeout is important to you, we highly recommend the following:

- Do not use the [Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page) for credit cards and instead opt for more advanced methods, like the [Saferpay Fields](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/saferpay-fields), in conjunction with the [Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface) and a Lightbox or iFrame integration for necessary redirects, like [3D Secure](https://docs.saferpay.com/home/integration-guide/general-information/3d-secure). This way, you can keep the user on your site and also control the exact point of the transaction, giving you precise timing controls.
- 3rd party payment methods are generally a problem, because they mostly lack the possibility to control these timeouts on their end. So even if Saferpay would offer a way to set a timeout, it often cannot be forwarded to the 3rd party payment processor. \
  In this case, we'd advise against their use in these circumstances.

#### Logging

Keep an eye open on suspicious behavior. For example:&#x20;

Track, if the Notification callbacks from Saferpay actually reach your system. If they don't, maybe there is an issue on your end, that prevents Saferpay from reaching you.

Do you have a high failure/abort-rate? Maybe it is just one user, trying over and over again, with the same, wrong credentials. Maybe there is a mistake in your integration. Maybe it is fraudulent and the systems are actually successfully preventing attempts to scam you.

## TLS Security and Connection Settings

We regularly review our security settings and try to find an optimal balance between maximum security and backward compatibility. Due to current developments in communication standards and regulatory requirements, it is nevertheless necessary to make occasional adjustments to our communication endpoints.

### SSL Certificates

SSL certificates are used to encrypt the data-transfer between you and the Saferpay payment gateway. As threats grow more frequent and also dangerous, it is necessary to frequently change these certificates.

For most systems, this may not be an issue, however there are cases, where you -the merchant- may be in need of getting said certificates, for example in case of a trust-store, where your system only trusts certificates, that have been added to the trust store.

For further information and a download of all the relevant certificates, [<mark style="color:blue;">please follow this link</mark>.](https://worldline.com/en-ch/home/top-navigation/developers/e-commerce-developer/certificates)

{% hint style="warning" %}
Furthermore, Saferpay does not recommend, that you use "Certificate pinning". This will lead to issues due to unannounced changes.
{% endhint %}

### TLS Version

For encrypted communication (HTTPS) with Saferpay, **TLS 1.2** must be used as protocol for transport encryption. Unencrypted communication (HTTP) or earlier versions of TLS or SSL are not supported.

### Cipher Suites

Furthermore, at least one of the following encryption algorithms (Cipher Suites) must be used to establish a connection to Saferpay:

- TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
- TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
- TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
- TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
- <mark style="color:red;">TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 (Supported until 2025-05-26 on live system. Was deactivated on test environment on 2025-02-13.)</mark>
- <mark style="color:red;">DHE_RSA_WITH_AES_128_CBC_SHA256 (Supported until 2025-05-26 on the live system. Was deactivated on test environment on 2025-02-13.)</mark>

### Hosts, IP Addresses and ports, used by Saferpay

In some cases it may be necessary to whitelist the outgoing and especially incoming hosts inside your firewall.

#### Incoming

The following hosts are for **incoming connections towards** **Saferpay**:

- **[www.saferpay.com](http://www.saferpay.com)** for connecting to the production environment
- **test.saferpay.com** for connecting to the sandbox (test environment)

#### Outgoing

The following hosts are for **outgoing connections towards** **the merchant**:

When possible, please whitelist the host **`wave.six-group.com`**.

Should this not be possible, you should implement an IP lookup against this host, maybe once every month, e.g.

```bash
nslookup wave.six-group.com
```

{% hint style="info" %}
Any kind of authentication towards the merchant-system -e.g. client certificate-, is currently not supported by Saferpay.
{% endhint %}

Are both options not available to you, you can find the outgoing IPs below.

{% hint style="warning" %}
Please note that the IP addresses listed below may change on short or even without prior notification. We highly recommend using one of the previously mentioned options instead.
{% endhint %}

153.46.97.94\
153.46.97.98\
153.46.97.121\
153.46.105.98\
153.46.105.121\
153.46.244.84\
193.247.180.4

#### Ports

For both, incoming and outgoing, Saferpay will use the standard http(s) ports **`80`** and **`443`**. Other ports are currently not supported.

### HTTP Settings

Usually, Saferpay can process any official header, that is sent during communication. However, there are certain things to make sure, in order to not run into problems:

- <mark style="color:red;">**Please do not use**</mark> **`Connection: keep-alive`** for communicating with Saferpay. It can cause connection-issues and poor performance, due to it circumventing our load-balancing and failover-behaviors. Please make sure, that you use **`Connection: close`** instead, so Saferpay can correctly manage your incoming requests, to provide the best service.
- <mark style="color:red;">**HTTP chunking is not supported**</mark> and will lead to your connection to Saferpay getting rejected.
- Some environments send their own custom headers and values. While Saferpay aims to handle these, we are also bound by certain rules, to protect our network. These rules could lead to your request being rejected, if suspicious headers, or values are detected.
    - Likewise, some environments also send custom authentication values and certificates (Aside the standard SSL certificate). Please make sure, that this is not the case, as Saferpay will consider these for [API authentication](https://docs.saferpay.com/home/interfaces/backoffice/settings/json-api-basic-client-certificate-authentication#client-certificate), which will lead to a rejected authentication.

## Supported Browsers

Saferpay Supports all common, modern browsers, like&#x20;

- Chrome/Chromium (and all Chromium-based browsers, like Edge, Opera etc.)
- Firefox
- Safari

#### The following browsers are <mark style="color:red;">not</mark> supported

- Microsoft Internet Explorer (all versions)
- Internet Explorer compatibility mode for Microsoft Edge

{% hint style="warning" %}
Please note, that integrated browsers and web-view libraries for Apps can behave differently from their bigger counterparts.

Generally, Saferpay does support and has been tested with the default core-libraries from modern Operating-Systems (iOS, Android etc.). However, their behavior is also dependent on your specific integration. 3rd party libraries could also cause issues and weird behavior, if they deviate from the standard.

[Our test-environment](https://docs.saferpay.com/home/integration-guide/testing-and-go-live) should help you greatly in identifying these problems, but note, that Saferpay also redirects towards 3rd party web-sites (Like PayPal, iDeal etc.), that are not under the control of Saferpay and could cause issues.

<mark style="color:green;">**This does not mean, that Saferpay will not function correctly.**</mark> You should just be aware of these challanges, before starting an integration, that is reliant on these special libraries and tools.
{% endhint %}

## Need help?

Is your integration not working the way you want it to?\
[Contact our integration team](https://docs.saferpay.com/home/support#integration-support) for help with integrating Saferpay.
