<?php

namespace App\Console\Commands;

use App\Pos\Services\OfflinePolicySigner;
use Illuminate\Console\Command;

class GeneratePosPolicyKey extends Command
{
    protected $signature = 'pos:policy-key';
    protected $description = 'Generate a server-only Ed25519 offline policy signing key without overwriting an existing key';

    public function handle(): int
    {
        if (!extension_loaded('sodium')) { $this->error('The PHP sodium extension is required.'); return self::FAILURE; }
        $path = config('pos.signing_key_path');
        if (!is_file($path)) {
            if (!is_dir(dirname($path))) { mkdir(dirname($path), 0700, true); }
            $file = fopen($path, 'x');
            if (!$file) { $this->error('The signing key could not be created.'); return self::FAILURE; }
            chmod($path, 0600);
            $key = sodium_crypto_sign_secretkey(sodium_crypto_sign_keypair());
            if (fwrite($file, $key) !== strlen($key)) {
                fclose($file); unlink($path); $this->error('The signing key could not be fully written.'); return self::FAILURE;
            }
            fclose($file); sodium_memzero($key);
        }
        $this->info('Policy key ready. Keep its server file private and include it in encrypted operational backups.');
        $this->line('Public key ID: '.app(OfflinePolicySigner::class)->publicKey()['key_id']);
        return self::SUCCESS;
    }
}
