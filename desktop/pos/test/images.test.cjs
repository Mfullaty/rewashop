'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {Images,hash}=require('../src/images.cjs'),{Store}=require('../src/store.cjs');
test('product pictures persist for offline use and unsafe content is rejected',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pos-images-')),store=new Store(':memory:');t.after(()=>{store.close();fs.rmSync(dir,{recursive:true,force:true});});
 let requests=0;const bytes=Buffer.from('89504e470d0a1a0a00000000','hex');
 const images=new Images(dir,store,async(_url,options)=>{requests++;assert.equal(options.headers,undefined);assert.equal(options.redirect,'error');return new Response(bytes);});
 const url='https://example.test/rice.png';await images.cache([{image_url:url},{image_url:url}]);assert.equal(requests,1);
 const restarted=new Images(dir,store,async()=>{throw Error('No internet')});const result=restarted.read('pos-image://cache/'+hash(url));assert.equal(result.type,'image/png');assert.deepEqual(result.bytes,bytes);
 assert.equal(restarted.read('pos-image://cache/../../etc/passwd'),null);await restarted.cache([{image_url:url}]);assert.equal(requests,1);
 const bad=new Images(dir,store,async()=>new Response('<svg onload="alert(1)"></svg>'));await bad.cache([{image_url:url},{image_url:'https://example.test/bad'}]);assert.equal(store.get('photo',hash('https://example.test/bad')),null);
 fs.unlinkSync(path.join(dir,hash(url)));await images.cache([{image_url:url}]);assert.equal(requests,2);
});
test('obsolete photos are removed and active photos use bounded least-recently-used eviction',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pos-images-')),store=new Store(':memory:');t.after(()=>{store.close();fs.rmSync(dir,{recursive:true,force:true});});
 const bytes=Buffer.from('89504e470d0a1a0a00000000','hex'),urls=['https://example.test/a','https://example.test/b','https://example.test/c'];
 const images=new Images(dir,store,async()=>new Response(bytes),bytes.length*2);
 await images.cache(urls.slice(0,2).map(image_url=>({image_url})));assert.equal(images.used,bytes.length*2);
 await images.cache([{image_url:urls[2]}]);assert.equal(store.get('photo',hash(urls[0])),null);assert.equal(store.get('photo',hash(urls[1])),null);assert.ok(images.read('pos-image://cache/'+hash(urls[2])));
 await images.cache(urls.map(image_url=>({image_url})));assert.equal(images.used,bytes.length*2);assert.equal(fs.readdirSync(dir).length,2);
});
