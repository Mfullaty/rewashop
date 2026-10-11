'use strict';

// Exercise the rendered native Header 8 onclick handlers and their actual shared scripts.
// Usage: node tests/header-switchers.cjs [php-binary] [path/to/vendor/autoload.php]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const previews = fs.mkdtempSync(path.join(os.tmpdir(), 'rewashop-switchers-'));
try {
    const rendered = spawnSync(process.argv[2] || 'php', [
        path.join(__dirname, 'render-storefront-pages.php'),
        process.argv[3] || path.join(root, 'vendor/autoload.php'), previews,
    ], { encoding: 'utf8' });
    assert.equal(rendered.status, 0, rendered.stderr || rendered.error?.message);
    const header = fs.readFileSync(path.join(previews, 'header8.html'), 'utf8');
    const script = fs.readFileSync(path.join(previews, 'header-switcher-scripts.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
    const requests = [];
    let reloads = 0;
    const context = vm.createContext({
        $: { post(url, data, success) { requests.push({ url, data: JSON.parse(JSON.stringify(data)) }); success(); } },
        location: { reload() { reloads++; } },
    });
    vm.runInContext(script, context);
    const controls = Array.from(header.matchAll(/onclick="(change(?:Language|Currency)\('([^']+)'\))"/g));
    assert.equal(controls.length, 4, 'The enabled language/currency choices must render.');
    for (const control of controls) vm.runInContext(control[1], context);
    assert.deepEqual(requests, [
        { url: '/language.change', data: { _token: 'fixture', locale: 'en' } },
        { url: '/language.change', data: { _token: 'fixture', locale: 'ha' } },
        { url: '/currency.change', data: { _token: 'fixture', currency_code: 'NGN' } },
        { url: '/currency.change', data: { _token: 'fixture', currency_code: 'USD' } },
    ]);
    assert.equal(reloads, requests.length, 'Successful switcher requests must reload the storefront.');
    process.stdout.write('Header switcher checks passed: arbitrary Header 8 ID, native onclick controls, language/currency POST payloads, CSRF and success reloads.\n');
} finally {
    fs.rmSync(previews, { recursive: true, force: true });
}
