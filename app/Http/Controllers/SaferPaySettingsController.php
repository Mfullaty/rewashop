<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SaferPaySettingsController extends Controller
{
    public function __construct()
    {
        // Admin authorization
        $this->middleware(['auth']);
    }

    public function index()
    {
        return view('backend.addons.saferpay.settings');
    }
}
