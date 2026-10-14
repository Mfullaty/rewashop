<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Receipt verification · RewaShop</title><style>
*{box-sizing:border-box}body{margin:0;background:#f4f5f7;color:#20252c;font:16px system-ui,sans-serif;padding:36px 16px}main{max-width:490px;margin:auto;background:#fff;border:1px solid #e1e5ea;border-radius:20px;padding:30px}h1{font-size:25px;margin:12px 0}h2{font-size:19px}p{line-height:1.6;color:#68717c}.status{font-size:38px;color:#168552}.invalid{color:#b82d16}.row{display:flex;justify-content:space-between;gap:18px;padding:14px 0;border-top:1px solid #edf0f3}.total{font-size:23px;font-weight:750}small{color:#727a86}
</style></head><body><main>
@if(!$receipt)
<div class="status invalid">!</div><h1>Receipt not confirmed</h1><p>This receipt could not be verified. Check that you scanned the correct QR code, or ask the shop for help.</p>
@else
<div class="status {{ $receipt['sale_status']==='voided'?'invalid':'' }}">{{ $receipt['sale_status']==='voided'?'!':'✓' }}</div>
<h1>{{ $receipt['sale_status']==='voided'?'Receipt voided':'Receipt verified' }}</h1>
<p>This receipt was issued by the shop's approved POS. Compare the shop, items and total with your printed receipt.</p>
<h2>{{ $receipt['store']['name']??'Shop' }}</h2><p>{{ $receipt['store']['address']??'' }}<br>{{ \Carbon\CarbonImmutable::parse($receipt['occurred_at'])->format('d M Y · H:i').' UTC' }}</p>
@if(empty($receipt['lines']))<p>{{ $receipt['item_count']??0 }} product lines on this receipt.</p>@endif
@foreach($receipt['lines'] as $line)<div class="row"><span>{{ $line['name'] }} {{ $line['variant'] }}<br><small>Quantity {{ $line['quantity'] }}</small></span><strong>{{ $receipt['currency'] }} {{ number_format($line['total_minor']/100,2) }}</strong></div>@endforeach
<div class="row total"><span>Total</span><span>{{ $receipt['currency'] }} {{ number_format($receipt['total_minor']/100,2) }}</span></div>
<p>Payment: {{ $receipt['payment_status']==='settled'?'Confirmed':'Awaiting confirmation' }}.</p>
@if($receipt['refunded_minor']>0)<p>Refunds recorded: {{ $receipt['currency'] }} {{ number_format($receipt['refunded_minor']/100,2) }}.</p>@endif
@endif
<small>RewaShop · Receipt verification</small></main></body></html>
