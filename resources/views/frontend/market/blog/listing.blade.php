@extends('frontend.layouts.app')

@section('content')
<section class="rewa-content rewa-journal">
    <div class="container">
        <nav class="rewa-breadcrumb" aria-label="{{ translate('Breadcrumb') }}"><a href="{{ route('home') }}">{{ translate('Home') }}</a><span aria-hidden="true">/</span><span>{{ translate('Journal') }}</span></nav>
        <header class="journal-heading">
            <div><span class="rewa-kicker">{{ translate('The Rewa Journal') }}</span><h1>{{ translate('Good reads.') }}<br><em>{{ translate('Better discoveries.') }}</em></h1></div>
            <p>{{ translate('Product guides, shopping ideas and stories from the Rewa community.') }}</p>
        </header>
        <form class="journal-filters" method="GET" action="{{ route('blog') }}" id="search-form">
            <div class="journal-filter-top">
                <span class="rewa-kicker">{{ translate('Explore the journal') }}</span>
                <div class="rewa-search">
                    <label class="sr-only" for="market-blog-search">{{ translate('Search stories') }}</label>
                    <input id="market-blog-search" name="search" value="{{ $search }}" placeholder="{{ translate('Search stories') }}" type="search" maxlength="150">
                    <button type="submit" aria-label="{{ translate('Search stories') }}"><span aria-hidden="true">↗</span></button>
                </div>
            </div>
            <div class="journal-topics">
                @foreach(get_all_blog_categories() as $category)
                    <label class="journal-topic"><input type="checkbox" name="selected_categories[]" value="{{ $category->slug }}" @checked(in_array($category->slug, $selected_categories ?? []))><span>{{ $category->category_name }}</span></label>
                @endforeach
                <button class="rewa-button rewa-button-small" type="submit">{{ translate('Apply filters') }}</button>
                @if($search || count($selected_categories ?? []))<a class="rewa-text-link" href="{{ route('blog') }}">{{ translate('Clear filters') }}</a>@endif
            </div>
        </form>
        <div class="journal-results"><h2>{{ $search || count($selected_categories ?? []) ? translate('Search results') : translate('Latest stories') }}</h2><span>{{ $blogs->total() }} {{ translate('stories') }}</span></div>
        <div class="journal-grid">
            @forelse($blogs as $blog)
                @include('frontend.market.blog.card', ['blog' => $blog, 'featured' => $loop->first])
            @empty
                <div class="rewa-empty"><span class="rewa-empty-mark" aria-hidden="true">⌕</span><h2>{{ translate('No stories found') }}</h2><p>{{ translate('Try another search or clear your category filters.') }}</p><a class="rewa-button" href="{{ route('blog') }}">{{ translate('View all stories') }}</a></div>
            @endforelse
        </div>
        <div class="aiz-pagination rewa-pagination">{{ $blogs->appends(request()->query())->links() }}</div>
    </div>
</section>
@endsection
