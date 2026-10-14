'use strict';
const {app, BrowserWindow, ipcMain, dialog, safeStorage, shell, protocol} = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const {randomUUID} = require('node:crypto');
const {Store} = require('./store.cjs');
const {Client} = require('./client.cjs');
const {AutoSync}=require('./auto-sync.cjs');
const {receiptHTML} = require('./receipt.cjs');
const {Images, hash} = require('./images.cjs');
protocol.registerSchemesAsPrivileged([{scheme:'pos-image',privileges:{standard:true,secure:true,supportFetchAPI:true}}]);
const {seal, unseal} = require('./backup.cjs');
let window, store, client, images, autoSync, background=false, foreground=0, serial=Promise.resolve(), localSerial=Promise.resolve();
const requests=new Set();
async function controlledFetch(url,options={}){if(store?.meta('manual_offline'))throw Error('The POS is disconnected.');const controller=new AbortController();requests.add(controller);const signal=AbortSignal.any([options.signal||AbortSignal.timeout(25000),controller.signal]);signal.addEventListener('abort',()=>requests.delete(controller),{once:true});try{return await fetch(url,{...options,signal});}catch(error){requests.delete(controller);throw error;}}
function cancelRequests(){for(const request of requests)request.abort();}
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', () => { window?.show(); window?.focus(); });
app.on('window-all-closed', () => app.quit());
app.on('before-quit', () => {autoSync?.stop();cancelRequests();store?.close();});
async function transport(url, options) {
  const body = options.body === undefined ? undefined : JSON.stringify(options.body);
  if (body && Buffer.byteLength(body) > 1048576) throw Error('This operation exceeds the backend request limit.');
  const response = await controlledFetch(url, {method: options.method, redirect: 'error', signal: AbortSignal.timeout(25000), headers: {Accept: 'application/json', 'Content-Type': 'application/json', ...(options.token ? {Authorization: 'Bearer ' + options.token} : {}), ...(options.key ? {'Idempotency-Key': options.key} : {})}, body});
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
    case 'sync': return client.sync({resumeCatalog:true});
    case 'fullCatalogSync': return client.fullCatalogSync();
    case 'clearCatalog': {const state=client.clearCatalog();await images.cache([]);return state;}
    case 'disconnect': {const state=client.disconnect();cancelRequests();return state;}
    case 'connect': return client.connect();
    case 'quote': {const quote=client.quote(data.cart,data.mode);if(data.payment)store.set('checkout_lock',true);return quote;}
    case 'checkoutLock': store.set('checkout_lock',!!data.locked);if(!data.locked)autoSync?.kick();return true;
    case 'wakeSync': autoSync?.kick();return true;
    case 'setAutoSync': if(typeof data.enabled!=='boolean')throw Error('Choose whether automatic sync is on.');store.set('auto_sync',data.enabled);if(!data.enabled && background)cancelRequests();if(data.enabled)autoSync?.kick();return client.state();
    case 'checkout': if(!store.meta('receipt_signing_key'))throw Error('Connect once to finish the receipt signing setup. After that, receipts can be issued and verified without uploading each sale.'); return client.checkout(data);
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
      let receipt = store.get('sale', data.client_sale_id) || store.get('receipt', data.receipt_id);
      if (!receipt) throw Error('Receipt is not saved.'); client.require('receipt:read');
      receipt=await client.prepareReceipt(receipt);if(data.client_sale_id)store.put('sale',data.client_sale_id,receipt);
      const verification=new URL(receipt.verification_url);if(verification.origin!==new URL(store.meta('origin')).origin || !(/^\/api\/pos\/v1\/receipts\/verify\/[A-Za-z0-9_-]{43}$/.test(verification.pathname)||(/^\/api\/pos\/v1\/receipts\/check\/[a-f0-9]{32}$/.test(verification.pathname)&&verification.searchParams.has('p')&&verification.searchParams.has('s'))))throw Error('The receipt verification address does not match your shop. Ask RewaShop to check the website address.');
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
    const response = await controlledFetch(url, {redirect: 'error', signal: AbortSignal.timeout(10000)});
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
  const logo = store.get('image', r.store?.logo_url), html = receiptHTML(r,{width,logo});
  try { await w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html)); await w.webContents.executeJavaScript('Promise.all(Array.from(document.images).map(image => image.decode().catch(() => {})))'); const height=Math.max(60000,Math.ceil(await w.webContents.executeJavaScript('document.querySelector(".receipt").getBoundingClientRect().height')*25400/96)+2000); await new Promise((resolve, reject) => w.webContents.print({pageSize:{width:width*1000,height},margins:{marginType:'none'},silent: !!options.printer, deviceName: options.printer || undefined, printBackground: false}, (ok, reason) => ok ? resolve() : reject(Error(reason)))); } finally { w.destroy(); }
}
app.whenReady().then(() => {
  fs.mkdirSync(app.getPath('userData'), {recursive: true}); store = new Store(path.join(app.getPath('userData'), 'pos.sqlite'));
  images = new Images(path.join(app.getPath('userData'), 'product-images'), store,controlledFetch);
  protocol.handle('pos-image', request => { const picture=images.read(request.url); return picture ? new Response(picture.bytes,{headers:{'Content-Type':picture.type,'Cache-Control':'public, max-age=86400'}}) : new Response('Picture unavailable',{status:404}); });
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
      const picture=hash('smoke-picture'); fs.writeFileSync(path.join(images.directory,picture),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aR9sAAAAASUVORK5CYII=','base64')); store.put('photo',picture,{type:'image/png'});
      await smokeWindow.webContents.executeJavaScript(`(async()=>{const img=new Image();img.src='pos-image://cache/${picture}';document.body.append(img);await img.decode();img.remove();})()`);
      fs.unlinkSync(path.join(images.directory,picture)); store.remove('photo',picture);
      // Validate the preload bridge and bundled renderer, without API access.
      if (!await smokeWindow.webContents.executeJavaScript('typeof window.pos.command === "function" && !!document.querySelector("#content")')) throw Error('Preload bridge failed.');
      await smokeWindow.webContents.executeJavaScript('window.pos.command("state")');
      if (errors.length) throw Error(errors.join('\n'));
      const fixture={store:{name:'Smoke Shop',address:'Market Road'},occurred_at:new Date().toISOString(),currency:'NGN',lines:[{snapshot:{name:'Rice'},quantity:1,unit_price_minor:10000,total_minor:10000}],total_minor:10000,tenders:[{method:'cash',amount_minor:10000,received_minor:10000,change_minor:0}],verification_url:'https://rewashop.com/api/pos/v1/receipts/verify/'+ 'a'.repeat(43)};
      await smokeWindow.loadURL('data:text/html;charset=utf-8,'+encodeURIComponent(receiptHTML(fixture)));
      if(!await smokeWindow.webContents.executeJavaScript('(async()=>{await document.querySelector(".qr").decode();return document.body.textContent.includes("CASH RECEIPT")&&document.querySelector(".qr").naturalWidth>0;})()'))throw Error('Bundled receipt and QR failed.');
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
    const local=['state','quote','checkoutLock','wakeSync','setAutoSync','saveCart','hold','resume','disconnect','print','openShift','closeShift','cash'].includes(command)||(command==='checkout'&&data?.mode==='offline');
    foreground++;
    const executeTask=async()=>{const result=await execute(command,data);if(['sync','fullCatalogSync','pairConfirm','connect'].includes(command)&&!store.meta('manual_offline')){await Promise.all([cacheBrandLogo(),images.cache(store.list('catalog')).catch(()=>{})]);return {...result,...client.state()};}return result;};
    const task=(background&&local?localSerial:serial).then(executeTask);
    if(background&&local)localSerial=task.catch(()=>{});else serial=task.catch(()=>{});
    task.finally(()=>{foreground--;if(['checkout','openShift','closeShift','cash','refund','pairConfirm','connect'].includes(command))autoSync?.kick();}).catch(()=>{});
    return task.then(result=>({ok:true,result}),error=>({ok:false,error:error.message,code:error.code}));
  });
  autoSync=new AutoSync({
    shouldRun:()=>foreground===0&&!!store.meta('credential')&&store.meta('auto_sync',true)&&!store.meta('manual_offline')&&!store.meta('transfer_locked')&&!store.meta('restore_pending')&&!store.meta('blocked'),
    run:()=>{const task=serial.then(async()=>{if(store.meta('manual_offline')||!store.meta('auto_sync',true))return;background=true;try{await client.sync();if(!store.meta('manual_offline'))await Promise.all([cacheBrandLogo(),images.cache(store.list('catalog')).catch(()=>{})]);}finally{background=false;}});serial=task.catch(()=>{});return task;},
    onStatus:status=>{const previous=store.meta('auto_sync_status',{});const update={...previous,...status};store.set('auto_sync_status',update);window?.webContents.send('pos:sync-status',update);}
  });
  autoSync.start();
  window.loadFile(path.join(__dirname, 'index.html'));
}).catch(e => { dialog.showErrorBox('RewaShop POS could not open', e.message); app.quit(); });
