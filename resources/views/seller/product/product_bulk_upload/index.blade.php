@extends('seller.layouts.app')

@section('panel_content')
@if(session('bulk_import_result'))<div class="alert alert-info"><strong>{{ session('bulk_import_result.imported',0) }} products imported. {{ session('bulk_import_result.skipped',0) }} rows need correction.</strong>@foreach(session('bulk_import_result.errors',[]) as $error)<p>{{ $error }}</p>@endforeach</div>@endif
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $error)<p>{{ $error }}</p>@endforeach</div>@endif


    <div class="aiz-titlebar mt-2 mb-4">
      <div class="row align-items-center">
        <div class="col-md-6">
            <h1 class="h3">{{ translate('Bulk Products Upload') }}</h1>
        </div>
      </div>
    </div>

    <div class="card">
        <div class="card-body">
            <table class="table aiz-table mb-0" style="font-size:14px; background-color: #cce5ff; border-color: #b8daff">
                <tr>
                    <td>{{ translate('1. Download the skeleton file and fill it with data.')}}:</td>
                </tr>
                <tr >
                    <td>{{ translate('2. You can download the example file to understand how the data must be filled.')}}:</td>
                </tr>
                <tr>
                    <td>{{ translate('3. Once you have downloaded and filled the skeleton file, upload it in the form below and submit.')}}:</td>
                </tr>
                <tr>
                    <td>{{ translate('4. After uploading products you need to edit them and set products images and choices.')}}</td>
                </tr>
            </table>
            <a href="{{ static_asset('download/product_bulk_demo.xlsx') }}" download><button class="btn btn-primary mt-2">{{ translate('Download CSV') }}</button></a>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <table class="table aiz-table mb-0" style="font-size:14px;background-color: #cce5ff;border-color: #b8daff">
                <tr>
                    <td>{{ translate('1. Category and Brand should be in numerical id.')}}:</td>
                </tr>
                <tr >
                    <td>{{ translate('2. You can download the pdf to get Category and Brand id.')}}:</td>
                </tr>
            </table>
            <a href="{{ route('seller.pdf.download_category') }}"><button class="btn btn-primary mt-2">{{ translate('Download Category')}}</button></a>
            <a href="{{ route('seller.pdf.download_brand') }}"><button class="btn btn-primary mt-2">{{ translate('Download Brand')}}</button></a>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            <div class="col text-center text-md-left">
                <h5 class="mb-md-0 h6">{{ translate('Import Products File') }}</h5>
            </div>
        </div>
        <div class="card-body">
            <form class="form-horizontal" action="{{ route('seller.bulk_product_upload') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <p>CSV, XLSX and XLS are accepted. Keep the template headings. For Excel, fill the first sheet only; reference sheets are not imported. Use numeric reference IDs and 0 or 1 for switches. Leave unused optional cells blank.</p>
                <label>Date format in this file</label><select name="date_format" class="form-control mb-3"><option value="iso">YYYY-MM-DD (current template and exports)</option><option value="legacy">YYYY-DD-MM (older RewaShop exports)</option></select>
                <p>Discount start and end dates must both be filled or both be blank. Actual Excel date cells are also accepted. Import creates new products; it does not overwrite existing stock.</p>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">{{ translate('CSV') }}</label>
                    <div class="col-sm-10">
                        <div class="custom-file">
                            <label class="custom-file-label">
                                <input type="file" name="bulk_file" accept=".csv,.xlsx,.xls" class="custom-file-input" required>
                                <span class="custom-file-name">{{ translate('Choose File')}}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-0 text-right">
                    <button type="submit" class="btn btn-primary">{{translate('Import Products')}}</button>
                </div>
            </form>
        </div>
    </div>

@endsection
