<?php
namespace Tests\Feature\Pos;

use App\Import\ProductRow;
use App\Models\Product;
use App\Models\ProductsImport;
use App\Models\ProductTranslation;
use App\Models\ProductsExport;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Facades\Excel;

class BulkImportExportTest extends PosTestCase
{
    protected function setUp(): void
    {
        parent::setUp();$this->actingAs(User::findOrFail(1));
        Schema::table('products',function(Blueprint $t){
            $t->string('slug')->default('');$t->decimal('weight',8,2)->default(0);$t->integer('min_qty')->default(1);
            $t->integer('current_stock')->default(0);$t->boolean('featured')->default(0);$t->boolean('todays_deal')->default(0);
            $t->boolean('has_warranty')->default(0);$t->boolean('show_warranty_note')->default(0);
            $t->boolean('is_quantity_multiplied')->default(0);$t->boolean('show_estimated_shipping_time')->default(0);
            $t->boolean('show_shipping_note')->default(0);$t->boolean('cash_on_delivery')->default(0);$t->boolean('show_delivery_notes')->default(0);
            $t->integer('low_stock_quantity')->default(0);$t->decimal('shipping_cost',20,2)->default(0);
            $t->string('stock_visibility_state')->default('quantity');$t->string('frequently_bought_selection_type')->default('product');
            foreach(['tags','photos','video_link','short_video','short_video_thumbnail','pdf','description','meta_title','meta_description',
                'meta_img','meta_keywords','external_link','external_link_btn','warranty_id','warranty_note_id','shipping_type','est_shipping_days',
                'colors','choice_options','shipping_note_id','delivery_note_id','hsn_code','refundable','show_refund_notes','refund_note_id','earn_point'] as $name){$t->text($name)->nullable();}
        });
        Schema::table('product_translations',function(Blueprint $t){$t->string('unit')->nullable();$t->text('description')->nullable();$t->timestamps();});
        Schema::table('uploads',function(Blueprint $t){$t->text('external_link')->nullable();$t->string('file_name')->nullable();$t->string('type')->nullable();$t->integer('user_id')->nullable();$t->timestamps();});
        foreach(['categories','brands','units'] as $table){Schema::create($table,function(Blueprint $t){$t->id();$t->string('name');});DB::table($table)->insert(['id'=>1,'name'=>$table==='units'?'Pc':'Reference']);}
        foreach(['category_translations'=>'category_id','brand_translations'=>'brand_id','note_translations'=>'note_id','warranty_translations'=>'warranty_id'] as $table=>$key){Schema::create($table,function(Blueprint $t)use($key){$t->id();$t->integer($key);$t->string('lang');$t->string('name')->nullable();});}
        Schema::create('product_categories',function(Blueprint $t){$t->id();$t->integer('product_id');$t->integer('category_id');});
        Schema::create('frequently_bought_products',function(Blueprint $t){$t->id();$t->integer('product_id');$t->integer('frequently_bought_product_id')->nullable();$t->integer('category_id')->nullable();});
        Schema::create('flash_deals',function(Blueprint $t){$t->id();$t->string('title');});
        Schema::create('flash_deal_products',function(Blueprint $t){$t->id();$t->integer('product_id');$t->integer('flash_deal_id');});
        Schema::create('notes',function(Blueprint $t){$t->id();$t->string('description');$t->string('note_type');});
        Schema::create('warranties',function(Blueprint $t){$t->id();$t->string('text');});
    }
    private function row(): array {return ['name'=>'Real Rice','main_category_id'=>1,'unit_id'=>1,'unit_price'=>100,'stock'=>5,'barcode'=>'000123','sku'=>'000456'];}

