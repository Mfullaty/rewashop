<?php

namespace App\Import;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ProductRow
{
    private array $references = [];
    public function __construct(private readonly bool $legacyDates = false) {}

    public function normalize(array $row): array
    {
        foreach ($row as $key => $value) {
            if (is_string($value)) { $row[$key] = trim($value) === '' ? null : trim($value); }
        }
        foreach (['brand_id','flash_sale_id','warranty_id','refund_note_id','warranty_note_id','shipping_note_id','cash_on_delivery_note_id'] as $field) {
            if (isset($row[$field]) && (string)$row[$field]==='0') { $row[$field]=null; }
        }
        $defaults = ['weight'=>0,'minimum_purchase_qty'=>1,'discount'=>0,'discount_type'=>'amount',
            'shipping_type'=>'free','shipping_cost'=>0,'gst_rate'=>0,'low_stock_quantity'=>0,
            'stock_visibility_state'=>'quantity','frequently_bought_selection_type'=>'product',
            'flash_sale_discount'=>0,'flash_sale_discount_type'=>'amount','club_point'=>0];
        foreach ($defaults as $key => $value) { $row[$key] ??= $value; }
        foreach (['published','featured','todays_deal','refundable','show_refund_notes','has_warranty',
            'show_warranty_note','is_product_quantity_multiply','show_shipping_days','show_shipping_notes',
            'enable_cash_on_delivery','show_cash_on_delivery_notes'] as $field) {
            $row[$field] ??= $field === 'published' ? 1 : 0;
            if (!in_array((string)$row[$field],['0','1'],true)) { $this->fail($field,'Use 0 or 1.'); }
        }
        $rules = ['name'=>'required|string|max:200','main_category_id'=>'required|integer|min:1',
            'unit_id'=>'required|integer|min:1','brand_id'=>'nullable|integer|min:1',
            'unit_price'=>'required|numeric|decimal:0,2|min:0|max:10000000000','stock'=>'required|integer|min:0|max:2147483647',
            'weight'=>'numeric|min:0|max:999999','minimum_purchase_qty'=>'integer|min:1|max:2147483647',
            'discount'=>'numeric|decimal:0,2|min:0','discount_type'=>'in:amount,percent','shipping_type'=>'in:free,flat_rate',
            'shipping_cost'=>'numeric|decimal:0,2|min:0','gst_rate'=>'numeric|min:0|max:100',
            'stock_visibility_state'=>'in:hide,quantity,text','frequently_bought_selection_type'=>'in:product,category',
            'low_stock_quantity'=>'integer|min:0','club_point'=>'numeric|min:0','est_shipping_days'=>'nullable|integer|min:0',
            'flash_sale_discount'=>'numeric|decimal:0,2|min:0','flash_sale_discount_type'=>'in:amount,percent',
            'sku'=>'nullable|string|max:255','barcode'=>'nullable|string|max:255','hsn_code'=>'nullable|string|max:20'];
        foreach (['warranty_id'=>'has_warranty','refund_note_id'=>'show_refund_notes','warranty_note_id'=>'show_warranty_note',
            'shipping_note_id'=>'show_shipping_notes','cash_on_delivery_note_id'=>'show_cash_on_delivery_notes'] as $field=>$switch) {
            $rules[$field]='required_if:'.$switch.',1|nullable|integer|min:1';
        }
        // Excel numeric cells for identifiers remain literal text in the model.
        foreach (['barcode','sku','hsn_code'] as $field) { if (isset($row[$field])) { $row[$field]=(string)$row[$field]; } }
        Validator::make($row,$rules)->validate();
        foreach (['main_category_id'=>'categories','unit_id'=>'units','brand_id'=>'brands',
            'flash_sale_id'=>'flash_deals','warranty_id'=>'warranties','refund_note_id'=>'notes',
            'warranty_note_id'=>'notes','shipping_note_id'=>'notes','cash_on_delivery_note_id'=>'notes'] as $field=>$table) {
            if (isset($row[$field])) { $row[$field]=$this->reference($table,$row[$field],$field); }
        }
        foreach (['related_categories'=>'categories','fq_bought_category_ids'=>'categories','fq_bought_product_ids'=>'products'] as $field=>$table) {
            $ids=[];
            foreach (explode(',',(string)($row[$field]??'')) as $id) {
                if (trim($id)==='') { continue; }
                $id=$this->reference($table,trim($id),$field);
                if ($table==='products' && auth()->user()?->user_type==='seller' &&
                    !DB::table('products')->where('id',$id)->where('added_by','seller')->where('user_id',auth()->id())->exists()) {
                    $this->fail($field,'Choose a product from your own store.');
                }
                if ($field!=='related_categories'||$id!==(int)$row['main_category_id']) { $ids[]=$id; }
            }
            $row[$field]=implode(',',array_unique($ids));
        }
        foreach (['discount_start_date','discount_end_date'] as $field) { $row[$field]=$this->date($row[$field]??null,$field); }
        if (($row['discount_start_date']===null)!==($row['discount_end_date']===null)) { $this->fail('discount_end_date','Supply both discount dates, or leave both blank.'); }
        if ($row['discount_start_date']!==null && $row['discount_end_date']<$row['discount_start_date']) { $this->fail('discount_end_date','The end date must be on or after the start date.'); }
        $limit=$row['discount_type']==='percent'?100:$row['unit_price'];
        if ($row['discount']>$limit) { $this->fail('discount','The discount exceeds the product price or 100%.'); }
        if ($row['flash_sale_discount']>($row['flash_sale_discount_type']==='percent'?100:$row['unit_price'])) { $this->fail('flash_sale_discount','The discount exceeds the product price or 100%.'); }
        foreach (['thumbnail_img','gallery_images','videos','video_thumbnail','pdf_specification','meta_image'] as $field) {
            foreach (explode(',',(string)($row[$field]??'')) as $url) {
                if (trim($url)==='') { continue; }
                if (!filter_var(trim($url),FILTER_VALIDATE_URL)||!in_array(strtolower(parse_url(trim($url),PHP_URL_SCHEME)),['http','https'],true)) {
                    $this->fail($field,'Use public http or https URLs, separated by commas.');
                }
            }
        }
        return $row;
    }

