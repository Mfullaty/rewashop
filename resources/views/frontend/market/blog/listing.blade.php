@extends('frontend.layouts.app')

@section('content')
<section class="market-journal">
    <div class="container">
        <header class="market-journal-hero">
            <span class="market-eyebrow">{{ translate('The Rewa Journal') }}</span>
            <h1>{{ translate('Shopping ideas and product guides.') }}</h1>
            <p>{{ translate('Stories, ideas and product guides from our community.') }}</p>
        </header>
        <div class="market-journal-layout">
            <div>
                <div class="market-story-grid">
                    @forelse($blogs as $blog)
                        <article class="market-story-card">
                            <a class="market-story-image" href="{{ route('blog.details', $blog->slug) }}">
                                <img src="{{ uploaded_asset($blog->banner) ?: static_asset('assets/img/placeholder-rect.jpg') }}" alt="{{ $blog->title }}" loading="lazy">
                            </a>
                            <div class="market-story-body">
                                <div class="market-story-meta">
                                    @if($blog->category)<span class="market-story-category">{{ $blog->category->category_name }}</span>@endif
                                    <time datetime="{{ $blog->created_at->toDateString() }}">{{ $blog->created_at->format('M d, Y') }}</time>
                                </div>
                                <h2><a href="{{ route('blog.details', $blog->slug) }}">{{ $blog->title }}</a></h2>
                                <p>{{ $blog->short_description }}</p>
                                <a class="market-story-read" href="{{ route('blog.details', $blog->slug) }}">{{ translate('Read story') }} <i class="las la-arrow-right" aria-hidden="true"></i></a>
                            </div>
                        </article>
                    @empty
                        <div class="market-empty"><h2>{{ translate('No stories found') }}</h2><p>{{ translate('Try another search or change your category filters.') }}</p></div>
                    @endforelse
                </div>
                <div class="aiz-pagination mt-4">{{ $blogs->appends(request()->query())->links() }}</div>
            </div>
            <aside class="market-journal-sidebar">
                <form id="search-form" method="GET" action="{{ route('blog') }}">
                    <h2>{{ translate('Find a story') }}</h2>
                    <div class="market-journal-search">
                        <label class="sr-only" for="market-blog-search">{{ translate('Search stories') }}</label>
                        <input class="form-control" id="market-blog-search" name="search" value="{{ $search }}" placeholder="{{ translate('Search stories') }}" type="search">
                        <button class="btn btn-primary btn-icon" type="submit" aria-label="{{ translate('Search') }}"><i class="las la-search" aria-hidden="true"></i></button>
                    </div>
                    <h2>{{ translate('Categories') }}</h2>
                    @foreach(get_all_blog_categories() as $category)
                        <label class="aiz-checkbox mb-3">
                            <input type="checkbox" name="selected_categories[]" value="{{ $category->slug }}" @if(in_array($category->slug, $selected_categories ?? [])) checked @endif>
                            <span class="aiz-square-check"></span><span>{{ $category->category_name }}</span>
                        </label>
                    @endforeach
                    <button class="btn btn-outline-dark mt-2" type="submit">{{ translate('Apply filters') }}</button>
                </form>
                @include('frontend.market.blog.recent')
            </aside>
        </div>
    </div>
</section>
@endsection
