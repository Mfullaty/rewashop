'use strict';
const test=require('node:test'),assert=require('node:assert/strict');const {AutoSync}=require('../src/auto-sync.cjs');
test('automatic sync is single-flight, respects disconnect and retries with bounded backoff',async()=>{
 let enabled=true,calls=0,fail=true,delay=0,release;const status=[];
 const sync=new AutoSync({shouldRun:()=>enabled,run:async()=>{calls++;if(fail)throw Error('No internet');await new Promise(resolve=>{release=resolve;});},onStatus:s=>status.push(s),setTimer:(_fn,ms)=>{delay=ms;return 1;},clearTimer:()=>{}});
 sync.start();assert.equal(delay,5000);await sync.tick();assert.equal(calls,1);assert.equal(delay,15000);await sync.tick();assert.equal(delay,30000);
 enabled=false;await sync.tick();assert.equal(calls,2);enabled=true;fail=false;const running=sync.tick();await sync.tick();assert.equal(calls,3);release();await running;assert.equal(delay,60000);assert.equal(status.at(-1).error,null);sync.stop();await sync.tick();assert.equal(calls,3);
});
