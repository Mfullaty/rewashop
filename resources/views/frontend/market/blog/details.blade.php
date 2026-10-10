@extends('frontend.layouts.app')

@section('meta_title'){{ $blog->meta_title }}@stop

@section('meta_description'){{ $blog->meta_description }}@stop

@section('meta_keywords'){{ $blog->meta_keywords }}@stop

@section('meta')
    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="{{ $blog->meta_title }}">
    <meta itemprop="description" content="{{ $blog->meta_description }}">
    <meta itemprop="image" content="{{ uploaded_asset($blog->meta_img) }}">

    <!-- Twitter Card data -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@publisher_handle">
    <meta name="twitter:title" content="{{ $blog->meta_title }}">
    <meta name="twitter:description" content="{{ $blog->meta_description }}">
    <meta name="twitter:creator" content="@author_handle">
    <meta name="twitter:image" content="{{ uploaded_asset($blog->meta_img) }}">

    <!-- Open Graph data -->
    <meta property="og:title" content="{{ $blog->meta_title }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ route('blog.details', $blog->slug) }}" />
    <meta property="og:image" content="{{ uploaded_asset($blog->meta_img) }}" />
    <meta property="og:description" content="{{ $blog->meta_description }}" />
    <meta property="og:site_name" content="{{ env('APP_NAME') }}" />
@endsection

@section('content')
<section class="market-journal">
    <div class="container">
        <header class="market-journal-hero">
            <a class="market-eyebrow" href="{{ route('blog') }}">{{ translate('The Rewa Journal') }} / {{ translate('All stories') }}</a>
            <h1>{{ $blog->title }}</h1>
            <div class="market-story-meta">
                @if($blog->category)<span class="market-story-category">{{ $blog->category->category_name }}</span>@endif
                <time datetime="{{ $blog->created_at->toDateString() }}">{{ $blog->created_at->format('M d, Y') }}</time>
                <div class="aiz-share"></div>
            </div>
        </header>
        <div class="market-journal-layout">
            <article class="market-article">
                <img class="market-article-cover" src="{{ uploaded_asset($blog->banner) ?: static_asset('assets/img/placeholder-rect.jpg') }}" alt="{{ $blog->title }}">
                <div class="market-article-body aiz-editor-data">{!! $blog->description !!}</div>
                @if(get_setting('facebook_comment') == 1)
                    <div class="fb-comments mt-4" data-href="{{ route('blog.details', $blog->slug) }}" data-width="100%" data-numposts="5"></div>
                @endif
            </article>
            <aside class="market-journal-sidebar">@include('frontend.market.blog.recent')</aside>
        </div>
    </div>
</section>
@endsection

@section('script')
    @if(get_setting('facebook_comment') == 1)
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId={{ env('FACEBOOK_APP_ID') }}&autoLogAppEvents=1"></script>
    @endif
@endsection
