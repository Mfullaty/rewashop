'use strict';
const test=require('node:test'),assert=require('node:assert/strict');const {Calculator}=require('../src/calculator.js');
test('calculator handles money decimals, percent, clear, negative and zero division without eval',()=>{
 const c=new Calculator();for(const key of ['0','.','1','+','0','.','2','='])c.press(key);assert.equal(c.value,'0.3');c.clear();for(const k of ['2','5','0','0','×','1','0','%','='])c.press(k);assert.equal(c.value,'250');c.press('±');assert.equal(c.value,'-250');c.clear();for(const k of ['8','÷','0'])c.press(k);assert.throws(()=>c.press('='),/zero/);c.clear();c.press('9');c.press('⌫');assert.equal(c.value,'0');
});
