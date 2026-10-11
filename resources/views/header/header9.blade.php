{{-- Keep the native marketplace header's complete settings and commerce controls. --}}
<div class="rewa-chrome rewa-header-exchange" style="--chrome-search-bg: {{ get_setting('search_bg_color') ?: '#f4f2ec' }}; --chrome-search-ink: {{ get_setting('search_text_color') ?: '#20251f' }}">
    @include('header.header1')
</div>
