@extends('frontend.layouts.app')

@section('content')
<section class="rewa-content rewa-deals">
    <div class="container">
        <nav class="rewa-breadcrumb" aria-label="{{ translate('Breadcrumb') }}"><a href="{{ route('home') }}">{{ translate('Home') }}</a><span aria-hidden="true">/</span><span>{{ translate('Flash deals') }}</span></nav>
        <header class="deals-heading"><div><span class="rewa-kicker">{{ translate('Limited-time offers') }}</span><h1>{{ translate('Good finds.') }}<br><em>{{ translate('Great timing.') }}</em></h1><p>{{ translate('Explore the offers available now. Each deal ends when its timer runs out.') }}</p></div><div class="deals-symbol" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><path d="M55 5 20 55h27l-5 40 38-53H54l1-37Z" fill="currentColor"/></svg></div></header>
        <input type="hidden" id="selected_homepage" value="{{ get_setting('homepage_select') }}">
        @php $dealBanner = get_setting('flash_deal_banner') ?: get_setting('flash_deal_banner_small'); @endphp
        @if($dealBanner)
            <picture class="deals-promo"><source media="(max-width: 767px)" srcset="{{ uploaded_asset(get_setting('flash_deal_banner_small') ?: $dealBanner) }}"><img src="{{ uploaded_asset($dealBanner) }}" alt="{{ translate('Flash deal offers') }}" onerror="this.onerror=null;this.src='{{ static_asset('assets/img/placeholder-rect.jpg') }}';"></picture>
        @endif
        <div class="journal-results"><h2>{{ translate('Live deals') }}</h2><span>{{ $all_flash_deals->count() }} {{ translate('offers') }}</span></div>
        <div class="deals-grid">
            @forelse($all_flash_deals as $single)
                <a class="deal-card" href="{{ route('flash-deal-details', $single->slug) }}">
                    <div class="deal-card-image"><img src="{{ uploaded_asset($single->banner) ?: static_asset('assets/img/placeholder-rect.jpg') }}" alt="" loading="lazy" onerror="this.onerror=null;this.src='{{ static_asset('assets/img/placeholder-rect.jpg') }}';"><span class="deal-live"><span aria-hidden="true"></span>{{ translate('Live now') }}</span></div>
                    <div class="deal-card-body"><h2>{{ $single->getTranslation('title') }}</h2><div class="deal-timer"><span>{{ translate('Ends in') }}</span><div class="aiz-count-down" data-date="{{ date('Y/m/d H:i:s', $single->end_date) }}"><time datetime="{{ date('c', $single->end_date) }}">{{ date('d M Y, H:i', $single->end_date) }}</time></div></div><div class="deal-card-action"><span>{{ translate('Shop this deal') }}</span><span aria-hidden="true">↗</span></div></div>
                </a>
            @empty
                <div class="rewa-empty"><span class="rewa-empty-mark" aria-hidden="true">↗</span><h2>{{ translate('No flash deals right now') }}</h2><p>{{ translate('Check back for new offers, or explore the marketplace.') }}</p><a class="rewa-button" href="{{ route('home') }}">{{ translate('Explore Rewa') }}</a></div>
            @endforelse
        </div>
    </div>
</section>
@endsection
