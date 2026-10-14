<?php
namespace Tests\Feature\Pos;
use App\Pos\Services\CatalogService;
use App\Pos\Services\SalePostingService;
use App\Pos\Services\SyncService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Str;
class DownloadedCatalogTest extends PosTestCase
{
    private function downloaded($context, int $shift): array
    {
        app(CatalogService::class)->stock(11);
        $item=app(CatalogService::class)->snapshot($context,null,0,500)['data'][0];
        return ['inventory_mode'=>'catalog','client_sale_id'=>(string)Str::uuid(),'register_id'=>1,'shift_id'=>$shift,
            'currency'=>'NGN','occurred_at'=>now('UTC')->toIso8601String(),
            'lines'=>[['stock_id'=>11,'quantity'=>6,'unit_price_minor'=>10000,'tax_minor'=>0,'total_minor'=>60000,'catalog_policy'=>$item['offline_policy']]],
            'tenders'=>[['method'=>'cash','currency'=>'NGN','amount_minor'=>60000,'received_minor'=>60000,'change_minor'=>0]]];
    }
    public function test_download_all_stock_then_preserve_paid_sales_despite_concurrent_stock_and_price_changes(): void
    {
        $d=$this->device();$c=$this->context(1,$d);$shift=$this->shift(1,$d);$sale=$this->downloaded($c,$shift);
        $this->assertDatabaseCount('pos_stock_allocations',0);
        DB::table('product_stocks')->where('id',11)->update(['qty'=>2,'price'=>'200.00']);
        $key=(string)Str::uuid();$posted=app(SalePostingService::class)->post($c,$key,$sale,true);
        $this->assertSame(60000,$posted['total_minor']);$this->assertSame(4,$posted['stock_difference_units']);
        $this->assertDatabaseHas('product_stocks',['id'=>11,'qty'=>0]);
        $this->assertDatabaseHas('pos_stock_shortfalls',['sale_id'=>$posted['sale_id'],'quantity'=>4]);
        $this->assertSame($posted['sale_id'],app(SalePostingService::class)->post($c,$key,$sale,true)['sale_id']);
        $this->assertDatabaseCount('orders',1);$this->assertDatabaseCount('pos_stock_shortfalls',1);
    }
    public function test_downloaded_price_signature_and_device_scope_are_enforced(): void
    {
        $d=$this->device();$c=$this->context(1,$d);$sale=$this->downloaded($c,$this->shift(1,$d));
        $bad=$sale;$bad['lines'][0]['catalog_policy']['policy']['price_snapshot']['unit_price_minor']=1;
        $this->error('INVALID_POLICY_SIGNATURE',fn()=>app(SalePostingService::class)->post($c,(string)Str::uuid(),$bad,true));
        $other=$this->device();$otherContext=$this->context(1,$other);$sale['shift_id']=(int)app(\App\Pos\Services\ShiftService::class)->automatic($otherContext,1)->id;
        $this->error('POLICY_SCOPE_MISMATCH',fn()=>app(SalePostingService::class)->post($otherContext,(string)Str::uuid(),$sale,true));
        $this->assertDatabaseHas('product_stocks',['id'=>11,'qty'=>20]);$this->assertDatabaseCount('orders',0);
    }
    public function test_web_checkout_can_create_its_session_when_another_till_is_open(): void
    {
        $d=$this->device();$this->shift(1,$d);
        $sale=['client_sale_id'=>(string)Str::uuid(),'register_id'=>1,'currency'=>'NGN',
            'lines'=>[['stock_id'=>11,'quantity'=>2]],'tenders'=>[['method'=>'cash','currency'=>'NGN','amount_minor'=>20000,'received_minor'=>20000,'change_minor'=>0]]];
        $c=$this->context();$key=(string)Str::uuid();$a=app(SalePostingService::class)->post($c,$key,$sale);
        $this->assertSame(20000,$a['total_minor']);$this->assertDatabaseCount('pos_shifts',2);
        $this->assertSame($a['sale_id'],app(SalePostingService::class)->post($c,$key,$sale)['sale_id']);
        $this->assertDatabaseCount('pos_shifts',2);
    }
    public function test_snapshot_and_change_feed_include_product_pictures(): void
    {
        Schema::table('uploads',function(Blueprint $t){$t->string('file_name')->nullable();$t->string('external_link')->nullable();});
        DB::table('uploads')->insert(['id'=>9,'file_name'=>'uploads/rice.png','external_link'=>'https://example.test/rice.png']);
        DB::table('products')->where('id',101)->update(['thumbnail_img'=>9]);
        app(CatalogService::class)->stock(11);$c=$this->context(1,$this->device());
        $item=app(CatalogService::class)->snapshot($c,null,0,500)['data'][0];
        $this->assertSame('https://example.test/rice.png',$item['image_url']);$this->assertSame('catalog',$item['offline_policy']['policy']['mode']);
        $this->assertSame('https://example.test/rice.png',app(CatalogService::class)->changes($c,0,500)['data'][0]['payload']['image_url']);
    }
    public function test_automatic_shift_does_not_require_cash_setup_permission(): void
    {
        $d=$this->device(1,['pos:sale:write','pos:sync']);$c=$this->context(1,$d);
        $result=app(SyncService::class)->push($c,['device_id'=>$d->id,'events'=>[['event_id'=>(string)Str::uuid(),'local_sequence'=>1,'type'=>'shift.opened',
            'payload'=>['client_shift_id'=>(string)Str::uuid(),'register_id'=>1,'automatic'=>true,'opening_minor'=>0]]]])['results'][0];
        $this->assertSame('accepted',$result['status']);
    }
    public function test_large_catalog_uses_one_upload_lookup_for_the_entire_page(): void
    {
        Schema::table('uploads',function(Blueprint $t){$t->string('file_name')->nullable();$t->string('external_link')->nullable();});
        DB::table('uploads')->insert(['id'=>9,'file_name'=>'rice.png','external_link'=>'https://example.test/rice.png']);
        app(CatalogService::class)->stock(11);
        $payload=json_decode(DB::table('pos_catalog_entries')->where('stock_id',11)->value('payload'),true);
        $rows=[];
        for($i=100;$i<599;$i++) {
            $item=$payload;$item['stock_id']=$i;$item['image_id']=9;
            $rows[]=['seller_id'=>1,'stock_id'=>$i,'sequence'=>1,'digest'=>hash('sha256',(string)$i),'payload'=>json_encode($item)];
        }
        DB::table('pos_catalog_entries')->insert($rows);$c=$this->context(1,$this->device());
        DB::enableQueryLog();DB::flushQueryLog();$page=app(CatalogService::class)->snapshot($c,null,0,500);
        $uploads=array_filter(DB::getQueryLog(),fn($query)=>str_contains($query['query'],'from "uploads"') || str_contains($query['query'],'from `uploads`'));
        $this->assertCount(500,$page['data']);$this->assertCount(1,$uploads);
        $this->assertSame('https://example.test/rice.png',$page['data'][1]['image_url']);
        DB::disableQueryLog();
    }

    public function test_full_refresh_rebuilds_live_store_and_normal_sync_prunes_raw_deletions(): void
    {
        $catalog=app(CatalogService::class);$catalog->stock(11);$catalog->stock(22);
        $context=$this->context(1,$this->device());$old=$catalog->snapshot($context,null,0,500);
        DB::table('product_stocks')->where('id',11)->delete();DB::table('products')->where('id',101)->delete();
        $this->stock(12,102,1,'admin',10,'150.00','00102');
        $delta=$catalog->changes($context,$old['high_water_mark'],500,false);
        $this->assertSame('delete',$delta['data'][0]['operation']);$this->assertSame('11',$delta['data'][0]['id']);
        $fresh=$catalog->snapshot($context,null,0,500,true);
        $this->assertNotSame($old['snapshot_id'],$fresh['snapshot_id']);$this->assertSame([12],array_column($fresh['data'],'stock_id'));
        $this->assertDatabaseHas('pos_catalog_entries',['seller_id'=>2,'stock_id'=>22]);
        $page=$catalog->snapshot($context,$old['snapshot_id'],0,500);$this->assertSame(11,$page['data'][0]['stock_id']);
    }
}
