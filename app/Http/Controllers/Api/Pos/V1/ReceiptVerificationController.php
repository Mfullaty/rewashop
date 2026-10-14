<?php
namespace App\Http\Controllers\Api\Pos\V1;
use App\Http\Controllers\Controller;
use App\Pos\Services\ReceiptVerificationService;
use Illuminate\Http\Request;
class ReceiptVerificationController extends Controller
{
    public function __invoke(Request $request,string $token)
    {
        $receipt=app(ReceiptVerificationService::class)->find($token);
        return $this->respond($request,$receipt);
    }
    public function signed(Request $request,string $key)
    {
        $service=app(\App\Pos\Services\ReceiptSigningService::class);
        $payload=$request->query('p','');$signature=$request->query('s','');$verified=is_string($payload)&&is_string($signature)?$service->verify($key,$payload,$signature):null;
        return $this->respond($request,$verified ? $service->publicReceipt($verified) : null);
    }
    private function respond(Request $request,?array $receipt)
    {
        $status=$receipt ? 200 : 404;
        $headers=['Cache-Control'=>'no-store, private','Referrer-Policy'=>'no-referrer','X-Robots-Tag'=>'noindex, nofollow',
            'X-Content-Type-Options'=>'nosniff','Content-Security-Policy'=>"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"];
        if($request->expectsJson())return response()->json($receipt??['verified'=>false,'message'=>'This receipt could not be verified. Check the QR code or ask the shop for help.'],$status,$headers);
        return response()->view('pos.receipt-verification',['receipt'=>$receipt],$status,$headers);
    }
}
