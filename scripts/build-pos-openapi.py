#!/usr/bin/env python3
"""Generate the complete POS route and request contract from Laravel's registry."""
import csv
import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
export = json.loads(subprocess.check_output([os.environ.get('POS_PHP', 'php'), str(ROOT / 'scripts/export-pos-routes.php')], cwd=ROOT))
routes = export['routes']


def node_at(root, parts):
    node = root
    for part in parts:
        if part == '*':
            node.setdefault('type', 'array')
            node = node.setdefault('items', {})
        else:
            node.setdefault('type', 'object')
            node = node.setdefault('properties', {}).setdefault(part, {})
    return node


def schema_for(rules):
    rules = rules or {}
    root = {'type': 'object', 'properties': {}, 'additionalProperties': False}
    for field, validation in rules.items():
        if 'prohibited' in validation:
            continue
        parts = field.split('.')
        node = node_at(root, parts)
        names = {v.split(':', 1)[0] for v in validation}
        if 'array' in names:
            array = any(key.startswith(field + '.*') for key in rules)
            node['type'] = 'array' if array else 'object'
            if array:
                node.setdefault('items', {})
            else:
                node.setdefault('properties', {})
                if any(v.startswith('array:') for v in validation):
                    node['additionalProperties'] = False
        elif 'boolean' in names:
            node['type'] = 'boolean'
        elif 'integer' in names:
            node['type'] = 'integer'
            node['format'] = 'int64'
        else:
            node['type'] = 'string'
        if 'required' in names and parts[-1] != '*':
            parent = node_at(root, parts[:-1])
            parent.setdefault('required', []).append(parts[-1])
        for rule in validation:
            kind, _, value = rule.partition(':')
            if kind in ('uuid', 'date', 'email'):
                node['format'] = {'uuid': 'uuid', 'date': 'date-time', 'email': 'email'}[kind]
            elif kind in ('min', 'max', 'size'):
                suffix = 'Items' if node['type'] == 'array' else 'Length' if node['type'] == 'string' else None
                if kind == 'size':
                    for bound in ('min', 'max'):
                        node[bound + suffix if suffix else ('minimum' if bound == 'min' else 'maximum')] = int(value)
                else:
                    node[kind + suffix if suffix else ('minimum' if kind == 'min' else 'maximum')] = int(value)
            elif kind == 'between':
                low, high = value.split(',')
                node['minimum'], node['maximum'] = int(low), int(high)
            elif kind == 'in':
                values = next(csv.reader([value]))
                node['enum'] = [int(v) for v in values] if node['type'] == 'integer' else values
            elif kind == 'required_with' and parts[-1] != '*':
                parent = node_at(root, parts[:-1])
                other = value.split('.')[-1]
                if other == (parts[-2] if len(parts) > 1 else ''):
                    parent.setdefault('required', []).append(parts[-1])
                else:
                    parent.setdefault('dependentRequired', {}).setdefault(other, []).append(parts[-1])
        if 'nullable' in names:
            node['type'] = [node['type'], 'null']
    return root


