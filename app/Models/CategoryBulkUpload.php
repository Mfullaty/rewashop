<?php

namespace App\Models;

use App\Models\Category;
use App\Models\CategoryTranslation;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

use App\Traits\PreventDemoModeChanges;

class CategoryBulkUpload implements ToCollection, WithHeadingRow, \Maatwebsite\Excel\Concerns\WithMultipleSheets
{
    use PreventDemoModeChanges;

    public int $imported=0;
    public int $skipped=0;
    public array $errors=[];

    public function sheets(): array { return [0=>$this]; }

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {

            if (empty($row['name'])) {
                continue;
            }

            try {
            $data=$row instanceof Collection?$row->all():(array)$row;
            \Illuminate\Support\Facades\Validator::make($data,['name'=>'required|string|max:200','digital'=>'nullable|boolean','parent_category_id'=>'nullable|integer|min:0','ordering_number'=>'nullable|integer|min:0'])->validate();
            $ids=array_filter(array_map('trim',explode(',',(string)($row['filtering_attribute_id']??''))));
            foreach($ids as $id){if(!ctype_digit($id)||!\Illuminate\Support\Facades\DB::table('attributes')->where('id',$id)->exists())throw \Illuminate\Validation\ValidationException::withMessages(['filtering_attribute_id'=>'Use existing numeric attribute IDs.']);}
            if(!empty($row['parent_category_id'])&&!\Illuminate\Support\Facades\DB::table('categories')->where('id',$row['parent_category_id'])->exists())throw \Illuminate\Validation\ValidationException::withMessages(['parent_category_id'=>'Choose an existing parent category ID, or 0 for a top-level category.']);
            \Illuminate\Support\Facades\DB::transaction(function()use($row){
            $category = new Category();

            $category->name = trim($row['name']);

            $category->digital = (int)($row['digital'] ?? 0);

            $category->order_level = (int)($row['ordering_number'] ?? 0);

            $category->banner = !empty($row['banner'])
                ? $this->uploadImage($row['banner'])
                : null;

            $category->icon = !empty($row['icon'])
                ? $this->uploadImage($row['icon'])
                : null;

            $category->cover_image = !empty($row['cover_image'])
                ? $this->uploadImage($row['cover_image'])
                : null;

            $category->meta_title = $row['meta_title'] ?? null;
            $category->meta_description = $row['meta_description'] ?? null;
            $category->meta_keywords = $row['meta_keywords'] ?? null;

            if (!empty($row['parent_category_id']) && $row['parent_category_id'] != 0) {

                $parent = Category::find($row['parent_category_id']);

                if ($parent) {
                    $category->parent_id = $parent->id;
                    $category->level = $parent->level + 1;
                }
            }

            $category->slug = preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $row['name'])) . '-' . Str::random(5);

            $category->save();

            $translation = CategoryTranslation::firstOrNew([
                'lang' => env('DEFAULT_LANGUAGE','en'),
                'category_id' => $category->id
            ]);

            $translation->name = $category->name;
            $translation->save();

            if (!empty($row['filtering_attribute_id'])) {

                $attributeIds = array_filter(
                    array_map('trim', explode(',', $row['filtering_attribute_id']))
                );

                $category->attributes()->sync($attributeIds);
            }
            });$this->imported++;
            }catch(\Illuminate\Validation\ValidationException $e){$this->skipped++;if(count($this->errors)<50)$this->errors[]='Row '.($index+2).': '.implode(' ',\Illuminate\Support\Arr::flatten($e->errors()));}
            catch(\Throwable $e){report($e);$this->skipped++;if(count($this->errors)<50)$this->errors[]='Row '.($index+2).': Could not save this category. Check its values or contact support.';}
        }
        session()->flash('category_import_result',['imported'=>$this->imported,'skipped'=>$this->skipped,'errors'=>$this->errors]);

    }


    private function uploadImage($url)
    {
        try {
            $upload = new Upload;
            $upload->external_link = trim($url);
            $upload->type = 'image';
            $upload->save();

            return $upload->id;
        } catch (\Exception $e) {
            return null;
        }
    }
}
