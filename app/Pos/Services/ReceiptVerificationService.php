<?php
namespace App\Pos\Services;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
class ReceiptVerificationService
{
    public function token(): string { return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='); }
    public function legacyToken(string $sale): string {return rtrim(strtr(base64_encode(hash('sha256','pos-receipt:'.$sale,true)),'+/','-_'),'=');}
    public function url(string $token): string { return rtrim(config('app.url'), '/').'/api/pos/v1/receipts/verify/'.$token; }
    public function ensure(int $receiptId): array
    {
        return DB::transaction(function() use($receiptId) {
            $row=DB::table('pos_receipts')->where('id',$receiptId)->lockForUpdate()->first();
            $payload=json_decode($row->payload,true,512,JSON_THROW_ON_ERROR);
            if (!$row->verification_hash) {
                $token=$this->legacyToken($payload['client_sale_id']);$payload['verification_url']=$this->url($token);
                DB::table('pos_receipts')->where('id',$row->id)->update(['verification_hash'=>hash('sha256',$token),'payload'=>Payload::json($payload)]);
            }
            return $payload;
        });
    }
    public function find(string $token, ?int $sellerId = null): ?array
    {
        if (!preg_match('/^[A-Za-z0-9_-]{43}$/D',$token)) { return null; }
        $query=DB::table('pos_receipts')->where('verification_hash',hash('sha256',$token));if($sellerId!==null)$query->where('seller_id',$sellerId);$receipt=$query->first();
        if (!$receipt) { return null; }
        $sale=DB::table('pos_sales')->where('id',$receipt->sale_id)->where('seller_id',$receipt->seller_id)->first();
        if (!$sale) { return null; }
        $payload=json_decode($receipt->payload,true,512,JSON_THROW_ON_ERROR);
        // The bearer QR reveals only the store, purchased items and payment state.
        // No customer contact information, cashier data or internal identifiers.
        return ['verified'=>true,'store'=>array_intersect_key($payload['store']??[],array_flip(['name','address','phone'])),
            'occurred_at'=>$payload['occurred_at'],'currency'=>$sale->currency,'total_minor'=>(int)$sale->total_minor,
            'sale_status'=>$sale->status,'payment_status'=>$sale->payment_status,'refunded_minor'=>(int)$sale->refunded_minor,
            'lines'=>array_map(fn($line)=>['name'=>$line['snapshot']['name'],'variant'=>$line['snapshot']['variant']??'',
                'quantity'=>$line['quantity'],'total_minor'=>$line['total_minor']],$payload['lines'])];
    }
}
