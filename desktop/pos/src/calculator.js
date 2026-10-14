'use strict';
class Calculator {
  constructor(){this.clear();}
  clear(){this.value='0';this.accumulator=null;this.operation=null;this.replace=true;return this.value;}
  format(value){if(!Number.isFinite(value)||Math.abs(value)>1e15)throw Error('This calculation is too large. Try smaller numbers.');return String(Number(value.toPrecision(12)));}
  compute(a,b,op){if(op==='÷'&&b===0)throw Error('Cannot divide by zero. Choose another number.');return op==='+'?a+b:op==='-'?a-b:op==='×'?a*b:a/b;}
  press(key){
    if(key==='AC')return this.clear();
    if(/^\d$/.test(key)){if(this.replace){this.value=key;this.replace=false;}else if(this.value.replace(/[-.]/g,'').length<14)this.value=this.value==='0'?key:this.value+key;return this.value;}
    if(key==='.'){if(this.replace){this.value='0';this.replace=false;}if(!this.value.includes('.'))this.value+='.';return this.value;}
    if(key==='⌫'){this.value=this.value.length>1?this.value.slice(0,-1):'0';if(this.value==='-')this.value='0';return this.value;}
    if(key==='±'){if(Number(this.value)!==0)this.value=this.value.startsWith('-')?this.value.slice(1):'-'+this.value;return this.value;}
    if(key==='%'){this.value=this.format(Number(this.value)/100);return this.value;}
    if(['+','-','×','÷','='].includes(key)){
      const current=Number(this.value);
      if(this.operation&&!this.replace){this.value=this.format(this.compute(this.accumulator,current,this.operation));}
      this.accumulator=Number(this.value);this.operation=key==='='?null:key;this.replace=true;return this.value;
    }
    throw Error('Choose a calculator button.');
  }
}
if(typeof module!=='undefined')module.exports={Calculator};else window.Calculator=Calculator;
