'use strict';
const {createHash,sign}=require('node:crypto');
const {deflateRawSync}=require('node:zlib');
const {canonical}=require('./policy.cjs');
function fingerprint(lines){return createHash('sha256').update(canonical(lines.map(l=>[l.snapshot?.name||l.name||'',l.snapshot?.variant||'',l.quantity,l.unit_price_minor,l.discount_minor||0,l.tax_minor||0,l.total_minor]))).digest('hex');}
function signReceipt(receipt,nonce,key,privateKey,origin){
 const cash=receipt.tenders.filter(t=>t.method==='cash').reduce((n,t)=>n+t.amount_minor,0);
 const claims=[1,nonce,Math.floor(Date.parse(receipt.occurred_at)/1000),receipt.currency,receipt.total_minor,fingerprint(receipt.lines),receipt.lines.length,receipt.store?.name||'',receipt.store?.address||'',cash,receipt.total_minor-cash];
 const text=canonical(claims),signature=sign(null,Buffer.from(text),privateKey).toString('base64url'),payload=deflateRawSync(Buffer.from(text)).toString('base64url');
 const proof={key_id:key.key_id,payload,signature};
 return {proof,url:origin+'/api/pos/v1/receipts/check/'+key.key_id+'?p='+payload+'&s='+signature};
}
module.exports={signReceipt,fingerprint};
