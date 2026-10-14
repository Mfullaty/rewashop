<?php
namespace App\Pos\Services;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
class ReceiptSigningService
{
 public function register(PosContext $context,string $public):array {
  $context->require('pos:sale:write');if(!$context->device)throw new PosException('DEVICE_REQUIRED','Connect an approved computer first.',403);
  $bytes=base64_decode($public,true);if($bytes===false||strlen($bytes)!==32)throw new PosException('INVALID_RECEIPT_KEY','Invalid receipt signing key.');
  $id=substr(hash('sha256',$bytes),0,32);
  return app(TransactionService::class)->run($context,function()use($context,$public,$id){
   $old=DB::table('pos_receipt_keys')->where('id',$id)->first();
   if($old&&($old->device_id!==$context->device->id||(int)$old->seller_id!==$context->sellerId))throw new PosException('RECEIPT_KEY_CONFLICT','This receipt key belongs to another computer.',409);
   if(!$old)DB::table('pos_receipt_keys')->insert(['id'=>$id,'device_id'=>$context->device->id,'seller_id'=>$context->sellerId,'public_key'=>$public,'created_at'=>now('UTC')]);
   return ['key_id'=>$id,'public_key'=>$public,'issued_at'=>$old?\Carbon\CarbonImmutable::parse($old->created_at,'UTC')->timestamp:now('UTC')->timestamp];
  });
 }
 private function decode(string $value):string|false {if(!preg_match('/^[A-Za-z0-9_-]+$/D',$value))return false;return base64_decode(strtr($value,'-_','+/').str_repeat('=',(4-strlen($value)%4)%4),true);}
 public function verify(string $keyId,string $packed,string $signature):?array {
  if(!preg_match('/^[a-f0-9]{32}$/D',$keyId)||strlen($packed)>6000||strlen($signature)!==86)return null;
  $key=DB::table('pos_receipt_keys')->where('id',$keyId)->first();if(!$key)return null;
  $device=DB::table('pos_devices')->where('id',$key->device_id)->where('seller_id',$key->seller_id)->first();if(!$device||$device->revoked_at)return null;
  $binary=$this->decode($packed);$sig=$this->decode($signature);if($binary===false||$sig===false||strlen($sig)!==64)return null;
  $json=@gzinflate($binary,8192);if($json===false)return null;
  try{$p=json_decode($json,true,16,JSON_THROW_ON_ERROR);}catch(\Throwable){return null;}
  if(!is_array($p)||!array_is_list($p)||count($p)!==11||$p[0]!==1||!is_string($p[1])||!preg_match('/^[A-Za-z0-9_-]{43}$/D',$p[1])||
    !is_int($p[2])||$p[2]<1||$p[2]>now('UTC')->addMinutes(5)->timestamp||
    !is_string($p[3])||!preg_match('/^[A-Z]{3}$/D',$p[3])||!is_int($p[4])||$p[4]<1||$p[4]>config('pos.max_amount_minor')||
    !is_string($p[5])||!preg_match('/^[a-f0-9]{64}$/D',$p[5])||!is_int($p[6])||$p[6]<1||$p[6]>200||
    !is_string($p[7])||strlen($p[7])>1000||!is_string($p[8])||strlen($p[8])>3000||
    !is_int($p[9])||!is_int($p[10])||$p[9]<0||$p[10]<0||$p[9]+$p[10]!==$p[4])return null;
  if(!sodium_crypto_sign_verify_detached($sig,Payload::canonical($p),base64_decode($key->public_key,true)))return null;
  return ['claims'=>$p,'seller_id'=>(int)$key->seller_id,'device_id'=>$key->device_id];
 }
 public function url(array $proof):string {return rtrim(config('app.url'),'/').'/api/pos/v1/receipts/check/'.$proof['key_id'].'?'.http_build_query(['p'=>$proof['payload'],'s'=>$proof['signature']]);}
 public function publicReceipt(array $verified):array {
  $p=$verified['claims'];$issued=['verified'=>true,'store'=>['name'=>$p[7],'address'=>$p[8]],'occurred_at'=>\Carbon\CarbonImmutable::createFromTimestampUTC($p[2])->toIso8601String(),
    'currency'=>$p[3],'total_minor'=>$p[4],'sale_status'=>'completed','payment_status'=>$p[10]===0?'settled':'pending','refunded_minor'=>0,'item_count'=>$p[6],'lines'=>[]];
  $saved=app(ReceiptVerificationService::class)->find($p[1],$verified['seller_id']);
  return $saved ? array_replace($issued,$saved) : $issued;
 }
}
