<?php

namespace App\Models;

use App\Models\ProductTranslation;
use App\Models\ProductStock;
use App\Models\User;
use App\Traits\PreventDemoModeChanges;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Str;
use Auth;
use Carbon\Carbon;

class ProductsImport implements ToCollection, WithHeadingRow, WithMultipleSheets
{
    use PreventDemoModeChanges;

    public function __construct(private readonly bool $legacyDates = false) {}
    public int $imported = 0;
    public int $skipped = 0;
    public array $errors = [];

    public function sheets(): array
    {
        return [
            0 => $this,
        ];
    }

    public function collection(Collection $rows)
    {
        if (env('DEMO_MODE') === 'On') { throw new \RuntimeException('Bulk import is disabled in demo mode.'); }
        $normalizer = new \App\Import\ProductRow($this->legacyDates);
        $rows=$rows->filter(fn($row)=>collect($row)->contains(fn($v)=>$v!==null&&trim((string)$v)!==''));
        $canImport = true;
        $user = Auth::user();
        if ($user->user_type == 'seller' && addon_is_activated('seller_subscription')) {
            if (
                (count($rows) + $user->products()->count()) > $user->shop->product_upload_limit
                || $user->shop->package_invalid_at == null
                || Carbon::now()->diffInDays(Carbon::parse($user->shop->package_invalid_at), false) < 0
            ) {
                $canImport = false;
                flash(translate('Please upgrade your package.'))->warning();
            }
        }

        if ($canImport) {
            foreach ($rows as $index => $row) {
                if (collect($row)->every(fn($v) => $v === null || trim((string)$v) === '')) { continue; }
                try { $row = $normalizer->normalize($row instanceof Collection ? $row->all() : (array)$row); }
                catch (\Illuminate\Validation\ValidationException $e) {
                    $this->skipped++; if(count($this->errors)<50)$this->errors[] = 'Row '.($index+2).': '.implode(' ',\Illuminate\Support\Arr::flatten($e->errors()));
                    continue;
                }

                $brandId=$row['brand_id']??null;
                $discountType=$row['discount_type'];$stockVisibilityState=$row['stock_visibility_state'];
                $frequentlyBoughtSelectionType=$row['frequently_bought_selection_type'];$shippingType=$row['shipping_type'];
                $boolValues=[];
                foreach(['published','featured','todays_deal','refundable','show_refund_notes','has_warranty','show_warranty_note',
                    'is_product_quantity_multiply','show_shipping_days','show_shipping_notes','enable_cash_on_delivery','show_cash_on_delivery_notes'] as $field){$boolValues[$field]=(int)$row[$field];}

                $approved = 1;
                if ($user->user_type == 'seller' && get_setting('product_approve_by_admin') == 1) {
                    $approved = 0;
                }

                try {
                    \Illuminate\Support\Facades\DB::transaction(function() use ($row,$user,$approved,$brandId,$discountType,$stockVisibilityState,$frequentlyBoughtSelectionType,$shippingType,$boolValues) {
                    $product = new Product();

                    $product->added_by = $user->user_type == 'seller' ? 'seller' : 'admin';
                    $product->user_id  = $user->user_type == 'seller' ? $user->id : User::where('user_type', 'admin')->first()->id;
                    $product->approved = $approved;
                    $product->slug     = preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', strtolower($row['name']))) . '-' . Str::random(5);

                    $product->name             = $row['name'];
                    $product->category_id      = $row['main_category_id'];
                    $product->brand_id         = $brandId; 
                    $product->unit             = $row['unit_id'];
                    $product->weight           = $row['weight'] ?? null;
                    $product->min_qty          = $row['minimum_purchase_qty'] ?? 1;
                    $product->barcode          = $row['barcode'] ?? null;
                    $product->tags             = $row['tags'] ?? null;

                    $product->thumbnail_img         = $this->uploadImage($row['thumbnail_img'] ?? null);
                    $product->photos                = $this->uploadImages($row['gallery_images'] ?? null);
                    $product->video_link            = $row['youtube_video_link'] ?? null;
                    $product->short_video           = $this->uploadVideos($row['videos'] ?? null);
                    $product->short_video_thumbnail = $this->uploadImage($row['video_thumbnail'] ?? null);
                    $product->pdf                   = $this->uploadPdf($row['pdf_specification'] ?? null);

                    $product->description      = $row['description'] ?? null;
                    $product->meta_title       = $row['meta_title'] ?? null;
                    $product->meta_description = $row['meta_description'] ?? null;
                    $product->meta_img         = $this->uploadImage($row['meta_image'] ?? null);
                    $product->meta_keywords    = $row['meta_tags'] ?? null;

                    $product->unit_price  = $row['unit_price'];
                    $product->discount    = $row['discount'] ?? 0;
                    $product->discount_type       = $discountType;
                    $product->discount_start_date = !empty($row['discount_start_date'])
                        ? $row['discount_start_date']
                        : null;
                    $product->discount_end_date   = !empty($row['discount_end_date'])
                        ? $row['discount_end_date']
                        : null;

                    $product->current_stock    = $row['stock'];
                    $product->external_link    = $row['product_external_link'] ?? null;
                    $product->external_link_btn = $row['external_link_button_text'] ?? null;

                    $product->published    = $boolValues['published'];
                    $product->featured     = $boolValues['featured'];
                    $product->todays_deal  = $boolValues['todays_deal'];

                    $product->has_warranty        = $boolValues['has_warranty'];
                    $product->warranty_id         = $row['warranty_id'] ?? null;
                    $product->warranty_note_id    = $row['warranty_note_id'] ?? null;
                    $product->show_warranty_note  = $boolValues['show_warranty_note'];

                    $product->shipping_type               = $shippingType;
                    $product->shipping_cost               = $row['shipping_cost'] ?? 0;
                    $product->is_quantity_multiplied      = $boolValues['is_product_quantity_multiply'];
                    $product->est_shipping_days           = $row['est_shipping_days'] ?? null;
                    $product->show_estimated_shipping_time = $boolValues['show_shipping_days'];
                    $product->colors = json_encode(array());
                    $product->choice_options = json_encode(array());

                    $product->show_shipping_note = $boolValues['show_shipping_notes'];
                    $product->shipping_note_id    = $row['shipping_note_id'] ?? null;
                    $product->cash_on_delivery = $boolValues['enable_cash_on_delivery'];
                    $product->show_delivery_notes = $boolValues['show_cash_on_delivery_notes'];
                    $product->delivery_note_id    = $row['cash_on_delivery_note_id'] ?? null;
                    $product->hsn_code    = $row['hsn_code'] ?? null;
                    $product->gst_rate    = $row['gst_rate'];
                    $product->stock_visibility_state       = $stockVisibilityState;
                    $product->low_stock_quantity = $row['low_stock_quantity'];
                    $product->frequently_bought_selection_type       = $frequentlyBoughtSelectionType;

                    $product->save();

                    if (isset($row['fq_bought_product_ids']) && 
                        $row['fq_bought_product_ids'] != null && 
                        $row['frequently_bought_selection_type'] == 'product') {

                        $fqProductIds = array_filter(
                            array_map('trim', explode(',', (string)$row['fq_bought_product_ids']))
                        );

                        foreach ($fqProductIds as $fq_product) {
                            if (is_numeric($fq_product)) {
                                FrequentlyBoughtProduct::insert([
                                    'product_id'    => $product->id,
                                    'frequently_bought_product_id' => $fq_product,
                                ]);
                            }
                        }
                    }
                    elseif (isset($row['fq_bought_category_ids']) && 
                            $row['fq_bought_category_ids'] != null && 
                            $row['frequently_bought_selection_type'] == 'category') {

                        $fqCategoryIds = array_filter(
                            array_map('trim', explode(',', (string)$row['fq_bought_category_ids']))
                        );

                        foreach ($fqCategoryIds as $fq_category) {
                            if (is_numeric($fq_category)) {
                                FrequentlyBoughtProduct::insert([
                                    'product_id'  => $product->id,
                                    'category_id' => $fq_category,
                                ]);
                            }
                        }
                    }

                    if (addon_is_activated('refund_request')) {
                        $product->refundable       = $boolValues['refundable'];
                        $product->refund_note_id   = $row['refund_note_id'] ?? null;
                        $product->show_refund_notes = $boolValues['show_refund_notes'];
                        $product->save();
                    }

                    if (addon_is_activated('club_point')) {
                        $product->earn_point = $row['club_point'] ?? 0;
                        $product->save();
                    }

                    if (!empty($row['flash_sale_id'])) {
                        $flash = FlashDeal::find($row['flash_sale_id']);
                        if ($flash) {
                            FlashDealProduct::create([
                                'flash_deal_id' => $row['flash_sale_id'],
                                'product_id'    => $product->id,
                                'discount'      => $row['flash_sale_discount'] ?? 0,
                                'discount_type' => $row['flash_sale_discount_type'] ?? null,
                            ]);
                            $product->discount_start_date = $flash->start_date;
                            $product->discount_end_date   = $flash->end_date;
                            $product->promotional         = 1;
                            $product->save();
                        }
                    }

                    if ($boolValues['todays_deal'] === 1) {
                        $product->promotional = 1;
                        $product->save();
                    }

                    $stock = new ProductStock();
                    $stock->product_id = $product->id;
                    $stock->qty        = $row['stock'];
                    $stock->price      = $row['unit_price'];
                    $stock->sku        = $row['sku'] ?? null;
                    $stock->variant    = '';
                    $stock->save();

                    if (!empty($row['related_categories'])) {
                        foreach (explode(',', $row['related_categories']) as $category_id) {
                            $category_id = trim($category_id);
                            if ($category_id) {
                                ProductCategory::insert([
                                    'product_id'  => $product->id,
                                    'category_id' => $category_id,
                                ]);
                            }
                        }
                    }
                    ProductCategory::insert([
                        'product_id'  => $product->id,
                        'category_id' => $row['main_category_id'],
                    ]);

                    $translation = new ProductTranslation();
                    $translation->lang        = env('DEFAULT_LANGUAGE', 'en');
                    $translation->name        = $row['name'];
                    $translation->unit        = $row['unit_id'];
                    $translation->description = $row['description'] ?? null;
                    $translation->product_id  = $product->id;
                    $translation->save();
                    });
                    $this->imported++;
                } catch (\Throwable $e) {
                    report($e);$this->skipped++;if(count($this->errors)<50)$this->errors[]='Row '.($index+2).' ('.($row['name']??'?').'): Could not save this row. Check its values or contact support.';
                }
            }

            session()->flash('bulk_import_result',['imported'=>$this->imported,'skipped'=>$this->skipped,'errors'=>$this->errors]);
            if($this->skipped)flash($this->imported.' products imported; '.$this->skipped.' rows need correction.')->warning();
            elseif($this->imported)flash($this->imported.' products imported successfully.')->success();
            else flash('No product rows were found. Fill the first template sheet or upload a CSV with the same headings.')->warning();
        }
    }


