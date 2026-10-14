@extends('backend.layouts.app')

@section('content')
@if(session('bulk_import_result'))
    <div class="alert alert-info"><strong>{{ session('bulk_import_result.imported',0) }} products imported. {{ session('bulk_import_result.skipped',0) }} rows need correction.</strong>
    @foreach(session('bulk_import_result.errors',[]) as $error)<p class="mb-1">{{ $error }}</p>@endforeach</div>
@endif
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $error)<p>{{ $error }}</p>@endforeach</div>@endif


    <div class="card">
        <div class="card-header">
            <h5 class="mb-0 h6">{{ translate('Product Bulk Upload') }}</h5>
        </div>
        <div class="card-body">
            <div class="alert mb-2" style="color: #004085;background-color: #cce5ff;border-color: #b8daff;margin-bottom:0;margin-top:10px;">
                <p>1. {{ translate('Download the skeleton file and fill it with proper data') }}.</p>
                <p>2. {{ translate('You can download the example file to understand how the data must be filled') }}.</p>
                <p>3. {{ translate('Category, Brand, Flash Sale, Unit, Note and Warranty use numeric IDs from the reference sheets. Related category and frequently bought IDs are comma-separated. Configure variant choices after import') }}.</p>
                <p>4. {{ translate('You can find all ids in the separate sheets inside the downloaded file') }}.</p>
                <p>5. {{ translate('Once you have downloaded and filled the skeleton file, upload it in the form below and submit') }}.</p>
                <p class="mb-0">6. {{ translate("After uploading products you need to edit them and set product's images and choices") }}.</p>
            </div>
            <div class="">
                <a href="{{ route('bulk_product_demo_download') }}">
                    <button class="btn btn-info">
                        {{ translate('Download Excel Template with Reference IDs') }}
                    </button>
                </a>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            <h5 class="mb-0 h6"><strong>{{ translate('Upload Product File') }}</strong></h5>
        </div>
        <div class="card-body">
            <form class="form-horizontal" action="{{ route('bulk_product_upload') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <p>CSV, XLSX and XLS are accepted. Keep the template headings. For Excel, fill the first sheet only; reference sheets are not imported. Use numeric reference IDs and 0 or 1 for switches. Leave unused optional cells blank.</p>
                <label>Date format in this file</label><select name="date_format" class="form-control mb-3"><option value="iso">YYYY-MM-DD (current template and exports)</option><option value="legacy">YYYY-DD-MM (older RewaShop exports)</option></select>
                <p>Discount start and end dates must both be filled or both be blank. Actual Excel date cells are also accepted. Import creates new products; it does not overwrite existing stock.</p>
                <div class="form-group row">
                    <div class="col-sm-9">
                        <div class="custom-file">
                            <label class="custom-file-label">
                                <input type="file" name="bulk_file" accept=".csv,.xlsx,.xls" class="custom-file-input" required>
                                <span class="custom-file-name">{{ translate('Choose File') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-0">
                    <button type="submit" class="btn btn-info">{{ translate('Import Products') }}</button>
                </div>
            </form>
        </div>
    </div>

@endsection
