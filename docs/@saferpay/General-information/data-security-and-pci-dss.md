# Data Security and PCI DSS

The credit card organisations have launched the safety program PCI DSS (Payment Card Industry Data Security Standard) to prevent misuse and fraudulent use of credit cards.

Please pay attention to the PCI DSS guidelines when setting up payment processes and deploying Saferpay.

When using the Saferpay Hosted Register Form together with the optional Saferpay Secure Card Data (SCD), you can set up and handle the payment process safely. No credit card numbers are processed, transferred or stored on your (web) servers.

To use the Saferpay Payment Page, card holders enter their credit card number and expiry date not within the merchant's e-commerce application, but instead within the Saferpay Payment Page. As the e-commerce application and Saferpay operate on physically separate platforms, there is no risk that the credit card information could be stored in the database of the merchant’s system.

The risk of misuse of credit card details is significantly reduced via the use of Saferpay Secure Card Data or the Saferpay Payment Page and the expenditure required for PCI DSS merchant certification is reduced significantly.

If you have questions about PCI DSS, your processor or a specialised company should be able to assist you. More information can also be found on the [PCI Security Standards Council website](https://www.pcisecuritystandards.org/).

{% hint style="info" %}
Need the PCI-certificate for Worldline Saferpay?

[**You can find it here.**](https://fra01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fsupport.worldline.com%2Fcontent%2Fdam%2Frb-shared%2Fdocuments%2Fpci-dss-certificate-worldline-switzerland-ltd-en.pdf&data=05%7C02%7Cintegration.saferpay%40worldline.com%7C14a7ce2bd67945dfa91808de6e3e38b9%7Cfda9decfe89243ac9d9f1a493f9f98d0%7C0%7C0%7C639069410695546933%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=IAGlMsR5g7CMj0DQXA%2BPnygqbcW1gouCDoWSIGld%2FTI%3D&reserved=0)
{% endhint %}

### Additional tips and hints in regards to PCI-compliancy

The following tips, tricks and also "don't"s should help to build a fully PCI-compliant shop-plattform, with relatively little effort.

#### Certification Levels

The PCI-DSS certification is devided into multiple compliance levels, called SAQ (Self Assigned Questionary). Each SAQ has its own set of questions and requirements to meet in order to be certified. **Every** party involved with the processing of credit card information has to be PCI-compliant. That includes you -the merchant-, your Payment Service Processor -in this case Saferpay- your Acquirer -for example SIX Payment Services- and the card holders bank -also called Issuer-. Each certification is valid for a year at most and has then to be renewed.

The two PCI levels most relevant for the majority of merchants integrating Saferpay into their webhsop are; SAQ-A and SAQ-A EP.

{% hint style="warning" %}
**Attention:** Saferpay is capable of covering multiple levels of PCI-compliance besides SAQ-A and EP. Please contact your acquirer/processor or a specialized company, should you have any questions regarding PCI compliancy. You can also find more information as well as sample SAQ-questionnaires [on the official PCI DSS website](https://www.pcisecuritystandards.org/document_library?category=saqs#results) to get a better understanding and overview about the requirements you have to meet as a merchant, or ask your Acquirer/Credit Card Processor (e.g. SIX Payment Services) for help!
{% endhint %}

#### &#x20;**SAQ-A**

This level of certification is the easiest to maintain for a merchant. It mostly involves using a solution, that is maintained by a fully PCI-certified processor. The merchant only specifies his PSP to be compliant, which then holds the risk and responsibility of being compliant. Saferpay is fully PCI SAQ-A compliant and offers solutions for the merchant to be SAQ-A compliant, however the merchant has to follow the following rules, in order to apply this to his plattform:\
&#x20;**The merchant must not use his own (HTML-)form to capture credit card data!** This is now forbidden for SAQ-A merchants, defined by the PCI DSS standard version 3, released on January 1st 2015! The merchant can use the [Saferpay Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html), [the Saferpay Fields](https://saferpay.github.io/sndbx/SaferpayFields.html), for a seamless integration, or the Hosted Forms inside an iFrame, provided by the [Transaction Interface](https://saferpay.github.io/sndbx/Integration_trx.html) and the Secure [Alias Store](https://saferpay.github.io/sndbx/scd.html#scd-sa).\
&#x20;**Every Element on the Payment Page and/or inside the iFrame, must be hosted by a PCI-certified processor!** The merchant is **NOT** allowed to add or change any elements by hosting **external** CSS, or by breaking into the iFrame, using JavaScript. Both the Payment Page as well as the Hosted Forms offer the necessary solutions to meet these PCI requirements. Please refer to chapter [Using CSS](https://saferpay.github.io/sndbx/CssiFrame.html#css-usecss) on how to use the CSS-styling-feature, while being SAQ-A compliant.

#### &#x20;**SAQ-A EP**

If the SAQ-A level does not suite your requirements or demands, you can certify for SAQ-A EP. This level is more advanced as it enables you to use your own (HTML-)form, however it also requires more effort to be certified. The certification process involves matters like intruder and virus scans and certain firewall configurations.

{% hint style="info" %}
**Note:** [The Saferpay Backoffice](https://docs.saferpay.com/home/interfaces/backoffice) itself offers tools to capture card details in a PCI-compliant manner, for [Mail Phone Order Transactions](https://docs.saferpay.com/home/interfaces/backoffice/transactions/authorization-and-payment), or just register them inside the [Secure Alias Store](https://docs.saferpay.com/home/interfaces/backoffice/secure-card-data). However the Backoffice does not offer an interface, to be integrated into a merchant-system. If that is required, a SAQ-A EP certification is inevitable!
{% endhint %}

### Processes, that are NOT allowed

&#x20;Even with an SAQ-A EP certification, some processes are still not allowed. The following describes such processes, that the merchant **MUST NOT DO UNDER ANY CIRCUMSTANCES and require an even higher certification:**

- **Credit Card Information**: It is not allowed to process credit card data through the merchants server. This includes, among others posting credit card data from an HTML-form to the merchant-server to perform a Saferpay request. It is especially forbidden to save credit card data. It doesn't just involve saving! It is enough, if the card details run through your system and be it for just a second! **All credit card information involving the Card Verification Code (CVC/CVV) and the card number (PAN), must be processed through Saferpay, if you aren't explicitly allowed to do otherwise!** Saferpay does offer the option, to post the collected data directly, however this can only be used by merchants that are fully PCI-certified and allowed to process/save credit card data accordingly.

{% hint style="danger" %}
**Warning: DO NOT** use real credit card details, when testing on the Saferpay test-environment! Even though the test accounts cannot process real payment means, it is also important to not share them in the first place on the test-system, for security reasons!
{% endhint %}
