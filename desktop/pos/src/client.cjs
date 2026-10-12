'use strict';
const {randomUUID} = require('node:crypto');
const {integer, calculate, bound} = require('./money.cjs');
const {verifyPolicy, canonical} = require('./policy.cjs');
const success = ack => ack?.durable && ['accepted', 'duplicate'].includes(ack.status);
class Client {
  constructor(store, transport, credentials) { this.s = store; this.transport = transport; this.credentials = credentials; }
  boot() { const b = this.s.meta('boot'); if (!b) throw Error('Connect this computer first.'); return b; }
  require(ability, financial = false) {
    const b = this.boot();
    if (!b.abilities.includes('pos:' + ability)) throw Error('Your cashier account cannot perform this action.');
    if (financial && (this.s.meta('blocked') || this.s.meta('transfer_locked') || this.s.reviews().length || this.unresolved().length)) throw Error('Resolve the connection, transfer or pending review before recording more money.');
    return b;
  }
  unresolved() { return this.s.db.prepare('SELECT * FROM requests WHERE response IS NULL ORDER BY rowid').all(); }
  async api(path, method = 'GET', body, key) {
    const origin = this.s.meta('origin'); if (!origin) throw Error('RewaShop address is missing.');
    const credential = this.s.meta('credential');
    try { return await this.transport(origin + '/api/pos/v1/' + path, {method, body, key, token: credential ? await this.credentials.decrypt(credential) : null}); }
    catch (e) { if ([401, 403].includes(e.status)) this.s.set('blocked', e.message); throw e; }
  }
  async pairStart(origin, name) {
    const u = new URL(origin); if (u.protocol !== 'https:' || u.username || u.password || u.search || u.hash || u.pathname !== '/') throw Error('Enter the HTTPS site address, such as https://rewashop.com.');
    if (this.s.meta('credential')) throw Error('This computer is already paired.');
    this.s.set('origin', u.origin);
    const data = await this.api('devices/pair/start', 'POST', {name: String(name).slice(0, 100)});
    this.s.set('pairing', data); return {...data, recovery_device_id: this.s.meta('boot')?.device_id};
  }
  async pairConfirm() {
    const p = this.s.meta('pairing'); if (!p) throw Error('Start connection first.');
    const data = await this.api('devices/pair/confirm', 'POST', {pairing_id: p.pairing_id, pairing_secret: p.pairing_secret});
    if (data.status !== 'paired') return data;
    const old = this.s.meta('boot');
    // A recovered journal must keep its original device sequence and allocations.
    // Never attach it to a newly created device.
    this.s.set('credential', await this.credentials.encrypt(data.token)); this.s.set('credential_expiry', data.expires_at);
    if (old && old.device_id !== data.device_id) { this.s.set('blocked', 'Supervisor must recover the original device ID, not create a new device.'); throw Error(this.s.meta('blocked')); }
    this.s.remove('meta', 'pairing'); await this.refreshBootstrap(); await this.sync(); return {status: 'paired'};
  }
  async refreshBootstrap() {
    const b = await this.api('bootstrap'), old = this.s.meta('boot');
    if (b.schema_version !== 1 || b.minor_exponent !== 2 || b.registers.length !== 1) throw Error('Unsupported POS backend or register configuration.');
    if (old && (old.device_id !== b.device_id || old.seller_id !== b.seller_id || old.cashier_id !== b.cashier_id || old.registers[0].id !== b.registers[0].id)) throw Error('Device ownership changed. Contact RewaShop.');
    if (old?.offline_policy_key && canonical(old.offline_policy_key) !== canonical(b.offline_policy_key)) throw Error('Server signing key changed. RewaShop must verify the new key before reconnecting.');
    if (Number(b.last_sequence) > this.s.meta('sequence', 0)) throw Error('This backup is older than server history. Restore the latest backup.');
    this.s.transaction(() => {
      this.s.set('boot', b); this.s.set('last_contact', Date.now()); this.s.set('blocked', null);
      if (!old) this.s.set('sequence', Number(b.last_sequence));
      const shift = this.s.meta('shift');
      if (shift && b.active_shift?.client_shift_id === shift.client_shift_id) { shift.server_id = b.active_shift.id; this.s.set('shift', shift); }
      if (!shift && b.active_shift) this.s.set('shift', {client_shift_id: b.active_shift.client_shift_id, server_id: b.active_shift.id, opening_minor: b.active_shift.opening_minor, expected_minor: b.active_shift.expected_minor, status: 'open', occurred_at: b.active_shift.opened_at});
    }); return b;
  }
  async mutation(path, payload, identity = randomUUID(), context = {}) {
    const old = this.s.db.prepare('SELECT * FROM requests WHERE id=?').get(identity);
    if (old && (old.path !== path || old.payload !== JSON.stringify({payload, context}))) throw Error('Operation identity was already used for another request.');
    if (old?.response) { const result = JSON.parse(old.response); if (result.rejected) { const e = Error(result.message); e.code = result.code; throw e; } return result; }
    if (!old) this.s.db.prepare('INSERT INTO requests(id,path,payload) VALUES(?,?,?)').run(identity, path, JSON.stringify({payload, context}));
    return this.replayRequest(this.s.db.prepare('SELECT * FROM requests WHERE id=?').get(identity));
  }
  async replayRequest(row) {
    const {payload, context} = JSON.parse(row.payload);
    // A network error leaves the original body and idempotency key on disk.
    let result;
    try { result = await this.api(row.path, 'POST', payload, row.id); }
    catch (e) {
      // Only errors raised inside a sale's idempotent transaction prove that
      // its exact original operation has not posted. Authentication errors,
      // 5xx responses and generic validation failures remain uncertain.
      const definitive = ['STOCK_NOT_FOUND', 'INSUFFICIENT_STOCK', 'PRICE_MISMATCH', 'DISCOUNT_LIMIT', 'INVALID_DISCOUNT', 'PRICE_OVERRIDE_DENIED', 'CURRENCY_MISMATCH', 'INVALID_EVENT_TIME', 'SHIFT_UNAVAILABLE', 'INVALID_CHANGE', 'PAYMENT_REFERENCE_REQUIRED', 'TENDER_TOTAL_MISMATCH', 'INVALID_TENDER', 'QUANTITY_LIMIT'];
      if ((row.path === 'sales' && definitive.includes(e.code)) || (row.path === 'inventory/allocations/request' && ['ALLOCATION_LIMIT', 'INSUFFICIENT_STOCK', 'STOCK_NOT_FOUND', 'INVALID_PRICE', 'INVALID_PROMOTION', 'PRICE_WINDOW_CHANGED'].includes(e.code)) || (row.path === 'inventory/allocations/reconcile' && ['RECONCILIATION_INCOMPLETE', 'RECONCILIATION_CONFLICT', 'ALLOCATION_UNAVAILABLE'].includes(e.code))) this.s.db.prepare('UPDATE requests SET response=? WHERE id=?').run(JSON.stringify({rejected: true, code: e.code, message: e.message}), row.id);
      throw e;
    }
    this.s.transaction(() => {
      this.applyMutation(row.path, payload, context, result);
      this.s.db.prepare('UPDATE requests SET response=? WHERE id=?').run(JSON.stringify(result), row.id);
    }); return result;
  }
  applyMutation(path, payload, context, result) {
    if (path === 'inventory/allocations/request') {
      const b = this.boot();
      for (const a of result.allocations) {
        verifyPolicy(a.signed_policy, b, 0);
        if (a.allocation_id !== a.signed_policy.policy.allocation_id || a.stock_id !== a.signed_policy.policy.stock_id || a.reserved !== a.signed_policy.policy.reserved || canonical(a.price_snapshot) !== canonical(a.signed_policy.policy.price_snapshot)) throw Error('Allocation and signature disagree.');
        this.s.put('allocation', a.allocation_id, {...a, consumed: 0, status: 'open'});
      }
    } else if (path === 'inventory/allocations/reconcile') {
      for (const a of result.allocations) { const local = this.s.get('allocation', a.allocation_id); this.s.put('allocation', a.allocation_id, {...local, status: 'closed'}); }
      if (!this.s.list('allocation').some(a => a.status === 'open')) this.s.set('spent_minor', 0);
    } else if (path === 'sales') {
      const receipt = context.receipt;
      this.s.put('sale', payload.client_sale_id, {...receipt, server: result, sync_status: 'accepted'});
      const shift = this.s.meta('shift'); if (shift?.client_shift_id === context.client_shift_id) { shift.expected_minor += payload.tenders.filter(t => t.method === 'cash').reduce((n, t) => n + t.amount_minor, 0); this.s.set('shift', shift); }
      this.s.set('cart', []);
    }
  }
  applyAck(ack) {
    const event = this.s.events().find(e => e.event_id === ack.event_id); if (!event || event.ack || !ack.durable) return;
    this.s.transaction(() => {
      this.s.acknowledge(ack);
      const retry = this.s.get('correction', event.event_id);
      if (retry && success(ack)) this.s.put('resolved', retry.original_event_id, {corrected_by: event.event_id, acknowledged_at: new Date().toISOString()});
      if (event.type === 'sale.completed') {
        const sale = this.s.get('sale', event.payload.client_sale_id);
        this.s.put('sale', event.payload.client_sale_id, {...sale, sync_status: success(ack) ? 'accepted' : 'needs_review', server: ack});
      }
      if (event.type === 'shift.opened' && success(ack)) {
        const shift = this.s.meta('shift'); if (shift?.client_shift_id === event.payload.client_shift_id) { shift.server_id = ack.shift_id; this.s.set('shift', shift); }
      }
      if (event.type === 'refund.created') { const r = this.s.get('return', event.payload.client_refund_id); this.s.put('return', event.payload.client_refund_id, {...r, server: ack, sync_status: success(ack) ? 'accepted' : 'needs_review'}); }
    });
  }
  async sync() {
    if (this.s.meta('transfer_locked')) throw Error('This computer was locked for transfer. Use the destination computer.');
    await this.refreshBootstrap();
    for (const row of this.unresolved()) await this.replayRequest(row);
    let pending = this.s.events(true);
    for (let offset = 0; offset < pending.length; offset += 100) {
      const query = pending.slice(offset, offset + 100).map(e => 'event_ids[]=' + encodeURIComponent(e.event_id)).join('&');
      const status = await this.api('sync/status?' + query); for (const ack of status.results) this.applyAck(ack);
    }
    const unresolvedReviews = this.s.reviews().filter(r => !this.s.events(true).some(e => this.s.get('correction', e.event_id)?.original_event_id === r.event_id));
    if (unresolvedReviews.length) throw Error('A recorded operation needs supervisor review. Saved money and stock evidence remain on this computer.');
    for (const e of this.s.events(true)) {
      const {ack, ...event} = e;
      const response = await this.api('sync/push', 'POST', {schema_version: 1, device_id: this.boot().device_id, events: [event]});
      const result = response.results[0];
      if (!result || result.event_id !== event.event_id) throw Error('Invalid sync acknowledgment. Retry sync.');
      this.applyAck(result);
      if (!success(result)) throw Error(result.message || result.error_code || 'Sync paused for review.');
    }
    await this.refreshBootstrap();
    await this.refreshCatalog();
    await this.refreshAllocations();
    this.s.set('restore_pending', false); this.s.set('last_sync', Date.now()); return this.state();
  }
  async refreshCatalog() {
    if (!this.s.meta('cursor_ready')) {
      let page = await this.api('catalog/snapshot?limit=500'); const items = [...page.data], high = page.high_water_mark;
      while (page.has_more) { page = await this.api(`catalog/snapshot?limit=500&snapshot_id=${page.snapshot_id}&after=${page.next_after}`); items.push(...page.data); }
      this.s.transaction(() => { this.s.db.prepare("DELETE FROM records WHERE kind='catalog'").run(); for (const item of items) this.s.put('catalog', item.stock_id, item); this.s.set('cursor', high); this.s.set('cursor_ready', true); });
    }
    let page;
    do {
      page = await this.api('sync/pull?limit=500&cursor=' + this.s.meta('cursor', 0));
      this.s.transaction(() => {
        for (const change of page.data) {
          if (change.entity === 'catalog') { if (change.operation === 'delete') this.s.remove('catalog', change.id); else this.s.put('catalog', change.id, change.payload); }
          else this.s.put('feed', change.entity + ':' + change.id, change);
        }
        this.s.set('cursor', page.cursor);
      });
    } while (page.has_more);
  }
  async refreshAllocations() {
    if (!this.boot().abilities.includes('pos:inventory:read')) return;
    const remote = await this.api('inventory/allocations');
    this.s.transaction(() => {
      for (const row of remote.data) {
        verifyPolicy(row.signed_policy, this.boot(), 0);
        const id = row.id, old = this.s.get('allocation', id);
        // Preserve unsynced consumption; a server value alone must never recreate local stock.
        if (!old && Number(row.consumed) > 0) throw Error('Consumed stock history is missing. Restore the latest backup.');
        if (old && Number(row.consumed) > old.consumed) throw Error('Server stock use exceeds this backup. Restore the latest backup.');
        this.s.put('allocation', id, {allocation_id: id, stock_id: Number(row.stock_id), reserved: Number(row.reserved), consumed: old?.consumed ?? 0, status: 'open', signed_policy: row.signed_policy, price_snapshot: row.price_snapshot, policy_expires_at: row.signed_policy.policy.expires_at});
      }
      const ids = new Set(remote.data.map(r => r.id));
      for (const old of this.s.list('allocation')) if (old.status === 'open' && !ids.has(old.allocation_id)) this.s.put('allocation', old.allocation_id, {...old, status: 'closed'});
      const pendingSpent = this.s.list('sale').filter(s => s.mode === 'offline' && s.sync_status !== 'accepted').reduce((n, s) => n + s.total_minor, 0);
      // Bootstrap provides current exposure, including sales from recovered sessions.
      this.s.set('spent_minor', Number(this.boot().device?.offline_spent_minor ?? 0) + pendingSpent);
    });
  }
  offlineCheck() {
    const b = this.require('sale:write', true);
    if (this.s.meta('restore_pending') || !b.device?.offline_allowed) throw Error('This computer is not approved for offline sales.');
    if (!Number.isFinite(Date.parse(this.s.meta('credential_expiry'))) || Date.now() > Date.parse(this.s.meta('credential_expiry'))) throw Error('Device permission expired. Reconnect with RewaShop.');
    if (Date.now() < this.s.meta('last_clock', 0) - 300000) throw Error('Computer clock moved backwards. Correct the clock and reconnect.');
    return b;
  }
  allocation(stockId, quantity) {
    const b = this.boot();
    return this.s.list('allocation').find(a => {
      if (a.status !== 'open' || a.stock_id !== stockId || a.reserved - a.consumed < quantity) return false;
      try { verifyPolicy(a.signed_policy, b); return true; } catch { return false; }
    });
  }
  quote(cart, mode = 'offline') {
    const b = this.boot(); if (!Array.isArray(cart) || !cart.length || cart.length > 200 || new Set(cart.map(l => l.stock_id)).size !== cart.length) throw Error('Add between 1 and 200 distinct products.');
    const lines = cart.map(input => {
      integer(input.stock_id, 1); integer(input.quantity, 1, 10000); const allocation = mode === 'offline' ? this.allocation(input.stock_id, input.quantity) : null;
      const item = mode === 'offline' ? allocation?.price_snapshot : this.s.get('catalog', input.stock_id);
      if (!item) throw Error('Product is unavailable, offline stock is insufficient, or its permission expired.');
      if (input.discount_minor && !b.abilities.includes('pos:discount:write')) throw Error('Discount permission is required.');
      if (input.override_minor !== undefined && (mode !== 'online' || !b.abilities.includes('pos:price:override') || String(input.override_reason ?? '').length < 3)) throw Error('Price changes need an online supervisor and a reason.');
      const price = calculate(item, input.quantity, input.discount_minor || 0, Math.min(b.max_discount_bps, item.max_discount_bps ?? b.max_discount_bps), input.override_minor);
      return {...price, stock_id: input.stock_id, quantity: input.quantity, snapshot: item, ...(allocation ? {allocation_id: allocation.allocation_id, policy_signature: allocation.signed_policy.signature} : {}), ...(input.override_minor !== undefined ? {override_minor: input.override_minor, override_reason: input.override_reason} : {})};
    });
    const sum = key => bound(lines.reduce((n, l) => n + BigInt(l[key]), 0n));
    return {lines, subtotal_minor: sum('subtotal_minor'), discount_minor: sum('discount_minor'), tax_minor: sum('tax_minor'), total_minor: sum('total_minor')};
  }
  openShift(opening) {
    const b = this.require('shift:write', true); integer(opening);
    if (this.s.meta('shift')?.status === 'open' || b.active_shift && !this.s.meta('shift')) throw Error('A shift is already open. Sync or close it first.');
    const p = {client_shift_id: randomUUID(), register_id: b.registers[0].id, opening_minor: opening, occurred_at: new Date().toISOString()};
    this.s.transaction(() => { this.s.enqueue('shift.opened', p); this.s.set('shift', {...p, expected_minor: opening, status: 'open'}); }); return this.state();
  }
  shift() { const shift = this.s.meta('shift'); if (!shift || shift.status !== 'open') throw Error('Open your till first.'); return shift; }
  cash(amount, reason) {
    this.require('cash:write', true); integer(Math.abs(amount)); const shift = this.shift();
    if (!amount || shift.expected_minor + amount < 0 || String(reason).length < 3) throw Error('Enter a valid cash amount and reason.');
    this.s.transaction(() => { this.s.enqueue('cash.moved', {client_shift_id: shift.client_shift_id, amount_minor: amount, reason}); shift.expected_minor += amount; this.s.set('shift', shift); }); return this.state();
  }
  closeShift(counted, reason) {
    this.require('shift:write', true); integer(counted); const shift = this.shift();
    if (counted !== shift.expected_minor && String(reason ?? '').length < 3) throw Error('Explain why counted cash differs from expected cash.');
    this.s.transaction(() => { this.s.enqueue('shift.closed', {client_shift_id: shift.client_shift_id, counted_minor: counted, reason: reason || null, occurred_at: new Date().toISOString()}); this.s.set('shift', {...shift, status: 'closed', counted_minor: counted, reason}); }); return this.state();
  }
  async checkout(input) {
    const mode = input.mode, b = mode === 'offline' ? this.offlineCheck() : this.require('sale:write', true), shift = this.shift();
    if (!['offline', 'online'].includes(mode)) throw Error('Choose offline or online checkout.');
    const prior = this.s.get('sale', input.client_sale_id); if (prior) { if (prior.local_request !== canonical(input)) throw Error('Sale ID already belongs to another request.'); return prior; }
    if (!/^[a-f0-9-]{36}$/i.test(input.client_sale_id)) throw Error('Invalid sale identity.');
    const q = this.quote(input.cart, mode), id = input.client_sale_id;
    if (q.total_minor < 1) throw Error('Sale total must be positive.');
    let tenders = input.tenders;
    if (!Array.isArray(tenders) || !tenders.length || tenders.length > 10) throw Error('Enter payment details.');
    let applied = 0;
    tenders = tenders.map(t => {
      integer(t.amount_minor, 1); applied += t.amount_minor;
      if (t.currency !== b.currency || !['cash', 'external_terminal', 'bank_transfer'].includes(t.method) || mode === 'offline' && t.method !== 'cash') throw Error('Offline checkout supports cash only.');
      if (t.method === 'cash') { integer(t.received_minor); integer(t.change_minor); if (t.received_minor - t.change_minor !== t.amount_minor) throw Error('Cash received minus change must match cash applied.'); }
      else if (String(t.reference || '').length < 1) throw Error('External payments require a reference.');
      return t;
    });
    if (applied !== q.total_minor) throw Error('Payments must equal the total.');
    const wireLines = q.lines.map(({snapshot, subtotal_minor, ...l}) => l);
    const payload = {client_sale_id: id, register_id: b.registers[0].id, currency: b.currency, lines: wireLines, tenders, grand_total_minor: q.total_minor, ...(input.customer?.name ? {customer: input.customer} : {})};
    const receipt = {...q, local_request: canonical(input), client_sale_id: id, number: 'LOCAL-' + id, currency: b.currency, store: b.branding, register: b.registers[0].code, cashier: b.cashier_name || 'Cashier', occurred_at: new Date().toISOString(), customer: input.customer?.name ? input.customer : {name: 'Walk-in customer'}, tenders, mode, sync_status: 'pending'};
    if (mode === 'online') {
      if (this.s.events(true).length) await this.sync();
      const active = this.shift(); if (!active.server_id) throw Error('Sync the open shift before online checkout.');
      payload.shift_id = active.server_id;
      await this.mutation('sales', payload, id, {receipt, client_shift_id: active.client_shift_id}); return this.s.get('sale', id);
    }
    const policies = q.lines.map(l => this.s.get('allocation', l.allocation_id).signed_policy.policy);
    const spent = this.s.meta('spent_minor', 0);
    if (policies.some(p => q.total_minor > p.max_offline_sale_minor || spent + q.total_minor > p.max_offline_budget_minor)) throw Error('Offline money limit reached. Sync and reconcile stock first.');
    payload.client_shift_id = shift.client_shift_id; payload.occurred_at = receipt.occurred_at;
    this.s.transaction(() => {
      for (const l of q.lines) { const a = this.s.get('allocation', l.allocation_id); a.consumed += l.quantity; this.s.put('allocation', a.allocation_id, a); }
      this.s.enqueue('sale.completed', payload); this.s.put('sale', id, receipt); this.s.set('spent_minor', spent + q.total_minor);
      shift.expected_minor += q.total_minor; this.s.set('shift', shift); this.s.set('last_clock', Date.now()); this.s.set('cart', []);
    }); return receipt;
  }
  async allocate(lines) { this.require('inventory:write', true); if (!Array.isArray(lines) || !lines.length || lines.length > 200 || new Set(lines.map(l => l.stock_id)).size !== lines.length) throw Error('Choose up to 200 stock lines.'); for (const l of lines) { integer(l.stock_id, 1); integer(l.quantity, 1, 10000); } await this.mutation('inventory/allocations/request', {lines}); await this.refreshCatalog(); return this.state(); }
  async reconcile() {
    this.require('inventory:write', true); await this.sync();
    if (this.s.events(true).length || this.s.reviews().length) throw Error('Sync and resolve all operations before releasing stock.');
    const allocations = this.s.list('allocation').filter(a => a.status === 'open');
    for (let offset = 0; offset < allocations.length; offset += 200) await this.mutation('inventory/allocations/reconcile', {checkpoint_sequence: this.s.meta('sequence', 0), pending_events: 0, allocations: allocations.slice(offset, offset + 200).map(a => ({allocation_id: a.allocation_id, consumed_quantity: a.consumed}))});
    await this.refreshBootstrap(); await this.refreshCatalog(); return this.state();
  }
  async saleDetail(id, online = true) {
    this.require('sale:read'); integer(id, 1);
    if (online) {
      if (this.s.list('return').some(r => r.client_sale_id === this.s.get('detail', id)?.sale.client_sale_id && r.sync_status !== 'accepted')) throw Error('Sync local returns before refreshing this sale.');
      const detail = await this.api('sales/' + id); this.s.put('detail', id, detail); return detail;
    }
    const cached = this.s.get('detail', id); if (!cached) throw Error('Download this sale while connected before an offline return.'); return cached;
  }
  async sales(page = 1) { this.require('sale:read'); integer(page, 1); const r = await this.api('sales?page=' + page); this.s.set('remote_sales', r); return r; }
  async refund(input) {
    this.require('refund:write', true); const shift = this.shift(), d = await this.saleDetail(input.sale_id, false);
    if (String(input.reason).length < 3 || !Array.isArray(input.lines) || !input.lines.length || new Set(input.lines.map(l => l.sale_line_id)).size !== input.lines.length) throw Error('Choose distinct return lines and enter a reason.');
    let amount = 0;
    for (const l of input.lines) {
      integer(l.quantity, 1, 10000); const original = d.lines.find(r => r.id === l.sale_line_id);
      if (!original || typeof l.restock !== 'boolean' || Number(original.returned_quantity) + l.quantity > Number(original.quantity)) throw Error('Return exceeds the remaining sold quantity.');
      amount += Number(BigInt(original.total_minor) * BigInt(Number(original.returned_quantity) + l.quantity) / BigInt(original.quantity) - BigInt(original.total_minor) * BigInt(original.returned_quantity) / BigInt(original.quantity));
    }
    const cashPaid = d.tenders.filter(t => t.method === 'cash').reduce((n, t) => n + Number(t.amount_minor), 0), returned = d.refunds.filter(r => r.method === 'cash').reduce((n, r) => n + Number(r.amount_minor), 0);
    if (amount < 1 || amount + returned > cashPaid || amount > shift.expected_minor) throw Error('Cash return exceeds the original cash payment or available till cash.');
    const p = {client_refund_id: randomUUID(), client_sale_id: d.sale.client_sale_id, client_shift_id: shift.client_shift_id, method: 'cash', reason: input.reason, lines: input.lines};
    this.s.transaction(() => {
      this.s.enqueue('refund.created', p); this.s.put('return', p.client_refund_id, {...p, amount_minor: amount, sync_status: 'pending'});
      for (const l of input.lines) { const original = d.lines.find(r => r.id === l.sale_line_id); original.returned_quantity = Number(original.returned_quantity) + l.quantity; }
      d.refunds.push({method: 'cash', amount_minor: amount, client_refund_id: p.client_refund_id}); this.s.put('detail', input.sale_id, d);
      shift.expected_minor -= amount; this.s.set('shift', shift);
    }); return this.state();
  }
  async receipt(id) { this.require('receipt:read'); integer(id, 1); const r = await this.api('receipts/' + id); this.s.put('receipt', id, r.receipt); return r.receipt; }
  reprint(receipt) {
    this.require('receipt:reprint', true);
    if (receipt.sale_id && receipt.receipt_id) this.s.transaction(() => this.s.enqueue('receipt.reprinted', {receipt_id: receipt.receipt_id, reason: 'Desktop operator requested receipt copy'}));
  }
  async action(kind, id, data) {
    integer(id, 1); const map = {void: ['void:write', `sales/${id}/void`], tender: ['payment:verify', `tenders/${id}/verify`], refundVerify: ['payment:verify', `refunds/${id}/verify`]};
    if (!map[kind]) throw Error('Unsupported action.'); this.require(map[kind][0], true); return this.mutation(map[kind][1], data);
  }
  retryReview(id) {
    this.require('device:manage');
    const original = this.s.reviews().find(e => e.event_id === id);
    if (!original) throw Error('This operation is not awaiting review.');
    if (this.s.events(true).some(e => this.s.get('correction', e.event_id)?.original_event_id === id)) throw Error('A correction is already pending.');
    this.s.transaction(() => {
      const correction = this.s.enqueue(original.type, original.payload);
      this.s.put('correction', correction.event_id, {original_event_id: id});
    }); return this.state();
  }
  async report(from, to) { this.require('report:read'); const data = await this.api('reports/summary?' + new URLSearchParams({...(from ? {from} : {}), ...(to ? {to} : {})})); this.s.set('report', data); return data; }
  state() {
    const boot = this.s.meta('boot');
    return {paired: !!this.s.meta('credential'), origin: this.s.meta('origin', 'https://rewashop.com'), boot, shift: this.s.meta('shift'), catalog: this.s.list('catalog'), allocations: this.s.list('allocation'), sales: this.s.list('sale').reverse(), returns: this.s.list('return'), events: this.s.events().map(e => ({...e, review_resolved: !!this.s.get('resolved', e.event_id)})), pendingRequests: this.unresolved().map(r => ({id: r.id, path: r.path})), blocked: this.s.meta('blocked'), transferLocked: this.s.meta('transfer_locked'), cart: this.s.meta('cart', []), held: this.s.list('held'), lastSync: this.s.meta('last_sync'), remoteSales: this.s.meta('remote_sales'), report: this.s.meta('report'), pairing: this.s.meta('pairing') ? {pairing_id: this.s.meta('pairing').pairing_id, expires_at: this.s.meta('pairing').expires_at, recovery_device_id: boot?.device_id} : null};
  }
}
module.exports = {Client, success};
