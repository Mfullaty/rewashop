# Rewa admin dashboard redesign

The redesign applies to every page using `backend.layouts.app`: dashboard, products, orders, customers, sellers, marketing, reports, website settings, system settings and addon administration. It provides a consistent navigation shell, toolbar, cards, forms, tables, tabs, dropdowns, upload controls and dialogs.

The dashboard overview uses the existing controller data and keeps the sales chart, seller controls, order metrics and AJAX ranking widgets. Existing routes, permissions, form fields, CSRF protection, native AIZ plugins, notifications and Seller Hub handlers are retained. Merchant sidebar colours, logo, language, RTL layout and font settings continue to apply.

Menu search filters links already rendered for the current staff member. Use **Ctrl K** or **Command K** to focus it. On phones, the sidebar supports Escape, a close button, an overlay and keyboard focus containment. Quick Menu and Add New remain available at phone widths.

## Why this is a direct update

`AddonController` installs addons by copying their `files` and `folders` into the application. The current script has no independent admin theme or view override hook. Packaging these views as an addon would still overwrite source files. This update uses the authorised direct redesign and shares the existing admin components.

## Install on Hostinger shared hosting

No database migration, Node build or new Composer dependency is required.

1. Merge the pull request and download the updated repository, or upload the following six changed application files to their matching locations in the Laravel project:

   - `resources/views/backend/layouts/app.blade.php`
   - `resources/views/backend/inc/admin_sidenav.blade.php`
   - `resources/views/backend/inc/admin_nav.blade.php`
   - `resources/views/backend/dashboard.blade.php`
   - `public/assets/css/rewa-admin.css`
   - `public/assets/js/rewa-admin.js`

2. Place the assets in the same public directory that currently serves `assets/css/aiz-core.css` and `assets/js/aiz-core.js`. Keep their existing files.
3. Click the existing **Clear Cache** toolbar action in the admin area. If SSH is available, the equivalent Laravel command from the project directory is:

   ```sh
   php artisan optimize:clear
   ```

4. Reload the browser. Check the overview, a product form, orders and staff navigation. Existing installed addons remain installed.

To revert the appearance, restore the four Blade files from the previous release and clear the cache. The new CSS/JS files can then be removed; this update changes no database rows.

## Validation

Standalone checks use Laravel's Blade compiler with controlled fixture data, rather than connecting to a production database:

```sh
php tests/compile-admin-views.php /path/to/laravel-view/vendor/autoload.php
php tests/render-admin-pages.php /path/to/laravel-view/vendor/autoload.php /tmp/admin-preview
node --check public/assets/js/rewa-admin.js
```

The compiler check covers all admin Blade views, including views outside `backend` that extend the shared layout. Rendering covers the dashboard, catalog, product creation, orders, reports, general settings, sidebar settings and addons, plus RTL, restricted staff, activated addon and single-vendor states. Browser checks use these rendered templates and the native vendor/AIZ assets. Fixture AJAX responses validate the interface and request wiring; they do not substitute for a deployment check of production uploads, payments or third-party addon workflows.
