@if(get_setting('coupon_system') == 1 && get_setting('enable_coupon_section') == 1)
<section class="container mb-5">
    <div class="market-coupon-banner" style="background-color: {{ get_setting('cupon_background_color') ?: '#18191d' }}">
        <div><span class="market-eyebrow">{{ translate('More ways to save') }}</span><h2>{{ get_setting('cupon_title', null, $lang) ?: translate('Explore our coupons') }}</h2><p>{{ get_setting('cupon_subtitle', null, $lang) ?: translate('See the current offers from our sellers.') }}</p></div>
        <a class="btn btn-light" href="{{ route('coupons.all') }}">{{ translate('View all coupons') }} <i class="las la-arrow-right" aria-hidden="true"></i></a>
    </div>
</section>
@endif
@foreach([4, 5, 6] as $marketBannerLevel)
    @if(get_setting('enable_banner_' . $marketBannerLevel) == 1)
        @php
            $marketBannerImages = array_filter(json_decode(get_setting('home_banner' . $marketBannerLevel . '_images', null, $lang) ?? '[]', true) ?? []);
            $marketBannerLinks = json_decode(get_setting('home_banner' . $marketBannerLevel . '_links', null, $lang) ?? '[]', true) ?? [];
        @endphp
        @if(count($marketBannerImages))
            <section class="container mb-5">
                <div class="market-promo-grid">
                    @foreach($marketBannerImages as $key => $banner)
                        <a href="{{ $marketBannerLinks[$key] ?? route('search') }}"><img src="{{ uploaded_asset($banner) }}" alt="{{ translate('Store collection') }}" loading="lazy"></a>
                    @endforeach
                </div>
            </section>
        @endif
    @endif
@endforeach
