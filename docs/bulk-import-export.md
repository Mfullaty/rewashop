# Product and category bulk import/export

The product contract keeps the existing 60 column headings from `product_bulk_demo.xlsx`. Upload CSV, XLSX or XLS, with a maximum application limit of 20 MB. The web server's upload limit must also allow the file. Only the first workbook sheet is imported. The remaining sheets supply reference IDs.

For products, fill `name`, `main_category_id`, `unit_id`, `unit_price` and `stock`. Category and unit IDs must exist. Price can be zero and uses at most two decimal places; stock is a nonnegative whole number. Prices are stored in the website's configured currency, without a currency symbol. `minimum_purchase_qty` defaults to 1. Blank weight, discount, shipping cost and GST default to zero. Blank published defaults to 1; optional switches default to 0. Discount type defaults to amount, shipping to free and stock display to quantity.

Use existing numeric IDs for optional brands, flash sales, warranties and notes. Related category and frequently bought lists use commas between IDs. Product IDs selected by a seller must belong to that seller. Leave unused optional references blank or 0. A warranty or note switch set to 1 requires its corresponding ID. Use the reference IDs from a newly downloaded workbook; IDs in an old example may no longer exist. Keep barcode and SKU columns formatted as text to retain leading zeros. Discount amounts cannot exceed the price and percentage discounts cannot exceed 100%.

Date cells can be actual Excel dates. For text dates, choose the matching format on the upload page: YYYY-MM-DD for current templates/exports, or YYYY-DD-MM for older RewaShop exports. Selecting the old format avoids silently swapping ambiguous day/month values. Fill both discount dates or leave both blank; the end must not precede the start.

Media fields accept public HTTP/HTTPS URLs; lists are comma-separated. Import stores upload references and does not download external files. Product choices and variants are configured in the product editor. The legacy export contains one row per product, with the sum of live variant quantities and the first SKU; it is not a variant-level backup.

Import creates new products. It does not overwrite existing products or replace their inventory. Each row saves its product, stock, media references, relationships, translations and POS changes in one database transaction. Failed rows roll back completely. The upload page reports how many rows imported and which rows require correction, with up to 50 detailed messages. Correct and resubmit only the failed rows, avoiding duplicate successful imports.

Export retains the same 60 headings and eight sheets. Quantity comes from the live stock rows used by POS, rather than an obsolete product total. Barcode/SKU strings and text beginning with formula characters are written as literal Excel text. Unit names are resolved back to numeric unit IDs. Sellers receive only their own products and product-reference IDs.

Category workbooks retain their 11 headings. Only the Category Template sheet is imported, never Category/Attribute lookup sheets. Parent and attribute IDs are validated and each category row is transactional. Blank parent or 0 means a top-level category. The category upload reports successful and failed rows.

## Deployment

Deploy the complete 1.2.1 website update into the existing Laravel application root. Preserve `.env`, storage, uploads and existing POS keys. The import repair adds no migrations or Composer dependencies. Clear application/view caches with `php artisan optimize:clear`. The receipt migrations listed in `docs/pos/desktop-upgrade-1.2.md` are still required when upgrading from 1.1.
