<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;

class AuditService
{
    public function record(PosContext $context, string $action, string $subject, array $data = []): void
    {
        DB::table('pos_audit_events')->insert([
            'seller_id' => $context->sellerId, 'actor_id' => $context->actor->id,
            'device_id' => $context->device?->id, 'action' => $action, 'subject' => $subject,
            'context' => Payload::json($data), 'created_at' => now('UTC'),
        ]);
    }
}
