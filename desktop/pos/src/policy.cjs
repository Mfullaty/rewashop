'use strict';
const {createPublicKey, verify, createHash} = require('node:crypto');
function canonical(value) {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + canonical(value[k])).join(',') + '}';
  if (typeof value === 'number' && !Number.isSafeInteger(value)) throw Error('Policy numbers must be integers.');
  return JSON.stringify(value)?.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
function verifyPolicy(signed, boot, now = Date.now()) {
  const pin = boot.offline_policy_key, p = signed?.policy;
  if (!pin || signed.algorithm !== 'Ed25519' || signed.key_id !== pin.key_id || signed.public_key !== pin.public_key) throw Error('Offline policy signing key differs from the pinned server key.');
  const publicBytes = Buffer.from(pin.public_key, 'base64');
  if (publicBytes.length !== 32 || createHash('sha256').update(publicBytes).digest('hex') !== pin.key_id) throw Error('Invalid pinned signing key.');
  const key = createPublicKey({key: Buffer.concat([Buffer.from('302a300506032b6570032100', 'hex'), publicBytes]), format: 'der', type: 'spki'});
  if (!verify(null, Buffer.from(canonical(p)), key, Buffer.from(signed.signature, 'base64'))) throw Error('Offline policy signature is invalid.');
  if (p.schema_version !== 1 || p.device_id !== boot.device_id || p.seller_id !== boot.seller_id || p.register_id !== boot.registers[0]?.id || p.stock_id !== p.price_snapshot.stock_id || p.price_snapshot.currency !== boot.currency) throw Error('Offline policy belongs to another device or store.');
  if (!Number.isFinite(Date.parse(p.expires_at)) || now > Date.parse(p.expires_at)) throw Error('This downloaded product list needs refreshing. Click Connect and Sync before selling this item.');
  return p;
}
module.exports = {canonical, verifyPolicy};
