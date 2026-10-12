<?php

namespace App\Pos\Support;

final class Payload
{
    public static function hash(array $payload): string
    {
        return hash('sha256', self::canonical($payload));
    }

    public static function canonical(array $payload): string { return self::json(self::sort($payload)); }

    public static function json($value): string
    {
        return json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    private static function sort(array $value): array
    {
        if (!array_is_list($value)) {
            ksort($value);
        }
        foreach ($value as &$item) {
            if (is_array($item)) {
                $item = self::sort($item);
            }
        }
        return $value;
    }
}
