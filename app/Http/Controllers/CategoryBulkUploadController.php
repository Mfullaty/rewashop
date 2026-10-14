<?php

namespace App\Http\Controllers;

use App\Exports\CategoryBulkExport;
use App\Models\CategoryBulkUpload;
use App\Models\CategoriesExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CategoryBulkUploadController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:category_bulk_upload'])->only(['index','bulk_upload','download_demo']);
    }

    public function index()
    {
        return view('backend.product.category_bulk_upload.index');
    }

    public function download_demo()
    {
        return Excel::download(new CategoryBulkExport, 'category_bulk_demo.xlsx');
    }

    public function export()
    {
        return Excel::download(new CategoriesExport, 'categories.xlsx');
    }

    public function bulk_upload(Request $request)
    {
        if (!extension_loaded('zip')){
            flash(translate('Please enable the Zip extension'))->error();
            return back();
        }

        $request->validate(['bulk_file'=>'required|file|mimes:csv,txt,xlsx,xls|max:20480']);
        if ($request->hasFile('bulk_file')) {
            $import = new CategoryBulkUpload;
            try{Excel::import($import,$request->file('bulk_file'));if($import->skipped)flash($import->imported.' categories imported; '.$import->skipped.' rows need correction.')->warning();elseif($import->imported)flash($import->imported.' categories imported successfully.')->success();else flash('No category rows were found in the first sheet.')->warning();}
            catch(\Throwable $e){report($e);flash('The category file could not be read. Use a CSV, XLSX or XLS template.')->error();}
        }

        return back();
    }
}
