# Setup and Installation

This guide covers the local development setup for the Active eCommerce CMS using **Laravel 10.x** and **PHP 8.2**.

## Prerequisites

Before setting up the project, ensure your local environment has the following installed:
* **PHP**: `>= 8.2`
* **Composer**: `>= 2.x`
* **Node.js**: `>= 16.x` and **NPM**
* **MySQL**: `>= 8.0` or MariaDB `>= 10.3`
* **Web Server**: Apache or Nginx (or use `php artisan serve` for local dev)

## Installation Steps

### 1. Clone or Extract the Repository
Ensure the project files are placed in your working directory (e.g., `c:\Users\User\Downloads\codecanyon-2LaaLW03-active-ecommerce-cms\install`).

### 2. Install PHP Dependencies
Run the following command to install the Laravel framework and third-party packages defined in `composer.json`.
```bash
composer install
```

### 3. Install Node.js Dependencies
Install the frontend dependencies required by Vue 2 and Laravel Mix.
```bash
npm install
```

### 4. Environment Configuration
Copy the sample environment file to `.env` if it doesn't already exist.
```bash
cp .env.example .env
```
Open the `.env` file and configure your database connection parameters:
```env
DB_CONNECTION=mysql
DB_HOST=12DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### 5. Generate Application Key
Generate a unique application key for Laravel encryption.
```bash
php artisan key:generate
```

### 6. Database Migration and Seeding
Import the provided SQL dump (`shop.sql`) into your database using a tool like phpMyAdmin, MySQL Workbench, or via command line:
```bash
mysql -u your_database_user -p your_database_name < shop.sql
```
*(Note: Because this is a pre-packaged CMS with an existing `shop.sql` file, importing the SQL file is preferred over running `php artisan migrate`, as the SQL dump contains the pre-configured base data and schema.)*

### 7. Storage Link
Create a symbolic link from `public/storage` to `storage/app/public` so uploaded files are accessible from the web.
```bash
php artisan storage:link
```

### 8. Compile Frontend Assets
Run Laravel Mix to compile the Vue components and SCSS/CSS files.
```bash
npm run dev
# or for production
npm run build
```

### 9. Serve the Application
You can now start the local development server:
```bash
php artisan serve
```
Visit `http://localhost:8000` in your browser.

## Common Artisan Commands

Here are a few helpful Artisan commands for daily development:
* `php artisan optimize:clear` - Clears the application, view, route, and config caches.
* `php artisan route:list` - Lists all registered routes.
* `php artisan make:controller NameController` - Scaffolds a new controller.
