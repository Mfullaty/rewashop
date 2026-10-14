'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{generateKeyPairSync,verify}=require('node:crypto'),{inflateRawSync}=require('node:zlib');
const {receiptHTML}=require('../src/receipt.cjs'),{signReceipt,fingerprint}=require('../src/receipt-signing.cjs'),{canonical}=require('../src/policy.cjs');
const r={number:'LOCAL-secret',client_sale_id:'internal-id',customer:{name:'Walk-in customer'},store:{name:'Amina Supermarket',address:'12 Market Road, Kano',footer:'Thank you for shopping with us.'},occurred_at:'2026-10-14T01:00:00Z',currency:'NGN',lines:[{snapshot:{name:'Premium Rice',variant:'5 kg'},quantity:2,unit_price_minor:10000,discount_minor:1000,tax_minor:0,total_minor:19000}],subtotal_minor:20000,discount_minor:1000,tax_minor:0,total_minor:19000,tenders:[{method:'cash',amount_minor:19000,received_minor:20000,change_minor:1000}],verification_url:'https://rewashop.com/api/pos/v1/receipts/verify/'+'a'.repeat(43),sync_status:'pending'};
test('clean receipt uses seller branding and a genuine QR without internal labels',()=>{
 for(const width of [58,80]){const html=receiptHTML(r,{width});for(const text of ['CASH RECEIPT','Amina Supermarket','Market Road','Description','Cash received','Change','Scan to verify'])assert.ok(html.includes(text));for(const text of ['LOCAL-secret','internal-id','Walk-in customer','Recorded locally','COPY','Awaiting sync'])assert.ok(!html.includes(text));assert.match(html,/data:image\/gif;base64,/);assert.ok(html.includes(`width:${width}mm`));}
 assert.ok(receiptHTML({...r,store:{name:'<script>alert(1)</script>',address:''}}).includes('&lt;script&gt;'));assert.throws(()=>receiptHTML({...r,verification_url:null}),/Connect once/);
});
test('offline receipt proof covers the shop, total, date and item fingerprint before any upload',()=>{
 const keys=generateKeyPairSync('ed25519'),signed=signReceipt(r,'a'.repeat(43),{key_id:'b'.repeat(32)},keys.privateKey,'https://rewashop.com');
 const claims=JSON.parse(inflateRawSync(Buffer.from(signed.proof.payload,'base64url')));assert.equal(claims[4],19000);assert.equal(claims[5],fingerprint(r.lines));assert.equal(claims[7],'Amina Supermarket');assert.ok(verify(null,Buffer.from(canonical(claims)),keys.publicKey,Buffer.from(signed.proof.signature,'base64url')));
 claims[4]=1;assert.equal(verify(null,Buffer.from(canonical(claims)),keys.publicKey,Buffer.from(signed.proof.signature,'base64url')),false);assert.ok(signed.url.includes('/receipts/check/'));assert.ok(!signed.url.includes('internal-id'));
});
module.exports={receiptFixture:r};
