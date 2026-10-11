<article class="journal-card {{ !empty($featured) ? 'journal-card-featured' : '' }}">
    <a class="journal-card-image" href="{{ route('blog.details', $blog->slug) }}" tabindex="-1" aria-hidden="true">
        <img src="{{ uploaded_asset($blog->banner) ?: static_asset('assets/img/placeholder-rect.jpg') }}" alt="" loading="{{ !empty($featured) ? 'eager' : 'lazy' }}" onerror="this.onerror=null;this.src='{{ static_asset('assets/img/placeholder-rect.jpg') }}';">
        @if(!empty($featured))<span class="journal-image-label">{{ translate('Featured story') }}</span>@endif
    </a>
    <div class="journal-card-body">
        <div class="journal-meta">
            @if($blog->category)<span class="journal-category">{{ $blog->category->category_name }}</span>@endif
            <time datetime="{{ $blog->created_at->toDateString() }}">{{ $blog->created_at->format('d M Y') }}</time>
        </div>
        <h2><a href="{{ route('blog.details', $blog->slug) }}">{{ $blog->title }}</a></h2>
        <p>{{ \Illuminate\Support\Str::limit(strip_tags($blog->short_description ?? ''), !empty($featured) ? 220 : 140) }}</p>
        <a class="journal-read" href="{{ route('blog.details', $blog->slug) }}">{{ translate('Read story') }}<span aria-hidden="true">↗</span></a>
    </div>
</article>
