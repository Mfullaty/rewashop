# Integrating Saferpay

Saferpay offers various ways to integrate payments into your application. This guide focuses on the usage of the Saferpay JSON API. Please see the _Interfaces_ section for other options.

The Saferpay JSON API (**J**ava**S**cript **O**bject **N**otation **A**pplication **P**rogramming **I**nterface), is a modern, streamlined interface that is independent of programming languages. The API supports all Saferpay methods and is suitable for all shop systems, call center solutions, merchandise management, ERP and CRM systems and other applications in which online payments are processed. This Integration Guide focuses on the basics of the Saferpay JSON API and serves as a guide for programmers, developers, and integrators.

This guide uses the [Saferpay JSON-API Specification](https://saferpay.github.io/jsonapi/) as a base reference and will frequently link to the respective Requests. All requests and parameters are specified there.

The sequential steps of the general integration process are described in our [Step-by-step Integration-Manual](https://worldline.com/de-ch/home/top-navigation/developers/e-commerce-developer/integration.html).

Using the JSON API requires the following:

- a valid [JSON API Basic Authentication credential or JSON API client certificate](https://saferpay.github.io/jsonapi/#authentication)
- a web client which complies with the [TLS requirements to communicate with the Saferpay servers](https://docs.saferpay.com/home/general-information#tls-security-and-communication-settings)
- at least one active Saferpay terminal via which payments can be carried out
- a Saferpay terminal number (TerminalId parameter) and your Saferpay customer number (CustomerId parameter).
- a valid acceptance agreement for credit cards or other payment methods.
- an environment, that is capable of doing HTTPS-POST requests, with JSON payload. Most frameworks and programming languages already support this out of the box. However, some shops and environments are rather unflexible, so checking this requirement, before integrating the JSON API, is very important.

## Open API Specification

Saferpay offers its complete API specification in the form of an Open API compliant Schema file. This enables you to easily build specification compliant requests from this file, making integrations even easier.

[You can find the Open API Specification over here.](https://test.saferpay.com/Api/swagger/index.html?url=/Api/swagger/1.50/swagger.json)

{% hint style="info" %}
Please note, that you cvan try the requests on that site, **but only on the test environment**.

Furthermore, you need to enter your API credentials, by first clicking on the **Authorize** button on the right. Also remember to enter your [**CustomerId**](https://docs.saferpay.com/home/master/common-saferpay-terms-glossary#customerid) and [**TerminalId**](https://docs.saferpay.com/home/master/common-saferpay-terms-glossary#terminalid) in the payloads.

For easier testing of flows and API behavior, [we'd also recommend using our Demo Environment](https://shop.saferpay.eu/saferpayintegration/).
{% endhint %}
