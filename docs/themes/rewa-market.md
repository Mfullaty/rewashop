# Rewa Market design source

This document is the design reference for every Rewa Market page and future component. Theme key: `market`. Existing themes retain their templates and appearance.

## References and interpretation

1. The product-detail image supplied by Mustapha on 10 October 2026 is the primary visual reference: a quiet white header, oversized product photography, a vertical thumbnail rail, clear price hierarchy, compact variant pills, paired purchase buttons, understated tabs, and readable reviews. Use its visual hierarchy, not its sample products, prices, ratings, or brand.
2. https://www.alibaba.com/ supplies marketplace information architecture: prominent search, category discovery, account/cart utilities, clear seller information, and progressive product discovery. Do not copy claims about guarantees, delivery, or verified suppliers unless RewaShop actually supplies those values.
3. https://www.aliexpress.com/ is a secondary marketplace reference for product discovery. Its page could not be retrieved during implementation; do not represent this as a verified visual inspection.

Rewa Market combines that marketplace structure with the restrained product presentation in the supplied image. No sample products, invented discounts, synthetic reviews, or unimplemented promises belong in production templates.

## Design tokens

| Token | Rule |
| --- | --- |
| Primary | Existing dashboard `base_color`, RewaShop brand #e62e04 |
| Primary hover | Existing dashboard `base_hov_color` |
| Secondary | Existing dashboard `secondary_base_color`, RewaShop brand #FFBA00 |
| Secondary hover | Existing dashboard `secondary_base_hov_color` |
| Ink | #18191d |
| Muted ink | #626670 |
| Canvas | #f6f6f4 |
| Surface | #ffffff |
| Border | #e7e7e3 |
| Radius | 12px controls, 20px cards, 28px hero; pill purchase buttons |
| Type | Existing dashboard font; 16px body, 1.65 prose line height, compact bold headings |
| Width | 1440px storefront; 72ch long-form prose |
| Spacing | 4px baseline: 8, 12, 16, 24, 32, 48, 64 |
| Motion | 160ms hover/focus; respect reduced-motion preferences |

## Component rules

- Header: three levels, quiet utility row, logo/search/account row, category/menu row. Search remains a real GET form with the existing autocomplete hooks. Support configured menus, logo, sticky setting, full width, language, currency, seller registration, notifications, and cart.
- Home: editorial introduction plus configured desktop/mobile sliders, then merchant-configured merchandising sections. Preserve every section setting from the Nexa dashboard editor, including banners, categories, sellers, brands, classifieds, auctions, and preorders. Also provide coupon discovery and the additional banner levels 4 to 6 used by older marketplace layouts.
- Products: consistent neutral image surfaces, actual labels, variant selectors, wishlist/compare/cart controls, localized prices, and existing stock/discount/auction logic. Existing listing-card and product-detail templates retain their field and action contracts.
- Product detail: generous gallery, restrained purchase panel, pill selections, brand-colored primary purchase action, outlined secondary action, visible tabs and readable review surfaces. Preserve video, gallery/zoom, SKU, wholesale tiers, taxes, shipping/warranty/refund information, seller messaging, related products, and addon controls.
- Blog: editorial heading, image-led two-column story grid, search/category sidebar, readable article with share tools and recent posts. Use the existing SEO metadata and comment configuration.
- Account, auth, cart, checkout, seller, policy, and custom pages: share the same surfaces, typography, controls, focus treatment, borders, and spacing. Do not alter payment, authentication, or data-handling behavior for visual changes.
- Mobile: two product columns, stacked hero and detail panes, horizontally scrollable navigation, touch-sized controls. Respect RTL through logical properties and the existing RTL stylesheet.
- Keep visible keyboard focus. Do not hide configuration-driven content, truncate rich article bodies, or disable existing controls.

## Dashboard setup

1. Website Setup → Select Homepage → **Rewa Market** → Save.
2. Open the homepage editor. Existing merchandising controls remain available. The Rewa Market introduction adds editable eyebrow, title, description, button label/link, and a header mode. Additional marketplace settings configure coupon discovery and banner levels 4 to 6.
3. Choose **Rewa Market header** for the new marketplace header, or **Selected dashboard header** to retain any currently selected header layout.
4. Configure colors/font, Header, Footer, menus, language/currency, category layouts, and authentication layouts through their existing dashboard screens. The selected footer and mobile navigation are preserved.

No migration, new element IDs, or mandatory seed data are required. Switching back restores the previous theme templates. Uploaded content remains shared by design, just like the other themes.

## Validation and deployment

The theme's static assets are tracked under `public/assets/css/rewa-market.css`, `public/assets/js/rewa-market.js`, and `public/assets/img/pages/home-market.svg`. Deploy those files despite the repository's existing public-directory ignore rules. Run `php tests/theme-contract.php` for view/configuration contracts and `php tests/compile-market-views.php <path-to-vendor/autoload.php>` when Laravel dependencies are available. The latter compiles and lints changed Blade views without connecting to a production database. Run `php tests/render-market-hero.php <path-to-vendor/autoload.php>` to check the rendered hero with empty, populated, and localized merchant settings.

Before enabling on a live store, verify real product variants, cart/checkout, language/currency, gallery videos, addons, header/footer choices, rich articles, and RTL using the deployed asset bundle and a staging database. The source checkout omits the existing vendor assets and a database, so static/template verification cannot establish live checkout behavior or exact layout against those missing assets.
