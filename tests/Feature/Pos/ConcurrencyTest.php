<?php

namespace Tests\Feature\Pos;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;

class ConcurrencyTest extends PosTestCase
{
    private function mysql(): void
    {
        if (config('database.default') !== 'mysql') { $this->markTestSkipped('Run with POS_TEST_DB=mysql against a disposable InnoDB database.'); }
    }

    private function workers(array $requests): array
    {
        $processes = []; $files = [];
        DB::beginTransaction();
        DB::table('pos_settings')->where('seller_id', 1)->lockForUpdate()->first();
        try {
            foreach ($requests as $request) {
                $request['signing_key_path'] = config('pos.signing_key_path');
                $request['database'] = config('database.connections.mysql.database');
                $file = tempnam(sys_get_temp_dir(), 'pos-concurrency-'); $files[] = $file;
                file_put_contents($file, json_encode($request, JSON_THROW_ON_ERROR));
                $process = new Process([PHP_BINARY, __DIR__.'/concurrency-worker.php', $file], base_path(), null, null, 30);
                $process->start(); $processes[] = $process;
            }
            DB::commit(); $results = [];
            foreach ($processes as $process) {
                $process->wait(); $this->assertSame(0, $process->getExitCode(), $process->getErrorOutput());
                $results[] = json_decode($process->getOutput(), true, 512, JSON_THROW_ON_ERROR);
            }
            return $results;
        } finally {
            if (DB::transactionLevel()) { DB::rollBack(); }
            foreach ($processes as $process) { if ($process->isRunning()) { $process->stop(); } }
            foreach ($files as $file) { unlink($file); }
        }
    }

    public function test_ten_parallel_retries_create_one_sale_and_one_stock_movement(): void
    {
        $this->mysql(); $data = $this->saleData(); $key = (string) Str::uuid();
        $results = $this->workers(array_fill(0, 10, ['type' => 'sale', 'owner' => 1, 'key' => $key, 'payload' => $data]));
        $this->assertCount(10, array_filter($results, fn ($r) => $r['success']));
        $this->assertCount(1, array_unique(array_column(array_column($results, 'result'), 'order_id')));
        $this->assertDatabaseCount('orders', 1); $this->assertDatabaseCount('pos_sales', 1);
        $this->assertDatabaseCount('pos_stock_movements', 1); $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 18]);
    }

    public function test_six_register_requests_cannot_sell_the_last_unit_twice(): void
    {
        $this->mysql(); $shift = $this->shift(); DB::table('product_stocks')->where('id', 11)->update(['qty' => 1]);
        $requests = [];
        for ($i = 0; $i < 6; $i++) {
            $data = $this->saleData(1, $shift); $data['lines'][0]['quantity'] = 1;
            $data['tenders'] = [['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 10000]];
            $requests[] = ['type' => 'sale', 'owner' => 1, 'key' => (string) Str::uuid(), 'payload' => $data];
        }
        $results = $this->workers($requests);
        $this->assertCount(1, array_filter($results, fn ($r) => $r['success']));
        $this->assertDatabaseCount('orders', 1); $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 0]);
    }

    public function test_web_sales_and_two_device_allocations_contend_for_one_shared_unit(): void
    {
        $this->mysql(); $shift = $this->shift(); $a = $this->device(); $b = $this->device();
        DB::table('product_stocks')->where('id', 11)->update(['qty' => 1]);
        $requests = [];
        foreach ([$a, $b] as $device) {
            $requests[] = ['type' => 'allocation', 'owner' => 1, 'device_id' => $device->id, 'key' => (string) Str::uuid(),
                'payload' => ['lines' => [['stock_id' => 11, 'quantity' => 1]]]];
        }
        for ($i = 0; $i < 2; $i++) {
            $data = $this->saleData(1, $shift); $data['lines'][0]['quantity'] = 1;
            $data['tenders'] = [['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 10000]];
            $requests[] = ['type' => 'sale', 'owner' => 1, 'key' => (string) Str::uuid(), 'payload' => $data];
        }
        $results = $this->workers($requests);
        $this->assertCount(1, array_filter($results, fn ($r) => $r['success']));
        $this->assertSame(1, (int) DB::table('pos_stock_allocations')->sum('reserved') + (int) DB::table('pos_sale_lines')->sum('quantity'));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 0]);
    }
}
