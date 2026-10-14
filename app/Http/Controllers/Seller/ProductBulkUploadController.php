<?php

namespace App\Http\Controllers\Seller;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Brand;
use Auth;
use App\Models\ProductsImport;
use PDF;
use Excel;

class ProductBulkUploadController extends Controller
{
    public function index()
    {
        if(Auth::user()->shop->verification_status){
            return view('seller.product.product_bulk_upload.index');
        }
        else{
            flash(translate('Your shop is not verified yet!'))->warning();
            return back();
        }
    }

    public function pdf_download_category()
    {
        $categories = Category::all();

        return PDF::loadView('backend.downloads.category',[
            'categories' => $categories,
        ], [], [])->download('category.pdf');
    }

    public function pdf_download_brand()
    {
        $brands = Brand::all();

        return PDF::loadView('backend.downloads.brand',[
            'brands' => $brands,
        ], [], [])->download('brands.pdf');
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
