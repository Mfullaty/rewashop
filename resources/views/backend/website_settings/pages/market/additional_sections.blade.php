<div class="card mx-3 mx-md-4 my-4">
    <div class="card-header"><h2 class="h6 mb-0">{{ translate('Additional marketplace sections') }}</h2></div>
    <div class="card-body">
        <form action="{{ route('business_settings.update') }}" method="POST">
            @csrf
            <input type="hidden" name="types[]" value="enable_coupon_section">
            <div class="form-group row"><label class="col-md-3 col-form-label" for="market-coupons">{{ translate('Coupon section') }}</label><div class="col-md-9"><select class="form-control" id="market-coupons" name="enable_coupon_section"><option value="0">{{ translate('Disabled') }}</option><option value="1" @if(get_setting('enable_coupon_section') == 1) selected @endif>{{ translate('Enabled') }}</option></select><small class="text-muted">{{ translate('The coupon system must also be enabled in feature settings.') }}</small></div></div>
            @foreach(['cupon_title' => 'Coupon heading', 'cupon_subtitle' => 'Coupon description', 'cupon_background_color' => 'Coupon background color', 'cupon_text_color' => 'Coupon text color'] as $setting => $label)
                @php $localizedCouponField = in_array($setting, ['cupon_title', 'cupon_subtitle']); @endphp
                <input type="hidden" name="{{ $localizedCouponField ? 'types[][' . $lang . ']' : 'types[]' }}" value="{{ $setting }}">
                <div class="form-group row"><label class="col-md-3 col-form-label" for="market-{{ $setting }}">{{ translate($label) }}</label><div class="col-md-9"><input id="market-{{ $setting }}" name="{{ $setting }}" class="form-control" value="{{ get_setting($setting, null, $localizedCouponField ? $lang : false) }}" type="text"></div></div>
            @endforeach
            <input type="hidden" name="types[]" value="coupon_background_image">
            <div class="form-group row">
                <label class="col-md-3 col-form-label">{{ translate('Coupon background image') }}</label>
                <div class="col-md-9">
                    <div class="input-group" data-toggle="aizuploader" data-type="image">
                        <div class="input-group-prepend"><div class="input-group-text bg-soft-secondary">{{ translate('Browse') }}</div></div>
                        <div class="form-control file-amount">{{ translate('Choose image') }}</div>
                        <input type="hidden" name="coupon_background_image" class="selected-files" value="{{ get_setting('coupon_background_image') }}">
                    </div>
                    <div class="file-preview box sm"></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">{{ translate('Save coupon section') }}</button>
        </form>
        @foreach([4, 5, 6] as $level)
            @php
                $imageKey = 'home_banner' . $level . '_images';
                $linkKey = 'home_banner' . $level . '_links';
                $images = json_decode(get_setting($imageKey, null, $lang) ?? '[]', true) ?? [];
                $links = json_decode(get_setting($linkKey, null, $lang) ?? '[]', true) ?? [];
            @endphp
            <form action="{{ route('business_settings.update') }}" method="POST" class="mt-5">
                @csrf
                <h3 class="h6">{{ translate('Banner Level') }} {{ $level }}</h3>
                <input type="hidden" name="types[]" value="enable_banner_{{ $level }}">
                <input type="hidden" name="types[][{{ $lang }}]" value="{{ $imageKey }}">
                <input type="hidden" name="types[][{{ $lang }}]" value="{{ $linkKey }}">
                <div class="form-group"><label for="market-banner-{{ $level }}">{{ translate('Status') }}</label><select class="form-control" id="market-banner-{{ $level }}" name="enable_banner_{{ $level }}"><option value="0">{{ translate('Disabled') }}</option><option value="1" @if(get_setting('enable_banner_' . $level) == 1) selected @endif>{{ translate('Enabled') }}</option></select></div>
                <div class="market-banner-rows">
                    @foreach(count($images) ? $images : [''] as $key => $image)
                        <div class="form-group row align-items-start">
                            <div class="col-md-5">
                                <div class="input-group" data-toggle="aizuploader" data-type="image"><div class="input-group-prepend"><div class="input-group-text bg-soft-secondary">{{ translate('Browse') }}</div></div><div class="form-control file-amount">{{ translate('Choose image') }}</div><input type="hidden" name="{{ $imageKey }}[]" class="selected-files" value="{{ $image }}"></div><div class="file-preview box sm"></div>
                            </div>
                            <div class="col-md-5"><input class="form-control" type="url" name="{{ $linkKey }}[]" value="{{ $links[$key] ?? '' }}" placeholder="https://" aria-label="{{ translate('Banner link') }}"></div>
                            <div class="col-md-2"><button type="button" class="btn btn-outline-danger market-remove-banner">{{ translate('Remove') }}</button></div>
                        </div>
                    @endforeach
                </div>
                <template class="market-banner-template"><div class="form-group row align-items-start"><div class="col-md-5"><div class="input-group" data-toggle="aizuploader" data-type="image"><div class="input-group-prepend"><div class="input-group-text bg-soft-secondary">{{ translate('Browse') }}</div></div><div class="form-control file-amount">{{ translate('Choose image') }}</div><input type="hidden" name="{{ $imageKey }}[]" class="selected-files" value=""></div><div class="file-preview box sm"></div></div><div class="col-md-5"><input class="form-control" type="url" name="{{ $linkKey }}[]" value="" placeholder="https://" aria-label="{{ translate('Banner link') }}"></div><div class="col-md-2"><button type="button" class="btn btn-outline-danger market-remove-banner">{{ translate('Remove') }}</button></div></div></template>
                <button type="button" class="btn btn-light market-add-banner">{{ translate('Add banner') }}</button>
                <button type="submit" class="btn btn-primary">{{ translate('Save banners') }}</button>
            </form>
        @endforeach
    </div>
</div>
<script>
document.addEventListener('click', function (event) {
    const add = event.target.closest('.market-add-banner');
    if (add) {
        const form = add.closest('form');
        form.querySelector('.market-banner-rows').appendChild(form.querySelector('template').content.cloneNode(true));
    }
    const remove = event.target.closest('.market-remove-banner');
    if (remove) {
        const rows = remove.closest('.market-banner-rows');
        if (rows.children.length > 1) remove.closest('.form-group').remove();
        else {
            rows.querySelectorAll('input').forEach(function (input) { input.value = ''; });
            rows.querySelectorAll('.file-preview').forEach(function (preview) { preview.innerHTML = ''; });
        }
    }
});
</script>