    private function reference(string $table,mixed $id,string $field): int
    {
        if (!preg_match('/^[1-9][0-9]*$/D',(string)$id)) { $this->fail($field,'Use an existing numeric ID from the reference sheets.'); }
        $key=$table.':'.$id;
        $this->references[$key] ??= DB::table($table)->where('id',$id)->exists();
        if (!$this->references[$key]) { $this->fail($field,'ID '.$id.' does not exist in '.$table.'.'); }
        return (int)$id;
    }

    public function date(mixed $value,string $field): ?int
    {
        if ($value===null||$value==='') { return null; }
        if (is_numeric($value)) {
            if ((float)$value<1||(float)$value>2958465) { $this->fail($field,'Invalid Excel date.'); }
            return CarbonImmutable::instance(Date::excelToDateTimeObject((float)$value))->startOfDay()->timestamp;
        }
        // Prefer ISO YYYY-MM-DD. Older exports used YYYY-DD-MM.
        foreach ([$this->legacyDates?'Y-d-m':'Y-m-d'] as $format) {
            try {
                $date=CarbonImmutable::createFromFormat('!'.$format,(string)$value);
                if ($date && $date->format($format)===$value) { return $date->timestamp; }
            } catch (\Throwable) { }
        }
        $this->fail($field,'Use YYYY-MM-DD (for example 2026-10-14), an Excel date cell, or leave blank.');
    }

    private function fail(string $field,string $message): never
    {
        throw ValidationException::withMessages([$field=>$message]);
    }
}
