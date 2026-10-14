<?php

namespace App\Http\Controllers;

use App\Exports\ProductBulkDemoExport;
use Illuminate\Http\Request;
use App\Models\ProductsImport;
use App\Models\ProductsExport;
use Maatwebsite\Excel\Facades\Excel;
use Auth;


class ProductBulkUploadController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:product_bulk_import'])->only(['index','bulk_upload','download_demo']);
        $this->middleware(['permission:product_bulk_export'])->only('export');
    }

    public function index()
    {
        if (Auth::user()->user_type == 'seller') {
            if (Auth::user()->shop->verification_status) {
                return view('seller.product.product_bulk_upload.index');
            } else {
                flash(translate('Your shop is not verified yet!'))->warning();
                return back();
            }
        } elseif (Auth::user()->user_type == 'admin' || Auth::user()->user_type == 'staff') {
            return view('backend.product.bulk_upload.index');
        }
    }

    public function export()
    {
        return Excel::download(new ProductsExport, 'products.xlsx');
    }

    public function download_demo()
    {
        return Excel::download(new ProductBulkDemoExport, 'product_bulk_demo.xlsx');
    }

    public function bulk_upload(Request $request)
    {
        if (Auth::user()->user_type === 'seller' && !Auth::user()->shop?->verification_status) { abort(403,'Your shop must be verified before importing products.'); }
        $request->validate(['bulk_file'=>'required|file|mimes:csv,txt,xlsx,xls|max:20480','date_format'=>'nullable|in:iso,legacy']);
        $import = new ProductsImport($request->input('date_format','iso') === 'legacy');
        try { Excel::import($import,$request->file('bulk_file')); }
        catch (\Throwable $e) { report($e);flash('The product file could not be read. Use a CSV, XLSX or XLS file with the template headings.')->error(); }
        return back();
    }
}
