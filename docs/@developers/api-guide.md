# API Guide

This document provides an overview of the REST API endpoints available in the Active eCommerce CMS. This documentation is automatically generated from the provided Postman collection (`FlutterEcommerceAPI.postman_collection.json`).

## Base URL

The base URL for all API requests typically looks like: `https://your-domain.com/api/v2`

---

## Authorization

### Signup a new user

**Endpoint:** `POST` `{{baseurl}}/auth/signup`

### Signin an user

**Endpoint:** `POST` `{{baseurl}}/auth/login`

### Logout from session

**Endpoint:** `GET` `{{baseurl}}/auth/logout`

### Resend code (registration)

**Endpoint:** `POST` `{{baseurl}}//auth/resend_code`

### Confirm  code (registration)

**Endpoint:** `POST` `{{baseurl}}//auth/confirm_code`

### Password forget request

**Endpoint:** `POST` `{{baseurl}}//auth/password/forget_request`

### Password reset confirm

**Endpoint:** `POST` `{{baseurl}}//auth/password/resend_code`

### Password resend code

**Endpoint:** `POST` `{{baseurl}}//auth/password/confirm_reset`

### Get user by access token

**Endpoint:** `POST` `{{baseurl}}/get-user-by-access_token`

## Brand

### Get all brands

**Endpoint:** `GET` `{{baseurl}}/brands`

### Get top brands

**Endpoint:** `GET` `{{baseurl}}/brands/top`

## Category

### Get all categories

**Endpoint:** `GET` `{{baseurl}}/categories/top`

### Get featured categories

**Endpoint:** `GET` `{{baseurl}}/categories/featured`

### Get top categories

**Endpoint:** `GET` `{{baseurl}}/categories/top`

### Get home categories

**Endpoint:** `GET` `{{baseurl}}/home-categories`

### Get sub categories of category

**Endpoint:** `GET` `{{baseurl}}/sub-categories/1`

## Product

### FlashDeal

#### Get all flash deals

**Endpoint:** `GET` `{{baseurl}}/flash-deals`

#### Get all flash deal products

**Endpoint:** `GET` `{{baseurl}}/flash-deal-products/7`

### Get all products (paginated)

**Endpoint:** `GET` `{{baseurl}}/products?page=1`

### Get all products of admin (paginated)

**Endpoint:** `GET` `{{baseurl}}/products/admin?page=1`

### Get all products of seller (paginated)

**Endpoint:** `GET` `{{baseurl}}/products/seller/12?page=1`

### Get all products of category (paginated)

**Endpoint:** `GET` `{{baseurl}}/products/category/1?page=1&name=`

### Get all products of sub category (paginated)

**Endpoint:** `GET` `{{baseurl}}/products/sub-category/1?page=1`

### Get all products of brand (paginated)

**Endpoint:** `GET` `{{baseurl}}/products/brand/66?page=1`

### Get all products of todays deal

**Endpoint:** `GET` `{{baseurl}}/products/todays-deal`

### Get all featured products

**Endpoint:** `GET` `{{baseurl}}/products/featured`

### Get related products of product

**Endpoint:** `GET` `{{baseurl}}/products/related/102`

### Get top selling products from seller

**Endpoint:** `GET` `{{baseurl}}/products/top-from-seller/102`

### Get all best selling products

**Endpoint:** `GET` `{{baseurl}}/products/best-seller`

### Get all featured products

**Endpoint:** `GET` `{{baseurl}}/products/featured`

### Get details of product

**Endpoint:** `GET` `{{baseurl}}/products/206`

### Get variant price  of product

**Endpoint:** `GET` `{{baseurl}}/products/variant/price?id=102&color=F0F8FF&variants=ASDFGH,5433535`

### Searched Product

**Endpoint:** `GET` `{{baseurl}}/products/search`

## Wishlist

### Get wishlist of user

**Endpoint:** `GET` `{{baseurl}}/wishlists/8`

### Save to wishlist of user

**Endpoint:** `POST` `{{baseurl}}/wishlists`

### Remove from wishlist of user

**Endpoint:** `DELETE` `{{baseurl}}/wishlists/1`

### Check if product is in users wishlist

**Endpoint:** `GET` `{{baseurl}}/wishlists-check-product?product_id=11&user_id=8`

### new add to wishlist

**Endpoint:** `GET` `{{baseurl}}/wishlists-add-product?product_id=11&user_id=8`

### new remove from  wishlist

**Endpoint:** `GET` `{{baseurl}}/wishlists-remove-product?product_id=11&user_id=8`

## Purchase History

### Get purchase history of user

**Endpoint:** `GET` `{{baseurl}}/purchase-history/8`

### Get purchase history detail of purchase

**Endpoint:** `GET` `{{baseurl}}/purchase-history-details/1025`

