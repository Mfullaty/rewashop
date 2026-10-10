# Core Modules

Active eCommerce CMS is highly modular. Below is a detailed look at the core sub-systems.

## 1. User Management System

The platform distinguishes between several types of users, leveraging the `users` table as the base and extending data through specific profile tables.

*   **Administrators & Staff**: Managed via Spatie's Laravel Permission package. Admins have full access, while Staff members are assigned specific Roles with distinct Permissions.
*   **Customers**: The standard end-user who browses and purchases products. Their details (shipping addresses, wishlist) are linked to their user account.
*   **Sellers (Multi-Vendor)**: If the multi-vendor addon is enabled, users can register as Sellers. They get a dedicated dashboard to manage their own `Shop`, `Products`, and `Orders`. The system handles commission calculations and seller payouts.
*   **Delivery Boys**: Dedicated users assigned to deliver specific orders. They have their own mobile or web interface to update order status.
*   **Affiliates**: Users who promote products via unique links and earn commissions based on the `AffiliateConfig` and `AffiliateStats`.

## 2. Catalog and Inventory

The catalog is the heart of the application, designed to be flexible enough for various product types.

*   **Products**: A product can be physical or digital. It belongs to a `Category` and optionally a `Brand`.
*   **Variations (Attributes & Colors)**: The CMS supports complex product variations. A single product might have multiple variants (e.g., Size M, Color Red) stored in `product_stocks`. Each variant can have its own SKU, price, and stock quantity.
*   **Flash Deals & Daily Deals**: Time-sensitive discounts that override standard product pricing.
*   **Auctions & Preorders**: Specialized sales models allowing customers to bid on items (`auction_product_bids`) or order items before release (`preorders`).

## 3. Order and Checkout Flow

The order process is designed to handle complex scenarios like multi-seller carts.

1.  **Cart**: Items are added to the `carts` table. The system calculates shipping and taxes dynamically based on the user's location (`zones`, `cities`) and the product's shipping rules.
2.  **Checkout**: The user selects a `PaymentMethod` (e.g., Stripe, Razorpay, Cash on Delivery).
3.  **Order Generation**:
    *   If the cart contains items from multiple sellers, the system generates a `CombinedOrder` and splits the individual components into separate `orders` (one per seller) so each seller can manage their fulfillment independently.
    *   `OrderDetails` are created for each line item.
4.  **Commission Extraction**: The system calculates the admin commission for seller orders based on category or seller-level commission rates.
5.  **Fulfillment**: Sellers or Admins update the order status (Pending -> Processing -> Shipped -> Delivered). If applicable, the order is assigned to a `DeliveryBoy`.

## 4. Payment and Shipping Gateways

*   **Payments**: The CMS supports over a dozen payment gateways. Each gateway typically has its own controller in `app/Http/Controllers/` and route file. Upon successful payment, webhooks/callbacks update the `Payment` and `Order` status.
*   **Shipping**: Shipping costs can be calculated based on flat rates, weight, or distance. Third-party integrations like Shiprocket or local carriers (Redx, Steadfast) are available.
