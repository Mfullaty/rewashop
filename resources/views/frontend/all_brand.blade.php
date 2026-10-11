@extends('frontend.layouts.app')

@section('content')
@php
    $brandSearch = $brandSearch ?? '';
    $brandLetters = $brands->map(fn ($brand) => preg_match('/^[A-Z]$/', mb_strtoupper(mb_substr($brand->getTranslation('name'), 0, 1))) ? mb_strtoupper(mb_substr($brand->getTranslation('name'), 0, 1)) : '#')->unique();
@endphp
<section class="rewa-content rewa-brands" data-brand-directory>
    <div class="container">
        <nav class="rewa-breadcrumb" aria-label="{{ translate('Breadcrumb') }}"><a href="{{ route('home') }}">{{ translate('Home') }}</a><span aria-hidden="true">/</span><span>{{ translate('All brands') }}</span></nav>
        <header class="brands-heading"><div><span class="rewa-kicker">{{ translate('The brand directory') }}</span><h1>{{ translate('Find your') }}<br><em>{{ translate('favourites.') }}</em></h1><p>{{ translate('Browse brands and discover their products on Rewa.') }}</p></div><div class="brands-stamp"><strong>{{ $totalBrands ?? $brands->count() }}</strong><span>{{ translate('brands to explore') }}</span><span class="brands-stamp-arrow" aria-hidden="true">↗</span></div></header>
        <div class="brands-toolbar">
            <form class="rewa-search" action="{{ route('brands.all') }}" method="GET"><label class="sr-only" for="brand-search">{{ translate('Search brands') }}</label><input id="brand-search" data-brand-search name="search" type="search" maxlength="120" value="{{ $brandSearch }}" placeholder="{{ translate('Search by brand name') }}"><button type="submit" aria-label="{{ translate('Search brands') }}"><span aria-hidden="true">↗</span></button></form>
            @if($brandSearch)<a class="rewa-text-link" href="{{ route('brands.all') }}">{{ translate('View all brands') }}</a>@endif
            <span class="brands-result-count" aria-live="polite"><strong data-brand-count>{{ $brands->count() }}</strong> {{ translate('brands') }}</span>
        </div>
        <nav class="brands-alphabet" aria-label="{{ translate('Filter brands by initial') }}" data-brand-alphabet hidden><button type="button" data-brand-letter="all" aria-pressed="true">{{ translate('All') }}</button>@foreach(array_merge(range('A', 'Z'), ['#']) as $letter)<button type="button" data-brand-letter="{{ $letter }}" aria-pressed="false" @disabled(!$brandLetters->contains($letter))>{{ $letter }}</button>@endforeach</nav>
        <div class="brands-grid">
            @foreach($brands as $brand)
                @php $brandName = $brand->getTranslation('name'); $initial = mb_strtoupper(mb_substr($brandName, 0, 1)); @endphp
                <a class="brand-tile" href="{{ route('products.brand', $brand->slug) }}" data-brand-name="{{ $brandName }}" data-brand-initial="{{ preg_match('/^[A-Z]$/', $initial) ? $initial : '#' }}">
                    <div class="brand-logo">@if($brand->logo)<img src="{{ uploaded_asset($brand->logo) }}" alt="" loading="lazy" onerror="this.onerror=null;this.src='{{ static_asset('assets/img/placeholder.jpg') }}';">@else<span class="brand-monogram" aria-hidden="true">{{ $initial }}</span>@endif</div>
                    <div class="brand-tile-caption"><span>{{ $brandName }}</span><span aria-hidden="true">↗</span></div>
                </a>
            @endforeach
        </div>
        <div class="rewa-empty" data-brand-empty @if($brands->isNotEmpty()) hidden @endif><span class="rewa-empty-mark" aria-hidden="true">⌕</span><h2>{{ translate('No brands found') }}</h2><p>{{ translate('Try another name or browse all brands.') }}</p><a class="rewa-button" href="{{ route('brands.all') }}">{{ translate('Browse all brands') }}</a></div>
    </div>
</section>
@endsection
