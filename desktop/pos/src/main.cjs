'use strict';
const {app, BrowserWindow, ipcMain, dialog, safeStorage, shell} = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const {randomUUID} = require('node:crypto');
const {Store} = require('./store.cjs');
const {Client} = require('./client.cjs');
const {seal, unseal} = require('./backup.cjs');
let window, store, client, serial = Promise.resolve();
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', () => { window?.show(); window?.focus(); });
app.on('window-all-closed', () => app.quit());
app.on('before-quit', () => store?.close());
async function transport(url, options) {
  const body = options.body === undefined ? undefined : JSON.stringify(options.body);
  if (body && Buffer.byteLength(body) > 1048576) throw Error('This operation exceeds the backend request limit.');
  const response = await fetch(url, {method: options.method, redirect: 'error', signal: AbortSignal.timeout(25000), headers: {Accept: 'application/json', 'Content-Type': 'application/json', ...(options.token ? {Authorization: 'Bearer ' + options.token} : {}), ...(options.key ? {'Idempotency-Key': options.key} : {})}, body});
  const text = await response.text(); if (text.length > 16000000) throw Error('Server response is too large.');
  let data; try { data = JSON.parse(text); } catch { throw Error('Server response was not valid JSON. The saved request will be retried.'); }
  if (!response.ok) { const e = Error(data.error?.message || data.message || 'Request failed.'); e.status = response.status; e.code = data.error?.code; throw e; }
  return data;
}
async function writeBackup(filename, bytes) {
  const temp = filename + '.tmp'; const fd = fs.openSync(temp, 'wx', 0o600);
  try { fs.writeFileSync(fd, bytes); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  fs.renameSync(temp, filename);
}
async function backup(password, transfer) {
  if (transfer && (client.unresolved().length || store.reviews().length)) throw Error('Resolve unknown requests and reviews before moving computers.');
  const result = await dialog.showSaveDialog(window, {title: transfer ? 'Move POS to another computer' : 'Save encrypted POS backup', defaultPath: 'RewaShop-POS-' + new Date().toISOString().slice(0, 10) + '.rewapos', filters: [{name: 'RewaShop encrypted backup', extensions: ['rewapos']}]});
  if (result.canceled) return {canceled: true};
  await writeBackup(result.filePath, seal(store.export(), password));
  // The source is disabled only after the complete export is durably written.
  if (transfer) store.set('transfer_locked', true);
  return {saved: true, transfer};
}
async function restore(password) {
  if (store.meta('credential') || store.events().length || store.list('sale').length) throw Error('Restore on a fresh computer. Existing POS data cannot be overwritten.');
  const result = await dialog.showOpenDialog(window, {properties: ['openFile'], filters: [{name: 'RewaShop backup', extensions: ['rewapos']}]});
  if (result.canceled) return {canceled: true};
  if (fs.statSync(result.filePaths[0]).size > 512 * 1024 * 1024) throw Error('Backup is too large. Contact RewaShop.');
  store.import(unseal(fs.readFileSync(result.filePaths[0]), password)); store.set('transfer_locked', false); return client.state();
}
async function execute(command, data = {}) {
  switch (command) {
    case 'state': return client.state();
    case 'pairStart': return client.pairStart(data.origin, data.name);
    case 'pairConfirm': return client.pairConfirm();
    case 'sync': return client.sync();
    case 'quote': return client.quote(data.cart, data.mode);
    case 'checkout': return client.checkout(data);
    case 'openShift': return client.openShift(data.opening_minor);
    case 'closeShift': return client.closeShift(data.counted_minor, data.reason);
    case 'cash': return client.cash(data.amount_minor, data.reason);
    case 'allocate': return client.allocate(data.lines);
    case 'reconcile': return client.reconcile();
    case 'sales': return client.sales(data.page);
    case 'saleDetail': return client.saleDetail(data.id, data.online);
    case 'refund': return client.refund(data);
    case 'retryReview': return client.retryReview(data.id);
    case 'receipt': return client.receipt(data.id);
    case 'action': return client.action(data.kind, data.id, data.payload);
    case 'report': return client.report(data.from, data.to);
    case 'saveCart': if (!Array.isArray(data.cart) || data.cart.length > 200) throw Error('Invalid cart.'); store.set('cart', data.cart); return true;
    case 'hold': { const id = randomUUID(); store.transaction(() => { store.put('held', id, {id, name: String(data.name || 'Held cart').slice(0, 100), cart: store.meta('cart', [])}); store.set('cart', []); }); return client.state(); }
    case 'resume': { const held = store.list('held').find(h => h.id === data.id); if (!held) throw Error('Held cart is missing.'); if (store.meta('cart', []).length) throw Error('Clear or hold the current cart first.'); store.set('cart', held.cart); store.remove('held', held.id); return client.state(); }
    case 'backup': return backup(data.password, false);
    case 'transfer': return backup(data.password, true);
    case 'restore': return restore(data.password);
    case 'manager': { const origin = store.meta('origin'); if (!origin?.startsWith('https://')) throw Error('Connect to RewaShop first.'); await shell.openExternal(origin + (client.boot().owner_type === 'admin' ? '/admin/rewa-pos' : '/seller/rewa-pos')); return true; }
    case 'printers': return window.webContents.getPrintersAsync();
    case 'print': {
      const receipt = store.get('sale', data.client_sale_id) || store.get('receipt', data.receipt_id);
      if (!receipt) throw Error('Receipt is not saved.'); client.require('receipt:read');
      if (data.reprint) client.reprint({...receipt, receipt_id: receipt.server?.receipt_id || data.receipt_id, sale_id: receipt.server?.sale_id || receipt.sale_id});
      await printReceipt(receipt, data); return true;
    }
    default: throw Error('Unsupported desktop command.');
  }
}
async function cacheBrandLogo() {
  const url = store.meta('boot')?.branding?.logo_url;
  if (!url || store.get('image', url)) return;
  try {
    const parsed = new URL(url); if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return;
    const response = await fetch(url, {redirect: 'error', signal: AbortSignal.timeout(10000)});
    if (!response.ok || Number(response.headers.get('content-length')) > 2097152) return;
    const reader = response.body.getReader(), chunks = []; let size = 0;
    while (true) { const {done, value} = await reader.read(); if (done) break; size += value.length; if (size > 2097152) { await reader.cancel(); return; } chunks.push(Buffer.from(value)); }
    const bytes = Buffer.concat(chunks);
    const type = bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) ? 'image/png' : bytes[0] === 255 && bytes[1] === 216 ? 'image/jpeg' : bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP' ? 'image/webp' : null;
    if (type) store.put('image', url, 'data:' + type + ';base64,' + bytes.toString('base64'));
  } catch { /* Logo download does not invalidate a completed financial sync. */ }
}
const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
async function printReceipt(r, options) {
  const width = options.width === 58 ? 58 : 80, money = n => new Intl.NumberFormat('en-NG', {style: 'currency', currency: r.currency}).format(n / 100);
  const w = new BrowserWindow({show: false, webPreferences: {sandbox: true, contextIsolation: true, nodeIntegration: false}});
  const storeBrand = r.store || {}, logo = store.get('image', r.store?.logo_url), rows = r.lines.map(l => `<tr><td>${escape(l.snapshot?.name)} ${escape(l.snapshot?.variant)} × ${escape(l.quantity)}</td><td>${escape(money(l.total_minor))}</td></tr>`).join('');
  const html = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><style>@page{size:${width}mm auto;margin:3mm}body{font:11px Arial;width:${width - 8}mm;margin:auto}h1{font-size:16px;text-align:center}p{text-align:center}table{width:100%}td{padding:4px 0;vertical-align:top}td:last-child{text-align:right}hr{border:0;border-top:1px dashed #333}</style>${logo ? `<p><img alt="Store logo" src="${escape(logo)}" width="80"></p>` : ''}<h1>${escape(storeBrand.name)}</h1><p>${escape(storeBrand.address)}<br>${escape(storeBrand.phone)} ${escape(storeBrand.email)}<br>${escape(storeBrand.tax_details)}</p><hr><p>${escape(r.number)}<br>${escape(r.client_sale_id)}<br>${escape(r.occurred_at)}<br>${escape(r.customer?.name)}</p><table>${rows}</table><hr><table><tr><td>Discount</td><td>${escape(money(r.discount_minor))}</td></tr><tr><td>Tax</td><td>${escape(money(r.tax_minor))}</td></tr><tr><td><b>Total</b></td><td><b>${escape(money(r.total_minor))}</b></td></tr>${r.tenders.map(t => `<tr><td>${escape(t.method)}</td><td>${escape(money(t.amount_minor))}</td></tr>${t.method === 'cash' ? `<tr><td>Received / Change</td><td>${escape(money(t.received_minor))} / ${escape(money(t.change_minor))}</td></tr>` : ''}`).join('')}</table><p>${escape(r.sync_status === 'pending' ? 'Recorded locally. Awaiting sync.' : r.sync_status === 'needs_review' ? 'Recorded locally. Supervisor review required.' : r.payment_status || r.server?.payment_status || 'Recorded')}<br>${options.reprint ? 'COPY' : ''}</p><hr><p>${escape(storeBrand.footer)}</p>`;
  try { await w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html)); await w.webContents.executeJavaScript('Promise.all(Array.from(document.images).map(image => image.decode().catch(() => {})))'); await new Promise((resolve, reject) => w.webContents.print({silent: !!options.printer, deviceName: options.printer || undefined, printBackground: false}, (ok, reason) => ok ? resolve() : reject(Error(reason)))); } finally { w.destroy(); }
}
app.whenReady().then(() => {
  fs.mkdirSync(app.getPath('userData'), {recursive: true}); store = new Store(path.join(app.getPath('userData'), 'pos.sqlite'));
  // Electron 44 safeStorage supports synchronous encryption. Fail closed if no
  // operating-system credential protection is available.
  client = new Client(store, transport, {
    encrypt: async token => { if (!safeStorage.isEncryptionAvailable()) throw Error('Windows credential protection is unavailable.'); return safeStorage.encryptString(token).toString('base64'); },
    decrypt: async encrypted => safeStorage.decryptString(Buffer.from(encrypted, 'base64'))
  });
  if (process.env.REWAPOS_SMOKE_TEST === '1') {
    const run = async () => {
      const encrypted = await client.credentials.encrypt('smoke-test-token');
      if (await client.credentials.decrypt(encrypted) !== 'smoke-test-token') throw Error('Credential roundtrip failed.');
      store.transaction(() => { store.set('smoke_test', {ok: true}); });
      if (!store.meta('smoke_test')?.ok) throw Error('SQLite failed.');
      store.remove('meta', 'smoke_test');
      const smokeWindow = new BrowserWindow({show: false, webPreferences: {preload: path.join(__dirname, 'preload.cjs'), sandbox: true, contextIsolation: true, nodeIntegration: false}});
      ipcMain.handle('pos:command', (_event, command) => command === 'state' ? {ok: true, result: client.state()} : {ok: false, error: 'Smoke test is read only.'});
      const errors = [];
      smokeWindow.webContents.on('console-message', details => { if (details.level === 'error') errors.push(details.message); });
      await smokeWindow.loadFile(path.join(__dirname, 'index.html'));
      // Validate the preload bridge and bundled renderer, without API access.
      if (!await smokeWindow.webContents.executeJavaScript('typeof window.pos.command === "function" && !!document.querySelector("#content")')) throw Error('Preload bridge failed.');
      await smokeWindow.webContents.executeJavaScript('window.pos.command("state")');
      if (errors.length) throw Error(errors.join('\n'));
      smokeWindow.destroy(); app.exit(0);
    };
    run().catch(e => { fs.writeFileSync(path.join(app.getPath('userData'), 'smoke-failure.txt'), e.stack); app.exit(1); });
    return;
  }
  window = new BrowserWindow({width: 1366, height: 850, minWidth: 1000, minHeight: 680, title: 'RewaShop POS', autoHideMenuBar: true, webPreferences: {preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, sandbox: true, nodeIntegration: false, webSecurity: true}});
  window.webContents.setWindowOpenHandler(() => ({action: 'deny'}));
  window.webContents.on('will-navigate', e => e.preventDefault());
  window.webContents.session.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
  ipcMain.handle('pos:command', (event, command, data) => {
    if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame) throw Error('Unauthorized frame.');
    if (typeof command !== 'string' || JSON.stringify(data || {}).length > 1048576) throw Error('Invalid request.');
    const task = serial.then(async () => { const result = await execute(command, data); if (['sync', 'pairConfirm'].includes(command)) await cacheBrandLogo(); return result; }); serial = task.catch(() => {});
    return task.then(result => ({ok: true, result}), error => ({ok: false, error: error.message, code: error.code}));
  });
  window.loadFile(path.join(__dirname, 'index.html'));
}).catch(e => { dialog.showErrorBox('RewaShop POS could not open', e.message); app.quit(); });
