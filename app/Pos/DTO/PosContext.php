<?php

namespace App\Pos\DTO;

use App\Models\User;
use App\Models\Pos\Device;
use App\Pos\Exceptions\PosException;
use Illuminate\Support\Facades\DB;

final class PosContext
{
    public function __construct(
        public readonly User $actor,
        public readonly int $sellerId,
        public readonly string $ownerType,
        public readonly string $currency,
        public readonly array $abilities,
        public readonly array $registerIds,
        public readonly int $maxDiscountBps,
        public readonly ?Device $device = null,
    ) {}

    public function require(string $ability): void
    {
        if (!in_array($ability, $this->abilities, true)) {
            throw new PosException('PERMISSION_DENIED', 'This POS operation is not permitted.', 403);
        }
    }

    public function register(int $id): object
    {
        $register = DB::table('pos_registers')->where('seller_id', $this->sellerId)->where('id', $id)->first();
        if (!$register || !$register->active ||
            !DB::table('pos_locations')->where('id', $register->location_id)->where('seller_id', $this->sellerId)->where('active', true)->exists() ||
            ($this->registerIds && !in_array($id, $this->registerIds, true)) ||
            ($this->device && (int) $this->device->register_id !== $id)) {
            throw new PosException('REGISTER_NOT_FOUND', 'The register is unavailable in your POS scope.', 404);
        }
        return $register;
    }

    public function scoped(string $table, int $id): object
    {
        $row = DB::table($table)->where('seller_id', $this->sellerId)->where('id', $id)->first();
        if (!$row) {
            throw new PosException('NOT_FOUND', 'The POS record was not found.', 404);
        }
        if (isset($row->register_id)) {
            $this->register((int) $row->register_id);
        }
        return $row;
    }
}
