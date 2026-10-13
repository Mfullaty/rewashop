'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const hash = url => createHash('sha256').update(url).digest('hex');
function imageType(bytes) {
  if (bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'))) return 'image/png';
  if (bytes[0]===255 && bytes[1]===216) return 'image/jpeg';
  if (/^GIF8[79]a$/.test(bytes.subarray(0,6).toString())) return 'image/gif';
  if (bytes.subarray(0,4).toString()==='RIFF' && bytes.subarray(8,12).toString()==='WEBP') return 'image/webp';
  return null;
}
class Images {
  constructor(directory, store, transport = fetch) { this.directory=directory; this.store=store; this.fetch=transport; fs.mkdirSync(directory,{recursive:true}); }
  async cache(items) {
    const queue=[...new Set(items.map(i=>i.image_url).filter(Boolean))];
    await Promise.all(Array.from({length:4},async()=>{ while(queue.length) await this.download(queue.shift()); }));
  }
  async download(url) {
    const id=hash(url), file=path.join(this.directory,id);
    if (this.store.get('photo',id) && fs.existsSync(file)) return;
    try {
      const parsed=new URL(url); if(!['https:','http:'].includes(parsed.protocol)||parsed.username||parsed.password) return;
      // Product media is public. Never send the device's bearer credential.
      const response=await this.fetch(url,{redirect:'error',signal:AbortSignal.timeout(10000)});
      if(!response.ok || Number(response.headers.get('content-length'))>4194304) return;
      const reader=response.body.getReader(), chunks=[]; let size=0;
      while(true) { const {done,value}=await reader.read(); if(done)break; size+=value.length; if(size>4194304){await reader.cancel();return;} chunks.push(Buffer.from(value)); }
      const bytes=Buffer.concat(chunks),type=imageType(bytes); if(!type)return;
      // Keep the disk cache bounded. Images never invalidate a completed sale.
      let used=0; for(const name of fs.readdirSync(this.directory)){if(/^[a-f0-9]{64}$/.test(name))used+=fs.statSync(path.join(this.directory,name)).size;}
      if(used+bytes.length>512*1024*1024)return;
      fs.writeFileSync(file+'.tmp',bytes,{mode:0o600}); fs.renameSync(file+'.tmp',file); this.store.put('photo',id,{type});
    } catch { /* Retry unavailable pictures on the next sync. */ }
  }
  read(url) {
    const parsed=new URL(url),id=parsed.pathname.slice(1);
    if(parsed.protocol!=='pos-image:'||parsed.hostname!=='cache'||!/^[a-f0-9]{64}$/.test(id))return null;
    const meta=this.store.get('photo',id); if(!meta)return null;
    try{return {bytes:fs.readFileSync(path.join(this.directory,id)),type:meta.type};}catch{return null;}
  }
}
module.exports={Images,hash,imageType};
