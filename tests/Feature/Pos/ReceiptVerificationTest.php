<?php
namespace Tests\Feature\Pos;
use App\Pos\Services\ReceiptSigningService;
use App\Pos\Services\ReceiptVerificationService;
use App\Pos\Services\SalePostingService;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class ReceiptVerificationTest extends PosTestCase
{
 private function signed($device):array {
  $pair=sodium_crypto_sign_keypair();$public=base64_encode(sodium_crypto_sign_publickey($pair));$secret=sodium_crypto_sign_secretkey($pair);
  $key=app(ReceiptSigningService::class)->register($this->context(1,$device),$public);$token=app(ReceiptVerificationService::class)->token();
  $claims=[1,$token,now('UTC')->timestamp,'NGN',20000,str_repeat('a',64),1,'My Shop','Kano',20000,0];
  $encode=fn($v)=>rtrim(strtr(base64_encode($v),'+/','-_'),'=');$json=Payload::canonical($claims);
  return ['key'=>$key,'claims'=>$claims,'secret'=>$secret,'proof'=>['key_id'=>$key['key_id'],'payload'=>$encode(gzdeflate($json)),'signature'=>$encode(sodium_crypto_sign_detached($json,$secret))]];
 }
 public function test_signed_receipt_is_verified_before_any_sale_upload_and_rejects_tampering():void {
  $d=$this->device();$s=$this->signed($d);$url=app(ReceiptSigningService::class)->url($s['proof']);
  $this->assertDatabaseCount('pos_sales',0);$this->assertDatabaseCount('pos_sync_inbox',0);
  $this->getJson($url)->assertOk()->assertJsonPath('verified',true)->assertJsonPath('store.name','My Shop')->assertJsonPath('total_minor',20000)->assertJsonMissingPath('client_sale_id')->assertJsonMissingPath('cashier_id');
  $this->get($url)->assertOk()->assertSee('Receipt verified')->assertSee('approved POS');
  $bad=$s['proof'];$bad['signature'][0]=$bad['signature'][0]==='A'?'B':'A';$this->getJson(app(ReceiptSigningService::class)->url($bad))->assertNotFound();
  $this->getJson('/api/pos/v1/receipts/check/'.$s['key']['key_id'].'?p[]=bad&s=bad')->assertNotFound();
  DB::table('pos_devices')->where('id',$d->id)->update(['revoked_at'=>now('UTC')]);$this->getJson($url)->assertNotFound();
 }
 public function test_signing_key_enrollment_is_scoped_and_idempotent():void {
  $d=$this->device();$s=$this->signed($d);$this->withToken($this->apiToken($d))->postJson('/api/pos/v1/devices/receipt-key',['public_key'=>$s['key']['public_key']])->assertOk()->assertJsonPath('key_id',$s['key']['key_id']);
  $this->assertDatabaseCount('pos_receipt_keys',1);$other=$this->device(2);$this->withToken($this->apiToken($other))->postJson('/api/pos/v1/devices/receipt-key',['public_key'=>$s['key']['public_key']])->assertStatus(409);
 }
 public function test_legacy_receipt_gets_stable_qr_and_public_page_hides_customer_data():void {
  $c=$this->context();$sale=$this->saleData();$sale['customer']=['name'=>'Private customer','phone'=>'08000000000','email'=>'private@example.test'];
  $result=app(SalePostingService::class)->post($c,(string)Str::uuid(),$sale);$service=app(ReceiptVerificationService::class);
  $a=$service->ensure($result['receipt_id']);$b=$service->ensure($result['receipt_id']);$this->assertSame($a['verification_url'],$b['verification_url']);
  $this->getJson($a['verification_url'])->assertOk()->assertJsonPath('total_minor',20000)->assertJsonMissingPath('customer')->assertJsonMissingPath('sale_id');
  DB::table('pos_sales')->where('id',$result['sale_id'])->update(['status'=>'voided']);$this->getJson($a['verification_url'])->assertJsonPath('sale_status','voided');
 }
}
