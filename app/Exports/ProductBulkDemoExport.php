<?php

namespace App\Exports;

use App\Models\Brand;
use App\Models\Category;
use App\Models\FlashDeal;
use App\Models\Note;
use App\Models\Product;
use App\Models\Unit;
use App\Models\Warranty;
use App\Traits\PreventDemoModeChanges;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class ProductBulkDemoExport implements WithMultipleSheets
{
    use Exportable;

    public function sheets(): array
    {
        return [
            new ProductDemoProductTemplateSheet(),
            new ProductDemoCategorySheet(),
            new ProductDemoProductSheet(),
            new ProductDemoBrandSheet(),
            new ProductDemoFlashSaleSheet(),
            new ProductDemoUnitSheet(),
            new ProductDemoNoteSheet(),
            new ProductDemoWarrantySheet(),
        ];
    }
}

trait ProductDemoAutoSizeColumns
{
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                foreach ($sheet->getColumnIterator() as $column) {
                    $sheet->getColumnDimension($column->getColumnIndex())
                          ->setAutoSize(true);
                }
            },
        ];
    }
}

class ProductDemoProductTemplateSheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use PreventDemoModeChanges;
    use ProductDemoAutoSizeColumns;

    public function title(): string
    {
        return 'Product Template';
    }

    public function headings(): array
    {
        return [
            'name', 
            'main_category_id', 
            'brand_id', 
            'related_categories', 
            'unit_id',
            'weight', 
            'minimum_purchase_qty', 
            'barcode', 
            'tags',
            'thumbnail_img', 
            'gallery_images', 
            'youtube_video_link', 
            'videos',
            'video_thumbnail', 
            'pdf_specification', 
            'description',
            'meta_title', 
            'meta_description', 
            'meta_image', 
            'meta_tags',
            'unit_price', 
            'discount_start_date', 
            'discount_end_date' , 
            'discount', 
            'discount_type',
            'stock', 
            'sku', 
            'product_external_link', 
            'external_link_button_text',
            'published', 
            'featured', 
            'todays_deal',
            'flash_sale_id', 
            'flash_sale_discount', 
            'flash_sale_discount_type',
            'refundable', 
            'show_refund_notes', 
            'refund_note_id', 
            'club_point',
            'has_warranty', 
            'warranty_id', 
            'show_warranty_note', 
            'warranty_note_id',
            'shipping_type', 
            'shipping_cost', 
            'is_product_quantity_multiply',
            'est_shipping_days', 
            'show_shipping_days',

            'show_shipping_notes',
            'shipping_note_id',
            'enable_cash_on_delivery',
            'show_cash_on_delivery_notes',
            'cash_on_delivery_note_id',
            'hsn_code',
            'gst_rate',
            'stock_visibility_state',
            'low_stock_quantity',
            'frequently_bought_selection_type',
            'fq_bought_product_ids',
            'fq_bought_category_ids',
        ];
    }

    public function collection()
    {
        $example=['name'=>'Example product','main_category_id'=>Category::orderBy('id')->value('id'),
            'brand_id'=>Brand::orderBy('id')->value('id'),'unit_id'=>Unit::orderBy('id')->value('id'),
            'unit_price'=>100,'stock'=>10,'minimum_purchase_qty'=>1,'weight'=>0,'published'=>1,
            'discount'=>0,'discount_type'=>'amount','shipping_type'=>'free','shipping_cost'=>0,
            'gst_rate'=>0,'stock_visibility_state'=>'quantity','low_stock_quantity'=>0,
            'frequently_bought_selection_type'=>'product'];
        return collect([array_map(fn($heading)=>$example[$heading]??null,$this->headings())]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font'  => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
                'fill'  => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FF4472C4']],
            ],
        ];
    }
}

class ProductDemoCategorySheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Category'; }
    public function headings(): array { return ['ID', 'Name']; }

    public function collection()
    {
        return Category::select('id', 'name')->orderBy('id')->get()
            ->map(fn($c) => [$c->id, $c->name]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}

class ProductDemoProductSheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Product'; }
    public function headings(): array { return ['ID', 'Name']; }

    public function collection()
    {
        return Product::select('id', 'name')->when(auth()->user()?->user_type==='seller',fn($q)=>$q->where('added_by','seller')->where('user_id',auth()->id()))->orderBy('id')->get()
            ->map(fn($c) => [$c->id, $c->name]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}

class ProductDemoBrandSheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Brand'; }

    public function headings(): array { return ['ID', 'Name']; }

    public function collection()
    {
        return Brand::select('id', 'name')->orderBy('id')->get()
            ->map(fn($b) => [$b->id, $b->name]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}

class ProductDemoFlashSaleSheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Flash Sale'; }
    public function headings(): array { return ['ID', 'Title']; }

    public function collection()
    {
        return FlashDeal::select('id', 'title')->orderBy('id')->get()
            ->map(fn($f) => [$f->id, $f->title]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}

class ProductDemoUnitSheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Unit'; }
    public function headings(): array { return ['ID', 'Name']; }

    public function collection()
    {
        return Unit::select('id', 'name')->orderBy('id')->get()
            ->map(fn($u) => [$u->id, $u->name]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}

class ProductDemoNoteSheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Note'; }

    public function headings(): array { return ['ID', 'Description', 'Note Type']; }

    public function collection()
    {
        return Note::select('id', 'description', 'note_type')->orderBy('id')->get()
            ->map(fn($n) => [$n->id, $n->description, $n->note_type]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}

class ProductDemoWarrantySheet implements FromCollection, WithTitle, WithHeadings, WithStyles, WithEvents
{
    use ProductDemoAutoSizeColumns;

    public function title(): string { return 'Warranty'; }

    public function headings(): array { return ['ID', 'Warranty Text']; }

    public function collection()
    {
        return Warranty::select('id', 'text')->orderBy('id')->get()
            ->map(fn($w) => [$w->id, $w->text]);
    }

    public function styles(Worksheet $sheet): array
    {
        return [1 => ['font' => ['bold' => true], 'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFFFC000']]]];
    }
}
