<?php

namespace App\Pos\Services;

use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;

class OfflinePolicySigner
{
    private ?string $loadedKey = null;
    private ?array $publicMetadata = null;

    private function key(): string
    {
        if ($this->loadedKey !== null) { return $this->loadedKey; }
        $path = config('pos.signing_key_path');
        $key = is_file($path) ? file_get_contents($path) : false;
        if (!extension_loaded('sodium') || !$key || strlen($key) !== SODIUM_CRYPTO_SIGN_SECRETKEYBYTES) {
            throw new PosException('POLICY_SIGNING_UNAVAILABLE', 'Generate and securely back up the POS policy signing key before allocating offline stock.', 503);
        }
        return $this->loadedKey = $key;
    }

    public function publicKey(): ?array
    {
        if ($this->publicMetadata !== null) { return $this->publicMetadata; }
        if (!is_file(config('pos.signing_key_path'))) { return null; }
        $public = sodium_crypto_sign_publickey_from_secretkey($this->key());
        return $this->publicMetadata = ['algorithm' => 'Ed25519', 'public_key' => base64_encode($public), 'key_id' => hash('sha256', $public)];
    }

    public function sign(array $policy): array
    {
        $key = $this->key();
        return $this->publicKey() + ['policy' => $policy,
            'signature' => base64_encode(sodium_crypto_sign_detached(Payload::canonical($policy), $key))];
    }

    public function verify(array $signed): bool
    {
        $public = base64_decode($signed['public_key'] ?? '', true);
        $signature = base64_decode($signed['signature'] ?? '', true);
        return extension_loaded('sodium') && $public !== false && strlen($public) === SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES &&
            $signature !== false && strlen($signature) === SODIUM_CRYPTO_SIGN_BYTES &&
            ($signed['algorithm'] ?? '') === 'Ed25519' && hash_equals(hash('sha256', $public), $signed['key_id'] ?? '') &&
            sodium_crypto_sign_verify_detached($signature, Payload::canonical($signed['policy']), $public);
    }
}
