<nav class="market-product-breadcrumb" aria-label="{{ translate('Breadcrumb') }}">
    <ol class="breadcrumb bg-transparent p-0 mb-0">
        <li class="breadcrumb-item"><a class="text-reset" href="{{ route('home') }}">{{ translate('Home') }}</a></li>
        @if($detailedProduct->main_category)
            <li class="breadcrumb-item"><a class="text-reset" href="{{ route('products.category', $detailedProduct->main_category->slug) }}">{{ $detailedProduct->main_category->getTranslation('name') }}</a></li>
        @endif
        <li class="breadcrumb-item active" aria-current="page">{{ $detailedProduct->getTranslation('name') }}</li>
    </ol>
</nav>
