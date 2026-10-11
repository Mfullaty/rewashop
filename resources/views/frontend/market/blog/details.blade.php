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
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $blog->meta_title }}">
    <meta name="twitter:description" content="{{ $blog->meta_description }}">
    <meta name="twitter:image" content="{{ uploaded_asset($blog->meta_img) }}">

    <!-- Open Graph data -->
    <meta property="og:title" content="{{ $blog->meta_title }}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ route('blog.details', $blog->slug) }}" />
    <meta property="og:image" content="{{ uploaded_asset($blog->meta_img) }}" />
    <meta property="og:description" content="{{ $blog->meta_description }}" />
    <meta property="og:site_name" content="{{ env('APP_NAME') }}" />
@endsection

@section('content')
@php
    $wordCount = count(preg_split('/\s+/u', trim(strip_tags($blog->description ?? '')), -1, PREG_SPLIT_NO_EMPTY));
    $readingMinutes = max(1, (int) ceil($wordCount / 200));
    $relatedStories = $recent_blogs->reject(fn ($story) => $story->id === $blog->id)->take(3);
@endphp
<section class="rewa-content rewa-article-page">
    <div class="container">
        <nav class="rewa-breadcrumb" aria-label="{{ translate('Breadcrumb') }}"><a href="{{ route('home') }}">{{ translate('Home') }}</a><span aria-hidden="true">/</span><a href="{{ route('blog') }}">{{ translate('Journal') }}</a><span aria-hidden="true">/</span><span>{{ $blog->title }}</span></nav>
        <header class="article-heading">
            @if($blog->category)<a class="journal-category" href="{{ route('blog', ['selected_categories' => [$blog->category->slug]]) }}">{{ $blog->category->category_name }}</a>@endif
            <h1>{{ $blog->title }}</h1>
            @if($blog->short_description)<p class="article-deck">{{ strip_tags($blog->short_description) }}</p>@endif
            <div class="article-byline"><time datetime="{{ $blog->created_at->toDateString() }}">{{ $blog->created_at->format('d F Y') }}</time><span class="article-dot" aria-hidden="true"></span><span>{{ $readingMinutes }} {{ translate('min read') }}</span><div class="aiz-share"></div></div>
        </header>
        <figure class="article-cover"><img src="{{ uploaded_asset($blog->banner) ?: static_asset('assets/img/placeholder-rect.jpg') }}" alt="{{ $blog->title }}" fetchpriority="high" onerror="this.onerror=null;this.src='{{ static_asset('assets/img/placeholder-rect.jpg') }}';"></figure>
        <div class="article-layout">
            <aside class="article-sidebar">
                <nav class="article-contents" aria-label="{{ translate('In this story') }}" hidden><span class="rewa-kicker">{{ translate('In this story') }}</span><ol data-article-contents></ol></nav>
                <a class="rewa-text-link" href="{{ route('blog') }}">{{ translate('Back to the journal') }} <span aria-hidden="true">↗</span></a>
            </aside>
            <article class="article-reading-column">
                <div class="article-body aiz-editor-data" data-article-body>{!! $blog->description !!}</div>
                <div class="article-endnote"><span class="rewa-kicker">{{ translate('The Rewa Journal') }}</span><a class="rewa-text-link" href="{{ route('blog') }}">{{ translate('Explore more stories') }} <span aria-hidden="true">↗</span></a></div>
                @if(get_setting('facebook_comment') == 1)
                    <section class="article-comments"><h2>{{ translate('Join the conversation') }}</h2><div class="fb-comments" data-href="{{ route('blog.details', $blog->slug) }}" data-width="100%" data-numposts="5"></div></section>
                @endif
            </article>
        </div>
        @if($relatedStories->isNotEmpty())
            <section class="journal-related"><div class="journal-results"><h2>{{ translate('Keep reading') }}</h2><a class="rewa-text-link" href="{{ route('blog') }}">{{ translate('All stories') }} <span aria-hidden="true">↗</span></a></div><div class="journal-grid">@foreach($relatedStories as $story)@include('frontend.market.blog.card', ['blog' => $story, 'featured' => false])@endforeach</div></section>
        @endif
    </div>
</section>
@endsection

@section('script')
    @if(get_setting('facebook_comment') == 1)
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId={{ env('FACEBOOK_APP_ID') }}&autoLogAppEvents=1"></script>
    @endif
@endsection
