@php
    $marketSliderIds = json_decode(get_setting('home_slider_images', null, $lang) ?? '[]', true) ?? [];
    $marketMobileSliderIds = json_decode(get_setting('small_home_slider_images', null, $lang) ?? '[]', true) ?? [];
    $marketSliderLinks = json_decode(get_setting('home_slider_links', null, $lang) ?? '[]', true) ?? [];
    $marketSliderColors = json_decode(get_setting('home_slider_colors', null, $lang) ?? '[]', true) ?? [];
    $marketSliders = count($marketSliderIds) ? get_slider_images($marketSliderIds) : collect();
    $marketMobileSliders = count($marketMobileSliderIds) ? get_slider_images($marketMobileSliderIds) : $marketSliders;
@endphp
<section class="market-hero container">
    <div class="market-hero-intro">
        <span class="market-eyebrow">{{ get_setting('market_hero_eyebrow', null, $lang) ?: translate('Explore RewaShop') }}</span>
        <h1>{{ get_setting('market_hero_title', null, $lang) ?: translate('Find your next favourite.') }}</h1>
        <p>{{ get_setting('market_hero_description', null, $lang) ?: translate('Explore products, brands and independent sellers, all in one place.') }}</p>
        <a class="market-hero-action" href="{{ get_setting('market_hero_link') ?: route('search') }}">
            {{ get_setting('market_hero_button', null, $lang) ?: translate('Explore the collection') }}
            <i class="las la-arrow-right" aria-hidden="true"></i>
        </a>
        @if (get_setting('enable_hot_categories', 1) == 1 && $hot_categories->count())
            <div class="market-hero-topics" aria-label="{{ translate('Popular categories') }}">
                @foreach ($hot_categories->take(4) as $marketCategory)
                    <a href="{{ route('products.category', $marketCategory->slug) }}">{{ $marketCategory->getTranslation('name') }}</a>
                @endforeach
            </div>
        @endif
    </div>
    <div class="market-hero-media">
        @if (count($marketSliders))
            <div class="aiz-carousel market-hero-carousel d-none d-md-block" data-items="1" data-arrows="true" data-dots="true" data-autoplay="false" data-infinite="true">
                @foreach ($marketSliders as $key => $slider)
                    <a href="{{ $marketSliderLinks[$key] ?? route('search') }}" class="market-hero-slide" @if(!empty($marketSliderColors[$key])) style="background-color: {{ $marketSliderColors[$key] }}" @endif>
                        <img src="{{ $slider ? my_asset($slider->file_name) : static_asset('assets/img/placeholder-rect.jpg') }}" alt="{{ get_setting('website_name') }} {{ translate('collection') }}" @if($key > 0) loading="lazy" @endif>
                    </a>
                @endforeach
            </div>
            <div class="aiz-carousel market-hero-carousel d-md-none" data-items="1" data-arrows="false" data-dots="true" data-autoplay="false" data-infinite="true">
                @foreach ($marketMobileSliders as $key => $slider)
                    <a href="{{ $marketSliderLinks[$key] ?? route('search') }}" class="market-hero-slide">
                        <img src="{{ $slider ? my_asset($slider->file_name) : static_asset('assets/img/placeholder-rect.jpg') }}" alt="{{ get_setting('website_name') }} {{ translate('collection') }}" @if($key > 0) loading="lazy" @endif>
                    </a>
                @endforeach
            </div>
        @else
            <div class="market-hero-categories">
                @forelse ($featured_categories->take(4) as $marketCategory)
                    <a href="{{ route('products.category', $marketCategory->slug) }}" class="market-category-tile">
                        <img src="{{ uploaded_asset($marketCategory->banner) ?: static_asset('assets/img/placeholder.jpg') }}" alt="{{ $marketCategory->getTranslation('name') }}" loading="lazy">
                        <span>{{ $marketCategory->getTranslation('name') }} <i class="las la-arrow-right" aria-hidden="true"></i></span>
                    </a>
                @empty
                    <a href="{{ route('search') }}" class="market-hero-empty"><i class="las la-shopping-bag" aria-hidden="true"></i><span>{{ translate('Discover the collection') }}</span></a>
                @endforelse
            </div>
        @endif
    </div>
</section>