    public function test_optional_blanks_and_csv_and_xlsx_imports_create_complete_pos_products(): void
    {
        foreach(['csv','xlsx'] as $extension){
            $path=tempnam(sys_get_temp_dir(),'bulk-test-').'.'.$extension;
            try{
                $row=$this->row();$row['name'].=' '.$extension;
                $sheet=new \PhpOffice\PhpSpreadsheet\Spreadsheet();$sheet->getActiveSheet()->fromArray(array_keys($row),null,'A1');$sheet->getActiveSheet()->fromArray(array_values($row),null,'A2');
                $sheet->getActiveSheet()->setCellValueExplicit('F2','000123',\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
                $sheet->getActiveSheet()->setCellValueExplicit('G2','000456',\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
                if($extension==='xlsx'){$sheet->createSheet()->setTitle('Reference');$sheet->getSheet(1)->fromArray([['ID','Name'],[1,'Never import this row']]);}
                $writer=$extension==='csv'?new \PhpOffice\PhpSpreadsheet\Writer\Csv($sheet):new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($sheet);$writer->save($path);
                $import=new ProductsImport();Excel::import($import,$path);$this->assertSame(1,$import->imported,json_encode($import->errors));$this->assertSame(0,$import->skipped);
                $product=DB::table('products')->where('name',$row['name'])->first();$this->assertSame('000123',$product->barcode);
                $this->assertDatabaseHas('product_stocks',['product_id'=>$product->id,'qty'=>5,'sku'=>'000456']);
                $this->assertDatabaseHas('pos_catalog_entries',['seller_id'=>1,'stock_id'=>DB::table('product_stocks')->where('product_id',$product->id)->value('id')]);
            }finally{@unlink($path);}
        }
        $this->assertDatabaseMissing('products',['name'=>'Never import this row']);
    }
    public function test_failed_row_rolls_back_product_stock_uploads_and_catalog(): void
    {
        $before=DB::table('products')->count();$stock=DB::table('product_stocks')->count();
        ProductTranslation::creating(function(){throw new \RuntimeException('Injected late save failure');});
        try{$row=$this->row();$row['thumbnail_img']='https://example.test/rice.png';$import=new ProductsImport();$import->collection(collect([$row]));$this->assertSame(0,$import->imported);$this->assertSame(1,$import->skipped);}
        finally{ProductTranslation::flushEventListeners();}
        $this->assertSame($before,DB::table('products')->count());$this->assertSame($stock,DB::table('product_stocks')->count());$this->assertDatabaseCount('uploads',0);$this->assertDatabaseCount('pos_catalog_entries',0);
    }
    public function test_export_uses_live_stock_and_preserves_literal_identifiers_and_iso_dates(): void
    {
        $import=new ProductsImport();$import->collection(collect([$this->row()]));$this->assertSame(1,$import->imported,json_encode($import->errors));
        $product=Product::where('name','Real Rice')->first();DB::table('product_stocks')->where('product_id',$product->id)->update(['qty'=>3]);
        $sheet=(new ProductsExport())->sheets()[0];$row=$sheet->map($product->fresh(['stocks','product_categories','flash_deal_products']));$this->assertSame(3,$row[25]);$this->assertSame('000123',$row[7]);$this->assertSame(1,$row[4]);
        $cell=new \PhpOffice\PhpSpreadsheet\Spreadsheet();$sheet->bindValue($cell->getActiveSheet()->getCell('A1'),'000123');$this->assertSame('000123',$cell->getActiveSheet()->getCell('A1')->getValue());
        $this->assertCount(60,$sheet->headings());$this->assertCount(60,$row);
        $bytes=Excel::raw(new ProductsExport(),\Maatwebsite\Excel\Excel::XLSX);$this->assertStringStartsWith('PK',$bytes);
        $this->assertCount(8,(new \App\Exports\ProductBulkDemoExport())->sheets());
    }
    public function test_dates_and_reference_errors_are_explicit_and_zero_price_is_valid(): void
    {
        $normalizer=new ProductRow();$row=$this->row();$row['unit_price']=0;$this->assertSame(0,$normalizer->normalize($row)['unit_price']);
        $this->assertSame(strtotime('2026-10-14'),$normalizer->date('2026-10-14','date'));
        $this->assertSame(strtotime('2026-10-14'),(new ProductRow(true))->date('2026-14-10','date'));
        $this->assertSame(strtotime('2026-10-14'),$normalizer->date(46309,'date'));
        $row['main_category_id']=999;$import=new ProductsImport();$import->collection(collect([$row]));$this->assertSame(1,$import->skipped);$this->assertStringContainsString('does not exist',$import->errors[0]);
    }
    public function test_category_workbook_imports_only_its_template_sheet(): void
    {
        Schema::table('categories',function(Blueprint $t){$t->boolean('digital')->default(0);$t->integer('order_level')->default(0);$t->integer('parent_id')->default(0);$t->integer('level')->default(0);$t->string('slug')->default('');foreach(['banner','icon','cover_image','meta_title','meta_description','meta_keywords'] as $name){$t->text($name)->nullable();}$t->timestamps();});
        Schema::table('category_translations',function(Blueprint $t){$t->timestamps();});
        $path=tempnam(sys_get_temp_dir(),'category-test-').'.xlsx';
        try{
            $book=new \PhpOffice\PhpSpreadsheet\Spreadsheet();$book->getActiveSheet()->fromArray([['name','digital','parent_category_id','ordering_number'],['Imported category',0,0,1]]);
            $book->createSheet()->setTitle('Category')->fromArray([['ID','Name'],[1,'Reference only']]);$book->createSheet()->setTitle('Attribute')->fromArray([['ID','Name'],[1,'Never a category']]);
            (new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($book))->save($path);$import=new \App\Models\CategoryBulkUpload();Excel::import($import,$path);
            $this->assertSame(1,$import->imported,json_encode($import->errors));$this->assertSame(0,$import->skipped);$this->assertDatabaseCount('categories',2);$this->assertDatabaseMissing('categories',['name'=>'Reference only']);$this->assertDatabaseMissing('categories',['name'=>'Never a category']);
        }finally{@unlink($path);}
    }
}
