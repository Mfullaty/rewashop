<section>
    <h2>{{ translate('Recent stories') }}</h2>
    @forelse($recent_blogs as $recent_blog)
        <a class="market-recent-story" href="{{ route('blog.details', $recent_blog->slug) }}">
            <img src="{{ uploaded_asset($recent_blog->banner) ?: static_asset('assets/img/placeholder-rect.jpg') }}" alt="{{ $recent_blog->title }}" loading="lazy">
            <span><strong>{{ $recent_blog->title }}</strong><time datetime="{{ $recent_blog->created_at->toDateString() }}">{{ $recent_blog->created_at->format('M d, Y') }}</time></span>
        </a>
    @empty
        <p class="text-muted mb-0">{{ translate('No stories published yet.') }}</p>
    @endforelse
</section>
