@if (\Illuminate\Support\Facades\Route::has('rewa-pos.'.$posArea.'.index') && addon_is_activated('rewa_pos_pro') && config('pos.enabled')
    && ($posArea !== 'seller' || app(\App\Pos\Services\StoreProvisioningService::class)->sellersEnabled()))
<li class="aiz-side-nav-item">
    <a href="{{ route('rewa-pos.'.$posArea.'.index') }}" class="aiz-side-nav-link">
        <i class="las la-cash-register aiz-side-nav-icon" aria-hidden="true"></i>
        <span class="aiz-side-nav-text">{{ translate('POS Pro') }}</span>
    </a>
</li>
@endif