    private function uploadImage($url)
    {
        if (empty($url)) return null;
        try {
            $upload = new Upload();
            $upload->external_link = trim($url);
            $upload->type = 'image';
            $upload->user_id = auth()->id();
            $upload->save();
            return $upload->id;
        } catch (\Exception $e) {
            return null;
        }
    }

    private function uploadImages($urls)
    {
        if (empty($urls)) return null;
        $data = [];
        foreach (explode(',', str_replace(' ', '', $urls)) as $url) {
            if ($url) $data[] = $this->uploadImage($url);
        }
        return implode(',', array_filter($data));
    }

    private function uploadVideo($url)
    {
        if (empty($url)) return null;
        try {
            $upload = new Upload();
            $upload->external_link = trim($url);
            $upload->type = 'video';
            $upload->user_id = auth()->id();
            $upload->save();
            return $upload->id;
        } catch (\Exception $e) {
            return null;
        }
    }

    private function uploadVideos($urls)
    {
        if (empty($urls)) return null;
        $data = [];
        foreach (explode(',', str_replace(' ', '', $urls)) as $url) {
            if ($url) $data[] = $this->uploadVideo($url);
        }
        return implode(',', array_filter($data));
    }

    private function uploadPdf($url)
    {
        if (empty($url)) return null;
        try {
            $upload = new Upload();
            $upload->external_link = trim($url);
            $upload->type = 'document';
            $upload->user_id = auth()->id();
            $upload->save();
            return $upload->id;
        } catch (\Exception $e) {
            return null;
        }
    }
}
