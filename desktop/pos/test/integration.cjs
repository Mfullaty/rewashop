'use strict';
// Real Laravel HTTP requests. Only the intentionally lost response is injected.
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{randomUUID}=require('node:crypto');
const {Store}=require('../src/store.cjs'),{Client}=require('../src/client.cjs');
(async()=>{
 const auth=JSON.parse(fs.readFileSync(path.join(os.tmpdir(),'rewashop-pos-desktop-credential.json'))),dir=fs.mkdtempSync(path.join(os.tmpdir(),'rewapos-live-'));
 const store=new Store(path.join(dir,'pos.sqlite'));store.set('origin','http://127.0.0.1:8124');store.set('credential',auth.token);store.set('credential_expiry',new Date(Date.now()+86400000).toISOString());let lose=false;
 const transport=async(url,o)=>{const response=await fetch(url,{method:o.method,headers:{Accept:'application/json','Content-Type':'application/json',Authorization:'Bearer '+o.token,...(o.key?{'Idempotency-Key':o.key}:{})},body:o.body===undefined?undefined:JSON.stringify(o.body)});const data=await response.json();if(!response.ok){const e=Error(data.error?.message||JSON.stringify(data));e.status=response.status;e.code=data.error?.code;throw e;}if(lose&&url.endsWith('/sync/push')){lose=false;throw Error('Dropped committed Laravel reply');}return data;};
 const client=new Client(store,transport,{encrypt:async v=>v,decrypt:async v=>v});
 try{
  await client.sync();assert.equal(store.list('catalog').length,1);assert.equal(store.list('catalog')[0].stock_id,22);
  await client.allocate([{stock_id:22,quantity:10}]);client.openShift(10000);const id=randomUUID();
  const receipt=await client.checkout({mode:'offline',client_sale_id:id,cart:[{stock_id:22,quantity:3}],tenders:[{method:'cash',currency:'NGN',amount_minor:32250,received_minor:40000,change_minor:7750}]});assert.equal(receipt.total_minor,32250);
  lose=true;await assert.rejects(()=>client.sync(),/Dropped/);await client.sync();await client.sync();assert.equal(store.events(true).length,0);assert.equal(store.meta('spent_minor'),32250);
  const sale=store.get('sale',id),detail=await client.saleDetail(sale.server.sale_id);assert.equal(detail.sale.total_minor,32250);assert.equal(detail.lines[0].quantity,3);
  assert.equal(store.get('allocation',receipt.lines[0].allocation_id).consumed,3);
  await client.refund({sale_id:sale.server.sale_id,reason:'One damaged bag',lines:[{sale_line_id:detail.lines[0].id,quantity:1,restock:false}]});await client.sync();
  const returned=await client.saleDetail(sale.server.sale_id);assert.equal(returned.lines[0].returned_quantity,1);assert.equal(returned.refunds[0].amount_minor,10750);
  client.cash(-1000,'Supplies for till');client.closeShift(30500,'');await client.sync();await client.reconcile();
  assert.equal(store.list('allocation').filter(a=>a.status==='open').length,0);assert.equal(store.meta('spent_minor'),0);
  const report=await client.report();assert.equal(report.totals.sales,1);assert.equal(report.totals.net_minor,21500);assert.equal(report.totals.net_tax_minor,1500);
  assert.equal(store.get('catalog',22).available_quantity,17);
  console.log('Real Laravel integration passed: reserved stock, tax, lost response, replay, partial return, till, close, report and reconciliation.');
 }finally{store.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1});
