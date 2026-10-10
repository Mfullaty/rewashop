# Iframe Integration and CSS

The Saferpay Payment Page, the transaction interface and Secure Card Data offer the options for iframe integration and custom design using Cascading Style Sheets (CSS). The following describes how these features can be used and what needs to be adhered to.

## Iframe Integration

iframe integration is supported for these methods/flows:

- [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)/[Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page)
- [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)/[Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface)
- [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)/[Standalone Secure Card Data Registration](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration)

The response message includes a respective **RedirectURL**, if successful executed. This URL needs to be embedded in the iframe.

### Iframe support

The following payment methods **do not** support the Iframe integration.

- [Account-to-Account](https://docs.saferpay.com/home/integration-guide/payment-methods/account-to-account-payments)[ Payments](https://docs.saferpay.com/home/integration-guide/payment-methods)
- [giropay](https://docs.saferpay.com/home/integration-guide/general-information/broken-reference)
- [paydirekt](https://docs.saferpay.com/home/integration-guide/general-information/broken-reference)
- [PayPal](https://docs.saferpay.com/home/integration-guide/payment-methods/paypal)
- [iDeal](https://docs.saferpay.com/home/integration-guide/payment-methods/ideal)
- [Sofort by Klarna](https://docs.saferpay.com/home/integration-guide/general-information/broken-reference)
- [eps](https://docs.saferpay.com/home/integration-guide/payment-methods/eps)
- [Postfinance Pay](https://docs.saferpay.com/home/integration-guide/payment-methods/swiss-postcard-and-postfinance)

In case of these Payment methods, Saferpay will break out of the Iframe, so the payment may be performed, using a full-size payment page.&#x20;

{% hint style="warning" %}
Please note, that your **ReturnUrls**, will then also be displayed in full size and not within your iFrame.
{% endhint %}

#### Pop-Up

Saferpay does not support pop-ups. Since most browser block pop-ups by default anyway, we highly recommend using other means, like lightboxes, or a direct iFrame embedding into your site.

### Integration

The integration is really simple. Simply execute a [Payment Page Initialize](https://docs.saferpay.com/home/licences-and-interfaces/payment-page#1-paymentpage-initialize-request), [Transaction initialize](https://docs.saferpay.com/home/licences-and-interfaces/transaction-interface#1-transaction-initialize), or an [Alias Insert](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration) and use the **RedirectUrl** as the src-attribute value for the iFrame:

```markup
<iframe name="fields-card-number" scrolling="no" src="<%= REDIRECT URL %>"></iframe>
```

### iFrames and the CORS-policy

[Cross-Origin Resource Sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is a security policy, that handles the sharing of external ressources on a given website, for instance externally hosted JavaScript libraries, but also iFrames. If this policy is not followed in a correct manner, it can happen, that the iFrame is blocked by the respective browser. When integrating Saferpay into an iFrame, please always consider this policy.

### Size of the iframe

The size of the iframe is communicated to the merchant via the `window.postMessage()` method, which can be captured using JavaScript. The iframe can thus be dynamically adapted to the content.

```markup
<html lang="en">
   <head>
      <title>Payment Form</title>
   </head>
   <body>
      <h1>Payment Form</h1>
      <iframe src= "<%= RedirectUrl %>"> </iframe>
   </body>
</html>
```

The message is transmitted in JSON format:

```javascript
{
  "message":"css",
  "height":450,
  "width":650
}
```

JavaScript example for receipt of message (for jQuery >= 1.9)

```javascript
$(window).bind("message", function (e) {
    if (e.originalEvent.data.height <= 450) return;
    $("#iframe").css("height", e.originalEvent.data.height + "px");
});
```

{% hint style="warning" %}
Not every page reports its size to the merchant’s system. However, Saferpay has to forward users to third parties during the payment process (Like with the 3D Secure procedure), thus we recommend a minimum size of 450x450 pixels, in case this feature is not supported by the site.
{% endhint %}

## Using CSS

{% hint style="warning" %}
&#x20;The CSS feature should not be used with the [Saferpay Payment Page](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/payment-page) as the feature is deprecated there. Please use the [Payment Page Configuration](https://docs.saferpay.com/home/interfaces/backoffice/settings/payment-page-configuration) instead.
{% endhint %}

The use of Cascading Style Sheets (CSS) is available via the following methods/flows:

- [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)/[Transaction Interface](https://docs.saferpay.com/home/integration-guide/licences-and-interfaces/transaction-interface)
- [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)/[Standalone Secure Card Data registration](https://docs.saferpay.com/home/licences-and-interfaces/secure-card-data#standalone-secure-card-data-registration)

With a request using the **Styling** container, the **CssUrl** parameter must be forwarded, alongside a reference to the CSS file which is to be used.

### CSS Elements

All browsers include tools that simplify designing with CSS. CSS can thus be edited directly in the browser, and the results can be observed.

**Example for Chrome browser**

With the right mouse button, click the item to be edited:

![(click to enlarge)](https://3537448238-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fzpi9teY7Tm2pCZ1Bw8zO%2Fuploads%2Foy4mHOXZ70NZv684PJ9f%2FCSS_Input.png?alt=media&token=8e53ece5-ed4b-4049-9c6c-e8efee7eb71e)

It opens a menu which shows the HTML code and the CSS classes with the corresponding attributes:

![(click to enlarge)](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_inspect_code.png)

As an example, the text colour is adjusted here (CSS attributes can also be added and removed, if supported by the browser):

![(click to enlarge)](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_inspect_color.png)

The change is immediately displayed in the browser. Then, the code simply needs to be transferred to the CSS file:

![(click to enlarge)](https://3537448238-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fzpi9teY7Tm2pCZ1Bw8zO%2Fuploads%2F4cV3Inoyn4lfXe8YpUAY%2FCSS_Input_Changed.png?alt=media&token=f83bf4bc-d66e-4ba7-a8a7-1199e640309d)

### Best practices

#### Do

- **Classes:** You should use the element-class, in order to select the element you want to style.
- **Selectors:** As a principle, all CSS selectors for CSS1, CSS2 and CSS3 are supported, depending on the used browser.

#### Don't

- **Element ID:** Element ID should not be used because the ID used may change without notice.
- **Element Attribute:** Element attributes should not be used, because attributes (name, value, data-\*, etc.) can change without notice.
- **Structure:** Do not rely on the HTML-structure staying the way it is. You should not go through the elements in order, or rely on the number of nodes staying the way they are.
    - Do not use (e.g.) nth-of-type(), sibling (+) selector, child(>) selector.

## Additional Information

- The CSS file that is referenced by the CssUrl parameter must be stored on a web server that supports HTTPS.
- When aiming for the [PCI DSS SAQ-A compliance](https://docs.saferpay.com/home/integration-guide/general-information/data-security-and-pci-dss), you must set the **ContentSecurityEnabled** parameter inside the **Styling**-container to **true**. Furthermore, you have to consider the following things:
    - Every bit of code must be contained within the same CSS file. Importing more than one file is not supported!
    - External files (Images, Fonts etc.) must be loaded via a Data-Url within the CSS file itself!
- It is recommended to display a progress bar while something is loading in an iframe.
- The PCI specifications **DO NOT** allow jumping into the iframe with JavaScript. So manipulating it, using JavaScript, is strictly prohibited!
- Some third party payment providers (e.g. PayPal) **DO NOT** support the integration inside an iframe. Thus, the PaymentPage will break out of the iframe beforehand.
- Integrating Saferpay via an iframe will also cause the SuccessUrls to be called inside said frame. If you want to present the return pages in full size, you can break out of the frame yourself, using JavaScript.

#### Example of iframe break out in JavaScript

{% hint style="warning" %}
Executing this code will re-load the return page, resulting in it being called twice.
{% endhint %}

```markup
<html lang="en">
    <head>
        <title>Success Page</title>
        <script type="text/javascript">
          function iframe_breakout()
          {
              if (top.location !== location){
                  top.location.href = document.location.href;
              }
          }
        </script>
    </head>
    <body onload="iframe_breakout()">

        SOME HTML…

    </body>
</html>
```
