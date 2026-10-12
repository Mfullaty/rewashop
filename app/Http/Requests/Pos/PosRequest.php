<?php

namespace App\Http\Requests\Pos;

use App\Pos\Support\Schemas;
use Illuminate\Foundation\Http\FormRequest;

class PosRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return Schemas::forAction($this->route()->getActionMethod());
    }
}
