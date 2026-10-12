<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\PreventDemoModeChanges;

class ProductStock extends Model
{
    use PreventDemoModeChanges { save as protected saveWithDemoGuard; }

    protected $fillable = ['product_id', 'variant', 'sku', 'price', 'qty', 'image'];

    public function save(array $options = [])
    {
        return app(\App\Pos\Services\LegacyGuard::class)->saveStock($this, $options,
            fn (array $saveOptions) => $this->saveWithDemoGuard($saveOptions));
    }
    //
    public function product(){
    	return $this->belongsTo(Product::class);
    }

    public function wholesalePrices() {
        return $this->hasMany(WholesalePrice::class);
    }
}
