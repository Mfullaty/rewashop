#!/usr/bin/env python3
"""Create a deterministic Addons Manager ZIP, containing only mapped UI files."""
import hashlib
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ADDON = ROOT / 'addons/rewa_pos_pro'
files = [ROOT / 'routes/rewa_pos_pro.php']
for directory in ['app/Http/Controllers/PosPro', 'app/Http/Middleware/PosPro',
                  'resources/views/addons/rewa-pos', 'public/addons/rewa-pos']:
    files.extend(path for path in (ROOT / directory).rglob('*') if path.is_file())
files.sort()
if not (ROOT / 'public/addons/rewa-pos/assets/pos.js').exists():
    raise SystemExit('Build the frontend before packaging.')
manifest = {'name': 'RewaShop POS Pro', 'unique_identifier': 'rewa_pos_pro', 'version': '1.1',
            'minimum_item_version': '7.5.0', 'core_bridge_version': 1,
            'addon_banner': 'addons/rewa-pos/banner.svg', 'folders': [],
            'directory': [{'name': sorted({str(path.parent.relative_to(ROOT)) for path in files})}],
            'files': [{'root_directory': 'addons/rewa_pos_pro/files/' + str(path.relative_to(ROOT)),
                       'update_directory': str(path.relative_to(ROOT)),
                       'sha256': hashlib.sha256(path.read_bytes()).hexdigest()} for path in files]}
(ADDON / 'config.json').write_text(json.dumps(manifest, indent=2) + '\n')
destination = ROOT / 'dist/rewa_pos_pro-1.1.zip'
destination.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(destination, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    def add(name, content, directory=False):
        entry = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
        entry.compress_type = zipfile.ZIP_DEFLATED
        entry.external_attr = ((0o40755 if directory else 0o100644) << 16)
        archive.writestr(entry, content)
    add('rewa_pos_pro/', b'', True)  # The legacy importer reads entry zero.
    add('rewa_pos_pro/config.json', (ADDON / 'config.json').read_bytes())
    for path in files:
        add('rewa_pos_pro/files/' + str(path.relative_to(ROOT)), path.read_bytes())
    for path in sorted((ADDON / 'sql').glob('*.sql')):
        add('rewa_pos_pro/sql/' + path.name, path.read_bytes())
    for path in sorted((ROOT / 'docs/pos').glob('web-*.md')):
        add('rewa_pos_pro/documentation/' + path.name, path.read_bytes())
digest = hashlib.sha256(destination.read_bytes()).hexdigest()
destination.with_suffix('.zip.sha256').write_text(digest + '  ' + destination.name + '\n')
print(json.dumps({'zip': str(destination), 'sha256': digest, 'mapped_files': len(files), 'bytes': destination.stat().st_size}))
