<?php

namespace App\Pos\Support;

use App\Pos\Exceptions\PosException;

final class Money
{
    public static function minor($value): int
    {
        $value = (string) ($value ?? '0');
        if (!preg_match('/^(-?)(\d{1,12})(?:\.(\d+))?$/D', $value, $m)) {
            throw new PosException('INVALID_MONEY', 'A supported decimal monetary amount is required.');
        }
        $fraction = str_pad($m[3] ?? '', 3, '0');
        $minor = ((int) $m[2] * 100) + (int) substr($fraction, 0, 2) + ((int) $fraction[2] >= 5 ? 1 : 0);
        $minor *= ($m[1] ?? '') === '-' ? -1 : 1;
        self::bound($minor);
        return $minor;
    }

    public static function decimal(int $minor): string
    {
        return ($minor < 0 ? '-' : '').intdiv(abs($minor), 100).'.'.str_pad((string) (abs($minor) % 100), 2, '0', STR_PAD_LEFT);
    }

    public static function bound(int $minor): int
    {
        if (abs($minor) > config('pos.max_amount_minor')) {
            throw new PosException('AMOUNT_LIMIT', 'The monetary amount exceeds the supported limit.');
        }
        return $minor;
    }

    public static function multiply(int $minor, int $quantity): int
    {
        if ($quantity < 0 || ($quantity !== 0 && abs($minor) > intdiv(config('pos.max_amount_minor'), $quantity))) {
            throw new PosException('AMOUNT_LIMIT', 'The line amount exceeds the supported limit.');
        }
        return self::bound($minor * $quantity);
    }

    public static function percent(int $minor, int $bps): int
    {
        if ($bps < 0 || $bps > 10000 || $minor < 0) {
            throw new PosException('INVALID_RATE', 'The percentage must be between zero and 100.');
        }
        return self::bound(intdiv($minor * $bps + 5000, 10000));
    }
}
