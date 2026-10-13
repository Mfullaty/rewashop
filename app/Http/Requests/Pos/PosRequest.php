<?php

namespace App\Http\Requests\Pos;

use App\Pos\Support\Schemas;
use Illuminate\Foundation\Http\FormRequest;

class PosRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    protected function prepareForValidation(): void
    {
        // Signed catalog prices must retain their exact JSON values. The site's
        // global form middleware trims strings and converts "" to null, which
        // would otherwise invalidate legitimate product variants and signatures.
        if (!$this->isJson()) { return; }
        $raw = json_decode($this->getContent(), true);
        if (!is_array($raw) || !isset($raw['events']) || !is_array($raw['events'])) { return; }
        $events = $this->input('events', []);
        if (!is_array($events)) { return; }
        foreach ($events as $i => &$event) {
            if (!is_array($event) || !is_array($event['payload']['lines'] ?? null)) { continue; }
            foreach ($event['payload']['lines'] as $j => &$line) {
                if (is_array($line) && isset($raw['events'][$i]['payload']['lines'][$j]['catalog_policy'])) {
                    $line['catalog_policy'] = $raw['events'][$i]['payload']['lines'][$j]['catalog_policy'];
                }
            }
            unset($line);
        }
        unset($event);
        $this->merge(['events' => $events]);
    }

    public function rules(): array
    {
        return Schemas::forAction($this->route()->getActionMethod());
    }
}
