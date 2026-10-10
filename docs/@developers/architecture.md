# Architecture

Active eCommerce CMS is built on **Laravel 10**, leveraging its standard Model-View-Controller (MVC) architecture. This document outlines the core structural patterns and directory layout used in the application.

## Directory Layout

The application adheres to the standard Laravel directory structure:

* **`app/`**: Contains the core logic, including Models, Controllers, Services, and Notifications.
* **`bootstrap/`**: Contains the application bootstrapping script and the cache directories.
* **`config/`**: Contains all configuration files (e.g., database, mail, app settings).
* **`database/`**: Contains database migrations, factories, and seeds.
* **`public/`**: The web root containing `index.php`, CSS, JavaScript, and uploaded assets.
* **`resources/`**: Contains uncompiled assets (Sass, JS), localization files, and Vue/Blade views.
* **`routes/`**: Defines all application routes (web, API, specific gateways).
* **`storage/`**: Stores compiled Blade templates, file-based sessions, file caches, and user-uploaded files.
* **`tests/`**: Contains automated tests.

## MVC Implementation

### 1. Models (`app/Models/`)
The application uses Eloquent ORM. Models represent database tables and encapsulate business logic related to data retrieval and relationships.
* **Example:** `Product.php` defines relationships like `$this->belongsTo(Category::class)`.
* **Pattern:** Fat models and thin controllers are generally encouraged, though complex operations might be offloaded to Services or Traits.

### 2. Controllers (`app/Http/Controllers/`)
Controllers handle incoming HTTP requests, process data, and return responses or views.
* Sub-namespaces often exist for API, Admin, Affiliate, and Seller-specific logic.

### 3. Views (`resources/views/`)
The system primarily uses Blade templating for server-side rendering, combined with Vue.js components for dynamic client-side interactions.

## Routing System

To manage a vast array of functionalities, the routing is split into multiple files within the `routes/` directory, rather than a single `web.php` file:
* **`web.php`**: Primary public web routes.
* **`admin.php`**: Routes requiring admin authentication and permissions.
* **`api.php`**: Main REST API routes, typically protected by Sanctum or JWT.
* **Gateway-Specific Routes**: E.g., `paytm.php`, `stripe.php`, `paypal.php` handling webhooks and callbacks for payment processors.

## Service Providers & Third-Party Packages
The CMS heavily utilizes packages to implement complex features:
* **`spatie/laravel-permission`**: Used for robust Role-Based Access Control (RBAC).
* **Payment Gateways**: Dedicated packages for Stripe, Razorpay, Paytm, Instamojo, and more (e.g., `stripe/stripe-php`, `razorpay/razorpay`).
* **`maatwebsite/excel`**: Used for CSV/Excel exports and imports (e.g., `ProductsExport`, `CustomersImport`).
* **`laravel/sanctum`** & **`lcobucci/jwt`**: Used for API authentication.