### Get purchase history items

**Endpoint:** `GET` `{{baseurl}}/purchase-history-items/1141`

## Review

### Get all reviews of product

**Endpoint:** `GET` `{{baseurl}}/reviews/product/208`

### submit review

**Endpoint:** `POST` `{{baseurl}}/reviews/submit`

## Filter

### Filter page brands

**Endpoint:** `GET` `{{baseurl}}/filter/brands`

### Filter page categories

**Endpoint:** `GET` `{{baseurl}}/filter/brands`

## Shop

### Get all shops

**Endpoint:** `GET` `{{baseurl}}/shops`

### Get shop of user

**Endpoint:** `GET` `{{baseurl}}/shop/user/1`

### Get shop info

**Endpoint:** `GET` `{{baseurl}}/shops/details/11`

### Get shop new arrival

**Endpoint:** `GET` `{{baseurl}}/shops/products/new/11`

### Get shop top products

**Endpoint:** `GET` `{{baseurl}}/shops/products/top/11`

### Get shop featured products

**Endpoint:** `GET` `{{baseurl}}/shops/products/featured/1`

## Wallet

### Balance

**Endpoint:** `GET` `{{baseurl}}/wallet/balance/8`

### Balance List

**Endpoint:** `GET` `{{baseurl}}/wallet/history/8`

## Cart

### Add

**Endpoint:** `POST` `{{baseurl}}/carts/add`

### Get list

**Endpoint:** `POST` `{{baseurl}}/carts/{{user_id}}`

### Process

**Endpoint:** `POST` `{{baseurl}}/carts/process`

### summary

**Endpoint:** `GET` `{{baseurl}}/cart-summary/{{user_id}}/1`

## Shipping

### Shipping cost

**Endpoint:** `POST` `{{baseurl}}/shipping_cost`

## Address

### Get user addresses

**Endpoint:** `GET` `{{baseurl}}/user/shipping/address/{{user_id}}`

### Add user address

**Endpoint:** `POST` `{{baseurl}}/user/shipping/create`

### Delete address

**Endpoint:** `GET` `{{baseurl}}/user/shipping/delete/3`

### Get cities

**Endpoint:** `GET` `{{baseurl}}/cities`

### Get countries

**Endpoint:** `GET` `{{baseurl}}/countries`

### update address in cart

**Endpoint:** `POST` `{{baseurl}}/update-address-in-cart`

## Payment

### Get Payment type list

**Endpoint:** `GET` `{{baseurl}}/payment-types`

### order create

**Endpoint:** `GET` `{{baseurl}}/order/store`

### stripe screen

**Endpoint:** `GET` `{{baseurl}}/stripe?payment_type=cart_payment&order_id=1147&amount=23.50&user_id={{user_id}}`

### ge paypal url

**Endpoint:** `GET` ``

### paypal url

**Endpoint:** `GET` ``

### nagad begin

**Endpoint:** `GET` ``

## coupon

### coupon apply

**Endpoint:** `POST` `{{baseurl}}/coupon-apply`

### coupon remove

**Endpoint:** `POST` `{{baseurl}}/coupon-remove`

## profile

### get counters

**Endpoint:** `GET` `{{baseurl}}/profile/counters/{{user_id}}`

### profile update

**Endpoint:** `POST` `{{baseurl}}/profile/update`

### profile image update

**Endpoint:** `POST` `{{baseurl}}/profile/update-image`

## Delivery boy related

### Dashboard summary

**Endpoint:** `GET` ``

### Delivery List

**Endpoint:** `GET` `{{baseurl}}/{{delivery-boy-prefix}}/deliveries/completed/{{delivery-boy-user-id}}?date_range=""&payment_type=""`

### earning or collection summary

**Endpoint:** `GET` `{{baseurl}}/{{delivery-boy-prefix}}/earning/{{delivery-boy-user-id}}`

### earning or collection history

**Endpoint:** `GET` ``

### cancel request

**Endpoint:** `GET` ``

### delivery status change

**Endpoint:** `POST` `{{baseurl}}/{{delivery-boy-prefix}}/change-delivery-status`

## chat

### Conversations

**Endpoint:** `GET` ``

### messages

**Endpoint:** `GET` `{{baseurl}}/chat/messages/{{user_id}}`

## Get all banners

**Endpoint:** `GET` `{{baseurl}}/banners`

## Get business settings

**Endpoint:** `GET` `{{baseurl}}/business-settings`

## Get all colors

**Endpoint:** `GET` `{{baseurl}}/colors`

## Get all currencies

**Endpoint:** `GET` `{{baseurl}}/currencies`

## Get all sliders

**Endpoint:** `GET` `{{baseurl}}/sliders`

## Get app settings

**Endpoint:** `GET` `{{baseurl}}/settings`

