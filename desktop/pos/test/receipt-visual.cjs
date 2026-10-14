'use strict';
const {chromium}=require('../../../addons/rewa_pos_pro/web/node_modules/playwright');
const {receiptHTML}=require('../src/receipt.cjs'),{signReceipt}=require('../src/receipt-signing.cjs');
const {generateKeyPairSync}=require('node:crypto'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const jsQR=require('jsqr'),{PNG}=require('pngjs');
(async()=>{
 const keys=generateKeyPairSync('ed25519');
 const receipt={store:{name:'Amina Supermarket',address:'12 Market Road, Kano',phone:'0800 123 4567',footer:'Thank you for shopping with us.'},occurred_at:new Date().toISOString(),currency:'NGN',lines:[{snapshot:{name:'Classic Hyundai General Series 5-799',variant:''},quantity:24,unit_price_minor:75700,discount_minor:8000,tax_minor:0,total_minor:1808800},{snapshot:{name:'Elegant Ford Men Clothing Fashion V2-514',variant:''},quantity:1,unit_price_minor:200,discount_minor:0,tax_minor:0,total_minor:200}],subtotal_minor:1817000,discount_minor:8000,tax_minor:0,total_minor:1809000,tenders:[{method:'cash',amount_minor:1809000,received_minor:2000000,change_minor:191000}]};
 receipt.verification_url=signReceipt(receipt,'a'.repeat(43),{key_id:'b'.repeat(32)},keys.privateKey,'https://rewashop.com').url;
 const out=path.resolve(__dirname,'../../../dist/receipt-preview');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.POS_CHROMIUM,headless:true,args:['--no-sandbox']});
 try {for(const width of [58,80]){const page=await browser.newPage({viewport:{width:500,height:1000},deviceScaleFactor:203/96});await page.setContent(receiptHTML(receipt,{width}));await page.locator('.qr').evaluate(img=>img.decode());const height=await page.locator('.receipt').evaluate(el=>el.getBoundingClientRect().height);await page.pdf({path:path.join(out,`cash-receipt-${width}mm.pdf`),width:width+'mm',height:(height*25.4/96+2)+'mm',margin:{top:0,bottom:0,left:0,right:0},printBackground:true});await page.locator('.receipt').screenshot({path:path.join(out,`cash-receipt-${width}mm.png`)});const qr=PNG.sync.read(await page.locator('.qr').screenshot());const decoded=jsQR(new Uint8ClampedArray(qr.data),qr.width,qr.height);assert.equal(decoded?.data,receipt.verification_url,`QR must scan at 203 dpi on ${width}mm paper`);assert.equal(await page.locator('.receipt').evaluate(el=>el.scrollWidth>el.clientWidth),false);await page.close();}
 console.log('58mm and 80mm receipt layouts and QR scanning passed. '+out);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
