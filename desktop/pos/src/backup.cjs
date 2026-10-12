'use strict';
const {randomBytes, scryptSync, createCipheriv, createDecipheriv} = require('node:crypto');
function seal(data, password) {
  if (typeof password !== 'string' || password.length < 12) throw Error('Use a backup password of at least 12 characters.');
  const salt = randomBytes(16), iv = randomBytes(12), key = scryptSync(password, salt, 32);
  const cipher = createCipheriv('aes-256-gcm', key, iv), bytes = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
  return Buffer.concat([Buffer.from('REWAPOS1'), salt, iv, cipher.getAuthTag(), bytes]);
}
function unseal(bytes, password) {
  if (bytes.length < 52 || bytes.subarray(0, 8).toString() !== 'REWAPOS1') throw Error('Invalid RewaShop backup.');
  const key = scryptSync(password, bytes.subarray(8, 24), 32), decipher = createDecipheriv('aes-256-gcm', key, bytes.subarray(24, 36));
  decipher.setAuthTag(bytes.subarray(36, 52)); return JSON.parse(Buffer.concat([decipher.update(bytes.subarray(52)), decipher.final()]).toString());
}
module.exports = {seal, unseal};