descriptions = {
    '__invoke': 'Verify a stored receipt through its private bearer QR token.',
    'signed': 'Verify a device-signed receipt immediately, without any sale upload.',
    'receiptKey': 'Enroll the approved computer public key used for offline receipt signatures.',
    'health': 'Public process health and API schema version.',
    'capabilities': 'Supported features and current caller permissions.',
    'bootstrap': 'Scoped store, register, cashier, currency, policy public key and sync metadata.',
    'search': 'Ownership-safe product search with exact barcode/SKU and keyset pagination.',
    'snapshot': 'Immutable initial catalog snapshot, resumed by snapshot ID and stock key.',
    'changes': 'Ordered catalog changes and tombstones after a merchant sequence cursor.',
    'pull': 'Ordered catalog and permitted register metadata after a sync cursor.',
    'pairStart': 'Create a short-lived pairing challenge. Rate limited and unauthenticated.',
    'pairConfirm': 'Claim an approved pairing once using its secret; return a hashed-storage bearer token.',
    'pairApprove': 'Approve a pairing for an authorised cashier/register, or reauthorise a known device.',
    'revoke': 'Revoke device credentials without releasing offline reserves.',
    'sale': 'Post one canonical in-store order and stock/tender/receipt ledger atomically.',
    'saleShow': 'Read a scoped sale, immutable line snapshots, tenders and returns.',
    'sales': 'List scoped sales with date/register filters and pagination.',
    'shiftOpen': 'Open the register shift with the enrolled cashier and opening cash.',
    'shiftClose': 'Close the current cashier shift and record counted cash and variance.',
    'cash': 'Append an authorised cash in/out movement with a reason.',
    'refund': 'Record a bounded original-tender return and optional restock with cumulative rounding.',
    'void': 'Compensate an unsettled online sale without deleting history.',
    'verifyTender': 'Manually verify an external payment with unique settlement evidence.',
    'verifyRefund': 'Manually confirm an external refund payout with evidence.',
    'allocate': 'Reserve unallocated inventory for the authenticated device and sign its offline price policy.',
    'allocations': 'Read this device\'s open signed allocations.',
    'reconcile': 'Release unused stock only after acknowledged sequence and matching consumption.',
    'push': 'Ingest contiguous per-device events with independent durable acknowledgments.',
    'status': 'Query persisted event acknowledgments after uncertain transport delivery.',
    'receipt': 'Read immutable receipt evidence plus current sale/payment state.',
    'reprint': 'Audit an authorised duplicate receipt request.',
    'report': 'Report gross sales, event-date returns, net tax and tender verification state.',
    'registers': 'Read allowed registers in the merchant\'s single stock pool.',
    'registerCreate': 'Create a register under the store\'s default virtual location.',
    'devices': 'List permitted merchant devices and their operational state.',
    'staff': 'Update bounded cashier abilities, registers and discount limits.',
    'settingsUpdate': 'Update merchant receipt footer and tax-inclusive pricing policy.',
    'adjust': 'Audit a stock count for the online bucket, excluding device reserves.',
}
minor = {'type': 'integer', 'format': 'int64', 'minimum': 0, 'maximum': 1000000000000}
schemas = {
    'Error': {'type': 'object', 'required': ['error'], 'properties': {'error': {'type': 'object', 'required': ['code', 'message'],
        'properties': {'code': {'type': 'string'}, 'message': {'type': 'string'}, 'fields': {'type': 'object'}}}}},
    'SaleResult': {'type': 'object', 'required': ['sale_id', 'order_id', 'client_sale_id', 'receipt_id', 'total_minor', 'payment_status', 'duplicate'],
        'properties': {'sale_id': {'type': 'integer'}, 'order_id': {'type': 'integer'}, 'receipt_id': {'type': 'integer'},
            'client_sale_id': {'type': 'string', 'format': 'uuid'}, 'total_minor': minor,
            'payment_status': {'enum': ['pending', 'settled']}, 'duplicate': {'type': 'boolean'}}},
    'SyncResult': {'type': 'object', 'required': ['schema_version', 'results'], 'properties': {'schema_version': {'const': 1},
        'results': {'type': 'array', 'items': {'type': 'object', 'required': ['event_id', 'status', 'durable'], 'properties': {
            'event_id': {'type': 'string', 'format': 'uuid'}, 'status': {'enum': ['accepted', 'duplicate', 'rejected', 'needs_review']},
            'durable': {'type': 'boolean'}, 'error_code': {'type': 'string'}, 'order_id': {'type': 'integer'}, 'sale_id': {'type': 'integer'},
            'expected_sequence': {'type': 'integer'}, 'duplicate': {'type': 'boolean'}}}}}},
    'OfflineSalePayload': schema_for({}),
}
paths = {}
unauthenticated = {'health', 'pairStart', 'pairConfirm', '__invoke', 'signed'}
created = {'sale', 'shiftOpen', 'refund', 'allocate', 'pairStart', 'registerCreate'}
not_idempotent = {'pairStart', 'pairConfirm', 'push', 'receiptKey'}
for route in routes:
    action = route['action']
    body_schema = schema_for(route['rules'])
    schema_name = action[0].upper() + action[1:] + 'Request'
    if route['rules']:
        schemas[schema_name] = body_schema
    uri = '/' + route['uri']
    for method in route['methods']:
        if method == 'HEAD':
            continue
        api = uri.startswith('/api/')
        response_schema = {'$ref': '#/components/schemas/SaleResult'} if action == 'sale' else {'$ref': '#/components/schemas/SyncResult'} if action == 'push' else {'type': 'object'}
        operation = {'operationId': ('device_' if api else 'browser_') + action,
            'summary': descriptions[action], 'tags': ['Device API' if api else 'Browser backend'],
            'security': [] if action in unauthenticated else [{'PosDeviceBearer' if api else 'BrowserSession': []}],
            'responses': {str(201 if action in created else 200): {'description': 'Committed result or read response',
                'content': {'application/json': {'schema': response_schema}}}}, 'parameters': []}
        if '{id}' in uri:
            operation['parameters'].append({'name': 'id', 'in': 'path', 'required': True,
                'schema': {'type': 'string', 'format': 'uuid'} if action == 'revoke' else {'type': 'integer', 'minimum': 1}})
        if '{token}' in uri or '{key}' in uri:
            name = 'token' if '{token}' in uri else 'key'
            operation['parameters'].append({'name': name, 'in': 'path', 'required': True, 'schema': {'type': 'string', 'pattern': '^[A-Za-z0-9_-]{43}$' if name == 'token' else '^[a-f0-9]{32}$'}})
        if action == 'signed':
            for name, limit in [('p', 6000), ('s', 86)]:
                operation['parameters'].append({'name': name, 'in': 'query', 'required': True, 'schema': {'type': 'string', 'maxLength': limit}})
        if method == 'GET':
            for key, prop in body_schema['properties'].items():
                operation['parameters'].append({'name': key, 'in': 'query', 'required': key in body_schema.get('required', []),
                    'style': 'form', 'explode': True, 'schema': prop})
        elif route['rules']:
            operation['requestBody'] = {'required': True, 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/' + schema_name}}}}
        if method != 'GET' and action not in not_idempotent:
            operation['parameters'].append({'name': 'Idempotency-Key', 'in': 'header', 'required': True,
                'schema': {'type': 'string', 'minLength': 16, 'maxLength': 100, 'pattern': '^[A-Za-z0-9:_-]+$'}})
        if not api and not any(p['name'] == 'register_id' for p in operation['parameters']) and 'register_id' not in body_schema['properties']:
            operation['parameters'].append({'name': 'register_id', 'in': 'query', 'required': False,
                'description': 'Select an assigned register for delegated browser staff.', 'schema': {'type': 'integer', 'minimum': 1}})
        if not api and method != 'GET':
            operation['parameters'].append({'name': 'X-CSRF-TOKEN', 'in': 'header', 'required': True, 'schema': {'type': 'string'}})
        for code in [401, 403, 404, 409, 410, 413, 419, 422, 426, 429, 500, 503]:
            operation['responses'][str(code)] = {'description': 'Typed POS error; retain unacknowledged local events',
                'content': {'application/json': {'schema': {'$ref': '#/components/schemas/Error'}}}}
        paths.setdefault(uri, {})[method.lower()] = operation

schemas.pop('OfflineSalePayload')
event_variants = []
for event_type, rules in export['event_rules'].items():
    name = ''.join(part.title() for part in event_type.split('.')) + 'Payload'
    schemas[name] = schema_for(rules)
    event_variants.append({'type': 'object', 'required': ['event_id', 'local_sequence', 'type', 'payload'],
        'additionalProperties': False, 'properties': {
            'event_id': {'type': 'string', 'format': 'uuid'}, 'local_sequence': {'type': 'integer', 'minimum': 1},
            'type': {'const': event_type}, 'payload': {'$ref': '#/components/schemas/' + name}}})
schemas['PushRequest']['properties']['events']['items'] = {'oneOf': event_variants}
document = {'openapi': '3.1.0', 'info': {'title': 'RewaShop shared POS backend', 'version': '1.0.0',
    'description': 'The registered Laravel device and browser operations. Read docs/pos/api.md for offline event payloads, signed policies, transaction invariants and recovery rules.'},
    'servers': [{'url': 'https://rewashop.com'}], 'paths': paths,
    'components': {'securitySchemes': {'PosDeviceBearer': {'type': 'http', 'scheme': 'bearer', 'bearerFormat': 'Paired POS device token'},
        'BrowserSession': {'type': 'apiKey', 'in': 'cookie', 'name': 'laravel_session', 'description': 'Existing configured Laravel session cookie; writes also require CSRF.'}}, 'schemas': schemas}}
target = ROOT / 'docs/pos/openapi.json'
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(json.dumps(document, ensure_ascii=False, indent=2) + '\n')
print(f'Generated {len(paths)} paths and {sum(len(p) for p in paths.values())} operations in {target}')
