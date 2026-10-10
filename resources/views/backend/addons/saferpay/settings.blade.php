@extends('backend.layouts.app')

@section('content')
<div class="row">
    <div class="col-lg-8 mx-auto">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0 h6">{{translate('SaferPay Additional Settings')}}</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('business_settings.update') }}" method="POST">
                    @csrf
                    <div class="form-group row">
                        <div class="col-md-3">
                            <label class="col-from-label">{{translate('SaferPay Currency')}}</label>
                        </div>
                        <div class="col-md-8">
                            <input type="hidden" name="types[]" value="saferpay_currency">
                            <select class="form-control aiz-selectpicker" name="saferpay_currency" data-live-search="true" required>
                                @foreach (\App\Models\Currency::where('status', 1)->get() as $key => $currency)
                                    <option value="{{ $currency->code }}" @if(get_setting('saferpay_currency') == $currency->code) selected @endif>{{ $currency->name }} ({{ $currency->code }})</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb-0 text-right">
                        <button type="submit" class="btn btn-sm btn-primary">{{translate('Save Settings')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
