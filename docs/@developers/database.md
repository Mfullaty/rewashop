# Database Schema

The Active eCommerce CMS utilizes a comprehensive relational database schema. Below is a high-level overview of the core entities and their relationships based on the Eloquent models present in `app/Models/`.

## User & Access Control

* **`users`** (`User` model): The central table for all system users (Customers, Admins, Sellers, Staff). Contains credentials, balances, and basic profile info.
* **`roles` / `permissions`** (Spatie): Manages RBAC for Staff and Administrators.
* **`customers`** / **`sellers`** / **`staff`** / **`delivery_boys`** / **`affiliate_users`**: Additional profile tables linked to the `users` table via `user_id` to store role-specific data.
* **`addresses`**: Polymorphic or direct relationship to store multiple delivery/billing addresses for users.

## Catalog & Products

* **`products`**: The core entity for items being sold. Includes fields for price, stock, SKU, category IDs, and media.
* **`categories`**, **`sub_categories`**, **`sub_sub_categories`**: Hierarchical taxonomy for products.
* **`brands`**: Represents product manufacturers or labels.
* **`attributes`** & **`attribute_values`**: Handles dynamic product variations (e.g., Size: L, Color: Red).
* **`product_stocks`**: Tracks inventory levels, often linked to specific attribute combinations.
* **`product_translations`**, **`category_translations`**: Support for multi-lingual content via the `Language` model.

## Orders & Transactions

* **`orders`**: Represents a completed checkout process. Contains total amounts, shipping status, and payment status.
* **`order_details`**: Line items within an order, mapping back to specific `products`.
* **`combined_orders`**: Used when an order spans multiple sellers, creating a unified checkout experience.
* **`carts`** & **`cart_products`**: Temporary tables storing items before checkout.
* **`payments`** & **`transactions`**: Records of financial operations, wallet top-ups, or order payments.

## Additional Features

* **Flash Deals** (`flash_deals`, `flash_deal_products`): Time-limited promotional campaigns.
* **Coupons** (`coupons`, `coupon_usages`): Discount codes applied at checkout.
* **Auctions** (`auction_product_bids`): Handling bid history for auctionable products.
* **Preorders** (`preorders`, `preorder_products`): Items ordered before they are released or back in stock.
* **Support** (`tickets`, `ticket_replies`): Customer service ticketing system.
* **Wallet** (`wallets`): Virtual balance system for users.
