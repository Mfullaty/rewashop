<div class="card mx-3 mx-md-4 my-4">
    <div class="card-header"><h2 class="h6 mb-0">{{ translate('Rewa Market introduction') }}</h2></div>
    <div class="card-body">
        <p class="text-muted">{{ translate('These settings apply to Rewa Market. Configure all merchandising sections below. Colors, fonts, menus, logo and footer use the existing website settings.') }}</p>
        <form action="{{ route('business_settings.update') }}" method="POST">
            @csrf
            <input type="hidden" name="lang" value="{{ $lang }}">
            @foreach (['market_hero_eyebrow' => 'Eyebrow', 'market_hero_title' => 'Heading', 'market_hero_description' => 'Description', 'market_hero_button' => 'Button label', 'market_hero_link' => 'Button link'] as $setting => $label)
                <input type="hidden" name="@if($setting === 'market_hero_link')types[]@else types[][{{ $lang }}]@endif" value="{{ $setting }}">
                <div class="form-group row">
                    <label class="col-md-3 col-form-label" for="{{ $setting }}">{{ translate($label) }}</label>
                    <div class="col-md-9"><input class="form-control" id="{{ $setting }}" name="{{ $setting }}" value="{{ get_setting($setting, null, $lang) }}" @if($setting === 'market_hero_link') type="url" @else type="text" @endif></div>
                </div>
            @endforeach
            <input type="hidden" name="types[]" value="market_header_mode">
            <div class="form-group row">
                <label for="market_header_mode" class="col-md-3 col-form-label">{{ translate('Header layout') }}</label>
                <div class="col-md-9"><select name="market_header_mode" id="market_header_mode" class="form-control">
                    <option value="market" @if(get_setting('market_header_mode', 'market') === 'market') selected @endif>{{ translate('Rewa Market header') }}</option>
                    <option value="selected" @if(get_setting('market_header_mode') === 'selected') selected @endif>{{ translate('Selected dashboard header') }}</option>
                </select></div>
            </div>
            <div class="text-right"><button type="submit" class="btn btn-primary">{{ translate('Save introduction') }}</button></div>
        </form>
    </div>
</div>
