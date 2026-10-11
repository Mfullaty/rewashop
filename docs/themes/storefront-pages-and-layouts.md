# Storefront pages and selectable layouts

The journal listing, article, brand directory and flash-deal listing use the shared `storefront-pages.css` and `storefront-pages.js` assets across storefront themes. Market and default blog routes render the same editorial views. Flash-deal product pages retain their existing product cards and commerce actions with updated presentation.

The journal preserves search, multiple category filters, query-aware pagination, publication dates, SEO fields, sharing and optional Facebook comments. Articles generate contents links from their own headings. The brand directory provides live name and alphabet filters, with a normal GET search when JavaScript is unavailable. Campaigns retain their real destinations, end dates and configured desktop/mobile promotional images, including mobile-only configurations.

| Selector option | Presentation | Shared native feature source |
| --- | --- | --- |
| Header 8, Atelier | Centred logo, editorial navigation and compact account controls | Header 7 |
| Header 9, Exchange | Utility strip, prominent search and separate marketplace navigation | Header 1 |
| Footer 4, Atelier | Light editorial directory with a broad newsletter introduction | Footer 1 |
| Footer 5, Exchange | Dark split layout with brand/subscription beside the directory | Footer 1 |

The layouts use the existing `header_element` and `footer_element` settings, element records, colour fields and selection endpoints. Native templates retain cart updates, search/autocomplete, language/currency, accounts, seller registration, notifications, megamenus, mobile navigation, newsletter forms, localized widgets, contact details, social links, apps, payments and addon-dependent controls. Shared language/currency handlers load for every header independently of its database ID. Colour defaults apply when selecting an option and remain editable through the existing setup screens. Sticky and full-width settings remain available. Header wrappers use `display: contents` so they do not confine the native sticky header to a short parent.

The registration migration adds four types and their editable colours. It preserves existing selections, IDs and edited values and can run repeatedly without duplicating records. A private business-setting record tracks the types/styles it created and the previous selections. Rollback moves affected selections back to their previous native layout, or a valid existing default if that layout is unavailable, applies the fallback's styles, removes only migration-created types/styles and invalidates the settings cache. Existing native selections and their current colours remain unchanged. If no valid fallback exists, rollback aborts the entire transaction.

Run the updated migration rollback before reverting this release's files, then clear cached views/configuration. Without an ownership record, rollback still repairs affected selections but retains untracked rows rather than guessing their origin. Admin previews resolve by layout name rather than row position, and the radio controls support keyboard selection.

Deploy the tracked public assets along with the PHP/Blade files, then run the targeted migration and clear cached configuration/views:

```sh
php artisan migrate --path=database/migrations/2026_10_11_160000_add_storefront_header_footer_layouts.php --force
php artisan optimize:clear
```

Choose the new layouts under Website Setup's existing Select Header Layouts and Select Footer Layouts screens. Use Header Setup and Footer Setup to change their colours, content, logo, menus and other settings. Existing choices remain selected until changed by an administrator.

Validation commands with installed Composer dependencies:

```sh
php tests/render-storefront-pages.php
php tests/storefront-layout-registration.php
php tests/compile-market-views.php
node tests/header-switchers.cjs
node --check public/assets/js/storefront-pages.js
```

The render checks use controlled fixtures without production data. The registration/rollback test requires PDO SQLite and uses an isolated database with real Laravel queries and transactions. The switcher test executes native Header 8 onclick handlers against the rendered shared scripts, intercepting POST requests to verify their payloads and reload callbacks. Responsive browser checks use native templates, the deployed display bundle and actual countdown code. Authenticated cart/account actions, form submissions and MySQL migration should also be verified against staging after deployment.
