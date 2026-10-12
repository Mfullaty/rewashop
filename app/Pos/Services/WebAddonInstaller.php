<?php

namespace App\Pos\Services;

use App\Models\Addon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use RuntimeException;
use ZipArchive;

/** The stock addon importer has no route or migration bootstrap mechanism. */
class WebAddonInstaller
{
    public const ID = 'rewa_pos_pro';

    public function prerequisites(): void
    {
        if (PHP_VERSION_ID < 80200 || !extension_loaded('sodium')) { throw new RuntimeException('POS Pro needs PHP 8.2+ with sodium.'); }
        foreach (['pos_settings', 'pos_sales', 'pos_receipts', 'pos_web_drafts'] as $table) {
            if (!Schema::hasTable($table)) { throw new RuntimeException('Deploy the POS Pro core bridge and run its migrations before importing the addon. Missing: '.$table); }
        }
        if (!is_writable(base_path('routes')) || !is_writable(public_path())) { throw new RuntimeException('The application routes and public directories must be writable during installation.'); }
    }

    private function destination(string $path): string
    {
        if (!preg_match('~^(?:app/Http/Controllers/PosPro/|app/Http/Middleware/PosPro/|resources/views/addons/rewa-pos/|public/addons/rewa-pos/)[A-Za-z0-9_./-]+$~D', $path)
            && $path !== 'routes/rewa_pos_pro.php') { throw new RuntimeException('The addon contains an unsupported destination.'); }
        if (str_contains($path, '..') || str_contains($path, '//')) { throw new RuntimeException('The addon contains an invalid path.'); }
        $full = base_path($path); $parent = $full;
        while ($parent !== base_path()) {
            if (is_link($parent)) { throw new RuntimeException('Addon destinations cannot use symbolic links.'); }
            $parent = dirname($parent);
        }
        return $full;
    }

    public function install(ZipArchive $zip): Addon
    {
        $this->prerequisites();
        $raw = $zip->getFromName(self::ID.'/config.json');
        $config = $raw === false ? null : json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
        if (!$config || ($config['unique_identifier'] ?? '') !== self::ID || !preg_match('/^\d+\.\d+$/D', $config['version'] ?? '')) {
            throw new RuntimeException('Invalid POS Pro release manifest.');
        }
        $currentVersion = DB::table('business_settings')->where('type', 'current_version')->value('value');
        if (!$currentVersion || version_compare($currentVersion, $config['minimum_item_version'], '<')) { throw new RuntimeException('Update RewaShop before installing this POS Pro release.'); }
        $old = Addon::where('unique_identifier', self::ID)->first();
        if ($old && version_compare($old->version, $config['version'], '>')) { throw new RuntimeException('Addon downgrades require the documented backup rollback procedure.'); }
        if ($zip->numFiles > 100 || strlen($raw) > 100000) { throw new RuntimeException('The addon archive exceeds the supported release size.'); }
        $files = []; $bytes = 0;
        foreach ($config['files'] ?? [] as $mapping) {
            $destination = $this->destination($mapping['update_directory']);
            $source = $mapping['root_directory'];
            if (!str_starts_with($source, 'addons/'.self::ID.'/') || str_contains($source, '..')) { throw new RuntimeException('Invalid addon source path.'); }
            $entry = substr($source, strlen('addons/'));
            $stat = $zip->statName($entry);
            if (!$stat || $stat['size'] > 8000000 || ($bytes += $stat['size']) > 20000000) { throw new RuntimeException('Invalid addon file size.'); }
            $content = $zip->getFromName($entry);
            if ($content === false || !hash_equals($mapping['sha256'] ?? '', hash('sha256', $content))) { throw new RuntimeException('Addon checksum verification failed.'); }
            if (isset($files[$destination])) { throw new RuntimeException('Duplicate addon destination.'); }
            $files[$destination] = $content;
        }
        foreach (['routes/rewa_pos_pro.php', 'app/Http/Controllers/PosPro/WorkspaceController.php', 'app/Http/Middleware/PosPro/AddonActive.php',
            'resources/views/addons/rewa-pos/workspace.blade.php', 'public/addons/rewa-pos/assets/pos.js', 'public/addons/rewa-pos/assets/pos.css'] as $required) {
            if (!isset($files[base_path($required)])) { throw new RuntimeException('The release is missing a required POS Pro file.'); }
        }
        // Never extract arbitrary archive paths or run ZIP-supplied SQL/PHP hooks.
        // All schema changes are reviewed core Laravel migrations.
        $backup = [];
        try {
            foreach ($files as $path => $content) {
                $backup[$path] = is_file($path) ? file_get_contents($path) : null;
                if (!is_dir(dirname($path)) && !mkdir(dirname($path), 0755, true) && !is_dir(dirname($path))) { throw new RuntimeException('Cannot create addon directory.'); }
                $tmp = tempnam(dirname($path), '.pos-install-');
                if ($tmp === false || file_put_contents($tmp, $content) !== strlen($content) || !chmod($tmp, 0644) || !rename($tmp, $path)) {
                    if ($tmp && is_file($tmp)) { unlink($tmp); }
                    throw new RuntimeException('Cannot write an addon file.');
                }
                if (function_exists('opcache_invalidate') && str_ends_with($path, '.php')) { opcache_invalidate($path, true); }
            }
            Artisan::call('route:clear'); Artisan::call('view:clear');
            $addon = DB::transaction(function () use ($config) {
                $addon = Addon::where('unique_identifier', self::ID)->first() ?? new Addon;
                $addon->forceFill(['unique_identifier' => self::ID, 'name' => $config['name'], 'version' => $config['version'],
                    'image' => $config['addon_banner'], 'purchase_code' => '', 'activated' => 1])->save();
                return $addon;
            });
            Cache::forget('addons');
            return $addon;
        } catch (\Throwable $e) {
            foreach ($backup as $path => $content) {
                if ($content === null) { if (is_file($path)) { unlink($path); } }
                else { file_put_contents($path, $content); }
                if (function_exists('opcache_invalidate') && str_ends_with($path, '.php')) { opcache_invalidate($path, true); }
            }
            throw $e;
        }
    }
}
