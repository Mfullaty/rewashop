'use strict';
// Run with POS_CHROMIUM pointing to a local Chromium binary. This drives the
// actual desktop renderer through its real SQLite/Client command boundary.
const {chromium}=require('../../../addons/rewa_pos_pro/web/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {Store}=require('../src/store.cjs'),{Client}=require('../src/client.cjs');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rewapos-ui-')),s=new Store(path.join(dir,'pos.sqlite'));
 const boot={schema_version:1,seller_id:2,device_id:'fixture-device',cashier_id:2,currency:'NGN',minor_exponent:2,max_discount_bps:1000,registers:[{id:1,name:'Register 01',code:'REG-01'}],branding:{name:'Amina Supermarket'},abilities:['catalog:read','sale:read','sale:write','shift:write','cash:write','report:read','inventory:write','receipt:read','receipt:reprint','device:manage','discount:write'].map(a=>'pos:'+a)};
 s.set('boot',boot);s.set('credential','fixture');s.set('shift',{client_shift_id:'fixture-shift',status:'open',expected_minor:10000,opening_minor:10000});
 for(let i=0;i<12;i++)s.put('catalog',11+i,{stock_id:11+i,name:['Premium Rice','Cooking Oil','Fresh Coffee','Natural Honey','Breakfast Oats','Whole Milk','Tomato Paste','Sea Salt Crackers','Coconut Water','Cashew Nuts','Black Tea','Laundry Soap'][i],variant:'Standard pack',currency:'NGN',unit_price_minor:10000+i*500,tax_rules:[],gst_bps:0,tax_inclusive:false,available_quantity:20,barcode:'00'+(11+i)});
 const client=new Client(s,async()=>{throw Error('UI test has no network')},{decrypt:async()=>''});
 const browser=await chromium.launch({executablePath:process.env.POS_CHROMIUM,headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1366,height:850}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.exposeFunction('__command',async(c,d)=>{
   if(c==='checkoutLock'||c==='wakeSync')return true;if(c==='state')return client.state();if(c==='quote')return client.quote(d.cart,d.mode);
   if(c==='clearCatalog')return client.clearCatalog();
   if(c==='fullCatalogSync'){s.put('catalog',12,{stock_id:12,name:'Current online product',currency:'NGN',unit_price_minor:10000,available_quantity:10,tax_rules:[]});s.set('catalog_paused',false);return client.state();}
   if(c==='saveCart'){s.set('cart',d.cart);return true;}
   if(c==='hold'){s.put('held','1',{id:'1',name:d.name,cart:s.meta('cart')});s.set('cart',[]);return client.state();}
   throw Error('Unexpected UI command '+c);
  });
  await page.addInitScript(()=>{window.pos={command:(c,d)=>window.__command(c,d)};});
  await page.goto('file://'+path.resolve(__dirname,'../src/index.html'));await page.getByRole('heading',{name:'Ready for your next customer'}).waitFor();
  await page.locator('#mode').selectOption('online');await page.locator('[data-add="11"]').click();await page.waitForFunction(()=>document.querySelector('#cart-summary').textContent.includes('100.00'));
  await page.getByRole('button',{name:'Increase quantity Premium Rice'}).click();assert.equal(await page.locator('[data-qty="11"]').inputValue(),'2');await page.getByRole('button',{name:'Decrease quantity Premium Rice'}).click();assert.equal(await page.locator('[data-qty="11"]').inputValue(),'1');
  await page.locator('[data-calc="7"]').click();await page.locator('[data-calc="×"]').click();await page.locator('[data-calc="8"]').click();await page.locator('[data-calc="="]').click();assert.equal(await page.locator('#calculator-display').textContent(),'56');
  await page.locator('[data-apply-discount="11"]').click();await page.locator('#discount-form input[name=value]').fill('5.00');await page.locator('#discount-form button').click();await page.locator('#message-close').click();assert.equal(s.meta('cart')[0].discount_minor,500);
  await page.getByRole('button',{name:'Take payment'}).click();await page.getByRole('heading',{name:/Take payment/}).waitFor();assert.equal(await page.locator('#payment-form input[name=received]').inputValue(),'95.00');await page.getByRole('button',{name:'Close',exact:true}).click();
  await page.locator('[data-tab="till"]').click();await page.getByRole('heading',{name:'Cash movements & closing'}).waitFor();
  await page.locator('[data-tab="sell"]').click();assert.equal(await page.locator('[data-qty="11"]').inputValue(),'1');
  await page.locator('#search').fill('Coffee');assert.equal(await page.locator('.product').count(),1);await page.locator('#search').fill('');
  await page.screenshot({path:path.join(dir,'desktop.png'),fullPage:true});assert.deepEqual(errors,[]);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.locator('[data-tab="stock"]').click();await page.locator('[data-action="clearCatalog"]').click();await page.getByRole('heading',{name:'Clear downloaded products?'}).waitFor();await page.locator('[data-action="confirmClearCatalog"]').click();await page.locator('#message-close').click();assert.equal(s.list('catalog').length,0);assert.equal(s.meta('cart').length,0);assert.equal(s.meta('credential'),'fixture');await page.locator('[data-action="fullCatalogSync"]').click();await page.locator('#message-close').click();assert.equal(await page.locator('.product').count(),1);assert.ok(await page.locator('.product').textContent().then(t=>t.includes('Current online product')));
  console.log('Desktop renderer passed: catalog, live quote, payment dialog, persistent cart, navigation, search and layout. Screenshot: '+path.join(dir,'desktop.png'));
 }finally{await browser.close();s.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
