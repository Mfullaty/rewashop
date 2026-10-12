'use strict';
const {DatabaseSync} = require('node:sqlite');
const {randomUUID} = require('node:crypto');
class Store {
  constructor(path) {
    this.db = new DatabaseSync(path);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS records(kind TEXT NOT NULL,id TEXT NOT NULL,value TEXT NOT NULL,PRIMARY KEY(kind,id));
      CREATE TABLE IF NOT EXISTS events(sequence INTEGER PRIMARY KEY,event_id TEXT UNIQUE NOT NULL,type TEXT NOT NULL,payload TEXT NOT NULL,ack TEXT);
      CREATE TABLE IF NOT EXISTS requests(id TEXT PRIMARY KEY,path TEXT NOT NULL,payload TEXT NOT NULL,response TEXT);
      PRAGMA user_version=1;`);
  }
  transaction(fn) { this.db.exec('BEGIN IMMEDIATE'); try { const result = fn(); this.db.exec('COMMIT'); return result; } catch (e) { this.db.exec('ROLLBACK'); throw e; } }
  get(kind, id, fallback = null) { const row = this.db.prepare('SELECT value FROM records WHERE kind=? AND id=?').get(kind, String(id)); return row ? JSON.parse(row.value) : fallback; }
  put(kind, id, value) { this.db.prepare('INSERT INTO records VALUES(?,?,?) ON CONFLICT(kind,id) DO UPDATE SET value=excluded.value').run(kind, String(id), JSON.stringify(value)); }
  remove(kind, id) { this.db.prepare('DELETE FROM records WHERE kind=? AND id=?').run(kind, String(id)); }
  list(kind) { return this.db.prepare('SELECT value FROM records WHERE kind=? ORDER BY id').all(kind).map(r => JSON.parse(r.value)); }
  meta(key, fallback = null) { return this.get('meta', key, fallback); }
  set(key, value) { this.put('meta', key, value); }
  enqueue(type, payload) {
    const sequence = this.meta('sequence', 0) + 1, event_id = randomUUID();
    this.db.prepare('INSERT INTO events(sequence,event_id,type,payload) VALUES(?,?,?,?)').run(sequence, event_id, type, JSON.stringify(payload)); this.set('sequence', sequence);
    return {event_id, local_sequence: sequence, type, payload};
  }
  events(pending = false) { return this.db.prepare('SELECT * FROM events' + (pending ? ' WHERE ack IS NULL' : '') + ' ORDER BY sequence').all().map(r => ({event_id: r.event_id, local_sequence: r.sequence, type: r.type, payload: JSON.parse(r.payload), ack: r.ack ? JSON.parse(r.ack) : null})); }
  acknowledge(ack) { if (ack.durable === true) this.db.prepare('UPDATE events SET ack=? WHERE event_id=? AND ack IS NULL').run(JSON.stringify(ack), ack.event_id); }
  reviews() { return this.events().filter(e => e.ack?.durable && !['accepted', 'duplicate'].includes(e.ack.status) && !this.get('resolved', e.event_id)); }
  export() { return {version: 1, records: this.db.prepare('SELECT * FROM records WHERE NOT(kind=\'meta\' AND id IN (\'credential\',\'pairing\'))').all(), events: this.db.prepare('SELECT * FROM events').all(), requests: this.db.prepare('SELECT * FROM requests').all()}; }
  import(data) {
    if (data.version !== 1 || !Array.isArray(data.records) || !Array.isArray(data.events) || !Array.isArray(data.requests)) throw Error('Unsupported backup format.');
    this.transaction(() => {
      this.db.exec('DELETE FROM records; DELETE FROM events; DELETE FROM requests;');
      for (const r of data.records) { JSON.parse(r.value); this.db.prepare('INSERT INTO records VALUES(?,?,?)').run(r.kind, r.id, r.value); }
      for (const e of data.events) { JSON.parse(e.payload); this.db.prepare('INSERT INTO events VALUES(?,?,?,?,?)').run(e.sequence, e.event_id, e.type, e.payload, e.ack); }
      for (const r of data.requests) this.db.prepare('INSERT INTO requests VALUES(?,?,?,?)').run(r.id, r.path, r.payload, r.response);
      this.remove('meta', 'credential'); this.remove('meta', 'pairing'); this.set('restore_pending', true); this.set('blocked', 'Restore requires internet and supervisor device recovery approval.');
    });
  }
  close() { this.db.close(); }
}
module.exports = {Store};
