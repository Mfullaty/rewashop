<form class="form-horizontal" action="{{ route('payment_method.update') }}" method="POST">
    @csrf
    <input type="hidden" name="payment_method" value="saferpay">
    
    <div class="form-group row">
        <input type="hidden" name="types[]" value="SAFERPAY_CUSTOMER_ID">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('Customer ID') }}</label>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" name="SAFERPAY_CUSTOMER_ID" value="{{ env('SAFERPAY_CUSTOMER_ID') }}" placeholder="{{ translate('Customer ID') }}" required>
        </div>
    </div>
    
    <div class="form-group row">
        <input type="hidden" name="types[]" value="SAFERPAY_TERMINAL_ID">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('Terminal ID') }}</label>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" name="SAFERPAY_TERMINAL_ID" value="{{ env('SAFERPAY_TERMINAL_ID') }}" placeholder="{{ translate('Terminal ID') }}" required>
        </div>
    </div>
    
    <div class="form-group row">
        <input type="hidden" name="types[]" value="SAFERPAY_USERNAME">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('JSON API Username') }}</label>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" name="SAFERPAY_USERNAME" value="{{ env('SAFERPAY_USERNAME') }}" placeholder="{{ translate('JSON API Username') }}" required>
        </div>
    </div>
    
    <div class="form-group row">
        <input type="hidden" name="types[]" value="SAFERPAY_PASSWORD">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('JSON API Password') }}</label>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" name="SAFERPAY_PASSWORD" value="{{ env('SAFERPAY_PASSWORD') }}" placeholder="{{ translate('JSON API Password') }}" required>
        </div>
    </div>
    
    <div class="form-group row">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('Sandbox Mode') }}</label>
        </div>
        <div class="col-md-8">
            <label class="aiz-switch aiz-switch-success mb-0">
                <input value="1" name="saferpay_sandbox" type="checkbox" @if (get_setting('saferpay_sandbox') == 1) checked @endif>
                <span class="slider round"></span>
            </label>
        </div>
    </div>
    
    <div class="form-group mb-0 text-right">
        <button type="submit" class="btn btn-sm btn-primary">{{ translate('Save') }}</button>
    </div>
</form>
